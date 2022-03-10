import { moviesApiBaseUrl } from "./const";

class MoviesApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl
    }

    getAllMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        })
    }
}

const movieApi = new MoviesApi(moviesApiBaseUrl);

export default movieApi;