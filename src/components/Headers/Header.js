import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import StatistiqueHeader from "../../Model/StatistiqueHeader.tsx";
import {Next} from "../../Config.ts";

const Header = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const [encours,setEncours]=useState(new StatistiqueHeader(0,0))
    const [prios,setPrios]=useState(new StatistiqueHeader(0,0))
    const [tiket,setTiket]=useState(new StatistiqueHeader(0,0))
    const [perf,setPerf]=useState(new StatistiqueHeader(0,0))
    const user=JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{
        const token=user.token
        StatistiqueHeader.enCours(token).then((response)=>{
            if (response!==null){
                setEncours(response)
            }else{
                navigate("/")
                return
            }
        })
        StatistiqueHeader.prios(token).then((response)=>{
            if (response!==null){
                setPrios(response)
            }else{
                navigate("/")
                return
            }
        })
        StatistiqueHeader.tiket(token).then((response)=>{
            if (response!==null){
                setTiket(response)
            }else{
                navigate("/")
                return
            }
        })
        StatistiqueHeader.perforamance(token).then((response)=>{
            if (response!==null){
                setPerf(response)
            }else{
                navigate("/")
                return
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
                                <Card className="card-stats mb-4 mb-xl-0 h-100 clickable" onClick={()=>{
                                    Next(`${user.type===1 ? "admin" : "auth"}/projets`,{enCours: true},navigate)
                                }}>
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
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
                                <Card className="card-stats mb-4 mb-xl-0 h-100 clickable" onClick={()=>{
                                    Next(`${user.type===1 ? "admin" : "auth"}/projets`,{prios: true},navigate)
                                }}>
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
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
                                            <span className="text-nowrap">projet à finir cette semaine</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3" className="pb-2">
                                <Card className="card-stats mb-4 mb-xl-0 h-100 clickable" onClick={()=>{
                                    Next(`${user.type===1 ? "admin" : "auth"}/tiket/me`,{encours: true},navigate)
                                }}>
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
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
                                            {tiket.pourcentage>=0 ? (
                                                <span className="text-success mr-2">
                                                    <i className={`fas ${tiket.pourcentage!==0 && 'fa-arrow-up'}`} />{tiket.pourcentage}%
                                                </span>
                                            ):(
                                                <span className="text-warning mr-2">
                                                    <i className="fas fa-arrow-down" />{tiket.pourcentage}%
                                                </span>
                                            )}
                                            <span className="text-nowrap">depuis le mois dernier</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3" className="pb-2">
                                <Card className="card-stats mb-4 mb-xl-0 h-100 clickable">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                                    Tiket Reçu
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">{perf.total}</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                    <i className="fas fa-percent" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            {perf.pourcentage<50 ? (
                                                <span className="text-danger mr-2">
                                                    <i className="fas fa-arrow-down" /> {perf.pourcentage}%
                                                </span>
                                            ): (
                                                <span className="text-success mr-2">
                                                    <i className="fas fa-arrow-up" /> {perf.pourcentage}%
                                                </span>
                                            )}
                                          <span className="text-nowrap">déja terminé</span>
                                        </p>
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
