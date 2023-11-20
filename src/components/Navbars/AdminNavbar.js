import {Link, useNavigate} from "react-router-dom";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Container, Media,} from "reactstrap";
import 'font-awesome/css/font-awesome.min.css'
import {useEffect, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {UrlBase} from "../../Config.ts";
import SockJS from 'sockjs-client';

const AdminNavbar = (props) => {
    function getFirstLetter(userName) {
        userName = userName.toLowerCase();
        return userName.substring(0, 1);
    }

    function logOut(event) {
        event.preventDefault()
        props.navigate("/login")
    }

    const [lenNotif,setLenNotif]=useState(0)
    const [socket,setSocket]=useState(null)
    const [view,setView]=useState(false)

    useEffect(()=>{
        //select de tous les notification
        const stomp = Stomp.over(new SockJS(UrlBase('ws')));
        stomp.debug=()=>{}
        stomp.connect({}, () => {
            stomp.subscribe(`/client/messages/1`,(f)=>{
                const body = f.body;
                console.log(body)
                const messagesData = JSON.parse(body);
                if (Array.isArray(messagesData)) {
                    // const messagesArray = messagesData.map(data => {
                    //     return new Message(
                    //         data.idMessage ,
                    //         data.typeMessage ,
                    //         data.dateMessage ,
                    //         data.sender ,
                    //         data.receiver ,
                    //         data.texte,
                    //         data.vue ,
                    //         data.tompony
                    //     );
                    // });
                    // setMessages(messagesArray);
                }
            })

            // stomp.subscribe(`/client/allMessage/${utilisateur.id}/${utilisateur.type}`,(mes)=>{
            //     const body = mes.body;
            //     const messagesData = JSON.parse(body);
            //     if (Array.isArray(messagesData)) {
            //         const messagesArray = messagesData.map(data => {
            //             return new Message(
            //                 data.idMessage ,
            //                 data.typeMessage ,
            //                 data.dateMessage ,
            //                 data.sender ,
            //                 data.receiver ,
            //                 data.texte,
            //                 data.vue ,
            //                 data.tompony
            //             );
            //         });
            //         setAllMessage(messagesArray);
            //     }
            // })
        });

        setSocket(stomp);
        return () => {
            if (stomp.connected) {
                stomp.disconnect();
            }
        };

    },[])

    const [typeAffichageNotif,setTypeAffichage]=useState(1)

    useEffect(()=>{

    },[typeAffichageNotif])
    
    return (
          <>
              <Navbar className="navbar-top navbar-dark navbar" expand="md" id="navbar-main">
                  <Container fluid>
                      <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to={`/admin${props.brandText.path}`}>{props.brandText.name}</Link>
                      <Nav className="align-items-center d-none d-md-flex" navbar>
                          <UncontrolledDropdown nav>
                              <DropdownToggle className="pr-0" nav>
                                  <Media className="align-items-center pr-3">
                                      <span className="avatar avatar-sm bg-white rounded-circle">
                                          <i className="fa-solid fa-bell text-default fs-16"/>
                                      </span>
                                      {lenNotif>0 && (
                                          <span className="badge bg-danger text-gray-dark rounded-pill position-absolute" style={{height: '20px',width: '30px' , transform: 'translate(20px,-10px)'}}>{lenNotif}</span>
                                      )}
                                  </Media>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem className="text-sm text-muted m-0" header tag="div">
                                      <div className="row">
                                          <div className="col-4 d-flex justify-content-start">
                                              <button type="button" className="btn btn-outline-primary btn-sm">Nouvelle notification</button>
                                          </div>
                                          <div className="col-4 d-flex justify-content-start">
                                              <button type="button" className="btn btn-outline-primary btn-sm">Type de notification</button>
                                          </div>
                                          <div className="col-4 d-flex justify-content-start">
                                              <button type="button" className="btn btn-primary btn-sm">Toute notification</button>
                                          </div>
                                      </div>
                                      {/*<h3 className="text-start text-sm text-capitalize m-0">
                                          Vous avez <strong className="text-danger ">{lenNotif}</strong> nouvelle notification(s)
                                      </h3>*/}
                                  </DropdownItem>
                                  <DropdownItem tag="div" style={{width: '495px'}}>
                                      <div className="align-items-center d-flex row clickable">
                                          <div className="col-2">
                                              <span className="avatar rounded-circle bg-translucent-warning">
                                                  <i className="fa fa-c"/>
                                              </span>
                                          </div>
                                          <div className="col-8 ml--2">
                                              <div className="d-flex justify-content-between align-items-center">
                                                  <div><h4 className="mb-0 text-sm">Nouvelle projet</h4></div>
                                              </div>
                                              <p className="text-sm mb-0">Le projet titre a été creé</p>
                                          </div>
                                          <div className="col-2 d-flex justify-content-end">
                                              <div className="text-right text-muted"><small>2022-11-10</small></div>
                                          </div>
                                      </div>
                                  </DropdownItem>
                                  <DropdownItem tag="div" style={{width: '495px'}}>
                                      <div className="align-items-center d-flex row clickable">
                                          <div className="col-2">
                                              <span className="avatar rounded-circle bg-translucent-warning">
                                                  <i className="fa fa-c"/>
                                              </span>
                                          </div>
                                          <div className="col-8 ml--2">
                                              <div className="d-flex justify-content-between align-items-center">
                                                  <div><h4 className="mb-0 text-sm">Nouvelle projet</h4></div>
                                              </div>
                                              <p className="text-sm mb-0">Le projet titre a été creé</p>
                                          </div>
                                          <div className="col-2 d-flex justify-content-end">
                                              <div className="text-right text-muted"><small>2022-11-10</small></div>
                                          </div>
                                      </div>
                                  </DropdownItem>
                                  <DropdownItem tag="div" style={{width: '495px'}}>
                                      <div className="align-items-center d-flex row clickable">
                                          <div className="col-2">
                                              <span className="avatar rounded-circle bg-translucent-warning">
                                                  <i className="fa fa-c"/>
                                              </span>
                                          </div>
                                          <div className="col-8 ml--2">
                                              <div className="d-flex justify-content-between align-items-center">
                                                  <div><h4 className="mb-0 text-sm">Nouvelle projet</h4></div>
                                              </div>
                                              <p className="text-sm mb-0">Le projet titre a été creé</p>
                                          </div>
                                          <div className="col-2 d-flex justify-content-end">
                                              <div className="text-right text-muted"><small>2022-11-10</small></div>
                                          </div>
                                      </div>
                                  </DropdownItem>
                                  {/*<DropdownItem divider />*/}{/*<DropdownItem divider />*/}
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
