import { useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Pagination, PaginationItem, PaginationLink, Progress, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from "reactstrap";
import HeaderProject from "../../components/Headers/HeaderProject";
import {Next} from "../../Config.ts";
import StadeTicket from "../../Model/StadeTicket.tsx";
import Etat from "../../Model/Etat.tsx";
import Stade from "../../Model/Stade.tsx";

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
    useEffect(()=>{
        setLoad(true)
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
            console.log(response)
            setStadeTicket(response)
        }).finally(()=>{
            setLoading(false)
        })

    },[id])
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

    return(
        <>
            <HeaderProject name={"teste"}/>
            <Row className="mt--8 m-0 p-0" fluid>
                <Col className="order-xl-1 mb-2" xl="12">
                    <Card className="bg-secondary m-0 p-0 border-0">
                        <CardHeader className="bg-white border-0 p-2">
                            <Row className="text-center">
                                <Col className="col-5 text-start" xl="5" xs={"8"}>
                                    <div className="input-group-merge input-group">
                                        <input placeholder="search" type="search" onChange={(event)=>null} className="form-control"/>
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
                        <Table className="align-items-center table-flush" style={{minHeight:'185px',}} responsive={true}>
                            <thead className="thead-light clickable">
                                <tr className="font">
                                    <th scope="col">site <i className="fa fa-sort"/></th>
                                    <th scope="col">Ticket</th>
                                    <th scope="col">Dev <i className="fa fa-sort"/></th>
                                    <th scope="col">Type <i className="fa fa-sort"/></th>
                                    {!loadStade && stades.map((stade)=>(
                                        <th key={stade.id} scope="col">{stade.nom} <i className="fa fa-sort"/></th>
                                    ))}

                                    <th scope="col">Progression <i className="fa fa-sort"/></th>
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
                                ): getStadeTicket.map((element)=>(
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
                                                            <DropdownItem key={etatModifier.id} onClick={(e) => e.preventDefault()}>
                                                                {etatModifier.nom}
                                                            </DropdownItem>
                                                        ))}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                        ))}
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">100%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="100"
                                                        barClassName="bg-success"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right m-0 p-1">
                                            <button type={"button"} onClick={()=>{Next("#",null,navigate)}} className="btn-icon-only btn text-darker" >
                                                <i className="fas fa-eye" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <CardFooter className="py-3">
                            <nav aria-label="...">
                                <Pagination
                                    className="pagination justify-content-end mb-0"
                                    listClassName="justify-content-end mb-0"
                                >
                                    <PaginationItem className="disabled">
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            tabIndex="-1"
                                        >
                                            <i className="fas fa-angle-left" />
                                            <span className="sr-only">Previous</span>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem className="active">
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            2 <span className="sr-only">(current)</span>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fas fa-angle-right" />
                                            <span className="sr-only">Next</span>
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            </nav>
                        </CardFooter>
                    </Card>
                </Col>
                <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                    <Card className="card-profile shadow">
                        <Row className="justify-content-center">
                            <Col className="order-lg-2" lg="3">
                                <div className="card-profile-image">
                                    {/*<a href="#" onClick={(e) => e.preventDefault()}>*/}
                                    {/*    <img*/}
                                    {/*        alt="Image"*/}
                                    {/*        className="rounded-circle bg-gradient-secondary"*/}
                                    {/*        src={userBlanck}/>*/}
                                    {/*</a>*/}
                                </div>
                            </Col>
                        </Row>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">

                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Row>
                                <div className="col">
                                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span className="heading">22</span>
                                            <span className="description">En cours</span>
                                        </div>
                                        <div>
                                            <span className="heading">10</span>
                                            <span className="description">À faire</span>
                                        </div>
                                        <div>
                                            <span className="heading">89</span>
                                            <span className="description">Terminés</span>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <div className="text-center">
                                <h3>
                                    Jessica Jones
                                </h3>
                                <div className="h5 font-weight-300">
                                    JessicaJones@gmail.com
                                </div>
                                <div className="h5 mt-4">
                                    <i className="ni business_briefcase-24 mr-2" />
                                    Developpeur
                                </div>
                                <hr className="my-4" />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default ViewProject