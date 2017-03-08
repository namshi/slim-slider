![slimslider](https://cloud.githubusercontent.com/assets/1451125/23154097/7c0b518a-f825-11e6-9bd4-c26ab0e2a55f.png)

Light-weight, Non-jquery and RTL-supported Slider.

## How to initialize
Initializing by creating a `new` instance, saving it in a variable is **optional** i'e `let slider = new SlimSlider({...})`, but can come in handy as you will see later.

```js
let Slider = new SlimSlider({
    selector: '.slim-slides',
    childsClassName :'.slim-slide',
    dir: 'ltr',
    showPointers : true,
})
```
## Options 
available options to pass to initialize SlimSlider.
```js
const defaults = {
  timing : 400, //  Integer: represents the animation value between slides 
  childsClassName : '.slim-slide', // String : slider child slides elements
  dir: 'ltr', // String: Slider direction
  threshold: 10, // Integer: refer to hammerjs docs
  showButtons:false, //  Boolean: show or hide Next / Prev buttons
  infinite:false, //  Boolean: startover when the slider reaches the end.
  showPointers : true, //  Boolean: show or hide pager pointers.
  showThumbnails:true, //  Boolean: show or hide Thumbnails.
  itemsPerSlide : 1, // Integer: how many item per slide.
}
```

## `data-thumb`
for now you can provide thumbs through data attribute, check the demo.

## `this.goToNext`, `this.goToPrevious` 
```js
 let Slider = new Slider({...})
 Slider.goToNext()
 Slider.goToPrevious()
```
## `setPan()` to temporarly stop the  slider.
A method that disables panning on the slider so another party can take over the control.
i.e: we've been using SlimSlider alongside with [PhotoViewJs](https://github.com/namshi/Photoviewjs) and we want in some situation to give control to it of Panning, so simply you can `setPan(false)` to turn off (without destroying) slider, and `setPan(true)` to give control back to it.

## Events 
`after.slim.init`: fires after slider initiation.
`after.slim.slide`: fires after each slide.
on the event object, `SlimSlider` pushes details wich has `current` that tells the current slide number.

```js
 carouselElem.addEventListener('after.slim.slide', (e) =>  {
    console.log(e) // e.details : {current: 2} 
  });
```



#TODOS
- [x] decouple class naming and functionality.
- [x] Dispatch Events with currentSlide.
- [x] implement the pagination out of the box.
- [x] Image resizing and initalizing to be done internally.
- [ ] Minimal Styles.
- [ ] Publish it!


