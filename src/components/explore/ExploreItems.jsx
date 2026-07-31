import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";
import "../../css/explore-items.css";

const ExploreItems = () => {
  
  const [rows, setRows] = useState(2);
  const rowHeight = 477.33;
  const initHeight = rowHeight*rows;
  const [areaHeight, setHeight] = useState(initHeight);
  const [cols, setCols] = useState(0);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const areaRef = useRef(null);
  const buttRef = useRef(null);
  
  useEffect(()=>{
    fetchItems();
    setLoading(false);
  }, [])

  useEffect(()=> {
    if(areaRef.current) {
      const observer = new ResizeObserver((entries)=>{
        for(let entry of entries)
          calcColumns(entry.contentRect.width);
      })
      observer.observe(areaRef.current);
    }
  }, [])

  async function fetchItems() {
    const promise = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    setItems(promise.data);
  }

  /* When pg width is 991.33 -> box width is 903.1875 -> cols change from 4 to 2
    When pg width is 575.33 -> box width is 500 -> cols change from 2 to 1 */
  function calcColumns(width) {
    let currCols = width>903.18 ? 4
                  : width>500 ? 2
                  : 1;
    let diff = currCols - cols;
    setCols(currCols);
    if(diff>0 && areaHeight > initHeight) reduceAreaHeight(diff===1? 1 : 2);
  }

  function reduceAreaHeight(num){
    setHeight(areaHeight - num*rowHeight);
    let currRows = rows - num;
    setRows(currRows);
    detLoadButtonDisabled(currRows);
  }

  function extendAreaHeight(){
    setHeight(areaHeight + rowHeight);
    let currRows = rows + 1;
    setRows(currRows);
    detLoadButtonDisabled(currRows);
  }

  function detLoadButtonDisabled(currRows){
    if(buttRef.current)
      buttRef.current.disabled = currRows*cols >= 16;
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

      <div ref={areaRef} 
           style={{display: "flex", flexWrap: "wrap", overflow:"hidden", 
                   width: "100%", height: areaHeight + "px"}}>
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
        items.map((item) => (
          <div key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }} >
            <ItemCard item={item} key={item.id} />
          </div>
        ))
        }
      </div>

      <div className="col-md-12 text-center">
        <button ref={buttRef}
                id="loadmore" 
                className="btn-main lead"
                onClick={extendAreaHeight}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
