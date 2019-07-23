const express = require('express');
const request = require('request')
const config =require('config')
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post =require('../../models/Post')
const { check, validationResult } = require('express-validator')



// @route   GET api/profile/me
// @desc    Get users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avater']);

        if (!profile) {
            return res.status(400).json({ msg: ' there is no profile for this user' })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }

});

// @route   Post api/profile
// @desc    Create profile or Update 
// @access  Private
router.post('/',
    [auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty(),

        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
        const {
            company,
            website,
            location, 
            status,
            skills,
            bio,
            githubusername,
            youtube,
            facebook,
            linkedin,
            twitter
        } = req.body
        // Build profile objects
        const profileFields = {}
        profileFields.user = req.user.id
        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (status) profileFields.status = status
        if (bio) profileFields.bio = bio
        if (githubusername) profileFields.githubusername = githubusername
        if (skills) { profileFields.skills = skills.split(',').map(skill => skill.trim()) }


        // Build social objects
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (facebook) profileFields.social.facebook = facebook
        if (linkedin) profileFields.social.linkedin = linkedin
        if (twitter) profileFields.social.twitter = twitter

        try {
          let profile = await Profile.findOne({ user: req.user.id })
            if (profile) {
                // update 
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                return res.json(profile)
                
            } 
            // Create profile 
            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)
          
          
        } catch (err) {
            console.error(err.message)
            res.status(500).json('server error')

        }
    })

// @route   Get api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avater'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// @route   Get api/profile/user/:user_id
// @desc    Get profile by user_id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avater'])
        if (!profile) {
            console.log(req.params.user_id)
            return res.status(400).json({ msg: 'Profile not found ' })

        }
        res.json(profile)

    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found ' })
        }
        res.status(500).send('server error')
    }
})

// @route   Delete api/profile
// @desc    Delete profile ,user& posts
// @access  Private
router.delete('/', auth, async (req, res) => {

    try {
        // Remove users posts
        await Post.deleteMany({user:req.user.id})
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.error(err.message)
        res.status(500).json('server error')
    }
})


// @route   Put api/profile/experience
// @desc    Add profile experience
// @access  Private

router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'from data is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } 
    try{
        const profile = await Profile.findOne({user:req.user.id})
        profile.experience.unshift(newExp)
       
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
    
   
    
})
// @route   Delete api/profile/experience/:exp_id
// @desc    Delete  experience from profile
// @access  Private
 router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})

        // Remove index
        const removeIndex = profile.experience.map(exp=> exp.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1)
        profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}) 


// @route   Put api/profile/education
// @desc    Add profile education
// @access  Private

router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
    check('from', 'from data is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } 
    try{
        const profile = await Profile.findOne({user:req.user.id})
        profile.education.unshift(newEdu)
       
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
    
   
    
})
// @route   Delete api/profile/education/:edu_id
// @desc    Delete  education from profile
// @access  Private
 router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})

        // Remove index
        const removeIndex = profile.education.map(edu=> edu.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex,1)
        profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}) 
// @route   Get api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username',(req,res)=>{
    try {
        const options = {
            uri :`http://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')} `,
            method: 'GET',
            headers: {'user-agent':'node.js'}
        }
        request(options,(error,respons,body)=>{
            if(error) console.error(error)
            if (respons.statusCode !== 200)
            {
            res.status(404).send({msg:"NO Github profile found"})
            }
            res.json(JSON.parse(body))
           
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
module.exports = router;
