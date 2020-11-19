const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {                           // models/User 의 정보를 모두 가져올수 있다.
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        maxlength: 50
    },

    description: {
        type: String,
    },

    private: {
        type: Number
    },

    category: {
        type: String
    },

    filePath: {
        type: String
    },

    duration: {
        tpye: String
    },

    thumbnail: {
        type: String
    },

    views: {
        type: Number,
        default: 0
    }

   

    
}, { timestamps: true })            // timestamps: true ==> createDate와 ModifyDate를 자동으로 기록 해줌



const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }