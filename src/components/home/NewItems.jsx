import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CollectionSlider from "../UI/CollectionSlider";
import Timer from "../UI/Timer";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    fetchItems();
    setLoading(false);
  }, [])

  async function fetchItems() {
    const promise = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setItems(promise.data);
  }


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <CollectionSlider
          ID = "new-items-slider" 
          array={loading?
            new Array(4).fill().map((_, index)=> (
              <div className="slide__wrap" key={index}>
                <ItemCardSkeleton />
              </div>
            ))
            
            : 
            items.map((it)=> (
              <div className="slide__wrap" key={it.id}>
                <ItemCard className={"slide__wrap"} item={it} key={it.id} />
              </div>
            ))
          } />

        </div>
      </div>
    </section>
  );
};

export default NewItems;
