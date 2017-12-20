import WebComponent from 'webcomponent';

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

        this.render();
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
        this.addEventListener('click', function() {
            alert(`This should be ${this.state.attributes.color}`);
        });
    }

    innerContent()
    {
        return this.innerHTML;
    }

    render()
    {
        this.style.color = this.state.attributes.color;
        this.innerHTML = `<div>${this.innerContent()} Blebea</div>`;
    }
}

window.customElements.define('my-name', Framework);
