const userSearch = document.querySelector("#user-search");
const btnSearch = document.querySelector("#btn-search");
const movieSearchList = document.querySelector("#movie");
const watchlist = document.querySelector("#watchlist-container");
const watchListButton = document.getElementsByClassName("watchlist-btn");
const movieKey = document.getElementsByClassName('movie-key')


btnSearch.addEventListener("click", function () {
    let html = "";
    let userValue = userSearch.value;
    fetch(`https://www.omdbapi.com/?s=${userValue}&apikey=86f8734e`)
        .then(res => res.json())
        .then(data => {
            data.Search.forEach(element => {
               fetch(`https://www.omdbapi.com/?i=${element.imdbID}&apikey=86f8734e`)
                .then(res => res.json())
                .then(data => {

                    const movieID = data.imdbID;
                    const movieIDkey = data.imdbID + 'k';
                    const watchlistBtnKey = data.imdbID + 'W';
                    const removeBtnKey = data.imdbID + 'R';

                    html += `
                    <div id=${movieID} class="movie-container movie-key">
                        <img id="movie-image" src="${data.Poster}" alt="">
                        <div class="movie-content">
                            <div class="movie-intro">
                                <h2 class="movie-title">
                                ${data.Title}
                                </h2>
                                <p class="rating-container">
                                    <i class="large material-icons">star</i>
                                    <span class="rating">${data.imdbRating}</span>
                                </p>
                            </div>
                            <div class="data">
                                <p class="movie-time">${data.Runtime}</p>
                                <p class="movie-genre">${data.Genre}</p>
                                <div class="watchlist-container">
                                    <button class="card-btn card-watchlist watchlist-btn" id="${watchlistBtnKey}" onclick="addToWatchlist('${movieIDkey}', '${movieID}', '${watchlistBtnKey}', '${removeBtnKey}')">
                                        <img class="icon-image" src="/img/plus.png" alt="">
                                        <span class="add-link">Watchlist</a>
                                    </button>
                            
                                    <button class="card-btn card-watchlist remove-watchlist-btn" id="${removeBtnKey}" onclick="removeFromWatchlist('${removeBtnKey}', '${watchlistBtnKey}', '${removeBtnKey}')">
                                            <img class="icon-image" src="/img/minus.png" alt="">
                                            <span class="add-link">Remove</a>
                                    </button>
                                </div>
                            </div>  
                            <p class="movie-summary">
                                ${data.Plot}
                            </p>
                    </div>
                </div>
                        `;
                movieSearchList.innerHTML = html;
                displayWatchlistOrRemoveBtn();
                })
            });
        })
        
})

function displayWatchlistOrRemoveBtn() {   
    for(let i = 0; i < localStorage.length; ++i) {
           document.getElementById(`${localStorage.key(i)}R`).style.display = 'flex';
           document.getElementById(`${localStorage.key(i)}W`).style.display = 'none';     
        }
}

function removeFromWatchlist(removeBtnKey, watchlistBtnKey, removeBtnKey) {
    document.getElementById(watchlistBtnKey).style.display = 'flex';
    document.getElementById(removeBtnKey).style.display = 'none';

    for(let i = 0; i < localStorage.length; ++i) {
        if(watchlist) {
            console.log(removeBtnKey.slice(0, -1), localStorage.key(i).slice(0, -1))
            if(removeBtnKey.slice(0, -1) === localStorage.key(i).slice(0, -1)) {
                document.getElementById(`${localStorage.key(i).slice(0, -1)}`).style.display = "none";
                localStorage.removeItem(localStorage.key(i));
            }
        } else {
            localStorage.removeItem(localStorage.key(i));
        } 
    }

    if(localStorage.length === 0 && watchlist) {
        watchlist.innerHTML = `
        <div class="user-watchlist">
            <h3>Your watchlist is looking a little empty...</h3>
            <div class="user-container">
                <img src="/img/plus.png" alt="">
                <h3><a href="/index.html">Let's add some movies!</a></h3>
            </div>
        </div>
        `
    }
}


function addToWatchlist(movieIDkey, movieID, watchlistBtnKey, removeBtnKey) {
    document.getElementById(watchlistBtnKey).style.display = 'none';
    document.getElementById(removeBtnKey).style.display = 'flex';
    localStorage.setItem(movieIDkey, "<div id='" + movieID + "' class='movie-container'>" + document.getElementById(movieID).innerHTML) + "</div>";

}

if(localStorage.length > 0) {
    watchlist.innerHTML = "";
    for(let i = 0; i < localStorage.length; ++i) {
        watchlist.innerHTML += localStorage.getItem(localStorage.key(i));
    }
}

