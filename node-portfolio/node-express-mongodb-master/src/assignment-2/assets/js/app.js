function writeAdviceToPageContainter() {
  let adviceContainer = document.createElement('div')
  adviceContainer.id = 'adviceImage'

  document.body.appendChild(adviceContainer)
}

writeAdviceToPageContainter()

function writeAdviceToPage(text) {
  let locateadviceDiv = document.querySelector('#adviceImage')
  let adviceDiv = document.createElement('div')
  adviceDiv.id = 'adviceDisplay'
 
  adviceDiv.textContent = text
  locateadviceDiv.appendChild(adviceDiv)
}

function updateAdviceDisplay (text) {
  let adviceDiv = document.querySelector('#adviceDisplay')  
  adviceDiv.textContent = text
}

const url = 'https://api.adviceslip.com/advice'

writeAdviceToPage('Loading...')

fetch(url)
  .then(response => {return response.json()
  .then(results =>{
    if(results === "Not Found") {
        throw "uh oh"
      } 
      else {
  const keys = Object.keys(results)
  console.log(results)
  keys.forEach( function(x) {
    const values = results[x]
    updateAdviceDisplay(values.advice)
    })
  }  
})
})

.catch(err => {
  updateAdviceDisplay("Owl be back with more advice shortly!")
  console.log(err)
   })

/*create button*/
const locateButton = document.querySelector("#adviceImage")
const createButton = document.createElement('button')
locateButton.appendChild(createButton)
createButton.textContent = 'Get Advice'
createButton.id = 'adviceButton'

/*make button work*/
const generateAdvice = document.querySelector('#adviceImage')
generateAdvice.addEventListener('click', function() {
fetch(url)
  .then(response => {return response.json()
  .then(results =>{
  const keys = Object.keys(results)
  keys.forEach( function(x) {
    const values = results[x]
    updateAdviceDisplay(values.advice)
    })
  })
})
})