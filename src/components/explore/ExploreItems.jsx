import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";

const ExploreItems = () => {

  const [allItems, setAllItems] = useState([]);
  const [currItems, setCurrentItems] = useState([]);
  const [currLimit, setCurrentLimit] = useState(0);
  const rowSize = 4;
  const initialNum = 8;

  const [loading, setLoading] = useState(true);
  const [loadMoreEnabled, setLoadMoreEnabled] = useState(true);
  
  useEffect(()=>{
    fetchItems();    
    setLoading(false);
  }, [])

  async function fetchItems(str) {
    let target = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if(str) target += `?filter=${str}`;
    const promise = await axios.get(target);
    setAllItems(promise.data);
    setCurrentItems(promise.data.slice(0, initialNum));
    setCurrentLimit(initialNum);
  }

  function loadMoreItems() {
    let nextLimit = currLimit + rowSize;
    setCurrentItems([...currItems, ...allItems.slice(currLimit, nextLimit)]);
    setCurrentLimit(nextLimit);
    setLoadMoreEnabled(nextLimit < allItems.length-1);  
  }

  function filterItems(val) {
    fetchItems(val);
  }

  return (
    <>
      <div>
        <select id="filter-items" 
                defaultValue="" 
                onChange={(event)=>filterItems(event.target.value)}>
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
        currItems.map((item) => (
          <div key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }} >
            <ItemCard item={item}/>
          </div>
        ))
        }
      </div>

      <div className="col-md-12 text-center">
        {loadMoreEnabled?
        <button id="loadmore" 
                className="btn-main lead"
                onClick={loadMoreItems}>
          Load more
        </button>
        :
        <></>
        }
      </div>
    </>
  );
};

export default ExploreItems;
