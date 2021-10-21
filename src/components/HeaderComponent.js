import React from 'react'
import { Container, Row, Col } from 'reactstrap';

import PhrasebookSidebar from "./Phrasebook/PhrasebookSidebar";
import { PhrasebookPopUp } from "./Phrasebook/PhrasebookPopUp";

export const HeaderComponent = () => {
    return (
        <>
        <Container className="logo-container">
            <Row className="mb-0">
                <Col sm="8" >

                        <h1 className="logo-title">Lingr</h1>
                        <p className="logo-subtitle">microblogging for language learners</p>
                </Col>
                <Col>
                        <PhrasebookSidebar />
                        {/*<PhrasebookPopUp />*/}
        </Col>
        </Row>
        <hr className="logo-hr mt-1 mb-4" />
        </Container>
        </>
    )
}
