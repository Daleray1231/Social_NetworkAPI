# Social Network API

This repository contains the backend code for a social networking platform API built using Express.js and MongoDB.

## Features
- **User Management:** CRUD operations for users (create, read, update, delete)
- **Friendship Handling:** Adding and removing friends for users
- **Thoughts and Reactions:** Basic structure for handling thoughts and reactions (see Thoughts and Reaction models)

## Video Demo
[Watch the Video Demo Here](https://share.vidyard.com/watch/exNjifKfpf6zu58AA4zRrm?) 

## Installation
1. **[Clone the Repository](https://github.com/Daleray1231/Social_NetworkAPI)**
    ```bash
    git clone https://github.com/Daleray1231/Social_NetworkAPI
    ```

2. **Install dependencies:**
    ```bash
    cd social-network-api
    npm install
    ```

3. **Set up MongoDB:**
    - Make sure MongoDB is installed and running locally.
    - Update the MongoDB connection URL in `server.js` to match your local setup if needed.

## Usage
1. **Start the server:**
    ```bash
    npm start
    ```

2. **Use API endpoints:**
    - Access the API at [http://localhost:3000/api](http://localhost:3000/api)

## API Endpoints
### Users
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user by ID
- `POST /api/users`: Create a new user
- `POST /api/users/:userId/friends/:friendId`: Add a friend for a specific user
- `PUT /api/users/:id`: Update a user's information
- `DELETE /api/users/:id`: Delete a user
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list

For more details on each endpoint, refer to the respective route files in the `routes` directory.

## Technologies Used
- Express.js
- MongoDB (with Mongoose)
- Node.js

## Contribution
Contributions are welcome! Feel free to submit issues or pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.