
function customRender(reactElement,container){
   /* THis Version is not great
    const domElement =  document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    domElement.setAttribute('href' , reactElement.props.href)
    domElement.setAttribute('target' , reactElement.props.target)


    container.appendChild(domElement)
 */
    // Version 2
    
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    for(const prop in reactElement.props)
    {
        if (prop === 'children') continue;
        domElement.setAttribute(prop, reactElement.props[prop]) // THis line means reactElement ke props me [prop] ki jo value hai usko 1st prop me daal ke set kar do coz its a key value pair


    }
    container.appendChild(domElement);

}


const reactElement = {
    type : 'a', // This tells ki element ki type ka hai like div,h,etc
    props: {
        href: "https://google.com",
        target: "_blank",

    },
    children: "Click me to visit google"


};


const mainContainer = document.getElementById('root')

customRender(reactElement, mainContainer) 




