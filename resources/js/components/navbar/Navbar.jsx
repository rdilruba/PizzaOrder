import React, { Component } from "react";
import { Layout, Button } from "antd";

import PizzaOrder from "../pizzaOrder/PizzaOrder";
import Logo from "./Logo";
import "./navbar.scss";

const { Header } = Layout;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzas: null,
            visible: false,
            success: false
        };

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCart = this.handleCart.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
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
            success: true
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

    handleDecrease(val, id) {
        this.props.handleRemove(val, id);
    }

    render() {
        const { visible, pizzas, success } = this.state;
        let totalCost = 0;
        const { total, pizzaNumbers } = this.props;
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
                                {pizzas
                                    ? pizzas.map(
                                          ({ id, image, title, price }) =>
                                              pizzaNumbers[id] ? (
                                                  <div>
                                                      <PizzaOrder
                                                          key={id}
                                                          id={id}
                                                          src={image}
                                                          title={title}
                                                          price={price}
                                                          amount={
                                                              pizzaNumbers[id]
                                                          }
                                                          removeTotal={
                                                              this
                                                                  .handleDecrease
                                                          }
                                                          ordered={success}
                                                      ></PizzaOrder>
                                                      <div className="no-see">
                                                          {
                                                              (totalCost =
                                                                  totalCost +
                                                                  price *
                                                                      pizzaNumbers[
                                                                          id
                                                                      ])
                                                          }
                                                      </div>
                                                  </div>
                                              ) : null
                                      )
                                    : null}
                            </div>
                            <div className="modal-footer">
                                <p> Total Cost : {totalCost}</p>
                                {success ? (
                                    <button className="ordered-button">
                                        Ordered
                                    </button>
                                ) : (
                                    <button
                                        className="order-button"
                                        onClick={this.handleOk}
                                    >
                                        Order Now
                                    </button>
                                )}
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
