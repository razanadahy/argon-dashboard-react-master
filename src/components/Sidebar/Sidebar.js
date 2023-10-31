import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import {Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container,} from "reactstrap";

const Sidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    const closeCollapse = () => {
        setCollapseOpen(false);
    };
    const type=JSON.parse(localStorage.getItem("user")).type
    let eg=''
    if (type===1){
        eg="/admin"
    }else{
        eg="/auth"
    }
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            if (!prop.hide && prop.layout===eg){
                return (
                    <NavItem key={key}>
                        <NavLink
                            to={prop.layout + prop.path}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                        >
                            <i className={prop.icon} />
                            {prop.name}
                        </NavLink>
                    </NavItem>
                );
            }
            return null
        });
    };

    const { bgColor, routes, logo } = props;

    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link,
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank",
        };
    }

    return (
        <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
            <Container fluid>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {logo ? (
                    <NavbarBrand className="pt-3 my-0 p-0 mx-auto " {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}

                <Collapse navbar isOpen={collapseOpen}>
                    <Nav navbar>{createLinks(routes)}</Nav>

                    <hr className="my-3" />
                    <Nav className="mb-md-3" navbar>
                        <NavItem>
                            <NavLink href="#">
                                <i className="ni ni-ui-04" />
                                Mes top Prios
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

Sidebar.defaultProps = {
    routes: [{}],
};

Sidebar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        innerLink: PropTypes.string,
        outterLink: PropTypes.string,
        imgSrc: PropTypes.string.isRequired,
        imgAlt: PropTypes.string.isRequired,
    }),
};

export default Sidebar;
