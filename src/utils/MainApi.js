import { mainApiBaseUrl } from "./const";

class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
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
                    year: data.year,
                }),
            })
            .then((res) => {
                this._handleResponse(res)
            })
    }

    deleteFavouriteMovie() {
        return fetch (`${this._baseUrl}/movies`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => {
            this._handleResponse(res)
        })
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
        'Content-Type': 'application/json'
    }
});

export default mainApi;