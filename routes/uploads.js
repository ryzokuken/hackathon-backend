const express = require('express');
const path = require('path');
const router =  express.Router();
const multer  = require('multer');
const mongoose = require('mongoose');

const Domain = mongoose.model('Domain');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), function (req, res) {
    let body = req.body;
    // console.log(req.file);
    console.log(body);
    Domain
        .findOne({
            _id : body.domainId
        })
        .exec()
        .then((data)=>{
            console.log(data);
            let topic = data.topics.id(body.topicId);
            console.log(topic);
            topic.posts.push({
                title : body.title,
                type : req.file ? req.file.mimetype : 'text',
                text : body.text,
                file : req.file.filename,
                createdBy : {
                    name : body.creatorName,
                    avatar : body.creatorAvator,
                    id : body.creatorId
                }
            });
          data.save((err, saved) => {
              console.log(saved);
               if(err)
                   res.status(500).send(err.message);
               else
                   res.send({
                       success : true
                   })
          })
        })
        .catch(err => res.status(500).json(err.message));
});

module.exports = router;
