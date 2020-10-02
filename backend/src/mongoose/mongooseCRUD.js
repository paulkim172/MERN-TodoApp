const mongoose = require('mongoose');
const {userModel, listModel, itemModel, commentModel } = require('./mongooseModels');




/* CRUD FUNCTIONALITY */

//Create

const createNewUser = (a,b,c,d,e,f,g,h,i) => {
    await userModel.create({
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
        lists: []

    })
}

const createNewList = (a,b,c) => {
    const List = await listModel.create({
        name: a,
        published_date: new Date(),
        show_in_main: b
    })

    List.findOne({_id: c})
    .populate('user_id')
    .exec(function(err, list){
        if (err) return handleError(err);
        console.log('The user of this list is %s', list.user_id.name)
    })

}

const createNewItem = (a,b,c,d,e,f) => {
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

    Item.findOne({id: f})
    .populate('list_id')
    .exec(function(err, item) {
        if (err) return handleError(err);
        console.log('The list of this item is %s', item.list_id.name)
    })
}

const createNewComment = (a,b,c) => {
    const Comment = await commentModel.create({
        published_date: new Date(),
        description: a
    })

    Comment.findOne({id: b})
    .populate('item_id')
    .exec(function(err,comment){
        if (err) return handleError(err);
        console.log('The item of this comment is %s', comment.item_id.name)
    })

    Comment.findOne({id: c})
    .populate('author')
    .exec(function(err,comment){
        if (err) return handleError(err);
        console.log('The author of this comment is %s', comment.item_id.name)
    })
}

exports.createNewUser = createNewUser;
exports.createNewList = createNewList;
exports.createNewItem = createNewItem;
exports.createNewComment = createNewComment;