// Transform or create a virtual DOM node object
function transform(type, props, children)
{
    if(typeof type == 'string' && typeof props == 'object' && Array.isArray(children))
    {
        return { type, props, children };
    } else {
        return null;
    }
}

// Get all props from a DOM element
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

// Update the Virtual DOM
function updateElement(root, newElement, oldElement, index = 0)
{
    if(!oldElement)
    {
        root.appendChild(this.setVElement(newElement));
    } else if(!newElement) {
        index = this.findNodeIndex(root, oldElement);
        root.removeChild(root.children[index]);
    } else if(this.changed(newElement, oldElement)) {
        index = this.findNodeIndex(root, oldElement);
        root.replaceChild(this.setVElement(newElement), (typeof newElement == 'string') ? root.childNodes[index] : root.children[index]);
    } else if(newElement.type) {
        this.updateProps(root.children[index], newElement.props, oldElement.props);
        const newLength = newElement.children.length;
        const oldLength = oldElement.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++)
        {
            this.updateElement(root.children[index], newElement.children[i], oldElement.children[i], i);
        }
    } else {
        console.log('Every element is in sync');
    }
}

// Find the index of one node from the root element
function findNodeIndex(root, node)
{
    let index = 0;
    for(let i = 0; i < root.childElementCount; i++)
    {
        if(this.same(this.getVElement(root.children[i]), node))
        {
            index = i;
        }
    }
    return index;
}

// Compare two nodes and return true if they are different and false if they match
function changed(node1, node2)
{
    return typeof node1 !== typeof node2 ||
           typeof node1 === 'string' && node1 !== node2 ||
           node1.type !== node2.type
}

function same(node1, node2)
{
    return JSON.stringify(node1) == JSON.stringify(node2);
}

// Get a DOM element and transform it into a virtual DOM object
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

// Get a virtual DOM object and transform it into a real DOM element
function setVElement(obj)
{
    if(typeof obj == 'string')
    {
        return document.createTextNode(obj);
    }
    let element = document.createElement(obj.type);
    this.setProps(element, obj.props);
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

// Mount a virtual element to a DOM host
function mountComponent(elHost, el)
{
    let root = elHost.createShadowRoot();
    root.appendChild(el);
}

// Set a new property on the target DOM element
function setProp(target, name, value)
{
    if(this.isCustomProp(name))
    {
        console.log('is event', name)
        // name = this.extractEventName(name);
    } else if(name == 'className') {
        name = 'class';
    }
    target.setAttribute(name, value);
}

// Set props in bulk on the target DOM element
function setProps(target, props)
{
    let keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++)
    {
        this.setProp(target, keys[i], props[keys[i]]);
    }
}

// Remove a prop from the target DOM element
function removeProp(target, name)
{
    if(this.isEventProp(name))
    {
        console.log('is event', name)
    } else if(name === 'className') {
        target.removeAttribute('class');
    }
    target.removeAttribute(name);
}

// Update props
function updateProp(target, name, newVal, oldVal)
{
    if (!newVal)
    {
        this.removeProp(target, name, oldVal);
    } else if(!oldVal || newVal !== oldVal) {
        this.setProp(target, name, newVal);
    }
}

function updateProps(target, newProps, oldProps = {})
{
    const props = Object.assign({}, newProps, oldProps);
    let keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++)
    {
        this.updateProp(target, keys[i], newProps[keys[i]], oldProps[keys[i]]);
    }
}

function isCustomProp(name)
{
    if(name.includes('f-'))
    {
        return true;
    } else {
        return false;
    }
}

function isEventProp(name)
{
    if(name.substring(0, 2) == 'on')
    {
        return true;
    } else {
        return false;
    }
}

function extractEventName(name)
{
    return 'on' + name.split('-')[1].toLowerCase();
}

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
