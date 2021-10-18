import React from 'react'
import { Container, Row, Col } from 'reactstrap';

export const HeaderComponent = () => {
    return (
        <>
        <Container className="logo-container">
            <Row>
                <Col>

                        <h1 className="logo-title">Lingr</h1>
                        <p className="logo-subtitle">microblogging for language learners</p>
        	            <hr className="logo-hr" />
                </Col>
            </Row>
        </Container>
        </>
    )
}
