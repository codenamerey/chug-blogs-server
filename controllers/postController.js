const User = require('../models/User');
const Post = require('../models/Post');
const requireJwtAuth = require('../middleware/requireJwtAuth');

const sanitizeHtml = require('sanitize-html');
const imgbbUploader = require('imgbb-uploader');

const opts = {
    allowedTags: ['span', 'p', 'b', 'strong', 'ul', 'ol', 'li', 'a', 'img'],
    allowedAttributes: {
        'span': ['style'],
        'p': ['style'],
        'a': ['href'],
        'ul': ['style'],
        'img': ['src', 'width', 'height']
    },
}

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
                content: sanitizeHtml(content, opts),
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
        res.status(422).json({success: false, message: 'You are unauthorized to create posts'});
    }


}]

exports.post_get_all = async(req, res) => {
    const posts = await Post.find({})
                            .populate('author', ['_id', 'first_name'])
    res.status(200).json(posts);
}

exports.post_get_one = async(req, res) => {
    const post = await Post.findById(req.params.id)
                           .populate('author', ['_id', 'first_name'])
    res.status(200).json(post);
}

exports.post_edit = [requireJwtAuth, async(req, res) => {
    const { title, description, content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            title,
            description,
            content: sanitizeHtml(content, opts)
        });
        res.status(200).json({success: true});
    } catch(err) {
        res.status(500).json({success: false, error: err.message});
    }
}]

exports.post_delete = [
    requireJwtAuth,
    async(req, res) => {
        const { _id } = req.user;
        try {
            const post = await Post.findById(req.params.id)
                                   .populate('author', '_id')

            if(post.author._id.equals(_id)) {
                post.delete()
                res.status(200).json({success: true});
            } else {
                res.status(422).json({success: false, error: 'User unauthorized to delete.'});
            }
        } catch(err) {
            res.status(500).json({success:false, error: err.message})
        }
    }
]

exports.post_image_handler = async(req, res, next) => {
    const {
        file
    } = req.body;

    const response = await imgbbUploader({
        apiKey: process.env.imgBBKey,
        base64string: file
    })

    res.json({
        image: response.url
    })
}