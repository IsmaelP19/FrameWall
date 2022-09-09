" use_strict ";
import { BASE_URL, requestOptions } from './common.js';
const usersAPI = {
    getById: function(userId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/users/${userId} `, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getPhotosByUser: function(userId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${ BASE_URL }/users/${userId}/photos`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

    getPublicPhotosByUser: function(userId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${ BASE_URL }/users/${userId}/publicphotos`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

    getFollowersByUser: function(userId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/users/${userId}/followers`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

    getFollowedByUser: function(userId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/users/${userId}/followed`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

};
export { usersAPI };