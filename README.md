# ChasingHorizon Blog API

A RESTful API for a blogging platform supporting authentication, user management, posts, tags, photos, and comments.

## Features

- User registration & authentication (JWT)
- CRUD for posts, tags, comments, and photos
- File uploads (photos)
- API documentation via Postman

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)
- [Firebase](https://firebase.google.com/) project for photo storage

### Setup

1. **Clone the repository:**
   ```sh
   git clone <https://github.com/Mr-kings042/ChasingHorizon>
   cd ChasingHorizon
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (MongoDB URI, JWT secret, etc.).

4. **Firebase setup:**
   - Place your Firebase service account JSON as `firebasesdk.json` in the root directory.

### Running the Project

```sh
npm start
```
The server will run on `http://localhost:6000` by default.

## API Documentation

- **Postman Collection:**  
  [ChasingHorizon API Documentation](https://www.postman.com/techking042/workspace/chasing-horizons/collection/34542175-66314885-f541-4167-950b-e8c50eec416c?action=share&creator=34542175)

## Project Structure

- `controllers/` – Business logic for each resource
- `models/` – Mongoose schemas
- `routes/` – Express route definitions
- `middleware/` – Custom middleware (e.g., JWT auth)
- `uploads/` – Uploaded files (temp storage)
- `config/` – Configuration files

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT
