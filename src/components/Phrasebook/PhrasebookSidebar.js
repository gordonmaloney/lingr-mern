import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Button, Fab } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { getPhrasebooks } from "../../actions/phrasebooks";
import { CSVLink, CSVDownload } from "react-csv";

import { Phrasebook } from "./Phrasebook";

export default function PhrasebookSidebar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const phrasebooks = useSelector((state) => state.phrasebooks);

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
      <List>
        <ListItem>
          <h4>Your phrasebook</h4>
</ListItem>
<ListItem>
          {phrasebooks.length > 0 && (
            <CSVLink
              filename={"my-phrasebook.csv"}
              data={phrasebooks[phrasebooks.length - 1].words}
            >
              Download as CSV
            </CSVLink>
          )}
        </ListItem>
      </List>
      <Divider />
      <List>
        {!user ? (
          <ListItem>"Log in to see your phrasebook."</ListItem>
        ) : (
          phrasebooks.length > 0 &&
          phrasebooks[phrasebooks.length - 1].words.map((entry, index) => (
            <ListItem>
              {entry.word} {entry.note && <> - {entry.note}</>}
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Fab
          className="fab"
          style={{ float: "right" }}
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
    </div>
  );
}
