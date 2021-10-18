import React, {useState} from 'react'
import { Control, LocalForm, Errors } from "react-redux-form";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { updateComment } from '../actions/posts';

export const EditReplyComponent = ({ling, replyId}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const required = (val) => val && val.length;
    const minLength = (len) => (val) => val && val.length >= len;
    const dispatch = useDispatch();

    const [reply, correct] = useState("reply");

    const [replyData, setReplyData] = useState({
        replyId: ling._id,
        replyAuthor: user?.result?.userName,
        replyAuthorId: user?.result?._id,
        replyBody: replyId.replyBody,
        correctionBody: replyId.correctionBody,
        replyType: "reply",
        replyDate: "",
        replyRead: false,
      });
  

      console.log(ling._id)
      console.log("reply", replyId)


      const handleUpdateComment = (ling, replyId) => {
        console.log("ling", ling._id, "reply", replyId._id)

          dispatch(updateComment(ling._id, replyId._id, replyData));
      };


    const toggle = () => {
        if (reply === "reply") {
          setReplyData({ ...replyData, replyType: "correction" });
          return correct("correction");
        }
        correct("reply");
        setReplyData({ ...replyData, replyType: "reply" });
      };



    return (
        <div>
            <LocalForm onSubmit={() => handleUpdateComment(ling, replyId)}>
            <Button
              className={
                reply === "correction" ? "cancel-btn hide" : "cancel-btn show"
              }
              onClick={() => toggle()}
            >
              Add Correction
            </Button>
            <div className={reply === "correction" ? "show" : "hide"}>
              <Button className="cancel-btn" onClick={() => toggle()}>
                Cancel Correction
              </Button>

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
                defaultValue={ling.id}
                className="hide"
              />

              <Control.textarea
                model=".replyCorrection"
                id="replyCorrection"
                name="replyCorrection"
                defaultValue={replyId.correctionBody ? replyId.correctionBody : ling.lingBody}
                className="mb-1 mt-3 form-control"
                onChange={(e) =>
                  setReplyData({ ...replyData, correctionBody: e.target.value })
                }
                rows="2"
              />
            </div>

            <Control.textarea
              model=".replyReply"
              id="replyReply"
              name="replyReply"
              placeholder="Type your reply here..."
              className="mb-3 mt-3 form-control"
              defaultValue={replyId.replyBody}
              rows="2"
              onChange={(e) =>
                setReplyData({ ...replyData, replyBody: e.target.value })
              }
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

            <Button
              type="submit"
              className="submit-btn"
              color="primary"
              outline
            >
              Post
            </Button>
          </LocalForm>
        </div>
    )
}
