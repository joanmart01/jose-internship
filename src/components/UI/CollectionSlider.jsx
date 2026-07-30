import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/carousel-arrows.css";

const CollectionSlider = ({array, ID}) => {

    let sliderRef = useRef(null);
    const next = () => sliderRef.slickNext();
    const previous = () => sliderRef.slickPrev();

    let st = {width: "40px", height: "40px", background: "white" , 
              opacity: ".75", zIndex: "2", display: "grid", 
              placeItems: "center", color:"black", 
              border: "2px solid lightgray", borderRadius: "40px"};

    function PrevArrow(props) {
        const {className} = props;
        return (
            <div 
                className={className}
                style={{...st, left: "0"}}
                onClick={previous}                
            />
        )
    }

    function NextArrow(props) {
        const {className, style} = props;
        return (
            <div 
                className={className}
                style={{...st, right: "0"}}
                onClick={next}
            />
        )
    }

    var settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 991.33,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575.33,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

  return (
    <div id={ID}>
        <Slider ref={slider => sliderRef=slider} {...settings}>
            {array}
        </Slider>
    </div>
  )
}

export default CollectionSlider;