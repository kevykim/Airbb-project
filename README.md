# About Airbb 🏠

Airbb is a web application clone inspired by [Airbnb](https://www.airbnb.com/), that allows online users to rent homes and other types of properties for vacations and other kinds of activities. 
## [Airbb](https://backend-project-airbb.herokuapp.com/)

Please see below links to Project Wiki:
* [API Documentation](https://github.com/kevykim/Airbb-project/wiki/API-Documentation)
* [Database Schema](https://github.com/kevykim/Airbb-project/wiki/Database-Schema)
* [Features](https://github.com/kevykim/Airbb-project/wiki/Features)
* [Redux State](https://github.com/kevykim/Airbb-project/wiki/Redux-State)

This project is built with:  

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)


# Run Locally

1. Clone this repository
2. `cd` into the repository
3. `npm install` to install dependencies in both frontend folder and backend folder.
4. Create a `.env` file using the `.env.example` as a guide.
    ```
    PORT=
    DB_FILE=db/dev.db
    JWT_SECRET=
    JWT_EXPIRES_IN=
    ```
5. Move to backend directory.
6. Run `npx dotenv sequelize db:migrate` 
7. Run `npx dotenv sequelize db:seed:all`
8. With two terminals, Run `npm start` in both frontend folder and backend folder to start the application.

# Features Direction

## Splash Page
![SplashPage](./frontend/public/readmeimages/Airbb%20Splash1024_1.jpg)

## Detail Page
<img src="./frontend/public/readmeimages/Airbb%20Detail.jpg" height='900' width='900'/> 

## My Spot Page
<img src="./frontend/public/readmeimages/Airbb%20myspot.png"/>

## My Review Page
<img src='./frontend/public/readmeimages/Airbb%20myreview.png'/>

# Future Focus: 

- Add a Images feature where an Owner of a spot can add/delete an image to their created spot.
- Add AWS for images.
- Google Maps API
