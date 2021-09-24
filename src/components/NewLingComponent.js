import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/posts";
import { Label, Row, Button, ModalBody } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

export const NewLingComponent = (props) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    userIcon: "😎",
    userName: "Gordon Maloney",
    lingBody: "",
    lingDate: "",
    lingLang: "",
    lingCorPref: "",
    lingRepliesObj: [],
  });

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;

  const handleSubmit = () => {
    dispatch(createPost(postData));
  };

  return (
    <div>
      <ModalBody>
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
                <option>...</option>
                <option>Scottish Gaelic</option>
                <option>Spanish</option>
                <option>German</option>
                <option>Portuguese</option>
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
                onChange={(e) =>
                  setPostData({ ...postData, lingCorPref: e.target.value })
                }
                className="mb-3 form-control"
                validators={{
                  required,
                }}
              >
                <option>...</option>
                <option>Strict - please correct any errors</option>
                <option>
                  Relaxed - only correct more significant mistakes
                </option>
                <option>Chill - please don't correct me</option>
              </Control.select>
              <Errors
                className="text-danger"
                model=".newLingCorPref"
                show="touched"
                component="div"
                messages={{
                  required: "Select your correction preference",
                }}
              />
            </Row>

            <Row className="d-flex flex-row-reverse border-top pt-3">
              <Button type="submit" color="primary" outline>
                Post Ling
              </Button>

              <Button color="secondary" onClick={props.close} outline>
                Cancel
              </Button>
            </Row>
          </LocalForm>
        </div>
      </ModalBody>
    </div>
  );
};
