# About Airbb

Airbb is a web application clone inspired by Airbb, that allows online users to rent homes and other types of properties for vacations and other kinds of activities. 
* [Click here to view Airbb Live Site](https://backend-project-airbb.herokuapp.com/)

Please see below links to Project Wiki:
* [API Documentation](https://github.com/kevykim/Airbb-project/wiki/API-Documentation)
* [Database Schema](https://github.com/kevykim/Airbb-project/wiki/Database-Schema)
* [Features](https://github.com/kevykim/Airbb-project/wiki/Features)
* [Redux State](https://github.com/kevykim/Airbb-project/wiki/Redux-State)

This project is built with:
* JavaScript
* Express
* Sequelize
* PostgreSQL
* React
* Redux
* HTML 
* CSS
* Heroku


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
8. Run `npx dotenv sequelize db:seed:all`
9. With two terminals, Run `npm start` in both frontend folder and backend folder to start the application.

# Features Direction

## Demo User Splash Page
![SplashPage](./frontend/public/readmeimage/Screen%20Shot%202022-08-29%20at%201.33.27%20AM.png)