import React, { Component } from 'react';
import '../css/cart.css'
import TourPaid from './TourPaid'

class ShoppingCart extends Component {
    state = {};
    constructor(props){
        super(props);
        this.state = {
            tourPaids : [],
            error : null,
            isLoaded : false
        }
    }
    componentDidMount() {
        const user_id = sessionStorage["userID"];
        if(user_id) {
            fetch('http://localhost:3001/getTourPaid', {
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
                        tourPaids : result
                    });
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
    render() {
        let tour_paid_list = this.state.tourPaids.map(tour =>{
            return <TourPaid key={tour.tour_id} tour={tour}/>
        })
        return (
            <div>
                <div className="inner-container">
                    <div className="box-popup">
                        <div className="list">
                            {tour_paid_list}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart