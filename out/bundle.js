(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.App = exports.Event = exports.Bind = void 0;
class Bind {
    constructor(name, value = null) {
        this.name = name;
        this.value = value;
        this.subscribers = [];
    }
    setValue(value) {
        this.value = value;
        this.subscribers.forEach(i => i.refresh());
    }
    getValue() {
        return this.value;
    }
    subscribe(component) {
        this.subscribers.push(component);
    }
}
exports.Bind = Bind;
class Event {
    constructor(name, fn = null, domName = null) {
        this.name = name;
        this.fn = fn;
        this.domName = domName;
    }
    setFn(fn) {
        this.fn = fn;
    }
    exec(...args) {
        return this.fn(...args);
    }
}
exports.Event = Event;
// export class Method {
//   constructor(
//     private name: string,
//     private fn: Fn = null
//   ) {}
//
//   exec(): any {
//     return this.fn()
//   }
// }
class App {
    constructor(childs = []) {
        this.childs = childs;
        this.element = null;
        this.binds = {};
        this.element = document.getElementById('app');
        this.element.append(...childs.map(c => c.getElement()));
    }
    setChilds(...childs) {
        this.childs = childs;
        this.element.append(...childs.map(c => c.getElement()));
    }
    createBind(name, value = null) {
        const bind = new Bind(name, value);
        this.binds[name] = bind;
        return bind;
    }
}
exports.App = App;
class Component {
    constructor(type = null, content = null, childs = []) {
        this.content = content;
        this.childs = childs;
        this.element = null;
        this.events = {};
        let textContent = null;
        if (typeof content === 'string')
            textContent = content;
        else if (typeof content === 'function')
            textContent = content();
        if (type) {
            this.element = document.createElement(type);
            this.element.innerText = textContent;
            this.element.append(...childs.map(child => child.getElement()));
        }
        else {
            this.element = document.createTextNode(textContent);
        }
    }
    setChilds(...childs) {
        this.childs = childs;
    }
    getElement() {
        return this.element;
    }
    addEvent(name, fn, domName = null) {
        const event = new Event(name, fn, domName);
        if (domName)
            this.element.addEventListener(domName, (...args) => event.exec(...args));
    }
    // exec(name: string) {
    //   const method = this.methods.find(i => i.name === name)
    //   return method.exec()
    // }
    refresh() {
        let textContent = null;
        if (typeof this.content === 'string')
            textContent = this.content;
        else if (typeof this.content === 'function')
            textContent = this.content();
        if (this.element instanceof HTMLElement)
            this.element.innerText = textContent;
        else if (this.element instanceof Text)
            this.element.textContent = textContent;
    }
}
exports.Component = Component;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = exports.p = void 0;
const index_1 = require("./index");
function p(content, ...childs) {
    return index_1.createComponent('p', content, childs);
}
exports.p = p;
function button(fn, ...childs) {
    const button = index_1.createComponent('button', null, childs);
    button.addEvent('click', fn, 'click');
    return button;
}
exports.button = button;

},{"./index":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.createApp = void 0;
const class_1 = require("./class");
function createApp(components) {
    return new class_1.App(components);
}
exports.createApp = createApp;
function createComponent(type, content, childs = []) {
    return new class_1.Component(type, content, childs.map((c) => {
        if (c instanceof class_1.Component)
            return c;
        return new class_1.Component(null, c);
    }));
}
exports.createComponent = createComponent;

},{"./class":1}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../bitter/index");
const components_1 = require("../bitter/components");
const app = index_1.createApp([]);
const count = app.createBind('count', 0);
const c1 = components_1.p(() => `count: ${count.getValue()}`);
const bn = components_1.button(() => count.setValue(parseInt(count.getValue()) + 1), '+1');
count.subscribe(c1);
app.setChilds(c1, bn);

},{"../bitter/components":2,"../bitter/index":3}]},{},[4]);
