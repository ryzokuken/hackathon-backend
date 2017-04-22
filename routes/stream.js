const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');


// only for mp4 streaming
router.get('/:path', (req, res) => {
    console.log('in streaming');
    // uncomment this if No Downloading is required.
    // in that case other files need to be serve from another end point

    // if (!/\.mp4$/.test(req.params.path)) {
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     res.end(`<video src="http://localhost:3000/stream/${req.params.path}.mp4" controls></video>`);
    // } else {
    let file = path.join(__dirname, '..', 'uploads', req.params.path);
    if(/\.mp4$/.test(req.params.path)){
        console.log(file);
        fs.stat(file, function(err, stats) {
            console.log(file);
            if (err) {
                if (err.code === 'ENOENT') {
                    // 404 Error if file not found
                    return res.sendStatus(404);
                }
                res.end(err);
            }
            let range = req.headers.range;
            if (!range) {
                // 416 Wrong range
                // asking for download
                return res.sendStatus(416);
            }
            let positions = range.replace(/bytes=/, "").split("-");
            let start = parseInt(positions[0], 10);
            let total = stats.size;
            let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            let chunksize = (end - start) + 1;

            res.writeHead(206, {
                "Content-Range": "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4"
            });
            console.log(file);

            let stream = fs.createReadStream(file, { start: start, end: end })
                .on("open", function() {
                    console.log('streaming');
                    stream.pipe(res);
                }).on("error", function(err) {
                    res.end(err);
                });
        });
    }
    else{
        // simply serve the file
        let stream = fs.createReadStream(file)
            .on("open", function() {
                console.log('streaming');
                stream.pipe(res);
            }).on("error", function(err) {
                res.end(err);
            });
    }
});

// for all other type of streaming
router.get('/data',(req, res) => {

});

module.exports = router;