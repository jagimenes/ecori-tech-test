const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./database')

app.use(cors())
app.use(express.json())

//Get all tasks
app.get('/tasks/:userEmail',async (req,res) =>{
    const { userEmail } = req.params
    try{
        const tasks = await pool.query('SELECT * FROM tasks WHERE user_email = $1', [userEmail])
        res.json(tasks.rows)
    }catch(err){
        console.error(err)
    }
})

//Create a new task
app.post('/tasks', (req, res) => {
    const { user_email, title, description, created_at } = req.body
    console.log(user_email, title, description, created_at)
    const id = uuidv4()
    try {
        pool.query(`INSERT INTO tasks(id, user_email, title, description, created_at) 
        VALUES ($1, $2, $3, $4, $5)`,
        [id, user_email, title, description, created_at])
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});