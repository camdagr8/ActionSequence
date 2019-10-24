# ActionSequence

Having Promise.all() is great, but some times you just want to run through a list of Promises or function in fixed order.

> ActionSequence works in both Node and browser environments.

# Usage

```javascript
const ActionSequence = require("action-sequence");

const options = { delay: 500 };
const actions = {
  action1: ({ action, delay }) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(1);
      }, delay);
    }),
  action2: ({ action, delay }) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delay);
    }),
  action3: ({ action, delay }) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(3);
      }, delay);
    }),
  action4: () => {
    return 4;
  },
  action5: ({ context, prevAction }) => {
    return context[prevAction] + 1;
  }
};

ActionSequence({ actions, options })
  .then(context => console.log(context))
  .catch(error => console.log(error));

/**
 * Returns:
{ action1: 1, action2: 2, action3: 3, action4: 4, action5: 5 };
*/
```

> _Pro tip:_ Since `ActionSequence` returns a `Promise`, it's possible to process multiple `ActionSequence` promises in another `ActionSequence`.

# Parameters

**actions** `{Object}` Contains `Functions`.

**options** `{Object}` Parameters passed to each action `Function`.

**context** `{Object}` If an action returns a value, it will be added to the context object making it possible to use the output of a previous action in the current action. If an does not return a value `true` will be set at the context value for that action.
