def patchpic(review_id):
    print(review_id)


def getReviews(movies_id):
    try:
        url = f"http://arshdeep54.pythonanywhere.com/moviesapi/movies/{movies_id}"
    except:
        print("something went wrong")
