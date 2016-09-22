# Appleseed

Implements a minimal version of the Elm data model using javascript.

## Example

```js
import createComponent from 'appleseed';

export const ui = ({ el, options }) => ({
    el: el,
    toggle: el.querySelector('.js-toggle'),
    close: el.querySelector('.js-close'),
    open: el.querySelector('.js-open'),
    body: document.body
});

export const init = ({ ui }) => ({
    isOpen: ui.el.classList.contains('is-open')
});

export const subscriptions = ({ state, ui, pushUpdate, options }) => {
    ui.el.addEventListener('click', ev => {
        if (el.toggle.contains(ev.target)) pushUpdate('TOGGLE');
        if (el.open.contains(ev.target)) pushUpdate('OPEN');
        if (el.close.contains(ev.target)) pushUpdate('CLOSE');
    });
}

export const update = ({ message, state, lastState, options }) => {
    switch(message) {
        case 'OPEN': 
            return () => ({ isOpen: true });

        case 'CLOSE': 
            return () => ({ isOpen: false })

        case 'TOGGLE': 
            return (open = !state.isOpen) => ({ isOpen: open });

        default: return () => ({ })
    }
}

export const view = ({ ui, update, state, lastState, options }) => {
    if (update.isOpen !== undefined) {
        ui.el.classList.toggle('is-open', state.isOpen);
    }
}

export default createComponent({
    ui,
    init, 
    subscriptions, 
    update, 
    view 
});
```

## Install 

```
npm install appleseed
```