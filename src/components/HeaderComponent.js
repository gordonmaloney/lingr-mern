import React from 'react'
import { Container, Row, Col } from 'reactstrap';

export const HeaderComponent = () => {
    return (
        <>
        <Container>
            <Row>
                <Col>
                    <center>
                        <h1>Lingr</h1>
                        <h3><u>microblogging for language learners</u></h3>
                    </center>
                </Col>
            </Row>
        </Container>
        </>
    )
}
