import React, {useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Followers from "../components/UI/Followers";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState([])
  const [loading, setLoading] = useState(true)
  const { authorId } = useParams()
  

  async function fetchAuthorApi() {
    setLoading(true)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    setAuthor(data)
    setLoading(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorApi()
  },[])


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {loading ? (
                      <>
                      {
                        <div className="profile_avatar">
                          <Skeleton width="150px" height="150px" borderRadius="50%" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width="200px" />
                              <span className="profile_username"><Skeleton width="100px" /></span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="250px" />
                              </span>
                            </h4>
                          </div>
                        </div>
                      }
                      </>
                    ):
                    <>
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">{author.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </>
                    }
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                        <Skeleton width="150px" height= "40px" />
                        </>
                      ): 
                      <>
                      {<Followers followers={author.followers} />}
                      </>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="tab-1">
                    <div className="row">
                      {loading ? (
                        <>
                        {new Array(8).fill(0).map((_, index) => (
                              <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                    style={{ display: "block", backgroundSize: "cover" }}
                                    key={index}>
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
                    ): (
                      <>
                      {<AuthorItems
                      authorID={author.authorId}
                      authorImage={author.authorImage}
                      nftCollection={author.nftCollection}
                      />}
                      </>
                    )
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
