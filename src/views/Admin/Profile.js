import {Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import {useEffect, useState} from "react";
import userBlanck from '../../assets/img/icons/bl.png'
import InfoUtilisateur from "../../Model/InfoUtilisateur.tsx";
import {useNavigate} from "react-router-dom";
import StatTicketDev from "../../Model/StatTicketDev.tsx";


const Profile = () => {
    const [name,setName]=useState("")
    const [utilisateur,setUtilisateur]=useState(null)
    const user=JSON.parse(localStorage.getItem("user"))
    const [statDev,setStatDev]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
        if (user){
          setName(user.name)
        }else{
          navigate("/")
          return
        }
        InfoUtilisateur.getUser(user.token).then((response)=>{
            if (response===null){
              navigate("/")
              return
            }
            StatTicketDev.getStatDev(user.token,response.id,response.type).then((resp)=>{
              setStatDev(resp)
            })
            setUtilisateur(response)
        })
    },[])

    return (
        <>
            <UserHeader name={name}/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#" onClick={(e) => e.preventDefault()}>
                                            <img alt="Image" className="rounded-circle bg-gradient-secondary" src={userBlanck}/>
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"/>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            {statDev ? (
                                                <>
                                                    <div>
                                                      <span className="heading">{statDev.enCours}</span>
                                                      <span className="description">En cours</span>
                                                    </div>
                                                    <div>
                                                      <span className="heading">{statDev.afaire}</span>
                                                      <span className="description">À faire</span>
                                                    </div>
                                                    <div>
                                                      <span className="heading">{statDev.terminer}</span>
                                                      <span className="description">Terminés</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <div className="heading skeleton p-3 rounded mb-3"/>
                                                        <span className="description">En cours</span>
                                                    </div>
                                                    <div>
                                                        <div className="heading skeleton p-3 rounded mb-3"/>
                                                        <span className="description">À faire</span>
                                                    </div>
                                                    <div>
                                                        <div className="heading skeleton p-3 rounded mb-3"/>
                                                        <span className="description">Terminés</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Row>
                                <div className="text-center">
                                    <h3>
                                      {utilisateur && utilisateur.nom}
                                    </h3>
                                    <div className="h5 font-weight-300">
                                      {utilisateur && utilisateur.email}
                                    </div>
                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        {utilisateur && utilisateur.type===1 ? "Lead" : "Developpeur"}
                                    </div>
                                    <hr className="my-4" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xl="6" xs="6">
                                        <h3 className="mb-0">Mon Compte</h3>
                                    </Col>
                                    <Col className="text-right" xl="6" xs="6">
                                      <Button color="info" onClick={(e) => e.preventDefault()}>
                                        Prendre du congé
                                      </Button>
                                      <Button color="primary" onClick={(e) => e.preventDefault()} >
                                          Modifier
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Votre information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-username">
                                                      Nom
                                                    </label>
                                                    <Input className="form-control-alternative bg-white text-capitalize" value={utilisateur ? utilisateur.nom : ""} id="input-username" placeholder="" type="text" disabled/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-email">
                                                        Email
                                                    </label>
                                                    <Input className="form-control-alternative bg-white text-lowercase" value={utilisateur ? utilisateur.email : ""} id="input-email" placeholder="" type="email" disabled/>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-first-name">
                                                      Mot de passe
                                                    </label>
                                                    <Input className="form-control-alternative bg-white" value="*******************" id="input-first-name" placeholder="" type="text" disabled/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                      {/*<Row>*/}
                                      {/*  <Col lg="6">*/}
                                      {/*    <FormGroup>*/}
                                      {/*      <button type="reset" className="btn btn-pinterest col-12">Annuler</button>*/}
                                      {/*    </FormGroup>*/}
                                      {/*  </Col>*/}
                                      {/*  <Col lg="6">*/}
                                      {/*    <FormGroup>*/}
                                      {/*      <button type="submit" className="btn btn-primary col-12">Modifier</button>*/}
                                      {/*    </FormGroup>*/}
                                      {/*  </Col>*/}
                                      {/*</Row>*/}
                                    </div>
                                    <hr className="my-4" />
                                </Form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Profile;
