import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import StatistiqueHeader from "../../Model/StatistiqueHeader.tsx";

const Header = () => {
    const location=useLocation()
    const [encours,setEncours]=useState(new StatistiqueHeader(0,0))
    const [prios,setPrios]=useState(new StatistiqueHeader(0,0))
    const [tiket,setTiket]=useState(new StatistiqueHeader(0,0))

    useEffect(()=>{
        const token=JSON.parse(localStorage.getItem("user")).token
        StatistiqueHeader.enCours(token).then((response)=>{
            if (response!==null){
                setEncours(response)
            }
        })
        StatistiqueHeader.prios(token).then((response)=>{
            if (response!==null){
                setPrios(response)
            }
        })
        StatistiqueHeader.tiket(token).then((response)=>{
            if (response!==null){
                setTiket(response)
            }
        })
    },[location])



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
                                        {encours.total}
                                      </span>
                                      </div>
                                      <Col className="col-auto">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                          <i className="fas fa-chart-bar" />
                                        </div>
                                      </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        {encours.pourcentage>=0 ? (
                                            <span className="text-success mr-2">
                                                <i className="fa fa-arrow-up" /> {encours.pourcentage}%
                                            </span>
                                        ) : (
                                            <span className="text-danger mr-2">
                                                <i className="fa fa-arrow-down" /> {-encours.pourcentage}%
                                            </span>
                                        )}

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
                                        <span className="h2 font-weight-bold mb-0">{prios.total}</span>
                                      </div>
                                      <Col className="col-auto">
                                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                          <i className="fas fa-chart-pie" />
                                        </div>
                                      </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                      <span className="text-danger mr-2 font-weight-bold">
                                        <strong>{prios.pourcentage}</strong>
                                      </span>
                                      <span className="text-nowrap"> à finir cette semaine</span>
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
                                          <span className="h2 font-weight-bold mb-0">{tiket.total}</span>
                                        </div>
                                        <Col className="col-auto">
                                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                            <i className="fas fa-users" />
                                          </div>
                                        </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                      <span className="text-warning mr-2">
                                        <i className="fas fa-arrow-down" />{tiket.pourcentage}%
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
