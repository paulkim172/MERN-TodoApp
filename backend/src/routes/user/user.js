const {readCurrentUser} = require('../../database/mongooseCRUD');

exports.user = (app) => {
    app.get('/user',function (req,res){
        let currentUser = readCurrentUser(req.header.authorization);
        console.log(currentUser);
        res.json(currentUser);
    })
}