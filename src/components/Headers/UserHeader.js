import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = ({name}) => {

    return (
        <>
            <div className="header pb-7 pt-lg-6  d-flex align-items-center bg-gradient-info" style={{minHeight: "300px", backgroundSize: "cover",}}>
                {/*<span className="mask bg-gradient-default opacity-8" />*/}
                <Container className="d-flex align-items-center m-0 p-0" fluid>
                    <Row className="w-100">
                        <Col lg="7" md="10">
                            <h3 className="display-2 text-white text-capitalize">Hello {name}</h3>
                            <p className="text-white mt-0 mb-5">
                                Ceci est votre page de profil. Vous pouvez y voir les progrès que vous avez réalisés dans votre travail et gérer vos projets ou tâches assignées.
                            </p>
                        </Col>
                    </Row>
                </Container>
              </div>
        </>
    );
};

export default UserHeader;
