import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { EditReplyComponent } from "./EditReplyComponent";


export const EditReplyModal = (props) => {

    console.log(props)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Button size="sm" onClick={toggle} >
        Edit
      </Button>
      
      <Modal isOpen={modal} toggle={toggle} className="new-ling-modal">
        <ModalHeader toggle={toggle}>Edit</ModalHeader>

        <ModalBody>

            <EditReplyComponent   close={toggle} ling={props.ling} replyId={props.reply}/>

        </ModalBody>
      </Modal>
    </>
  );
};
