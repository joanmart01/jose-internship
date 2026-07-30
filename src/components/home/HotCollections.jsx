import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import CollectionSlider from "../UI/CollectionSlider";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchCollections();
    setLoading(false);
  }, [])

  async function fetchCollections() {
    const promise = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"); 
    setCollections(promise.data);
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {<CollectionSlider ID="hot-collections-slider" className="col-slide"
            array={loading?
              new Array(4).fill().map((elem, index)=> (
                <div className='slide__wrap' key={index}>
                    <div className="nft_coll skeleton__slide">
                        <Skeleton width={"100%"} height={"140px"} additionalClasses={"nft_wrap"} />
                          <Skeleton width={"40px"} height={"40px"} additionalClasses={"nft_coll_pp img__skeleton--wrapper"} />
                          <div className='check__skeleton--wrap'>
                            <i className="fa fa-check check__skeleton"></i>
                          </div>
                        <div className="nft_coll_info">
                            <Skeleton width={"80px"} height={"15px"} />
                            <Skeleton width={"50px"} height={"15px"} />
                        </div>
                    </div>
                </div>
            ))
            :
              collections.map((collection) => (
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
              ))
             }/> }
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
