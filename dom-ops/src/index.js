/*
    ==============================================================
    SELECTION
    ==============================================================
*/
export function select(selector, root = document) {
    var selection = root.querySelectorAll(selector);

    return selection.length ? selection : null;
}

export function selectFirst(selector, root = document) {
    return root.querySelector(selector);
}

export function selectById(id) {
    return document.getElementById(id);
}

/*
    ==============================================================
    TRAVERSAL
    ==============================================================
*/

export function closest(element, selector) {
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

export function nextElement(element) {
    return element.nextElementSibling;
}

export function parent(element) {
    return element.parentNode;
}

// Currently undocumented - `select` performs this operation
export function child(element, selector) {
    return element.querySelectorAll(selector);
}

/*
    ==============================================================
    MANIPULATION
    ==============================================================
*/
export function create(tag = 'div') {
    return document.createElement(tag);
}

export function addClass(element, className) {
    nodesToArray(element).forEach((node) => node.classList.add(className));
}

export function removeClass(element, className) {
    nodesToArray(element).forEach((node) => node.classList.remove(className));
}

export function appendChild(host, element) {
    host.appendChild(element);
}

export function removeChild(host, element) {
    host.removeChild(element);
}

export function clone(element) {
    return element.cloneNode(true);
}

export function insertBefore(element, html) {
    element.insertAdjacentHTML('beforebegin', html);
}

export function insertAfter(element, html) {
    element.insertAdjacentHTML('afterend', html);
}

export function insertStart(element, html) {
    element.insertAdjacentHTML('afterbegin', html);
}

export function insertEnd(element, html) {
    element.insertAdjacentHTML('beforeend', html);
}

export function empty(element) {
    nodesToArray(element).forEach((node) => {
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

export function hasClass(element, className) {
    var hasClass = true;
    nodesToArray(element).forEach((node) => {
        if (!node.classList.contains(className)) {
            hasClass = false;
        }
    });
    return hasClass;
}

export function matches(element, selector) {
    return (element.matches || element.matchesSelector || element.msMatchesSelector).call(element, selector);
}

/*
    ==============================================================
    HELPERS
    ==============================================================
*/

export function nodesToArray(nodes) {
    if (!nodes || nodes.length === 0) {
        return false;
    } else {
        return nodes.length ? [].slice.call(nodes) : [nodes];
    }
}

export function whenReady(callback) {
    if (document.readyState != 'loading' && document.body != null) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
}
