# Blogger
An Instagram like blog application created  using Django and React Framework.


## Overview

Backend- Utilizes Django framework to create a Server Application, which handle requests from the frontend such as User Login and Register, Blog CRUD, Comments and Tags handling and a lot more.

Frontend- Utilizes React framework to create a UI and use axios for making API requests to the Django backend. Handles different pages and states while maintaining user persistence.

## Installation

At Frontend

```
cd Frontend/
npm i
npm run start
```

At Backend
```
pip install -r requirements.txt
python3 manage.py runserver
```

## Functionality

A user can Register or Login to the app where the authentication and password hashing are handled by the Django admin framework. 

The Logged in User can create new blogs, wherein they can Enter details such as Title,Description and even Tags (#cool) which can later be used, to search blogs using the Search Bar functionality in the header. 

Example: while adding/updating the Tags in the new Blogs, or filtering blogs on basis of tags using Search bar, enter a Tag, and press enter, and so on.


