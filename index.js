import { transform,
         getAtt,
         updateElement,
         findNodeIndex,
         changed,
         same,
         getVElement,
         setVElement,
         mountComponent,
         setProp,
         setProps,
         removeProp,
         updateProp,
         updateProps,
         isCustomProp,
         isEventProp,
         extractEventName} from './src/virtualDom.js';
import NameBox from './components/NameBox.js';
import List from './components/List.js';

window.customElements.define('name-box', NameBox);
window.customElements.define('show-list', List);

export {
    transform,
    getAtt,
    updateElement,
    findNodeIndex,
    changed,
    same,
    getVElement,
    setVElement,
    mountComponent,
    setProp,
    setProps,
    removeProp,
    updateProp,
    updateProps,
    isCustomProp,
    isEventProp,
    extractEventName
}
