import mongoose from "mongoose";

const phrasebookSchema = mongoose.Schema({
  userId: String,
  words: [
    {
    word: String,
    note: String,
    }
  ]
});

const Phrasebook = mongoose.model("Phrasebook", phrasebookSchema);

export default Phrasebook;
