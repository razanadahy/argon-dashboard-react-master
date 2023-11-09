import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    FormGroup,
    Form,
    Input,
    Media,
    Table,
} from "reactstrap";
import {useEffect, useState} from "react";
import HeaderSite from "../../components/Headers/HeaderSite";
import {useNavigate, useParams} from "react-router-dom";
import BarChart from "../../variables/BarChart";
import Site from "../../Model/Site.tsx";

const ViewSite = ({author}) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate=useNavigate()
    const {id,nomPrpjet,idProjet}=useParams()
    const [site,setSite]=useState(null)
    useEffect(()=>{
        if (user){
            if (author==='admin' && user.type!==1){
                navigate("/")
                return;
            }else if (author==='auth' && user.type!==2){
                navigate("/")
                return;
            }else{
                Site.getSiteById(user.token,id).then((response)=>{
                    if (response===null){
                        navigate(`/${author}/projets/view/${idProjet}`)
                        return
                    }
                    setSite(response)
                })
            }
        }else{
            navigate("/")
            return
        }
    },[author,id])

    const [data,setData]=useState([25,310])
    const label=["temps cumulé en jour(s)","Temps restant en jour(s)"]

    function getFirstLetter(userName) {
        userName = userName.toLowerCase();
        return userName.substring(0, 1);
    }
    function getClassEtat(etat) {
        etat = etat.toLowerCase();
        if (etat === 'a faire') {
            return 'px-2 py-1 bg-light text-body rounded-sm';
        } else if (etat === 'en cours') {
            return 'px-2 py-1 bg-warning text-white rounded-sm';
        } else if (etat === 'suspendu') {
            return 'px-2 py-1 bg-danger text-white rounded-sm';
        } else {
            return 'px-2 py-1 bg-success rounded-sm';
        }
    }

    return (
        <>
            <HeaderSite idProjet={idProjet} nomProjet={nomPrpjet} nomSite={site ? site.nomSite : ""} author={author}/>
            <Row className="m-0 p-0 mt--7">
                <Col className="mb-4 order-xl-2" xl="5" xs="12">
                    <Card className="card-profile shadow rounded mb-3">
                        <CardHeader className="text-center border-0 pb-2">
                            <h3 className="mb-0">Rapport sur le temps du projet</h3>
                        </CardHeader>
                        <hr className="my-2" />
                        <CardBody className="m-0 p-0 py-3">
                            <BarChart type={'doughnut'} data={data} label={label} />
                            <hr className="my-4" />
                            <div className="text-center">
                                {site ? (
                                    <div className="h5 mt-4">
                                        <button className={`display-4 px-3 py-2 ${site.finished ? "bg-success": "bg-warning"} rounded btn text-capitalize`}>
                                            {site.finished ? "traitement terminé" : "traitement en cours"}
                                        </button>
                                    </div>
                                ): (
                                    <div className="mt-4 d-flex justify-content-center">
                                        <span className="skeleton p-3 w-50"/>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="card-profile shadow rounded">
                        <CardHeader className="text-center border-0 pb-2">
                            <h3 className="mb-0 text-capitalize">ticket bug correspondant</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                            <tr className="font clickable">
                                <th scope="col">Ticket <i className="fa fa-sort"/></th>
                                <th scope="col">Dev <i className="fa fa-sort"/></th>
                                <th scope="col">Etat <i className="fa fa-sort"/></th>
                            </tr>
                            </thead>
                            <tbody>
                            {site && site.ticketBug.map(({id,etat,developpeur,url,reference})=>(
                                <tr key={id}>
                                    <th scope="row">
                                        <a href={url} target="_blank" rel="noopener noreferrer">{reference}</a>
                                    </th>
                                    <td className="text-capitalize">{developpeur.nom}</td>
                                    <td>
                                        <span className={getClassEtat(etat.nom)}>
                                            {etat.nom}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col className="order-xl-1" xl="7">
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
                                        {site ? (
                                            <Col lg="12">
                                                <Media className="align-items-center">
                                                    <button
                                                        className="avatar rounded-circle mr-3 btn bg-default"
                                                        onClick={(event)=>{event.preventDefault()}}
                                                    >
                                                        <i className={`fa fa-${getFirstLetter(site.developpeur.nom)}`}/>
                                                    </button>
                                                    <Media>
                                                    <span className="mb-0 text-sm text-capitalize">
                                                        {site.developpeur.nom}
                                                        <div className="text-sm text-muted text-lowercase">
                                                            {site.developpeur.email}
                                                        </div>
                                                    </span>
                                                    </Media>
                                                </Media>
                                            </Col>
                                        ):(
                                            <Col lg="12" className="skeleton p-3 mb-3 w-100"/>
                                        )}
                                    </Row>
                                </div>

                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">
                                    Plugin
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        {site ? (
                                            <>
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
                                                            value={site.domaine}
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
                                                            className="form-control-alternative bg-white"
                                                            value={site.plugin.nom}
                                                            type="text"
                                                            disabled
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
                                                            className="form-control-alternative bg-white"
                                                            value={site.traitement.traitement}
                                                            type="text"
                                                            disabled
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
                                                            className="form-control-alternative bg-white"
                                                            value={site.plugin.ssh}
                                                            type="text"
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </>
                                        ):(
                                            <Col xl="12" className="p-3 mb-3 w-100 skeleton"/>
                                        )}
                                    </Row>
                                </div>
                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">
                                    Information sur la protection
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        {site ? (
                                            <>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Protection
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative bg-white"
                                                            value={site.protection.nom}
                                                            type="text"
                                                            disabled
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
                                                            className="form-control-alternative bg-white text-capitalize"
                                                            value={site.protection.difficulte.nom}
                                                            type="text"
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </>
                                        ):(
                                            <Col xl="12" className="p-3 mb-3 w-100 skeleton"/>
                                        )}
                                    </Row>
                                </div>
                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">Remarque</h6>
                                <div className="pl-lg-4">
                                       {site ? (
                                           <FormGroup>
                                               <Input
                                                   className="form-control-alternative bg-white w-100"
                                                   rows="5"
                                                   value={site.protection.description}
                                                   type="textarea"
                                                   disabled
                                               />
                                           </FormGroup>
                                       ):(
                                           <div className="p-3 mb-3 w-100 skeleton"/>
                                       )}
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
