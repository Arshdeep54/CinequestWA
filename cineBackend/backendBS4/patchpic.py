import requests, random

pics = [
    "Java_1.png",
    "gamer.png",
    "cat.png",
    "hacker.png",
    "man(1).png",
    "man.png",
    "woman.png",
    "profile.png",
    "profile(1).png",
    "user.png",
]


def patchpic(review_id, movies_id):
    try:
        url = f"https://arshdeep54.pythonanywhere.com/moviesapi/movies/{movies_id}/webreviews/{review_id}/"
        review = requests.get(url)
        # print(review.json())
        body = {"userProfile": pics[random.randint(0, 9)]}
        # print(body)
        config = {"headers": {"Content-Type": "application/json"}}
        response = requests.patch(url, json=body)
        print(response.status_code, review_id)
        # print(response.json())
    except:
        print("something went wrong 33")


def getReviews(movies_id):
    try:
        url = f"https://arshdeep54.pythonanywhere.com/moviesapi/movies/{movies_id}/webreviews"
        response = requests.get(url)
        print(response.status_code)
        reviews = list(response.json())

        for review in reviews:
            review_id = review["id"]
            print(review["oneliner"])
            patchpic(review_id=review_id, movies_id=movies_id)
            print("review with id", review_id)

    except:
        print("something went wrong 22")


def getMovies():
    try:
        url = f"https://arshdeep54.pythonanywhere.com/moviesapi/movies/"
        response = requests.get(url)
        movies = list(response.json())
        # print(movies)
        for movie in movies:
            print(movie["title"])
            movie_id = movie["id"]
            getReviews(movies_id=movie_id)

    except:
        print("something went wrong 11")


if __name__ == "__main__":
    getMovies()
