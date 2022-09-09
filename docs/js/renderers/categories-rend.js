"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const catRenderer = {

    asButton: function(category) {
        let html = `
        <button class="button-menu2 cat-btn margin-bottom" onclick="location.href='category.html?catName=${category.catName}'">
        <a href="category.html?catName=${category.catName}" class="cat-btn-lnk">${category.catName}</a>
        </button>
        `;

        let button = parseHTML(html);
        return button;
    },

    asDetails: function(category) {
        let html = `
        <div class="photo-category" id="${category.catName}">
        <span>${category.catName}</span>
        </div>
        `;

        let content = parseHTML(html);
        return content
    },



    asSelectOption: function(category) {
        let html =
            `
                <option id="category-${category.catName}" value="${category.catName}">${category.catName}</option>
            `;

        let option = parseHTML(html);

        return option;

    }


}



export { catRenderer };