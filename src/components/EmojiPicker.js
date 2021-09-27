import React, { useState } from "react";
import { Button } from "reactstrap";

import Picker from "emoji-picker-react";
import OutsideClickHandler from 'react-outside-click-handler';


export const EmojiPicker = ({setFormData}) => {
  const [showEmojiPicker, togglePicker] = useState(() => false);

  const [emoji, setEmoji] = useState("😃")

  const toggleEmojiPicker = () => togglePicker((prev) => !prev);

  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    toggleEmojiPicker();
    console.log(emojiObject.emoji)
    setEmoji(emojiObject.emoji)
    togglePicker(false)

    setFormData(emojiObject.emoji)
  };

  return (

    <>
            <OutsideClickHandler onOutsideClick={showEmojiPicker => togglePicker(false)} >

                <Button  style={{width: "100%"}} outline type="button" className="EmojiPicker__Btn" onClick={() => toggleEmojiPicker()} block> {emoji} </Button>

                {showEmojiPicker && (
                    <Picker onEmojiClick={onEmojiClick}  pickerStyle={{ width: '100%' }}/> 
                 )}
            </OutsideClickHandler>

    </>

  );
};

export default EmojiPicker