import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";
import Login from "../views/Admin/Login";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     console.log("atoooooooo.....")
  //     if (prop.layout === "/auth") {
  //       console.log("if.....")
  //       return (
  //         <Route path={prop.path} element={prop.component} key={key} exact />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        {/*<AuthNavbar />*/}
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>

        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Routes>
              <Route path="/login" element={<Login/>}  exact />
              {/*{getRoutes(routes)}*/}
              {/*<Route path="*" element={<Navigate to="/auth/login" replace />} />*/}
            </Routes>
          </Row>
        </Container>
      </div>
      {/*<AuthFooter />*/}
    </>
  );
};

export default Auth;
