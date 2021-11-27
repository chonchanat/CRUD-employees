const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const Product = require('./models/product')
const Employee = require('./models/employee')

app.use(express.json())

app.use(cors())

mongoose.connect('mongodb://localhost:27017/node-api-101', {
    useNewUrlParser: true
})

app.get('/employee', async (req, res) => {
    const employee = await Employee.find({})
    res.json(employee)
})

app.post('/employee/createEmployee', async (req, res) => {
    const payload = req.body;
    const employee = new Employee(payload)
    await employee.save()
    res.status(201).end()
})

app.delete('/employee/deleteEmployee/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await Employee.deleteOne({"_id" : id});
    if(deleted){
        res.status(200).json(deleted)
    //     Employee = Employee.filter(employee => employee._id  !== id);
    //     res.status(200).json(deleted)
    }else{
        res.status(404).json({ message: "Delete Fail"})
    }
})

app.put('/employee/updateEmployee/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const data = {
        name: payload.name,
        age: payload.age,
        country: payload.country,
        position: payload.position,
        wage: payload.wage
    }
    const updated = await Employee.updateOne({"_id" : id}, {$set: data});
    res.status(200).json(data);
})

app.listen(3001, () => {
    console.log('Application is running on port 3001')
})