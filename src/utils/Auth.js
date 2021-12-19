import { mainApiBaseUrl } from "./const";

export class Auth {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    register(name, email, password) {
        return fetch(`${mainApiBaseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then((res) => this._handleResponse(res))
    }

    authorize(email, password) {
        return fetch(`${mainApiBaseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            return localStorage.setItem('jwt', data.token)
        })
        
    }

    checkToken(token) {
        return fetch(`${mainApiBaseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
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

const auth = new Auth(mainApiBaseUrl);

export default auth;