import { transform,
         getAtt,
         getVElement,
         setVElement,
         mountComponent } from './src/virtualDom.js';
import NameBox from './components/NameBox.js';
import List from './components/List.js';

window.customElements.define('name-box', NameBox);
window.customElements.define('show-list', List);

export {
    transform,
    getAtt,
    getVElement,
    setVElement,
    mountComponent
}
