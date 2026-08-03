import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";
import "../../css/explore-items.css";

const ExploreItems = () => {

  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [currItems, setCurrentItems] = useState([]);
  const [currLimit, setCurrentLimit] = useState(0);
  const rowSize = 4;
  const initialNum = 8;
  
  const buttRef = useRef(null);
  
  useEffect(()=>{
    fetchItems();    
    setLoading(false);
  }, [])

  async function fetchItems() {
    const promise = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    setAllItems(promise.data);
    setCurrentItems(promise.data.slice(0, initialNum));
    setCurrentLimit(initialNum);
  }

  function loadMoreItems() {
    let nextLimit = currLimit + rowSize;
    setCurrentItems([...currItems, ...allItems.slice(currLimit, nextLimit)]);
    setCurrentLimit(nextLimit);
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      <div style={{display: "flex", flexWrap: "wrap", overflow:"hidden", 
                   width: "100%"}}>
        {loading?
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <ItemCardSkeleton />
          </div>
        ))
        :
        currItems.map((item, index) => (
          <div key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }} >
            <ItemCard item={item}/>
          </div>
        ))
        }
      </div>

      <div className="col-md-12 text-center">
        <button ref={buttRef}
                id="loadmore" 
                className="btn-main lead"
                onClick={loadMoreItems}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
