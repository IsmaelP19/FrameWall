
from silence.decorators import endpoint

@endpoint (
    route="/categories",
    method="GET",
    sql="SELECT * FROM categories order by categoryId LIMIT 28"
)
def get_all():
    pass

###############################################################################

@endpoint (
    route="/categories/$photoId/available",
    method="GET",
    sql="SELECT * FROM categories WHERE catName NOT IN (SELECT catName FROM categories NATURAL JOIN categoriesphotos WHERE photoId=$photoId)",
    description="Gets the available categories of a given photoId"
)

def getAvailableCategories():
    pass

###############################################################################

@endpoint (
    route="/categories/$catName",
    method="GET",
    sql="SELECT * FROM categories WHERE catName = $catName",
    description="Gets the category Id given its category name"
)
def getIdByName():
    pass

###############################################################################




@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories (catname) VALUES ($catName)",
    description="Creates a new category",
    auth_required=False,
)

def createCategories(catName):
    pass


###############################################################################

@endpoint(
    route="/categories/$photoId/$categoryId",
    method="GET",
    sql="SELECT categoryPhotoId FROM CategoriesPhotos WHERE categoryId = $categoryId AND photoId = $photoId",
    description="Gets the categoryPhotoId given its photoId and categoryId",
)

def getCategoryPhotoId():
    pass

###############################################################################

@endpoint(
    route="/categories/photos/",
    method="POST",
    sql="INSERT INTO CategoriesPhotos(photoId, categoryId) VALUES ($photoId, $categoryId)",
    description="Attaches a category to a photo",
    auth_required=False
)

def attachCategory(photoId, categoryId): 
    pass


###############################################################################

@endpoint(
    route="/categories/photos/$categoryPhotoId",
    method="DELETE",
    sql="DELETE FROM CategoriesPhotos WHERE categoryPhotoId = $categoryPhotoId",
    description="Detaches a category from a photo",
    auth_required=False
)

def detachCategory():
    pass

###############################################################################

