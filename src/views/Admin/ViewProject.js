import { useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    FormGroup,
    Input,
    Row,
    Form,
    Table,
    Badge,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from "reactstrap";
import HeaderProject from "../../components/Headers/HeaderProject";
import {Next} from "../../Config.ts";

function ViewProject({author}) {
    const {id}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        const type=JSON.parse(localStorage.getItem("user")).type
        if(author==="admin" && type!==1){
            navigate("/login")
        }else if(author==="auth" && type!==2){
            navigate("/login")
        }
        if (!id){
            navigate("/login")
        }
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
                                        <Button
                                            color="default"
                                            onClick={(e) => e.preventDefault()}
                                            // size={"sm"}
                                        >
                                            Modifier
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush" style={{minHeight:'150px',}} responsive={true}>
                            <thead className="thead-light clickable">
                                <tr className="font">
                                    <th scope="col">site <i className="fa fa-sort"/></th>
                                    <th scope="col">Ticket</th>
                                    <th scope="col">Dev <i className="fa fa-sort"/></th>
                                    <th scope="col">Mapping <i className="fa fa-sort"/></th>
                                    <th scope="col">Crawler<i className="fa fa-sort"/></th>
                                    <th scope="col">Validation crawler <i className="fa fa-sort"/></th>
                                    <th scope="col">Config job <i className="fa fa-sort"/></th>
                                    <th scope="col">Arbo/Mapping <i className="fa fa-sort"/></th>
                                    <th scope="col">Etat QC <i className="fa fa-sort"/></th>
                                    <th scope="col">Progression <i className="fa fa-sort"/></th>
                                    <th scope="col"/>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        Argon Design System
                                    </th>
                                    <td>
                                        <a href="" target="_blank" rel="noopener noreferrer">PTT-9098</a>
                                    </td>
                                    <td className="text-capitalize">
                                        Andrianiavo
                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                            {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                            en cours
                                        {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
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
                                <tr>
                                    <th scope="row">
                                        Argon Design System
                                    </th>
                                    <td>
                                        <a href="" target="_blank" rel="noopener noreferrer">PTT-9098</a>
                                    </td>
                                    <td className="text-capitalize">
                                        Andrianiavo
                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
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
                                <tr>
                                    <th scope="row">
                                        Argon Design System
                                    </th>
                                    <td>
                                        <a href="" target="_blank" rel="noopener noreferrer">PTT-9098</a>
                                    </td>
                                    <td className="text-capitalize">
                                        Andrianiavo
                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
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
                                <tr>
                                    <th scope="row">
                                        Argon Design System
                                    </th>
                                    <td>
                                        <a href="" target="_blank" rel="noopener noreferrer">PTT-9098</a>
                                    </td>
                                    <td className="text-capitalize">
                                        Andrianiavo
                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
                                    <td className="text-center">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className={`clickable ${getClassEtat("en cours")}`}
                                                role="button"
                                                size="sm"
                                                color=""
                                                tag ="span"
                                            >
                                                {/*<span className={`clickable ${getClassEtat("en cours")}`}>*/}
                                                en cours
                                                {/*</span>*/}
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Another action
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Something else here
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </td>
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
            </Row>
        </>
    )
}
export default ViewProject