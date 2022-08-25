import React,{useState,useContext} from 'react'
import {renderNamesContext} from '../contexts/jsonItemsContext'
import {itemsByIdContext} from '../contexts/jsonItemsContext'

function CreateItem({editState}) {

    const {renderNames,setRenderNames} = useContext(renderNamesContext)
    const {deleteItem} = useContext(itemsByIdContext)

    // these are the state of the input fields
  const [qtyState,setQtyState] = useState(1)
    const [nameState,setNameState] = useState('')
    const [serialState,setSerialState] = useState('')
    const [manufacturerState,setManufacturerState] = useState('')
    const [categoryState,setCategoryState] = useState('')
    const [storageState,setStorageState] = useState('')
    const [statusState,setStatusState] = useState('')
    const [notesState,setNotesState] = useState('')


    function createItem(){
        const url = "http://localhost:5000/api/item"
        const data = {
          qty: qtyState,
          manufacturer: manufacturerState,
          name: nameState,
          serial: serialState,
          category: categoryState,
          storage: storageState,
          status: statusState,
          notes: notesState,
        }
        const params = {
          headers:{ "Content-Type": "application/json"},
          body: JSON.stringify(data),
          method: "POST"
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
        .then(() => {setRenderNames(!renderNames); editState(false)})
        // catch an error
        .catch((error) => (console.log(error)))
      }
    

  return (
    <div style={{display: 'flex', flexDirection: 'row',fontSize:'125%',width:'75%',margin:'auto'}} className='itemlist-child-inner-div'>


        {/* item name and barcode text. Show and hide with state. */}
    <div className='item-child-text'>
        Qty:<br />
        Manufacturer:<br />
        Name:<br />
        Serial:<br />
        Category:<br />
        Storage:<br />
        Status:<br />
        Notes:
        </div>
        <div>

        {/* item input boxes. */}
        <div><input type='number' className='item-child-input' value={qtyState} onChange={
          (e) => {setQtyState(e.target.value);}
        }></input></div>

        <div><input className='item-child-input' value={manufacturerState} onChange={
          (e) => {setManufacturerState(e.target.value);}
        }></input></div>

        <div><input className='item-child-input' value={nameState} onChange={
          (e) => {setNameState(e.target.value);}
        }></input></div>
        
        <div><input className='item-child-input' value={serialState} onChange={
          (e) => {setSerialState(e.target.value);}
        }></input></div>

        <div><select className='item-child-input' value={categoryState} onChange={
          (e) => {setCategoryState(e.target.value);}
        }>
          <option>Audio</option>
          <option>Video</option>
          <option>Lighting</option>
          <option>Rigging</option>
          <option>Other</option>
          </select></div>
        
        <div><input className='item-child-input' value={storageState} onChange={
          (e) => {setStorageState(e.target.value);}
        }></input></div>

        <div><select className='item-child-input' value={statusState} onChange={
          (e) => {setStatusState(e.target.value);}

        }>
          
          <option>OK</option>
          <option>Broken</option>
          <option>Sent For Repair</option>
          <option>Loaned To Customer</option>
          <option>See Notes</option>

        </select></div>

        <div><textarea rows={5} value={notesState} onChange={
          (e) => {setNotesState(e.target.value);}
        }></textarea></div>

        <button className='btn btn-success' onClick={createItem}>Create</button>
        </div>
    </div>
  )
}

export default CreateItem