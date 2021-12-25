import { mainApiBaseUrl } from "./const";
import { moviesApiBaseUrl} from "./const";

class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._moviesApiBaseUrl =  moviesApiBaseUrl;
    }

    getFavouritesMovie(token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => this._handleResponse(res))
    }

    setFavouriteMovie(data, token) {
            return fetch (`${this._baseUrl}/movies`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
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

    deleteFavouriteMovie(id, token) {
        return fetch (`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            this._handleResponse(res)
        })
    }

    getUserData(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
});

export default mainApi;