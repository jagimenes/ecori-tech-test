// Import modules and set up constants
const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Middleware setup
app.use(cors())
app.use(express.json())

// Route to get all tasks
app.get('/tasks',async (req,res) =>{
    let { userEmail, title, description, page, pageSize } = req.query
    title = title || ''
    description = description || ''
    pageSize = pageSize || null
    page = page || null
    try {
        const offset = (page - 1) * pageSize
        let query = 'SELECT * FROM tasks WHERE user_email = $1'
        const values = [userEmail]

        if (title !== '') {
            query += ' AND title = $2'
            values.push(title)
        }
        if (description !== '') {
            const descIndex = title !== '' ? 3 : 2
            query += ` AND description = $${descIndex}`
            values.push(description)
        }
        if (page) {
            const offset = (page - 1) * pageSize
            query += ' OFFSET $' + (values.length + 1)
            values.push(offset)
            if (pageSize) {
                query += ' LIMIT $' + (values.length + 2)
                values.push(offset, pageSize)
            }
        }

        const tasks = await pool.query(query, values)
        res.json(tasks.rows)
    } catch(err){
        console.error(err)
    }
})

// Route to create a new task
app.post('/tasks', async (req, res) => {
    const { user_email, title, description, created_at } = req.body
    const id = uuidv4()
    try {
        const newTask = await pool.query(`INSERT INTO tasks(id, user_email, title, description, created_at) 
        VALUES ($1, $2, $3, $4, $5)`,
        [id, user_email, title, description, created_at])
        res.json(newTask)
    } catch (err) {
        console.error(err)
    }
})

// Route to edit a task
app.put('/tasks/:id', async (req,res) => {
    const { id } = req.params
    const { user_email, title, description, updated_at, completed_at } = req.body
    try {
        const editTask = await pool.query('UPDATE tasks SET user_email = $1, title = $2, description = $3, updated_at = $4, completed_at = $5 WHERE id = $6;',
        [user_email, title, description, updated_at, completed_at, id])
        res.json(editTask)
    } catch (err) {
        console.error(err)
    }
})

// Route to delete a task
app.delete('/tasks/:id', async(req,res) => {
    const { id } = req.params
    try {
        const deleteTask = await pool.query('DELETE FROM tasks WHERE id = $1',
        [id])
        res.json(deleteTask)
    } catch (err) {
        console.error(err)
    }
})

// Route for user signup
app.post('/signup', async (req,res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    try {
        const signUp = await pool.query(`INSERT INTO users (email, password) VALUES ($1, $2)`,
        [email, hashedPassword])
        const token = jwt.sign( { email }, 'secret', { expiresIn: '1hr' })
        res.json({ email, token })
    } catch (err) {
        console.error(err)
        if(err){
            res.json({ detail : err.detail })
        }
    }
})

// Route for user login
app.post('/login', async (req,res) => {
    const { email, password } = req.body
    try {
        const users = await pool.query('SELECT * FROM  users WHERE email =$1', [email])

        if(!users.rows.length){
            return res.json({ detail : 'Account does not exist' })
        }
        const success = await bcrypt.compare(password, users.rows[0].password)
        const token = jwt.sign( { email }, 'secret', { expiresIn: '1hr' })

        if(success){
            res.json({ 'email' : users.rows[0].email, token })
        } else {
            res.json({ detail : 'Failed to login' })
        }
    } catch (err) {
        console.error(err)
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});