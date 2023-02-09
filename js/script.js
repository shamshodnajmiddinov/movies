import { movies } from "./db.js";

const ul = document.querySelector('.promo__interactive-list')
const promo_bg = document.querySelector('.promo__bg')

const promo__genre = document.querySelector('.promo__genre')
const promo__title = document.querySelector('.promo__title')
const promo__descr = document.querySelector('.promo__descr')
const promo__ratings = document.querySelectorAll('.promo__ratings span')

const promoNav = document.querySelector('.promo__menu-list ul')


let genre = []


function reload(arr) {
    for (let item of arr) {
        const promo_li = document.createElement('li')
        const deletes = document.createElement('div')
        promo_li.classList.add('promo__interactive-item')
        deletes.classList.add('delete')
        promo_li.innerHTML = item.Title

        ul.append(promo_li)
        promo_li.append(deletes)

        let it = item.Ratings.flat(Infinity)

        promo_li.onclick = () => {
            promo__genre.innerHTML = item.Genre
            promo__title.innerHTML = item.Title
            promo__descr.innerHTML = item.Plot.slice(0, 30)
            for (let i of it) {
                promo__ratings[0].innerHTML = `IMDb:${i.Value}`
                promo__ratings[1].innerHTML = i.Source
            }
            deletes.onclick = () => {
               ul.removeChild(promo_li)
            }
            showMoviePromo(item)
        }

    }
}


function showMoviePromo(movie) {
    promo_bg.style.background = `url(${movie.Poster})`
}

function NavReload(data) {
    for (let item of data) {
        if (genre.includes(item.Genre)) {
            genre = genre.filter(el => el !== item.Genre)
        } else {
            genre.push(item.Genre)
            const liPromo = document.createElement('li')
            liPromo.classList.add('promo__menu-item')
            liPromo.innerHTML = item.Genre
            promoNav.append(liPromo)
        }

    }
}


reload(movies)
NavReload(movies)