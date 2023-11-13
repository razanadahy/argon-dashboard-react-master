//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

import {Card, CardHeader, Container, Row, Table, CardFooter, FormGroup} from "reactstrap";

import {useEffect, useState} from "react";
import Header from "../../components/Headers/Header";
import ProjectView from "../../Model/ProjectView.tsx";
import unidecode from 'unidecode';
import PaginateObject from "../../components/Sidebar/PaginateObject";
import {useNavigate} from "react-router-dom";
import {Next} from "../../Config.ts";
import {useBoolean} from "@chakra-ui/react";

const Projets = ({type}) => {
    const [listProjet,setListProjet]=useState([])
    const[filteritem,setFilterItem]=useState([])
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
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
    const [ordPlateForme,setOrderPlate]=useBoolean()
    function orderPlateforme(order){
        const updatedFilterItem = [...filteritem];
        if (order){
            updatedFilterItem.sort((a, b) => b.plateforme.localeCompare(a.plateforme))
        }else{
            updatedFilterItem.sort((a, b) => a.plateforme.localeCompare(b.plateforme))
        }
        setFilterItem(updatedFilterItem);
    }
    function orderNbSite(order){
        const updatedFilterItem = [...filteritem];
        if (order){
            updatedFilterItem.sort((a, b) => b.nombreSite - a.nombreSite)
        }else{
            updatedFilterItem.sort((a, b) => a.nombreSite - b.nombreSite)
        }
        setFilterItem(updatedFilterItem);
    }
    const [currentPage,setCurrentPage]=useState(1)
    function onPageChange(number) {
        setCurrentPage(number)
    }
    const perPage=5;
    const startIndex=(currentPage-1)*perPage
    const endIndex=startIndex+perPage
    const currentData=filteritem.slice(startIndex,endIndex)
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
        const byPlateforme = listProjet.filter((projet) => {
            if (projet.plateforme) {
                const normalizedType = unidecode(projet.plateforme).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });
        const searchResults = [...new Set([...byRef, ...byNom, ...byType, ...byPlateforme])];
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
                                <div className="col-3 text-start">
                                    <h3 className="mb-0">Liste de tous les Projets</h3>
                                </div>
                                <div className="col-4 text-start">
                                    <button type="submit" className="btn btn-primary col-12">Ajouter nouveau projet </button>
                                </div>
                                <div className="col-4 offset-1 d-flex justify-content-end">
                                    <div className="input-group-merge input-group">
                                        <input placeholder="search" type="search" onChange={(event)=>search(event.target.value)} className="form-control"/>
                                    </div>
                                </div>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr className="font">
                                        <th className="clickable" scope="col">Projet</th>
                                        <th className="clickable" scope="col" onClick={()=>{
                                            setOrderPlate.toggle()
                                            orderPlateforme(ordPlateForme)
                                        }}>Plateforme<i className="fa fa-sort"/></th>
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
                                        <th className="clickable" scope="col" onClick={()=>{
                                            setOrderPlate.toggle()
                                            orderNbSite(ordPlateForme)
                                        }}>Nb de site <i className="fa fa-sort"/></th>
                                        <th className="clickable" scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                        <th scope="row">
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </th>
                                        <th scope="row">
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </th>
                                        <td><div className="skeleton p-3 mb-3 rounded"/></td>
                                        <td><div className="skeleton p-3 mb-3 rounded"/></td>
                                        <td>
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                        <td>
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                        <td>
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                        <td className="text-right">
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                        <td className="text-right">
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                    </tr>
                                ):currentData.map((ProjectView)=>(
                                    <tr key={ProjectView.idProjet}>
                                        <th scope="row">
                                             <span className="mb-0 text-sm">
                                                {ProjectView.nomProjet}
                                             </span>
                                        </th>
                                        <td className="text-center">{ProjectView.plateforme}</td>
                                        <td>
                                            {!ProjectView.jira.reference ? (<div><pre  data-toggle="tooltip" title="projet n'a pas de lien jira!" className="m-0 p-0 text-lg">--</pre></div>):(
                                                <a href={ProjectView.jira.url} target="_blank" rel="noopener noreferrer">{ProjectView.jira.reference}</a>
                                            )}
                                        </td>
                                        <td>{ProjectView.nomType}</td>
                                        <td>
                                            <pre className="m-0 p-0 fs-14">{ProjectView.dateCreation}</pre>
                                        </td>
                                        <td>
                                            <pre className="m-0 p-0 fs-14">{ProjectView.deadlines}</pre>
                                        </td>
                                        <td>
                                            <span className={getClassEtat(ProjectView.nomEtat)}>
                                                {ProjectView.nomEtat}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <pre className="m-0 p-0 fs-14">
                                                {ProjectView.nombreSite}
                                            </pre>
                                        </td>
                                        <td className="text-right">
                                            <button type={"button"} onClick={()=>{Next(type+"/projets/view/"+ProjectView.idProjet,null,navigate)}} className="btn-icon-only btn text-darker" >
                                                <i className="fas fa-eye" />
                                            </button>
                                        </td>
                                    </tr>
                                )) }
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <PaginateObject currentPage={currentPage} list={filteritem} perPage={perPage} onPageChange={onPageChange}/>
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
