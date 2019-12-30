import React from "react";
import { Layout, Button } from "antd";
import { Link, BrowserRouter } from "react-router-dom";

import Logo from "./Logo";
import "./navbar.scss";

const { Header } = Layout;

const Navbar = props => {
    const { user } = props;

    const Logout = () => {
        const { logout } = props;
        logout();
    };

    return (
        <div className="navbar-container">
            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <Logo />
                    </div>

                    {user ? (
                        <div className="buttons">
                            <BrowserRouter>
                                <Link to="/profile">
                                    <Button
                                        className="profile-button"
                                        type="primary"
                                    >
                                        Profile
                                    </Button>
                                </Link>
                            </BrowserRouter>
                            <BrowserRouter>
                                <Link to="/">
                                    <Button type="danger" onClick={Logout}>
                                        Logout
                                    </Button>
                                </Link>
                            </BrowserRouter>
                        </div>
                    ) : (
                        <div className="buttons">
                            <BrowserRouter>
                                <Link to="/login">
                                    <Button className="button" type="primary">
                                        LOGIN
                                    </Button>
                                </Link>
                            </BrowserRouter>
                            <BrowserRouter>
                                <Link to="/login">
                                    <Button className="button" type="primary">
                                        REGISTER
                                    </Button>
                                </Link>
                            </BrowserRouter>
                        </div>
                    )}
                </Header>
            </Layout>
        </div>
    );
};

export default Navbar;
