//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

import {Card, CardHeader, Container, Row, Col, Table, CardFooter, Pagination, PaginationItem, PaginationLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown,} from "reactstrap";
import {useEffect, useState} from "react";
import Header from "../../components/Headers/Header";
import {useBoolean} from "@chakra-ui/react";
import TicketAssignedDev from "../../Model/TicketAssignedDev.tsx";
import Etat from "../../Model/Etat.tsx";
import PaginateObject from "../../components/Sidebar/PaginateObject";
import unidecode from "unidecode";

const Tikets = ({author}) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const [ticketsAssigned,setTicketsAssigned]=useState([])
    const [loading,setLoading]=useBoolean(false)
    const [allTicket,setAllTicket]=useState([])
    const [upd,setUpd]=useBoolean()
    useEffect(()=>{
       setLoading.on()
        TicketAssignedDev.getTicketAssigned(user.token).then((response)=>{
            setTicketsAssigned(response)
            setAllTicket(response)
        }).finally(()=>{
            setLoading.off()
        })
    },[upd])

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
    const [etats,setEtats]=useState([
        new Etat(1,'A faire',0),
        new Etat(2,'En cours',10),
        new Etat(3,'Suspendu',100),
        new Etat(4,'Terminé',1000),
    ])
    const [currentPage,setCurrentPage]=useState(1)
    function onPageChange(number) {
        setCurrentPage(number)
    }
    const perPage=10;
    const startIndex=(currentPage-1)*perPage
    const endIndex=startIndex+perPage
    const currentData=ticketsAssigned.slice(startIndex,endIndex)
    const [erreur,setErreur]=useBoolean(false)
    
    function modifEtatTicket(idTicket,isBug,idEtat) {
        setLoading.on()
        TicketAssignedDev.update(user.token,idTicket,idEtat,isBug).then((res)=>{
            if (!res){
                setErreur.on()
            }
        }).finally(()=>{
            setUpd.toggle()
        })
    }

    const [order,setOrder]=useBoolean()
    function orderProjet() {
        const updatedFilterItem = [...ticketsAssigned];
        if (order){
            updatedFilterItem.sort((a, b) =>b.nomProjet.localeCompare(a.nomProjet))
        }else{
            updatedFilterItem.sort((a, b) =>a.nomProjet.localeCompare(b.nomProjet))
        }
        setTicketsAssigned(updatedFilterItem);
    }
    function orderSite() {
        const updatedFilterItem = [...ticketsAssigned];
        if (order){
            updatedFilterItem.sort((a, b) =>b.nomSite.localeCompare(a.nomSite))
        }else{
            updatedFilterItem.sort((a, b) =>a.nomSite.localeCompare(b.nomSite))
        }
        setTicketsAssigned(updatedFilterItem);
    }
    function orderEtat() {
        const updatedFilterItem = [...ticketsAssigned];
        if (order){
            updatedFilterItem.sort((a, b) =>b.jira.etat.nom.localeCompare(a.jira.etat.nom))
        }else{
            updatedFilterItem.sort((a, b) =>a.jira.etat.nom.localeCompare(b.jira.etat.nom))
        }
        setTicketsAssigned(updatedFilterItem);
    }
    function orderReference() {
        const updatedFilterItem = [...ticketsAssigned];
        if (order){
            updatedFilterItem.sort((a, b) =>b.jira.reference.localeCompare(a.jira.reference))
        }else{
            updatedFilterItem.sort((a, b) =>a.jira.reference.localeCompare(b.jira.reference))
        }
        setTicketsAssigned(updatedFilterItem);
    }

    function search(input) {
        const normalizedInput = unidecode(input).toLowerCase();

        const byRef = allTicket.filter((projet) => {
            if (projet?.jira?.reference) {
                const normalizedReference = unidecode(projet.jira.reference).toLowerCase();
                return normalizedReference.includes(normalizedInput);
            }
        });

        const byNom = allTicket.filter((projet) => {
            if (projet?.nomSite) {
                const normalizedNom = unidecode(projet.nomSite).toLowerCase();
                return normalizedNom.includes(normalizedInput);
            }
        });

        const byTypeP = allTicket.filter((projet) => {
            if (projet?.nomProjet) {
                const normalizedType = unidecode(projet.nomProjet).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });
        const byDev = allTicket.filter((projet) => {
            if (projet?.jira?.etat?.nom) {
                const normalizedType = unidecode(projet.jira.etat.nom).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });
        const searchResults = [...new Set([...byRef, ...byNom, ...byTypeP,...byDev])];
        setTicketsAssigned(searchResults);
    }

    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="border-0 row m-0">
                                <div className="col-6 text-start">
                                    <h3 className="mb-0">Mes Tickets</h3>
                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                    <div className="input-group-merge input-group">
                                        <input placeholder="search" onChange={(event)=>{search(event.target.value)}} type="search" className="form-control"/>
                                    </div>
                                </div>
                            </CardHeader>
                            <Table className={`align-items-center table-flush ${loading && "tableLoading disabled"}`} style={{minHeight: '165px'}} responsive>
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
                                    }}>Reference  <i className="fa fa-sort"/></th>
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        orderEtat()
                                    }}>Etat <i className="fa fa-sort"/></th>
                                </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </th>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </th>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </th>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </th>
                                    </tr>
                                ):currentData.map(({jira,nomSite,nomProjet,typeTicket,idSite,idProjet},index)=>(
                                    <tr key={index}>
                                        <th scope="row">
                                            <a href={`/${author}/projets/view/${idProjet}`}>
                                                <span className="mb-0 text-sm clickable text-capitalize" >
                                                   {nomProjet}
                                                </span>
                                            </a>
                                        </th>
                                        <td scope="row">
                                            <a href={`/${author}/projets/view/site/${idSite}/${nomProjet}/${idProjet}`}>
                                                <span className="mb-0 text-sm clickable text-capitalize">
                                                   {nomSite}
                                                </span>
                                            </a>
                                        </td>
                                        <td><a href={jira.url} target="_blank" rel="noopener noreferrer">{jira.reference}</a></td>
                                        <td>
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className={`clickable ${getClassEtat(jira.etat.nom)}`}
                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    tag ="span"
                                                >
                                                    {jira.etat.nom}
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right={false}>
                                                    {etats.filter(et=>et.id!==jira.etat.id).map((etatModifier)=>(
                                                        <DropdownItem  key={etatModifier.id} onClick={(e) =>{
                                                            e.preventDefault()
                                                            modifEtatTicket(jira.id,typeTicket,etatModifier.id)
                                                        }}>
                                                            {etatModifier.nom}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <PaginateObject currentPage={currentPage} list={ticketsAssigned} perPage={perPage} onPageChange={onPageChange}/>
                                </nav>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Tikets;
