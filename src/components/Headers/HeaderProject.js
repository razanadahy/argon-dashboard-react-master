import { Button, Container, Row, Col } from "reactstrap";

const HeaderProject = ({name,author}) => {
    return (
        <>
            <div className="header pb-6 pt-lg-4  d-flex align-items-center bg-gradient-info" style={{minHeight: "300px", backgroundSize: "cover",}}>
                <Container className="d-flex align-items-center m-0 p-0" fluid>
                    <Row>
                        <Col lg="7" md="10" className="p-2">
                            <h4 className="display-3 text-white text-capitalize pb-2">{name}</h4>
                            {/*{author==="admin" && (*/}
                            {/*    <Button color="warning" href="#" className="mb-2" onClick={(e) => e.preventDefault()}>*/}
                            {/*        Modifier*/}
                            {/*    </Button>*/}
                            {/*)}*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default HeaderProject;
