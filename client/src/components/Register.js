import React from 'react';
import '../App.css';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

import AnimatedInput from './common/AnimatedInput';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: String,
            password: String,
            confirmPassword: String,
            redirect: false
        }
        this.props.setTitle("Register");
    }

    render() {
        if (this.state.redirect)
            return <Redirect to="/" />

        return (
            <Container>
                <LoginBox>
                    <AnimatedInput
                        className="animatedInput"
                        type="text"
                        label="Username"
                        focusColor="#FF2D66"
                        validColor="#0CC2AB"
                        transitionSpeed="0.5s"
                        onHoverSize="10px"
                        onChange={e => this.setState({ username: e.target.value })}
                        />
                    <AnimatedInput
                        className="animatedInput"
                        type="password"
                        label="Password"
                        focusColor="#FF2D66"
                        validColor="#0CC2AB"
                        transitionSpeed="0.5s"
                        onChange={e => this.setState({ password: e.target.value })}
                        />
                    <AnimatedInput
                        className="animatedInput"
                        type="password"
                        label="Confirm password"
                        focusColor="#FF2D66"
                        validColor="#0CC2AB"
                        transitionSpeed="0.5s"
                        onChange={e => this.setState({ confirmPassword: e.target.value })}
                        />
                    <LoginButton onClick={this.sendLogin}>Register</LoginButton>
                    <p>Have an account ? <Link to="/">Login.</Link></p>
                </LoginBox>
            </Container>
        );
    }
};

const Container = styled("div")`
    display: flex;
    justify-content: center;
    margin: 0px;
    color: black;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
`;

const LoginBox = styled("div")`
    border-top: none;
    border-bottom: none;
    width: 30%;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    .animatedInput {
        width: 100%;
        font-size: 20px;
        margin: 20px;
    }
`;

const LoginButton = styled("button")`
    background-color: #0CDC8C;
    color: black;
    border: none;
    margin: 0;
    padding: 10px;  
    width: 100%;
    font-size: 2rem;
    cursor: pointer;
    transition: 0.5s;
    outline: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    :hover {
        color: black;
        background-color: #08AD6E;
    }
`;