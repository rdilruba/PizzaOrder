import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./home.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import PizzaCard from "../pizzaCard/PizzaCard";
import Collapsible from "react-collapsible";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            pizzas: null,
            total: 0,
            pizzaNumbers: [],
            success: false,
            open1: true,
            open2: false,
            open3: false
        };
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
        this.closeOthers = this.closeOthers.bind(this);
        this.closeThis = this.closeThis.bind(this);
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

    handleOrder(ordered) {
        this.setState({
            success: ordered
        });
    }
    handleIncrease(val, id) {
        this.setState(prevState => ({
            total: prevState.total + val
        }));
        const { pizzaNumbers } = this.state;
        if (pizzaNumbers[id]) pizzaNumbers[id] = pizzaNumbers[id] + val;
        else pizzaNumbers[id] = val;
        this.setState({ pizzaNumbers });
    }

    handleDecrease(val, id) {
        this.setState(prevState => ({
            total: prevState.total - val
        }));
        const { pizzaNumbers } = this.state;
        pizzaNumbers[id] = 0;
        this.setState({ pizzaNumbers });
    }

    closeOthers(id) {
        if (id == 1) {
            this.setState({
                open1: true,
                open2: false,
                open3: false
            });
        } else if (id == 2) {
            this.setState({
                open1: false,
                open2: true,
                open3: false
            });
        } else if (id == 3) {
            this.setState({
                open1: false,
                open2: false,
                open3: true
            });
        }
    }

    closeThis(id) {
        if (id == 1) {
            this.setState({
                open1: false
            });
        } else if (id == 2) {
            this.setState({
                open2: false
            });
        } else if (id == 3) {
            this.setState({
                open3: false
            });
        }
    }

    render() {
        const {
            pizzas,
            total,
            pizzaNumbers,
            success,
            open1,
            open2,
            open3
        } = this.state;
        let trendPizzas, favPizzas, gourmetPizzas;
        if (pizzas) {
            trendPizzas = pizzas.filter(pizza => pizza.id < 4);
            favPizzas = pizzas.filter(pizza => pizza.id > 2 && pizza.id < 7);
            gourmetPizzas = pizzas.filter(pizza => pizza.id > 6);
        }
        return (
            <div className="root-container">
                <Navbar
                    total={total}
                    pizzaNumbers={pizzaNumbers}
                    handleRemove={this.handleDecrease}
                    handleOrder={this.handleOrder}
                />
                <div className="home-content">
                    <div className="home-container">
                        {pizzas ? (
                            <div className="all-pizzas-container">
                                <Collapsible
                                    transitionTime={200}
                                    trigger="Trend Pizzas"
                                    open={open1}
                                    onOpening={() => this.closeOthers(1)}
                                    onClosing={() => this.closeThis(1)}
                                >
                                    <div className="pizza-container">
                                        {trendPizzas
                                            ? trendPizzas.map(
                                                  ({
                                                      id,
                                                      image,
                                                      title,
                                                      description,
                                                      price
                                                  }) => (
                                                      <PizzaCard
                                                          key={id}
                                                          id={id}
                                                          src={image}
                                                          alt={title}
                                                          price={price}
                                                          description={
                                                              description
                                                          }
                                                          addTotal={
                                                              this
                                                                  .handleIncrease
                                                          }
                                                          ordered={success}
                                                      ></PizzaCard>
                                                  )
                                              )
                                            : "waiting"}
                                    </div>
                                </Collapsible>

                                <Collapsible
                                    transitionTime={200}
                                    trigger="Favorite Pizzas"
                                    open={open2}
                                    onOpening={() => this.closeOthers(2)}
                                    onClosing={() => this.closeThis(2)}
                                >
                                    <div className="pizza-container">
                                        {favPizzas
                                            ? favPizzas.map(
                                                  ({
                                                      id,
                                                      image,
                                                      title,
                                                      description,
                                                      price
                                                  }) => (
                                                      <PizzaCard
                                                          key={id}
                                                          id={id}
                                                          src={image}
                                                          alt={title}
                                                          price={price}
                                                          description={
                                                              description
                                                          }
                                                          addTotal={
                                                              this
                                                                  .handleIncrease
                                                          }
                                                          ordered={success}
                                                      ></PizzaCard>
                                                  )
                                              )
                                            : "waiting"}
                                    </div>
                                </Collapsible>
                                <Collapsible
                                    transitionTime={200}
                                    trigger="Gourmet Pizzas"
                                    open={open3}
                                    onOpening={() => this.closeOthers(3)}
                                    onClosing={() => this.closeThis(3)}
                                >
                                    <div className="pizza-container">
                                        {gourmetPizzas
                                            ? gourmetPizzas.map(
                                                  ({
                                                      id,
                                                      image,
                                                      title,
                                                      description,
                                                      price
                                                  }) => (
                                                      <PizzaCard
                                                          key={id}
                                                          id={id}
                                                          src={image}
                                                          alt={title}
                                                          price={price}
                                                          description={
                                                              description
                                                          }
                                                          addTotal={
                                                              this
                                                                  .handleIncrease
                                                          }
                                                          ordered={success}
                                                      ></PizzaCard>
                                                  )
                                              )
                                            : "waiting"}
                                    </div>
                                </Collapsible>
                            </div>
                        ) : (
                            "waiting"
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

if (document.getElementById("root")) {
    ReactDOM.render(<Home />, document.getElementById("root"));
}
