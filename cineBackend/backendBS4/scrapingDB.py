import requests
from datetime import datetime
from bs4 import BeautifulSoup
import json

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Content-Type": "application/json",
}


def convertDate(date):
    date = date.split("(")[0].strip()
    try:
        date_object = datetime.strptime(date, "%B %d, %Y")
        formatted_date = date_object.strftime("%Y-%m-%d")
        return formatted_date
    except ValueError:
        try:
            date_object = datetime.strptime(date, "%d %B %Y")
            formatted_date = date_object.strftime("%Y-%m-%d")
            return formatted_date
        except ValueError:
            return date


def post_to_api(movie):
    url = "http://arshdeep54.pythonanywhere.com/moviesapi/movies/"
    res = requests.get(url)
    # print(len(list(res.json())))
    print(movie["title"])
    for movie_item in list(res.json()):
        if movie["title"] == movie_item["title"]:
            body = {
                # "storyline": movie["storyline"],
                # "platform": movie["platform"],
                # "platform_link": movie["platform_link"],
                # "starcast": movie["starcast"],
                # "writers": movie["writers"],
                # "genre": movie["genre"],
                # "language": movie["language"],
            }
            # print(url + str(movie_item["id"]) + "/")
            # response = requests.patch(
            #     url=(url + str(movie_item["id"]) + "/"), data=body
            # )
            # print("data patched ", response.status_code)
            print("movie alreadyt there", movie["title"])
            return movie_item["id"]
    # # return -1
    response = requests.post(url, movie)
    print(response.status_code, "new movie added:", movie["title"])
    if response.status_code == 201:
        return response.json()["id"]
    else:
        return 0

    # return 0


def post_review(review, movie_id):
    url = (
        f"http://arshdeep54.pythonanywhere.com/moviesapi/movies/{movie_id}/webreviews/"
    )
    res = requests.get(url)
    # print(len(list(res.json())))
    # print(review["review_id"])
    if len(list(res.json())) > 0:
        for review_item in list(res.json()):
            if review["review_id"] == review_item["review_id"]:
                return 0
            # break
    # return -1
    response = requests.post(url, review)
    print(response.status_code, "new review posted for id:", movie_id)


def getStoryline(link):
    try:
        storypage = requests.get("https://www.imdb.com" + link, headers=headers)
        storypage.raise_for_status()
        if storypage.status_code == 200:
            soup = BeautifulSoup(storypage.content, "html.parser")
            storyline = (
                soup.find("div", id="__next")
                .main.div.section.find_all(
                    "div",
                    class_="ipc-page-content-container ipc-page-content-container--center",
                )[3]
                .section.div.div.section.find("div", class_="sc-f65f65be-0 bBlII")
                .ul.find_all("li")[1]
                .div.div.div.text
            )
            print("storyline")
            return storyline
        else:
            print("no story")
            return ""
            # print(len(storyline))
            # print(storyline)
    except Exception as e:
        print(e)
        return ""


def post_reviews(movie_id, reviews_link):
    try:
        reviews_page = requests.get(
            "https://www.imdb.com" + reviews_link, headers=headers
        )
        reviews_page.raise_for_status()
        if reviews_page.status_code == 200:
            soup = BeautifulSoup(reviews_page.content, "html.parser")
            reviews_section = (
                soup.find("section", class_="article")
                .find("div", class_="lister")
                .find("div", class_="lister-list")
                .find_all(
                    "div",
                    class_="lister-item",
                )
            )
            for review_detail in reviews_section:
                review_id = review_detail.get("data-review-id")
                # print(review_id)
                one_liner = review_detail.div.div.a.text
                user = review_detail.div.div.find(
                    "div", class_="display-name-date"
                ).span.a.text
                made_at = (
                    review_detail.div.div.find("div", class_="display-name-date")
                    .find("span", class_="review-date")
                    .text
                )
                made_at = convertDate(made_at)
                description = review_detail.div.div.find(
                    "div", class_="content"
                ).div.text
                description = description.replace("<br>", "")
                review = {
                    "review_id": review_id,
                    "user": user,
                    "oneliner": one_liner,
                    "description": description,
                    "made_at": made_at,
                }
                post_review(review, movie_id)
            print("reviews done ", movie_id)

            # break
            # .find_all("div",class_='lister-item mode-detail imdb-user-review  collapsable')
            # print(reviews_section)
            # print(len(reviews_section))
    except Exception as e:
        print(e)


def getMovieDetails(link):
    # print(link)
    try:
        movie_page = requests.get("https://www.imdb.com" + link, headers=headers)
        movie_page.raise_for_status()
        if movie_page.status_code == 200:
            movie_soup = BeautifulSoup(movie_page.text, "html.parser")
            movie_detail = (
                movie_soup.find(
                    "div",
                    id="__next",
                )
                .find("main")
                .div.section.section.find_all(
                    "div",
                    class_="ipc-page-content-container ipc-page-content-container--center",
                )[2]
                .section
            )

            title_year_rating_comp = movie_detail.section.find(
                "div", class_="sc-e226b0e3-3 dwkouE"
            )
            img_src = (
                movie_detail.section.find("div", class_="sc-e226b0e3-4 dEqUUl")
                .find_all("div")[3]
                .img["src"]
            )
            # print(img_src)
            title_year_comp = title_year_rating_comp.div

            try:
                rating = (
                    title_year_rating_comp.find(
                        "div", class_="sc-3a4309f8-0 bjXIAP sc-69e49b85-1 llNLpA"
                    )
                    .div.div.a.span.div.find("div", class_="sc-bde20123-0 dLwiNw")
                    .div.span.text
                )
            except Exception as e:
                print(e, "coming soon")
                rating = 0

            # print(rating)
            genre_list = (
                movie_detail.section.find("div", class_="sc-e226b0e3-4 dEqUUl")
                .find("div", class_="sc-e226b0e3-6 CUzkx")
                .div.section.div.find("div", class_="ipc-chip-list__scroller")
                .find_all("a")
            )
            movie_genre = ""
            genrecount = 0
            for genre in genre_list:
                genrecount += 1
                movie_genre += genre.span.text
                if genrecount < len(genre_list):
                    movie_genre += " ,"
            description = (
                movie_detail.section.find("div", class_="sc-e226b0e3-4 dEqUUl")
                .find("div", class_="sc-e226b0e3-6 CUzkx")
                .div.section.p.find("span", class_="sc-466bb6c-2 chnFO")
                .text
            )

            cast_comp = (
                movie_detail.section.find("div", class_="sc-e226b0e3-4 dEqUUl")
                .find("div", class_="sc-e226b0e3-6 CUzkx")
                .div.section.find("div", class_="sc-69e49b85-3 dIOekc")
                .div.ul.find_all("li", class_="ipc-metadata-list__item")
            )
            # print(len(cast_comp))

            director = cast_comp[0].div.ul.li.a.text
            writers_list = cast_comp[1].div.ul.find_all("li")
            writers = ""
            writercount = 0
            for writer in writers_list:
                writercount += 1
                writers += writer.a.text
                if writercount < len(writers_list):
                    writers += " ,"
            starcast_list = cast_comp[2].div.ul.find_all("li")
            starcast = ""
            starcount = 0
            for star in starcast_list:
                starcount += 1
                starcast += star.a.text
                # starcast += " "
                if starcount < len(starcast_list):
                    starcast += " ,"
            # sc-e226b0e3-11 kkLqLt
            # platform_comp = (
            #     movie_detail.section.find("div", class_="sc-e226b0e3-4 dEqUUl")
            #     .find("div", class_="sc-e226b0e3-6 CUzkx")
            #     .find("div", class_="sc-e226b0e3-11 kkLqLt")
            #     .find("div", class_="sc-cbc7ae81-6 eYDEtr")
            #     .div
            # )
            # platform_text = platform_comp.div
            # print(platform_text)
            title = title_year_comp.h1.span.text
            year = title_year_comp.ul.li.a.text
            duration_yearlist = title_year_comp.ul.find_all("li")
            for li in duration_yearlist:
                if li.a:
                    continue
                else:
                    duration = li.text

            trailer_link = (
                movie_soup.find(
                    "div",
                    id="__next",
                )
                .find("main")
                .div.section.find_all(
                    "div",
                    class_="ipc-page-content-container ipc-page-content-container--center",
                )[3]
                .section.div.div.find("section", {"data-testid": "videos-section"})
                .find(
                    "div",
                    class_="ipc-shoveler ipc-shoveler--baseAlt ipc-shoveler--page0",
                )
                .find(
                    "div",
                    class_="ipc-sub-grid ipc-sub-grid--page-span-2 ipc-sub-grid--nowrap ipc-shoveler__grid",
                )
                .div.div.a["href"]
            )
            trailer_link = "https://www.imdb.com" + trailer_link
            # print(trailer_link)

            langplat_comp = (
                movie_soup.find(
                    "div",
                    id="__next",
                )
                .find("main")
                .div.section.find_all(
                    "div",
                    class_="ipc-page-content-container ipc-page-content-container--center",
                )[3]
                .section.div.div.find("section", {"data-testid": "Details"})
                .find_all("div")[3]
                .ul.find_all("li", class_="ipc-metadata-list__item")
            )
            # print(langplat_comp)
            release_date = "01-01-" + year
            production = "TSeries (Default)"
            language = "Hindi (Default)"
            platform = "Theaters"
            platform_link = ""
            # print(len(langplat_comp[0].get("class")))
            for list_item in langplat_comp:
                if len(list_item.get("class")) == 2:
                    if list_item.a.text == "Release date":
                        release_date = list_item.div.ul.a.text
                        release_date = convertDate(release_date)
                    elif list_item.a.text == "Production companies":
                        production = list_item.div.ul.li.a.text
                    elif (
                        list_item.a.text == "Official sites"
                        or list_item.a.text == "Official site"
                    ):
                        platform = list_item.div.ul.li.a.text
                        platform_link = list_item.div.ul.a["href"]
                else:
                    if (
                        list_item.span.text == "Language"
                        or list_item.span.text == "Languages"
                    ):
                        languages = list_item.div.ul.find_all("li")
                        language = ""
                        langcount = 0
                        for lang in languages:
                            langcount += 1
                            language += lang.a.text
                            # language += " "
                            if langcount < len(languages):
                                language += " ,"

                    if (
                        list_item.span.text == "Official sites"
                        or list_item.span.text == "Official site"
                    ):
                        platform = list_item.div.ul.li.a.text
                        platform_link = list_item.div.ul.a["href"]

            last_slash_index = link.rfind("/")
            storyline_link = link[:last_slash_index] + "/plotsummary"
            print(storyline_link)
            storyline = getStoryline(storyline_link)
            storyline = storyline if len(str(storyline)) > 0 else description
            # print(storyline[4])
            movie = {
                "title": title,
                "trailer_link": trailer_link,
                "description": description,
                "poster_link": img_src,
                "duration": duration,
                "language": language,
                "rating": rating,
                "platform": platform,
                "platform_link": platform_link,
                "genre": movie_genre,
                "release_date": release_date,
                "director": director,
                "writers": writers,
                "starcast": starcast,
                "production": production,
                "storyline": storyline,
            }

            api_movie_id = post_to_api(movie)

            reviews_link = (
                link[:last_slash_index]
                + "/reviews?spoiler=hide&sort=curated&dir=asc&ratingFilter=0"
            )
            if api_movie_id != 0:
                post_reviews(api_movie_id, reviews_link)
            print(title, "done")

    except Exception as e:
        print(e, "error in getting movie details")


# Function to scrape IMDb website and extract movie details
def scrape_imdb():
    # url = "https://www.imdb.com/search/title/?title_type=feature&sort=moviemeter,asc&countries=IN&languages=hi"
    url = "https://www.imdb.com/search/title/?title_type=feature&release_date=2020-01-01,2020-12-31&sort=moviemeter,asc&countries=IN&languages=hi"

    response = requests.get(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        movie_list = (
            soup.find(
                "div",
                id="__next",
            )
            .find("main")
            .find(
                "div",
                class_="ipc-page-content-container ipc-page-content-container--center sc-872d7ac7-0 fqEQWL",
            )
            # .find("section")
            .find_all(
                "div",
                class_="ipc-page-content-container ipc-page-content-container--center",
            )
        )
        movie_list = (
            movie_list[1]
            .section.section.div.section.section.find_all("div")[1]
            .div.section.find(
                "div",
                class_="ipc-page-grid ipc-page-grid--bias-left ipc-page-grid__item ipc-page-grid__item--span-2",
            )
            .find("div", class_="ipc-page-grid__item ipc-page-grid__item--span-2")
            .ul.find_all("li")
        )
        #  now inside loop
        count = 0
        # getMovieDetails("/title/tt8110330/?ref_=sr_t_3")

        for movie in movie_list:
            count += 1
            link = movie.div.div.div.div.find(
                "div", class_="sc-43986a27-0 gUQEVh"
            ).div.a["href"]
            # link="https://www.imdb.com/title/tt12393526/"
            print(link)
            getMovieDetails(link)
            # if count > 39:
            # break
            # break

        # print(len(movie_list))

    else:
        print("Failed to retrieve the webpage.")
        return None


if __name__ == "__main__":
    scrape_imdb()
    # link = "https://www.imdb.com/title/tt12393526/"
    # print(link)
    # getMovieDetails(link)
