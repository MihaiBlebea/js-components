
function transform(type, props, children)
{
    if(typeof type == 'string' && typeof props == 'object' && Array.isArray(children))
    {
        return { type, props, children };
    } else {
        return null;
    }
}

function getAtt(el)
{
    let att = el.attributes;
    let result = {};

    for(let i = 0; i < att.length; i++)
    {
        result[att[i].name] = att[i].value;
    }
    return result;
}

function getVElement(el)
{
    let tag = el.tagName;
    let att = this.getAtt(el);
    let children = [];
    if(el.hasChildNodes())
    {
        if(el.children.length == 0)
        {
            let textNodes = el.childNodes;
            for(let j = 0; j < textNodes.length; j++)
            {
                children.push(textNodes[j].textContent);
            }
        } else {
            for(let i = 0; i < el.children.length; i++)
            {
                let child = this.getVElement(el.children[i]);
                children.push(child);
            }
        }
    }
    return this.transform(tag, att, children);
}

function setVElement(obj)
{
    if(typeof obj == 'string')
    {
        return document.createTextNode(obj);
    }

    let element = document.createElement(obj.type);
    let k = Object.keys(obj.props);
    let v = Object.values(obj.props);
    for(let i = 0; i < k.length; i++)
    {
        let attribute = document.createAttribute(k[i]);
        attribute.value = v[i];
        element.setAttributeNode(attribute);
    }

    if(obj.children.length > 0)
    {
        for(let j = 0; j < obj.children.length; j++)
        {
            let child = this.setVElement(obj.children[j]);
            element.appendChild(child);
        }
    }
    return element;
}

function mountComponent(elHost, el)
{
    let root = elHost.createShadowRoot();
    root.appendChild(el);
}

export {
    transform,
    getAtt,
    getVElement,
    setVElement,
    mountComponent
}
