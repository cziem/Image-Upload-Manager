const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
  title: { type: String, required: true, trim: true },
  caption: { type: String, required: true },
  address: String,
  price: { type: String, required: true },
  img: { type: String, required: true },
  photos: Array
  // img: {
  //   data: Buffer, contentType: String
  // }
})

const File = mongoose.model('Files', fileSchema)

module.exports = File