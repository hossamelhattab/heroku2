const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const adminSchema = new Schema({
//   Username: {
//     type: String,
//     required: true,
//   },
//   Password:{
//     type:String,
//     required:true,
//     minLength:[8,"password must be 8 or more charachters"],
//     validate: {
//         validator: function(str) {
//             return /[a-z]/.test(str) && /[A-Z]/.test(str);
//         },
//         message: "Password must include Uppercase and Lowerase letters"
//       },
//     required: [true, 'password is required']
//     },
//   Email: {
//     type: String,
//     validate: {
//         validator: function(str) {
//             return str.includes('@');
//         },
//         message: "invalid email address"
//       },
//   },

// });
const adminSchema = new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
});

const Admin = mongoose.model('admins', adminSchema);
module.exports = Admin;