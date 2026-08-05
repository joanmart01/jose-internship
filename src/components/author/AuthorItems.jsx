import React from "react";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";
import ItemCard from "../UI/ItemCard";

const AuthorItems = ({collection, imgAddress}) => {

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

          {collection?
            collection.map((item) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                <ItemCard item={item}
                          authorImage={imgAddress} />
              </div>
            ))
          :
            <div className="row author-items__skeleton-row">
              {new Array(8).fill().map((_, index)=> <ItemCardSkeleton width={"24%"} key={index}/>)}
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
