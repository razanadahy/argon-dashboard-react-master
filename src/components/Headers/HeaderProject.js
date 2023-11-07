import { Button, Container, Row, Col } from "reactstrap";

const HeaderProject = ({name,author}) => {
    return (
        <>
            <div className="header pb-6 pt-lg-4  d-flex align-items-center bg-gradient-info" style={{minHeight: "300px", backgroundSize: "cover",}}>
                <Container className="d-flex align-items-center m-0 p-0" fluid>
                    <Row>
                        <Col xl="12" xs="12" className="p-2">
                            <h4 className="display-3 text-white text-capitalize pb-2">{name}</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default HeaderProject;
