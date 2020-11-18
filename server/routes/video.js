const express = require('express');
const router = express.Router();
// const {Video} = require('../models/Video');
const { auth } = require("../middleware/auth");
const multer = require('multer');               // 노드 서버에 파일을 저장하기 위한 Dependency의 다운로드 : npm install multer --save

// configOption
let storage = multer.diskStorage({
    // 업로드한 파일의 저장위치 / uploads 파일 생성해야 함
    destination: (req,file,cb) => {
        cb(null,"uploads/");
    },

    // 업로드한 파일의 파일명의 지정
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`);
    },

    // mp4파일만 받을수 있음을 의미
    fileFilter: (req,file,cb) =>{
        const ext = path.extname(file.originalname);
        if(ext !== 'mp4'){
            return cb(res.status(404).end('only mp4 is allowed'),false);
        }
        cb(null, true)
    }
});

// configOption을 multer에 넣어서 upload 변수에 넣어준것
const upload = multer({storage: storage}).single("file");

router.post("/uploadfiles",(req,res) =>{
    // 클라이언트로 부터 받은 비디오를 저장(upload폴더에)
    upload(req,res,error => {
        if(error){
            return res.json({success: false,error})
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
})

module.exports = router;
