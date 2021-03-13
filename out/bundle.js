(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.componentToFunction = exports.createBind = exports.createApp = void 0;
function createApp(component) {
    const app = document.getElementById('app');
    app.append(component.build());
}
exports.createApp = createApp;
class Bind {
    constructor({ name, value }) {
        this.name = null;
        this.value = null;
        this.subscribers = [];
        this.name = name;
        this.value = value;
    }
    setValue(value) {
        this.value = value;
        this.subscribers.forEach(i => i.refresh());
    }
    subscribeComponent(component) {
        this.subscribers.push(component);
    }
}
class Method {
    constructor({ name, fn, component }) {
        this.name = null;
        this.fn = null;
        this.component = null;
        this.name = name;
        this.fn = fn;
        this.component = component;
    }
    exec() {
        return this.fn(this.component.binds.map((i) => i.value));
    }
}
function createBind({ name, initial }) {
    return new Bind({ name, value: initial || null });
}
exports.createBind = createBind;
class Component {
    constructor({ childs = [], type = null, content }) {
        this.childs = [];
        this.type = null;
        this.content = null;
        this.binds = [];
        this.fn = null;
        this.methods = [];
        this.element = null;
        this.childs = childs;
        this.type = type;
        this.content = content;
    }
    setFunction(fn) {
        this.fn = fn;
    }
    setChilds(...childs) {
        this.childs = childs;
    }
    setContent(content) {
        this.content = content;
    }
    bind(bind) {
        this.binds.push(bind);
        bind.subscribeComponent(this);
    }
    addMethod(name, fn) {
        this.methods.push(new Method({ name, fn, component: this }));
    }
    addEvent(event, method) {
        this.element.addEventListener(event, () => this.exec(method));
    }
    exec(name) {
        const method = this.methods.find(i => i.name === name);
        return method.exec();
    }
    refresh() {
        this.element.innerText = this.fn(this.binds.map(i => i.value));
    }
    build() {
        const element = document.createElement(this.type);
        this.element = element;
        if (this.content)
            element.innerText = this.content;
        element.append(...this.childs.map(child => child.build()));
        return element;
    }
}
function componentToFunction(component) {
    return function (...args) {
        const childs = args.map(arg => {
            if (arg instanceof Component)
                return arg;
            return new Component({ content: arg });
        });
        const c = new Component(component);
        c.childs = childs;
        return c;
    };
}
exports.componentToFunction = componentToFunction;
function createComponent(options) {
    return new Component(options);
}
exports.createComponent = createComponent;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../bitter/index");
const count = index_1.createBind({ name: 'count', initial: 0 });
const paragraph = index_1.createComponent({ content: 'initial value', type: 'p' });
paragraph.setFunction((count) => `count: ${count}`);
paragraph.bind(count); // esto tiene que hacerlo interno el framework
const button = index_1.createComponent({ type: 'button', content: '+1' });
button.addMethod('plusOne', () => count.setValue(count.value + 1));
const App = index_1.createComponent({ childs: [paragraph, button] });
index_1.createApp(App);
button.addEvent('click', 'plusOne');

},{"../bitter/index":1}]},{},[2]);
