import React, {useState} from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

//layout stuff

//packages
import { Container, Col, Row } from "reactstrap";

//components
import { MenuComponent } from "./MenuComponent";
import { TimelineComponent } from "./TimelineComponent";
import { HeaderComponent } from "./HeaderComponent";
import { FooterComponent } from "./FooterComponent";
import { NotificationsComponent } from "./NotificationsComponent";
import { LingReply } from "./LingReply";
import { About } from "./About";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { EditProfile } from "./EditProfile";
import PhrasebookSidebar from "./Phrasebook/PhrasebookSidebar";
import { PhrasebookMain } from "./Phrasebook/PhrasebookMain";
import { PhrasebookPopUp } from "./Phrasebook/PhrasebookPopUp";

export const Main = () => {


  
  return (
    <>
      <BrowserRouter>
        <Container>



          <HeaderComponent />


          <Row>
            <Col xs="12" md="3">
              <MenuComponent />
            </Col>
            <Col md="9">
              <Switch>
                <Route exact path="/">
                  <TimelineComponent />
                </Route>
                <Route exact path="/notifications">
                  <NotificationsComponent />
                </Route>

                <Route path="/reply/:id" component={LingReply} XXX />
                <Route path="/about">
                  {" "}
                  <About />{" "}
                </Route>

                <Route path="/join">
                  <SignUp />
                </Route>
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route path="/profile">
                  <EditProfile />
                </Route>


                <Route path="/phrasebook">
                  <PhrasebookMain />
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
