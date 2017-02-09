'use strict';

import Hammer from 'hammerjs';
import CustomEvent from 'custom-event';

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const defaults = {
  timing : 400,
  childsClassName : '.slide',
  dir: 'ltr',
  carouselItem : '.product-carousel-item',
  threshold: 10
}

export default class SlimSlider{
  constructor(options){
    this.timeout;
    this.panEnabled = true;
    this.timing = options.timing || defaults.timing;
    this.threshold = options.threshold || defaults.threshold;
    this.current = 0;
    this.pos = 0;
    this.operator = (options.dir === 'rtl' ? 1 : -1) || defaults.dir;
    this.slider = document.querySelector(options.selector);
    this.slides = this.slider.querySelectorAll(options.childsClassName || defaults.childsClassName);
    this.carouselItem = options.carouselItem || defaults.carouselItem;
    this.width = this.slides[0].offsetWidth;
    this.slideCount = this.slides.length;
    this.init();
  }

  dispatchEvent(target, type, detail) {
    let event = new CustomEvent(
        type,
        {
            bubbles: true,
            cancelable: true,
            detail: detail
        }
    );

    target.dispatchEvent(event);
  }
  setPan(enabled){
    this.panEnabled = enabled;
    this.initGesture();
  }
  initGesture(){
    if(this.sliderManager){
      this.sliderManager.destroy();
      this.sliderManager = null;
    }

    let touchAction = this.panEnabled ? {touchAction: 'pan-y'} : {touchAction: 'none'} ;
    this.sliderManager = new Hammer.Manager(this.slider, {
      ...touchAction,
      recognizers: [
          [Hammer.Pan,{ direction: Hammer.DIRECTION_ALL }],
      ]
    });

    this.sliderManager.on('panstart panmove panend pancancel panleft panright panup pandown', this.handleSwipe)
  }

  init(){
    this.initGesture();
    this.slides[0].classList.add('active');
    this.dispatchEvent(this.slider, 'after.slim.init', {})
  }

  translate(to){
    requestAnimationFrame(_ => {this.slider.style.transform = `translateX(${to}px)`; })
  }

  slideTo(n){
    this.current = n < 0 ? 0 : (n > this.slideCount - 1 ? this.slideCount - 1 : n )
    this.pos = this.operator * this.current * this.width
    let prevSlide = document.querySelector(`${this.carouselItem}.active`)

    this.slider.classList.add( 'is-animating' );
    prevSlide && prevSlide.classList.remove('active');
    this.slides[this.current].classList.add('active');

    if(this.timeout){
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout( _ => {
      this.slider.classList.remove( 'is-animating');
      this.dispatchEvent(this.slider, 'after.slim.slide', {});
    }, this.timing )

    this.translate(this.pos);
  }

  handleSwipe = e => {
    let shiftY = (e.deltaY / this.width) * 100 > - 20  ;

    if(this.panEnabled && shiftY) {
      this.translate(this.pos + e.deltaX)

      if(e.isFinal){
        if(e.type == 'panleft') {
          this.slideTo(this.current - this.operator );
        } else if( e.type == 'panright'){
          this.slideTo(this.current + this.operator );
        } else {
          this.slideTo(this.current);
        }
      } else if( e.type == 'panend' || e.type == 'pancancel'){
        this.slideTo(this.current);
      }
    } else {
      this.slideTo(this.current);
    }
  }
}
