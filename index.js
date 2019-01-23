
module.exports = ({
    actions = {},
    options = {}
}) => {
    const success = [];
    const errors   = [];

    return new Promise(async (resolve, reject) => {
        let result;
        for (action in actions) {
            result = await actions[action]({
                ...options,
                action,
                result,
            }).then(result => {
                success.push(result);
                return result;
            }).catch(error => {
                errors.push(error);
            });
        }

        if (errors.length > 0) {
            reject(errors);
        } else {
            resolve(success);
        }
    });
};
