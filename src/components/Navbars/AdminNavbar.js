import {Link, useNavigate} from "react-router-dom";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Container, Media,} from "reactstrap";
import 'font-awesome/css/font-awesome.min.css'
import {useEffect, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {UrlBase} from "../../Config.ts";
import SockJS from 'sockjs-client';
import Notification from "../../Model/Notification.tsx";
const AdminNavbar = (props) => {
    function getFirstLetter(userName) {
        userName = userName.toLowerCase();
        return userName.substring(0, 1);
    }
    const user=JSON.parse(localStorage.getItem("user"))
    function logOut(event) {
        event.preventDefault()
        props.navigate("/login")
    }
    const navigate=useNavigate()
    const [lenNotif,setLenNotif]=useState(0)
    const [socket,setSocket]=useState(null)
    const [notifs,setNotifs]=useState([])
    useEffect(()=>{
        if (!user){
            navigate("/")
            return
        }
        Notification.notifications(user.token).then((res)=>{
            setNotifs(res)
        })
        const stomp = Stomp.over(new SockJS(UrlBase('ws')));
        stomp.debug=()=>{}
        stomp.connect({}, () => {
            stomp.subscribe(`/client/notif/${user.token}`,(f)=>{
                const body = f.body;
                const not = JSON.parse(body);
                if (Array.isArray(not)) {
                     const messagesArray = not.map(data => {
                         return new Notification(
                             data.idObjectNotif ,
                             data.type ,
                             data.nom ,
                             data.url ,
                             data.dateNotif ,
                             data.idIDentifiant,
                             data.vue ,
                             data.titre
                         );
                     });
                    setNotifs(messagesArray);
                }
            })
        });

        setSocket(stomp);
        return () => {
            if (stomp.connected) {
                stomp.disconnect();
            }
        };
    },[])

    useEffect(()=>{
        let i=0;
        notifs.map((element)=>{
            if (!element.vue){
                i++;
            }
        })
        setLenNotif(i)
    },[notifs])
    function assertNotif() {
        Notification.assertVue(user.token).then((resp)=>{
            setLenNotif(0)
        })
    }
    function displayTetxte(type,url,reference) {
        if (type===1){
            return (
                <p className="text-sm mb-0 container-message">Le projet <a
                    className="font-weight-bold ml-1"
                    href={url}
                >
                    {reference}
                </a> a été creé </p>
            )
        }
        if (type===2){
            return (
                <p className="text-sm mb-0 container-message">Le deadline de  <a
                    className="font-weight-bold ml-1"
                    href={url}
                >
                    {reference}
                </a> va s'expirer </p>
            )
        }
        if (type===3){
            return (
                <p className="text-sm mb-0 container-message">Vous êtes assigné à un ticket <a
                    className="font-weight-bold ml-1"
                    href={url}
                >
                    {reference}
                </a> </p>
            )
        }
        if (type===4){
            return (
                <p className="text-sm mb-0"><a
                    className="font-weight-bold ml-1"
                    href={url}
                >
                    {reference}
                </a>  tente de s'inscrire</p>
            )
        }
        if (type===5){
            return (
                <p className="text-sm mb-0">Le ticket  <a
                    className="font-weight-bold ml-1"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {reference}
                </a> est terminé</p>
            )
        }
    }

    const[typeFilter,setTypeFilter]=useState(1)
    const [displayNotif,setDisplayNotif]=useState([])
    useEffect(()=>{
        if (typeFilter===1){
            const d=notifs.filter((element)=>element.type<=2)
            setDisplayNotif(d)
        }else{
            const d=notifs.filter((element)=>element.type===typeFilter)
            setDisplayNotif(d)
        }
    },[typeFilter,notifs])
    function getClassIcon(type) {
        if (type===1){
            return (
                <span className="avatar rounded-circle bg-translucent-info">
                    <i className="fa fa-c"/>
                </span>
            )
        }if(type===2){
            return (
                <span className="avatar rounded-circle bg-translucent-danger">
                    <i className="fa fa-d"/>
                </span>
            )
        }if (type===3){
            return (
                <span className="avatar rounded-circle bg-translucent-primary">
                    <i className="fa fa-a"/>
                </span>
            )
        }if(type===4){
            return (
                <span className="avatar rounded-circle bg-translucent-warning">
                    <i className="fa fa-n"/>
                </span>
            )
        }if(type===5){
            return (
                <span className="avatar rounded-circle bg-translucent-success">
                    <i className="fa fa-e"/>
                </span>
            )
        }
    }
    return (
          <>
              <Navbar className="navbar-top navbar-dark navbar" expand="md" id="navbar-main">
                  <Container fluid>
                      {props.brandText?.path ? (
                          <Link className="h4 mb-0 text-white text-uppercase dis-none d-none d-lg-inline-block"
                                to={`/${props?.utilisateur}${props?.brandText?.path}`}>
                              {props?.brandText?.name}
                          </Link>
                      ): (
                          <Link className="h3 mb-0 text-white text-capitalize dis-none d-none d-lg-inline-block" to={""}>
                              {props?.brandText?.name}
                          </Link>
                      )}
                      <Nav className="align-items-center d-none d-md-flex" navbar>
                          <UncontrolledDropdown nav>
                              <DropdownToggle className="pr-0" nav>
                                  <Media className="align-items-center pr-3" onClick={()=>assertNotif()}>
                                      <span className="avatar avatar-sm bg-white rounded-circle">
                                          <i className="fa-solid fa-bell text-default fs-16"/>
                                      </span>
                                      {lenNotif>0 && (
                                          <span className="badge bg-danger text-gray-dark rounded-pill position-absolute" style={{height: '20px',width: '30px' , transform: 'translate(20px,-10px)'}}>{lenNotif}</span>
                                      )}
                                  </Media>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem className="text-sm text-muted m-0" header tag="div" style={{width: '495px'}}>
                                      {user && (
                                          <div className="row">
                                              <div className={`${user.type===1 ? "col-3" :  "col-6"} d-flex justify-content-center row m-0 p-0`}>
                                                  <button type="button" onClick={()=>setTypeFilter(1)} className={`btn ${typeFilter===1 ? "btn-primary" : "btn-outline-primary"} btn-sm col-11 text-center`}>Projet</button>
                                              </div>
                                              <div className={`${user.type===1 ? "col-3" :  "col-6"} d-flex justify-content-center row m-0 p-0`}>
                                                  <button type="button"
                                                          onClick={()=>setTypeFilter(3)}
                                                          className={`btn ${typeFilter===3 ? "btn-primary" : "btn-outline-primary"} btn-sm col-11 text-center`}
                                                  >Ticket Assigné</button>
                                              </div>
                                              {user.type===1 && (
                                                  <>
                                                      <div className={`${user.type===1 ? "col-3" :  "col-4"} d-flex justify-content-center row m-0 p-0`}>
                                                          <button type="button" onClick={()=>setTypeFilter(5)}
                                                                  className={`btn ${typeFilter===5 ? "btn-primary" : "btn-outline-primary"} btn-sm col-11 text-center`}>Ticket terminé</button>
                                                      </div>

                                                      <div className="col-3 d-flex justify-content-center row m-0 p-0">
                                                          <button type="button" onClick={()=>setTypeFilter(4)}
                                                                  className={`btn ${typeFilter===4 ? "btn-primary" : "btn-outline-primary"} btn-sm col-11 text-center`}>Inscription</button>
                                                      </div>
                                                  </>
                                              )}
                                          </div>
                                      )}
                                  </DropdownItem>
                                  {displayNotif.map((element)=>(
                                      <DropdownItem key={element.idObjectNotif} tag="div" style={{width: '495px'}}>
                                          <div className="align-items-center d-flex row clickable">
                                              <div className="col-2">
                                                  {getClassIcon(element.type)}
                                              </div>
                                              <div className="col-10 ml--2">
                                                  <div className="d-flex justify-content-between align-items-center">
                                                      <div><h4 className="mb-0 text-sm text-capitalize">{element.titre}</h4></div>
                                                  </div>
                                                  {displayTetxte(element.type,element.url,element.nom)}
                                              </div>
                                          </div>
                                      </DropdownItem>
                                  ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <UncontrolledDropdown nav>
                              <DropdownToggle className="pr-0" nav>
                                  <Media className="align-items-center">
                                      <span className="avatar avatar-sm bg-translucent-info rounded-circle">
                                          <i className={`fa fa-${getFirstLetter(props.userName)}`}/>
                                      </span>
                                      <Media className="ml-2 d-none d-lg-block">
                                          <span className="mb-0 text-sm font-weight-bold text-capitalize">
                                            {props.userName}
                                          </span>
                                      </Media>
                                </Media>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem className="noti-title" header tag="div">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                  </DropdownItem>
                                  <DropdownItem to="/admin/user-profile" tag={Link}>
                                      <i className="ni ni-single-02" />
                                      <span>Mon profile</span>
                                  </DropdownItem>

                                  <DropdownItem divider />
                                  <DropdownItem href="#" onClick={(e) =>logOut(e)}>
                                      <i className="ni ni-user-run" />
                                      <span>Déconnection</span>
                                  </DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                      </Nav>
                  </Container>
              </Navbar>
          </>
    );
};

export default AdminNavbar;
