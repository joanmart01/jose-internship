import React, { useRef } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/carousel-arrows.css";

const CollectionSlider = ({array}) => {

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
                breakpoint: 990,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

  return (
    <Slider ref={slider => sliderRef=slider} {...settings}>
        {array.map((collection) => (
        // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id}>
        <div className='slide__wrap' key={collection.id}>
            <div className="nft_coll">
                <div className="nft_wrap">
                    <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                </div>
                <div className="nft_coll_pp">
                    <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <Link to="/explore">
                    <h4>{collection.title}</h4>
                    </Link>
                    <span>`ERC-{collection.code}`</span>
                </div>
            </div>
        </div>
        ))}
      
    </Slider>
  )
}

export default CollectionSlider;