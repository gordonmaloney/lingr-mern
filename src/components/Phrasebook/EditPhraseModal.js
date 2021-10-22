import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { EditPhraseComponent } from "./EditPhraseComponent";

export const EditPhraseModal = (props) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Button onClick={toggle} size="sm"   style={{transform: 'scale(0.8)'}}>
        Edit
      </Button>
      
      <Modal isOpen={modal} toggle={toggle} className="new-ling-modal">
        <ModalHeader toggle={toggle}>Edit Phrase</ModalHeader>

        <ModalBody>
          <EditPhraseComponent close={toggle} phrasebook={props.phrasebook} phrase={props.phrase} />
        </ModalBody>
      </Modal>
    </>
  );
};
