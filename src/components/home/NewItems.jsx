import React, {useEffect, useState} from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";
import Nft from "../UI/Nft";

const NewItems = () => {
  const [newItems, setNewItems] = useState([])
  const [loading, setLoading] = useState(true)
  

  async function fetchNewItemsApi() {
    setLoading(true)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
    setNewItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchNewItemsApi()
  }, [])


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
              data-aos="fade-in"
              data-aos-duration="500"
              data-aos-easing="ease-in"
              >New Items</h2>
              <div className="small-border bg-color-2"
              data-aos="fade-in"
              data-aos-duration="500"
              data-aos-easing="ease-in"
              ></div>
            </div>
          </div>
          <OwlCarousel
                      className="owl-theme"
                      loop
                      data-aos="fade-up"
                      data-aos-duration="700"
                      items={4}
                      nav={true}
                      margin={10}
                      dots={false}
                      key={loading}
                      responsive={{
                        0: { items: 1 },
                        572: { items: 2 },
                        992: { items: 3 },
                        1200: { items: 4 },
                      }}
            >        
            {loading ? (
              <>
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
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
            ) :
              <>
              {newItems.map((newItem, index) =>
              <div key={newItem.id}>
                <Nft
                authorId={newItem.authorId}
                authorImage={newItem.authorImage}
                nftId={newItem.nftId}
                nftImage={newItem.nftImage}
                title={newItem.title}
                price={newItem.price}
                likes={newItem.likes}
                expiryDate={newItem.expiryDate}
                />
              </div>
              )}
              </>
          }
        </OwlCarousel>
        </div>
      </div>
    </section>
    
  );
};

export default NewItems;
