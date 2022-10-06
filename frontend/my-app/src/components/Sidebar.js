import React from 'react'

let sidebarItems = {
    Home: '/',
    Items: '/items',
    Events: '/events'
}

function Sidebar() {
  return (
    <div className='sidebar-wrapper'>

    {Object.keys(sidebarItems).map((keyName, i) => {
        return <a href={sidebarItems[keyName]}><div className='sidebar-item'>{keyName}</div></a>
        }) 
    }

    </div>
  )
}

export default Sidebar

