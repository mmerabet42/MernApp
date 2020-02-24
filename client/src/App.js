import React from 'react';
import { Cookies } from 'react-cookie';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Articles from './components/Articles';
import { Form } from 'reactstrap';

export default class App extends React.Component {

    cookies = new Cookies();
    state = {
        token: this.cookies.get('userToken'),
        username: this.cookies.get('username'),
        navbarColor: "valid",
        navbarMessage: "Hello mdr",
        title: "Login"
    };

    setToken = (token, username) => {
        this.setState({
            token: token,
            username: username
        });
        this.cookies.set("userToken", token, { path: '/' });
        this.cookies.set("username", username, { path: '/' });
    };

    unsetToken = () => {
        console.log("hello");
        this.setState({
            token: null,
            username: null
        });     
        this.cookies.remove("userToken");
        this.cookies.remove("username");
    }

    setNavbar = (color = "none", message = "") => {
        this.setState({
            navbarColor: color,
            navbarMessage: message
        });
    };
    setTitle = (title) => {
        this.setState({
            title: title
        });
    }

    sendLogin = async (username, password) => {
        try {
            const result = await axios.post("http://localhost:5000/api/user/login", {
                username: username,
                password: password
            });
            if (!result.data.success)
                return this.setNavbar("error", result.data.data);
            this.setNavbar("success", "You are logged");
            this.setToken(result.data.data, this.state.username);
            this.setState({ redirect: true });
        } catch (err) {
            this.setNavbar("error", "Wrong username or password");
        }
    }

    render() {
        let body;
       
            body =
                <Switch>
                    <Route path="/register">
                        <Register
                            setNavbar={this.setNavbar}
                            setToken={this.setToken}
                            setTitle={this.setTitle}
                        />
                    </Route>
                    <Route path="/">
                        {
                            (this.state.token && <Articles />) ||
                            <Login
                                setTitle={this.setTitle}
                                sendLogin={this.sendLogin}
                            />
                        }
                    </Route>
                </Switch>


        return (

            <div>
                <Navbar
                    title={this.state.title}
                    color={this.state.navbarColor}
                    message={this.state.navbarMessage}
                    token={this.state.token}
                    username={this.state.username}
                    unsetToken={this.unsetToken}
                    currentPage={this.state.currentPage}
                    setNavbar={this.setNavbar}>
                </Navbar>
                <Body>
                    {body}
                </Body>
            </div>
        );
    }
};

const Container = styled("div")`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`;

const Body = styled("div")`
    margin-top: 70px;
`;