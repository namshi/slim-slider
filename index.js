'use strict';

import Hammer from 'hammerjs';
import CustomEvent from 'custom-event';

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function make(type, attributes = {}){
  let element = document.createElement(type);
  
  try{
    Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr]);
    })
  } catch(err){
    console.error(err)
  }

  return element;
}

const defaults = {
  timing : 400,
  childsClassName : '.js_slide',
  dir: 'ltr',
  carouselItem : '.product-carousel-item',
  threshold: 10
}
export default class SlimSlider{
  constructor(options){
    this.options = Object.assign({}, options, defaults);
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
    this.timeout;
    this.panEnabled = true;
    this.timing = this.options.timing;
    this.threshold = this.options.threshold;
    this.current = 0;
    this.pos = 0;
    this.operator = (this.options.dir === 'rtl' ? 1 : -1);
    this.slider = document.querySelector(this.options.selector);
    this.slides = this.slider.querySelectorAll(this.options.childsClassName);
    this.carouselItem = this.options.carouselItem;
    this.slideCount = this.slides.length;
    this.width = this.slides[0].offsetWidth;
    this.initDom();
    this.createPagination();
    this.initGesture();
    this.registerListeners();
    this.slides[0].classList.add('active');
    this.dispatchEvent(this.slider, 'after.slim.init', {})
  }
  
  initDom(){
    this.slides.forEach( (el, k) => {
      el.dataset.item = k;
    })
  }

  createPagination(){
    let carouselPagination = make('div', {class:'carousel-pagination'}); 

    this.slides.forEach( (el, k) => {
      let carouselPointer = make('div', {class:'carousel-pagination-pointer', id: `pointer_${k}` });
      carouselPagination.appendChild(carouselPointer);
    })

    this.slider.parentNode.appendChild(carouselPagination);

  }

  updatePagination(){
      let item = this.slider.querySelector('.active').dataset.item;
      let currentPointer = document.querySelector(`#pointer_${item}`);
      let previousPointer = document.querySelector('.carousel-pagination-pointer.active');

      previousPointer && previousPointer.classList.remove('active');
      currentPointer && currentPointer.classList.add('active'); 
  }

  registerListeners(){
    this.slider.addEventListener('after.slim.init', (e) => {
      this.updatePagination();
    });

    this.slider.addEventListener('after.slim.slide', (e) => {
      this.updatePagination();
    });
    window.addEventListener('resize', e=>{
      clearTimeout(this.resized);
      this.resized = setTimeout(_=> {
        this.init();
        this.slideTo(0);
      }, 500);
    })
  }

  translate(to){
    requestAnimationFrame(_ => {this.slider.style.transform = `translateX(${to}px)`; })
  }

  slideTo(n){
    this.current = n < 0 ? 0 : (n > this.slideCount - 1 ? this.slideCount - 1 : n )
    this.pos = this.operator * this.current * this.width
    let prevSlide = document.querySelector(`${this.options.childsClassName}.active`)
    
    this.slider.classList.add('is-animating');
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

