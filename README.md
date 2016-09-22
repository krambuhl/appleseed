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
    const elClick = ev => {
        if (ui.toggle.contains(ev.target)) pushUpdate('TOGGLE');
        if (ui.open.contains(ev.target)) pushUpdate('OPEN');
        if (ui.close.contains(ev.target)) pushUpdate('CLOSE');
    };

    const bodyClick = ev => {
        if (!ui.el.contains(ev.target)) pushUpdate('TOGGLE', false);
    };

    ui.el.addEventListener('click', elClick);
    ui.body.addEventListener('click', bodyClick);
    
    return () => {
        ui.el.removeEventListener('click', elClick);
        ui.body.removeEventListener('click', bodyClick);
    }
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

// creating a component returns a 
// function to unsubscribe event listeners
const unsubscribeToggler = toggler(document.querySelector('.toggler'), {  });

// remove event listeners to effectively 
// stop the component from behaving
unsubscribeToggler();
```

## Docs

### Types

```elm
ui : { 
    el : DomNode, 
    options : Maybe Object 
} => Dict { String : DomNode }

init : { 
    ui : Dict { String : DomNode } 
} => Object

subscriptions : { 
    state : Object, 
    ui : Object, 
    pushUpdate : Function, 
    options : Object 
} => Function 

update : { 
    message : String, 
    state : Object, 
    lastState : Object, 
    options : Object 
} => Function

view : { 
    ui : Dict { String : DomNode }, 
    update : Object, 
    lastState: Object, 
    history : List (List String), 
    options : Object 
}

createComponent : { 
    ui : Maybe Function,
    init : Maybe Function, 
    subscriptions : Maybe Function
    update : Maybe Function,
    view : Maybe Function
}
```

## Install 

```
npm install appleseed
```