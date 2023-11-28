import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Alert, Toast, ToastHeader, ToastBody
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import {useEffect, useState} from "react";
import userBlanck from '../../assets/img/icons/bl.png'
import InfoUtilisateur from "../../Model/InfoUtilisateur.tsx";
import {useNavigate} from "react-router-dom";
import StatTicketDev from "../../Model/StatTicketDev.tsx";
import ModalLg from "../../variables/Modal";
import Conge from "../../Model/Conge.tsx";


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
    const [modalShow, setModalShow]=useState(false)
    const [loadFinal,setLoadFinal]=useState(false)
    const [erreur,setErreur]=useState(false)
    const [dateDebut,setDateDebut]=useState(new Date())
    const [dateFin,setDateFin]=useState(new Date())
    function onSubmit(event){
        event.preventDefault()
        if (dateDebut>dateFin){
            setErreur(true)
            return
        }
        setLoadFinal(true)
        const conge=new Conge(dateDebut,dateFin)
        Conge.insertConge(user.token,conge).then((res)=>{
            if (!res){
                setErreur(true)
                setLoadFinal(false)
            }else{
                onCancel()
                setShowT(true)
            }
        }).finally(()=>{
            setLoadFinal(false)
        })
    }
    function onCancel() {
        setModalShow(false)
        setDateDebut(new Date())
        setDateFin(new Date())
    }
    function formatDate(date) {
        let mois = (date.getMonth() + 1).toString().padStart(2, '0');
        let jour = date.getDate().toString().padStart(2, '0');
        let annee = date.getFullYear();
        let dateFormatee = `${annee}-${mois}-${jour}`;
        return dateFormatee;
    }
    const [showT,setShowT]=useState(false)
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
                                    {/*<Col className="text-right" xl="6" xs="6">*/}
                                    {/*    <Button color="info" onClick={(e) => {*/}
                                    {/*        e.preventDefault()*/}
                                    {/*        setModalShow(true)*/}
                                    {/*    }}>*/}
                                    {/*        Prendre du congé*/}
                                    {/*    </Button>*/}
                                    {/*    <Button color="primary" onClick={(e) => e.preventDefault()} >*/}
                                    {/*        Modifier*/}
                                    {/*    </Button>*/}
                                    {/*</Col>*/}
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
                                    </div>
                                    <hr className="my-4" />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ModalLg show={modalShow}
                     onSubmit={onSubmit}
                     loading={loadFinal}
                     onCancel={onCancel}
                     title={"Prendre du congé"}
                     hide={()=>setModalShow(false)}>
                <Form  autoComplete="off">
                    <h6 className="heading-small text-muted mb-4">
                        Date du congé
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-reference"
                                    >
                                        Date debut
                                    </label>
                                    <Input
                                        className="form-control-alternative bg-white"
                                        value={formatDate(dateDebut)}
                                        type="date"
                                        id="input-reference"
                                        onChange={(event)=>setDateDebut(new Date(event.target.value))}
                                    />

                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-url"
                                    >
                                        Date fin
                                    </label>
                                    <Input
                                        className="form-control-alternative bg-white"
                                        value={formatDate(dateFin)}
                                        type="date"
                                        id="input-url"
                                        onChange={(event)=>setDateFin(new Date(event.target.value))}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Form>
                <Alert color="danger" isOpen={erreur} toggle={()=>setErreur(false)} >
                    Invalide date
                </Alert>
            </ModalLg>
            <div className="row m-0 p-0">
                <div  className="p-3  my-2 col-3 bottom-small-0 offset-9 fixed-bottom rounded">
                    <Toast  fade={true} isOpen={showT}>
                        <ToastHeader className="bg-lighter rounded-top p-2" icon="info" toggle={()=>setShowT(false)}>
                            Info
                        </ToastHeader>
                        <ToastBody className="bg-info text-body p-3 rounded-bottom">
                            Votre Congé a été pris en charge
                        </ToastBody>
                    </Toast>
                </div>
            </div>
        </>
    );
};

export default Profile;
