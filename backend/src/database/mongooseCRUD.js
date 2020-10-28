const mongoose = require('mongoose');
const {User, List, Item, Comment} = require('./mongooseModels');
const { saltAndHashNewPassword, checkHashedPassword } = require('../services/bcrypt/bcrypt.js')



/* CRUD FUNCTIONALITY */

//Create

const createNewUser = async (a = null,b,c,d,e = null) => {
    let user = new User({
        name: a,
        username: b,
        password: c,
        email: d,

        groups: [],

        level: 0,
        renew: true,
        renew_type: e,
        renew_date: (e == 'yearly'? new Date(new Date().setFullYear(new Date().getFullYear() + 1)): new Date(new Date().setMonth(new Date().getMonth() + 1))),

        subscription: false,
        lists: [],
        comments: []

    })
    //Salt and Hash password using BCrypt

    let promise = saltAndHashNewPassword(user);
    let saltAndHashedUser = await promise;

    console.log(saltAndHashedUser.password + ' from mongooseCRUD');
    saltAndHashedUser.save(function(err){
        if(err){
            console.log(err);
            return;
        }})
            
}

const createNewList = async (a,b,c) => {
    const list = await List.create({
        name: a,
        published_date: new Date(),
        show_in_main: b,
        items: []
    })

    List.findById(c)
    .populate('user_id')
    .exec(function(err, list){
        if (err) return handleError(err);
        console.log('The user of this list is %s', list.user_id.name)
    })

}

const createNewItem = async (a,b,c,d,e,f) => {
    const item = await Item.create({
        published_date: new Date(),
        title: a,
        text: b,
        type: c,
        status: 'active',
        notification: d,
        feature: e,
        comments: []
    })

    Item.findById(f)
    .populate('list_id')
    .exec(function(err, item) {
        if (err) return handleError(err);
        console.log('The list of this item is %s', item.list_id.name)
    })
}

const createNewComment = async (a,b) => {
    const comment = await Comment.create({
        published_date: new Date(),
        description: a
    })

    Comment.findById(b)
    .populate('item_id')
    .exec(function(err,comment){
        if (err) return handleError(err);
        console.log('The item of this comment is %s', comment.item_id.name)
    })
    .populate('author')
    .exec(function(err,comment){
        if (err) return handleError(err);
        console.log('The author of this comment is %s', comment.author.name)
    })
}

//Read

const readCurrentUser = async (a) => {
    await User.findById(a)
    .exec(function (err, user) {
        if(err) return handleError(err);
        return user;
    }) 
}

const readCurrentList = async (a) => {
    await List.findById(a)
    .exec(function (err, list) {
        if(err) return handleError(err);
        return list;
    })
}

const readCurrentItem = async (a) => {
    await Item.findById(a)
    .exec(function (err, item) {
        if(err) return handleError(err);
        return item;
    })
}

const readCurrentComment = async (a) => {
    await Comment.findById(a)
    .exec(function (err, comment) {
        if(err) return handleError(err);
        return comment;
    })
}

//Update

const updateCurrentUser = async (a,b) => {
    await User.findByIdAndUpdate(a,b);
    console.log('User Updated');
}

const updateCurrentList = async (a,b) => {
    await List.findByIdAndUpdate(a,b);
    console.log('List Updated');
}

const updateCurrentItem = async (a,b) => {
    await Item.findByIdAndUpdate(a,b);
    console.log('Item Updated');
}

const updateCurrentComment = async (a,b) => {
    await Comment.findByIdAndUpdate(a,b);
    console.log('Comment Updated');
}

//Delete

const deleteCurrentUser = async (a) => {
    await User.findByIdAndDelete(a);
    console.log('User Deleted');
}

const deleteCurrentList = async (a) => {
    await User.find({lists: a})
    .lists.pull(a)

    await List.findByIdAndDelete(a);

    console.log('List Deleted');
}

const deleteCurrentItem = async (a) => {
    await List.find({items: a})
    .items.pull(a)

    await Item.findByIdAndDelete(a);
    console.log('Item Deleted')
}

const deleteCurrentComment = async (a) => {
    await Item.find({comments: a})
    .comments.pull(a);

    await User.find({comments: a})
    .comments.pull(a);
    
    await Comment.findByIdAndDelete(a);
    console.log('Comment Deleted');
}

exports.createNewUser = createNewUser;
exports.createNewList = createNewList;
exports.createNewItem = createNewItem;
exports.createNewComment = createNewComment;

exports.readCurrentUser = readCurrentUser;
exports.readCurrentList = readCurrentList;
exports.readCurrentItem = readCurrentItem;
exports.readCurrentComment =readCurrentComment;

exports.updateCurrentUser = updateCurrentUser;
exports.updateCurrentList = updateCurrentList;
exports.updateCurrentItem = updateCurrentItem;
exports.updateCurrentComment = updateCurrentComment;

exports.deleteCurrentUser = deleteCurrentUser;
exports.deleteCurrentList = deleteCurrentList;
exports.deleteCurrentItem = deleteCurrentItem;
exports.deleteCurrentComment = deleteCurrentComment;

exports.User = User;