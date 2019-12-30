import React, { Component } from "react";
import { Layout, Button, Icon } from "antd";

import Logo from "./Logo";
import "./navbar.scss";

const { Header } = Layout;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzas: null,
            visible: false
        };

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCart = this.handleCart.bind(this);
    }
    componentDidMount() {
        fetch("/api/pizzas")
            .then(response => {
                return response.json();
            })
            .then(pizzas => {
                this.setState({ pizzas: pizzas });
            });
    }

    handleOk() {
        this.setState({
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    handleCart() {
        this.setState({
            visible: true
        });
    }

    render() {
        const { visible } = this.state;
        const { total } = this.props;
        return (
            <div className="navbar-container">
                {visible ? (
                    <div className="modal-cart">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    onClick={this.handleCancel}
                                    className="close"
                                >
                                    &times;
                                </button>
                                <h3>Your Cart</h3>
                            </div>
                            <div className="modal-body">
                                <p>Some text in the Modal Body</p>
                                <p>Some other text...</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="order-button"
                                    onClick={this.handleOk}
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}

                <Layout className="layout">
                    <Header>
                        <div className="logo">
                            <Logo />
                        </div>
                        {total ? (
                            <p className="notification"> {total} </p>
                        ) : null}
                        <Button
                            onClick={this.handleCart}
                            className="cart-button"
                            icon="shopping-cart"
                            type="primary"
                        >
                            Cart
                        </Button>
                    </Header>
                </Layout>
            </div>
        );
    }
}

export default Navbar;
