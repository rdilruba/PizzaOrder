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
            total: 0
        };
        this.handleIncrease = this.handleIncrease.bind(this);
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
        console.log(val, id);
        this.setState(prevState => ({
            total: prevState.total + val
        }));
    }
    render() {
        const { pizzas, total } = this.state;
        console.log(total);
        return (
            <div className="root-container">
                <Navbar total={total} />
                <div className="content">
                    <div className="home-container">
                        <div className="pizza-container">
                            {pizzas
                                ? pizzas.map(
                                      ({ id, image, title, description }) => (
                                          <PizzaCard
                                              key={id}
                                              id={id}
                                              src={image}
                                              alt={title}
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
