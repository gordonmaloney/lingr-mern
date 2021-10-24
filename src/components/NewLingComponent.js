import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Label, Row, Button } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

import { createPost } from "../actions/posts";

import { LANGUAGES } from "../data/LANGUAGES";

export const NewLingComponent = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    //userPersistentId: user.result.persistentId,
    userId: user.result._id,
    userIcon: user.result.userIcon,
    userName: user.result.userName,
    lingBody: "",
    lingDate: "",
    lingLang: "",
    lingCorPref: user.result.defaultCorPref,
    lingRepliesObj: [],
  });

  console.log(user.result)

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;

  const handleSubmit = () => {
    dispatch(createPost(postData));
    props.close();
  };

  return (
    <div className="container">
      <LocalForm onSubmit={() => handleSubmit()}>
        <Row className="form-group">
          <Label htmlFor="newLingLang">Type your ling here</Label>

          <Control.textarea
            model=".newLingBody"
            id="newLingBody"
            name="newLingBody"
            placeholder="Type your ling here..."
            className="mb-3 form-control"
            rows="3"
            onChange={(e) =>
              setPostData({ ...postData, lingBody: e.target.value })
            }
            validators={{
              required,
              minLength: minLength(10),
              maxLength: maxLength(250),
            }}
          />
          <Errors
            className="text-danger"
            model=".newLingBody"
            show="touched"
            component="div"
            messages={{
              required: "",
              minLength: "Must be at least 10 characters",
              maxLength: "Must be 250 characters or less",
            }}
          />
        </Row>
        <Row className="form-group">
          <Label htmlFor="newLingLang">Select your language</Label>
          <br />
          <Control.select
            model=".newLingLang"
            id="newLingLang"
            name="newLingLang"
            type="select"
            className="mb-3 form-control"
            onChange={(e) =>
              setPostData({ ...postData, lingLang: e.target.value })
            }
            validators={{
              required,
            }}
          >
          {LANGUAGES.map(language => <option>{language}</option>)}

            
          </Control.select>
          <Errors
            className="text-danger"
            model=".newLingLang"
            show="touched"
            component="div"
            messages={{
              required: "Select a language",
            }}
          />
        </Row>
        <Row className="form-group">
          <Label htmlFor="newLingCorPref">Correction Preference</Label>
          <br />
          <Control.select
            type="select"
            name="newLingCorPref"
            id="newLingCorPref"
            model=".newLingCorPref"
            defaultValue={user.result.defaultCorPref}
            onChange={(e) =>
              setPostData({ ...postData, lingCorPref: e.target.value })
            }
            className="mb-3 form-control"
          >
            <option>...</option>
            <option>Strict - please correct any errors</option>
            <option>Relaxed - only correct more significant mistakes</option>
            <option>Chill - please don't correct me</option>
          </Control.select>
        </Row>

        <Row className="d-flex border-top pt-3">
          <Button type="submit" color="primary" className="submit-btn" outline>
            Post Ling
          </Button>

          <Button color="secondary" onClick={props.close} className="cancel-btn" outline>
            Cancel
          </Button>
        </Row>
      </LocalForm>
    </div>
  );
};
