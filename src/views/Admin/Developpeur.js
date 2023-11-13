//https://docs.google.com/document/d/1v_d5NnLB_6SHEkrNZcW8iRDHM4pKt7fv/edit?pli=1#heading=h.1ci93xb

import {
    Card,
    CardHeader,
    Container,
    Row,
    Table,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Media, Badge, Progress,
} from "reactstrap";
import {useEffect, useState} from "react";
import NoHeader from "../../components/Headers/NoHeader";
import {useNavigate} from "react-router-dom";
import {Next} from "../../Config.ts";
import InfoDev from "../../Model/InfoDev.tsx";
import PaginateObject from "../../components/Sidebar/PaginateObject";
import unidecode from "unidecode";
import {useBoolean} from "@chakra-ui/react";

const Developpeur = ({author}) => {
    const navigate=useNavigate()
    const [listAllDev,setDev]=useState([])
    const [tempAll,setTemp]=useState([])
    const [loading,setLoading]=useState(false)
    const user=JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{
        if (user){
            if (user.type===1 && author!=="admin"){
                navigate("/")
                return;
            }else if(user.type===2 && author!=="auth"){
                navigate("/")
                return;
            }
            setLoading(true)
            InfoDev.getAllDev(user.token).then((response)=>{
                setTemp(response)
                setDev(response)
            }).finally(()=>{
                setLoading(false)
            })
        }else{
            navigate("/")
            return
        }
    },[])
    function getFirstLetter(userName) {
        userName = userName.toLowerCase();
        return userName.substring(0, 1);
    }
    const [order,setOrder]=useBoolean()

    function completion(){
        const updatedFilterItem = [...tempAll];
        if (order){
            updatedFilterItem.sort((a, b) => b.pourcentageTacheFini - a.pourcentageTacheFini)
        }else{
            updatedFilterItem.sort((a, b) => a.pourcentageTacheFini - b.pourcentageTacheFini)
        }
        setTemp(updatedFilterItem);
    }

    function status(){
        const updatedFilterItem = [...tempAll];
        if (order){
            updatedFilterItem.sort((a, b) => b.enConge - a.enConge)
        }else{
            updatedFilterItem.sort((a, b) => a.enConge - b.enConge)
        }
        setTemp(updatedFilterItem);
    }
    function userName(){
        const updatedFilterItem = [...tempAll];
        if (order){
            updatedFilterItem.sort((a, b) => b.infoUtilisateur.nom.localeCompare(a.infoUtilisateur.nom))
        }else{
            updatedFilterItem.sort((a, b) => a.infoUtilisateur.nom.localeCompare(b.infoUtilisateur.nom))
        }
        setTemp(updatedFilterItem);
    }

    function search(input) {
        const normalizedInput = unidecode(input).toLowerCase();

        const byNom = listAllDev.filter((projet) => {
            if (projet?.infoUtilisateur?.nom) {
                const normalizedNom = unidecode(projet.infoUtilisateur.nom).toLowerCase();
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
    return (
        <>
            <NoHeader/>
            <Container className="mt--8" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 row m-0">
                                <div className="col-8 text-start">
                                    <h3 className="mb-0">Liste de tous les développeurs</h3>
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
                                    }}>User name  <i className="fa fa-sort"/></th>
                                    <th scope="col">Email</th>
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        status()
                                    }}>Status  <i className="fa fa-sort"/></th>
                                    <th scope="col" onClick={()=>{
                                        setOrder.toggle()
                                        completion()
                                    }}>Completion  <i className="fa fa-sort"/></th>
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
                                        <td>
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                        <td className="text-right">
                                            <div className="skeleton p-3 mb-3 rounded"/>
                                        </td>
                                    </tr>
                                ): currentData.map(({infoUtilisateur,enConge,pourcentageTacheFini},index)=>(
                                    <tr key={index}>
                                        <th scope="row">
                                            <Media className="align-items-center">
                                                <a
                                                    className="avatar  btn rounded-circle mr-3"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className={`fa fa-${getFirstLetter(infoUtilisateur.nom)}`}/>
                                                </a>
                                                <Media>
                                              <span className="mb-0 text-sm text-capitalize">
                                                {infoUtilisateur.nom}
                                              </span>
                                                </Media>
                                            </Media>
                                        </th>
                                        <td>
                                            <div className="text-lowercase text-muted text-sm">
                                                {infoUtilisateur.email}
                                            </div>
                                        </td>
                                        <td>
                                            {enConge ? (
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-danger" />
                                                    En Congé
                                                </Badge>
                                            ): (
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-success" />
                                                    En activité
                                                </Badge>
                                            )}

                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">{pourcentageTacheFini}%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value={pourcentageTacheFini}
                                                        barClassName={pourcentageTacheFini <70 ? "bg-danger" : "bg-success"}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <button type={"button"} className="btn-icon-only btn text-darker" onClick={()=>{Next("admin/developpeurs/view",null,navigate)}}>
                                                <i className="fas fa-eye" />
                                            </button>
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
        </>
    );
};

export default Developpeur;
