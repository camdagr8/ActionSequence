
module.exports = ({
    actions = {},
    options = {}
}) => {
    const success = [];
    const errors   = [];

    return new Promise(async (resolve, reject) => {

        for (action in actions) {
            await actions[action]({
                ...options,
                action,
            }).then(result => {
                success.push(result);
            }).catch(error => {
                errors.push(error);
                break;
            });
        }

        if (errors.length > 0) {
            reject(errors);
        } else {
            resolve(success);
        }
    });
};
