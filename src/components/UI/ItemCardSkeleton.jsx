import React from 'react';
import Skeleton from './Skeleton';

const ItemCardSkeleton = () => {
    return (
        <div className="skeleton__slide nft__item">
            <i className="fa fa-check new-item__check"></i>
            <Skeleton width={"100%"} height={"350px"} additionalClasses={""} />
            <div className="new-item__skeleton-text-wrap nft__item_info">
            <Skeleton width={"65%"} height={"28px"} />
            <Skeleton width={"25%"} height={"16px"} />
            <Skeleton width={"24px"} height={"12px"} additionalClasses={"nft__item_like"} />
            </div>
        </div>
    )
}

export default ItemCardSkeleton
