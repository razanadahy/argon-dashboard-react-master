import {
    Button, Card, CardHeader, CardBody, Row, Col, FormGroup, Form, Input, Media
} from "reactstrap";
import {useEffect, useState} from "react";
import HeaderSite from "../../components/Headers/HeaderSite";
import {useNavigate, useParams} from "react-router-dom";
import BarChart from "../../variables/BarChart";

const ViewSite = ({author}) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate=useNavigate()
    useEffect(()=>{
        if (user){
            if (author==='admin' && user.type!==1){
                navigate("/")
                return;
            }else if (author==='auth' && user.type!==2){
                navigate("/")
                return;
            }
        }else{
            navigate("/")
            return
        }
    },[author])

    const {id,nomPrpjet,idProjet}=useParams()
    const [data,setData]=useState([25,310])
    const label=["temps cumulé en jour(s)","Temps restant en jour(s)"]

    return (
        <>
            <HeaderSite idProjet={idProjet} nomProjet={nomPrpjet} nomSite={"Nom de site"} author={author}/>
            <Row className="m-0 p-0 mt--7">
                <Col className="mb-4 order-xl-2" xl="4" xs="12">
                    <Card className="card-profile shadow rounded">
                        <CardHeader className="text-center border-0 pb-2">
                            <h3 className="mb-0">Rapport sur le temps du projet</h3>
                        </CardHeader>
                        <hr className="my-2" />
                        <CardBody className="m-0 p-0 py-3">
                            <BarChart type={'doughnut'} data={data} label={label} />
                            <hr className="my-4" />
                            <div className="text-center">
                                <div className="h5 mt-4">
                                    <button className="display-4 px-3 py-2 bg-success rounded btn text-capitalize">
                                        traitement terminé
                                    </button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="order-xl-1" xl="8">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Information sur le site</h3>
                                </Col>
                                {author==='admin' && (
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            Modifier
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <h6 className="heading-small text-muted mb-4">
                                    Dev assigné
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="12">
                                            <Media className="align-items-center">
                                                <button
                                                    className="avatar rounded-circle mr-3 btn"
                                                    onClick={(event)=>{event.preventDefault()}}
                                                >
                                                    <i className="fa fa-a"/>
                                                </button>
                                                <Media>
                                                    <span className="mb-0 text-sm">
                                                        Andrianiavo
                                                        <div className="text-sm text-muted">
                                                            andrianiavo.vit@gmail.com
                                                        </div>
                                                    </span>
                                                </Media>
                                            </Media>
                                        </Col>

                                    </Row>
                                </div>

                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">
                                    Plugin
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-username"
                                                >
                                                    Domaine
                                                </label>
                                                <Input
                                                    className="form-control-alternative bg-white"
                                                    value="exemple de nom de domaine"
                                                    type="text"
                                                    disabled
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-email"
                                                >
                                                    Nom plugin
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-email"
                                                    placeholder="jesse@example.com"
                                                    value="plugin"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                    Traitement
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    value="Crawl standard"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-first-name"
                                                >
                                                    SSH Git
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    value="ceci est un exemple d'une ssh git "
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">
                                    Information sur la protection
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-address"
                                                >
                                                    Protection
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    value="nom de protection"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-city"
                                                >
                                                    Difficulté
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    value="difficile"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">Remarque</h6>
                                <div className="pl-lg-4">
                                    <FormGroup>

                                        <Input
                                            className="form-control-alternative"
                                            rows="5"
                                            value="A beautiful Dashboard for Bootstrap 4. It is Free andOpen Source."
                                            type="textarea"
                                        />
                                    </FormGroup>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ViewSite;
