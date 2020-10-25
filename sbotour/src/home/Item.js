import React, { Component } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkout from '../Payment/Checkout'

class Item extends Component {
    state = {}
    constructor(props){
        super(props);
        this.state = {
            bookedTour: props.tour,
            error : null,
            isLoaded : false
        }
    }
    
    deleteBookedTour(booked_tour){
        var cost = - parseFloat(booked_tour.tour_cost)*parseFloat(this.state.bookedTour.amount);
        this.props.page.changeTotalCost(cost);
        fetch('http://localhost:3001/removeTourInCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tour_id: booked_tour.booked_tour_id,
            })
        })
        .then(response => response.json())
        .then(
            (result) => {
                if(result === "success"){
                    document.getElementById(booked_tour.booked_tour_id).remove();
                    toast(`Success! Tour ${booked_tour.tour_name} has been removed`, { type: "success" });
                } else {
                    toast("Something went wrong", { type: "error" });
                }
            },
            (error) => {
                alert(error);
        });
    }

    handleAmountChange = (e) => {
        if(e.target.value > 50){
            e.target.value = 50;
        } else if(e.target.value < 1) {
            e.target.value = 1;
        }
        var amount = parseFloat(this.state.bookedTour.amount);
        var cost = (parseFloat(e.target.value) - amount)*parseFloat(this.state.bookedTour.tour_cost);
        this.props.page.changeTotalCost(cost);
        this.state.bookedTour.amount = e.target.value;
    }
    
    render() {
        return (
            <div className="row" id={this.state.bookedTour.booked_tour_id}>
                <div>
                    <div className="col-xs-2">
                        <div className="cart">
                            <div className="icon-close">
                                <FontAwesomeIcon icon={faTimesCircle}  onClick={()=>this.deleteBookedTour(this.state.bookedTour)}/>
                                </div>
                            <div><strong>Tên Tour/Tour name: </strong><span className="text-right">{this.state.bookedTour.tour_name}</span></div>
                            <div><strong>Địa điểm xuất phát/Departure Location:</strong> <span className="text-right">{this.state.bookedTour.departure_location}</span></div>
                            <div><strong>Đơn giá/Cost:</strong> <span className="text-right">{this.state.bookedTour.tour_cost} USD</span></div>
                            <div><strong>Số Lượng/Number of tours:</strong> <span className="text-right">
                                <input 
                                    type="number" 
                                    id="quantity" 
                                    name="quantity" 
                                    value={this.state.bookedTour.amount} 
                                    min="1" 
                                    max="50"
                                    onChange={this.handleAmountChange}/>
                                </span>
                            </div>
                            <Checkout className="pay-btn"
                            tour={this.state.bookedTour}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item;