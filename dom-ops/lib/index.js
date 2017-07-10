'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.select = select;
exports.selectFirst = selectFirst;
exports.selectById = selectById;
exports.closest = closest;
exports.nextElement = nextElement;
exports.parent = parent;
exports.child = child;
exports.create = create;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.appendChild = appendChild;
exports.removeChild = removeChild;
exports.clone = clone;
exports.insertBefore = insertBefore;
exports.insertAfter = insertAfter;
exports.insertStart = insertStart;
exports.insertEnd = insertEnd;
exports.empty = empty;
exports.hasClass = hasClass;
exports.matches = matches;
exports.nodesToArray = nodesToArray;
exports.whenReady = whenReady;
/*
    ==============================================================
    SELECTION
    ==============================================================
*/
function select(selector) {
    var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

    var selection = root.querySelectorAll(selector);

    return selection.length ? selection : null;
}

function selectFirst(selector) {
    var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

    return root.querySelector(selector);
}

function selectById(id) {
    return document.getElementById(id);
}

/*
    ==============================================================
    TRAVERSAL
    ==============================================================
*/

function closest(element, selector) {
    var closest;

    while (!closest) {
        if (matches(element, selector)) {
            closest = element;
        }

        element = parent(element);

        if (!element || element === document) {
            break;
        }
    }

    return closest;
}

function nextElement(element) {
    return element.nextElementSibling;
}

function parent(element) {
    return element.parentNode;
}

// Currently undocumented - `select` performs this operation
function child(element, selector) {
    return element.querySelectorAll(selector);
}

/*
    ==============================================================
    MANIPULATION
    ==============================================================
*/
function create() {
    var tag = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];

    return document.createElement(tag);
}

function addClass(element, className) {
    nodesToArray(element).forEach(function (node) {
        return node.classList.add(className);
    });
}

function removeClass(element, className) {
    nodesToArray(element).forEach(function (node) {
        return node.classList.remove(className);
    });
}

function appendChild(host, element) {
    host.appendChild(element);
}

function removeChild(host, element) {
    host.removeChild(element);
}

function clone(element) {
    return element.cloneNode(true);
}

function insertBefore(element, html) {
    element.insertAdjacentHTML('beforebegin', html);
}

function insertAfter(element, html) {
    element.insertAdjacentHTML('afterend', html);
}

function insertStart(element, html) {
    element.insertAdjacentHTML('afterbegin', html);
}

function insertEnd(element, html) {
    element.insertAdjacentHTML('beforeend', html);
}

function empty(element) {
    nodesToArray(element).forEach(function (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    });
}

/*
    ==============================================================
    IDENTIFICATION
    ==============================================================
*/

function hasClass(element, className) {
    var hasClass = true;
    nodesToArray(element).forEach(function (node) {
        if (!node.classList.contains(className)) {
            hasClass = false;
        }
    });
    return hasClass;
}

function matches(element, selector) {
    return (element.matches || element.matchesSelector || element.msMatchesSelector).call(element, selector);
}

/*
    ==============================================================
    HELPERS
    ==============================================================
*/

function nodesToArray(nodes) {
    if (!nodes || nodes.length === 0) {
        return false;
    } else {
        return nodes.length ? [].slice.call(nodes) : [nodes];
    }
}

function whenReady(callback) {
    if (document.readyState != 'loading' && document.body != null) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
}
