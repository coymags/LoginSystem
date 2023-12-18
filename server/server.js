const bcrypt = require('bcryptjs')
const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 3000

const pool = require('./config/dbconfig')

const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get('/', ( req, res) => {
    res.send('Hello Cocoy')
})

// Get|| Read all User from register_table list
app.get('/user', async(req, res) => {
    try {
        const userList = await pool.query('SELECT * FROM register_table')
        res.send(userList.rows)
        console.log(userList.rows)
    } catch (error) {
        console.error(error.message)
    }
}) 

// POST|| Create User or Register User
app.post('/user', async(req, res) => {
    try {
        const {email, password} = req.body;
        const salt = bcrypt.genSaltSync(8)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const createUser = await pool.query('INSERT INTO register_table (email, password) VALUES($1, $2) RETURNING *',
        [email, hashedPassword])
        res.send(createUser.rows)
        console.log(req.body)
    } catch (error) {
        console.error(error.message)
    }
})

// Login 
app.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const userDeatails = await pool.query('SELECT * FROM register_table WHERE email =$1', [email])
        //console.log(userDeatails)
        if(userDeatails.rowCount !==0){
            const passwordMatching = await bcrypt.compare(password, userDeatails.rows[0].password)
            //console.log(passwordMatching)
            if (passwordMatching == true) {
                res.send(userDeatails.rows)
            } else {
                res.send('Password is wrong in backend')
            }
        }else{
            res.send('User does not exist in backend')
        }
        
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Example app listening in port ${port}`)
})