import requests
from bs4 import BeautifulSoup
import json


# Function to scrape IMDb website and extract movie details
def scrape_imdb():
    url = "https://www.imdb.com/chart/top"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Content-Type": "application/json",
    }

    response = requests.get(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        movie_list = []
        # print(soup.prettify())
        # Extract movie details
        for movie_row in soup.find_all("tr"):
            title_column = movie_row.find("td", class_="titleColumn")
            if title_column:
                title = title_column.a.text
                year = title_column.span.text.strip("()")
                rating = movie_row.find("strong").text

                # Additional details can be extracted here

                movie_data = {
                    "title": title,
                    "year": year,
                    "rating": rating
                    # Add more details as needed
                }
                print(title)
                movie_list.append(movie_data)

        return movie_list
    else:
        print("Failed to retrieve the webpage.")
        return None


# Function to post movie list to a REST API
def post_to_api(movie_list):
    api_url = "https://your-api-endpoint.com/movies"
    headers = {"Content-Type": "application/json"}

    for movie_data in movie_list:
        # Assuming your API expects JSON data
        json_data = json.dumps(movie_data)

        # Post data to API
        response = requests.post(api_url, data=json_data, headers=headers)

        if response.status_code == 201:
            print(f"Successfully posted data for {movie_data['title']}")
        else:
            print(f"Failed to post data for {movie_data['title']}")


# Main execution
if __name__ == "__main__":
    movie_list = scrape_imdb()

    if movie_list:
        post_to_api(movie_list)
