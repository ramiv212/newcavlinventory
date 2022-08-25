export function validateBarcode(userInput,state){

    // check if lentgth

    if (userInput.length != 8){
        state(<span>Length of barcode must be 8 characters</span>)
    }else if (isNaN(userInput)){
        state(<span>Barcode must be a number</span>)
    } else {
        state("")
    }
    
    return userInput
}


export function deleteAll(name,index) {
    const url = "http://localhost:5000/api/items/" + name
    const data = {}
    const params = {
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(data),
      method: "DELETE"
    }
    fetch(url,params)
    .then((response) => {
      // check if the response code is not bad
      if (response.status >= 200 && response.status <= 299) {
        // if it is good, return the response and delete item parent div
        
        if (window.confirm('Are you sure? This action cannot be undone!')){
            const parentDiv = document.getElementsByClassName('main-parent-div' + index)
            parentDiv[0].remove()
        }
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
        throw Error('Unable To Delete')
      }
    })
    // catch an error
    .catch((error) => (console.log(error)))

  }