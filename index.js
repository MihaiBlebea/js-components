import WebComponent from 'webcomponent';
import 'bootstrap/dist/css/bootstrap.min.css';

class Framework extends WebComponent
{
    constructor()
    {
        super();
        this.state = {
            attributes: [],
            content: null
        }
        this.getAttributes();
        this.state.content = this.innerContent();
        this.setEvents();

        this.turnVirtual();

        if(this.state.content !== null)
        {
            this.render();
        }
    }

    getAttributes()
    {
        let att = this.attributes;
        for(let i = 0; i < att.length; i++)
        {
            this.state.attributes[this.attributes[i].name] = this.attributes[i].value;
        }
        return this.state.attributes;
    }

    setEvents()
    {

    }

    turnVirtual(type, props, ...children)
    {
        return { type, props, children };
    }

    innerContent()
    {
        return this.innerHTML;
    }

    render()
    {
        this.style.color = this.state.attributes.color;
        this.innerHTML = `<div class="alert alert-primary" role="alert">
                            This is a primary alert—check it out!
                          </div>`;
    }
}

window.customElements.define('my-name', Framework);
