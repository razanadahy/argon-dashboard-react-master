//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

import {Card, CardHeader, CardBody, Container, Row, Col, Table, CardFooter} from "reactstrap";
import {useEffect, useState} from "react";
import userBlanck from '../../assets/img/icons/bl.png'
import InfoPersoHeader from "../../components/Headers/InfoPersoHeader";
import {GetObjectFromURL} from "../../Config.ts";
import {useNavigate} from "react-router-dom";
import TicketAssignedDev from "../../Model/TicketAssignedDev.tsx";
import PaginateObject from "../../components/Sidebar/PaginateObject";
import unidecode from "unidecode";
import {useBoolean} from "@chakra-ui/react";
import StatTicketDev from "../../Model/StatTicketDev.tsx";

const ViewDeveloppeur = ({author}) => {
    const infoDev = GetObjectFromURL();
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem("user"))
    const [listAllTicket,setListAll]=useState([])
    const [tempTicket,setTempsTicket]=useState([])
    const [loading,setLoading]=useState(true)
    const [statDev,setStatDev]=useState(null)

    useEffect(()=>{
       if(infoDev===null || infoDev===undefined){
           navigate(`/${author}/developpeurs`)
           return
       }
       setLoading(true)
       TicketAssignedDev.getTicketAssignedByIdDev(user.token,infoDev.infoUtilisateur.id,infoDev.infoUtilisateur.type).then((response)=>{
           setListAll(response)
           setTempsTicket(response)
       }).finally(()=>{
           setLoading(false)
       })
        StatTicketDev.getStatDev(user.token,infoDev.infoUtilisateur.id,infoDev.infoUtilisateur.type).then((response)=>{
            setStatDev(response)
        })
    },[])

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
    function search(input) {
        const normalizedInput = unidecode(input).toLowerCase();

        const byRef = listAllTicket.filter((projet) => {
            if (projet?.jira?.reference) {
                const normalizedReference = unidecode(projet.jira.reference).toLowerCase();
                return normalizedReference.includes(normalizedInput);
            }
        });

        const byNom = listAllTicket.filter((projet) => {
            if (projet?.nomSite) {
                const normalizedNom = unidecode(projet.nomSite).toLowerCase();
                return normalizedNom.includes(normalizedInput);
            }
        });

        const byTypeP = listAllTicket.filter((projet) => {
            if (projet?.nomProjet) {
                const normalizedType = unidecode(projet.nomProjet).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });

        const searchResults = [...new Set([...byRef, ...byNom, ...byTypeP])];
        setTempsTicket(searchResults);
    }
    const [currentPage,setCurrentPage]=useState(1)
    function onPageChange(number) {
        setCurrentPage(number)
    }

    const [order,setOrder]=useBoolean()
    function orderProjet() {
        const updatedFilterItem = [...tempTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.nomProjet.localeCompare(a.nomProjet))
        }else{
            updatedFilterItem.sort((a, b) =>a.nomProjet.localeCompare(b.nomProjet))
        }
        setTempsTicket(updatedFilterItem);
    }
    function orderSite() {
        const updatedFilterItem = [...tempTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.nomSite.localeCompare(a.nomSite))
        }else{
            updatedFilterItem.sort((a, b) =>a.nomSite.localeCompare(b.nomSite))
        }
        setTempsTicket(updatedFilterItem);
    }
    function orderEtat() {
        const updatedFilterItem = [...tempTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.jira.etat.nom.localeCompare(a.jira.etat.nom))
        }else{
            updatedFilterItem.sort((a, b) =>a.jira.etat.nom.localeCompare(b.jira.etat.nom))
        }
        setTempsTicket(updatedFilterItem);
    }
    function orderReference() {
        const updatedFilterItem = [...tempTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.jira.reference.localeCompare(a.jira.reference))
        }else{
            updatedFilterItem.sort((a, b) =>a.jira.reference.localeCompare(b.jira.reference))
        }
        setTempsTicket(updatedFilterItem);
    }

    const perPage=5;
    const startIndex=(currentPage-1)*perPage
    const endIndex=startIndex+perPage
    const currentData=tempTicket.slice(startIndex,endIndex)
    return (
        <>
            <InfoPersoHeader nom={infoDev?infoDev.infoUtilisateur.nom :""} email={infoDev?infoDev.infoUtilisateur.email:""} estConge={infoDev?infoDev.enConge:""}/>
            <Container className="mt--8" fluid>
                <>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#" onClick={(e) => e.preventDefault()}>
                                                <img
                                                    alt="Image"
                                                    className="rounded-circle bg-gradient-secondary"
                                                    src={userBlanck}/>
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
                                                ): (
                                                    <>
                                                        <div>
                                                            <div className="heading skeleton p-3 mb-3 rounded"/>
                                                        </div>
                                                        <div>
                                                            <div className="heading skeleton p-3 mb-3 rounded"/>
                                                        </div>
                                                        <div>
                                                            <div className="heading skeleton p-3 mb-3 rounded"/>
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </Row>
                                    <div className="text-center">
                                        <h3>
                                            {infoDev?infoDev.infoUtilisateur.nom :""}
                                        </h3>
                                        <div className="h5 font-weight-300">
                                            {infoDev?infoDev.infoUtilisateur.email:""}
                                        </div>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            {infoDev && infoDev.infoUtilisateur.type===1 ? "Lead" : "Developpeur"}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="border-0 row m-0">
                                    <div className="col-6 text-start">
                                        <h3 className="mb-0">Tickets</h3>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end">
                                        <div className="input-group-merge input-group">
                                            <input placeholder="Recherche" type="search" onChange={(event)=>search(event.target.value)} className="form-control"/>
                                        </div>
                                    </div>
                                </CardHeader>

                                <Table className={`align-items-center table-flush ${loading ? "tableLoading" : "" }`} responsive>
                                    <thead className="thead-light">
                                    <tr className="font clickable">
                                        <th scope="col" onClick={()=>{
                                            setOrder.toggle()
                                            orderProjet()
                                        }}>Projet <i className="fa fa-sort"/></th>
                                        <th scope="col" onClick={()=>{
                                            setOrder.toggle()
                                            orderSite()
                                        }}>Site <i className="fa fa-sort"/></th>
                                        <th scope="col" onClick={()=>{
                                            setOrder.toggle()
                                            orderReference()
                                        }}>Ticket <i className="fa fa-sort"/></th>
                                        <th scope="col" onClick={()=>{
                                            setOrder.toggle()
                                            orderEtat()
                                        }}>Etat <i className="fa fa-sort"/></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {loading ? (
                                        <tr>
                                            <th scope="row">
                                                <div className="skeleton rounded p-3 mb-3"/>
                                            </th>
                                            <td>
                                                <div className="skeleton rounded p-3 mb-3"/>
                                            </td>
                                            <td>
                                                <div className="skeleton rounded p-3 mb-3"/>
                                            </td>
                                            <td>
                                                <div className="skeleton rounded p-3 mb-3"/>
                                            </td>
                                        </tr>
                                    ):currentData.map(({jira,nomSite,nomProjet,typeTicket,idSite,idProjet},index)=>(
                                        <tr key={index}>
                                            <th scope="row">
                                                <span className="mb-0 text-sm text-capitalize">
                                                    {nomProjet}
                                                </span>
                                            </th>
                                            <td>
                                                <span className="text-sm text-capitalize">
                                                     {nomSite}
                                                </span>
                                            </td>
                                            <td>
                                                <a href={jira.url} target="_blank" rel="noopener noreferrer">{jira.reference}</a>
                                            </td>
                                            <td>
                                                <span className={getClassEtat(jira.etat.nom)}>
                                                    {jira.etat.nom}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>

                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <PaginateObject currentPage={currentPage} list={tempTicket} perPage={perPage} onPageChange={onPageChange}/>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </>
            </Container>
        </>
    );
};

export default ViewDeveloppeur;
