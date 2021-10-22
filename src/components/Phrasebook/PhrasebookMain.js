import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhrasebooks } from "../../actions/phrasebooks";

import { createPhrasebook } from "../../actions/phrasebooks";
import { deleteWord } from "../../actions/phrasebooks";
import { editWord } from "../../actions/phrasebooks";
import { Card, CardHeader } from "reactstrap";
import { Phrasebook } from "./Phrasebook";
import { CSVLink, CSVDownload } from "react-csv";
import { EditPhraseModal } from "./EditPhraseModal";
import { Button } from "reactstrap";

import { Container, Row, Col } from "reactstrap";

export const PhrasebookMain = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const phrasebooks = useSelector((state) => state.phrasebooks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhrasebooks());
  }, []);

  const userPhrasebook = phrasebooks.filter(phrasebook => phrasebook.userId == user?.result._id)
  
  userPhrasebook && console.log("user phrasebook", userPhrasebook)

  if (phrasebooks.length > 0 && userPhrasebook == []) {
    console.log("creating phrasebook...")
    dispatch(createPhrasebook({userId: user.result._id}));
  }


  const handleDeleteWord = (e, wordId) => {
    e.preventDefault();
    dispatch(deleteWord(userPhrasebook[userPhrasebook.length - 1]._id, wordId));
  };

  const handleEditWord = (e, wordId) => {
    e.preventDefault();
    dispatch(
      editWord(userPhrasebook[userPhrasebook.length - 1]._id, wordId, {
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
        <>
              <p>To add a translation or a note to any of the entries in your phrasebook, just hit 'edit'.
                <br />You can also {" "}
        <CSVLink
          filename={"my-phrasebook.csv"}
          data={userPhrasebook[userPhrasebook.length - 1].words.map(
            ({ _id, ...attributs }) => attributs
          )}
        >
          download your phrasebook as a CSV file
        </CSVLink>
        {" "}for use with flashcard apps.
        </p>
        </>
      )}

      <Container style={{width: '75%'}}>
        {phrasebooks.length > 0 &&
          userPhrasebook[userPhrasebook.length - 1].words.map((entry, index) => (
            <Row className="phrasebook-listitems justify-content-between">
              
            <Col className="align-self-center">
              {entry.word} {entry.note && <> - {entry.note}</>}

            
            </Col>

            <Col sm={4} className="align-self-center">
              <center>
              <EditPhraseModal
                phrase={entry}
                phrasebook={userPhrasebook[userPhrasebook.length - 1]}
              />
              <Button
                style={{transform: 'scale(0.8)'}}
                size="sm"
                color="danger"
                onClick={(e) => handleDeleteWord(e, entry._id)}
              >
                Delete
              </Button>
              </center>
              </Col>

            </Row>
          ))}
      </Container>
    </div>
  );
};
