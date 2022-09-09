" use_strict ";
import { BASE_URL, requestOptions } from "./common.js";

const categoriesAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${ BASE_URL }/categories`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getCategoryPhotoId: function(photoId, categoryId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/${photoId}/${categoryId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })

    },

    getAvailableCategories: function(photoId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/${photoId}/available`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })


    },

    getById: function(categoryId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${ BASE_URL }/categories/${categoryId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByPhotoId: function(photoId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/${photoId}/categories`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

    getIdByName: function(catName) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/${catName}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

    getPhotosByCategoryName: function(catName) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/category/${catName}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

    create: function(formData) {
        return new Promise(function(resolve, reject) {
            axios
                .post(`${ BASE_URL }/categories`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    attach: function(formData) {
        return new Promise(function(resolve, reject) {
            axios
                .post(`${BASE_URL}/categories/photos/`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        })
    },

    delete: function(categoryPhotoId) {
        return new Promise(function(resolve, reject) {
            axios
                .delete(`${ BASE_URL }/categories/photos/${categoryPhotoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    }

};


export { categoriesAPI };