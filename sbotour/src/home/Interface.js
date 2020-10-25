import React,{Component} from 'react';
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../sass/StyleInterface.scss'
import WrapperContent from './WrapperContent'
import SlideShow from './SlideShow'
import '../css/home.css';
import ChatBot from './ChatBot';
import PopupShoppingCart from './PopupShoppingCart'
import PopupTourPaid from './PopupTourPaid'

class Interface extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:''
        };
        this.state.name = sessionStorage["fullname"];
    }
    logout(){
        sessionStorage.removeItem("fullname");
        sessionStorage.removeItem("userID");
        this.setState({
            name: ''
        })
        toast("Logout success!!!", { type: "success" });
    }
    render(){
        return(
            <div className="container">
                <div id="container">
                    <div id="header">
                        <div id="logo" className="logo">
                            <h1 className="tiltle">Lên xe cùng SBOTour, đánh tan ngày hè</h1>
                        </div>
                        <div className="fullname">
                                <div className="name">{this.state.name}</div>
                                <div className="icon-user">
                                    <a href="/login"><i className="fa fa-user-circle-o" title="Đăng nhập/Login"></i></a>
                                    <Popup modal trigger={<i className="fa fa-shopping-cart" title="Xem giỏ hàng của bạn/View your shopping cart"></i>}>
                                        {close => <PopupShoppingCart close={close} />}
                                    </Popup>
                                    <i className="fa fa-sign-out" title="Đăng xuất/Sign out" onClick={()=>this.logout()}></i>
                                </div>
                            </div>
                        <div id="menu-row">
                            <ul>
                                <li>
                                    <a href="#">Du lich trong nước</a>
                                    <ul className="sub-menu">
                                        <li><a href="##">Đà Nẵng</a></li>
                                        <li><a href="##">Hà Nội</a></li>
                                        <li><a href="##">Hồ Chí Minh</a></li>
                                        <li><a href="##">Cần Thơ</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Du lịch nước ngoài</a></li>
                                <li><a href="#">Du lịch tự chọn</a></li>
                                <li><a href="#">Du lịch khách đoàn</a></li>
                                <li><a href="#">Khách sạn</a></li>
                                <li><a href="#">Vé máy bay</a></li>
                                <Popup modal trigger={<li><a href="#">Lịch sử thanh toán</a></li>}>
                                    {close => <PopupTourPaid close={close} />}
                                </Popup>
                                
                            </ul>
                        </div>
                    </div>
                    <div id="middle" className="bg-white">
                        <div id="image">
                            <SlideShow/>
                        </div>
                        <div className="content">
                            <WrapperContent />
                        </div>
                        
                                              
                    </div>
                    <ChatBot/>
                    <div id="footer">
                        <span>Copyright: SBoTour</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Interface;