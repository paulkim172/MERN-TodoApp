const mongoose = require('mongoose');

//main Schemas

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: String,
    password: String,
    email: String,

    org: String,
    type: String,

    level: Number,
    renew: Boolean,
    renew_type: String,
    renew_date: Date,

    subscription: Boolean,

    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'todolist'}]
})

const listSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    name: String,
    published_date: Date,
    show_in_main: Boolean,

    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'todoitem'}]
})

const itemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

//Main Models
const userModel = mongoose.model('user', userSchema,'user');
const listModel = mongoose.model('list',listSchema,'todolist');
const itemModel = mongoose.model('item',itemSchema,'todoitem');
const commentModel = mongoose.model('comment',commentSchema,'todocomment');

exports.userModel = userModel;
exports.listModel = listModel;
exports.itemModel = itemModel;
exports.commentModel = commentModel;
