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
import Header from "../../components/Headers/Header";

const Projets = () => {
    // const [name,setName]=useState("")
    // useEffect(()=>{
    //     const user=JSON.parse(localStorage.getItem("user"))
    //     if (user){
    //         setName(user.name)
    //     }
    // },[])

    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 row m-0">
                                <div className="col-8 text-start">
                                    <h3 className="mb-0">Liste de tous les développeurs</h3>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <div className="input-group-merge input-group">
                                        <input placeholder="search" type="search" className="form-control"/>
                                    </div>
                                </div>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">User name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Completion</th>
                                    <th scope="col" />
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">
                                        <Media className="align-items-center">
                                            <a
                                                className="avatar rounded-circle mr-3"
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <img
                                                    alt="..."
                                                    src={require("../../assets/img/theme/bootstrap.jpg")}
                                                />
                                            </a>
                                            <Media>
                                          <span className="mb-0 text-sm">
                                            Argon Design System
                                          </span>
                                            </Media>
                                        </Media>
                                    </th>
                                    <td>$2,500 USD</td>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            <i className="bg-warning" />
                                            pending
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="mr-2">60%</span>
                                            <div>
                                                <Progress
                                                    max="100"
                                                    value="60"
                                                    barClassName="bg-danger"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <button type={"button"} className="btn-icon-only btn text-darker" >
                                            <i className="fas fa-eye" />
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#"
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
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Projets;
