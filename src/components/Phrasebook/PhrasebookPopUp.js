import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { addWord } from "../../actions/phrasebooks";
import Draggable from "react-draggable";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from "@mui/material";

export const PhrasebookPopUp = () => {
    const [showPhrasePop, setShowPhrasePop] = useState('true')
  const phrasebooks = useSelector((state) => state.phrasebooks);

  const dispatch = useDispatch();
  const [phrase, setPhrase] = useState({ word: "", note: "" });

  function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      activeElTagName == "textarea" ||
      (activeElTagName == "input" &&
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
        typeof activeEl.selectionStart == "number")
    ) {
      text = activeEl.value.slice(
        activeEl.selectionStart,
        activeEl.selectionEnd
      );
    } else if (window.getSelection) {
      text = window.getSelection().toString();
    }
    return text;
  }

  document.onmouseup =
    document.onkeyup =
    document.onselectionchange =
      function () {
        setPhrase({ ...phrase, word: getSelectionText() });
      };

  const handleAddWord = (e) => {
    e && e.preventDefault();
    dispatch(addWord(phrasebooks[phrasebooks.length - 1]._id, phrase));
    console.log(phrase);
  };


    {if (showPhrasePop) {
        return (
    <Draggable handle=".handle">
      <div
        style={{
          zIndex: 10,
          position: "absolute",
          top: 200,
          right: 50,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          borderRadius: "5px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
          width: "250px",
          padding: "5px 7px",
        }}
      >
        <div className="handle">
          <DragHandleIcon /> Add to phrasebook? <CloseIcon style={{float: 'right'}} onClick={()=>{setShowPhrasePop(false)}}/>
          {console.log(phrase.word)}
          <br />
          <br />
          <center>
            {phrase.word ? (
              <em>{phrase.word}</em>
            ) : (
              <em>Highlight a word to add it to your phrasebook</em>
            )}
          </center>
          <br />
        </div>
        <Button
          className="submit-btn"
          color="primary"
          outline
          onClick={(e) => handleAddWord(e)}
        >
          Add
        </Button>
      </div>
    </Draggable>
         ) } else {
                return <>
                        <Chip className="chip" variant="outlined" label="Show pop-up" onClick={() => {setShowPhrasePop(true)}} />
                </>
            }
        }
}
