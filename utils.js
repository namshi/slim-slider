export function create(type, attributes = {}){
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

class Events{
  listeners = [];
  addEvent(el, e, fn, capture){
    el && el.addEventListener(e, fn, capture);
    this.listeners.push({el, fn, e})
  }
  destroyAll(){
    this.listeners.length > 0 && this.listeners.forEach(l=>{
      l.el.removeEventListener(l.e, l.fn)
    })
    this.listeners = []
  }
}

export const events = new Events();

export function closestParent(el, selector, includeSelf) {
  let parent = el.parentNode;
  let match = null;
  if (includeSelf && el.matches(selector)) {
      return el;
  }

  while (parent && parent !== document.body) {
    if (parent.matches && parent.matches(selector)) {
       match =  parent;
       break;
    } else {
        parent = parent.parentNode;
    }
  }

  return match;
};

/**
* `on` : accepts a parent selector at which the event will be bound and to be caught.
*/
export function on(eventType, selectorParent, selector, fn){
 let el = document.querySelector(selectorParent);

 if(!el || !eventType || !selectorParent || !selector  || !fn ) {
   return null;
 }

 events.addEvent(el, eventType, e => {
   let target = e.target;
   let matches = closestParent(target, selector, true);
   if(matches) {
     e.selectorTarget = matches;
     fn.call(matches, e);
   }
 })
}


export function dispatchEvent(target, type, details) {
	let event = new CustomEvent(
			type,
	    {
        bubbles: true,
        cancelable: true,
        details: details
	    }
	);

	target.dispatchEvent(event);
}

export const requestAnimationFrame = window.requestAnimationFrame 
			|| window.mozRequestAnimationFrame 
			|| window.webkitRequestAnimationFrame 
			|| window.msRequestAnimationFrame;
