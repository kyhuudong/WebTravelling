import React, { Component } from 'react';

class TouristAttractionDetail extends Component {
    state = {}
    constructor(props){
        super(props);
        this.state = {
            touristAttraction: props.tour,
            error : null,
            isLoaded : false
        }
    }
    
    render() {
        return (
            <div>
                <tr>
                    <td className="location"> 
                        {this.state.touristAttraction.tourist_attraction_name}
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.state.touristAttraction.description}
                    </td>
                </tr>
            </div>
        )
    }
}

export default TouristAttractionDetail;