import { mainApiBaseUrl } from "./const";
import { moviesApiBaseUrl} from "./const";

class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._moviesApiBaseUrl =  moviesApiBaseUrl;
    }

    getFavouritesMovie() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => this._handleResponse(res))
    }

    setFavouriteMovie(data) {
            return fetch (`${this._baseUrl}/movies`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    country: data.country,
                    director: data.director,
                    description: data.description,  
                    duration: data.duration,
                    image: data.image,
                    trailer: data.trailer,
                    thumbnail: data.thumbnail,
                    movieId: data.movieId,
                    nameRU: data.nameRU,
                    nameEN: data.nameEN,
                    year: Number(data.year),
                }),
            })
            .then((res) => {
                this._handleResponse(res)
            })
    }

    deleteFavouriteMovie(id) {
        console.log(id)
        return fetch (`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => {
            this._handleResponse(res)
        })
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => this._handleResponse(res));
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

}

const mainApi = new MainApi({
    baseUrl: mainApiBaseUrl,
    headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default mainApi;