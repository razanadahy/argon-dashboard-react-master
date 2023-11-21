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
    Form, FormGroup, Input, FormFeedback, Media, Alert
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
import ModalLg from "../../variables/Modal";
import Select from 'react-select';
import Difficulte from "../../Model/Difficulte.tsx";
import CreatableSelect from "react-select/creatable";
import InfoUtilisateur from "../../Model/InfoUtilisateur.tsx";
import TypeTraitement from "../../Model/TypeTraitement.tsx";
import InfoSite from "../../Model/InfoSite.tsx";
import Plugin from "../../Model/Plugin.tsx";
import Protection from "../../Model/Protection.tsx";

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

    const [modalShow, setModalShow]=useState(false)
    const [loadFinal,setLoadFinal]=useState(false)
    const [nomSite,setNomSite]=useState("")
    const [domaine,setDomaine]=useState('')
    const [plugin,setplugin]=useState('')
    const [ssh,setSsh]=useState('')
    const [reference,setReference]=useState('')
    const [url,setUrl]=useState('')
    const [protection,setProtection]=useState('')
    const [dif,setDif]=useState(null)
    const [remarque,setRemarque]=useState('')

    const [validNomSite,setValidNomSite]=useState(true)
    const [validDomaine,setValidDomaine]=useState(true)
    const [validDev,setValidDev]=useState(true)
    const [validPlug,setValidPlugin]=useState(true)
    const [validTraitement,setValidTraitement]=useState(true)
    const [validSsh,setValidSsh]=useState(true)
    const [validRef,setValidRef]=useState(true)
    const [validUrl,setValidUrl]=useState(true)
    const [validProtection,setValidProtection]=useState(true)


    function getAllList() {
        setModalShow(true)
        InfoUtilisateur.getAllUser(utilisateur.token).then((response)=>{
            setDevs(response)
            setOptionDev(response.map((element, index) => ({ value: index, label: element.nom, hiddenValue: element.email })));
        })
        TypeTraitement.getTraitement(utilisateur.token).then((response)=>{
            setTypeTraitement(response)
            setTypetraitementOption(response.map((element)=>({value: element.id,label: element.traitement})))
        })
    }

    function estVide(chaine) {
        return chaine.trim().length === 0;
    }
    function onSubmit(event) {
        event.preventDefault()
        if (estVide(nomSite)){
            setValidNomSite(false)
            return
        }
        if (estVide(plugin)){
            setValidPlugin(false)
            return
        }
        if (estVide(ssh)){
            setValidSsh(false)
            return;
        }
        if (estVide(reference)){
            setValidRef(false)
            return;
        }
        if (estVide(url)){
            setValidUrl(false)
            return;
        }
        // if (estVide(protection)){
        //     setValidProtection(false)
        //     return
        // }
        if (selectedOption===null){
            setValidDev(false)
            return
        }
        if (selectedOptions===null){
            setValidTraitement(false)
            return
        }
        setLoadFinal(true)
        const infoDev=devs[selectedOption.value]
        const typeT=typeTraitement.find(element=>parseInt(selectedOptions.value)===element.id)
        const difT=dif ? dif : difficult[0]
        const site=new InfoSite(
            infoDev,nomSite,new Plugin(plugin,ssh),domaine,typeT,reference,url,
            new Protection(protection,remarque,difT,"",1),id
        )

        InfoSite.insertSite(utilisateur.token,site).then((response)=>{
            if (!response){
                setErreur(true)
                setLoadFinal(false)
            }else{
                setUpdate.toggle()
                onCancel()
            }
        }).finally(()=>{setLoadFinal(false)})
    }
    function onCancel() {
        setModalShow(false)
        setNomSite('')
        setDomaine('')
        setSelectedOptions(null)
        setSelectedOption(null)
        setplugin("")
        setSsh('')
        setReference('')
        setUrl('')
        setProtection('')
        setDif(null)
        setRemarque('')
        setValidNomSite(true)
        setValidDomaine(true)
        setValidDev(true)
        setValidPlugin(true)
        setValidTraitement(true)
        setValidSsh(true)
        setValidRef(true)
        setValidUrl(true)
        setValidProtection(true)
    }

    const [devs,setDevs] = useState([])
    const [optionDev,setOptionDev]=useState([])
    function getFirstLetter(userName) {
        userName = userName.toLowerCase();
        return userName.substring(0, 1);
    }
    const CustomOption = ({ innerProps, label, isSelected, isFocused, data }) => (
        <Media {...innerProps} className={`align-items-center clickable rounded p-3 border-bottom ${isSelected ?
            "bg-translucent-info" : isFocused ? "bg-translucent-light" : "bg-white"}`}>
            <button className="avatar rounded-circle mr-3 btn bg-default" onClick={(event)=>{event.preventDefault()}}>
                <i className={`fa fa-${getFirstLetter(label)}`}/>
            </button>
            <Media>
                <span className="mb-0 text-sm text-capitalize">
                    {label}
                    <div className="text-sm text-muted text-lowercase">
                        {data.hiddenValue}
                    </div>
                </span>
            </Media>
        </Media>
    );

    const [selectedOption, setSelectedOption] = useState(null);
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            boxShadow: state.isFocused
                ? ' 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)'
                : '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)',
            borderRadius: '5px',
            padding: '4px',
        }),
        input: (provided) => ({
            ...provided,
            // height: '40px'
        }),
    };
    const [difficult,setDifficult]=useState([
        new Difficulte(1,'facile'),
        new Difficulte(2,'moyen'),
        new Difficulte(3,'difficile'),
        new Difficulte(4,'Tres difficille'),
    ])

    const [typeTraitement,setTypeTraitement]=useState([])
    const [typetraitementOption,setTypetraitementOption] = useState([])
    const [selectedOptions, setSelectedOptions] = useState(null);

    const handleCreateOption = (inputValue) => {
        const newOption = { value: typeTraitement.reduce((max, objet) => (objet.id > max ? objet.id : max), typeTraitement[0].id)+1, label: inputValue };
        setTypetraitementOption([...typetraitementOption,newOption])
        const bp={ id: typeTraitement.reduce((max, objet) => (objet.id > max ? objet.id : max), typeTraitement[0].id)+1, traitement: inputValue }
        setTypeTraitement([...typeTraitement,bp])
        setSelectedOptions( newOption);
    };

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };
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
                                            Modifier Site
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
                                    <h3 className="mb-0">Avancement</h3>
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
            {utilisateur.type===1 && (
                <ModalLg show={modalShow} onSubmit={onSubmit} loading={loadFinal} onCancel={onCancel} title={"Nouveau Site"} hide={()=>setModalShow(false)}>
                    <Form  autoComplete="off">
                        <h6 className="heading-small text-muted mb-4">
                            Site
                        </h6>
                        <div className="pl-lg-3">
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-nomSite"
                                        >
                                            Nom Site
                                        </label>
                                        <Input
                                            className="form-control-alternative bg-white"
                                            value={nomSite}
                                            type="text"
                                            id="input-nomSite"
                                            onChange={(event)=>setNomSite(event.target.value)}
                                            invalid={!validNomSite}
                                        />
                                        <FormFeedback tag="span" className="text-danger" valid={false}>
                                            champ obligatoire
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-domaine"
                                        >
                                            Domaine
                                        </label>
                                        <Input
                                            className="form-control-alternative bg-white"
                                            value={domaine}
                                            type="text"
                                            id="input-domaine"
                                            onChange={(event)=>setDomaine(event.target.value)}
                                            invalid={!validDomaine}
                                        />
                                        <FormFeedback valid={false}>
                                            champ obligatoire
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                            Responsable
                        </h6>
                        <div className="pl-lg-3">
                            <Row>
                                <Col lg="12">
                                    <FormGroup>
                                        <label className="form-control-label">
                                            Developpeur
                                        </label>
                                        {optionDev.length===0 ? (
                                            <div className="skeleton mb-3 p-4 rounded"/>
                                        ):(
                                            <Select
                                                value={selectedOption}
                                                onChange={handleSelectChange}
                                                options={optionDev}
                                                isSearchable={true}
                                                styles={customStyles}
                                                placeholder="Selectionner le responsable"
                                                className="text-capitalize"
                                                components={{ Option: ({ innerProps, label, isFocused, isSelected, data }) => <CustomOption innerProps={innerProps} label={label} isSelected={isSelected} isFocused={isFocused} data={data} /> }}
                                            />
                                        )}
                                        {!validDev && (
                                            <span className="text-danger">
                                            champ obligatoire
                                        </span>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                            Plugin
                        </h6>
                        <div className="pl-lg-4">
                            <Row>

                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-plugin"
                                        >
                                            Nom plugin
                                        </label>
                                        <Input
                                            className="form-control-alternative bg-white"
                                            value={plugin}
                                            type="text"
                                            id="input-plugin"
                                            onChange={(event)=>setplugin(event.target.value)}
                                            invalid={!validPlug}
                                        />
                                        <FormFeedback valid={false}>
                                            champ obligatoire
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-last-name"
                                        >
                                            Type de traitement
                                        </label>
                                        {typetraitementOption.length===0 ? (<div className="skeleton mb-3 p-4 rounded"/>):(
                                            <CreatableSelect
                                                onChange={handleChange}
                                                onCreateOption={handleCreateOption}
                                                options={typetraitementOption}
                                                value={selectedOptions}
                                                styles={customStyles}
                                                placeholder=" type de...."
                                            />
                                        )}
                                        {!validTraitement && (
                                            <span className="text-danger">
                                            champ obligatoire
                                        </span>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-ssh"
                                        >
                                            SSH Git
                                        </label>
                                        <Input
                                            className="form-control-alternative bg-white"
                                            value={ssh}
                                            type="text"
                                            id="input-ssh"
                                            onChange={(event)=>setSsh(event.target.value)}
                                            invalid={!validSsh}
                                        />
                                        <FormFeedback valid={false}>
                                            champ obligatoire
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                            Ticket
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-reference"
                                        >
                                            Reference
                                        </label>
                                        <Input
                                            className="form-control-alternative bg-white"
                                            value={reference}
                                            type="text"
                                            id="input-reference"
                                            onChange={(event)=>setReference(event.target.value)}
                                            invalid={!validRef}
                                        />
                                        <FormFeedback valid={false}>
                                            champ obligatoire
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
                                            className="form-control-alternative bg-white"
                                            value={url}
                                            type="text"
                                            id="input-url"
                                            onChange={(event)=>setUrl(event.target.value)}
                                            invalid={!validUrl}
                                        />
                                        <FormFeedback valid={false}>
                                            champ obligatoire
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">
                            Information sur la protection
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-protection"
                                        >
                                            Protection
                                        </label>
                                        <Input
                                            className="form-control-alternative bg-white"
                                            value={protection}
                                            type="text"
                                            id="input-protection"
                                            onChange={(event)=>setProtection(event.target.value)}
                                            invalid={!validProtection}
                                        />
                                        <FormFeedback valid={false}>
                                            champ obligatoire
                                        </FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-dif"
                                        >
                                            Difficulté
                                        </label>
                                        <Input
                                            className="form-control-alternative bg-white text-capitalize"
                                            id="input-dif"
                                            type="select" value={dif ? dif.id : 1} onChange={(event)=>{
                                            setDif(difficult.find(element=>element.id===parseInt(event.target.value)))
                                        }}>
                                            {difficult.map(({id,nom})=>(
                                                <option key={id} value={id}>{nom}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </div>
                        <hr className="my-4" />
                        <h6 className="heading-small text-muted mb-4">Remarque</h6>
                        <div className="pl-lg-4">
                            <FormGroup>
                                <Input
                                    className="form-control-alternative bg-white w-100"
                                    rows="4"
                                    value={remarque}
                                    onChange={(event)=>setRemarque(event.target.value)}
                                    type="textarea"
                                />
                            </FormGroup>
                        </div>
                    </Form>
                    <Alert color="danger" isOpen={erreur} toggle={()=>setErreur(false)} >
                        Des erreurs inattendues empêchent de faire la rêquete
                    </Alert>
                </ModalLg>
            )}
        </>
    )
}
export default ViewProject