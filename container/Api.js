export default class Api {
    static header() {
        return {
            'Content-Type': 'application/json'
        }
    }

    static get(route) {
        return this.str(route, null, 'GET');
    }

    static post(route, params) {
        return this.str(route, params, 'POST');
    }

    static put(route, params) {
        return this.str(route, params, 'PUT');
    }

    static delete(route, params) {
        return this.str(route, params, 'DELETE');
    }

    static str(route, params, verb) {
        const host = ''; //urls.host;
        const url = `${host}${route}`;

        let options = Object.assign({
            method: verb
        }, params ? { body: JSON.stringify(params) } : null);
        options.headers = Api.header();

        return fetch(url, options).then(response => {
            let json = response.json();
            if (response.ok) {
                return json;
            } else {
                return json.then(err => {
                    throw err
                });
            }
        })
    }
}
