import requests

pics=["http://arshdeep54.pythonanywhere.com/"]
def patchpic(review_id):
    try:
        url=f"http://arshdeep54.pythonanywhere.com/moviesapi/movies/{movies_id}/reviews/{review_id}/"
        # body={
        #     "userProfile":
        # }
        # response=requests.patch(url,body)
    except:


def getReviews(movies_id):
    try:
        url = f"http://arshdeep54.pythonanywhere.com/moviesapi/movies/{movies_id}/reviews"
        response=requests.get(url)
        reviews=response.data
        for review in reviews:
            review_id=review.id
            patchpic(review_id=review_id)
            break
    except:
        print("something went wrong")
def getMovies():
    try:
        url = f"http://arshdeep54.pythonanywhere.com/moviesapi/movies/"
        response=requests.get(url)
        movies=response.data
        for movie in movies:
            movie_id=movie.id
            getReviews(movies_id=movie_id)
            break
    except:
        print("something went wrong")