import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import sliderImg1 from './assets/slideshow-v1-1.webp';
import sliderImg2 from './assets/slideshow-v1-2.webp'
import slide from './NavSlider.module.css';

function NavSlider() {
  return (
    <div className={slide.sliderWrapper}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        className={slide.slider}
      >
        <SwiperSlide>
          <div
            className={slide.slide}
            
            style={{ backgroundImage: `url(${sliderImg1})` }}
          >
            <div className={slide.content}>
            {/* <p>Hot Sale 50% Discount</p> */}
              <h2>Green Indoor Plant
              For Home Decor</h2>
              <button className={slide.button}>Buy Now</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={slide.slide}
            style={{ backgroundImage: `url(${sliderImg2})` }}
          >
            <div className={slide.content}>
            <p>Hot Sale 40% Discount</p>
              <h2>Artificial Plant</h2>
              <button className={slide.button}>Buy Now</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default NavSlider;

