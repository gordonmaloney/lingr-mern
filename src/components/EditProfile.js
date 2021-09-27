import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Label, Row, Button, ModalBody } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { useHistory } from "react-router";
import { Card, CardHeader } from "reactstrap";
import { signup } from "../actions/auth";
import { editProfile } from "../actions/auth";

import { EmojiPicker } from "./EmojiPicker";

export const EditProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    _id: user.result._id,
    persistentId: user.result.persistentId,
    userIcon: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    defaultCorPref: ""
  });

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;

  const handleSubmit = () => {
    console.log(formData);
    dispatch(editProfile(formData, history));
  };


  return (
    <div className="container">
                <center>
        <Card className="mb-3">
          <CardHeader>
          <h3 className="my-3">Edit your details</h3>
          </CardHeader>
          </Card>
        </center>
      <LocalForm onSubmit={() => handleSubmit()}>
      <Row className="form-group">
          <Label htmlFor="newLingLang">Username:</Label>

          <Control.text
            model=".username"
            id="username"
            name="username"
            placeholder="Username..."
            className="mb-3 form-control"
            defaultValue={user.result.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            validators={{
              required,
              minLength: minLength(2),
              maxLength: maxLength(25),
            }}
          />
          <Errors
            className="text-danger"
            model=".username"
            show="touched"
            component="div"
            messages={{
              required: "",
              minLength: "Must be at least 2 characters",
              maxLength: "Must be 25 characters or less",
            }}
          />
        </Row>

        <Row >
          <Label htmlFor="newLingLang">Pick an emoji as your user icon: </Label>
        </Row>
        <Row className="form-group">
          <EmojiPicker
            setFormData={(e) => setFormData({ ...formData, userIcon: e })}
          />
        </Row>

        <Row className="form-group">
          <Label htmlFor="newLingLang">Your email:</Label>

          <Control.text
            model=".email"
            id="email"
            name="email"
            defaultValue={user.result.email}
            placeholder="Email..."
            className="mb-3 form-control"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            validators={{
              required,
              minLength: minLength(2),
              maxLength: maxLength(25),
            }}
          />
          <Errors
            className="text-danger"
            model=".email"
            show="touched"
            component="div"
            messages={{
              required: "",
              minLength: "Must be at least 2 characters",
              maxLength: "Must be 25 characters or less",
            }}
          />
        </Row>

        <Row className="form-group">
          <Label htmlFor="newLingLang">Choose a password:</Label>

          <Control.password
            model=".password"
            id="password"
            name="password"
            placeholder="Your password..."
            className="mb-3 form-control"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            validators={{
              required,
              minLength: minLength(2),
              maxLength: maxLength(25),
            }}
          />
          <Errors
            className="text-danger"
            model=".password"
            show="touched"
            component="div"
            messages={{
              required: "",
              minLength: "Must be at least 2 characters",
              maxLength: "Must be 25 characters or less",
            }}
          />
        </Row>

        <Row className="form-group">
          <Label htmlFor="newLingLang">Confirm your password:</Label>

          <Control.password
            model=".confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Type your password again..."
            className="mb-3 form-control"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            validators={{
              required,
              minLength: minLength(2),
              maxLength: maxLength(25),
            }}
          />
          <Errors
            className="text-danger"
            model=".confirmPassword"
            show="touched"
            component="div"
            messages={{
              required: "",
              minLength: "Must be at least 2 characters",
              maxLength: "Must be 25 characters or less",
            }}
          />
        </Row>


        <Row className="form-group">
          <Label htmlFor="newLingCorPref">Your default correction preference</Label>
          <br />
          <Control.select
            type="select"
            name="newLingCorPref"
            id="newLingCorPref"
            model=".newLingCorPref"
            defaultValue={user.result.defaultCorPref}
            onChange={(e) =>
              setFormData({ ...formData, defaultCorPref: e.target.value })
            }
            className="mb-3 form-control"
            validators={{
              required,
            }}
          >
            <option>...</option>
            <option>Strict - please correct any errors</option>
            <option>Relaxed - only correct more significant mistakes</option>
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
            Save
          </Button>
        </Row>
      </LocalForm>
    </div>
  );
};
