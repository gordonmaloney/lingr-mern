import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Fab } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { getPhrasebooks, createPhrasebook } from "../../actions/phrasebooks";
import { Phrasebook } from "./Phrasebook";
import { Link } from "react-router-dom";

import { Card, CardHeader } from "reactstrap";
import { Button } from "reactstrap";
import { addWord } from "../../actions/phrasebooks";
import Draggable from "react-draggable";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import { Chip } from "@mui/material";
import { useLocation } from "react-router";


export default function PhrasebookSidebar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const phrasebooks = useSelector((state) => state.phrasebooks);

  const location = useLocation();

  useEffect(() => {
    dispatch(getPhrasebooks());
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  const userPhrasebook = phrasebooks.filter(phrasebook => phrasebook.userId == user?.result._id)
  

  useEffect(() => {
    if (phrasebooks.length > 0 && userPhrasebook.length === 0 && user) {
      console.log("creating phrasebook...")
      dispatch(createPhrasebook({userId: user.result._id}));
    }
    dispatch(getPhrasebooks());
  }, [location])

  const [showPhrasePop, setShowPhrasePop] = useState(false);

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
    dispatch(addWord(userPhrasebook[userPhrasebook.length - 1]._id, phrase));
    console.log(phrase);
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Card style={{ borderRadius: "0px" }}>
        <CardHeader style={{ borderRadius: "0px" }}>
          <Link to="/phrasebook" className="timeline-no-link">
            <h4>Your phrasebook</h4>
          </Link>
        </CardHeader>
      </Card>
      <center>
        {!showPhrasePop && user?.result && (
          <>
            <br />
            <Chip
              className="chip"
              variant="outlined"
              label="Show pop-up"
              onClick={() => {
                setShowPhrasePop(true);
              }}
            />
          </>
        )}
      </center>

      <List>
        {!user?.result && userPhrasebook ? (
          <ListItem>Log in to see your phrasebook.</ListItem>
        ) : (
          phrasebooks.length > 0 && userPhrasebook.length > 0&&
          userPhrasebook[userPhrasebook.length - 1].words.map((entry, index) => (
            <ListItem>
              {entry.word} {entry.note && <> - {entry.note}</>}
            </ListItem>
          ))
        )}
      </List>


{/* ADD PHRASE FROM SIDE BAR
      <Card
        style={{
          position: "fixed",
          width: "250px",
          bottom: 0,
          borderRadius: "0px",
        }}
      >
        <CardHeader style={{ borderRadius: "0px" }}>
          Add a phrase
          <input placeholder="Type here..." onChange={e => setPhrase(e.target.value)}/>
          <Button
            className="submit-btn my-3"
            color="primary"
            outline
            onClick={(e) => handleAddWord(e)}
          >
            Add
          </Button>{" "}
        </CardHeader>
      </Card>
      */}

    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Fab
          className="fab"
          style={{ float: "right", zIndex: 5 }}
          onClick={toggleDrawer("right", true)}
          aria-label="Phrasebook"
        >
          <MenuBookOutlinedIcon className="fabicon" color="white" />
        </Fab>

        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>

      {showPhrasePop && (
        <Draggable handle=".handle">
          <div
            style={{
              zIndex: 10,
              position: "absolute",
              top: 200,
              right: 50,
              backdropFilter: "blur(2px)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              borderRadius: "5px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              width: "250px",
              padding: "5px 7px",
            }}
          >
            <div className="handle">
              <DragHandleIcon /> Add to phrasebook?{" "}
              <CloseIcon
                style={{ float: "right" }}
                onClick={() => {
                  setShowPhrasePop(false);
                }}
              />
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
      )}
    </div>
  );
}
