import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home";

//packages
import { Container, Col, Row } from 'reactstrap'

//components
import {MenuComponent} from "./MenuComponent";
import {TimelineComponent} from "./TimelineComponent";
import {HeaderComponent} from "./HeaderComponent";
import {FooterComponent} from "./FooterComponent";
import {NotificationsComponent} from "./NotificationsComponent";
import {ProfileComponent} from "./ProfileComponent";
import {LingReply} from "./LingReply";
import {About} from "./About";

export const Main = () => {
  return (
    <>
    <BrowserRouter>
      <Container>
        <HeaderComponent />
        <Row>
          <Col sm="2" md="3">
            <MenuComponent />
          </Col>
          <Col sm="9">
            <Switch>
              <Route exact path="/">
                <TimelineComponent />
              </Route>
              <Route exact path="/notifications">
                <NotificationsComponent />
              </Route>
              <Route exact path="/profile">
                <ProfileComponent />
              </Route>
              <Route path="/reply/:id" component={LingReply} XXX />
              <Route path="/about">
                {" "}
                <About />{" "}
              </Route>
              <Route path="/">
                <TimelineComponent />
              </Route>
            </Switch>
          </Col>
        </Row>
        <FooterComponent className="mt-5" />
      </Container>
    </BrowserRouter>
    </>
  );
};