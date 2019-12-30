import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./home.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import PizzaCard from "../pizzaCard/PizzaCard";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            pizzas: null,
            total: 0,
            pizzaNumbers: []
        };
        this.handleIncrease = this.handleIncrease.bind(this);

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

    render() {
        const { pizzas, total, pizzaNumbers } = this.state;
        return (
            <div className="root-container">
                <Navbar
                    total={total}
                    pizzaNumbers={pizzaNumbers}
                    handleRemove={this.handleDecrease}
                />
                <div className="content">
                    <div className="home-container">
                        <div className="pizza-container">
                            {pizzas
                                ? pizzas.map(
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
                                              description={description}
                                              addTotal={this.handleIncrease}
                                          ></PizzaCard>
                                      )
                                  )
                                : "waiting"}
                        </div>
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
