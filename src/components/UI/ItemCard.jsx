import React from 'react';
import { Link } from 'react-router-dom';
import Timer from './Timer';

const ItemCard = ({item, expirationDate, authorImage}) => {
    return (
        <div className="nft__item">
            <div className="author_list_pp">
                <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                >
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                </Link>
            </div>

            {expirationDate && <Timer expTime={expirationDate}/>}

            <div className="nft__item_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
            </div>
            <div className="nft__item_info">
                <Link to="/item-details">
                    <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
