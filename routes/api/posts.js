const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

// load Schemas
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   Post api/posts
// @desc    Create apost
// @access  Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avater: user.avater,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}
);

// @route   Get api/posts
// @desc    Get all apost
// @access  Private
router.get('/', auth, async (req, res) => {

    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// @route   Get api/posts/:id
// @desc    Get  post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: ' Post not found' })
        }
        res.json(post)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: ' Post not found' })
        }
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// @route   Delete api/posts/:id
// @desc    Get  post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        // post not exists
        if (!post) {
            return res.status(404).json({ msg: ' Post not found' })
        }
        // check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: ' user not authorized' })
        }

        await post.remove()
        res.json({ msg: 'Post Deleted' })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: ' Post not found' })
        }
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// @route   Put api/posts/like/:id
// @desc    add like to apost
// @access  Private
router.put('/like/:id' ,auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        // check if post has already been liked
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0) {
          return  res.status(400).json({msg:' post already liked'})
        }
        post.likes.unshift({user:req.user.id})
        await post.save()
        res.json(post.likes)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error') 
    }
})
// @route   Put api/posts/unlike/:id
// @desc    add unlike to apot
// @access  Private
router.put('/unlike/:id' ,auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        // check if post has already been liked
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0) {
          return  res.status(400).json({msg:' post not liked yet'})
        }
        // Get remove index
        const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex,1)
        await post.save()
        res.json(post.likes)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error') 
    }
})
// @route   Post api/posts/comments
// @desc    Create a comment
// @access  Private
router.post('/comments/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
        const newcomments ={
            text: req.body.text,
            name: user.name,
            avater: user.avater,
            user: req.user.id
        }
        post.comments.unshift(newcomments)
       await post.save()
        res.json(post.comments)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}
);
// @route   Delete api/posts/comments/:id/:comment_id
// @desc    Delete  comment for post
// @access  Private
router.delete('/comments/:id/:comment_id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        // pull out comment
        const comment = post.comments.find(comment=> comment.id === req.params.comment_id)

        // make sure comment exists
        if(!comment){
            return res.status(404).json({msg:'comment does not exists'})
        }
        // check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg:' user not authorized'})
        }
        // Get remove index
        const removeIndex = post.comments.map(comment=> comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex,1)
        await post.save()
        res.json(post.comments)

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg:'comment does not exists' })
        }
        console.error(err.message)
        res.status(500).send('server error')
    }
})
module.exports = router;
