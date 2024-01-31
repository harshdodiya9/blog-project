const mongoose = require('mongoose');
const multer = require("multer");

const imagePath = "/uploades/adminImages";
const path = require("path");

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    city : {
       type : String,
       required : true 
    },
    gender : {
        type : String,
        require : true
    },
    hobby : {
        type : Array,
        require : true
    },
    adminImage : {
        type : String,
        require : true
    },
    isActive : {
        type : Boolean,
        require : true
    },
    create_date : {
        type : String,
        require : true
    },
    update_date : {
        type : String,
        require : true
    },
})

const ImageStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imagePath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }
})

AdminSchema.statics.uploadAdminImage = multer({storage :ImageStorage}).single("adminImage");
AdminSchema.statics.imageAdminPath = imagePath;

const Admin = mongoose.model("Admin",AdminSchema);
module.exports = Admin;