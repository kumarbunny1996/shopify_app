//gets event elements
let events = (element, event, eventHandler) => document.querySelector(element).addEventListener(event, eventHandler);

module.exports = {
    events
};