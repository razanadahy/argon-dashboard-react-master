//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

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
    Table,
    Media,
    Badge,
    UncontrolledTooltip,
    Progress,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardFooter, Pagination, PaginationItem, PaginationLink,
} from "reactstrap";
import {useEffect, useState} from "react";
import userBlanck from '../../assets/img/icons/bl.png'
import InfoPersoHeader from "../../components/Headers/InfoPersoHeader";

const ViewDeveloppeur = () => {
    // const [name,setName]=useState("")
    // useEffect(()=>{
    //     const user=JSON.parse(localStorage.getItem("user"))
    //     if (user){
    //         setName(user.name)
    //     }
    // },[])

    return (
        <>
            <InfoPersoHeader/>
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
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    {/*<div className="d-flex justify-content-between">*/}
                                    {/*  <Button*/}
                                    {/*    className="mr-4"*/}
                                    {/*    color="info"*/}
                                    {/*    href="#pablo"*/}
                                    {/*    onClick={(e) => e.preventDefault()}*/}
                                    {/*    size="sm"*/}
                                    {/*  >*/}
                                    {/*    Connect*/}
                                    {/*  </Button>*/}
                                    {/*  <Button*/}
                                    {/*    className="float-right"*/}
                                    {/*    color="default"*/}
                                    {/*    href="#pablo"*/}
                                    {/*    onClick={(e) => e.preventDefault()}*/}
                                    {/*    size="sm"*/}
                                    {/*  >*/}
                                    {/*    Message*/}
                                    {/*  </Button>*/}
                                    {/*</div>*/}
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
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="border-0 row m-0">
                                    <div className="col-6 text-start">
                                        <h3 className="mb-0">Ses Tickets</h3>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end">
                                        <div className="input-group-merge input-group">
                                            <input placeholder="search" type="search" className="form-control"/>
                                        </div>
                                    </div>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr className="font">
                                        <th scope="col">Projet <i className="fa fa-sort"/></th>
                                        <th scope="col">Reference</th>
                                        <th scope="col">Url</th>
                                        <th scope="col">Etat <i className="fa fa-sort"/></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">
                                                    <span className="mb-0 text-sm">
                                                    Argon Design System
                                                  </span>
                                        </th>
                                        <td><a href="" target="_blank" rel="noopener noreferrer">Reference</a></td>
                                        <td>
                                            <Badge color="" className="badge-dot mr-4">
                                                <i className="bg-warning" />
                                                pending
                                            </Badge>
                                        </td>
                                        <td>
                                            <a href="" target="_blank" rel="noopener noreferrer">Reference</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                                {/*<CardBody>*/}
                                {/*    */}
                                {/*</CardBody>*/}
                                <CardFooter className="py-4">
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
                    </Row>
                </>
            </Container>
        </>
    );
};

export default ViewDeveloppeur;
