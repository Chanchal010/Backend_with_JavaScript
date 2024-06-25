
# Authentication Backend API

A backend API for user authentication built with Node.js, Express, and MongoDB.

## Features

- User registration
- User login
- JWT-based authentication
- Password hashing with bcrypt
- Error handling and response utilities

## Prerequisites

Ensure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/Chanchal010/authentication-Backend-API.git
    ```

2. Navigate to the project directory:

    ```
    cd authentication-Backend-API
    ```

3. Install the dependencies:

    ```
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

## Running the Application

1. Start the server:

    ```
    npm run dev
    ```

    The API should now be running on `[https://tube-video.onrender.com](https://tube-video.onrender.com)`.

## API Endpoints
# Auth Routes
Register a new user :
POST /api/auth/register


Login a user:
POST /api/auth/login


# User Routes
Get current user details (Protected)
GET /api/users/me
### User Registration

- **URL:** `https://tube-video.onrender.com/api/v1/users/register`
- **Method:** `POST`
- **Body:**

    ```json
    {
      "username": "Your username",
      "fullName": "Your fullName",
      "email": "your-email@example.com",
      "password": "yourpassword"
      "avatar": "your avatar"
      "coverImage": "your coverImage"
    }
    ```

- **Response:**

    ```json
    {
      "message": "User created successfully"
    }
    ```

### User Login

- **URL:** `https://tube-video.onrender.com/api/v1/users/login`
- **Method:** `POST`
- **Body:**

    ```json
    {
      "username": "Your username",
      "email": "your-email@example.com",
      "password": "yourpassword"
    }
    ```

- **Response:**

    ```json
    {
      "message": "user logged In succcessfully"
    }
    ```
### User logout

- **URL:** `https://tube-video.onrender.com/api/v1/users/logout`
- **Method:** `POST`
- **Body:**

    ```json
    {
      //empty
    }
    ```

- **Response:**

    ```json
    {
      "message": "User logged Out"
    }
    ```
### User change-password

- **URL:** `https://tube-video.onrender.com/api/v1/users/change-password`
- **Method:** `POST`
- **Body:**

    ```json
    {
      "oldPassword ": "user oldPassword"
      "newPassword ": "User newPassword"
    }
    ```

- **Response:**

    ```json
    {
      "message": "password changed succesfully..."
    }
    ```
### User current-user

- **URL:** `https://tube-video.onrender.com/api/v1/users/current-user`
- **Method:** `GET`
- **Body:**

    ```json
    {
      //empty
    }
    ```

- **Response:**

    ```json
    {
      "message":  "user fetched successfully"
    }
    ```
### User update-account

- **URL:** `https://tube-video.onrender.com/api/v1/users/update-account`
- **Method:** `PATCH`
- **Body:**

    ```json
    {
       "fullName": "Your fullName",
      "email": "your-email@example.com",
    }
    ```

- **Response:**

    ```json
    {
      "message":   "user details updated succesfully"
    }
    ```
### User cover-image 

- **URL:** `https://tube-video.onrender.com/api/v1/users/cover-image`
- **Method:** `PATCH`
- **Body:**

    ```json
    {
       "coverImageLocalPath": "Your coverImageLocalPath",
    }
    ```

- **Response:**

    ```json
    {
      "message":  "Cover Image updates succesfully"
    }
    ```
### User avatar

- **URL:** `https://tube-video.onrender.com/api/v1/users/avatar`
- **Method:** `PATCH`
- **Body:**

    ```json
    {
       "avatarLocalPath": "Your avatarLocalPath",
    }
    ```

- **Response:**

    ```json
    {
      "message":   "Avatar file updates succesfully"
    }
    ```

## Project Structure

```
authentication-Backend-API
│──public/
│──src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
│   ├── app.js
│   ├── constants.js
│   ├── index.js
│
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package-lock.json
├── package.json
└── readme.md
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Create a new Pull Request

## Contact
Chanchal Bag - [Chanchal010](https://github.com/Chanchal010)

E-mail - [chanchalbag112@gmail.com](chanchalbag112@gmail.com)

LinkedIn - [https://www.linkedin.com/in/chanchal-bag-010c](https://www.linkedin.com/in/chanchal-bag-010c)

Project Link - [https://github.com/Chanchal010/mern-auth](https://github.com/Chanchal010/mern-auth)

visit App - [Auth App](https://mern-authentication-qk7b.onrender.com)

## License

This project is licensed under the MIT License.
---
