import React from 'react';
import {Slide} from 'react-slideshow-image'
import '../css/SlideShow.css'
import img1 from './Component-image/nuithantai.jpg'
import img2 from './Component-image/bana.jpg'
import img3 from './Component-image/hoi_an.jpg'
import img4 from './Component-image/vinpeart.jpg'
const propeties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators : true,
    arrows : true,
}
const SlideShow = () => {
    return (
        <div className="containerSlide">
            <Slide{...propeties}>
                <div className="each-slide">
                    <div>
                        <img alt="img1" src={img1}/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img alt="img2" src={img2}/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img  alt="img3"src={img3}/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img alt="img4"src={img4}/>
                    </div>
                </div>
                
            </Slide>
             
        </div>
    )
}
export default SlideShow;
