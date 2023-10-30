//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Table,
    Badge,

    CardFooter, Pagination, PaginationItem, PaginationLink,
} from "reactstrap";
import {useEffect, useState} from "react";
import userBlanck from '../../assets/img/icons/bl.png'
import Header from "../../components/Headers/Header";

const Tikets = ({utilisateur}) => {
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
                    <Col xl="12">
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
            </Container>
        </>
    );
};

export default Tikets;
