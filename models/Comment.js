const { Schema, model, Types } = require('mongoose');
const dateFormat  = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        // set custom id to avoid confustion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replybody: {
            type: String,
            required: 'You need to enter comment text!',
            trim: true,
        },
        writtenBy: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
   
);

const CommentSchema = new Schema({
    writtenBy: {
        type:String,
        required: 'You need to add a comment author',
        trim: true
    },
    commentBody: {
        type:String,
        required:'You must provide comment text',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
}, 
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

CommentSchema.virtual('replycount').get(function() {
    return this.replies.length;
});


const Comment = model('Comment', CommentSchema);

module.exports = Comment;
