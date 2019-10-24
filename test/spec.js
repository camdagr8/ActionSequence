const expect = require("chai").expect;
const ActionSequence = require("../index.js");

const options = { delay: 500 };
const actions = {
  action5: () => console.log("   ", 5),
  action4: async ({ delay }) => {
    await new Promise(resolve => {
      setTimeout(() => {
        console.log("   ", 4);
        resolve();
      }, delay);
    });
  },
  action3: ({ action, delay }) =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log("   ", 3);
        resolve(3);
      }, delay);
    }),
  action2: ({ action, delay }) =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log("   ", 2);
        resolve(2);
      }, delay);
    }),
  action1: ({ action, delay, context, prevAction }) =>
    new Promise(resolve => {
      setTimeout(() => {
        const v = context[prevAction] - 1;
        console.log("   ", v);
        resolve(v);
      }, delay);
    }),
  done: ({ context }) => {
    context["action5"] = "changed by [done]";
  }
};

describe(`ActionSequence`, function() {
  this.timeout(options.delay * (Object.keys(actions).length + 1));

  it("All actions complete", () => {
    return ActionSequence({ actions, options })
      .then(context => {
        console.log("");
        console.log("  Context:", "\n");
        console.log(context);
        console.log("");
        return Object.keys(context);
      })
      .then(success =>
        expect(success).to.have.lengthOf(Object.keys(actions).length)
      );
  });
});
