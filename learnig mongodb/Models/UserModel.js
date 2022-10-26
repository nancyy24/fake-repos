
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    full_name:{type:String},
    email:{type:String},
    mobile:{type:Number},
    password:{type:String}
});

const UserModel = mongoose.model("user",UserSchema,"users");

module.exports = UserModel;
