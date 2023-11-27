
import React, {useState} from "react";
import {useLocation, Route, Routes, Navigate, useNavigate} from "react-router-dom";
import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const navigate=useNavigate()
  const[userName,setUserName]=useState('')

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
    if (!localStorage.getItem("user")){
      navigate("/login")
      return
    }
    setUserName(JSON.parse(localStorage.getItem("user")).name)
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    if (location?.pathname.includes("/projets/view/site/")){
      return null
    }
    for (let i = 0; i < routes.length; i++) {
      if (location?.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        if (routes[i].name==='Dashboard'){
          return{
            path: null,
            name: `Hello ${userName}, Bienvenue`
          }
        }
        return routes[i];
      }
    }
  };

  return (
      <>
        <Sidebar
            {...props}
            routes={routes}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("../assets/img/brand/logo-no-background.png"),
              imgAlt: "...",
            }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
              userName={userName}
              navigate={navigate}
              brandText={getBrandText(props?.location?.pathname)}
              utilisateur={"auth"}
          />
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/auth/index" replace />} />
          </Routes>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
        {/*<div className="position-fixed bottom-small-0 right-small-0">*/}
        {/*  <button type="button" className="btn btn-white rounded-circle" style={{width: '50px', height: '50px'}}>*/}
        {/*    <span className="badge bg-translucent-danger rounded-pill position-absolute" style={{height: '20px',width: '30px' , transform: 'translate(5px,5px)'}}><strong>5</strong></span>*/}
        {/*    <i className="fa-solid fa-bolt mx-auto my-auto"/>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </>
  );
};


export default Auth;
