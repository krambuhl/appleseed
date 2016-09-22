# Appleseed

A lightweight implementation of the Elm data model using javascript.

## Example

### Definition

```js
import createComponent from 'appleseed';

const ui = ({ el, options }) => ({
    el: el,
    toggle: el.querySelector('.block__toggle'),
    close: el.querySelector('.block__close'),
    open: el.querySelector('.block__open'),
    body: document.body
});

const init = ({ ui }) => ({
    isOpen: ui.el.classList.contains('is-open')
});

const subscriptions = ({ state, ui, pushUpdate, options }) => {
    ui.el.addEventListener('click', ev => {
        if (ui.toggle.contains(ev.target)) pushUpdate('TOGGLE');
        if (ui.open.contains(ev.target)) pushUpdate('OPEN');
        if (ui.close.contains(ev.target)) pushUpdate('CLOSE');
    });
  
    ui.body.addEventListener('click', ev => {
        if (!ui.el.contains(ev.target)) pushUpdate('TOGGLE', false);
    })
}

const update = ({ message, state, lastState, options }) => {
    switch(message) {
        case 'OPEN': 
            return () => ({ isOpen: true });

        case 'CLOSE': 
            return () => ({ isOpen: false })

        case 'TOGGLE': 
            return (open = !state.isOpen) => ({ isOpen: open });
    }
}

const view = ({ ui, update, state, lastState, history, options }) => {
    if (update.isOpen !== undefined) { 
        // only update if the data has been updated
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

### Useage

```js
import toggler from './toggler';
toggler(document.querySelector('.toggler'), {  });
```

## Install 

```
npm install appleseed
```