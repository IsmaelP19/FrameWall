from silence.decorators import endpoint

@endpoint (
    route="/photos",
    method="GET",
    sql="SELECT * FROM publicPhotos ORDER BY uploadingDate DESC LIMIT 8;"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM Photos WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, link, visibility, userId) VALUES ($title, $description, $link, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=True,
)

def create(title, description, link, visibility, userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET userId = $userId, title = $title, description = $description, link = $link, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(userId, title, description, link, visibility):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass

###############################################################################

@endpoint(
    route= "/photos/$photoId/categories",
    method= "GET",
    sql = "SELECT * FROM categoriesphotos NATURAL JOIN categories WHERE photoId = $photoId",
    description= "Gets all the categories of a single photo given its photoId",

)

def getPhotoCategory():
    pass

###############################################################################


@endpoint (
    route="/photos/category/$catName",
    method="GET",
    sql="SELECT * FROM categories NATURAL JOIN categoriesphotos NATURAL JOIN publicPhotos WHERE catName = $catName ORDER BY uploadingDate DESC",
    description= "Gets the photos of a given categoryName."
)

def getPhotosByCategoryName():
    pass

################################################################################

@endpoint (
    route="/photos/$photoId/averageScore",
    method="GET",
    sql="SELECT AVG(VALUE) as media FROM Evaluations where photoId = $photoId",
    description="Gets the average score of a photo given its photoId",
)

def getAverageScoreByPhotoId():
    pass

################################################################################

@endpoint (
    route="/photos/$photoId/comments",
    method="GET",
    sql="SELECT commentId, comments.photoId, comments.userId, TEXT, commentDate, users.userName, users.profilePhotoLink FROM comments NATURAL JOIN users WHERE comments.photoId = $photoId ORDER BY commentDate DESC",
    description= "Get the comments of a photo given its photoId"
)

def getCommentsByPhotoId():
    pass

################################################################################

@endpoint (
    route="/photos/$photoId/comments",
    method="POST",
    sql="INSERT INTO Comments(photoId, userId, text) VALUES ($photoId, $userId, $text)",
    description= "Post a new comment.",
    auth_required=True
)

def postComment(userId, text):
    pass


################################################################################

@endpoint (
    route="/photos/$photoId",
    method="POST",
    sql="INSERT INTO evaluations(photoId, userId, value) VALUES ($photoId, $userId, $value)",
    description="Post a new photo valoration. ",
    auth_required=True,
)

def postValoration(userId, value):
    pass


###############################################################################