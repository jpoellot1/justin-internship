import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton"
import Nft from "../UI/Nft";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [itemCount, setItemCount] = useState(8)

  async function fetchExploreItemsApi() {
    setLoading(true)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`)
    setExploreItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchExploreItemsApi()
  },[])

  async function filterItems(filter) {
    if(filter === "price_low_to_high"){
      const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
      setExploreItems(data)
    }
    if(filter === "price_high_to_low"){
      const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
      setExploreItems(data)
    }
    if(filter === "likes_high_to_low"){
      const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
      setExploreItems(data)
    }
  }

  function loadMore(event) {
    event.preventDefault();
    setItemCount((prevCount) => prevCount + 4)
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
          data-aos="fade-in"
          data-aos-duration="500"
          data-aos-easing="ease-in"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              key={index}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton height="50px" width="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                      </div>
                    </div>
                  </div>
                  <Skeleton height="230px" width="230px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="180px" height="30px" />
                  <br />
                  <>
                    <Skeleton width="100px" height="20px" />
                    <div className="nft__item_like">
                      <Skeleton width="30px" height="15px" />
                    </div>
                  </>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {exploreItems.slice(0, itemCount).map((exploreItem, index) => (
            <div
              key={exploreItem.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              data-aos="fade-in"
              data-aos-duration="500"
              data-aos-easing="ease-in"
            >
              <Nft
                authorId={exploreItem.authorId}
                authorImage={exploreItem.authorImage}
                nftId={exploreItem.nftId}
                nftImage={exploreItem.nftImage}
                title={exploreItem.title}
                price={exploreItem.price}
                likes={exploreItem.likes}
                expiryDate={exploreItem.expiryDate}
              />
            </div>
          ))}
        </>
      )}
      {itemCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-easing="ease-in"
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
