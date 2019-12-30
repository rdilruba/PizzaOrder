import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./home.scss";
import Page from "../../components/page/Page";
import PizzaCard from "../pizzaCard/PizzaCard";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            pizzas: null
        };
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
    render() {
        const { pizzas } = this.state;
        return (
            <Page>
                <div className="home-container">
                    <div className="pizza-container">
                        {pizzas
                            ? pizzas.map(
                                  ({ id, image, title, description }) => (
                                      <PizzaCard
                                          key={id}
                                          src={image}
                                          alt={title}
                                          description={description}
                                      ></PizzaCard>
                                  )
                              )
                            : "waiting"}
                    </div>
                </div>
            </Page>
        );
    }
}

if (document.getElementById("root")) {
    ReactDOM.render(<Home />, document.getElementById("root"));
}
