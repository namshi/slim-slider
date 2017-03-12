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
  

export class Events{
  listeners = [];
  
  addEvent(el, e, fn, capture){
    el && el.addEventListener(e, fn, capture);
    this.listeners.push({el, fn, e})
  }
  destroyAll(){
    this.listeners.forEach( l =>{
      l.el.removeEventListener(l.e, l.fn)
    })
  }
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
