import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    user:  process.env.MYSQL_USER,
    password :  process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
}).promise()

export async function userdetails(){
const [rows] = await pool.query('select * from user')
return rows
}

export async function getuniqueuser(id){
    const [rows] = await pool.query(`SELECT * FROM USER WHERE ?`,[id]) 
    return [rows[0]]
}

export async function createuser(username, email, password){
    const [result] =  await pool.query(`insert into user (username, email,password) values(?,?,?)`,[username, email, password])
    const id = result.insertId
    return getuniqueuser(id)
}
