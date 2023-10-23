import {Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, Container,} from "reactstrap";
import React, {useEffect} from "react";

const Login = () => {

  const mainContent = React.useRef(null);

  useEffect(() => {
    document.body.classList.add("bg-default");

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);


  return (
    <>
      <div className="main-content" ref={mainContent}>
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
            >
              <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>

        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
              <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">

                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <h2 className="text-capitalize">Project follow up</h2>
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email or UserName" type="text" autoComplete="off"/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" autoComplete="new-password"/>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>

                      <InputGroup >
                        <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <small>Mot de passe oublié?</small>
                        </a>
                      </InputGroup>

                    </FormGroup>
                    <Row>
                      <Col md="6" lg="6" xs="12">
                        <button type="button" className="btn btn-primary btn-wrapper" style={{width: '90%'}}>Se connecter</button>
                      </Col>
                      <Col className="text-end" md="6" lg="6" xs="12">
                        <button type="button" className="btn btn-warning" style={{width: '90%'}}>S'inscrire</button>
                      </Col>
                    </Row>

                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
