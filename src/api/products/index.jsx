import axios from 'axios';
export const fetchProducts = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://www.amiiboapi.com/api/amiibo/`,
            params,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return resolve(response.data);
        })
        .catch((err) => {
            return reject({
                message: err.message,
                status: 500
            });
        })
    })
}