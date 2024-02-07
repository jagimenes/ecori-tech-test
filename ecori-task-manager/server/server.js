const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./database')

app.use(cors())

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});