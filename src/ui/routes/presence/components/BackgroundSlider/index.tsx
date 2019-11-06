import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import classNames from 'clsx' 
import './style.scss'
import Japan from './japan.jpg'
import Belanda from './belanda.jpg'
import Korea from './korea.jpg'
import China from './china.jpg'
import Uea from './uea.jpg'
import Malaysia from './malaysia.jpg'
import Nigeria from './nigeria.jpg'
import India from './india.jpg'
import Myanmar from './myanmar.jpg'

import Logo from './logo.png'

const slides = [
  {
    city: 'JAPAN',
    country: 'WELCOME TO MTGA 2019',
    img: Japan,
  },
  {
    city: 'NETHERLANDS',
    country: 'WELCOME TO MTGA 2019',
    img: Belanda,
  },
  {
    city: 'KOREA',
    country: 'WELCOME TO MTGA 2019',
    img: Korea,
  },
  {
    city: 'CHINA',
    country: 'WELCOME TO MTGA 2019',
    img: China,
  },
  {
    city: 'UEA',
    country: 'WELCOME TO MTGA 2019',
    img: Uea,
  },
  {
    city: 'MALAYSIA',
    country: 'WELCOME TO MTGA 2019',
    img: Malaysia,
  },
  {
    city: 'INDIA',
    country: 'WELCOME TO MTGA 2019',
    img: India,
  },
  {
    city: 'NIGERIA',
    country: 'WELCOME TO MTGA 2019',
    img: Nigeria,
  },
  {
    city: 'MYANMAR',
    country: 'WELCOME TO MTGA 2019',
    img: Myanmar,
  },
];

export default () => {
  const IMAGE_PARTS = 4;
  const AUTOCHANGE_TIME = 4000;

  const [activeSlide, setActiveSlide] = useState(-1)
  const [prevSlide, setPrevSlide] = useState(-1)
  const [sliderReady, setSliderReady] = useState(false)

  const changeSlides = (change: number) => {
    window.clearTimeout(changeTO);
    const { length } = slides;
    const prev = activeSlide;
    let active = prev + change;
    if (active < 0) active = length - 1;
    if (active >= length) active = 0;
    setActiveSlide(active)
    setPrevSlide(prev)
  }

  const changeTO = setTimeout(() => {
    changeSlides(1);
  }, AUTOCHANGE_TIME);

  useEffect(() => {
    setTimeout(() => {
      setActiveSlide(0)
      setSliderReady(true)
    }, 0);
  }, [])
  
  return (
    <div className={classNames('slider', { 's--ready': sliderReady })}>
      {/* <img className="Logo" src={Logo} alt='Logo' /> */}
      <p className="slider__top-heading">Barcode Attendance System</p>
      <div className="slider__slides">
        {slides.map((slide, index) => (
          <div
            className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index })}
            key={slide.city}
          >
            <div className="slider__slide-content">
              <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
              <h2 className="slider__slide-heading">
                {slide.city.split('').map(l => <span>{l}</span>)}
              </h2>
              {/* <p className="slider__slide-readmore">read more</p> */}
            </div>
            <div className="slider__slide-parts">
              {[...Array(IMAGE_PARTS).fill(0)].map((x, i) => (
                <div className="slider__slide-part" key={i}>
                  <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="slider__control" onClick={() => changeSlides(-1)} />
      {/* <div className="slider__control slider__control--right" onClick={() => changeSlides(1)} /> */}
    </div>
  )
}