
const expect = require('chai').expect;
const ActionSequence = require('../index.js');

const options = { delay: 500 };
const actions = {
  action3: ({ action, delay }) => new Promise(resolve => {
    setTimeout(() => { console.log('   ', 3); resolve(3) }, delay);
  }),
  action2: ({ action, delay }) => new Promise(resolve => {    
    setTimeout(() => { console.log('   ', 2); resolve(2) }, delay);
  }),
  action1: ({ action, delay }) => new Promise(resolve => {    
    setTimeout(() => { console.log('   ', 1); resolve(1) }, delay);
  }),
};

describe(`ActionSequence`, function () {
  
  this.timeout(options.delay * (Object.keys(actions).length + 1));

  it ('All actions complete', () => {
    
    return ActionSequence({ actions, options })
    .then(success => expect(success).to.have.lengthOf(3));
  });
});
