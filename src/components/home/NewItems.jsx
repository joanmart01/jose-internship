import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CollectionSlider from "../UI/CollectionSlider";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    fetchItems();
    // document.querySelector("#new-items-slider").querySelector(".slick-list").classList.add("new-items-list");
    // document.getElementById("new-items-slider").querySelector(".slick-list").classList.add("new-items-list");
    setLoading(false);
  }, [])


  async function fetchItems() {
    const promise = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setItems(promise.data);
  }


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <CollectionSlider
          id = {"new-items-slider"} 
          array={loading?
            new Array(4).fill().map((_, index)=> (
              <div className="slide__wrap" key={index}>
                <div className="skeleton__slide nft__item">
                  <i className="fa fa-check new-item__check"></i>
                  <div className="skeleton new-item__nft-skeleton"></div>                  
                  <div className="new-item__skeleton-text-wrap">
                    <div className="skeleton new-item__top-text-skeleton"></div>
                    <div className="skeleton new-item__bottom-text-skeleton"></div>
                    <div className="nft__item_like skeleton new-item__like-skeleton"></div>
                  </div>
                </div>
              </div>
            ))
            
            : 
            items.map((it)=> (
            <div className="slide__wrap" key={it.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={it.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Timer expTime={it.expiryDate}/>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={it.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{it.title}</h4>
                  </Link>
                  <div className="nft__item_price">{`${it.price} ETH`}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{it.likes}</span>
                  </div>
                </div>
              </div>
            </div>
            ))
          } />

        </div>
      </div>
    </section>
  );
};

export default NewItems;
