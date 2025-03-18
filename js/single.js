const api_key = "api_key=9b702a6b89b0278738dab62417267c49"
let slug = location.search.split('=')
let singleId = slug[slug.length -1]
let root = document.getElementById('root')
let img_url_original = "https://image.tmdb.org/t/p/original"
let img_url = "https://image.tmdb.org/t/p/w500"
let rootImg = document.querySelector('.root-img')
let rootText = document.querySelector('.root-text')
let actors = document.querySelector('.actors')
let rootInf = document.querySelector('.root-inf')
let trailer = document.querySelector('.trailer')
let cartDiv = document.querySelector(".cart");
let cartContent = document.querySelector(".cart-content");
let loader = document.querySelector(".loader");
let back = document.querySelector('.back')
let similar = document.querySelector('.similar')

back.addEventListener('click',()=>{
    loader.style.display = "block"; // Show loader
    cartContent.style.display = "none"; // Hide content while loading
    
    setTimeout(() => {
        loader.style.display = "none"; // Hide loader after 1.5s
        cartContent.style.display = "block"; // Show content after loading
    }, 1500);
    
    
})

fetch(`https://api.themoviedb.org/3/movie/${singleId}?`+api_key)
.then(response => response.json())
.then(response => printMovie(response))
.catch(err => console.error(err));

fetch(`https://api.themoviedb.org/3/movie/${singleId}/credits?` + api_key)
.then(response => response.json())
.then(response => printActor(response.cast))
.catch(err => console.error(err));

fetch(`https://api.themoviedb.org/3/movie/${singleId}/videos?`+api_key)
.then(response => response.json())
.then(response => printTrailers(response.results))
.catch(err => console.error(err));


function printMovie(obj) {
    root.style.backgroundImage = `url("${img_url_original + obj.backdrop_path}")`
    rootImg.innerHTML = `
    <img src="${img_url + obj.poster_path}" >
    `
    // console.log(obj);
    let i = Math.floor(obj.vote_average*10)/10
    rootText.innerHTML =  `
    <h1>${obj.title} ${obj.release_date.split('-')[0]}</h1>
    <p>${obj.overview}</p>
    
    `    
}

function printActor(arr) {
    actors.innerHTML = ''
    arr.forEach((e) => {
        let d = document.createElement('div')
        d.classList.add('actor_cart')
        d.innerHTML = `
            <img src="${img_url + e.profile_path}" />
            <p class="txt">${e.name}</p>
        `
        actors.append(d)
    });
    
}

function printTrailers(arr) {
    trailer.innerHTML = ''
    arr.forEach((e) => {
        let d = document.createElement('div')
        let s = document.createElement('div')
        let a = document.createElement('div')
        d.classList.add('trailer_cart')
        s.classList.add('trailer_cart_s')
        d.innerHTML = `
            <iframe class="pop-ifr" allowfullscreen src="https://www.youtube.com/embed/${e.key}" frameborder="0"></iframe>
        `
        trailer.append(d)
        root.append(s)
        // console.log(d);
        
        a.style.position = 'absolute'
        d.style.position = 'relative'
        a.style.top = 0
        a.style.left = 0
        a.style.width = 100 +'%'
        a.style.height = 100 +'%'
        d.append(a)
        a.addEventListener('click',()=>{
            loader.style.display = "block"; // Show loader
            cartContent.style.display = "none"; // Hide content while loading
            
            setTimeout(() => {
                loader.style.display = "none"; // Hide loader after 1.5s
                cartContent.style.display = "block"; // Show content after loading
            }, 1500);
            
            s.style.display = 'flex'
            s.innerHTML = `
                <iframe class="pop-ifr" allowfullscreen src="https://www.youtube.com/embed/${e.key}" frameborder="0"></iframe>
                <i class="fa-solid fa-xmark fa-2xl"></i>
            `
        })
        s.addEventListener('click',()=>{
            s.style.display = 'none'
            s.innerHTML = ''
        })
    })
}

   
        loader.style.display = "block";
        cartContent.style.display = "none"; 
        
        setTimeout(() => {
            loader.style.display = "none"; 
            cartContent.style.display = "block"; 
        }, 1500);
        
         
        
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDYwZDdiMjQ0YWJhODMzZjc0YzY5OTE5NGFkNDAzYSIsIm5iZiI6MTY4MjY4Mzg2Ny45NCwic3ViIjoiNjQ0YmI3ZGIwYzEyNTUwNTQwN2FmNjdlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qzmMTf7Oe4XS8gUyvsAtzNnKNf-wh1W_eJBpj4yN1Cs'
            }
        };
        
        fetch(`https://api.themoviedb.org/3/movie/${808}/similar?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => printSimilarMovies(res.results))
        // .then(res => console.log(res.results))
        .catch(err => console.error(err));
        
        
        function printSimilarMovies(arr) {
            arr.forEach((e)=>{
                let movie = document.createElement('div')
                movie.classList.add('similarMovie')
                movie.innerHTML = `
                <img src="${img_url + e.backdrop_path}" />
                <p class="similarMoviep">${e.original_title}</p>
                `
                
                movie.addEventListener('mouseenter',()=>{
                    similar.style.backgroundImage =  `url(${img_url_original + e.backdrop_path})`
                })
                similar.append(movie)
            })
        }
        
        
        