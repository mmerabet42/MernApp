import React from 'react';
import { Cookies } from 'react-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Articles from './components/Articles';

const Container = styled("div")`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
`;

const Body = styled("div")`
    margin-top: 70px;
`;

export default class App extends React.Component {

    cookies = new Cookies();
    state = {
        token: this.cookies.get('userToken'),
        username: this.cookies.get('username'),
        navbarColor: "none",
        navbarMessage: ""
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
        this.setState({
            token: null,
            username: null
        }); 
        this.cookies.remove("userToken");
        this.cookies.remove("username");
        console.log("sirhbvfd");
    }

    setNavbar = (color = "none", message = "") => {
        this.setState({
            navbarColor: color,
            navbarMessage: message
        });
    };

    render() {
        return (
            <div>
                <Navbar
                    color={this.state.navbarColor}
                    message={this.state.navbarMessage}
                    token={this.state.token}
                    username={this.state.username}
                    unsetToken={this.unsetToken}
                    currentPage={this.state.currentPage}
                    setNavbar={this.setNavbar}>
                </Navbar>
                <Body>
                    <Switch>
                        <Route path="/" render={() => {
                            return !this.state.token ? (
                                <Container>
                                    <Login setNavbar={this.setNavbar} setToken={this.setToken} />
                                    <Register setNavbar={this.setNavbar} />
                                </Container>
                            ) : (
                                <Articles token={this.state.token} />
                            );
                        }}>
                        </Route>
                        <Route path="/disconnect" render={() => {
                            this.unsetToken();
                            return <Redirect to="/" />;
                        }}>
                        </Route>
                    </Switch>
                </Body>
            </div>
            
        );
    }
};