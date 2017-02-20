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

export function addEvent(element, e, fn){
	element && element.addEventListener(e, fn);
}

export function dispatchEvent(target, type, detail) {
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

export const requestAnimationFrame = window.requestAnimationFrame 
			|| window.mozRequestAnimationFrame 
			|| window.webkitRequestAnimationFrame 
			|| window.msRequestAnimationFrame;
