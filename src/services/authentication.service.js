import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

function handleResponse(response) {
    return response.json().then(data => {
        if (!data.success) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload();
            }

            const error = data;
            return Promise.reject(error);
        }

        return data.success;

    });
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: username,
            password: password,
        }),
    };

    return fetch(`https://rocky-gorge-10796.herokuapp.com/api/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function signup(name, email, password, cPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            c_password: cPassword,
        }),
    };

    return fetch(`https://rocky-gorge-10796.herokuapp.com/api/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    console.log("logout");
    localStorage.removeItem('carts');
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export let authenticationService = {
    login,
    logout,
    signup,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};
