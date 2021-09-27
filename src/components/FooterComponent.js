import React from "react";
import { Link } from "react-router-dom";

export const FooterComponent = () => {
  return (
    <div className="footer border-top py-2 mt-3">
      <center>
        <h4>Lingr - microblogging for language learners</h4>
        <br />
        <h5>
          <Link to="/about">About</Link> |{" "}
          <a href="https://www.paypal.com/paypalme/gordonmaloney" target="_blank" rel="noreferrer">
            Donate via Paypal
          </a>
        </h5>
      </center>
    </div>
  );
};
