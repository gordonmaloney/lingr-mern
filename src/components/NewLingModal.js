import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { NewLingComponent } from "./NewLingComponent.js";

export const NewLingModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle} outline className="menu-btn">
        💭<span className="d-inline d-md-inline"> New Ling</span>
      </Button>
      
      <Modal isOpen={modal} toggle={toggle} className="new-ling-modal">
        <ModalHeader toggle={toggle}>New Ling</ModalHeader>

        <ModalBody>
          <NewLingComponent close={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};
