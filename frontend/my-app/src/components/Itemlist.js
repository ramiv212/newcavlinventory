import React,{useEffect,useState,useContext} from 'react'
import Item from './Item'
import CreateItem from './CreateItem'
import {itemsByIdContext,itemsByNameContext,renderNamesContext} from './../contexts/jsonItemsContext'


function filterObject(object,parameter,filterValue) {
  let result = Object.values(object).filter(value => {
    return value[parameter] === filterValue;
  }); 
  return result
}


function itemSearch(query) {
  const allDivs = document.getElementsByClassName('grandparent-item')
  for (let index = 0; index < allDivs.length; index++) {
    const element = allDivs[index];
    let lowerCaseQuery = element.id.toLowerCase()
    if (!lowerCaseQuery.includes(query.toLowerCase())) {
      element.style.display = 'none';
    } else if (query.length === 0) {
      element.style.display = '';
    }
  }
}

// function get the names of all items in the json object
var nameSetFunc = (jsonRes,by,renderNames,setRenderNames) => {
    // create a new set
    var all_items = []

    // loop over json object that is passed in as an argument
    for (const key in jsonRes) {
        if (Object.hasOwnProperty.call(jsonRes, key)) {

            // get each element from object and assign it to const
            const element = jsonRes[key];

            // add the element to a set
            all_items.push(element)
        }
    }

    if (by === 'manufacturer'){
      all_items.sort(function (x, y) {
        let a = x.manufacturer.toUpperCase(),
            b = y.manufacturer.toUpperCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });} else if (by === 'name'){
      all_items.sort(function (x, y) {
        let a = x.name.toUpperCase(),
            b = y.name.toUpperCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });}

  let setOfNames = new Set()

  all_items.forEach(element => {
      setOfNames.add(element['name'])
    });

    let nameArray = [...setOfNames]
    

    return nameArray
}

// react component function
function Itemlist() {

    const {getJson,idIsLoaded,setIdIsLoaded} = useContext(itemsByIdContext)
    const {getJsonByName,nameIsLoaded} = useContext(itemsByNameContext)
    const {renderNames,setRenderNames} = useContext(renderNamesContext)

    
    const [items, setItems] = useState([])
    const [itemsByName, setItemsByName] = useState([])
    const [nameSet, setNameSet] = useState([])
    const [sortBy, setSortBy] = useState('manufacturer')

    // Create Item component edit state
    const [createItemEdit,setCreateItemEdit] = useState(false)
  
    // run on render
    useEffect(() => {

      // get items from getJson functon and add to 'items' state
      const setJson = async () => {
        var jsonRes = await getJson()
        setItems(jsonRes)
        setIdIsLoaded(true)


        // pass the JSON data into the 'create set' function
        // and then add it to the Set state
        setNameSet(nameSetFunc(jsonRes,sortBy))


        var jsonRes2 = await getJsonByName()
        setItemsByName(jsonRes2)

      }
  
      setJson()
      // console.log('itemlist re-rendered')
      // console.log(idIsLoaded)

      // when JSON arrives, the state is changed
      // and the page is rendered

    }, [sortBy,renderNames,nameIsLoaded,setIdIsLoaded,idIsLoaded])




  return (
    <div className='itemlist'>

      <div style={{fontSize: '125%'}}>
        <div>Sort:</div>
        <form>
          <input style={{height: '10px',width: '10px'}} type={'radio'} value={'Manufacturer'} name={'sort'} onClick={() => {setSortBy('manufacturer'); setRenderNames(!renderNames)}} defaultChecked={sortBy === "manufacturer" ? 'checked' : ""}></input> <span>Manufacturer</span> &nbsp;&nbsp;&nbsp;
          <input style={{height: '10px',width: '10px'}} type={'radio'} value={'Name'} name={'sort'} onClick={() => {setSortBy('name'); setRenderNames(!renderNames)}} defaultChecked={sortBy === "name" ? 'checked' : ""}></input> Name
        </form>
        <div>Search <input type='text' onChange={(e) => {itemSearch(e.target.value)}}></input></div>
      </div>

       {/* show a loading screen when JSON is not loaded */}
       {(!(idIsLoaded && nameIsLoaded)) && <div>loading...</div>}

      {/* do not display until all JSON is loaded */}
      { (idIsLoaded && nameIsLoaded) &&
      <div className='itemlist-inner-wrapper'>
        {/* map over each name in the nameSet */}
       {Object.keys(nameSet).map((keyName, i) => (

            // add the manufacturer name and item name to the id of the div. Maybe will use this for search.
            // TODO error when deleting an individual item
            <div key={i} id={filterObject(items,'name',nameSet[keyName])[0]['manufacturer'] + " " + nameSet[keyName]} className="grandparent-item">

                {/* pass down the index of the parent div to all of the children to add to their class be able to show and hide */}
                <Item 
                name={nameSet[keyName]} 
                items={items} 
                manufacturer={filterObject(items,'name',nameSet[keyName])[0]['manufacturer']}
                index={keyName} 
                setItems={setItems}
                sortBy={sortBy}/>
                
            </div>
        ))}
      <div className='item-info-container itemlist-item' onClick={() => {setCreateItemEdit(!createItemEdit); console.log('clicked')}}>
        <div style={{margin: 'auto'}}>Create Item {createItemEdit ? <b>-</b> : <b>+</b>}</div>
      </div>
      {createItemEdit && <CreateItem className='itemlist-child' editState={setCreateItemEdit} setItems={setItems} sortBy={sortBy}/>}
      </div>
      }
    </div>
    
  )
}

export default Itemlist

