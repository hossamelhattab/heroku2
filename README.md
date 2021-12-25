# Stack-with-an-attitude


This is our documentation for the ACL project 2021/2022 done by team **Stack-with-an-attitude**.


# AirlineZ

An online airline reservation web application that allows users to reserve any of the available flights in a simple and elegant way. 

## Motivation

We created this project to enable users to reserve their flights from their comfort of their homes. The reason we persued developing this project was because we experienced such hardships when reserving for our flights.

## Build Status

Currently our build version is 1.2.42 . Users might experience some bugs including but not limited to :

1. If the selected flight provides 30 or more seats available for the user to reserve for , the UI (User Interface) might get a little crowded and especially when viewing the flight details.

2. Some buttons (namely when using the login button) sometimes require to be clicked more than once in order to access the desired functionality the specific button provides.

## Code Style

### Our project's code style mainly boils down to following:

#### Concerning Back End :

1. We are following the popular MVC design pattern , so any models will be in the **Models** folder , any controllers will be in the **Controllers** folder , and so on.

2. However do note that any routes must be implemented in the `app.js` under the corresponding section sorted by the controllers.

#### Concerning Front End :

1. Any newly created component must be in their corresponding folders.

2. Naming the components must be clear and descriptive enough for almost any developer to understand the functionality behind it. 

## Screenshots

### Main page
![MainPage](https://user-images.githubusercontent.com/69060525/147393259-1af22a8b-da8f-463d-86ab-f46ea65a8038.jpeg)

### Register page
![Register](https://user-images.githubusercontent.com/69060525/147393281-853ddff5-5e85-4acb-aca0-8829da2ffaac.jpeg)

### Login page
![Login](https://user-images.githubusercontent.com/69060525/147393276-4d199687-c24f-4063-9ef2-f1287254a82d.jpeg)

### Main page for a logged in user
![LoggedInUser](https://user-images.githubusercontent.com/69060525/147393264-8021bde2-4ff2-4ecb-b7d2-6fb493d6cc95.jpeg)

### Reserved flights for user
![ReservedFlights](https://user-images.githubusercontent.com/69060525/147393293-4f68589b-48c3-4a5a-87d2-2d7f24967efb.jpeg)

## Tech/Framework used

#### We are using the popular MERN Stack developing this project. The tech/frameworks used in this stack are :

1. Reactjs
2. Nodejs
3. MongoDB (using the moongose API)
4. Expressjs

## Features

1. Simplified reservation process.
2. Clean and elegant UI Design.
3. Handling proper authentication and authorization.
4. User feedback for most user interactions.
5. The ability for the user to edit his/her reservation.

## Installation

1. Download/Clone the github repo.
2. open 2 terminals in your IDE.
3. Once choosing one of the terminals , navigate to `/backned`
4. This will be the terminal responsible for the back-end server.
5. run `npm i`
6. then run `node app.js` to start up the server.
7. open the other terminal (which will be responsible for front-end server)
8. navigate to `frontend/my-app`
9. run `npm i`
10. then run `npm start` to start up the server.

## API reference

#### We mainly used 3 APIs :

1. nodemailer (for sending mails to users)
2. stripe (for handling payments done by users)
3. moongose (for easier interaction with mongoDB using node)

## How to Use?

Following the installation process above , if everything goes well , the web application should have started in your desired browser.

From here you can browse the different pages available in the application.

## Credits

The proper credits goes to the makers of this project , which are :

1. Youssef Hafez
2. Mohamed Shafei
3. George Aniss
4. Hossam Magdy
5. and FINALLY , Ahmed Hossam

