const logger = param => store => next => action => {
    console.log("Logging",param);
    next(action)
};
//  Currying
// N => 1

export default logger;