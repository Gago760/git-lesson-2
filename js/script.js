let api_key = "api_key=9b702a6b89b0278738dab62417267c49"
let img_url_original = "https://image.tmdb.org/t/p/original"
let img_url = "https://image.tmdb.org/t/p/w500"
let categoriesBtns = document.querySelector('.categoriesBtns')
let search = document.querySelector('.search')
let closePopUp = document.querySelector('.close-pop-up')
let searchPop = document.querySelector('.searchPop')
let populars = document.querySelector('.populars')
let headerPop = document.querySelector('.headerPop')
let inp = document.querySelector('#searchInp')
let closeX = document.querySelector('.closeX')
const options = {method: 'GET', headers: {accept: 'application/json'}};

search.addEventListener('click',()=>{
    headerPop.style.display = 'flex'
    headerPop.classList.add('header2')
})

fetch(`https://api.themoviedb.org/3/genre/movie/list?${api_key}`, options)
.then(response => response.json())
.then(response => printCategoriesBtns(response.genres))
.catch(err => console.error(err));

function printCategoriesBtns(obj) {
    let a = []
    categoriesBtns.innerHTML = ''
    obj.forEach((e) => {
        let btn = document.createElement('button')
        btn.innerHTML = e.name
        btn.classList.add('cat-btn','categoriesBtn')
        // btn.classList.add('cat-btn')
        categoriesBtns.appendChild(btn)
        btn.addEventListener('click',()=>{
            // a.push(e.id)
            // a.find(e => e == e.id)?a = a.filter(e => e !== e.id):a.push(e.id)
            if (a.find(b => b == e.id)) {
                a = a.filter(b => b !== e.id)
            }else{
                a.push(e.id)
            }
            // a = a.filter(b=>b == e.id)
            console.log(a);
            fetch(`https://api.themoviedb.org/3/discover/movie?${api_key}&with_genres=${a}`, options)
            .then(res => res.json())
            .then(res => printPopulars(res.results))
            .catch(err => console.error(err));
            btn.classList.toggle('cat-btn')
        })
        
    })
}

fetch('https://api.themoviedb.org/3/movie/popular?'+api_key)
.then(response => response.json())
.then(response => printPopulars(response.results))
.catch(err => console.error(err));

closeX.addEventListener('click',()=>{
    searchPop.style.display = 'none'
    headerPop.style.display = 'none'
    
    fetch('https://api.themoviedb.org/3/movie/popular?'+api_key)
    .then(response => response.json())
    .then(response => printPopulars(response.results))
    .catch(err => console.error(err));
})

function printPopulars(arr) {
    populars.innerHTML = ''
    arr.forEach((e) => {
        let a = Math.round(e.vote_average)
        let raiting = document.createElement('div')
        raiting.classList.add('raiting')
        if (a>7) {
            raiting.classList.add('green')
        }else{
            raiting.classList.add('red')
        }
        raiting.innerHTML = a
        let movie = document.createElement('a')
        movie.href = `single.html?id=${e.id}`
        movie.classList.add('movie')
        movie.innerHTML = `
        <img src="${img_url + e.poster_path}" >
        `
        movie.addEventListener('mouseenter',()=>{
            raiting.style.display = 'flex'
        })
        movie.addEventListener('mouseleave',()=>{
            raiting.style.display = 'none'
        })
        populars.appendChild(movie)
        movie.append(raiting)

    })
}


function searchMovie() {
    inp.addEventListener('input',()=>{
        searchPop.innerHTML = ''
        fetch(`https://api.themoviedb.org/3/search/movie?`+api_key+'&query='+inp.value)
        .then(response => response.json())
        .then(response => printPopulars(response.results))
        .catch(err => console.error(err));
        if (inp.value.trim()==='') {
            fetch('https://api.themoviedb.org/3/movie/popular?'+api_key)
            .then(response => response.json())
            .then(response => printPopulars(response.results))
            .catch(err => console.error(err));
        }
    })
}
searchMovie()


