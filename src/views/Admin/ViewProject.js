import { useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Pagination, PaginationItem, PaginationLink, Progress, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from "reactstrap";
import HeaderProject from "../../components/Headers/HeaderProject";
import {Next} from "../../Config.ts";
import StadeTicket from "../../Model/StadeTicket.tsx";
import Etat from "../../Model/Etat.tsx";
import Stade from "../../Model/Stade.tsx";
import EtatStade from "../../Model/EtatStade.tsx";
import {useBoolean} from "@chakra-ui/react";
import PaginateObject from "../../components/Sidebar/PaginateObject";
import unidecode from "unidecode";
import BarChart from "../../variables/BarChart";
import InfoProjet from "../../Model/InfoProjet.tsx";

function ViewProject({author}) {
    const {id}=useParams()
    const navigate=useNavigate()
    const [getStadeTicket,setStadeTicket]=useState([])
    const [loading,setLoading]=useState(true)
    const [etats,setEtats]=useState([
        new Etat(1,'A faire',0),
        new Etat(2,'En cours',10),
        new Etat(3,'Suspendu',100),
        new Etat(4,'Terminé',1000),
    ])
    const [stades,setStades]=useState([])
    const [loadStade,setLoad]=useState(true)
    const utilisateur=JSON.parse(localStorage.getItem("user"))
    const [erreur,setErreur]=useState(false)
    const [update,setUpdate]=useBoolean()
    const [allStadeEtat,setAllStadeEtat]=useState([])

    const [projet,setProjet]=useState(null)
    useEffect(()=>{
        setLoad(true)
        InfoProjet.getProjet(utilisateur.token,id).then((response)=>{
            if (response===null){
                navigate("../")
                return
            }
            setProjet(response)
            const dateDebut = new Date(response.creation)
            const dateFin = new Date(response.deadLine)
            const totalM = dateFin - dateDebut;
            const difH = Math.floor(totalM / (1000 * 60 * 60 *24))
            const now=new Date()
            const difNow=dateFin-now
            const restant=Math.floor(difNow / (1000 * 60 * 60 *24))
            setData([difH-restant,restant])
        })
        Stade.getStades(utilisateur.token).then((response)=>{
            setStades(response)
        }).finally(()=>{
            setLoad(false)
        })
    },[])
    useEffect(()=>{
        setLoading(true)
        if(author==="admin" && utilisateur.type!==1){
            navigate("/login")
            return;
        }else if(author==="auth" && utilisateur.type!==2){
            navigate("/login")
            return
        }
        if (!id){
            navigate("/login")
            return
        }
        StadeTicket.getStadeTicketByIdProject(utilisateur.token,id).then((response)=>{
            setStadeTicket(response)
            setAllStadeEtat(response)
        }).finally(()=>{
            setLoading(false)
        })

    },[id,update])
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
    function getPourcentage(etats){
        let i=0;
        etats.map(({etat})=>{
            if (etat.id===4){
                i+=1;
            }
        })
        return i;
    }
    function updateEtat(idTicket,idStade,idEtat) {
        EtatStade.updateEtatTicket(utilisateur.token,idTicket,idStade,idEtat).then((resp)=>{
            if (!resp){
                setErreur(true)
            }
        }).finally(()=>{
            setUpdate.toggle()
        })
    }
    const [order,setOrder]=useBoolean()
    function orderEtatStade(idStade){
        const updatedFilterItem = [...getStadeTicket];
        updatedFilterItem.sort((a, b) =>{
            const etatA=order ? a.etatStade.find(e=>e.stade.id===idStade) : b.etatStade.find(e=>e.stade.id===idStade)
            const etatB=order ? b.etatStade.find(e=>e.stade.id===idStade) : a.etatStade.find(e=>e.stade.id===idStade)
            if (etatA && etatB) {
                const etatNomA = etatA.etat.nom.toUpperCase();
                const etatNomB = etatB.etat.nom.toUpperCase();

                if (etatNomA < etatNomB) {
                    return -1;
                }
                if (etatNomA > etatNomB) {
                    return 1;
                }
                return 0;
            } else if (etatA) {
                return -1;
            } else if (etatB) {
                return 1;
            }
            return 0;
        })
        setStadeTicket(updatedFilterItem);
    }

    function orderSite(){
        const updatedFilterItem = [...getStadeTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.site.nomSite.localeCompare(a.site.nomSite))
        }else{
            updatedFilterItem.sort((a, b) =>a.site.nomSite.localeCompare(b.site.nomSite))
        }
        setStadeTicket(updatedFilterItem);
    }

    function orderDev() {
        const updatedFilterItem = [...getStadeTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.utilisateur.nom.localeCompare(a.utilisateur.nom))
        }else{
            updatedFilterItem.sort((a, b) =>a.utilisateur.nom.localeCompare(b.utilisateur.nom))
        }
        setStadeTicket(updatedFilterItem);
    }
    function orderType() {
        const updatedFilterItem = [...getStadeTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>a.typeProjet.id - b.typeProjet.id)
        }else{
            updatedFilterItem.sort((a, b) =>b.typeProjet.id - a.typeProjet.id)
        }
        setStadeTicket(updatedFilterItem);
    }
    function search(input) {
        const normalizedInput = unidecode(input).toLowerCase();

        const byRef = allStadeEtat.filter((projet) => {
            if (projet?.ticket?.reference) {
                const normalizedReference = unidecode(projet.ticket.reference).toLowerCase();
                return normalizedReference.includes(normalizedInput);
            }
        });

        const byNom = allStadeEtat.filter((projet) => {
            if (projet?.site?.nomSite) {
                const normalizedNom = unidecode(projet.site.nomSite).toLowerCase();
                return normalizedNom.includes(normalizedInput);
            }
        });

        const byType = allStadeEtat.filter((projet) => {
            if (projet?.typeProjet?.type) {
                const normalizedType = unidecode(projet.typeProjet.type).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });
        const byDev = allStadeEtat.filter((projet) => {
            if (projet?.utilisateur?.nom) {
                const normalizedType = unidecode(projet.utilisateur.nom).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });
        const searchResults = [...new Set([...byRef, ...byNom, ...byType,...byDev])];
        setStadeTicket(searchResults);
    }

    const [currentPage,setCurrentPage]=useState(1)
    function onPageChange(number) {
        setCurrentPage(number)
    }
    const perPage=10;
    const startIndex=(currentPage-1)*perPage
    const endIndex=startIndex+perPage
    const currentData=getStadeTicket.slice(startIndex,endIndex)

    const [data,setData]=useState([0,0])
    const label=["temps cumulé en jour(s)","Temps restant en jour(s)"]
    return(
        <>
            <HeaderProject name={projet ? projet.nomProjet : ""}/>
            <Row className="mt--8 m-0 p-0">
                <Col className="order-xl-1 mb-4" xl="12">
                    <Card className="bg-secondary m-0 p-0 border-0">
                        <CardHeader className="bg-white border-0 p-2">
                            <Row className="text-center">
                                <Col className="col-5 text-start" xl="5" xs={"8"}>
                                    <div className="input-group-merge input-group">
                                        <input placeholder="search" type="search" onChange={(event)=>search(event.target.value)} className="form-control"/>
                                    </div>
                                </Col>
                                {author==="admin" && (
                                    <Col className="text-right justify-content-end" xl={"7"} xs="4">
                                        <Button color="default" onClick={(e) => e.preventDefault()}>
                                            Modifier
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush" style={{minHeight:'185px'}} responsive>
                            <thead className="thead-light clickable">
                                <tr className="font">
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        orderSite()
                                    }}>site <i className="fa fa-sort"/></th>
                                    <th scope="col">Ticket</th>
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        orderDev()
                                    }}>Dev <i className="fa fa-sort"/></th>
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        orderType()
                                    }}>Type <i className="fa fa-sort"/></th>
                                    {!loadStade && stades.map((stade)=>(
                                        <th key={stade.id} onClick={()=>{
                                            setOrder.toggle()
                                            orderEtatStade(stade.id)
                                        }} scope="col">{stade.nom} <i className="fa fa-sort"/></th>
                                    ))}

                                    <th scope="col">Progression</th>
                                    <th scope="col"/>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <th scope="row">
                                            <div className="skeleton p-3 mb-3"/>
                                        </th>
                                        <td>
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-capitalize">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-capitalize">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-center">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-center">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-center">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-center">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-center">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-center">
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td>
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-right m-0 p-1">

                                        </td>
                                    </tr>
                                ): currentData.map((element)=>(
                                    <tr key={element.idStadeTiket}>
                                        <th scope="row">
                                            {element.site.nomSite}
                                        </th>
                                        <td>
                                            <a href={element.ticket.url} target="_blank" rel="noopener noreferrer">{element.ticket.reference}</a>
                                        </td>
                                        <td className="text-capitalize">
                                            {element.utilisateur.nom}
                                        </td>
                                        <td className="text-capitalize">
                                            {element.typeProjet.type}
                                        </td>
                                        {element.etatStade.map(({etat,stade})=>(
                                            <td key={stade.id} className="text-center">
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className={`clickable ${getClassEtat(etat.nom)}`}
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                        tag ="span"
                                                    >
                                                        {etat.nom}
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        <DropdownItem className="noti-title" header tag="div">
                                                            <h6 className="text-overflow m-0 p-0 text-center">Modifier Etat</h6>
                                                        </DropdownItem>
                                                        <DropdownItem  divider/>
                                                        {etats.filter(et=>et.id!==etat.id).map((etatModifier)=>(
                                                            <DropdownItem key={etatModifier.id} onClick={(e) =>{
                                                                e.preventDefault()
                                                                updateEtat(element.idTiket,stade.id,etatModifier.id)
                                                            }}>
                                                                {etatModifier.nom}
                                                            </DropdownItem>
                                                        ))}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                        ))}
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">{Math.ceil((getPourcentage(element.etatStade)*100/stades.length))}%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value={Math.ceil(((getPourcentage(element.etatStade)*100/stades.length)))}
                                                        barClassName={`${Math.ceil((getPourcentage(element.etatStade)*100/stades.length))>=50 ? "bg-success" : "bg-danger"}`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right m-0 p-1">
                                            <button type={"button"} onClick={()=>{Next("",null,navigate)}} className="btn-icon-only btn text-darker" >
                                                <i className="fas fa-eye" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <CardFooter className="py-3">
                            <nav aria-label="...">
                                <PaginateObject currentPage={currentPage} list={getStadeTicket} perPage={perPage} onPageChange={onPageChange}/>
                            </nav>
                        </CardFooter>
                    </Card>
                </Col>
                <Col className="order-xl-2 mb-6 mb-xl-0" xl="12">
                    <Row className="d-flex align-items-stretch">
                        <Col xl="7" xs="12" className="mb-4">
                            <Card className="card-profile shadow h-100 rounded">
                                <CardHeader className="text-center border-0 pb-2">
                                    <h3 className="mb-0">Consigne du projet</h3>
                                </CardHeader>
                                <hr className="my-2" />
                                <CardBody className="m-0 p-0">
                                    <Row>
                                        <div className="col">
                                            {projet ? (
                                                <div className="card-profile-stats d-flex justify-content-start px-3">
                                                    <pre className="m-0 p-0 container-message" dangerouslySetInnerHTML={{__html: projet.consigne}}/>
                                                </div>
                                            ): (
                                                <div className="card-profile-stats d-flex justify-content-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="mb-4" xl="5" xs="12">
                            <Card className="card-profile shadow h-100 rounded">
                                <CardHeader className="text-center border-0 pb-2">
                                    <h3 className="mb-0">Rapport sur le temps du projet</h3>
                                </CardHeader>
                                <hr className="my-2" />
                                <CardBody className="m-0 p-0 py-3">
                                    {projet && projet.idEtat!==4 ?(
                                        <BarChart type={'doughnut'} data={data} label={label} />
                                    ): (
                                        <Row>
                                            <div className="col">
                                                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                    <div>
                                                        <span className="heading">Projet déjà fini!</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    )}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default ViewProject