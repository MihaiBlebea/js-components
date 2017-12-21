import WebComponent from 'webcomponent';
import * as bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

class NameBox extends WebComponent
{
    constructor()
    {
        super();
        this.element = this.render();
        this.getAttributes();
        console.log(bootstrap)
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
        root.innerHTML = this.render();
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
        return (`<div class="mb-5">Numele meu este ${this.innerContent()}</div>`);
    }
}

export default NameBox;
