const User = require('../models/User');
const Post = require('../models/Post');
const requireJwtAuth = require('../middleware/requireJwtAuth');

const sanitizeHtml = require('sanitize-html');

exports.post_create = [requireJwtAuth, async(req, res, next) => {
    const email_address = req.user.email_address;
    const user = await User.findOne({email_address});

    if(user) {
        try {
            const {
                title,
                description,
                content,
                post_image,
                private
            } = req.body;

            const new_post = new Post({
                title,
                description,
                content: sanitizeHtml(content),
                author: user,
                post_image,
                private
            }).save();

            res.status(200).json({success: true})
        }
        catch(err) {
            res.status(500).json({success: false, message: err.message})
        }
    } else {
        res.status(422).json({success: false, message: 'You are unauthorized to create posts'});S
    }


}]

exports.post_get_all = async(req, res) => {
    const posts = await Post.find({});
    res.status(200).json(posts);
}

exports.post_get_one = async(req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
}

exports.post_edit = [requireJwtAuth, async(req, res) => {
    const { title, description, content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            title,
            description,
            content
        });
        res.status(200).json({success: true});
    } catch(err) {
        res.status(500).json({success: false, error: err.message});
    }
}]