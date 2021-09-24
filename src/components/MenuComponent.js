import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import {NewLingModal} from "./NewLingModal";

export const MenuComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogInOutClick = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return isLoggedIn ? (
    <>
      <Row className="mb-3">
        <Col xs="4" sm="12">
          <Link to="/">
            <NewLingModal />
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/">
            <Button color="primary" className="menu-btn" outline>
              📰<span className="d-none d-md-inline"> Timeline</span>
            </Button>
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/notifications">
            <Button color="primary" className="menu-btn" outline>
              🔔<span className="d-none d-md-inline"> Notifications</span>
            </Button>
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/profile">
            <Button color="primary" className="menu-btn" outline>
              🧍<span className="d-none d-md-inline"> Profile</span>
            </Button>
          </Link>
        </Col>
        <Col xs="2" sm="12">
          <Link to="/">
            <Button
              color="primary"
              className="menu-btn"
              outline
              onClick={handleLogInOutClick}
            >
              ◀️<span className="d-none d-md-inline"> Log-out</span>
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  ) : (
    <>
          <Row className="mb-3">
            <Col xs="6" sm="12">
              <Link to="/about">
                <Button color="primary" className="menu-btn" outline>
                  ❓
                  <span className="d-inline d-sm-none d-md-inline"> About</span>
                </Button>
              </Link>
            </Col>
            <Col xs="6" sm="12">
              <Button
                color="primary"
                className="menu-btn"
                outline
                onClick={handleLogInOutClick}
              >
                ▶️
                <span className="d-inline d-sm-none d-md-inline"> Log-in</span>
              </Button>
            </Col>
          </Row>
        </>
  );
};
