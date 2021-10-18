import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  //userPersistentId: String,
  userId: String,
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
    replyAuthorId: String,
    replyBody: String,
    correctionBody: String,
    replyType: String,
    replyDate: String,
    replyRead: Boolean
    }
  ]
});

const PostBody = mongoose.model("PostBody", postSchema);

export default PostBody;