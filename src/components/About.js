import React, { useState } from "react";
import { Collapse } from "reactstrap";

export const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <>
        <center>
          <h5 className="mt-5 mb-5">
            <i>Lingr is a microblogging site for language learners.</i>
          </h5>
        </center>
        <p>
          Sometimes you <b>don't want to write out a whole long essay</b>, but
          you still want to practice. Maybe you've just learned a new
          grammatical structure that you want to practice.{" "}
          <b>Then this is for you.</b>
        </p>
        <p>
          You can share short messages, and <b>friendly native speakers</b> can
          correct your mistakes - but you can even say how strict you'd like
          them to be, so don't worry about people jumping down your throat if
          you <b>just want a bit of fun.</b>
        </p>
        <p>
          The site is <b>free to use</b>, but if you'd like to support it then
          you are very welcome to{" "}
          <a
            href="https://www.paypal.com/paypalme/gordonmaloney"
            target="_blank"
            rel="noreferrer"
          >
            make a donation via PayPal
          </a>
        </p>
      </>
      <span
        className="fake-link"
        color="primary"
        onClick={toggle}
        style={{ marginBottom: "1rem" }}
      >
        The technical details...
      </span>
      <Collapse isOpen={isOpen}>
        Lingr is built using React, Redux and Reactstrap on the front end and MongoDB, Express and NodeJS on the back. If you
        have ideas for new features or would like to help with development,{" "}
        <i>by all means</i> be in touch!
      </Collapse>
    </div>
  );
};
