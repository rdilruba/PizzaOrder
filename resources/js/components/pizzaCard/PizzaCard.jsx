import React, { Component } from "react";
import { Button, InputNumber } from "antd";

import "./pizza-card.scss";

class PizzaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            amount: 1
        };
        this.onChange = this.onChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    onChange(value) {
        this.setState({
            amount: value
        });
    }

    handleAdd(value) {
        this.props.addTotal(value, this.state.id);
    }

    render() {
        const { src, alt, description, price, ordered } = this.props;
        const { amount } = this.state;
        return (
            <div className="card-container">
                <div className="photo-container">
                    <img src={src} alt={alt} />
                </div>
                <div>
                    <p className="pizza-description">{description}</p>
                    <p> {price}$</p>
                    <div className="cart-container">
                        <InputNumber
                            className="input-container"
                            min={1}
                            max={10}
                            defaultValue={1}
                            onChange={this.onChange}
                        />
                        <Button
                            onClick={
                                ordered ? null : () => this.handleAdd(amount)
                            }
                            type="default"
                            icon="shopping-cart"
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PizzaCard;
