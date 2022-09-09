from silence.decorators import endpoint

@endpoint(
    route="/users/",
    method="GET",
    sql="SELECT * FROM Users"
)

def getAll():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass


###############################################################################

# Este endpoint lo usaremos para obtener un array, y contaremos el número de fotos a partir del tamaño de ese array

@endpoint(
    route= "/users/$userId/photos",
    method="GET",
    sql= "SELECT * FROM users NATURAL JOIN photos WHERE userId = $userId ORDER BY uploadingDate DESC",
    description= "Get the photos of a user given its userId."
)

def getAllPhotosByUser():
    pass

###############################################################################


@endpoint(
    route= "/users/$userId/publicphotos",
    method="GET",
    sql= "SELECT * FROM users NATURAL JOIN publicPhotos WHERE userId = $userId ORDER BY uploadingDate DESC",
    description= "Get the public photos of a user given its userId."
)

def getPublicPhotosByUser():
    pass

###############################################################################

@endpoint(
    route="/users/$userId/followers",
    method="GET",
    sql = "SELECT userName, NAME, surnames, mail, profilePhotoLink  FROM followers JOIN users ON followers.userId1 = users.userId WHERE followers.userId2 = $userId",
    description="Get the followers of a user given its userId"

)

def getFollowersByUser():
    pass

###############################################################################

@endpoint(
    route="/users/$userId/followed",
    method="GET",
    sql = "SELECT userName, NAME, surnames, mail, profilePhotoLink  FROM followers JOIN users ON followers.userId1 = users.userId WHERE followers.userId1 = $userId",
    description="Get the followed of a user given its userId"

)

def getFollowedByUser():
    pass