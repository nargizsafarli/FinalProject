import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import sliderImg1 from './assets/slider-6.jpg';
import sliderImg2 from './assets/slider-5.jpg'
import sliderImg3 from './assets/slider-4.jpg'
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
            <p>Hot Sale 50% Discount</p>
              <h2>Bay a planter,get a grow light free
              </h2>
              <div className={slide.sliButton}>Buy Now</div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={slide.slide}
            style={{ backgroundImage: `url(${sliderImg2})` }}
          >
            <div className={slide.content}>
            <p>Make Your Dream House</p>
              <h2>Bring The Green World to Your Home</h2>
              <div className={slide.sliButton}>Buy Now</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={slide.slide}
            style={{ backgroundImage: `url(${sliderImg3})` }}
          >
            <div className={slide.content}>
            <p>Make Your Dream House</p>
              <h2>Bring The Green World to Your Home</h2>
              <div className={slide.sliButton}>Buy Now</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default NavSlider;

