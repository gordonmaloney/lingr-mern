import React, { Component, useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

export const LingReply = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const lings = useSelector((state) => state.posts);

  const ling = lings.filter(ling => ling._id === props.match.params.id)[0];

  console.log(lings);

  if (!ling) {
    return <>aefsrgd</>;
  } else {
    return (
      <div key={ling._id}>
        <Card className="ling mb-3">
          <CardHeader>
            <span className="ling-date">{ling.lingLang}</span>
            <h3>
              {ling.userIcon} - {ling.userName}
            </h3>
          </CardHeader>
          <CardBody>{ling.lingBody}</CardBody>
          <div className="cor-pref-timeline">
            <center>
              Correction preference: <b>{ling.lingCorPref}</b>
            </center>
          </div>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
};
