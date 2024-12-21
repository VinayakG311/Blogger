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
cd Backend/
pip install -r requirements.txt
python3 manage.py runserver
```

## Functionality

A user can Register or Login to the app where the authentication and password hashing are handled by the Django admin framework. 

Separate Models have been created for necessary entities in the application such as User, Blogs, Comments and Tags. Which have been Serialized as per Django documentation.

The Logged in User can create new blogs, wherein they can Enter details such as Title,Description and even Tags which can later be used, to search blogs using the Search Bar functionality in the header. 

Example: while adding/updating the Tags in the new Blogs, or filtering blogs on basis of tags using Search bar, enter a Tag, and press enter, and so on.

Demo for Adding Tags to a Blog:

https://github.com/user-attachments/assets/9424485f-a679-4250-b3e8-4d1309ec9b12

Demo for Search Blogs by Tag:

https://github.com/user-attachments/assets/22bce2a9-a351-4d0c-b5d1-fa7c75997162

Other functionalities include, leaving a comment under the post, basic update and delete functionality in the profile section of user.

Also, there is a tests.py file in Backend, which was just to try my hands at creating test cases for the backend, and only assert the proper existence of entites in the database.

