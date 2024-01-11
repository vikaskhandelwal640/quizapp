import express from 'express'
import cors from 'cors'
import { userdetails, getuniqueuser, createuser } from './databasestorage.js'

const app = express()
app.use(express.json())
app.use(cors({origin:true,credentials:true}))
app.get("/user",async(req, res) =>{
    const users= await userdetails()
    res.send(users)
})
app.get("/user", async(req, res)=>{
    const id =req.params.id
    const getuniqueuser = await getuniqueuser(id)
    res.send(getuniqueuser)
})
app.post("/user",async(req, res)=>{
    const{ username, email, password } =req.body
    const  createUser =await createuser(username, email, password)
    res.status(201).send(createUser)
}) 

app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('somethiing broke!')
})
app.listen(2024,()=>{
    console.log('server is running onport 2024')
})