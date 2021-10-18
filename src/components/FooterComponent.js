import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

export const FooterComponent = () => {
  return (
    <div className="footer py-2 mt-3">
      <hr className="logo-hr" />
      <Container>
        <Row className="justify-content-between">

          <Col>
            <h1 className="logo-title">Lingr</h1>
            <p className="logo-subtitle">microblogging for language learners</p>
          </Col>

          <Col>
            <h5 className="float-right text-right">
              <Link to="/about">About</Link> 
              <br/>
              <a
                href="https://www.paypal.com/paypalme/gordonmaloney"
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
            </h5>
          </Col>

        </Row>
      </Container>
    </div>
  );
};
