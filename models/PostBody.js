import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userIcon: String,
  userName: String,
  lingBody: String,
  lingDate: String,
  lingLang: String,
  lingCorPref: String,
  lingRepliesObj: [
    {
    replyId: Number,
    replyAuthor: String,
    replyType: String,
    correctionBody: String,
    replyBody: String,
    replyDate: String
    }
  ]
});

const PostBody = mongoose.model("PostBody", postSchema);

export default PostBody;
