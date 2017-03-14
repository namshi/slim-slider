'use strict';

import Hammer from 'hammerjs';
import CustomEvent from 'custom-event';
import {dispatchEvent, 
        create, 
        Events, 
        requestAnimationFrame} from './utils';

/**
 * {Timing}: Intiger: represents the animation value between slides 
 * {childsClassName}: String : slider child slides elements
 * {dir}: String: Slider direction
 * {threshold}: Intiger: refer to hammerjs docs
 * {showButtons}: Boolean: show or hide Next / Prev buttons
 * {infinte}: Boolean: startover when the slider reaches the end.
 * {showPointers}: Boolean: show or hide pager pointers.
 *
 */

const defaults = {
  timing : 400,
  childsClassName : '.slim-slide',
  dir: 'ltr',
  threshold: 10,
  showButtons:false,
  infinite:false,
  showPointers : true,
  showThumbnails:false,
  itemsPerSlide : 1,
}

export default class SlimSlider{
  constructor(options){
    this.options = Object.assign({}, defaults, options);
    if(!this.options.selector){
      throw new Error('option missing: Providing a selector is a must to initialize the slider!');
    }
    
    this.init();
  }
  /**
   * Method to enable and disable paning
   * useful to disable sliding if another 3rdparty using the image
   * like PhotoViewJs.
   */
  setPan(enabled){
    this.panEnabled = enabled;
    this.initGesture();
  }
  /**
   * init the Gesture recongition and makes sure
   * its removed of it was there before
   */
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
    this.events = new Events();
    this.parent = this.options.selector.nodeName ? this.options.selector : document.querySelector(this.options.selector);
    this.slides = this.parent.querySelectorAll(this.options.childsClassName);
    this.slideCount = Math.ceil(this.slides.length / this.options.itemsPerSlide);
    this.slideWidth = this.parent.offsetWidth;
    this.itemWidth = this.parent.offsetWidth / this.options.itemsPerSlide;
    this.initDom();
    this.options.showPointers && this.createPagination();
    this.options.showThumbnails && this.createThumbs();
    this.options.showButtons && this.createButtons();
    this.initGesture();
    this.registerListeners();
    dispatchEvent(this.parent, 'after.slim.init', { current:this.current })
  }
  /**
   * Prepares the current slider dom with neccessary data.
   */
  initDom(){
    if(!this.slider || !this.sliderWrapper){
      this.slider = create('div', {class:'slim-slides'})
      this.sliderWrapper = create('div', {class:'slim-slider-wrapper'})
      this.slides.forEach( slide => {
        this.slider.appendChild(slide)
      })
      this.sliderWrapper.appendChild(this.slider)
      this.parent.appendChild(this.sliderWrapper)
    }
    this.slides[0].classList.add('active');
    this.parent.style.direction = this.options.dir;
    this.slides.forEach( (el, k) => {
      el.dataset.item = k;
      el.style.minWidth = `${this.itemWidth}px`;
    })
  }
  /**
   * Creates pointers on the fly and appends it to the slider parent element.
   */
  createPagination(){
    this.carouselPagination = create('div', {class:'carousel-pagination'}); 
    
    for(let k = 0; k < this.slideCount; k++){
      let carouselPointer = create('div', {class:`carousel-pagination-pointer pointer_${k}` });
      this.carouselPagination.appendChild(carouselPointer);
    }

    this.parent.appendChild(this.carouselPagination);
  }
  /**
   * Creates thumbnails on the fly and appends it to the slider parent element.
   */
  createThumbs(){
    this.thumbnails = create('div', {class:'thumbs'}); 
    
    for(let k = 0; k < this.slideCount; k++){
      let thumb = create('div', {class:`thumb thumb_${k}` });
      let thumbLink = create('a', {class:'thumb-link', 'data-slideto': k, href:'#'});
      let thumbImg = create('img', {class:'thumb-image', src: `${this.slides[k].dataset.thumb}` });
      thumbLink.appendChild(thumbImg);
      thumb.appendChild(thumbLink);
      this.thumbnails.appendChild(thumb);
      
      this.events.addEvent(thumb, 'click', e => {
        e.preventDefault();
        this.slideTo(k)
      })

    }
    this.parent.appendChild(this.thumbnails);
  }
  /**
   * Creates `Next` and `Prevoius` buttons
   */
  createButtons(){
    this.carouselButtons = create('div', {class:'carousel-buttons'}); 
    this.nextButton = create('a', {class:'next carousel-arrow'});
    this.prevButton = create('a', {class:'prev carousel-arrow'});
    this.carouselButtons.appendChild(this.nextButton)
    this.carouselButtons.appendChild(this.prevButton)
    this.parent.appendChild(this.carouselButtons) 
  }
  /**
   * With evey slide it is called to update the pointers
   */
  updatePagination(){
      let item = this.parent.querySelector(`${this.options.childsClassName}.active`).dataset.item;
      let currentPointer = this.parent.querySelector(`.pointer_${item}`);
      let previousPointer = this.parent.querySelector('.carousel-pagination-pointer.active');

      previousPointer && previousPointer.classList.remove('active');
      currentPointer && currentPointer.classList.add('active'); 
  }

  /**
   * With evey slide it is called to update the pointers
   */
  updateThumbs(){
      let item = this.parent.querySelector(`${this.options.childsClassName}.active`).dataset.item;
      let currentPointer = this.parent.querySelector(`.thumb_${item}`);
      let previousPointer = this.parent.querySelector('.thumb.active');

      previousPointer && previousPointer.classList.remove('active');
      currentPointer && currentPointer.classList.add('active'); 
  }

  goToNext(){
    this.slideTo(this.current - this.operator );
  }

  goToPrevious(){
    this.slideTo(this.current + this.operator );
  }

  registerListeners(){
    this.events.addEvent(this.nextButton, 'click', e => {
      this.goToNext();
    })
    this.events.addEvent(this.prevButton, 'click', e => {
      this.goToPrevious();   
    })
    this.events.addEvent(this.parent, 'after.slim.init', e => {
      this.updatePagination();
      this.updateThumbs();
    });
    this.events.addEvent(this.parent, 'after.slim.slide', (e) => {
      this.updatePagination();
      this.updateThumbs();
    });

    /**
     * Makes sure the functions is fired at the last
     * resize event called.
     */
    window.addEventListener('resize', e => {
      clearTimeout(this.resized);
      this.resized = setTimeout(_=> {
        this.destroy()
        this.init();
        this.slideTo(0);
      }, 500);
    })
  }

  translate(to){
    requestAnimationFrame(_ => {this.slider.style.transform = `translateX(${to}px)`; })
  }

  slideTo(n){
    let last = this.options.infinite ? 0 : this.slideCount - 1;
    this.current = n < 0 ? 0 : (n > this.slideCount - 1 ? last : n )
    this.pos = this.operator * this.current * this.slideWidth;
    let prevSlide = this.parent.querySelector(`${this.options.childsClassName}.active`);
    
    this.slider.classList.add('is-animating');
    prevSlide && prevSlide.classList.remove('active');
    this.slides[this.current].classList.add('active');

    if(this.timeout){
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout( _ => {
      this.slider.classList.remove( 'is-animating');
      dispatchEvent(this.parent, 'after.slim.slide', { current:this.current });
    }, this.timing )

    this.translate(this.pos);
  }

  handleSwipe = e => {
    let shiftY = (e.deltaY / this.slideWidth) * 100 > - 20  ;

    if(this.panEnabled && shiftY) {
      this.translate(this.pos + e.deltaX)

      if(e.isFinal){
        if(e.type == 'panleft') {
          this.goToNext()
        } else if( e.type == 'panright'){
          this.goToPrevious();
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
  removeDom(){
    this.thumbnails && this.parent.removeChild(this.thumbnails)
    this.carouselPagination && this.parent.removeChild(this.carouselPagination)
    this.carouselButtons && this.parent.removeChild(this.carouselButtons)
  }
  destroy(){
    this.events.destroyAll();
    this.removeDom();
  }
}

