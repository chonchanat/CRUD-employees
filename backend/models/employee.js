const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    age: Number,
    country: String,
    position: String,
    wage: Number,
},{ timestamps: true, versionKey: false })

const EmployeeModel = mongoose.model('Employee', productSchema)
module.exports = EmployeeModel