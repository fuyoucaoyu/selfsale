/*!
 * bonzo - git helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * bonzo.has( elem, 'my-class' ) -> true/false
 * bonzo.add( elem, 'my-new-class' )
 * bonzo.remove( elem, 'my-unwanted-class' )
 * bonzo.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

function isBody(element) {
    return element === window || (/^(?:body|html)$/i).test(element.tagName)
}

function getWindowScroll() {
    var html = win.document.documentElement;
    return { x: window.pageXOffset || html.scrollLeft, y: window.pageYOffset || html.scrollTop }
}

function scroll(el, x, y, type) {
    if (!el) return false;
    if (x == null && y == null) {
        return (isBody(el) ? getWindowScroll() : { x: el.scrollLeft, y: el.scrollTop })[type]
    }
    if (isBody(el)) {
        window.scrollTo(x, y)
    } else {
        x != null && (el.scrollLeft = x)
        y != null && (el.scrollTop = y)
    }
    return true;
}

var bonzo = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass,
  scroll: scroll
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( bonzo );
} else {
  // browser global
  window.bonzo = bonzo;
}

})( window );
