import { Link } from "react-router-dom";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Container, Media,} from "reactstrap";
import 'font-awesome/css/font-awesome.min.css'

const AdminNavbar = (props) => {
  return (
      <>
          <Navbar className="navbar-top navbar-dark navbar" expand="md" id="navbar-main">
              <Container fluid>
                  <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">{props.brandText}</Link>
                  <Nav className="align-items-center d-none d-md-flex" navbar>
                      <UncontrolledDropdown nav>
                          <DropdownToggle className="pr-0" nav>
                              <Media className="align-items-center pr-3">
                                  <span className="avatar avatar-sm bg-translucent-default rounded-circle">
                                      <i className="fa-regular fa-bell fs-16"/>
                                  </span>
                                  <span className="badge badge-warning rounded-pill position-absolute" style={{height: '20px',width: '30px' , transform: 'translate(20px,-10px)'}}>105</span>
                              </Media>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem className="text-sm text-muted m-0" header tag="div">
                                  <h6 className="text-start m-0">Vous avez <strong className="text-danger ">13</strong> notification(s)</h6>
                              </DropdownItem>
                              <DropdownItem to="/admin/user-profile" tag="div" style={{width: '500px'}}>
                                  <div className="align-items-center d-flex row">
                                      <div className="col-3"><img alt="..." className="avatar rounded-circle"
                                                                         src="/argon-dashboard-pro-react/static/media/team-1.fa5a7ac2.jpg"/>
                                      </div>
                                      <div className="col-9 ml--2">
                                          <div className="d-flex justify-content-between align-items-center">
                                              <div><h4 className="mb-0 text-sm">John Snow</h4></div>
                                              <div className="text-right text-muted"><small>2 hrs ago</small></div>
                                          </div>
                                          <p className="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p></div>
                                  </div>
                              </DropdownItem>
                              <DropdownItem to="/admin/user-profile" tag="div" >
                                  <div className="align-items-center d-flex row">
                                      <div className="col-3"><img alt="..." className="avatar rounded-circle" src="/argon-dashboard-pro-react/static/media/team-1.fa5a7ac2.jpg"/></div>
                                      <div className="col-9 ml--2">
                                          <div className="d-flex justify-content-between align-items-center">
                                              <div><h4 className="mb-0 text-sm">John Snow</h4></div>
                                              <div className="text-right text-muted"><small>2 hrs ago</small></div>
                                          </div>
                                          <p className="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p></div>
                                  </div>
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                  <i className="ni ni-user-run" />
                                  <span>Déconnection</span>
                              </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown nav>
                          <DropdownToggle className="pr-0" nav>
                              <Media className="align-items-center">
                                  <span className="avatar avatar-sm bg-translucent-info rounded-circle">
                                      <i className="fa fa-m"/>
                                  </span>
                                  <Media className="ml-2 d-none d-lg-block">
                                      <span className="mb-0 text-sm font-weight-bold">
                                        Utilisateur
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
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
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
