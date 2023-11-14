import { useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
    CardFooter,
    Progress,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Form, FormGroup, Input, FormFeedback
} from "reactstrap";
import HeaderProject from "../../components/Headers/HeaderProject";
import {Next} from "../../Config.ts";
import StadeTicket from "../../Model/StadeTicket.tsx";
import Etat from "../../Model/Etat.tsx";
import Stade from "../../Model/Stade.tsx";
import EtatStade from "../../Model/EtatStade.tsx";
import {useBoolean} from "@chakra-ui/react";
import PaginateObject from "../../components/Sidebar/PaginateObject";
import unidecode from "unidecode";
import BarChart from "../../variables/BarChart";
import InfoProjet from "../../Model/InfoProjet.tsx";
import TypeProjet from "../../Model/TypeProjet.tsx";
import Plateforme from "../../Model/Plateforme.tsx";
import Projet from "../../Model/Projet.tsx";
import ModalLg from "../../variables/Modal";

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
    const [erreur,setErreur]=useState(false)
    const [update,setUpdate]=useBoolean()
    const [allStadeEtat,setAllStadeEtat]=useState([])

    const [projet,setProjet]=useState(null)
    useEffect(()=>{
        setLoad(true)
        InfoProjet.getProjet(utilisateur.token,id).then((response)=>{
            if (response===null){
                navigate("../")
                return
            }
            setProjet(response)
            const dateDebut = new Date(response.creation)
            const dateFin = new Date(response.deadLine)
            const totalM = dateFin - dateDebut;
            const difH = Math.floor(totalM / (1000 * 60 * 60 *24))
            const now=new Date()
            const difNow=dateFin-now
            const restant=Math.floor(difNow / (1000 * 60 * 60 *24))
            setData([difH-restant,restant])
        })
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
            setStadeTicket(response)
            setAllStadeEtat(response)
        }).finally(()=>{
            setLoading(false)
        })

    },[id,update,author])
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
    function getPourcentage(etats){
        let i=0;
        etats.map(({etat})=>{
            if (etat.id===4){
                i+=1;
            }
        })
        return i;
    }
    function updateEtat(idTicket,idStade,idEtat) {
        EtatStade.updateEtatTicket(utilisateur.token,idTicket,idStade,idEtat).then((resp)=>{
            if (!resp){
                setErreur(true)
            }
        }).finally(()=>{
            setUpdate.toggle()
        })
    }
    const [order,setOrder]=useBoolean()
    function orderEtatStade(idStade){
        const updatedFilterItem = [...getStadeTicket];
        updatedFilterItem.sort((a, b) =>{
            const etatA=order ? a.etatStade.find(e=>e.stade.id===idStade) : b.etatStade.find(e=>e.stade.id===idStade)
            const etatB=order ? b.etatStade.find(e=>e.stade.id===idStade) : a.etatStade.find(e=>e.stade.id===idStade)
            if (etatA && etatB) {
                const etatNomA = etatA.etat.nom.toUpperCase();
                const etatNomB = etatB.etat.nom.toUpperCase();

                if (etatNomA < etatNomB) {
                    return -1;
                }
                if (etatNomA > etatNomB) {
                    return 1;
                }
                return 0;
            } else if (etatA) {
                return -1;
            } else if (etatB) {
                return 1;
            }
            return 0;
        })
        setStadeTicket(updatedFilterItem);
    }

    function orderSite(){
        const updatedFilterItem = [...getStadeTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.site.nomSite.localeCompare(a.site.nomSite))
        }else{
            updatedFilterItem.sort((a, b) =>a.site.nomSite.localeCompare(b.site.nomSite))
        }
        setStadeTicket(updatedFilterItem);
    }

    function orderDev() {
        const updatedFilterItem = [...getStadeTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>b.utilisateur.nom.localeCompare(a.utilisateur.nom))
        }else{
            updatedFilterItem.sort((a, b) =>a.utilisateur.nom.localeCompare(b.utilisateur.nom))
        }
        setStadeTicket(updatedFilterItem);
    }
    function orderType() {
        const updatedFilterItem = [...getStadeTicket];
        if (order){
            updatedFilterItem.sort((a, b) =>a.typeProjet.id - b.typeProjet.id)
        }else{
            updatedFilterItem.sort((a, b) =>b.typeProjet.id - a.typeProjet.id)
        }
        setStadeTicket(updatedFilterItem);
    }
    function search(input) {
        const normalizedInput = unidecode(input).toLowerCase();

        const byRef = allStadeEtat.filter((projet) => {
            if (projet?.ticket?.reference) {
                const normalizedReference = unidecode(projet.ticket.reference).toLowerCase();
                return normalizedReference.includes(normalizedInput);
            }
        });

        const byNom = allStadeEtat.filter((projet) => {
            if (projet?.site?.nomSite) {
                const normalizedNom = unidecode(projet.site.nomSite).toLowerCase();
                return normalizedNom.includes(normalizedInput);
            }
        });

        const byType = allStadeEtat.filter((projet) => {
            if (projet?.typeProjet?.type) {
                const normalizedType = unidecode(projet.typeProjet.type).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });
        const byDev = allStadeEtat.filter((projet) => {
            if (projet?.utilisateur?.nom) {
                const normalizedType = unidecode(projet.utilisateur.nom).toLowerCase();
                return normalizedType.includes(normalizedInput);
            }
        });
        const searchResults = [...new Set([...byRef, ...byNom, ...byType,...byDev])];
        setStadeTicket(searchResults);
    }

    const [currentPage,setCurrentPage]=useState(1)
    function onPageChange(number) {
        setCurrentPage(number)
    }
    const perPage=10;
    const startIndex=(currentPage-1)*perPage
    const endIndex=startIndex+perPage
    const currentData=getStadeTicket.slice(startIndex,endIndex)

    const [data,setData]=useState([0,0])
    const label=["temps cumulé en jour(s)","Temps restant en jour(s)"]


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
    const [loadFinal,setLoadFinal]=useState(false)

    const [validTitle,setValidTite]=useState(true)
    const [validRef,setValidRef]=useState(true)
    const [validUrl,setValidurl]=useState(true)
    const [validDate,setValidDate]=useState(true)

    function getAllList() {
        setModalShow(true)
        TypeProjet.getListTypeProjet(utilisateur.token).then((response)=>{
            setListTypeProjet(response)
        })
        Plateforme.getListPlateforme(utilisateur.token).then((response)=>{
            setListPlateforme(response)
        })
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
        const plate = selectedPlateforme === null ? listPlateforme[0] : selectedTypeProjet;
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
        Projet.insertProjet(utilisateur.token,pro).then((response)=>{
            if (!response){
                setErreur(true)
            }else{
                setUpdate.toggle()
                onCancel()
            }
        }).finally(()=>{setLoadFinal(false)})
    }
    function onCancel() {
        setModalShow(false)
        setTitre("")
        setConsigne("")
        setReference("")
        setUrl("")
        setLimite(new Date())
    }

    return(
        <>
            <HeaderProject name={projet ? projet.nomProjet : ""}/>
            <Row className="mt--8 m-0 p-0">
                <Col className="order-xl-1 mb-4" xl="12">
                    <Card className="bg-secondary m-0 p-0 border-0">
                        <CardHeader className="bg-white border-0 p-2">
                            <Row className="text-center">
                                <Col className="col-5 text-start" xl="5" xs={"8"}>
                                    <div className="input-group-merge input-group">
                                        <input placeholder="search" type="search" onChange={(event)=>search(event.target.value)} className="form-control"/>
                                    </div>
                                </Col>
                                {author==="admin" && (
                                    <Col className="text-right justify-content-end" xl={"7"} xs="4">
                                        <button type="button" className="btn btn-primary"
                                                onClick={()=>getAllList()}>Nouveau Site </button>{''}
                                        <Button color="default" onClick={(e) => e.preventDefault()}>
                                            Modifier
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush" style={{minHeight:'185px'}} responsive>
                            <thead className="thead-light clickable">
                                <tr className="font">
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        orderSite()
                                    }}>site <i className="fa fa-sort"/></th>
                                    <th scope="col">Ticket</th>
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        orderDev()
                                    }}>Dev <i className="fa fa-sort"/></th>
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        orderType()
                                    }}>Type <i className="fa fa-sort"/></th>
                                    {!loadStade && stades.map((stade)=>(
                                        <th key={stade.id} onClick={()=>{
                                            setOrder.toggle()
                                            orderEtatStade(stade.id)
                                        }} scope="col">{stade.nom} <i className="fa fa-sort"/></th>
                                    ))}

                                    <th scope="col">Progression</th>
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
                                        <td className="text-right m-0 p-1"/>
                                    </tr>
                                ): currentData.map((element)=>(
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
                                                        {etats.filter(et=>et.id!==etat.id).map((etatModifier)=>(
                                                            <DropdownItem key={etatModifier.id} onClick={(e) =>{
                                                                e.preventDefault()
                                                                updateEtat(element.idTiket,stade.id,etatModifier.id)
                                                            }}>
                                                                {etatModifier.nom}
                                                            </DropdownItem>
                                                        ))}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                        ))}
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">{Math.ceil((getPourcentage(element.etatStade)*100/stades.length))}%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value={Math.ceil(((getPourcentage(element.etatStade)*100/stades.length)))}
                                                        barClassName={`${Math.ceil((getPourcentage(element.etatStade)*100/stades.length))>=50 ? "bg-success" : "bg-danger"}`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right m-0 p-1">
                                            <button type={"button"} onClick={()=>{Next(`${author}/projets/view/site/${element.site.idSite}/${projet ? projet.nomProjet : ""}/${id}`,null,navigate)}} className="btn-icon-only btn text-darker" >
                                                <i className="fas fa-eye" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <CardFooter className="py-3">
                            <nav aria-label="...">
                                <PaginateObject currentPage={currentPage} list={getStadeTicket} perPage={perPage} onPageChange={onPageChange}/>
                            </nav>
                        </CardFooter>
                    </Card>
                </Col>
                <Col className="order-xl-2 mb-6 mb-xl-0" xl="12">
                    <Row className="d-flex align-items-stretch">
                        <Col xl="7" xs="12" className="mb-4">
                            <Card className="card-profile shadow h-100 rounded">
                                <CardHeader className="text-center border-0 pb-2">
                                    <h3 className="mb-0">Consigne du projet</h3>
                                </CardHeader>
                                <hr className="my-2" />
                                <CardBody className="m-0 p-0">
                                    <Row>
                                        <div className="col">
                                            {projet ? (
                                                <div className="card-profile-stats d-flex justify-content-start px-3">
                                                    <pre className="m-0 p-0 container-message" dangerouslySetInnerHTML={{__html: projet.consigne}}/>
                                                </div>
                                            ): (
                                                <div className="card-profile-stats d-flex justify-content-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="mb-4" xl="5" xs="12">
                            <Card className="card-profile shadow h-100 rounded">
                                <CardHeader className="text-center border-0 pb-2">
                                    <h3 className="mb-0">Rapport sur le temps du projet</h3>
                                </CardHeader>
                                <hr className="my-2" />
                                <CardBody className="m-0 p-0 py-3">
                                    {projet && projet.idEtat!==4 ?(
                                        <BarChart type={'doughnut'} data={data} label={label} />
                                    ): (
                                        <Row>
                                            <div className="col">
                                                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                    <div>
                                                        <span className="heading">Projet déjà fini!</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    )}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ModalLg show={modalShow} onSubmit={onSubmit} loading={loadFinal} onCancel={onCancel} title={"Nouveau projet"} hide={()=>setModalShow(false)}>
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
        </>
    )
}
export default ViewProject