let DB_user = [];

const express = require("express")
const req = require("express/lib/request")
const app = express()
const port = 3000

app.use(express.json());


app.listen(port, ()=> {
    console.log('App running!')
});

app.get('/', (req, res) => {
    return res.status(200).json(DB_user)
});

app.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params;
    const user = DB_user.find((user) => user.id === user_id);
    return res.status(200).json(user);
})

app.post('/users', (req, res)=>{
    const {id, name, email, phone} = req.body
    const user = {id, name, email, phone}
    DB_user.push(user)
    return res.status(201).json(user)
});

app.delete('/users/:user_id', (req, res) => {
    const {user_id} = req.params;
    const filteredUsers = DB_user.filter(user => user.id !== user_id);
    DB_user = filteredUsers;
    return res.status(204).json("Deleted");
})

app.patch('/users/:user_id', (req, res) =>{
    const {name, email, phone} = req.body;
    const {user_id} = req.params;
    const user = DB_user.find((user) => user.id === user_id);

    user.id = user.id;
    user.name = name;
    user.email = email;
    user.phone = phone;

    return res.json("Updated")
})
