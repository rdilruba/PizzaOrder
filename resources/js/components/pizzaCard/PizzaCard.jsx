import React, { Component } from "react";
import { Icon } from "antd";

import "./pizza-card.scss";

class PizzaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { key, src, alt, description } = this.props;
        return (
            <div className="card-container">
                <div className="photo-container">
                    <img key={key} src={src} alt={alt} />
                    <p>{description}</p>
                    <Icon type="shopping-cart" />
                </div>
            </div>
        );
    }
}

export default PizzaCard;
