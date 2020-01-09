import React from 'react';
import '../App.css';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Container = styled("div")`
    display: flex;
    justify-content: center;
    margin: 0px;
    color: black;
`;

const LoginBox = styled("div")`
    background-color: #9DBF9E;
    border-top: none;
    border-bottom: none;
    margin: 0;
    margin-top: 10rem;
    color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 20px black;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    * {
        margin: 10px;
    }
`;

const LoginButton = styled("button")`
    background-color: #ED9390;
    color: #F4D8CD;
    border: none;
    margin: 0;
    padding: 10px;  
    width: 100%;
    font-size: 2rem;
    cursor: pointer;
    transition: 0.5s;
    outline: none;
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    :hover {
        color: white;
        background-color: #F15152;

    }
`;

const LoginInput = styled("input")`
    padding: 10px;
    border: none;
    border-bottom: 1px #F4D8CD solid;
    background-color: transparent;
    outline: none;
    color: white;
    font-weight: 100;
    margin: 20px;   
    margin-right: 50px;
    margin-left: 50px;
    font-size: 1.5rem;
    transition: 1s;

    ::placeholder {
        color: #F4D8CD;
    }
`;

const LoginTitle = styled("h1")`
    color: white;
    margin: 0;
    padding: 10px;
    font-family: sans-serif;

`;

export default class Register extends React.Component {
    state = {
        username: String,
        password: String,
        confirmPassword: String,
        redirect: false
    }

    sendRegister = async () => {
        if (this.state.password !== this.state.confirmPassword)
            return this.props.setNavbar("error", "Passwords are not the same");

        try {
            const result = await axios.post("http://localhost:5000/api/user/register", {
                username: this.state.username,
                password: this.state.password
            });
            if (!result.data.success)
                return this.props.setNavbar("error", result.data.data);
            this.props.setNavbar("success", "Account created");
            this.setState({ redirect: true });
        } catch (err) {
            this.props.setNavbar("error", "Failed to create account");
        }
    }

    render() {
        if (this.state.redirect)
            return <Redirect to="/" />

        return (
            <Container>
                <LoginBox>
                    <LoginInput placeholder="Username" onChange={e => this.setState({ username: e.target.value })} />
                    <LoginInput placeholder="Password" type="password" onChange={e => this.setState({ password: e.target.value })} />
                    <LoginInput placeholder="Confirm password" type="password" onChange={e => this.setState({ confirmPassword: e.target.value })} />
                    <LoginButton onClick={this.sendRegister}>Signup</LoginButton>
                </LoginBox>
            </Container>
        );
    }
};