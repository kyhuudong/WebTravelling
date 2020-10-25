import React, { Component } from 'react';
import '../css/cart.css'
import Item from './Item'
import { faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ShoppingCart extends Component {
    state = {};
    constructor(props){
        super(props);
        this.state = {
            shoppingCarts : [],
            tourID: '',
            name : '',
            departureLocation : '',
            amount: '',
            tourCost : '',
            totalCost: 0,
            error : null,
            isLoaded : false
        }
    }
    componentDidMount() {
        const user_id = sessionStorage["userID"];
        if(user_id) {
            fetch('http://localhost:3001/shoppingCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user_id,
                })
            })
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded : true,
                        shoppingCarts : result
                    });
                    this.setState({
                        totalCost: this.calculateTotalCost()
                    })
                },
                (error) => {
                    alert(error);
                    this.setState({
                        isLoaded : true,
                        error
                });
            });
        }
    }
    calculateTotalCost(){
        var totalCost = 0;
        this.state.shoppingCarts.map(tour => totalCost += parseFloat(tour.tour_cost)*parseFloat(tour.amount));
        return totalCost;
    }
    changeTotalCost(cost){
        this.setState({
            totalCost: this.state.totalCost + cost
        })
    }
    render() {
        let shopping_cart_list = this.state.shoppingCarts.map(tour =>{
            this.totalCost = this.calculateTotalCost();
            return <Item key={tour.tour_id} tour={tour} title={tour.tour_name} page={this}/>
        })
        return (
            <div>
                <div className="inner-container">
                    <div className="box-popup">
                        <div className="list">
                            {shopping_cart_list}
                        </div>
                        <div className="cart-footer">
                            <div>
                                <div className="footer-left">
                                    <span>
                                        Add more:
                                        <div className="icon-add"><FontAwesomeIcon icon={faPlusSquare}/></div>
                                    </span>
                                </div>
                                <div className="footer-right">
                                    <div className="total">
                                        Total: <strong className="text-right" id="total_cost">{this.state.totalCost} USD</strong>
                                    </div>
                                    <div className="pay-btn">Pay now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart