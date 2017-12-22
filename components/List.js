import WebComponent from 'webcomponent';
import * as vd from '../src/virtualDom.js';

class List extends WebComponent
{
    constructor()
    {
        super();
        this.getAttributes();
    }

    getAttributes()
    {
        let att = this.attributes;
        let result = [];

        for(let i = 0; i < att.length; i++)
        {
            result[this.attributes[i].name] = this.attributes[i].value;
        }
        return result;
    }

    connectedCallback()
    {
        console.log('Element is mounted');
        let root = this.createShadowRoot();
        root.appendChild(this.render());
    }

    static get observedAttributes()
    {
        return ['disabled', 'open'];
    }

    attributeChangedCallback(attrName, oldVal, newVal)
    {
        console.log(attrName, oldVal, newVal);
    }

    innerContent()
    {
        return this.innerHTML;
    }

    render()
    {
        let el = {
            type: 'DIV',
            props: { disable: true, open: true, show: false },
            children : [
                {
                    type: 'STRONG',
                    props: { reed: true },
                    children: [ this.innerContent() ]
                }
            ]
        };
        return vd.setVElement(el);
    }
}

export default List;
