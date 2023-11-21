import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Container,
    Media,
} from "reactstrap";
import React, {useEffect, useState} from "react";
import Utilisateur from "../Model/Utilisateur.tsx";
import {useNavigate} from "react-router-dom";
import logo from '../assets/img/brand/logo-no-background.png'

const Inscription = () => {
    const mainContent = React.useRef(null);
    const navigate=useNavigate()
    useEffect(() => {
        document.body.classList.add("bg-default");
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;

        localStorage.clear()
        return () => {
            document.body.classList.remove("bg-default");
        };
    }, []);

    const [user,setUser]=useState('')
    const [mdp,setMdp]=useState('')
    const [email,setEmail]=useState('')
    const [rEml,setREml]=useState('')

    const [loading,setLoading]=useState(false)
    const [response,setResponse]=useState(null)
    const [ok,setOk]=useState(true)
    const [erreur,setErreur]=useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        if (rEml!==mdp){
            setErreur(true)
            return
        }
        setLoading(true)
        Utilisateur.inscription(user, mdp,100,email).then((response)=>{
            if (response===undefined){
                setOk(false)
                setResponse("Connection refusée")
            }else if (response===false){
                setOk(false)
                setResponse("Des erreurs se sont survenus")
            }else{
                setOk(true)
                setResponse("En attente de l'approbation par le lead")
            }
        }).finally(()=>{
            setUser('')
            setMdp('')
            setREml('')
            setEmail('')
            setLoading(false)
        })
    }

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <div className="header bg-gradient-info py-7 py-lg-8">
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
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
                                        {/*<h2 className="text-capitalize">Project follow up</h2>*/}
                                        <Media>
                                            <img src={logo} alt="..." width={320} height={80.8}/>
                                        </Media>
                                    </div>
                                    <Form role="form" onSubmit={(event)=>handleSubmit(event)} method="post">
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni fa-solid fa-user" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="UserName" value={user} onChange={(event)=>setUser(event.target.value)} type="text" autoComplete="off"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Email" value={email} onChange={(event)=>setEmail(event.target.value)} type="text" autoComplete="off"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="mot de passe" type="password" value={mdp} onChange={(event)=>setMdp(event.target.value)} autoComplete="new-password"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni fa-solid fa-repeat" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Confirmer le mot de passe" type="password" value={rEml} onChange={(event)=>setREml(event.target.value)} autoComplete="new-password"/>
                                            </InputGroup>
                                        </FormGroup>
                                        {erreur &&(
                                            <div className="alert alert-danger  alert-dismissible fade show" role="alert">
                                                mot de passe invalide!
                                                <button type="button" onClick={()=>setErreur(false)} className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        )}
                                        {ok ? response && (
                                            <div className="alert alert-success  alert-dismissible fade show" role="alert">
                                                {response}
                                                <button type="button" onClick={()=>setResponse(null)} className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        ): response && (
                                            <div className="alert alert-danger  alert-dismissible fade show" role="alert">
                                                {response}
                                                <button type="button" onClick={()=>setResponse(null)} className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        )}
                                        <Row>
                                            <Col className="col-6">
                                                <button type="button" onClick={()=>navigate("/login")} className="btn btn-warning" style={{width: '90%'}}>Login</button>
                                            </Col>
                                            <Col className="col-6 d-flex align-items-end text-end">
                                                <Col>
                                                    {loading ? (
                                                        <button type="button" className="btn btn-primary btn-wrapper" style={{width: '90%'}}>
                                                            <div className="spinner-border text-lighter spinner-border-sm" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        </button>
                                                    ): ( <button type="submit" className="btn btn-primary btn-wrapper" style={{width: '90%'}}>S'inscrire</button>)}
                                                </Col>
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

export default Inscription;
