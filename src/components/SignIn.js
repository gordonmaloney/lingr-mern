import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Label, Row, Button, ModalBody } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { useHistory } from "react-router";

import { signin } from "../actions/auth";

export const SignIn = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userIcon: "😎",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;

  const handleSubmit = () => {
console.log(formData)
    dispatch(signin(formData, history));
  };

  return (
    <div className="container">
      <LocalForm onSubmit={() => handleSubmit()}>

        <Row className="form-group">
          <Label htmlFor="newLingLang">Your email:</Label>

          <Control.text
            model=".email"
            id="email"
            name="email"
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
          <Label htmlFor="newLingLang">Enter your password:</Label>

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

        <Row className="d-flex flex-row-reverse border-top pt-3">
          <Button type="submit" color="primary" outline>
            Sign Up
          </Button>
        </Row>
      </LocalForm>
    </div>
  );
};