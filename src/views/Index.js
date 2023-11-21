import {useEffect, useState} from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
    CardFooter,
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample1, chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import StatistiqueDashbord from "../Model/StatistiqueDashbord.tsx";
import StatDev from "../Model/StatDev.tsx";
import PaginateObject from "../components/Sidebar/PaginateObject";

const Index = (props) => {
    const utilisateur=JSON.parse(localStorage.getItem("user"))
    const [statDevRetour,setStatDevRetour]=useState([])
    const [allStade,setAllStade]=useState([])
    const [allAgv,setAllAvg]=useState([])
    useEffect(()=>{
        StatistiqueDashbord.getByStade(utilisateur.token).then((response)=>{
            setAllStade(response)
        })
        StatDev.getByTicketRetour(utilisateur.token).then((response)=>{
            setStatDevRetour(response)
        })
        StatDev.getByAvgDev(utilisateur.token).then((response)=>{
            setAllAvg(response)
        })
    },[])


    const [year,setYear]=useState(2023)
    const [allData,setAllData]=useState([])

    useEffect(()=>{
        StatistiqueDashbord.getNumberProject(utilisateur.token,year).then((response)=>{
          setAllData(response)
        })
    },[year])

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const [orderMonth,setOrderMont]=useState(6)
    const d=allData.slice(orderMonth,orderMonth+6)
    const extractData = (data) => {
        const values = [];
        const labels = [];

        data.forEach(({ valeur, label }) => {
            values.push(valeur.toFixed(1));
            labels.push(label);
        });
        return { values, labels };
    };

    const { values: u, labels: ul } = extractData(d);
    const { values: datas, labels } = extractData(allStade);
    const stadeProjet = chartExample1(labels, datas);
    const dateNumberProject = chartExample2(ul, u);

    function getClass(valeur) {
        if (valeur<10){
            return "bg-gradient-success"
        }else if (valeur<20){
            return "bg-gradient-info"
        }else if(valeur<40){
            return "bg-gradient-warning"
        }else{
            return "bg-gradient-danger"
        }
    }
    const [currentPage,setCurrentPage]=useState(1)
    const [currentAgv,setCurrentAvg]=useState(1)

    function onPageChange(number) {
        setCurrentPage(number)
    }
    function onPageChangeAgv(number) {
        setCurrentAvg(number)
    }
    const perPage=5;
    const startIndex=(currentPage-1)*perPage
    const endIndex=startIndex+perPage
    const currentData=statDevRetour.slice(startIndex,endIndex)
    const startAgv=(currentAgv-1)*perPage
    const endAvg=startAgv+perPage
    const currentDataAvg=allAgv.slice(startAgv,endAvg)
    return (
          <>
              <Header />
              <Container className="mt--7" fluid>
                  {/*<Row >*/}
                  {/*    <Col className="mb-5 mb-xl-0" xl="8">*/}
                  {/*        <Card className="shadow">*/}
                  {/*            <CardHeader className="border-0">*/}
                  {/*                <Row className="align-items-center">*/}
                  {/*                    <div className="col">*/}
                  {/*                        <h3 className="mb-0">Page visits</h3>*/}
                  {/*                    </div>*/}
                  {/*                    <div className="col text-right">*/}
                  {/*                        <Button color="primary" onClick={(e) => e.preventDefault()} size="sm">*/}
                  {/*                            See all*/}
                  {/*                        </Button>*/}
                  {/*                    </div>*/}
                  {/*                </Row>*/}
                  {/*            </CardHeader>*/}
                  {/*            <Table className="align-items-center table-flush" responsive>*/}
                  {/*                <thead className="thead-light">*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="col">Page name</th>*/}
                  {/*                    <th scope="col">Visitors</th>*/}
                  {/*                    <th scope="col">Unique users</th>*/}
                  {/*                    <th scope="col">Bounce rate</th>*/}
                  {/*                </tr>*/}
                  {/*                </thead>*/}
                  {/*                <tbody>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">/argon/</th>*/}
                  {/*                    <td>4,569</td>*/}
                  {/*                    <td>340</td>*/}
                  {/*                    <td>*/}
                  {/*                        <i className="fas fa-arrow-up text-success mr-3" /> 46,53%*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">/argon/index.html</th>*/}
                  {/*                    <td>3,985</td>*/}
                  {/*                    <td>319</td>*/}
                  {/*                    <td>*/}
                  {/*                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}*/}
                  {/*                        46,53%*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">/argon/charts.html</th>*/}
                  {/*                    <td>3,513</td>*/}
                  {/*                    <td>294</td>*/}
                  {/*                    <td>*/}
                  {/*                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}*/}
                  {/*                        36,49%*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">/argon/tables.html</th>*/}
                  {/*                    <td>2,050</td>*/}
                  {/*                    <td>147</td>*/}
                  {/*                    <td>*/}
                  {/*                        <i className="fas fa-arrow-up text-success mr-3" /> 50,87%*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">/argon/profile.html</th>*/}
                  {/*                    <td>1,795</td>*/}
                  {/*                    <td>190</td>*/}
                  {/*                    <td>*/}
                  {/*                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}*/}
                  {/*                        46,53%*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                </tbody>*/}
                  {/*            </Table>*/}
                  {/*        </Card>*/}
                  {/*    </Col>*/}
                  {/*    <Col xl="4">*/}
                  {/*        <Card className="shadow">*/}
                  {/*            <CardHeader className="border-0">*/}
                  {/*                <Row className="align-items-center">*/}
                  {/*                    <div className="col">*/}
                  {/*                        <h3 className="mb-0">Retour de ticket(ticket bug)</h3>*/}
                  {/*                    </div>*/}
                  {/*                </Row>*/}
                  {/*            </CardHeader>*/}
                  {/*            <Table className="align-items-center table-flush" responsive>*/}
                  {/*                <thead className="thead-light">*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="col">Referral</th>*/}
                  {/*                    <th scope="col">Visitors</th>*/}
                  {/*                    <th scope="col" />*/}
                  {/*                </tr>*/}
                  {/*                </thead>*/}
                  {/*                <tbody>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">Facebook</th>*/}
                  {/*                    <td>1,480</td>*/}
                  {/*                    <td>*/}
                  {/*                        <div className="d-flex align-items-center">*/}
                  {/*                            <span className="mr-2">60%</span>*/}
                  {/*                            <div>*/}
                  {/*                                <Progress*/}
                  {/*                                    max="100"*/}
                  {/*                                    value="60"*/}
                  {/*                                    barClassName="bg-gradient-danger"*/}
                  {/*                                />*/}
                  {/*                            </div>*/}
                  {/*                        </div>*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">Facebook</th>*/}
                  {/*                    <td>5,480</td>*/}
                  {/*                    <td>*/}
                  {/*                        <div className="d-flex align-items-center">*/}
                  {/*                            <span className="mr-2">70%</span>*/}
                  {/*                            <div>*/}
                  {/*                                <Progress max="100" value="70" barClassName="bg-gradient-success"/>*/}
                  {/*                            </div>*/}
                  {/*                        </div>*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">Google</th>*/}
                  {/*                    <td>4,807</td>*/}
                  {/*                    <td>*/}
                  {/*                        <div className="d-flex align-items-center">*/}
                  {/*                            <span className="mr-2">80%</span>*/}
                  {/*                            <div>*/}
                  {/*                                <Progress max="100" value="80" />*/}
                  {/*                            </div>*/}
                  {/*                        </div>*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">Instagram</th>*/}
                  {/*                    <td>3,678</td>*/}
                  {/*                    <td>*/}
                  {/*                        <div className="d-flex align-items-center">*/}
                  {/*                            <span className="mr-2">75%</span>*/}
                  {/*                            <div>*/}
                  {/*                                <Progress*/}
                  {/*                                    max="100"*/}
                  {/*                                    value="75"*/}
                  {/*                                    barClassName="bg-gradient-info"*/}
                  {/*                                />*/}
                  {/*                            </div>*/}
                  {/*                        </div>*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                <tr>*/}
                  {/*                    <th scope="row">twitter</th>*/}
                  {/*                    <td>2,645</td>*/}
                  {/*                    <td>*/}
                  {/*                        <div className="d-flex align-items-center">*/}
                  {/*                            <span className="mr-2">30%</span>*/}
                  {/*                            <div>*/}
                  {/*                                <Progress*/}
                  {/*                                    max="100"*/}
                  {/*                                    value="30"*/}
                  {/*                                    barClassName="bg-gradient-warning"*/}
                  {/*                                />*/}
                  {/*                            </div>*/}
                  {/*                        </div>*/}
                  {/*                    </td>*/}
                  {/*                </tr>*/}
                  {/*                </tbody>*/}
                  {/*            </Table>*/}
                  {/*        </Card>*/}
                  {/*    </Col>*/}
                  {/*</Row>*/}
                  <Row className="mt-5">
                      <Col className="mb-5 mb-xl-0" xl="8">
                          <Card className="bg-gradient-default shadow h-100">
                              <CardHeader className="bg-transparent">
                                  <Row className="align-items-center">
                                      <div className="col">
                                          <h2 className="text-white mb-0">Moyenne de nombre de jour par stade</h2>
                                      </div>
                                  </Row>
                              </CardHeader>
                              <CardBody>
                                  <div className="chart">
                                      <Line
                                          data={stadeProjet.data1}
                                          options={stadeProjet.options}
                                      />
                                  </div>
                              </CardBody>
                          </Card>
                      </Col>
                      <Col xl="4">
                          <Card className="shadow h-100">
                              <CardHeader className="bg-transparent">
                                  <Row className="align-items-center">
                                      <div className="col">
                                          <h6 className="text-uppercase text-muted ls-1 mb-1">Nombre de projet par mois</h6>
                                          <div className="mb-0 row p-0">
                                              <div className="col-6 d-flex justify-content-start">
                                                  <div className="input-group-merge input-group">
                                                      <input placeholder="année" value={year} type="number" onChange={(event)=>{
                                                        event.preventDefault()
                                                        setYear(parseInt(event.target.value))
                                                      }} className="form-control"/>
                                                  </div>
                                              </div>
                                              <div className="col">
                                                  <Nav className="justify-content-end" pills>
                                                      <NavItem>
                                                          <NavLink className={classnames("py-2 px-3 clickable", {active: orderMonth === 0,})}  onClick={(e) =>  setOrderMont(0)}>
                                                              <span className="d-none d-md-block">Sem 1</span>
                                                              <span className="d-md-none">1</span>
                                                          </NavLink>
                                                      </NavItem>
                                                      <NavItem>
                                                          <NavLink className={classnames("py-2 px-3 clickable", {active: orderMonth === 6,})} data-toggle="tab" onClick={(e) =>  setOrderMont(6)}>
                                                              <span className="d-none d-md-block">Sem 2</span>
                                                              <span className="d-md-none">2</span>
                                                          </NavLink>
                                                      </NavItem>
                                                  </Nav>
                                              </div>
                                          </div>
                                      </div>
                                  </Row>
                              </CardHeader>
                              <CardBody>
                                  <div className="chart">
                                      {d.length!==0 ? (
                                          <Bar
                                              data={dateNumberProject.data}
                                              options={dateNumberProject.options}
                                          />
                                      ): (
                                          <div className="d-flex justify-content-center">
                                              <div className="spinner-border" role="status">
                                                  <span className="visually-hidden">Loading...</span>
                                              </div>
                                          </div>
                                      )}
                                  </div>
                              </CardBody>
                          </Card>
                      </Col>
                  </Row>
                  <Row className="mt-5">
                      <Col className="mb-5 mb-xl-0" xl="6">
                          <Card className="shadow">
                              <CardHeader className="border-0">
                                  <Row className="align-items-center">
                                      <div className="col">
                                          <h3 className="mb-0">Moyenne des developpeurs</h3>
                                      </div>
                                  </Row>
                              </CardHeader>
                              <Table className="align-items-center table-flush" responsive>
                                  <thead className="thead-light">
                                      <tr>
                                          <th scope="col">Dev</th>
                                          <th scope="col">ticket</th>
                                          <th scope="col">Moyen d'heure </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {currentDataAvg.map(({dev,nbSite,pourcentage},index)=>(
                                      <tr key={index}>
                                          <th scope="row">
                                              <div >
                                                  <div className="d-flex justify-content-between align-items-center">
                                                      <div><h4 className="mb-0 text-sm">{dev.nom}</h4></div>
                                                  </div>
                                                  <p className="text-sm mb-0">{dev.email}</p>
                                              </div>
                                          </th>
                                          <td>{nbSite}</td>
                                          <td>{pourcentage.toFixed(2)}</td>
                                      </tr>
                                  ))}
                                  </tbody>
                              </Table>
                              <CardFooter className="py-4">
                                  <nav aria-label="...">
                                      <PaginateObject currentPage={currentAgv} list={allAgv} perPage={perPage} onPageChange={onPageChangeAgv}/>
                                  </nav>
                              </CardFooter>
                          </Card>
                      </Col>
                      <Col xl="6">
                          <Card className="shadow">
                              <CardHeader className="border-0">
                                  <Row className="align-items-center">
                                      <div className="col">
                                          <h3 className="mb-0">Retour de ticket(ticket bug)</h3>
                                      </div>
                                  </Row>
                              </CardHeader>
                              <Table className="align-items-center table-flush" responsive>
                                  <thead className="thead-light">
                                      <tr>
                                          <th scope="col">Nom</th>
                                          <th scope="col">Nb ticket</th>
                                          <th scope="col" >Ticket bug</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {currentData.map(({dev,nbSite,pourcentage},index)=>(
                                      <tr key={index}>
                                          <th scope="row">
                                              <div >
                                                  <div className="d-flex justify-content-between align-items-center">
                                                      <div><h4 className="mb-0 text-sm">{dev.nom}</h4></div>
                                                  </div>
                                                  <p className="text-sm mb-0">{dev.email}</p>
                                              </div>
                                          </th>
                                          <td>{nbSite}</td>
                                          <td>
                                              <div className="d-flex align-items-center">
                                                  <span className="mr-2">{pourcentage.toFixed(1)}%</span>
                                                  <div>
                                                      <Progress max="100" value={pourcentage} barClassName={getClass(pourcentage)}/>
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                                  </tbody>
                              </Table>
                              <CardFooter className="py-4">
                                  <nav aria-label="...">
                                      <PaginateObject currentPage={currentPage} list={statDevRetour} perPage={perPage} onPageChange={onPageChange}/>
                                  </nav>
                              </CardFooter>
                          </Card>
                      </Col>
                  </Row>
              </Container>
          </>
    );
};

export default Index;
