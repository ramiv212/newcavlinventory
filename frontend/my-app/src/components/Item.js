import React,{useEffect,useState} from 'react'
import Itemchild from './Itemchild'
import { deleteAll } from './helperFuncs'


function Item({name,items,manufacturer,index,setItems,sortBy}) {

  const [refreshItem,setRefreshItem] = useState(false)
  const [childrenDisplay,setChildrenDisplay] = useState('none')

  const [qty,setQty] = useState(0)

  useEffect(
    () => {

      // console.log('item rendered')

    }
    ,[index,sortBy,childrenDisplay,qty])

  return (
    <div className={'main-parent-div' + index}>
      
    <div className={'item-info-container itemlist-item parent-item' + index} 
    onClick={() => {childrenDisplay === 'none' ? setChildrenDisplay('') : setChildrenDisplay('none')}}>

      <div>{qty} | </div> &nbsp;
      <div className='item-manufacturer'>{manufacturer}</div>&nbsp;
      <div className='item-name'>{name}</div>
    </div>

    {/* {childrenDisplay && */}
    <div>
     <div className={'itemlist-children itemlist-children' + index}>
      {Object.keys(items).map((keyName, i) => {
        if (name === items[keyName]['name']) {
          return <Itemchild 
          itemObject={items[keyName]} 
          index={index} 
          childIndex={keyName} 
          setItems={setItems}
          items={items}
          refreshItem={refreshItem}
          setRefreshItem={setRefreshItem}
          qty={qty}
          setQty={setQty}
          sortBy={sortBy}
          childrenDisplay={childrenDisplay}
          key={i}/>
        }
      })}
    </div>
      {/* delete button */}
      <div className={'itemlist-children itemlist-children'} style={{display: childrenDisplay}}>
                    <div className={index +'itemlist-child itemlist-child'}>
                      <button onClick={() => {deleteAll(name,index)}} className='btn btn-danger '>Delete All</button>
                    </div>
                  </div>
      </div>
      {/* } */}

    </div>
  )
}

export default Item