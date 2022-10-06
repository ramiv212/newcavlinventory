import React,{useState,useContext,useEffect} from 'react'
import {renderNamesContext} from '../contexts/jsonItemsContext'
import {itemsByIdContext} from '../contexts/jsonItemsContext'
import {validateBarcode} from './helperFuncs'


function Itemchild({itemObject,index,childIndex,setItems,qty,setQty,sortBy,childrenDisplay}) {

  // this is a context that can be used to re-render the whole list
  const {renderNames,setRenderNames} = useContext(renderNamesContext)
  const {deleteItem} = useContext(itemsByIdContext)

  // this sets the child to edit mode when the edit button is clicked
  const [edit,setEdit] = useState(false)

  // these are the state of the input fields
  const [barcodeState,setBarcodeState] = useState('')
  const [nameState,setNameState] = useState('')
  const [serialState,setSerialState] = useState('')
  const [manufacturerState,setManufacturerState] = useState('')
  const [categoryState,setCategoryState] = useState('')
  const [storageState,setStorageState] = useState('')
  const [statusState,setStatusState] = useState('')
  const [notesState,setNotesState] = useState('')

  const [validation,setValidation] = useState('')


  // this state is to check if the name field was updated. If it was, re-render the whole item list.
  const [nameWasUpdated,setNameWasUpdated] = useState(false)

  // send a PUT http request with updated values of an item. Return the updated list and set it as the new list.
  function updateItem(){
    const url = "http://localhost:5000/api/item/" + childIndex
    const data = {
      manufacturer: manufacturerState,
      name: nameState,
      barcode: barcodeState,
      serial: serialState,
      category: categoryState,
      storage: storageState,
      status: statusState,
      notes: notesState,
    }
    const params = {
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(data),
      method: "PUT"
    }
    fetch(url,params)
    .then((response) => {
      // check if the response code is not bad
      if (response.status >= 200 && response.status <= 299) {
        // if it is good, return the response
        return response.json()
      } else {
        // if it is bad, get the server error response asynchronously
          let getMsg = async (response) => {
          // then get the json from the error response
          let msg = await response.json()
          // then parse the json and push it to an alert message
          window.alert(JSON.parse(msg))
        }
        // call the error response function and pass mesage to it
        getMsg(response);
        // throw an error
        throw Error('Unique Constraint Barcode')
      }
    })
    // if no error from server, set items state to the json response
    .then(res => setItems(JSON.parse(res)))
    // catch an error
    .catch((error) => (console.log(error)))

    // set the nameWasUpdated state back to false to use again
    setNameWasUpdated(false)
  }

  useEffect(() => {
    
    console.log()
    const children = document.getElementsByClassName('itemlist-children' + index)
    
    setQty(children[0].childNodes.length)
  }, [sortBy])
  

  return (
    // this classname is to be able to select to hide and un-hide chi;dren
    <div className={index + 'itemlist-child itemlist-child id' + childIndex} style={{display: childrenDisplay}}>

      <div className='itemlist-child-inner-div'>
        {/* item name and barcode text. Show and hide with state. */}
        
        {(edit) && <div className='item-child-text'>
        Barcode:<br />
        Manufacturer:<br />
        Name:<br />
        Serial:<br />
        Category:<br />
        Storage:<br />
        Status:<br />
        Notes:
        </div>}
        <div>
        {/* if edit mode is disabled, show name & barcode*/}
        {(!edit) && <span>{itemObject['barcode']} | &nbsp;</span>}
        {(!edit) && <span>{itemObject['name']}</span>}

        {/* item input boxes. Show and hide with state. */}
        {/* Change name and barcode state with onChange handler */}
        {edit && <div><input className='item-child-input' value={barcodeState} 
        onChange={(e) => {setBarcodeState(validateBarcode(e.target.value,setValidation));}
        } type='number'></input></div>}

        {edit && <div><input className='item-child-input' value={manufacturerState} onChange={
          (e) => {setManufacturerState(e.target.value);}
        }></input></div>}

        {edit && <div><input className='item-child-input' value={nameState} onChange={
          (e) => {setNameState(e.target.value);setNameWasUpdated(true)}
        }></input></div>}
        
        {edit && <div><input className='item-child-input' value={serialState} onChange={
          (e) => {setSerialState(e.target.value);}
        }></input></div>}

        {edit && <div><select className='item-child-input' value={categoryState} onChange={
          (e) => {setCategoryState(e.target.value);}
        }>
          <option>Audio</option>
          <option>Video</option>
          <option>Lighting</option>
          <option>Rigging</option>
          <option>Other</option>
          </select></div>}
        
        {edit && <div><input className='item-child-input' value={storageState} onChange={
          (e) => {setStorageState(e.target.value);}
        }></input></div>}

        {edit && <div><select className='item-child-input' value={statusState} onChange={
          (e) => {setStatusState(e.target.value);}

        }>
          
          <option>OK</option>
          <option>Broken</option>
          <option>Sent For Repair</option>
          <option>Loaned To Customer</option>
          <option>See Notes</option>

        </select></div>}

        {edit && <div><textarea rows={5} value={notesState} onChange={
          (e) => {setNotesState(e.target.value);}
        }></textarea></div>}


        {/* delete button */}
        {edit && <button onClick={
        // if edit state is false then set to true and vice versa
        // if true then delete the item by index. deleteItem returns objet with all items
        // also pass the setEdit func to delete item so that it can be set to false from inside that function
        // this is to close the edit state once item has been deleted
        () => {window.confirm("Are you sure?") ? setItems(deleteItem(index,childIndex,setEdit,qty,setQty))
               : console.log('Delete Canceled')}
      } className='btn btn-danger item-delete-button'>Delete</button>}

        </div>
      </div>
      
      <div className='child-item-button-div' style={{display: 'flex', flexDirection: 'column',alignItems:'center'}}>
        <div style={{display: 'flex',width:'100%',alignItems:'center'}}>
      {/* edit button. Show and hide with state. Populate
      the input boxes with object info. */}
      {(!edit) && <button onClick={
        // if edit state is false then set to true and vice versa
        () => {(!edit) ? setEdit(true) : setEdit(false)
                setBarcodeState(itemObject['barcode'])
                setManufacturerState(itemObject['manufacturer'])
                setNameState(itemObject['name'])
                setSerialState(itemObject['serial'])
                setCategoryState(itemObject['category'])
                setStorageState(itemObject['storage'])
                setStatusState(itemObject['status'])
                setNotesState(itemObject['notes'])}
      } className='btn btn-primary itemchild-button'>Edit</button>}

      {/* update button */}
      {edit && <button onClick={
        // if edit state is false then set to true and vice versa
        // check if the name was updated in the item. If it was, it wil re-render the whole items list to reflect the name change
        () => {(edit) ? setEdit(false) : setEdit(true); updateItem(); nameWasUpdated ? setRenderNames(!renderNames):console.log(nameWasUpdated)}
      } className='btn btn-success itemchild-button' 
        disabled={validation !== "" ? true : false }>Update</button>}

      {/* cancel update button */}
      {edit && <button onClick={
        // if edit state is false then set to true and vice versa
        () => {(edit) ? setEdit(false) : setEdit(true);}
      } className='btn btn-danger itemchild-button'>Cancel</button>}
      </div>

        {edit && <span style={{width:'100%',padding: '10px'}}>{validation}</span>}

    </div>
      
    </div>
  )
}

export default Itemchild