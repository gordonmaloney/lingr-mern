import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

export const Ling = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));


  
    const LingsList = (props) => {
    if (props.lings.length == 0) {
      return <div className="loader">🤔</div>;
    } else {
      return props.lings.map((ling) => {
        if (props.lang === "Show All") {
          return (
            <>
              <Link to={`/reply/${ling._id}`} className="timeline-no-link">
                <Card className="ling mb-3 timeline-no-link">
                  <CardHeader>
                    <span className="ling-date">{ling.lingLang}</span>
                    <h3>
                      {ling.userIcon} - {ling.userName}
                    </h3>
                  </CardHeader>
                  <CardBody>{ling.lingBody}</CardBody>
                  {ling.lingCorPref !== "" && (
                    <div className="cor-pref-timeline">
                      <center>
                        Correction preference: {ling.lingCorPref}
                      </center>{" "}
                    </div>
                  )}
                  <CardFooter>
                    {
                      ling.lingRepliesObj.filter(
                        (ling) => ling.replyType === "reply"
                      ).length
                    }{" "}
                    Replies |{" "}
                    {
                      ling.lingRepliesObj.filter(
                        (ling) => ling.replyType === "correction"
                      ).length
                    }{" "}
                    Corrections
                    <span className="ling-date">{ling.lingDate}</span>
                  </CardFooter>
                  <CardBody className="ling-reply">
                    {user ? (
                      <input
                        className="ling-reply-text"
                        type="text"
                        placeholder="Type your reply or correction here..."
                      />
                    ) : (
                      <input
                        className="ling-reply-text"
                        type="text"
                        disabled
                        defaultValue="Log in or sign up to reply"
                      />
                    )}
                  </CardBody>
                </Card>
              </Link>
            </>
          );
        } else if (props.lang === ling.lingLang) {
          return (
            <>
              <Link to={`/reply/${ling.id}`} className="timeline-no-link">
                <Card className="ling mb-3 timeline-no-link">
                  <CardHeader>
                    <span className="ling-date">{ling.lingLang}</span>
                    <h3>
                      {ling.userIcon} - {ling.userName}
                    </h3>
                  </CardHeader>
                  <CardBody>{ling.lingBody}</CardBody>
                  {ling.lingCorPref !== "" && (
                    <div className="cor-pref-timeline">
                      <center>
                        Correction preference: {ling.lingCorPref}
                      </center>{" "}
                    </div>
                  )}
                  <CardFooter>
                    0 Replies | 0 Corrections
                    <span className="ling-date">{ling.lingDate}</span>
                  </CardFooter>
                  <CardBody className="ling-reply">
                    <input
                      className="ling-reply-text"
                      type="text"
                      placeholder="Type your reply or correction here..."
                    />
                  </CardBody>
                </Card>
              </Link>

            </>
          );
        }
      });
    }
  };

  return (
    <div>
      {props.lings.filter((ling) => ling.lingLang === props.lang).length > 0 ||
      props.lang === "Show All" ? (
        <LingsList lings={props.lings} lang={props.lang} />
      ) : (
        <center>
          <br />
          <br />
          <h3>
            Hmm... it doesn't look like there are any lings in {props.lang} yet!
            Why not be the first to write one?
          </h3>
        </center>
      )}
    </div>
  );
};
