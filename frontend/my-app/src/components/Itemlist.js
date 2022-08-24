import React,{useEffect,useState,useContext} from 'react'
import Item from './Item'
import CreateItem from './CreateItem'
import {itemsByIdContext,itemsByNameContext,renderNamesContext} from './../contexts/jsonItemsContext'

// function get the names of all items in the json object
var nameSetFunc = (jsonRes) => {
    // create a new set
    var nameSet = new Set()

    // loop over json object that is passed in as an argument
    for (const key in jsonRes) {
        if (Object.hasOwnProperty.call(jsonRes, key)) {

            // get each element from object and assign it to const
            const element = jsonRes[key];

            // add the element to a set
            nameSet.add(element['name'])
        }

    // create an array and spread all the set elements into the array
    var nameArray = [...nameSet]

    }return nameArray
}

// react component function
function Itemlist() {

    const {getJson,idIsLoaded,setIdIsLoaded} = useContext(itemsByIdContext)
    const {getJsonByName,nameIsLoaded,setNameIdIsLoaded} = useContext(itemsByNameContext)
    const {renderNames} = useContext(renderNamesContext)

    const [items, setItems] = useState([])
    const [itemsByName, setItemsByName] = useState([])
    const [nameSet, setNameSet] = useState([])

    // Create Item component edit state
    const [createItemEdit,setCreateItemEdit] = useState(false)

    // run on render
    useEffect(() => {
      setIdIsLoaded(false)
      setNameIdIsLoaded(false)

      // get items from getJson functon and add to 'items' state
      const setJson = async () => {
        var jsonRes = await getJson()
        setItems(jsonRes)

        // pass the JSON data into the 'create set' function
        // and then add it to the Set state
        setNameSet(nameSetFunc(jsonRes))

        var jsonRes2 = await getJsonByName()
        setItemsByName(jsonRes2)
      }
  
      setJson()

      console.log('itemlist re-rendered')

    }, [renderNames])


  return (
    <div className='itemlist'>

       {/* show a loading screen when JSON is not loaded */}
       {(!(idIsLoaded && nameIsLoaded)) && <div>loading...</div>}

      {/* do not display until all JSON is loaded */}
      { (idIsLoaded && nameIsLoaded) &&
      <div className='itemlist-inner-wrapper'>
        {/* map over each name in the nameSet */}
       {Object.keys(nameSet).map((keyName, i) => (
            <div key={i}>
                {/* pass down the index of the parent div to all of the children to add to their class be able to show and hide */}
                <Item 
                name={nameSet[keyName]} 
                items={items} 
                manufacturer={itemsByName[nameSet[keyName]]['manufacturer']} 
                index={keyName} 
                setItems={setItems}/>
            </div>
        ))}
      <div className='item-info-container itemlist-item' onClick={() => {setCreateItemEdit(!createItemEdit); console.log('clicked')}}>
        <div style={{margin: 'auto'}}>Create Item {createItemEdit ? <b>-</b> : <b>+</b>}</div>
      </div>
      {createItemEdit && <CreateItem className='itemlist-child' editState={setCreateItemEdit}/>}
      </div>
      }
    </div>
    
  )
}

export default Itemlist

