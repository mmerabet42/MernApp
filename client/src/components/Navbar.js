import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SimpleLink from './common/SimpleLink';

export default class Navbar extends React.Component {
    cancelNavbar = () => {
        this.props.setNavbar();
    }

    render() {
        return (
            <NavbarBox>
                <NavbarTitle>
                    <SimpleLink to="/">{this.props.title}</SimpleLink>
                </NavbarTitle>
                <MessageBox>
                    <Message color={this.props.navbarColor}>
                        {this.props.navbarMessage}
                    </Message>
                </MessageBox>
            </NavbarBox>
        );
    }
};

const MessageBox = styled("div")`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const colors = {
    "error": "#FF3864",
    "valid": "#38FF87"
};

const Message = styled("p")`
    background-color: ${props => colors[props.color]};
    color: white;
`;

const NavbarBox = styled("div")`
    color: white;
    margin: 10px;
    padding: 10px;
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const NavbarTitle = styled("h1")`
    margin: 0;
    font-weight: 100;
`;

const NavbarLink = styled(SimpleLink)`
    background-color: #0CDC8C;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    color: black;
    border-radius: 30px;
    font-size: 20px;
    position: relative;
    left: 0;
    transition: 0.4s;

    :hover {
        left: 10px;
        padding-left: 30px;
        padding-right: 30px;
    }
    :active {
        background-color: #0ba268;
    }
    :visited {
        color: black;
    }
`;
