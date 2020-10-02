const mongoose = require('mongoose');
const {userModel, listModel, itemModel, commentModel} = require('./mongooseModels');




/* CRUD FUNCTIONALITY */

//Create

const createNewUser = async (a,b,c,d,e,f,g,h,i) => {
    const User = await userModel.create({
        name: a,
        username: b,
        password: c,
        email: d,

        org: e,
        type: f,

        level: g,
        renew: true,
        renew_type: h,
        renew_date: (h == 'yearly'? new Date(new Date().setFullYear(new Date().getFullYear() + 1)): new Date(new Date().setMonth(new Date().getMonth() + 1))),

        subscription: i,
        lists: [],
        comments: []

    })
}

const createNewList = async (a,b,c) => {
    const List = await listModel.create({
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
    const Item = await itemModel.create({
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
    const Comment = await commentModel.create({
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