'use client'
import React, { useState } from 'react';
import './ImageSlider.css';
import Image from 'next/image';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
const ProductSlider = ({ imagesdata }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = imagesdata.map(image => image.src);
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="image-slider-container">
      <div className="image-slider">
        <Image src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} width={1000} height={1000} />
        <div className="prev" onClick={handlePrev}><MdOutlineArrowBackIos /></div>
        <div className="next" onClick={handleNext}><MdOutlineArrowForwardIos /></div>
      </div>
      <div className="thumbnail-container">
        {imagesdata.map((item, index) => (
          <Image
            width={1000} height={1000}
            key={index}
            src={item.src}
            alt={`Thumbnail ${index}`}
            style={{ height: '60px', width: '60px', borderRadius: '10px' }}
            className={index === currentImageIndex ? 'active-thumbnail' : 'thumbnail'}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;































// // import React from 'react'

// // import style from './styles.module.css'
// // import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// // import { Carousel } from 'react-responsive-carousel';
// // export default function ProductSlider() {
// //   return (
// //   <div className={style.carousel} >
// //    <Carousel
// //   showArrows={true}
// //   renderArrowPrev={()=>(<p>jj</p>)}
// //   renderArrowNext={()=>(<p>kk</p>)}
// //   renderIndicator={false}
// //   verticalSwipe={'natural'}
// //     >
// //                 <div style={{width:'20rem'}}>
// //                     <img src="https://kingdomcollection.uk/wp-content/uploads/2024/02/1588x1588-1.jpg"  />
// //                 </div>
// //                 <div>
// //                     <img src="https://kingdomcollection.uk/wp-content/uploads/2024/02/1588x1588-1.jpg" />
// //                 </div>
// //                 <div>
// //                     <img src="https://kingdomcollection.uk/wp-content/uploads/2024/02/1588x1588-1.jpg" />
// //                 </div>
// //             </Carousel>
// //   </div>
// //   )
// // }
