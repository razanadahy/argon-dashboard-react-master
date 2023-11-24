//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

import {Card, CardHeader, Container, Row, Table, CardFooter, Media, Button, Modal, FormGroup, Input,} from "reactstrap";
import {useEffect, useState} from "react";
import NoHeader from "../../components/Headers/NoHeader";
import {useNavigate} from "react-router-dom";

import PaginateObject from "../../components/Sidebar/PaginateObject";
import unidecode from "unidecode";
import {useBoolean} from "@chakra-ui/react";
import InfoUtilisateur from "../../Model/InfoUtilisateur.tsx";

const ValidationUser = ({author}) => {
    const navigate=useNavigate()
    const [listAllDev,setDev]=useState([])
    const [tempAll,setTemp]=useState([])
    const [loading,setLoading]=useState(false)
    const user=JSON.parse(localStorage.getItem("user"))
    const [enter,setEnter]=useState(false)
    useEffect(()=>{
        if (user){
            if (user.type===1 && author!=="admin"){
                navigate("/")
                return;
            }else if(user.type===2 && author!=="auth"){
                navigate("/")
                return;
            }else if(author!=="admin"){
                navigate("/")
                return;
            }
            setLoading(true)
            InfoUtilisateur.getAllUserNoValidate(user.token).then((response)=>{
                setTemp(response)
                setDev(response)
            }).finally(()=>{
                setLoading(false)
            })
        }
    },[enter])
    function deleteUser(idUser) {
        InfoUtilisateur.deleteUser(user.token,idUser).then((res)=>{
            if (res){
                setEnter(!enter)
            }
        })
    }
    function getFirstLetter(userName) {
        userName = userName.toLowerCase();
        return userName.substring(0, 1);
    }
    const [order,setOrder]=useBoolean()

    function userName(){
        const updatedFilterItem = [...tempAll];
        if (order){
            updatedFilterItem.sort((a, b) => b.nom.localeCompare(a.nom))
        }else{
            updatedFilterItem.sort((a, b) => a.nom.localeCompare(b.nom))
        }
        setTemp(updatedFilterItem);
    }

    function search(input) {
        const normalizedInput = unidecode(input).toLowerCase();

        const byNom = listAllDev.filter((projet) => {
            if (projet?.nom) {
                const normalizedNom = unidecode(projet.nom).toLowerCase();
                return normalizedNom.includes(normalizedInput);
            }
        });
        setTemp(byNom);
    }
    const [currentPage,setCurrentPage]=useState(1)
    function onPageChange(number) {
        setCurrentPage(number)
    }
    const perPage=5;
    const startIndex=(currentPage-1)*perPage
    const endIndex=startIndex+perPage
    const currentData=tempAll.slice(startIndex,endIndex)
    const [show,setShow]=useState(false)
    const [selected,setSelected]=useState(-100)
    const [role,setRole]=useState(1)
    function hide() {
        setSelected(-100)
        setShow(false)
    }
    function showModal(id) {
        setSelected(id)
        setShow(true)
    }
    function validate() {
        InfoUtilisateur.modifie(user.token,selected,role).then((res)=>{
            if (res){
                setEnter(!enter)
            }
        }).finally(()=>{
            hide()
            setRole(1)
        })

    }
    return (
        <>
            <NoHeader/>
            <Container className="mt--8" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 row m-0">
                                <div className="col-8 text-start">
                                    <h3 className="mb-0">Liste des Utilisateur non validés</h3>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <div className="input-group-merge input-group">
                                        <input placeholder="Recherche" type="search" onChange={(event)=>search(event.target.value)} className="form-control"/>
                                    </div>
                                </div>
                            </CardHeader>
                            <Table className={`align-items-center table-flush ${loading && "tableLoading"}`} responsive>
                                <thead className="thead-light">
                                <tr className="font clickable">
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        userName()
                                    }}>Nom  <i className="fa fa-sort"/></th>
                                    <th scope="col">Email</th>
                                    <th scope="col" />
                                </tr>
                                </thead>
                                <tbody>
                                {loading ? (
                                    <tr>
                                        <th scope="row">
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </th>
                                        <td><div className="skeleton p-3 mb-3 rounded"/></td>
                                        <td>
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                    </tr>
                                ): currentData.map(({nom,email,id})=>(
                                    <tr key={id}>
                                        <th scope="row">
                                            <Media className="align-items-center">
                                                <a className="avatar  btn rounded-circle mr-3" onClick={(e) => e.preventDefault()}>
                                                    <i className={`fa fa-${getFirstLetter(nom)}`}/>
                                                </a>
                                                <Media>
                                                    <span className="mb-0 text-sm text-capitalize">
                                                        {nom}
                                                    </span>
                                                </Media>
                                            </Media>
                                        </th>
                                        <td>
                                            <div className="text-lowercase text-muted text-sm">
                                                {email}
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            <Button className="mr-4" color="info" onClick={(e) => {
                                                e.preventDefault()
                                                showModal(id)
                                            }} size="sm">
                                                <i className="fa-solid fa-check p-1"/>{' '}Valider
                                            </Button>
                                            <Button className="float-right" color="danger" onClick={(e) => {
                                                e.preventDefault()
                                                deleteUser(id)
                                            }} size="sm">
                                                <i className="fa-solid fa-trash p-1"/>{' '}Supprimer
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <PaginateObject currentPage={currentPage} list={tempAll} perPage={perPage} onPageChange={onPageChange}/>
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
            <Modal className="modal-dialog-centered"
                   contentClassName="bg-gradient-info" isOpen={show} toggle={hide} fullscreen="md" centered={true} size="sm" backdrop={true} fade>

                <div className="modal-header border-bottom py-3">
                    <h5 className="modal-title" id="modal-title-notification">
                        Ajouter le rôle
                    </h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={()=>hide()}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body py-2">
                    <div className="">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-reference"
                            >
                                Rôle
                            </label>
                            <Input
                                className="bg-white form-control"
                                value={role}
                                type="select"
                                id="input-reference"
                                onChange={(event)=>setRole(parseInt(event.target.value))}
                            >
                                <option  value={2}>
                                    Développeur
                                </option>
                                <option  value={1}>
                                    Lead
                                </option>
                            </Input>

                        </FormGroup>
                    </div>
                </div>
                <div className="modal-footer py-2">
                    <Button className="btn-white" color="info" type="button"
                            onClick={()=>validate()}
                    >
                       Valider
                    </Button>
                    <Button
                        className="text-white ml-auto"
                        color="danger"
                        data-dismiss="modal"
                        type="button"
                        onClick={()=>hide()}
                    >
                        Annuller
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ValidationUser;
