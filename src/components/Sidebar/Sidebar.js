import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

const Sidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    const closeCollapse = () => {
        setCollapseOpen(false);
    };
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
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
