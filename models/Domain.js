const restful = require('node-restful');
const mongoose = restful.mongoose;

let Domain = new mongoose.Schema({
    title : String,
    img : String,
    topics : [{
        title : String,
        img : String,
        posts : [{
            title : String,
            type : {type : String, default : "text"},
            text : String,
            file : String,
            hits : { type : Number, default: 0 },
            likes : {
                count : Number,
                by : [String]
            },
            createdOn : {type : Date, default : Date.now},
            comments : [{
                text: String,
                createdOn: {
                    type: Date,
                    "default": Date.now
                },
                by : {
                    name : String,
                    avatar : String,
                    id : String
                }
            }],
            createdBy : {
                name : String,
                avatar: String,
                id : String
            }
        }]
    }]
});
module.exports = restful.model('Domain', Domain);
