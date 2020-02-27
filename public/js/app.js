// ---------------------------------------------
let h1 = document.querySelector('h1')
let h2 = document.createElement('h2')
let par = document.createElement('p')
let steiner = document.getElementById('stein')
let para = document.querySelectorAll('p')
h2.setAttribute('id', 'weather-heading')
par.setAttribute('id', 'weather-info')

let dataDiv = document.createElement('div')
let mainDiv = document.querySelector('.main-content')
dataDiv.classList.add('thedataDiv')
mainDiv.appendChild(dataDiv)
dataDiv.appendChild(h2)
dataDiv.appendChild(par)


let theForm = document.querySelector('form')


theForm.addEventListener('submit', function(e) {
    e.preventDefault()
    input = document.querySelector('input')
        // ----------------

    // ----------------
    // must be dynamic
    fetch(`/weather?address=${input.value}`)
        .then(function(response) {
            response.json().then(function(data) {
                if (data.error) {

                    par.innerText = data.error

                } else {
                    h2.innerText = data.location
                    par.innerText = data.forecast.Summary

                }

            })
        })
})


theForm.addEventListener('submit', function(e) {
    e.preventDefault()
    input = document.querySelector('input')
    let clientId = '20b0b7e727e3058e2cab73e52b624670f1c75b23473f26451f5d1c652f5f03e7'
    let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${input.value}`

    fetch(url)
        .then(function(data) {
            return data.json()
        })
        .then(function(data) {
            let rand = Math.floor(Math.random() * 10).toFixed(0)
            let result = data.results[rand].urls.regular
            document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${result}')`
            document.body.style.backgroundRepeat = 'no-repeat'
            document.body.style.backgroundSize = 'cover'
            par.style.color = 'white'
            h2.style.color = 'white'
            h1.style.color = 'white'
            stein.innerText = ''

            const array = Array.prototype.slice.call(para)
            for (p of array) {
                p.style.color = 'white'
            }


        })

})