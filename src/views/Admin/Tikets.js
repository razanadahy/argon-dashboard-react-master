//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

import {Card, CardHeader, Container, Row, Col, Table, CardFooter, Pagination, PaginationItem, PaginationLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown,} from "reactstrap";
import {useEffect, useState} from "react";
import Header from "../../components/Headers/Header";
import {useBoolean} from "@chakra-ui/react";
import TicketAssignedDev from "../../Model/TicketAssignedDev.tsx";
import Etat from "../../Model/Etat.tsx";
import PaginateObject from "../../components/Sidebar/PaginateObject";

const Tikets = ({author}) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const [ticketsAssigned,setTicketsAssigned]=useState([])
    const [loading,setLoading]=useBoolean(false)
    const [allTicket,setAllTicket]=useState([])
    useEffect(()=>{
       setLoading.on()
        TicketAssignedDev.getTicketAssigned(user.token).then((response)=>{
            setTicketsAssigned(response)
            setAllTicket(response)
        }).finally(()=>{
            setLoading.off()
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
                                        <input placeholder="search" type="search" className="form-control"/>
                                    </div>
                                </div>
                            </CardHeader>
                            <Table className="align-items-center table-flush" style={{minHeight: '185px'}} responsive>
                                <thead className="thead-light">
                                <tr className="font clickable">
                                    <th scope="col">Projet <i className="fa fa-sort"/></th>
                                    <th scope="col">Site <i className="fa fa-sort"/></th>
                                    <th scope="col">Reference  <i className="fa fa-sort"/></th>
                                    <th scope="col">Etat <i className="fa fa-sort"/></th>
                                </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3"/>
                                        </th>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3"/>
                                        </th>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3"/>
                                        </th>
                                        <th scope="row" >
                                            <div className="skeleton p-3 mb-3"/>
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
                                        <td className="text-center">
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
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem  header tag="div">
                                                        <h6 className="text-overflow m-0 p-0 text-center">Modifier Etat</h6>
                                                    </DropdownItem>
                                                    <DropdownItem  divider/>
                                                    {etats.filter(et=>et.id!==jira.etat.id).map((etatModifier)=>(
                                                        <DropdownItem key={etatModifier.id} onClick={(e) =>{
                                                            e.preventDefault()
                                                            // updateEtat(element.idTiket,stade.id,etatModifier.id)
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
