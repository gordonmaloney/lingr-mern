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
    replyId: String,
    replyAuthor: String,
    replyBody: String,
    correctionBody: String,
    replyType: String,
    replyDate: String
    }
  ]
});

const PostBody = mongoose.model("PostBody", postSchema);

export default PostBody;
