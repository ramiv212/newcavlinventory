import React, { createContext, useState } from "react";


const itemsByIdContext = createContext();
const itemsByNameContext = createContext();
const renderNamesContext = createContext();

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function ItemProvider({ children }) {

  // these states check when JSON is loaded
const [idIsLoaded, setIdIsLoaded] = useState(false)
const [nameIsLoaded, setNameIdIsLoaded] = useState(false)
const [renderNames, setRenderNames] = useState(false)

// get JSON data by ID
async function getJson() {
  var jsonData = await fetch('http://localhost:5000/api/items?by=ID')
   .then(response => response.json())
   .then(data => JSON.parse(data))

   return jsonData
 }

// get the list of JSON items from server by name
 async function getJsonByName() {
  var jsonData = await fetch('http://localhost:5000/api/items?by=name')
   .then(response => response.json())
   .then(data => JSON.parse(data))

   setNameIdIsLoaded(true)
   return jsonData
 }

//  delete item from server
function deleteItem(index,childIndex,editState,qty,setQty){
  const url = "http://localhost:5000/api/item/" + childIndex
  const data = {}
  const params = {
    headers:{ "Content-Type": "application/json"},
    body: JSON.stringify(data),
    method: "DELETE"
  }
   let response = fetch(url,params)
    .then(data => data.json())
    .then(res => res)
    .then(

      (data) => {
        if (data) {
            // close edit state for this deleted child node
            editState(false)

            const itemParent = document.getElementsByClassName('main-parent-div' + index)
            const thisItem = document.getElementsByClassName('id' + childIndex)

            // remove this HTML node from DOM
            thisItem[0].style.display = "none"

            // update the quantity of items after deleting
            const itemChildren = document.getElementsByClassName('itemlist-children' + index)
            setQty(qty - 1)

            // check if this is the last child in the parent node. if so, hide parent node.
            qty === 1 ? itemParent[0].style.display = 'none' : console.log()

        }
      }

    )

    return response
} 

  return (
    <renderNamesContext.Provider value={{renderNames,setRenderNames}}>
      <itemsByIdContext.Provider value={{getJson,idIsLoaded,setIdIsLoaded,deleteItem}}>
        <itemsByNameContext.Provider value={{getJsonByName,nameIsLoaded,setNameIdIsLoaded}}>
          {children}
        </itemsByNameContext.Provider>
      </itemsByIdContext.Provider>
      </renderNamesContext.Provider>
  );
}

export { ItemProvider, itemsByIdContext, itemsByNameContext ,renderNamesContext};