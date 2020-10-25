import React, { Component } from 'react';

class TourPaid extends Component {
    state = {}
    constructor(props){
        super(props);
        this.state = {
            tourPaid: props.tour,
            error : null,
            isLoaded : false
        }
    }
    
    render() {
        return (
            <div className="row" id={this.state.tourPaid.booked_tour_id}>
                <div>
                    <div className="col-xs-2">
                        <div className="cart">
                            <div><strong>Tên Tour/Tour name: </strong><span className="text-right">{this.state.tourPaid.tour_name}</span></div>
                            <div><strong>Địa điểm xuất phát/Departure Location:</strong> <span className="text-right">{this.state.tourPaid.departure_location}</span></div>
                            <div><strong>Đơn giá/Cost:</strong> <span className="text-right">{this.state.tourPaid.tour_cost} USD</span></div>
                            <div><strong>Số Lượng/Number of tours: </strong>
                            <span className="text-right">{this.state.tourPaid.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TourPaid;