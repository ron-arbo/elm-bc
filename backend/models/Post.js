const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: String,
    authors: [String],
    description: String,
    pageCount: Number,
    previewLink: String,
    infoLink: String,
    price: {
        type: Number,
        required: false
    },
    thumbnail: String,
    readers: [String]
})

// Can also do this format above:
// title: {
//     type: String,
//     required: True
// }

module.exports = mongoose.model('Posts', PostSchema)