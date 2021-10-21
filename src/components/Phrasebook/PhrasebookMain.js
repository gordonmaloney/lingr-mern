import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhrasebooks } from "../../actions/phrasebooks";

import { addWord } from "../../actions/phrasebooks";
import { deleteWord } from "../../actions/phrasebooks";
import { editWord } from "../../actions/phrasebooks";
import { Card, CardHeader } from "reactstrap";
import { Phrasebook } from "./Phrasebook";
import { CSVLink, CSVDownload } from "react-csv";
import { EditPhraseModal } from "./EditPhraseModal";
import { Button } from "reactstrap";

export const PhrasebookMain = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const phrasebooks = useSelector((state) => state.phrasebooks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhrasebooks());
  }, []);

  const handleDeleteWord = (e, wordId) => {
    e.preventDefault();
    dispatch(deleteWord(phrasebooks[phrasebooks.length - 1]._id, wordId));
  };

  const handleEditWord = (e, wordId) => {
    e.preventDefault();
    dispatch(
      editWord(phrasebooks[phrasebooks.length - 1]._id, wordId, {
        word: "word",
        note: "note",
      })
    );
  };

  return (
    <div className="container">
      <center>
        <Card className="mb-3">
          <CardHeader>
            <h3 className="my-3">Your Phrasebook</h3>
          </CardHeader>
        </Card>
      </center>

      {phrasebooks.length > 0 && (
        <CSVLink
          filename={"my-phrasebook.csv"}
          data={phrasebooks[phrasebooks.length - 1].words.map(
            ({ _id, ...attributs }) => attributs
          )}
          style={{ float: "right" }}
        >
          Download as CSV
        </CSVLink>
      )}

      <ul>
        {phrasebooks.length > 0 &&
          phrasebooks[phrasebooks.length - 1].words.map((entry, index) => (
            <li>
              {entry.word} {entry.note && <> - {entry.note}</>}
              <br />
              <EditPhraseModal
                phrase={entry}
                phrasebook={phrasebooks[phrasebooks.length - 1]}
              />
              {"   "}
              <Button
                size="sm"
                color="danger"
                onClick={(e) => handleDeleteWord(e, entry._id)}
              >
                Delete
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};
