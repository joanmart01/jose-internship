import React, { useRef } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CollectionSlider = ({array}) => {

    let sliderRef = useRef(null);
    const next = () => sliderRef.slickNext();
    const previous = () => sliderRef.slickPrev();

    function PrevArrow(props) {
        const {className, style} = props;
        return (
            <div 
                className={className}
                style={{...style, zIndex: "2", display: "block", color:"black", border: "1px solid black", background: "white", left: "16px", borderRadius: "40px", width: "40px", height: "40px"}}
                onClick={previous}                
            >
                <p style={{color: "red"}}>H</p>
            </div>
        )
    }

    function NextArrow(props) {
        const {className, style} = props;
        return (
            <div 
                className={className}
                style={{...style, display: "block", border: "1px solid black", background: "black", right: "16px"}}
                onClick={next}
            />
        )
    }

    function customSlide(props) {
        return (
            <div>
                
            </div>
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

    // var settings = {
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 2/3,
    //     slidesToScroll: 1/6,
    //     slidesPerRow: 6,
    //     nextArrow: <NextArrow />,
    //     prevArrow: <PrevArrow />
    // };

  return (
    <Slider ref={slider => sliderRef=slider} {...settings}>
        {array.map((collection) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id}>
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