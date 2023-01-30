const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String
    },
    post_image: {
        type: String
    },
    private: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Post', PostSchema);