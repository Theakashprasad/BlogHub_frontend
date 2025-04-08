# WritersGrid - Backend

This is the backend of a simple personal blogging platform built with Node.js and Express.js.

## Features

- User registration and authentication
  - Login
  - Registration
  - Reset Password
  - Email verification
- CRUD operations for blog posts
  - Listing blog posts
  - Inline delete & edit options
  - Popup action for creating new posts

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Nodemailer for email verification

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/DevikaRajesh22/WritersGrid-server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables
   ```sh
   MONGO_URI=mongodb+srv://devikaraj699:N1E0C3DBe5VZ87w2@cluster0.xjjgwon.mongodb.net/
   JWT_KEY=DevikaRajesh22
   EMAIL = <your-email-address>
   PASS = <Your-email-passkey>
   CLOUD_NAME=dukphpctd
   CLOUD_API_KEY=157246774811929
   CLOUD_API_SECRET=QPmVkoXCY0K-BbhDuhoLZYBKSAQ
   ```
4. Start the server
   ```sh
   npm start
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
