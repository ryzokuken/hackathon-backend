// const restful = require('node-restful');
// const mongoose = restful.mongoose;
//
// let Posts = new mongoose.Schema({
//     title : String,
//     type : {type : String, default : "text", enum : ['txt', 'md', 'vid', 'pdf']},
//     text : String,
//     file : String,
//     hits : { type : Number, default: 0 },
//     likes : {
//         count : Number,
//         by : [String]
//     },
//     createdOn : {type : Date, default : Date.now},
//     comments : [{
//         text: String,
//         createdOn: {
//             type: Date,
//             "default": Date.now
//         },
//         by : {
//             name : String,
//             avatar : String,
//             id : String
//         }
//     }]
// });
//
// module.exports = restful.model('State', State);