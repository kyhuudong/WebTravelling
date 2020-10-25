import React,{Component} from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './ProductDetail'
import Popup from 'reactjs-popup';

class ContentHome extends Component{
    state = {}
    constructor(props){
        super(props);
        this.state = {
            tourID: props.tour.tour_id,
            name : props.tour.tour_name,
            description: props.tour.description,
            img: props.img,
            timeStart : this.formatDate(new Date(props.tour.min)),
            schedules: this.getDay(props.tour.min, props.tour.max),
            departureLocation: props.tour.departure_location,
            tourCost : props.tour.tour_cost,
            error : null,
            isLoaded : false,
            open: false
        }
    }
    handleClick() {
        
    }

    formatDate(date) {
        var year = date.getFullYear(),
            month = date.getMonth() + 1, // months are zero indexed
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
            minuteFormatted = minute < 10 ? "0" + minute : minute,
            morning = hour < 12 ? "AM" : "PM";
    
        return day + "/" + month + "/" + year + " " + hourFormatted + ":" +
                minuteFormatted + morning;
    }

    getDay(first, second){
        var firstDate = new Date(first);
        var secondDate = new Date(second);
        var day = Math.floor((secondDate-firstDate)/(24 * 60 * 60 * 1000))
        return  (day + 1) + " ngày, " + day + " đêm";
    }

    bookTour(tour_id, tour_name){
        const user_id = sessionStorage["userID"];
        const amount = 1;
        const status = "booked";
        if(user_id){
              fetch('http://localhost:3001/addToshoppingCart', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({ user_id, tour_id, amount, status })
              })
              .then(response => response.json())
              .then(result => {
                if(result === "success"){
                    toast(`Success! Tour ${tour_name} has been added. Check your shopping cart`, { type: "success" });
                } else {
                    toast("Something went wrong! Please try later", { type: "error" });
                } 
              })
              .catch(error => toast("Something went wrong! Please try later", { type: "error" }));
        } else {
            if(window.confirm("Vui lòng đăng nhập để sử dụng chức năng này.")){
                window.location = "/login"
            }
        }
    }

    render(){

        return(
            <div id="owl-item " >
                <div id="item">
                    <div id="mda-box-type">
                        <div id="mda-box-img">
                            <Popup modal trigger={<img id="loadImg" alt={this.state.name} src={process.env.PUBLIC_URL+"/image/"+this.state.img}></img>} className="popup-detail">
                                {close => <ProductDetail tour={this.state.tourID} tourName={this.state.name} description={this.state.description}
                                    tourCost={this.state.tourCost} timeStart={this.state.timeStart} time={this.state.schedules}  bookClick={this.bookTour} 
                                    departureLocation={this.state.departureLocation} close={close} />}
                            </Popup>
                        </div>
                        <div id="mda-box-info">
                            <h3 id="mda-name">
                                <a className="tour-name" title={this.state.name} href="##">{this.state.name}</a>
                                <button className="button-book" onClick={()=>this.bookTour(this.state.tourID, this.state.name)}>Book</button>
                            </h3>
                        </div>
                        <div id="mda-box-wrap" className="box-wrap">
                            <p id="mda-time">
                                Thời gian: {this.state.schedules}
                            </p>
                            <p id="mda-schedule">
                                Khởi hành: {this.state.timeStart} <br/>Địa điểm: {this.state.departureLocation}
                            </p>
                            <p id="mda-price">
                                <span id="">Giá: {this.state.tourCost} USD</span>              
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ContentHome;