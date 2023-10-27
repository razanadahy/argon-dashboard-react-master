import { Button, Container, Row, Col } from "reactstrap";

const NoHeader = () => {

    return (
        <>
            <div className="header pb-8 pt-lg-8  d-flex align-items-center bg-gradient-info" style={{minHeight: "300px", backgroundSize: "cover",}}>
                {/*<span className="mask bg-gradient-default opacity-8" />*/}
                {/*<Container className="d-flex align-items-center" fluid>*/}
                {/*    <Row>*/}
                {/*        <Col lg="7" md="10">*/}
                {/*            <h1 className="display-2 text-white text-capitalize">Hello {name}</h1>*/}
                {/*            <p className="text-white mt-0 mb-5">*/}
                {/*                Ceci est votre page de profil. Vous pouvez y voir les progrès que vous avez réalisés dans votre travail et gérer vos projets ou tâches assignées.*/}
                {/*            </p>*/}
                {/*            <Button color="info" href="#" onClick={(e) => e.preventDefault()}>*/}
                {/*                Modifier le profil*/}
                {/*            </Button>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Container>*/}
            </div>
        </>
    );
};

export default NoHeader;
