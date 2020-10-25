import React,{Component} from 'react';
import ContentHome from './ContentHome';
import Pagination from './Pagination';

class WrapperContent extends Component{
    state = {}
    constructor(props){
        super(props);

        this.state = {
            toursAtrraction : [],
            name : '',
            description: '',
            image : '',
            address: '',
            error : null,
            isLoaded : false,
            _page : 0
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }
    
    componentDidMount() {
        fetch('http://localhost:3001/tours')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded : true,
                        toursAtrraction : result
                    });
                    console.log(result);
                },
                (error) => {
                    this.setState({
                        isLoaded : true,
                        error
                    });
                }
            )
    }

    handlePageChange(newPage){
        if(newPage <= this.state.toursAtrraction.length-6){
            this.setState({
                _page : newPage
            });
        };
    }
    
    

    render(){
        let tourist_atraction_list = this.state.toursAtrraction.slice(this.state._page,this.state._page+6).map(tour =>{
            return <ContentHome key={tour.tour_id} img={tour.image} tour={tour}/>
        })
        return(
            <div id="wrapper">
                <div id="titleHome">
                    <h2>
                         <a href="##">Tour giờ vàng</a>
                    </h2>

                </div>
                <div id="contentHome">
                    {tourist_atraction_list}
                    {<Pagination pagination={this.state} toursAtrraction={this.state.toursAtrraction} onPageChange={this.handlePageChange}/>}
                </div>
            </div>
        );
    }
}
export default WrapperContent;