import {
    Card,
    CardHeader,
    Container,
    Row,
    Table,
    CardFooter,
    FormGroup,
    Input,
    Col,
    Form, FormFeedback, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";

import {useEffect, useState} from "react";
import Header from "../../components/Headers/Header";
import ProjectView from "../../Model/ProjectView.tsx";
import unidecode from 'unidecode';
import PaginateObject from "../../components/Sidebar/PaginateObject";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {GetObjectFromURL, Next} from "../../Config.ts";
import {useBoolean} from "@chakra-ui/react";
import ModalLg from "../../variables/Modal";
import TypeProjet from "../../Model/TypeProjet.tsx";
import Plateforme from "../../Model/Plateforme.tsx";
import Projet from "../../Model/Projet.tsx";
import Etat from "../../Model/Etat.tsx";
import Confiramation from "../../variables/Confiramation";
import InfoProjet from "../../Model/InfoProjet.tsx";

const Projets = ({type}) => {
    const location=useLocation()
    // const encours = GetObjectFromURL();
    const prios = GetObjectFromURL();
    const [listProjet,setListProjet]=useState([])
    const[filteritem,setFilterItem]=useState([])
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem("user"))
    const [insert,setInsert]=useState(true)
    const [modifHeader,setModifHeader]=useState(new Date())
    useEffect(()=>{
        if (user.type===1 && type!=='admin'){
            navigate("/")
            return
        }else if(user.type===2 && type!=='auth'){
            navigate("/")
            return
        }
        setLoading(true)
        ProjectView.all(user.token).then((response)=>{

            if (prios){
                if (prios.prios){
                    const list=response.filter((element)=>{
                        if (unidecode(element.nomEtat.toLowerCase())!=='termine'){
                            const deadlineTimestamp = new Date(element.deadlines).getTime();
                            const nowTimestamp = new Date().getTime();
                            const timeDifference = deadlineTimestamp - nowTimestamp;
                            const timeDifferenceInDays = timeDifference / (1000 * 60 * 60 * 24);
                            return timeDifferenceInDays < 2;
                        }
                        return false
                    })
                    setListProjet(list)
                    setFilterItem(list)
                } else {
                    const list=response.filter((element)=>{
                        const t=unidecode(element.nomEtat.toLowerCase())
                        return t!=='termine'
                    })
                    setListProjet(list)
                    setFilterItem(list)
                }

            }
            else{
                setListProjet(response)
                setFilterItem(response)
            }
        }).finally(()=>{
            setModifHeader(new Date())
            setLoading(false)
        })
    },[insert,location])
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

    const [listTypeProjet,setListTypeProjet]=useState([])
    const [listPlateforme,setListPlateforme]=useState([])
    const [modalShow, setModalShow]=useState(false)

    const [titre,setTitre]=useState("")
    const [selectedPlateforme,setSelectedPlateforme]=useState(null)
    const [selectedTypeProjet,setSelectedTypeProjet]=useState(null)
    const [url,setUrl]=useState('')
    const [reference,setReference]=useState('')
    const [creation,setCreation]=useState(new Date())
    const [limite,setLimite]=useState(new Date())
    const [consigne,setConsigne]=useState('')
    const [erreur,setErreur]=useState(false)
    const [loadFinal,setLoadFinal]=useState(false)

    const [validTitle,setValidTite]=useState(true)
    const [validRef,setValidRef]=useState(true)
    const [validUrl,setValidurl]=useState(true)
    const [validDate,setValidDate]=useState(true)

    function getAllList() {
        setModalShow(true)
        if (listTypeProjet.length===0){
            TypeProjet.getListTypeProjet(user.token).then((response)=>{
                setListTypeProjet(response)
            })
        }
        if (listPlateforme.length===0){
            Plateforme.getListPlateforme(user.token).then((response)=>{
                setListPlateforme(response)
            })
        }
    }
    function formatDate(date) {
        let mois = (date.getMonth() + 1).toString().padStart(2, '0');
        let jour = date.getDate().toString().padStart(2, '0');
        let annee = date.getFullYear();
        let dateFormatee = `${annee}-${mois}-${jour}`;
        return dateFormatee;
    }
    function estVide(chaine) {
        return chaine.trim().length === 0;
    }
    function onSubmit(event) {
        event.preventDefault()
        if (estVide(titre)){
            setValidTite(false)
            return
        }
        if (estVide(url)){
            setValidurl(false)
            return
        }
        if (estVide(reference)){
            setValidRef(false)
            return
        }
        if (creation>limite){
            setValidDate(false)
            return;
        }
        setLoadFinal(true)
        function convertToHTML(consigne) {
            const lignes = consigne.split('\n');
            const lignesHTML = lignes.map(ligne => `<p> - ${ligne}</p>`);
            const consigneHTML = lignesHTML.join('');
            return consigneHTML;
        }
        const titreTrimmed = titre.trim();
        const typeProjetH = selectedTypeProjet === null ? listTypeProjet[0] : selectedTypeProjet;
        const plate = selectedPlateforme === null ? listPlateforme[0] : selectedPlateforme;
        const pro = new Projet(
            titreTrimmed,
            convertToHTML(consigne.trim()),
            reference,
            url,
            typeProjetH,
            creation,
            limite,
            plate
        );
        if (idProjectSelected<0){
            Projet.insertProjet(user.token,pro).then((response)=>{
                if (!response){
                    setErreur(true)
                    setLoadFinal(false)
                }else{
                    setInsert(!insert)
                    onCancel()
                }
            }).finally(()=>{setLoadFinal(false)})
        }else{
            Projet.update(user.token,pro,idProjectSelected).then((response)=>{
                if (!response){
                    setErreur(true)
                    setLoadFinal(false)
                }else{
                    setInsert(!insert)
                    onCancel()
                }
            }).finally(()=>{setLoadFinal(false)})
        }
    }
    function onCancel() {
        setModalShow(false)
        setTitre("")
        setConsigne("")
        setReference("")
        setUrl("")
        setLimite(new Date())
        setCreation(new Date())
        setIdProjectSelected(-100)
    }
    const [etats,setEtats]=useState([
        new Etat(1,'A faire',0),
        new Etat(2,'En cours',10),
        new Etat(3,'Suspendu',100),
        new Etat(4,'Terminé',1000),
    ])
    function modif(idProjet,idEtat) {
        ProjectView.modif(user.token,idProjet,idEtat).then((resp)=>{
            if (resp){
                setInsert(!insert)
            }
        }).finally(()=>{

        })
    }
    const [idProjectSelected,setIdProjectSelected]=useState(-100)

    function deleteProject(idProjet) {
        setIdProjectSelected(idProjet)
        setShowNotifDelete(true)
    }
    function destroyNotif(){
        setIdProjectSelected(-100)
        setShowNotifDelete(false)
    }
    const [showNotifDelete,setShowNotifDelete]=useState(false)
    function upEtat(number){
        if (number===1){
            InfoProjet.deleteProjet(user.token,idProjectSelected).then((res)=>{
                if (!res){
                    setErreur(true)
                }
            }).finally(()=>{
                setInsert(!insert)
            })
        }
        setIdProjectSelected(-100)
    }
    function updateProjet(projectView){
        setIdProjectSelected(projectView.idProjet)
        setTitre(projectView.nomProjet)
        setCreation(new Date(projectView.dateCreation))
        setLimite(new Date(projectView.deadlines))
        setUrl(projectView.jira.url)
        setReference(projectView.jira.reference)
        setConsigne("")
        if (listTypeProjet.length===0){
            TypeProjet.getListTypeProjet(user.token).then((response)=>{
                const typ=response.find((element)=>element.type===projectView.nomType)
                setSelectedTypeProjet(typ)
                setListTypeProjet(response)
            })
        }else{
            const typ=listTypeProjet.find((element)=>element.type===projectView.nomType)
            setSelectedTypeProjet(typ)
        }
        if (listPlateforme.length===0){
            Plateforme.getListPlateforme(user.token).then((response)=>{
                const plat=response.find((element)=>element.nomPlateforme===projectView.plateforme)
                setSelectedPlateforme(plat)
                setListPlateforme(response)
            })
        }else{
            const plat=listPlateforme.find((element)=>element.nomPlateforme===projectView.plateforme)
            setSelectedPlateforme(plat)
        }
        setModalShow(true)
    }
    return (
        <>
            <Header modifHeader={modifHeader}/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 row m-0">
                                <div className="col-5 text-start">
                                    <h3 className="mb-0">Liste de tous les Projets</h3>
                                </div>

                                <div className="col-7 row d-flex justify-content-end p-0 m-0">
                                    <div className={`col-8 ${user.type===2 && "offset-4"}`}>
                                        <div className="input-group-merge input-group">
                                            <input placeholder="search" type="search" onChange={(event)=>search(event.target.value)} className="form-control"/>
                                        </div>
                                    </div>
                                    {user.type===1 && (
                                        <div className="col-4 d-flex justify-content-end">
                                            <button type="button" className="btn btn-primary col-12" onClick={()=>getAllList()}>Nouveau projet </button>
                                        </div>
                                    )}
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
                                        {user.type===1 && (
                                            <th className="clickable" scope="col" />
                                        )}
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
                                             <a href="#" onClick={(ev)=>{
                                                 ev.preventDefault()
                                                 Next(type+"/projets/view/"+ProjectView.idProjet,null,navigate)
                                             }} className="mb-0 text-sm">
                                                {ProjectView.nomProjet}
                                             </a>
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
                                            {user.type===1 ? (
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className={`clickable ${getClassEtat(ProjectView.nomEtat)}`}
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                        tag ="span"
                                                    >
                                                        {ProjectView.nomEtat}
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        {etats.filter(et=>et.nom.toLowerCase()!==ProjectView.nomEtat.toLowerCase()).map((etatModifier)=>(
                                                            <DropdownItem key={etatModifier.id} onClick={(e) =>{
                                                                e.preventDefault()
                                                                modif(ProjectView.idProjet,etatModifier.id)
                                                            }}>
                                                                {etatModifier.nom}
                                                            </DropdownItem>
                                                        ))}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            ): (
                                                <span className={getClassEtat(ProjectView.nomEtat)}>
                                                     {ProjectView.nomEtat}
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <pre className="m-0 p-0 fs-14">
                                                {ProjectView.nombreSite}
                                            </pre>
                                        </td>
                                        {user.type===1 && (
                                            <td className="text-right">
                                                <button type={"button"} onClick={()=>{
                                                    updateProjet(ProjectView)
                                                }} className="btn-icon-only btn text-darker" >
                                                    <i className="fas fa-edit text-gray" />
                                                </button>{''}
                                                <button type={"button"} onClick={()=>{deleteProject(ProjectView.idProjet)}} className="btn-icon-only btn text-darker" >
                                                    <i className="fa-solid fa-trash text-danger"/>
                                                </button>{''}
                                            </td>
                                        )}
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
            {user.type===1 && (
                <>
                    <ModalLg show={modalShow} onSubmit={onSubmit} loading={loadFinal} onCancel={onCancel} title={idProjectSelected>0 ? "Modification de projet" : "Nouveau projet"} hide={()=> {
                        setModalShow(false)
                        onCancel()
                    }}>
                        <Form className="font" autoComplete="off">
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="12">
                                        <FormGroup>
                                            <label className="form-control-label" htmlFor="input-title">
                                                Titre
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-title"
                                                placeholder="titre du projet"
                                                type="text"
                                                onChange={(event)=>setTitre(event.target.value)}
                                                value={titre}
                                                invalid={!validTitle}
                                            />
                                            <FormFeedback valid={false}>
                                                Invalide titre
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label" htmlFor="input-plateforme">
                                                Plateforme
                                            </label>
                                            {listPlateforme.length===0 ? (
                                                <div className="skeleton p-3 rounded"/>
                                            ): (
                                                <Input className="form-control-alternative" onChange={(event)=>{
                                                    setSelectedPlateforme(listPlateforme.find(element=>element.id===(parseInt(event.target.value, 10))))
                                                }} value={selectedPlateforme ? selectedPlateforme?.id : 1} id="input-plateforme" type="select">
                                                    {listPlateforme.map(({id,nomPlateforme},index)=>(
                                                        <option key={index} value={id}>
                                                            {nomPlateforme}
                                                        </option>
                                                    ))}
                                                </Input>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label" htmlFor="input-type">
                                                Type de projet
                                            </label>
                                            {listTypeProjet.length!==0 ? (
                                                <Input className="form-control-alternative" id="input-type" onChange={(event)=>setSelectedTypeProjet(listTypeProjet.find(element=>element.id===(parseInt(event.target.value))))} value={selectedTypeProjet ? selectedTypeProjet?.id : 1} type="select">
                                                    {listTypeProjet.map(({id,type},index)=>(
                                                        <option key={index} value={id}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </Input>
                                            ): (
                                                <div className="skeleton p-3 rounded"/>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-reference"
                                            >
                                                Reference
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-reference"
                                                placeholder="Reference du lien Jira"
                                                type="text"
                                                value={reference}
                                                onChange={(event)=>setReference(event.target.value)}
                                                invalid={!validRef}
                                            />
                                            <FormFeedback valid={false}>
                                                Invalide Reference
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-url"
                                            >
                                                Url
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-url"
                                                placeholder="Url dans Jira"
                                                type="text"
                                                onChange={(event)=>setUrl(event.target.value)}
                                                value={url}
                                                invalid={!validUrl}
                                            />
                                            <FormFeedback valid={false}>
                                                Invalide Url
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-creation"
                                            >
                                                Date de création
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-creation"
                                                type="date"
                                                onChange={()=>setCreation(new Date())}
                                                value={formatDate(creation)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-limite"
                                            >
                                                Date limite
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-limite"
                                                type="date"
                                                onChange={(event)=>setLimite(new Date(event.target.value))}
                                                value={formatDate(limite)}
                                                invalid={!validDate}
                                            />
                                            <FormFeedback>
                                                Date de creation > date limite
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-consigne"
                                            >
                                                Consigne
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-consigne"
                                                placeholder="Consigne du projet"
                                                rows={4}
                                                type="textarea"
                                                value={consigne}
                                                onChange={(event)=>setConsigne(event.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </ModalLg>
                    <Confiramation show={showNotifDelete} hide={destroyNotif} etat={upEtat} text={"Voulez-vous vraiment le supprimer?"}/>
                </>
            )}
        </>
    );
};

export default Projets;
