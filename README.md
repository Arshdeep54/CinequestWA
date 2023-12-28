#CineQuest-IMG

## Project Overview

This project is a combination of a React frontend and a Django backend. This is a movies website where a user or movie critic can create an account and can see or post his own reviews for a movie .

Some Developer Side features to this project are :-
- User Authentication
  - Email and password athentication
  - Email verification with otp
  - Change password functionality to loggin users
  - Reset password with a link sent to email for those who forgot their passwords
    
- Home Page
  - Search Bar to Search with name and description set to movie CTRL+M shortcut to search
  - Filters based on language,Rating ,Release Year ,Platform
  - Latest and Popular movies horizontal list with pagination 
  - All Movies grid with pagination
  - Movie card having click to view details functionality
    
- Movie Page
  -


### Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend (Django)](#backend-django)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
- [Frontend (React)](#frontend-react)
  - [Folder Structure](#folder-structure)
  - [Installation](#installation-frontend)
- [Usage](#usage)



## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [React](https://legacy.reactjs.org/)
- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)

### Installation

1. **Activate Virtual Environment:**

    ```bash
    # On Windows
    python -m venv venv
    .\venv\Scripts\activate

    # On macOS/Linux
    python -m venv venv
    source venv/bin/activate
    ```

2. **Install Backend Dependencies:**

    ```bash
    pip install Django
    # Add other backend dependencies as needed, you can see pipfile to know more 
    ```

3. **Install Frontend Dependencies:**

    ```bash
    # Navigate to the frontend directory
    cd frontend

    # Install Node.js packages
    npm install
    ```

## Usage

1. Run the project locally as mentioned in Development Part 
2. But you wont see any movies there because you havent yet added any movie to your rest api / database 
3. So first Scrape the movies webiste ,get data and post to your api , You may use my scraping file(bs4) for that if I dont delete it when you are reading this 

## Development

### Running Locally

Make sure the virtual environment is activated, and then run the following commands:

```bash
# Run Django server
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

# Navigate to the frontend directory and start React development server
cd frontend
npm start
