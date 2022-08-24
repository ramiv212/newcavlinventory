import React,{useEffect,useState} from 'react'
import Itemchild from './Itemchild'


function Item({name,items,manufacturer,index,setItems}) {

  const [refreshItem,setRefreshItem] = useState(false)
  const [children,setChildren] = useState(document.getElementsByClassName(index))

  function hideChildren(){
    // iterate over children and hide them
    for (const key in children) {
      if (Object.hasOwnProperty.call(children, key)) {
        const element = children[key];
        element.style.display = 'none'
      }
    }
  }
  
  function toggleHideChildren(){

    // iterate over children and hide them

    if (children[0].style.display === 'none'){
      for (const key in children) {
        if (Object.hasOwnProperty.call(children, key)) {
          const element = children[key];
          element.style.display = ''
        }
      }
    } else if (children[0].style.display === ''){
      for (const key in children) {
        if (Object.hasOwnProperty.call(children, key)) {
          const element = children[key];
          element.style.display = 'none'
        }
      }
    }
  }

  useEffect(
    () => {

      setChildren(document.getElementsByClassName(index + 'itemlist-child'))
      hideChildren()

      console.log('item rendered')
    }
    ,[children,index])

  return (
    <div>
      
    <div className={'item-info-container itemlist-item parent-item' + index} onClick={toggleHideChildren} >  
      <div className='item-manufacturer'>{manufacturer}</div>&nbsp;
      <div className='item-name'>{name}</div>
    </div>

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
          key={i}/>
        }
      })}
    </div>
      
    </div>
  )
}

export default Item