" use strict ";
import { parseHTML } from "/js/utils/parseHTML.js";


const commentRenderer = {

    asComment: function(comment) {

        let html =
            `
        <div>
            <div class="comment-and-photo">
                <div class="profile">
                    <img src="${comment.profilePhotoLink}" class="profile-small-photo">
                    <a href="profile.html?userId=${comment.userId}" class="link-profile">@${comment.userName}</a>
                </div>

                <div class="comment">
                    <span>${comment.TEXT}</span>
                </div>

            </div>

            <hr>

        </div>
        `;

        let bodyComment = parseHTML(html);
        return bodyComment;

    },

    asEmptyComment: function() {
        let html =
            `
        <div>
            <div class="comment-and-photo">

                <div class="comment">
                    <span>No se han encontrado comentarios disponibles para esta publicación.</span>
                </div>

            </div>

            <hr>

        </div>
        `;

        let emptyComment = parseHTML(html);
        return emptyComment;
    }




}

export { commentRenderer };