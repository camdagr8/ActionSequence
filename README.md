# ActionSequence

Having Promise.all() is great, but some times you just want to run through a list of Promises in order.

# Usage

```javascript
const ActionSequence = require('action-sequence');

const options = { delay: 500 };
const actions = {
  action1: ({ action, delay }) => new Promise(resolve => {    
    setTimeout(() => { resolve(1) }, delay);
  }),
  action2: ({ action, delay }) => new Promise(resolve => {    
    setTimeout(() => { resolve(2) }, delay);
  }),
  action3: ({ action, delay }) => new Promise(resolve => {    
    setTimeout(() => { resolve(3) }, delay);
  }),
};


ActionSequence({ actions, options }).then(
  success => console.log(success)
).catch(
  error => console.log(error)
);

```

> *Pro tip:* Since `ActionSequence` returns a `Promise`, it's possible to process multiple `ActionSequence` promises in another `ActionSequence`.

# Parameters
**actions** `{Object}` that contains `Functions` that return a `Promise`.

**options** `{Object}` that passes parameters to each action `Function`.
