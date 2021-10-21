import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhrasebooks } from "../../actions/phrasebooks";

import { createPhrasebook } from "../../actions/phrasebooks";
import { addWord } from "../../actions/phrasebooks";
import { deleteWord } from "../../actions/phrasebooks";
import { editWord } from "../../actions/phrasebooks";

export const Phrasebook = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [phrase, setPhrase] = useState({ word: "", note: "" });
  const phrasebooks = useSelector((state) => state.phrasebooks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhrasebooks());
  }, []);


  const handleCreateNew = (e) => {
    e.preventDefault()
    dispatch(createPhrasebook({userId: user.result._id}));
  }

  const handleAddWord = (e) => {
    e.preventDefault()
    dispatch(addWord(phrasebooks[phrasebooks.length-1]._id, phrase))
    console.log(phrase)
  }

  const handleDeleteWord = (e, wordId) => {
    e.preventDefault()
    dispatch(deleteWord(phrasebooks[phrasebooks.length-1]._id, wordId))
  }

  const handleEditWord = (e, wordId) => {
    e.preventDefault()
    dispatch(editWord(phrasebooks[phrasebooks.length-1]._id, wordId, {word: "word", note: "note"}))
  }

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

  return (
    <div>

<button onClick={(e) => handleCreateNew(e)}>Create new phrasebook</button>

      <em>{phrase.word}</em>
      <br />
      {phrase.word && (
        <>
          Add this to your phrasebook?
          
          <button onClick={(e) => handleAddWord(e)}> Okay</button>
        </>
      )}

      {phrasebooks[0] && (
        <>
          <br />
          <br />
          Your phrasebook:
          <ul>
            {phrasebooks[phrasebooks.length-1].words.map((entry, index) => (
              <li>
                {entry.word} {entry.note && <> - {entry.note}</>}
                <br />
                
                <button onClick={(e) => handleEditWord(e, entry._id)}>Edit</button>

                <button onClick={(e) => handleDeleteWord(e, entry._id)}>Remove from phrasebook</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
