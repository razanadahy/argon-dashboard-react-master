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
import ProjectView from "../../Model/ProjectView.tsx";
import unidecode from 'unidecode';

const Projets = () => {
    const [listProjet,setListProjet]=useState([])
    const[filteritem,setFilterItem]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const token=JSON.parse(localStorage.getItem("user")).token
        setLoading(true)
        ProjectView.all(token).then((response)=>{
            setListProjet(response)
            setFilterItem(response)
        }).finally(()=>{
            setLoading(false)
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
    const [sortCreation,setSortCreation]=useState(false)
    const [sortDeadlines,setSortDeadlines]=useState(false)
    const [sortEtat,setSortEtat]=useState(false)
    function orderCreation(order){
        const updatedFilterItem = [...filteritem];
        if (order){
            updatedFilterItem.sort((a, b) =>new Date(a.dateCreation) -new Date( b.dateCreation));
        }else{
            updatedFilterItem.sort((a, b) => new Date( b.dateCreation) - new Date(a.dateCreation));
        }
        setFilterItem(updatedFilterItem);
    }
    function orderDeadline(order){
        const updatedFilterItem = [...filteritem];
        if (order){
            updatedFilterItem.sort((a, b) =>new Date(a.deadlines) -new Date( b.deadlines));
        }else{
            updatedFilterItem.sort((a, b) => new Date( b.deadlines) - new Date(a.deadlines));
        }
        setFilterItem(updatedFilterItem);
    }
    function orderEtat(order){
        const updatedFilterItem = [...filteritem];
        if (order){
            updatedFilterItem.sort((a, b) => b.nomEtat.localeCompare(a.nomEtat))
        }else{
            updatedFilterItem.sort((a, b) => a.nomEtat.localeCompare(b.nomEtat))
        }
        setFilterItem(updatedFilterItem);
    }

    function search(input) {
        const normalizedInput = unidecode(input).toLowerCase();

        const byRef = listProjet.filter((projet) => {
            if (projet?.jira?.reference) {
                const normalizedReference = unidecode(projet.jira.reference).toLowerCase();
                return normalizedReference.includes(normalizedInput);
            }
        });

        const byNom = listProjet.filter((projet) => {
            if (projet.nomProjet) {
                const normalizedNom = unidecode(projet.nomProjet).toLowerCase();
                return normalizedNom.includes(normalizedInput);
            }
        });

        const byType = listProjet.filter((projet) => {
            if (projet.nomType) {
                const normalizedType = unidecode(projet.nomType).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });

        const searchResults = [...new Set([...byRef, ...byNom, ...byType])];

        setFilterItem(searchResults);
    }


    return (
        <>
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 row m-0">
                                <div className="col-8 text-start">
                                    <h3 className="mb-0">Liste de tous les Projets</h3>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <div className="input-group-merge input-group">
                                        <input placeholder="search" type="search" onChange={(event)=>search(event.target.value)} className="form-control"/>
                                    </div>
                                </div>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr className="font">
                                        <th className="clickable" scope="col">Projet</th>
                                        <th className="clickable" scope="col">Jira</th>
                                        <th className="clickable" scope="col">Type</th>
                                        <th className="clickable" scope="col" onClick={()=>{
                                            setSortCreation((prev)=>!prev)
                                            orderCreation(sortCreation)
                                        }}>Date Creation <i className="fa fa-sort"/></th>
                                        <th className="clickable" scope="col" onClick={()=>{
                                            setSortDeadlines((prev)=>!prev)
                                            orderDeadline(sortDeadlines)
                                        }}>date limite <i className="fa fa-sort"/></th>
                                        <th className="clickable" scope="col" onClick={()=>{
                                            setSortEtat((prev)=>!prev)
                                            orderEtat(sortEtat)
                                        }}>Etat <i className="fa fa-sort"/></th>
                                        <th className="clickable" scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                        <th scope="row">
                                            <div className="skeleton p-3 mb-3"/>
                                        </th>
                                        <td><div className="skeleton p-3 mb-3"/></td>
                                        <td><div className="skeleton p-3 mb-3"/></td>
                                        <td>
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td>
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td>
                                            <div className="skeleton p-3 mb-3"/>
                                        </td>
                                        <td className="text-right">

                                        </td>
                                    </tr>
                                ):filteritem.map((ProjectView)=>(
                                    <tr key={ProjectView.idProjet}>
                                        <th scope="row">
                                             <span className="mb-0 text-sm">
                                                {ProjectView.nomProjet}
                                             </span>
                                        </th>
                                        <td>
                                            {!ProjectView.jira.reference ? (<div><pre  data-toggle="tooltip" title="projet n'a pas de lien jira!" className="m-0 p-0 text-lg">--</pre></div>):(
                                                <a href={ProjectView.jira.url} target="_blank" rel="noopener noreferrer">{ProjectView.jira.reference}</a>
                                            )}
                                        </td>
                                        <td>{ProjectView.nomType}</td>
                                        <td>
                                            <pre className="m-0 p-0 fs-16">{ProjectView.dateCreation}</pre>
                                        </td>
                                        <td>
                                            <pre className="m-0 p-0 fs-16">{ProjectView.deadlines}</pre>
                                        </td>
                                        <td>
                                            <span className={getClassEtat(ProjectView.nomEtat)}>
                                                {ProjectView.nomEtat}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <button type={"button"} className="btn-icon-only btn text-darker" >
                                                <i className="fas fa-eye" />
                                            </button>
                                        </td>
                                    </tr>
                                )) }
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
                                                3
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
