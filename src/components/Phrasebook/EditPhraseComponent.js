import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Label, Row, Button } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

import { editWord } from "../../actions/phrasebooks";



export const EditPhraseComponent = ({phrasebook, phrase, close}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();

  const [wordData, setWordData] = useState({
    word: phrase.word,
    word: phrase.note
  });



  const handleSubmit = (phrase) => {
    dispatch(editWord(phrasebook._id, phrase._id, wordData));
    close();
  };

  return (
    <div className="container">
      <LocalForm onSubmit={() => handleSubmit(phrase)}>
        <Row className="form-group">
          <Label htmlFor="word">Edit your phrase</Label>

          <Control.input
            model=".word"
            id="word"
            name="word"
            defaultValue={phrase.word}
            className="mb-3 form-control"
            rows="1"
            onChange={(e) =>
                setWordData({ ...wordData, word: e.target.value })
            }
          />

        </Row>
        <Row className="form-group">
          <Label htmlFor="note">Note/Translation</Label>
          <br />
          <Control.input
            model=".note"
            id="note"
            name="note"
            defaultValue={phrase.note}
            className="mb-3 form-control"
            rows="1"
            onChange={(e) =>
                setWordData({ ...wordData, note: e.target.value })
            }
            />
            </Row>
            
        <Row className="d-flex border-top pt-3">
          <Button type="submit" color="primary" className="submit-btn" outline>
            Edit Phrase
          </Button>

          <Button color="secondary" onClick={close} className="cancel-btn" outline>
            Cancel
          </Button>
        </Row>
      </LocalForm>
    </div>
  );
};
