import React, { Component } from 'react';
import '../css/ProductDetail.css';
import TouristAttractionDetail from './TouristAttractionDetail'


// const user_id = (props) => {
//     return props.location.aboutProps;
// }

class ProductDetail extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            tour_id : this.props.tour,
            tour_name: this.props.tourName,
            time: this.props.time,
            description: this.props.description,
            tourCost: this.props.tourCost,
            timeStart: this.props.timeStart,
            departureLocation: this.props.departureLocation,
            tour_detail: []
        };
    }

    componentDidMount() {
        const  tour_id  = this.state.tour_id;
        fetch('http://localhost:3001/TouristDetail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },

            body: JSON.stringify({tour_id})
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if (!result) {
                //todo
            }
            else {

                this.setState({ tour_detail: result });
            }
        })
        .catch(error => alert(error))
    }

    
    render() {     
        let tour_list = this.state.tour_detail.map(tour =>{
            return <TouristAttractionDetail key={tour.tourist_attraction_id} tour={tour}/>
        })
        return (
            <div className="main-content">
                <a className="close" onClick={this.props.close}>
                    &times;
                </a>
                <div className="wrapCon">
                <div className="wrap-title">
                    <span>{this.state.tour_name}</span>
                </div>
                <div id="vnt-main">
                    <div className="image-product">
                        <img src="https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg"></img>
                    </div>
                    <div className="box-tour" id="flag1">
                        <div className="title">
                            <span>
                                <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                                Nội dung
                            </span>
                        </div>
                        <div className="intro">
                            <span>{this.state.description}.</span>
                        </div>
                    </div>
                    <div className="box-tour" id="flag2">
                        <div className="title">
                            <span>
                                <i class="fa fa-map-o fa-lg" aria-hidden="true"></i>
                                Lịch trình
                            </span>
                        </div>

                        <div className="content">
                            <table >
                                <tr>
                                    <td className="method">
                                        <strong>Hành trình</strong>
                                    </td>
                                    <td>
                                        <strong>{this.state.tour_name}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="method">
                                        <strong>Lịch trình:</strong>
                                    </td>
                                    <td>
                                        <strong>{this.state.time}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="method">
                                        <strong>Ngày khời hành:</strong>
                                    </td>
                                    <td>
                                        <strong>{this.state.timeStart}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="method">
                                        <strong>Di chuyển:</strong>
                                    </td>
                                    <td>
                                        <strong>{this.state.vehicle}</strong>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>
                <div id="vnt-sidebar">
                    <div className="box-design">
                        <div className="name">
                            <span>{this.state.tour_name}</span>
                        </div>
                        <div className="atr">
                            <ul>
                                <li>
                                    <div className="at">
                                        Mã tour:
                                    </div>
                                    <div>
                                        {this.state.tour_id}
                                    </div>
                                </li>
                                <li>
                                    <div className="at">
                                        Thời gian:
                                    </div>
                                    <div>
                                        {this.state.time}
                                    </div>
                                </li>
                                <li>
                                    <div className="at">
                                        Khởi hành:
                                    </div>
                                    <div>
                                        {this.state.timeStart}
                                    </div>
                                </li>
                                <li>
                                    <div className="at">
                                        Di chuyển:
                                    </div>
                                    <div>
                                        Xe bus
                                    </div>
                                </li>
                                <li>
                                    <div className="at">
                                        Xuất phát:
                                    </div>
                                    <div>
                                        {this.state.departureLocation}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="slide-bar">
                        <div className="boxFix">
                            <div className="price">
                                <div className="txt"> Giá:</div>
                                <div className="number">{this.state.tourCost} USD</div>
                            </div>
                            <div className="dateStart">
                                <input type="text" name="dDate" id="dDate" value={this.state.timeStart} readonly></input>
                            </div>
                            <div className="btn_booking">
                                <button type="button" className="btn_orderTour" onClick={() => this.props.bookClick(this.state.tour_id)}>ĐẶT TOUR</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
                <div className="box-tour">
                    <div>
                        <span className="title-address">
                            <i class="fa fa-address-book-o fa-lg" aria-hidden="true"></i>
                            Địa điểm
                        </span>
                        <div className="content">
                            <table>
                                {tour_list}
                            </table>     
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductDetail;