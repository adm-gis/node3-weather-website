// console.log('Client Side JS file is loaded')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one') //querySelector matches the first element it finds
const messageTwo = document.querySelector('#message-two')

console.log(weatherForm)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('The user entered: ' + location)
    const url = `/weather?address=${location}`

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response)=>{
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                // console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.description 
                // console.log(data.location)
                console.log(data.forecast)
                // console.log(data)
            }
        })
    })
})

