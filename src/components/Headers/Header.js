import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
            <Container fluid>
                <div className="header-body">
                    <Row>
                        <Col lg="6" xl="3" className="pb-2">
                            <Card className="card-stats mb-4 mb-xl-0 h-100">
                                <CardBody>
                                    <Row>
                                      <div className="col">
                                        <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-0"
                                        >
                                          Nos Projet en cours
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">
                                        350,897
                                      </span>
                                      </div>
                                      <Col className="col-auto">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                          <i className="fas fa-chart-bar" />
                                        </div>
                                      </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-success mr-2">
                                          <i className="fa fa-arrow-up" /> 3.48%
                                        </span>{" "}
                                        <span className="text-nowrap">Depuis le mois dernier</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3" className="pb-2">
                            <Card className="card-stats mb-4 mb-xl-0 h-100">
                                <CardBody>
                                    <Row>
                                      <div className="col">
                                        <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-0"
                                        >
                                          Projets top prios
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">2,356</span>
                                      </div>
                                      <Col className="col-auto">
                                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                          <i className="fas fa-chart-pie" />
                                        </div>
                                      </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                      {/*<span className="text-danger mr-2">*/}
                                      {/*    <i className="fas fa-arrow-down" /> 3.48%*/}
                                      {/*</span>*/}
                                      <span className="text-nowrap">Les projets à finir cette semaine</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3" className="pb-2">
                            <Card className="card-stats mb-4 mb-xl-0 h-100">
                                <CardBody>
                                    <Row>
                                        <div className="col">
                                          <CardTitle
                                              tag="h5"
                                              className="text-uppercase text-muted mb-0"
                                          >
                                            Mes tikets ouverts
                                          </CardTitle>
                                          <span className="h2 font-weight-bold mb-0">924</span>
                                        </div>
                                        <Col className="col-auto">
                                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                            <i className="fas fa-users" />
                                          </div>
                                        </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                      <span className="text-warning mr-2">
                                        <i className="fas fa-arrow-down" /> 1.10%
                                      </span>
                                      <span className="text-nowrap">depuis le mois dernier</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6" xl="3" className="pb-2">
                            <Card className="card-stats mb-4 mb-xl-0 h-100">
                                <CardBody>
                                    <Row>
                                      <div className="col">
                                        <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-0"
                                        >
                                          Performance
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                                      </div>
                                      <Col className="col-auto">
                                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                          <i className="fas fa-percent" />
                                        </div>
                                      </Col>
                                    </Row>
                                    {/*<p className="mt-3 mb-0 text-muted text-sm">*/}
                                    {/*  <span className="text-success mr-2">*/}
                                    {/*    <i className="fas fa-arrow-up" /> 12%*/}
                                    {/*  </span>*/}
                                    {/*  <span className="text-nowrap">Rapport fini/restant</span>*/}
                                    {/*</p>*/}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
      </>
  );
};

export default Header;
