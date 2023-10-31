import {Form, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Row} from "reactstrap";
import UserHeader from "../../components/Headers/UserHeader";

function ViewProject() {
    const {id}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if (!id){
            navigate("/")
        }
    },[id])
    return(
        <>
            <UserHeader name={"teste"}/>
                {/*<Row>*/}
                {/*    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">*/}
                {/*        <Card className="card-profile shadow">*/}
                {/*            <Row className="justify-content-center">*/}
                {/*                <Col className="order-lg-2" lg="3">*/}
                {/*                    <div className="card-profile-image">*/}
                {/*                        <a href="#" onClick={(e) => e.preventDefault()}>*/}
                {/*                            <img*/}
                {/*                                alt="Image"*/}
                {/*                                className="rounded-circle bg-gradient-secondary"*/}
                {/*                                />*/}
                {/*                        </a>*/}
                {/*                    </div>*/}
                {/*                </Col>*/}
                {/*            </Row>*/}
                {/*            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">*/}
                {/*                /!*<div className="d-flex justify-content-between">*!/*/}
                {/*                /!*  <Button*!/*/}
                {/*                /!*    className="mr-4"*!/*/}
                {/*                /!*    color="info"*!/*/}
                {/*                /!*    href="#pablo"*!/*/}
                {/*                /!*    onClick={(e) => e.preventDefault()}*!/*/}
                {/*                /!*    size="sm"*!/*/}
                {/*                /!*  >*!/*/}
                {/*                /!*    Connect*!/*/}
                {/*                /!*  </Button>*!/*/}
                {/*                /!*  <Button*!/*/}
                {/*                /!*    className="float-right"*!/*/}
                {/*                /!*    color="default"*!/*/}
                {/*                /!*    href="#pablo"*!/*/}
                {/*                /!*    onClick={(e) => e.preventDefault()}*!/*/}
                {/*                /!*    size="sm"*!/*/}
                {/*                /!*  >*!/*/}
                {/*                /!*    Message*!/*/}
                {/*                /!*  </Button>*!/*/}
                {/*                /!*</div>*!/*/}
                {/*            </CardHeader>*/}
                {/*            <CardBody className="pt-0 pt-md-4">*/}
                {/*                <Row>*/}
                {/*                    <div className="col">*/}
                {/*                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">*/}
                {/*                            <div>*/}
                {/*                                <span className="heading">22</span>*/}
                {/*                                <span className="description">En cours</span>*/}
                {/*                            </div>*/}
                {/*                            <div>*/}
                {/*                                <span className="heading">10</span>*/}
                {/*                                <span className="description">À faire</span>*/}
                {/*                            </div>*/}
                {/*                            <div>*/}
                {/*                                <span className="heading">89</span>*/}
                {/*                                <span className="description">Terminés</span>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </Row>*/}
                {/*                <div className="text-center">*/}
                {/*                    <h3>*/}
                {/*                        Jessica Jones*/}
                {/*                    </h3>*/}
                {/*                    <div className="h5 font-weight-300">*/}
                {/*                        JessicaJones@gmail.com*/}
                {/*                    </div>*/}
                {/*                    <div className="h5 mt-4">*/}
                {/*                        <i className="ni business_briefcase-24 mr-2" />*/}
                {/*                        Developpeur*/}
                {/*                    </div>*/}
                {/*                    <hr className="my-4" />*/}
                {/*                </div>*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    /!*<Col className="order-xl-1" xl="8">*!/*/}
                {/*    /!*    <Card className="bg-secondary shadow">*!/*/}
                {/*    /!*        <CardHeader className="bg-white border-0">*!/*/}
                {/*    /!*            <Row className="align-items-center">*!/*/}
                {/*    /!*                <Col xs="8">*!/*/}
                {/*    /!*                    <h3 className="mb-0">Mon Compte</h3>*!/*/}
                {/*    /!*                </Col>*!/*/}
                {/*    /!*                <Col className="text-right" xs="4">*!/*/}
                {/*    /!*                    <Button*!/*/}
                {/*    /!*                        color="primary"*!/*/}
                {/*    /!*                        href="#pablo"*!/*/}
                {/*    /!*                        onClick={(e) => e.preventDefault()}*!/*/}
                {/*    /!*                        size="sm"*!/*/}
                {/*    /!*                    >*!/*/}
                {/*    /!*                        Settings*!/*/}
                {/*    /!*                    </Button>*!/*/}
                {/*    /!*                </Col>*!/*/}
                {/*    /!*            </Row>*!/*/}
                {/*    /!*        </CardHeader>*!/*/}
                {/*    /!*        <CardBody>*!/*/}
                {/*    /!*            <Form>*!/*/}
                {/*    /!*                <h6 className="heading-small text-muted mb-4">*!/*/}
                {/*    /!*                    User information*!/*/}
                {/*    /!*                </h6>*!/*/}
                {/*    /!*                <div className="pl-lg-4">*!/*/}
                {/*    /!*                    <Row>*!/*/}
                {/*    /!*                        <Col lg="6">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-username"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    Username*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    defaultValue="lucky.jesse"*!/*/}
                {/*    /!*                                    id="input-username"*!/*/}
                {/*    /!*                                    placeholder="Username"*!/*/}
                {/*    /!*                                    type="text"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                        <Col lg="6">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-email"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    Email address*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    id="input-email"*!/*/}
                {/*    /!*                                    placeholder="jesse@example.com"*!/*/}
                {/*    /!*                                    type="email"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                    </Row>*!/*/}
                {/*    /!*                    <Row>*!/*/}
                {/*    /!*                        <Col lg="6">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-first-name"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    First name*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    defaultValue="Lucky"*!/*/}
                {/*    /!*                                    id="input-first-name"*!/*/}
                {/*    /!*                                    placeholder="First name"*!/*/}
                {/*    /!*                                    type="text"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                        <Col lg="6">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-last-name"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    Last name*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    defaultValue="Jesse"*!/*/}
                {/*    /!*                                    id="input-last-name"*!/*/}
                {/*    /!*                                    placeholder="Last name"*!/*/}
                {/*    /!*                                    type="text"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                    </Row>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*                <hr className="my-4" />*!/*/}
                {/*    /!*                /!* Address *!/*!/*/}
                {/*    /!*                <h6 className="heading-small text-muted mb-4">*!/*/}
                {/*    /!*                    Contact information*!/*/}
                {/*    /!*                </h6>*!/*/}
                {/*    /!*                <div className="pl-lg-4">*!/*/}
                {/*    /!*                    <Row>*!/*/}
                {/*    /!*                        <Col md="12">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-address"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    Address*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"*!/*/}
                {/*    /!*                                    id="input-address"*!/*/}
                {/*    /!*                                    placeholder="Home Address"*!/*/}
                {/*    /!*                                    type="text"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                    </Row>*!/*/}
                {/*    /!*                    <Row>*!/*/}
                {/*    /!*                        <Col lg="4">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-city"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    City*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    defaultValue="New York"*!/*/}
                {/*    /!*                                    id="input-city"*!/*/}
                {/*    /!*                                    placeholder="City"*!/*/}
                {/*    /!*                                    type="text"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                        <Col lg="4">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-country"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    Country*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    defaultValue="United States"*!/*/}
                {/*    /!*                                    id="input-country"*!/*/}
                {/*    /!*                                    placeholder="Country"*!/*/}
                {/*    /!*                                    type="text"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                        <Col lg="4">*!/*/}
                {/*    /!*                            <FormGroup>*!/*/}
                {/*    /!*                                <label*!/*/}
                {/*    /!*                                    className="form-control-label"*!/*/}
                {/*    /!*                                    htmlFor="input-country"*!/*/}
                {/*    /!*                                >*!/*/}
                {/*    /!*                                    Postal code*!/*/}
                {/*    /!*                                </label>*!/*/}
                {/*    /!*                                <Input*!/*/}
                {/*    /!*                                    className="form-control-alternative"*!/*/}
                {/*    /!*                                    id="input-postal-code"*!/*/}
                {/*    /!*                                    placeholder="Postal code"*!/*/}
                {/*    /!*                                    type="number"*!/*/}
                {/*    /!*                                />*!/*/}
                {/*    /!*                            </FormGroup>*!/*/}
                {/*    /!*                        </Col>*!/*/}
                {/*    /!*                    </Row>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*                <hr className="my-4" />*!/*/}
                {/*    /!*                /!* Description *!/*!/*/}
                {/*    /!*                <h6 className="heading-small text-muted mb-4">About me</h6>*!/*/}
                {/*    /!*                <div className="pl-lg-4">*!/*/}
                {/*    /!*                    <FormGroup>*!/*/}
                {/*    /!*                        <label>About Me</label>*!/*/}
                {/*    /!*                        <Input*!/*/}
                {/*    /!*                            className="form-control-alternative"*!/*/}
                {/*    /!*                            placeholder="A few words about you ..."*!/*/}
                {/*    /!*                            rows="4"*!/*/}
                {/*    /!*                            defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and*!/*/}
                {/*    /!*      Open Source."*!/*/}
                {/*    /!*                            type="textarea"*!/*/}
                {/*    /!*                        />*!/*/}
                {/*    /!*                    </FormGroup>*!/*/}
                {/*    /!*                </div>*!/*/}
                {/*    /!*            </Form>*!/*/}
                {/*    /!*        </CardBody>*!/*/}
                {/*    /!*    </Card>*!/*/}
                {/*    /!*</Col>*!/*/}
                {/*</Row>*/}
            {/*<UserHeader name={"teste"}/>*/}
            {/*<Container className="mt--7" fluid>*/}
            {/*    <Row>*/}
            {/*        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">*/}
            {/*            <Card className="card-profile shadow">*/}
            {/*                <Row className="justify-content-center">*/}
            {/*                    <Col className="order-lg-2" lg="3">*/}
            {/*                        <div className="card-profile-image">*/}
            {/*                            <a href="#" onClick={(e) => e.preventDefault()}>*/}
            {/*                                <img*/}
            {/*                                    alt="Image"*/}
            {/*                                    className="rounded-circle bg-gradient-secondary"*/}
            {/*                                    />*/}
            {/*                            </a>*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">*/}
            {/*                    /!*<div className="d-flex justify-content-between">*!/*/}
            {/*                    /!*  <Button*!/*/}
            {/*                    /!*    className="mr-4"*!/*/}
            {/*                    /!*    color="info"*!/*/}
            {/*                    /!*    href="#pablo"*!/*/}
            {/*                    /!*    onClick={(e) => e.preventDefault()}*!/*/}
            {/*                    /!*    size="sm"*!/*/}
            {/*                    /!*  >*!/*/}
            {/*                    /!*    Connect*!/*/}
            {/*                    /!*  </Button>*!/*/}
            {/*                    /!*  <Button*!/*/}
            {/*                    /!*    className="float-right"*!/*/}
            {/*                    /!*    color="default"*!/*/}
            {/*                    /!*    href="#pablo"*!/*/}
            {/*                    /!*    onClick={(e) => e.preventDefault()}*!/*/}
            {/*                    /!*    size="sm"*!/*/}
            {/*                    /!*  >*!/*/}
            {/*                    /!*    Message*!/*/}
            {/*                    /!*  </Button>*!/*/}
            {/*                    /!*</div>*!/*/}
            {/*                </CardHeader>*/}
            {/*                <CardBody className="pt-0 pt-md-4">*/}
            {/*                    <Row>*/}
            {/*                        <div className="col">*/}
            {/*                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">*/}
            {/*                                <div>*/}
            {/*                                    <span className="heading">22</span>*/}
            {/*                                    <span className="description">En cours</span>*/}
            {/*                                </div>*/}
            {/*                                <div>*/}
            {/*                                    <span className="heading">10</span>*/}
            {/*                                    <span className="description">À faire</span>*/}
            {/*                                </div>*/}
            {/*                                <div>*/}
            {/*                                    <span className="heading">89</span>*/}
            {/*                                    <span className="description">Terminés</span>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </Row>*/}
            {/*                    <div className="text-center">*/}
            {/*                        <h3>*/}
            {/*                            Jessica Jones*/}
            {/*                        </h3>*/}
            {/*                        <div className="h5 font-weight-300">*/}
            {/*                            JessicaJones@gmail.com*/}
            {/*                        </div>*/}
            {/*                        <div className="h5 mt-4">*/}
            {/*                            <i className="ni business_briefcase-24 mr-2" />*/}
            {/*                            Developpeur*/}
            {/*                        </div>*/}
            {/*                        <hr className="my-4" />*/}
            {/*                    </div>*/}
            {/*                </CardBody>*/}
            {/*            </Card>*/}
            {/*        </Col>*/}
            {/*        <Col className="order-xl-1" xl="8">*/}
            {/*            <Card className="bg-secondary shadow">*/}
            {/*                <CardHeader className="bg-white border-0">*/}
            {/*                    <Row className="align-items-center">*/}
            {/*                        <Col xs="8">*/}
            {/*                            <h3 className="mb-0">Mon Compte</h3>*/}
            {/*                        </Col>*/}
            {/*                        <Col className="text-right" xs="4">*/}
            {/*                            <Button*/}
            {/*                                color="primary"*/}
            {/*                                href="#pablo"*/}
            {/*                                onClick={(e) => e.preventDefault()}*/}
            {/*                                size="sm"*/}
            {/*                            >*/}
            {/*                                Settings*/}
            {/*                            </Button>*/}
            {/*                        </Col>*/}
            {/*                    </Row>*/}
            {/*                </CardHeader>*/}
            {/*                <CardBody>*/}
            {/*                    <Form>*/}
            {/*                        <h6 className="heading-small text-muted mb-4">*/}
            {/*                            User information*/}
            {/*                        </h6>*/}
            {/*                        <div className="pl-lg-4">*/}
            {/*                            <Row>*/}
            {/*                                <Col lg="6">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-username"*/}
            {/*                                        >*/}
            {/*                                            Username*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            defaultValue="lucky.jesse"*/}
            {/*                                            id="input-username"*/}
            {/*                                            placeholder="Username"*/}
            {/*                                            type="text"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                                <Col lg="6">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-email"*/}
            {/*                                        >*/}
            {/*                                            Email address*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            id="input-email"*/}
            {/*                                            placeholder="jesse@example.com"*/}
            {/*                                            type="email"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                            </Row>*/}
            {/*                            <Row>*/}
            {/*                                <Col lg="6">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-first-name"*/}
            {/*                                        >*/}
            {/*                                            First name*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            defaultValue="Lucky"*/}
            {/*                                            id="input-first-name"*/}
            {/*                                            placeholder="First name"*/}
            {/*                                            type="text"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                                <Col lg="6">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-last-name"*/}
            {/*                                        >*/}
            {/*                                            Last name*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            defaultValue="Jesse"*/}
            {/*                                            id="input-last-name"*/}
            {/*                                            placeholder="Last name"*/}
            {/*                                            type="text"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                            </Row>*/}
            {/*                        </div>*/}
            {/*                        <hr className="my-4" />*/}
            {/*                        /!* Address *!/*/}
            {/*                        <h6 className="heading-small text-muted mb-4">*/}
            {/*                            Contact information*/}
            {/*                        </h6>*/}
            {/*                        <div className="pl-lg-4">*/}
            {/*                            <Row>*/}
            {/*                                <Col md="12">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-address"*/}
            {/*                                        >*/}
            {/*                                            Address*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"*/}
            {/*                                            id="input-address"*/}
            {/*                                            placeholder="Home Address"*/}
            {/*                                            type="text"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                            </Row>*/}
            {/*                            <Row>*/}
            {/*                                <Col lg="4">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-city"*/}
            {/*                                        >*/}
            {/*                                            City*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            defaultValue="New York"*/}
            {/*                                            id="input-city"*/}
            {/*                                            placeholder="City"*/}
            {/*                                            type="text"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                                <Col lg="4">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-country"*/}
            {/*                                        >*/}
            {/*                                            Country*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            defaultValue="United States"*/}
            {/*                                            id="input-country"*/}
            {/*                                            placeholder="Country"*/}
            {/*                                            type="text"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                                <Col lg="4">*/}
            {/*                                    <FormGroup>*/}
            {/*                                        <label*/}
            {/*                                            className="form-control-label"*/}
            {/*                                            htmlFor="input-country"*/}
            {/*                                        >*/}
            {/*                                            Postal code*/}
            {/*                                        </label>*/}
            {/*                                        <Input*/}
            {/*                                            className="form-control-alternative"*/}
            {/*                                            id="input-postal-code"*/}
            {/*                                            placeholder="Postal code"*/}
            {/*                                            type="number"*/}
            {/*                                        />*/}
            {/*                                    </FormGroup>*/}
            {/*                                </Col>*/}
            {/*                            </Row>*/}
            {/*                        </div>*/}
            {/*                        <hr className="my-4" />*/}
            {/*                        /!* Description *!/*/}
            {/*                        <h6 className="heading-small text-muted mb-4">About me</h6>*/}
            {/*                        <div className="pl-lg-4">*/}
            {/*                            <FormGroup>*/}
            {/*                                <label>About Me</label>*/}
            {/*                                <Input*/}
            {/*                                    className="form-control-alternative"*/}
            {/*                                    placeholder="A few words about you ..."*/}
            {/*                                    rows="4"*/}
            {/*                                    defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and*/}
            {/*              Open Source."*/}
            {/*                                    type="textarea"*/}
            {/*                                />*/}
            {/*                            </FormGroup>*/}
            {/*                        </div>*/}
            {/*                    </Form>*/}
            {/*                </CardBody>*/}
            {/*            </Card>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Container>*/}
        </>
    )
}
export default ViewProject