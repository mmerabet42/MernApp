import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled("div")`
    background-color: #F15152;
    box-shadow: 0px 0px 2px black;
    color: #70D6FF;
    box-shadow: 0px 0px 10px black;
    padding-left: 20rem;
    padding-right: 20rem;
    margin: 20px;
    border-radius: 20px;

    display: flex;
    justify-content: space-between;
`;

const StyledDiv1 = styled("div")`
    display: flex;
    align-items: stretch;
`;

const StyledLink = styled(Link)`
    line-height: 2.5rem;
    color: #F4D8CD;
    border: none;
    font-size: 20px;
    padding: 20px;
    transition: 0.5s;
    outline: none;
    text-decoration: none;
    margin: 0;

    :hover {
        color: white;
    }
`;

const LinkH1 = styled(Link)`
    color: #F4D8CD;
    outline: none;
    font-size: 3rem;
    text-decoration: none;
    padding: 10px;
    transition: 0.5s;

    :hover {
        color: white;
    }
`;

const infoColors = {
    "error": "#b33838",
    "success": "#38b341",
    "info": "#5699ff",
    "warning": "#f2a341"
}

const MessageDiv = styled("div")`
    background-color: ${props => infoColors[props.color]};
    margin: 0;
    padding: 10px;
    position: absolute;
    width: 100%;

    * {
        margin: 0;
    }
`;

export default class Navbar extends React.Component {
    cancelNavbar = () => {
        this.props.setNavbar();
    }

    render() {

        let messageDiv = null;
        if (this.props.color !== "none")
            messageDiv =
                <MessageDiv color={this.props.color}>
                    <p>{this.props.message}</p>
                </MessageDiv>

        let loginDiv;
        if (this.props.token)
            loginDiv = (
                <StyledDiv1>
                    <StyledLink onClick={this.cancelNavbar}>{this.props.username}</StyledLink>
                    <StyledLink to="/" onClick={() => {
                        this.props.unsetToken();
                        this.props.setNavbar("success", "You are logged out");
                    }}>Log out</StyledLink>
                </StyledDiv1>
            );
        else
            loginDiv = (
                <StyledDiv1>
                    <StyledLink to="/signup" onClick={this.cancelNavbar}></StyledLink>
                </StyledDiv1>
            );

        return (
            <div>
                <StyledDiv>
                    <LinkH1 to="/" onClick={this.cancelNavbar}>Title</LinkH1>
                    {loginDiv}
                </StyledDiv>
                {messageDiv}
            </div>
        );
    }
};