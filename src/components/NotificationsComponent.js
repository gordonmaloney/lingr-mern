import React, { useEffect, useState } from "react";
import { getPosts } from "../actions/posts";
import { useSelector, useDispatch } from "react-redux";

import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { updatePost } from "../actions/posts";

export const NotificationsComponent = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const lings = useSelector((state) => state.posts);

  const usersLings = lings.filter(
    (ling) => (ling.userPersistentId === user.result.persistentId || ling.userId === user.result._id )
  );
  var allReplies = [];
  usersLings.map((ling) =>
    ling.lingRepliesObj.map((reply) => allReplies.push(reply))
  );
  const unreadReplies = allReplies.filter(reply => reply.replyRead !== true).length

  console.log(allReplies.filter(reply => reply.replyRead !== true))

  const dateOrderedReplies = allReplies.sort(
    (a, b) =>
      parseInt(b.replyDate.replace(/[, \/:]/g, "")) -
      parseInt(a.replyDate.replace(/[, \/:]/g, ""))
  );

  const NotificationsList = () => {
    return dateOrderedReplies.map((reply) => {
      const ling = lings.filter((ling) => ling._id === reply.replyId)[0];

      

      if (unreadReplies > 0 && reply.replyRead == false){
        let updatedLing = ling;
        let updatedReply = reply;

        //update reply read status
        if (updatedReply.replyRead == false) {updatedReply.replyRead = true;}

        //replace unread reply with read reply
        updatedLing.lingRepliesObj = ling.lingRepliesObj.filter(
          (replyfilt) => replyfilt._id !== reply._id
        );
        updatedLing.lingRepliesObj.push(updatedReply);

        console.log(updatedLing.lingRepliesObj);

        dispatch(updatePost(ling._id, updatedLing));      } 


      if (reply.replyType === "correction") {
        return (
          <Link to={`/reply/${ling._id}`} className="reply-no-link">
            <div key={reply.replyId} className="reply-notif reply-no-link">
              <Card className="reply-ling ml-0 reply-no-link">
                <CardHeader className="pb-1">
                  <h5>{reply.replyAuthor} corrected you 🤓</h5>
                </CardHeader>
                <CardBody>{ling.lingBody}</CardBody>
              </Card>
              <Card className="ml-5 mr-5 mb-3 ">
                <CardBody>
                  <div className={reply.replyType} />
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
          </Link>
        );
      } else {
        return (
          <>
            <Link to={`/reply/${ling._id}`} className="reply-no-link">
              <div key={reply.replyId} className="reply-notif timeline-no-link">
                <Card className="reply-ling ml-0">
                  <CardHeader className="pb-1">
                    <h5>{reply.replyAuthor} replied to you 👍</h5>
                  </CardHeader>
                  <CardBody>{ling.lingBody}</CardBody>
                </Card>
                <Card className="ml-5 mr-5 mb-3 mt-1">
                  <CardBody>{reply.replyBody}</CardBody>
                  <CardFooter className="text-right replySignOff">
                    {reply.replyAuthor}
                  </CardFooter>
                </Card>
              </div>
            </Link>
          </>
        );
      }
    });
  };

  return (
    <div>
      <center>
        <Card className="mb-3">
          <CardHeader>
            <h3 className="my-3">Notifications</h3>
          </CardHeader>
        </Card>
      </center>
      <div className="ml-5 mr-0">
        <NotificationsList />
      </div>
    </div>
  );
};
