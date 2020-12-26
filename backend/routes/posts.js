const { responsiveFontSizes } = require('@material-ui/core')
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// Returns all current books in DB
router.get('/compBooks', async (req, res) => {
    try {
        const posts = await Post.find({ type: "completed" })
        res.json(posts)
    }
    catch(err) {
        res.json({message: err})
    }
})

// Returns all potential books in DB
router.get('/potBooks', async (req, res) => {
    try {
        const posts = await Post.find({ type: "potential" })
        res.json(posts)
    }
    catch(err) {
        res.json({message: err})
    }
})

// Creates a post and adds to DB
router.post('/', async (req, res) => {
    // Create Post from model
    const post = new Post({
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        pageCount: req.body.pageCount,
        previewLink: req.body.previewLink,
        infoLink: req.body.infoLink,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        readers: req.body.readers,
        type: req.body.type
    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    }
    catch(err) {
        res.json({message: err})
    }
})

// Get a specific post
router.post('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }
    catch(err) {
        res.json({message: err})
    }
})

// Delete a specific post
router.delete(':/postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId })
        res.json(removedPost)
    }
    catch(err) {
        res.json({message: err})
    }
})

// Update a specific post
router.patch(':/postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        )
        res.json(updatedPost)
    }
    catch(err) {
        res.json({message: err})
    }
})

module.exports = router 