import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import { updatePost } from "../actions/posts";
import { deletePost } from "../actions/posts";
import { useHistory } from "react-router";

export const LingReply = (props) => {
  const history = useHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const required = (val) => val && val.length;
  const minLength = (len) => (val) => val && val.length >= len;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const lings = useSelector((state) => state.posts);

  const ling = lings.filter((ling) => ling._id === props.match.params.id)[0];

  const handleDelete = () => {
    dispatch(deletePost(ling._id));
    history.push('/')
  };


  const ReplyCorrect = (lingCorrect) => {
    const [reply, correct] = useState("reply");
    const dispatch = useDispatch();

    const [replyData, setReplyData] = useState({
      replyId: ling._id,
      replyAuthor: user?.result?.userName,
      replyBody: "",
      correctionBody: "",
      replyType: "reply",
      replyDate: ""
    })


    const toggle = () => {
      if (reply === "reply") {
        setReplyData({...replyData, replyType: "correction"})
        return correct("correction");
      }
      correct("reply");
      setReplyData({...replyData, replyType: "reply"})
    };

    const handleSubmit = (id) => {
      document.getElementById("replyReply").value = "";
      document.getElementById("replyReply").placeholder =
        "Type your reply here...";
      document.getElementById("replyCorrection").value = lingCorrect.content;
      document.getElementById("replyCorrection").placeholder =
        lingCorrect.content;
      //dispatch(postReply(values));


      replyData.replyDate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " + new Date().toLocaleDateString()
      ling.lingRepliesObj = [...ling.lingRepliesObj, replyData]

      console.log(id, ling)
      dispatch(updatePost(id, ling));
};



    const ReplyTypeButton = () => {
      if (reply === "reply") {
        return (
          <Control
            model=".replyType"
            id="replyType"
            name="replyType"
            defaultValue="reply"
            className="hide"
          />
        );
      } else if (reply === "correction") {
        return (
          <Control
            model=".replyType"
            id="replyType"
            name="replyType"
            defaultValue="correction"
            className="hide"
          />
        );
      }
    };

    return (
      <>
        <div>


          <LocalForm onSubmit={() => handleSubmit( ling._id )}>
            <Button
              className={reply === "correction" ? "hide" : "show"}
              onClick={() => toggle()}
            >
              Add Correction
            </Button>
            <div className={reply === "correction" ? "show" : "hide"}>
              <Button onClick={() => toggle()}>Cancel Correction</Button>



              <span className="d-inline">
                {" "}
                <i>
                  Protip: Make corrections in CAPITALS so folk can see where
                  they went wrong
                </i>
              </span>
              <Control.text
                model=".parentId"
                id="parentId"
                name="parentId"
                defaultValue={lingCorrect.id}
                className="hide"
              />

              <Control.textarea
                model=".replyCorrection"
                id="replyCorrection"
                name="replyCorrection"
                defaultValue={lingCorrect.content}
                className="mb-1 mt-3 form-control"
                onChange={(e) => setReplyData({...replyData, correctionBody: e.target.value})}
                rows="2"
              />
            </div>

            <Control.textarea
              model=".replyReply"
              id="replyReply"
              name="replyReply"
              placeholder="Type your reply here..."
              className="mb-3 mt-3 form-control"
              rows="2"
              onChange={(e) => setReplyData({...replyData, replyBody: e.target.value})}
              validators={{
                required,
                minLength: minLength(10),
              }}
            />
            <Errors
              className="text-danger"
              model=".replyReply"
              show="touched"
              component="div"
              messages={{
                required: "",
                minLength: "Must be at least 10 characters",
              }}
            />

            <ReplyTypeButton />
            <Button type="submit" color="primary" outline>
              Post
            </Button>
          </LocalForm>
        </div>
      </>
    );
  };



  function Replies(props) {
    const LingReplies = props.replies.map((reply) => {
      if (reply.parentId === props.ling.id) {
        if (
          reply.replyType === "correction" &&
          reply.correctionBody !== props.ling.lingBody
        ) {
          return (
            <div key={reply.replyId} className="timeline-hover">
              <Card className="mb-3 reply-ling">
                <CardBody>
                  <div className="correction" />
                  <p className="ml-3 mb-3 correction-body">
                    <i>{reply.correctionBody}</i>
                  </p>
                  {reply.replyBody}
                </CardBody>
                <CardFooter className="text-right replySignOff">
                  {reply.replyAuthor}
                </CardFooter>
              </Card>
            </div>
          );
        } else {
          return (
            <div key={reply.replyId} className="timeline-hover">
              <Card className="mb-3 reply-ling">
                <CardBody>
                  <div className="reply" />
                  {reply.replyBody}
                </CardBody>
                <CardFooter className="text-right replySignOff">
                  {reply.replyAuthor}
                </CardFooter>
              </Card>
            </div>
          );
        }
      } else {
      }
    });
    return <div>{LingReplies}</div>;
  }


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


        { user?.result?.userName === ling.userName &&
          <Button color="danger" onClick={() => handleDelete()} >
              Delete
            </Button>
        }

          <CardFooter>
            {user ? 
            <ReplyCorrect content={ling.lingBody} id={ling.id} />
            : <>Log in or sign up to reply</>}
          </CardFooter>
        </Card>

        <Replies ling={ling} replies={ling.lingRepliesObj} />

      </div>
    );
  }
};
