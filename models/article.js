let mongoose = require('../mongodb/db')

let Schema = mongoose.Schema
let articleSchema = new Schema({
    title:String,
    content:String,
    datetime:String,
})
let Article = mongoose.model('articles',articleSchema)

module.exports = Article