const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//main Schemas

const userSchema = new mongoose.Schema({

    name: String,
    username: String,
    password: String,
    email: String,

    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'groups', role: String}],
    type: String,

    level: Number,
    renew: Boolean,
    renew_type: String,
    renew_date: Date,

    subscription: Boolean,

    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'todolist'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'itemcomments'}]
})

const listSchema = new mongoose.Schema({

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    name: String,
    published_date: Date,
    show_in_main: Boolean,

    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'todoitem'}]
})

const itemSchema = new mongoose.Schema({

    list_id: {type: mongoose.Schema.Types.ObjectId, ref: 'todolist'},
    published_date: Date,
    title: String,
    text: String,
    type: {type: String},
    status: String,
    notification: Boolean,
    feature: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'itemcomments'}]
})

const commentSchema = new mongoose.Schema({

    published_date: Date,
    description: String,
    item_id: {type: mongoose.Schema.Types.ObjectId, ref: 'todoitem'},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})


//Item Feature Schemas

const itemCheckListSchema = new mongoose.Schema({

})

//salt and hash password of User

userSchema.pre('save', function(next) {
    let user = this;

    if(!user.isModified('password')) return next();

    if(user.password) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err,hash) {
                if(err) return next(err);
                user.password = hash;
                next(err);
            })
        })
    }
})

//Main Models
const userModel = mongoose.model('user', userSchema,'user');
const listModel = mongoose.model('list',listSchema,'todolist');
const itemModel = mongoose.model('item',itemSchema,'todoitem');
const commentModel = mongoose.model('comment',commentSchema,'todocomment');

exports.User = userModel;
exports.List = listModel;
exports.Item = itemModel;
exports.Comment = commentModel;
