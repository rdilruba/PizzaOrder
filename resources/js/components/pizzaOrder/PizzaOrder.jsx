import React, { Component } from "react";
import { Button } from "antd";

import "./pizza-order.scss";

class PizzaOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(value) {
        this.props.removeTotal(value, this.state.id);
    }

    render() {
        const { src, title, amount, price, ordered } = this.props;
        return (
            <div className="order-card">
                <div>
                    <img src={src} alt={title} />
                </div>
                <div className="order-details">
                    <p>
                        {amount} {title}
                    </p>
                    <p>{amount * price}$</p>
                    <div>
                        {ordered ? (
                            <Button type="default" icon="shopping-cart">
                                Ordered
                            </Button>
                        ) : (
                            <Button
                                onClick={() => this.handleDelete(amount)}
                                type="default"
                                icon="shopping-cart"
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default PizzaOrder;
