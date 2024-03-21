"use client"
import img1 from "../../public/img1.png"
import ReactStars from "react-rating-stars-component";
import Header from "./Header";
import ProductSlider from "./ProductSlider";
import style from './styles.module.css'
import { IoMdStar } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import starimg from '../../public/star.png'
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import hands from '../../public/hands.png'
import brand from '../../public/brand.png'
import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaHand } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { GiCrumblingBall } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";
import { PiGiftFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { BsBox2 } from "react-icons/bs";
import ricon from '../../public/ricon.jpg';
import { useParams } from 'react-router-dom';
import dotenv from 'dotenv';
 dotenv.config();
export default function Home() {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState()
  const [review, setReview] = useState()
  const [productId, setProductId] = useState();
  console.log(`Database name is ${process.env.APIKEY} ${process.env.APISECERT}`);

  const apiKey = 'ck_503e81308c5e908b9050b367e98d837395f578c4'; // Replace 'YOUR_API_KEY' with your actual API key
  const apiSecret = 'cs_1ed4558d5120ba67905426b5f46f8a38efb47035'; // Replace 'YOUR_API_SECRET' with your actual API secret
  const apiUrl = `https://kingdomcollection.uk/wp-json/wc/v3/products`; // Adjust the URL as needed
  const reviewUrl = `https://kingdomcollection.uk/wp-json/wc/v3/products/reviews/?520`;

 
  // Concatenate API key and secret with a colon
  const credentials = `${apiKey}:${apiSecret}`;

  // Base64 encode the credentials
  const base64Credentials = btoa(credentials);

  // Set up the request headers
  const headers = new Headers({
    'Authorization': `Basic ${base64Credentials}`,
    'Content-Type': 'application/json'
  });

  // Set up the fetch request
  const requestOptions = {
    method: 'GET',
    headers: headers,
  };


  // Make the fetch request
  useEffect(() => {
     // Parse the query string from the URL
     const queryParams = new URLSearchParams(window.location.search);
     // Get the value of the 'product_id' parameter
     const id = queryParams.get('product_id');
     // Update the state with the product ID
     setProductId(id);
     console.log("id",id);
    fetch(`https://kingdomcollection.uk/wp-json/wc/v3/products/${id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(products => {
        console.log('Products:', products);
        setData(products);
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
    //reviews
    fetch(`https://kingdomcollection.uk/wp-json/wc/v3/products/reviews/?${id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(Review => {
        console.log('reviews:', Review);
        setReview(Review);
      })
      .catch(error => {
        console.error('There was a problem with the fetch request:', error);
      });
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    // Call handleResize on initial render
    handleResize();

    // Add event listener to listen for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleDiv = () => {
    setOpen(!open)
  }
  const handleDiv2 = () => {
    setOpen2(!open2)
  }
  const handleDiv3 = () => {
    setOpen3(!open3)
  }
 
  return (
    data ? <>
      <Header />

      {
        isMobile ?
          <>

            <div className={style.main} >
              <div className={style.carousel} style={{ width: '100%', height: '20rem' }}>
                <ProductSlider imagesdata={data.images} />
                <div className={style.info} style={{ width: '100%', marginLeft: '.1px' }}>
                  <div className={style.limited}>Limited Stock! Order Now.</div>
                  <div className={style.price}>£{data?.price}</div>
                  <div className={style.choose}>
                    Choose from multiple variations
                  </div>
                  <div className={style.des}>{data?.name}</div>
                  <div className={style.stars}>
                  <ReactStars
                          count={5}
                          size={20}
                          activeColor="#222222"
                          value={5}
                          color='#222222'
                        />
                  </div>
                  <div className={style.check}>
                    <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                    <p className={style.checkP}> Arrives soon! Get it by </p>
                    {/* <span style={{ borderBottom: '1px dashed black' }}>06-07 Mar</span> if you order today */}
                  </div>
                  <div className={style.check} style={{ marginTop: '-1rem' }}>
                    <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                    <p className={style.checkP}> Returns & exchanges accepted </p>
                  </div>
                  <div>
                    <p style={{}}>Style<sup style={{ color: '#A61A2E', fontSize: '10px' }}> <IoMdStar /></sup></p>
                  </div>
                  <div> <select id="color-selector" className={style.select}>
                    <option value=" " selected=" ">
                      choose an option
                    </option>
                    {data?.attributes[0].options ? data.attributes[0].options.map((item) => (

                      <option value={item}>
                        {item}
                      </option>

                    )) : null
                    }
                  </select>
                  </div>
                  <div>
                    <button className={style.cartBtn}>
                      Add to cart
                    </button>
                  </div>
                  <div className={style.starReview}>
                    <Image src={starimg} width={60} height={35} />
                    <p className={style.checkP}><span style={{ fontFamily: 'bold', fontSize: '1rem' }}>Star Product!</span> This product consistently earned 5-star reviews, dispatched on time, and</p>
                  </div>

                  <div>
                    <h2 className={style.toggleBtn} onClick={handleDiv}>Item details <span style={{ marginLeft: '13rem' }}>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                      open ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '-1.2rem', gap: '10px' }}>
                          <FaHand />
                          <p>Handmade</p>
                        </div>
                        <div style={{ display: 'flex', fontSize: '1rem', color: '#222222', flexDirection: 'row', alignItems: 'center', marginBottom: '-1.2rem', gap: '10px' }}>
                          <IoLocationSharp style={{ fontSize: '1.2rem' }} />
                          <p>Delivery from India</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '-1.2rem', gap: '10px' }}>
                          <GiCrumblingBall style={{ fontSize: '1.2rem' }} />
                          <p>Materials: Iron, Liner, Chin straps, Wooden Stand</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', marginBottom: '-1.4rem', gap: '10px' }}>
                          <TbRulerMeasure style={{ paddingTop: '1rem', fontSize: '1.2rem' }} />
                          <div>
                            <p>Width: 9 inches   </p>
                            <p>Height: 10 inches </p>
                            <p>Depth: 10 inches  </p>
                          </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                          <PiGiftFill style={{ fontSize: '1.2rem' }} />
                          <p>Gift wrapping available <span style={{ fontSize: '1rem', borderBottom: '1px dashed black', cursor: 'pointer' }}>See details</span></p>
                        </div>
                        <div >
                          Great King Leonidas Sparta 300 Movie Helmet Battle Damage Edition Best For Valentine's Gift For Him

                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '-1px', flexDirection: 'column' }}>
                          <span>Helmet Comes With Wooden Stand</span> <br />
                          <span>Material: Steel/Iron</span><br />
                          <span>Size: Height 10 Inches Approx</span><br />
                          <span>Standard Size Fits Almost All Adults</span><br />
                          <a href="www.etsy.com/shop/Kingdom Collection" style={{ color: '#222222' }}>www.etsy.com/shop/Kingdom Collection</a>


                        </div>
                      </div> : null
                    }
                  </div>
                  <div>
                    <h2 className={style.toggleBtn} onClick={handleDiv2}>Delivery and return policies <span style={{ marginLeft: '7rem' }}>{open2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                      open2 ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                          <MdDateRange />
                          <p>Order today to get by <span style={{ fontSize: '1rem', borderBottom: '1px dashed gary', cursor: 'pointer' }}>06-07 Mar</span></p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                          <BsBox2 />
                          <p> <span style={{ fontSize: '.9rem', borderBottom: '1px dashed gay', cursor: 'pointer' }}>Returns & exchanges accepted </span> Within 30 days</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '.9rem', color: '#222222', alignItems: 'center', gap: '10' }}>
                          <Image src={hands} width={50} height={50} />
                          <p>Kindom Collection Purchase Protection: Shop confidently on Kingdom Collection knowing if something goes wrong with an order, we've got your back for all eligible purchases - <span style={{ fontSize: '1rem', borderBottom: '1px solid black', cursor: 'pointer' }}>see programme terms</span></p>
                        </div>
                      </div> : null
                    }
                  </div>
                  <div>
                    <h2 className={style.toggleBtn} onClick={handleDiv3}>Meet your Brand <span style={{ paddingLeft: '10rem' }}>{open3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                    {
                      open3 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div>
                          <Image src={brand} width={90} height={80} />
                        </div>
                        <div style={{ fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"' }}>
                          <p style={{ fontSize: '1.4rem', color: '#222222' }}>Kingdom Collection</p>
                          <p style={{ fontSize: '1rem' }}>We are here to help you with your queries and suggestions!</p>
                          <p className={style.toggleBtn}> <span style={{ paddingRight: '1rem', fontSize: '.9rem', width: '3rem' }}><FaRegHeart /> </span> Follow me on instagram</p>
                          <button className={style.cartBtn} style={{ backgroundColor: '#fff', color: 'black', border: '2px solid black' }}>
                            Message Kingdom Collection
                          </button>
                        </div>

                      </div>
                        : null
                    }
                  </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem' }}>
                  <p style={{ fontSize: '1.6rem' }} className={style.text}> 317 reviews</p>
                  <div className={style.stars}>
                  <ReactStars
                          count={5}
                          size={30}
                          activeColor="#222222"
                          value={5}
                          color='#222222'
                        />

                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem' }}>
                  <p style={{ fontSize: '1rem' }} className={style.text}> Reviews for this item </p>
                  <p style={{ fontSize: '1rem', marginLeft: '1rem', borderRadius: '50%', background: '#EAEAEA', padding: '5px' }}> {review?.length}</p>

                </div>
                <div style={{ backgroundColor: '#EAEAEA', width: '90%', height: '2px', marginLeft: '1rem', position: 'relative' }}>
                  <div style={{ backgroundColor: 'black', width: '30%', height: '2px', position: 'absolute' }}>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div>.</div>
                  <div >
                    <select style={{ marginTop: '1rem', width: '13rem', height: '2.5rem', borderRadius: '12px', border: 'none', background: '#E9E9E9', padding: '3px', cursor: 'pointer' }} className={style.text}>
                      <option>Sort by:Suggent</option>
                      <option>Suggent</option>
                      <option>Most recent</option>
                    </select>
                  </div>
                </div>
                {
                 review? review.map((item, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem', width: '96%' }} key={index}>
                      <div style={{ display: 'flex', width: '65%', flexDirection: 'column', gap: '5px' }}>
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="black"
                          value={item.rating}
                          color='#fff'
                        />
                        <div className={style.text} style={{ fontSize: '.8rem' }}>
                          {item.review.substring(3, item.review.length - 5)}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', width: '25rem' }}>
                          <div><Image src={ricon} width={30} height={30} style={{ borderRadius: '50%' }} /></div>
                          <div style={{ borderBottom: '1px solid #222222', cursor: 'pointer' }} className={style.text}>{item.reviewer
                          }</div>
                          <div className={style.text}> {item.date_created.substring(0, 10)}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                          <AiFillLike />
                          <p> Helpful?</p>
                        </div>

                      </div>

                      <div style={{ display: 'flex', width: '35%', flexDirection: 'column', marginLeft: '2rem' }}>

                        <div>
                          <p style={{ display: 'flex', alignSelf: 'flex-start', marginBottom: '.1rem', fontSize: '.8rem' }}
                            className={style.text}>Item quality</p>
                          <div style={{ backgroundColor: '#EAEAEA', width: '80%', height: '8px', position: 'relative', borderRadius: '15px', display: 'flex', flexDirection: 'row' }}>
                            {item.itemQuality == '100%' ? <div style={{ backgroundColor: 'black', width: '100%', height: '8px', position: 'absolute', borderRadius: '15px' }}>
                              <div style={{ position: 'absolute', right: '-2rem', top: '-.3rem' }}>5.0</div>
                            </div> : <div style={{ backgroundColor: 'black', width: '80%', height: '8px', position: 'absolute', borderRadius: '15px' }}>
                              <div style={{ position: 'absolute', right: '-3rem', top: '-.3rem' }}>4.0</div>
                            </div>}

                          </div>
                        </div>
                        <div>
                          <p style={{ display: 'flex', alignSelf: 'flex-start', marginBottom: '.1rem', fontSize: '.8rem' }} className={style.text}>Item quality</p>
                          <div style={{ backgroundColor: '#EAEAEA', width: '80%', height: '8px', position: 'relative', borderRadius: '15px', display: 'flex', flexDirection: 'row' }}>
                            <div style={{ backgroundColor: 'black', width: '100%', height: '8px', position: 'absolute', borderRadius: '15px' }}>
                              <div style={{ display: 'felx', position: 'absolute', right: '-2rem', top: '-.3rem' }}>5.0</div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  )):<h1>...</h1>
                }
                <div className={style.text}>[load_more_reviews]</div>
                <div className={style.text}>Photos from reviews</div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Image src={img1} width={150} height={150} style={{ borderRadius: '12px' }} />
                  <Image src={img1} width={150} height={150} style={{ borderRadius: '12px' }} />
                  <Image src={img1} width={150} height={150} style={{ borderRadius: '12px' }} />
                  <Image src={img1} width={150} height={150} style={{ borderRadius: '12px' }} />

                </div>
                <div className={style.text}>Explore related searches</div>
                <div className={style.text} style={{ fontSize: '.9rem' }}>[woocommerce_related_products]</div>
                <div className={style.text}>Explore more related searches</div>
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <button style={{ display: 'flex', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9', }} className={style.text}>
                    Gift for Boysfriends
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gift for Dad
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gift for Husband
                  </button>

                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gift for Him
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Personalised Gift
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                    Gifts
                  </button>
                </div>
              </div>
            </div>



          </>
          :
          <div>
            <div className={style.main}>
              <div className={style.carousel}>
                <ProductSlider imagesdata={data.images} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem' }}>
                  <p style={{ fontSize: '1.6rem' }} className={style.text}> 317 reviews</p>
                  <div className={style.stars}>
                  <ReactStars
                          count={5}
                          size={30}
                          activeColor="#222222"
                          value={5}
                          color='#222222'
                        />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '2rem' }}>
                  <p style={{ fontSize: '1rem' }} className={style.text}> Reviews for this item </p>
                  <p style={{ fontSize: '1rem', marginLeft: '1rem', borderRadius: '50%', background: '#EAEAEA', padding: '5px' }}> {review?.length}</p>

                </div>
                <div style={{ backgroundColor: '#EAEAEA', width: '90%', height: '2px', marginLeft: '1rem', position: 'relative' }}>
                  <div style={{ backgroundColor: 'black', width: '30%', height: '2px', position: 'absolute' }}>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div>.</div>
                  <div >
                    <select style={{ marginTop: '1rem', width: '13rem', height: '2.5rem', borderRadius: '12px', border: 'none', background: '#E9E9E9', padding: '3px', cursor: 'pointer' }} className={style.text}>
                      <option>Sort by:Suggent</option>
                      <option>Suggent</option>
                      <option>Most recent</option>
                    </select>
                  </div>
                </div>
                {
                 review? review.map((item, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '1rem', borderBottom: '1px solid #EAEAEA', marginBottom: '1rem' }} key={index}>
                      <div style={{ display: 'flex', width: '65%', flexDirection: 'column', gap: '10px' }}>
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="black"
                          value={item.rating}
                          color='#fff'
                        />
                        <div className={style.text}>
                          {item.review.substring(3, item.review.length - 5)}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                          <div><Image src={ricon} width={30} height={30} style={{ borderRadius: '50%' }} /></div>
                          <div style={{ borderBottom: '1px solid #222222', cursor: 'pointer' }} className={style.text}>{item.reviewer}</div>
                          <div className={style.text}> {item.date_created.substring(0, 10)}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                          <AiFillLike />
                          <p> Helpful?</p>
                        </div>

                      </div>

                      <div style={{ display: 'flex', width: '35%', flexDirection: 'column', marginLeft: '2rem' }}>

                        <div>
                          <p style={{ display: 'flex', alignSelf: 'flex-start', marginBottom: '.1rem' }}
                            className={style.text}>Item quality</p>
                          <div style={{ backgroundColor: '#EAEAEA', width: '80%', height: '8px', position: 'relative', borderRadius: '15px', display: 'flex', flexDirection: 'row' }}>
                            {item.itemQuality == '100%' ? <div style={{ backgroundColor: 'black', width: '100%', height: '8px', position: 'absolute', borderRadius: '15px' }}>
                              <div style={{ position: 'absolute', right: '-2rem', top: '-.3rem' }}>5.0</div>
                            </div> : <div style={{ backgroundColor: 'black', width: '80%', height: '8px', position: 'absolute', borderRadius: '15px' }}>
                              <div style={{ position: 'absolute', right: '-4.4rem', top: '-.3rem' }}>4.0</div>
                            </div>}

                          </div>
                        </div>
                        <div>
                          <p style={{ display: 'flex', alignSelf: 'flex-start', marginBottom: '.1rem' }} className={style.text}>Item quality</p>
                          <div style={{ backgroundColor: '#EAEAEA', width: '80%', height: '8px', position: 'relative', borderRadius: '15px', display: 'flex', flexDirection: 'row' }}>
                            <div style={{ backgroundColor: 'black', width: '100%', height: '8px', position: 'absolute', borderRadius: '15px' }}>
                              <div style={{ display: 'felx', position: 'absolute', right: '-2rem', top: '-.3rem' }}>5.0</div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  )):<h1>...</h1>
                }
              </div>
              <div className={style.info}>
                <div className={style.limited}>Limited Stock! Order Now.</div>
                <div className={style.price}>£{data?.price}</div>
                <div className={style.choose}>
                  Choose from multiple variations
                </div>
                <div className={style.des}> <p>{data?.name}</p></div>
                <div className={style.stars}>
                <ReactStars
                          count={5}
                          size={20}
                          activeColor="#222222"
                          value={5}
                          color='#222222'
                        />
                </div>
                <div className={style.check}>
                  <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                  <p className={style.checkP}>Arrives soon! Get it by  </p>
                </div>
                <div className={style.check} style={{ marginTop: '-1rem' }}>
                  <IoCheckmark style={{ color: '#5379DE', fontSize: '20px' }} />
                  <p className={style.checkP}>Returns & exchanges accepted</p>
                </div>
                <div>
                  <p style={{}}>Style<sup style={{ color: '#A61A2E', fontSize: '10px' }}> <IoMdStar /></sup></p>
                </div>
                <div>
                  <select id="color-selector" className={style.select} >
                    <option>
                      Color
                    </option>
                    {data?.attributes[0].options ? data.attributes[0].options.map((item) => (

                      <option value={item}>
                        {item}
                      </option>

                    )) : <option value={data?.attributes[0].option}>{data?.attributes[0].option}</option>
                    }
                  </select>

                </div>
                <div>
                  <button className={style.cartBtn} >
                    Add to cart
                  </button>
                </div>
                <div className={style.starReview}>
                  <Image src={starimg} width={60} height={35} />
                  <p className={style.checkP}><span style={{ fontFamily: 'bold', fontSize: '1rem' }}>Star Product!</span> This product consistently earned 5-star reviews, dispatched on time, and</p>
                </div>

                <div>
                  <h2 className={style.toggleBtn} onClick={handleDiv}>Item details <span style={{ marginLeft: '20rem' }}>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                  {
                    open ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '-1.2rem', gap: '10px' }}>
                        <FaHand />
                        <p>Handmade</p>
                      </div>
                      <div style={{ display: 'flex', fontSize: '1rem', color: '#222222', flexDirection: 'row', alignItems: 'center', marginBottom: '-1.2rem', gap: '10px' }}>
                        <IoLocationSharp style={{ fontSize: '1.2rem' }} />
                        <p>Delivery from India</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', marginBottom: '-1.2rem', gap: '10px' }}>
                        <GiCrumblingBall style={{ fontSize: '1.2rem' }} />
                        <p>Materials: Iron, Liner, Chin straps, Wooden Stand</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', marginBottom: '-1.4rem', gap: '10px' }}>
                        <TbRulerMeasure style={{ paddingTop: '1rem', fontSize: '1.2rem' }} />
                        <div>
                          <p>Width: 9 inches</p>
                          <p>Height: 10 inches</p>
                          <p>Depth: 10 inches</p>
                        </div>

                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                        <PiGiftFill style={{ fontSize: '1.2rem' }} />
                        <p>Gift wrapping available <span style={{ fontSize: '1rem', borderBottom: '1px dashed black', cursor: 'pointer' }}>See details</span></p>
                      </div>
                      <div >
                        Great King Leonidas Sparta 300 Movie Helmet Battle Damage Edition Best For Valentine's Gift For Him
                      </div>
                      <div style={{ marginTop: '2rem', display: 'flex', gap: '-1px', flexDirection: 'column' }}>
                        <span>Helmet Comes With Wooden Stand</span> <br />
                        <span>Material: Steel/Iron</span><br />
                        <span>Size: Height 10 Inches Approx</span><br />
                        <span>Standard Size Fits Almost All Adults</span><br />
                        <a href="www.etsy.com/shop/Kingdom Collection" style={{ color: '#222222' }}>www.etsy.com/shop/Kingdom Collection</a>


                      </div>
                    </div> : null
                  }
                </div>
                <div>
                  <h2 className={style.toggleBtn} onClick={handleDiv2}>Delivery and return policies <span style={{ marginLeft: '13rem' }}>{open2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                  {
                    open2 ? <div style={{ fontFamily: '"Graphik Webfont", "-apple-system", "Helvetica Neue", "Droid Sans", "Arial", "sans-serif"', }}>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                        <MdDateRange />
                        <p>Order today to get by <span style={{ fontSize: '1rem', borderBottom: '1px dashed gary', cursor: 'pointer' }}>06-07 Mar</span></p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1.2rem', color: '#222222', alignItems: 'center', gap: '10px' }}>
                        <BsBox2 />
                        <p> <span style={{ fontSize: '.9rem', borderBottom: '1px dashed gay', cursor: 'pointer' }}>Returns & exchanges accepted </span> Within 30 days</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', fontSize: '.9rem', color: '#222222', alignItems: 'center', gap: '10' }}>
                        <Image src={hands} width={50} height={50} />
                        <p>Kindom Collection Purchase Protection: Shop confidently on Kingdom Collection knowing if something goes wrong with an order, we've got your back for all eligible purchases - <span style={{ fontSize: '1rem', borderBottom: '1px solid black', cursor: 'pointer' }}>see programme terms</span></p>
                      </div>
                    </div> : null
                  }
                </div>
                <div>
                  <h2 className={style.toggleBtn} onClick={handleDiv3}>Meet your Brand <span style={{ paddingLeft: '17rem' }}>{open3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></h2>
                  {
                    open3 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div>
                        <Image src={brand} width={90} height={80} />
                      </div>
                      <div style={{ fontFamily: '"Guardian-EgypTT", "Charter", "Charter Bitstream", "Cambria", "Noto Serif Light", "Droid Serif", "Georgia", "serif"' }}>
                        <p style={{ fontSize: '1.4rem', color: '#222222' }}>Kingdom Collection</p>
                        <p style={{ fontSize: '1rem' }}>We are here to help you with your queries and suggestions!</p>
                        <p className={style.toggleBtn}> <span style={{ paddingRight: '1rem', fontSize: '.9rem', width: '3rem' }}><FaRegHeart /> </span> Follow me on instagram</p>
                        <button className={style.cartBtn} style={{ backgroundColor: '#fff', color: 'black', border: '2px solid black' }}>
                          Message Kingdom Collection
                        </button>
                      </div>

                    </div>
                      : null
                  }
                </div>

              </div>
            </div>
            <div className={style.text}>[load_more_reviews]</div>
            <div className={style.text}>Photos from reviews</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Image src={img1} width={200} height={200} style={{ borderRadius: '12px' }} />
              <Image src={img1} width={200} height={200} style={{ borderRadius: '12px' }} />
              <Image src={img1} width={200} height={200} style={{ borderRadius: '12px' }} />
              <Image src={img1} width={200} height={200} style={{ borderRadius: '12px' }} />

            </div>
            <div className={style.text}>Explore related searches</div>
            <div className={style.text} style={{ fontSize: '.9rem' }}>[woocommerce_related_products]</div>
            <div className={style.text}>Explore more related searches</div>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap' }}>
              <button style={{ display: 'flex', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9', }} className={style.text}>
                Gift for Boysfriends
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gift for Dad
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gift for Husband
              </button>

              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gift for Him
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Personalised Gift
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#E9E9E9' }} className={style.text}>
                Gifts
              </button>
            </div>

          </div>
      }
    </> : <h1>loading..</h1>
  );
}
