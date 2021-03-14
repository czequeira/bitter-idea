(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.App = void 0;
// export class Bind {
//   name: string = null
//   value: any = null
//   subscribers: Component[] = []
//
//   constructor({ name, value }) {
//     this.name = name
//     this.value = value
//   }
//
//   setValue(value: any) {
//     this.value = value
//     this.subscribers.forEach(i => i.refresh())
//   }
//
//   subscribe(component: Component) {
//     this.subscribers.push(component)
//   }
// }
//
// export class Method {
//   name: string = null
//   fn: any = null
//   component: Component = null
//
//   constructor({ name, fn, component }) {
//     this.name = name
//     this.fn = fn
//     this.component = component
//   }
//
//   exec() {
//     return this.fn(this.component.getBinds().map((i) => i.value))
//   }
// }
class App {
    constructor(childs = []) {
        this.childs = childs;
        this.element = null;
        this.element = document.getElementById('app');
        this.element.append(...childs.map(c => c.getElement()));
    }
}
exports.App = App;
class Component {
    constructor(type = null, content = null, childs = []) {
        this.content = content;
        this.childs = childs;
        this.element = null;
        if (type) {
            this.element = document.createElement(type);
            if (typeof content === 'string')
                this.element.innerText = content;
            this.element.append(...childs.map(child => child.getElement()));
        }
        else
            this.element = document.createTextNode(content);
    }
    setChilds(...childs) {
        this.childs = childs;
    }
    getElement() {
        return this.element;
    }
}
exports.Component = Component;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = void 0;
const index_1 = require("./index");
function p(content, ...childs) {
    return index_1.createComponent('p', content, childs);
}
exports.p = p;

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
const c1 = components_1.p('hola mundo');
index_1.createApp([c1]);

},{"../bitter/components":2,"../bitter/index":3}]},{},[4]);
