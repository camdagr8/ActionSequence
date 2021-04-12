module.exports = ({ actions = {}, options = {}, context = {} }) => {
  const errors = {};

  return new Promise(async (resolve, reject) => {
    let prevAction;
    for (action in actions) {
      try {
        let result = await actions[action]({
          ...options,
          action,
          context,
          prevAction,
          result: context // result - depricated as of 3.1.0
        });
        result = result || true;
        context[action] = result;
      } catch (error) {
        errors[action] = error;
        break;
      }

      prevAction = action;
    }

    if (Object.keys(errors).length > 0) {
      reject(errors, context);
    } else {
      resolve(context);
    }
  });
};
