import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { EditLingComponent } from "./EditLingComponent";

export const EditLingModal = (props) => {

    console.log(props)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Button onClick={toggle} >
        Edit
      </Button>
      
      <Modal isOpen={modal} toggle={toggle} className="new-ling-modal">
        <ModalHeader toggle={toggle}>Edit Ling</ModalHeader>

        <ModalBody>
          <EditLingComponent close={toggle} ling={props.ling} />
        </ModalBody>
      </Modal>
    </>
  );
};
