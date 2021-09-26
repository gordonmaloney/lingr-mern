import React, { useEffect, useState } from "react";
import { getPosts } from "../actions/posts";
import { useSelector, useDispatch } from "react-redux";

import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

export const NotificationsComponent = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts());
    }, []);
  
    const lings = useSelector((state) => state.posts);



    const usersLings = lings.filter(ling => ling.userName === user.result.userName)
console.log(lings)
    console.log(usersLings)

    var allReplies = []

    usersLings.map(ling => 
        ling.lingRepliesObj.map(reply => allReplies.push(reply)))


        const dateOrderedReplies = allReplies.sort((a, b) => parseInt(b.replyDate.replace(/[, \/:]/g,"")) - parseInt(a.replyDate.replace(/[, \/:]/g,"")))



        const NotificationsList = () => {
            return dateOrderedReplies.map((reply) => {
                const ling = lings.filter(ling => ling._id === reply.replyId)[0]
                    if (reply.replyType === "correction") {
                      return (
                        <Link to={`/reply/${ling._id}`} className="reply-no-link">
                          <div key={reply.replyId} className="reply-notif">
                            <Card className="reply-ling ml-0">
                              <CardHeader className="pb-1">
                                <h5>{reply.replyAuthor} corrected you 🤓</h5>
                              </CardHeader>
                              <CardBody>{ling.lingBody}</CardBody>
                            </Card>
                            <Card className="ml-5 mr-5 mb-3">
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
                        <Link to={`/reply/${ling._id}`} className="reply-no-link">
                          <div key={reply.replyId} className="reply-notif">
                            <Card className="reply-ling ml-0">
                              <CardHeader className="pb-1">
                                <h5>{reply.replyAuthor} replied to you 👍</h5>
                              </CardHeader>
                              <CardBody>{ling.lingBody}</CardBody>
                            </Card>
                            <Card className="ml-5 mr-5 mb-3">
                              <CardBody>{reply.replyBody}</CardBody>
                              <CardFooter className="text-right replySignOff">
                                {reply.replyAuthor}
                              </CardFooter>
                            </Card>
                          </div>
                        </Link>
                      );
                    }
                  })
                }
          

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
    )
}
