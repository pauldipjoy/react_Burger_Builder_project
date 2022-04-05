import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import Logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
    
    return(

        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#d70f64",
                height: "80px"

            }} >
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={Logo} alt="Logo" width= "80px" />
                </NavbarBrand>
                <Nav className="mr-md-5">
                    <NavItem>
                        <NavLink href="#" className="NavLink">Something1</NavLink>
                    </NavItem>
                    
                </Nav>
            </Navbar>

    
        </div>
    );
}

export default Header;