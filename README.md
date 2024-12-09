# Reminder Management System

This project is a **Node.js API** for managing user authentication, reminders, and user profiles. It includes CRUD operations for users and reminders, along with JWT-based authentication and token blacklisting for secure user sessions.

---

## Table of contents

- [Project Features](#project-features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Middlewares](#middlewares)
- [How to Use](#how-to-use)
- [Future Enhancements](#future-enhancements)
- [Additional Features implementetion](#additional-features-implementetion)
- [Contact](#contact)

---

## Project Features

### Authentication
- **Login**: Authenticate users with email and password.
- **Logout**: Invalidate user sessions with token blacklisting.
- **Authorization Middleware**: Ensure secure access to API routes using JWT verification.

### User Management
- **Register**: Create a new user with hashed passwords.
- **Edit User**: Update user profile details.
- **Fetch Users**: Retrieve all users or filter by name/email with pagination support (for admin use).

### Reminder Management
- **Create Reminder**: Schedule reminders with custom recurrence and messages.
- **Fetch Reminders**: Retrieve all reminders for a user with filters and pagination.
- **Edit Reminder**: Update existing reminders by `reminderId`.
- **Delete Reminder**: Remove reminders by `reminderId`.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building the API.
- **MongoDB**: Database for storing users and reminders.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Secure token-based authentication.
- **Bcrypt**: Hashing library for passwords.
- **Uuid**: Generate unique identifiers for users and reminders.
- **Cookie-parser**: Manage cookies for session handling.

---

## Folder Structure

```bash
├── controllers/
│   ├── authCountroller.js      # Handles auth-related operations
│   ├── userController.js       # Handles user-related operations
│   ├── reminderController.js   # Manages reminder-related actions
├── middlewares/
│   ├── authMiddleware.js       # Handles JWT and token validation
│   ├── catchAsyncError.js      # Wrapper for async error handling
│   ├── errorMiddleware.js      # Handles error
├── models/
│   ├── blacklist.js            # blacklist schema
│   ├── User.js                 # User schema
│   ├── Reminder.js             # Reminder schema
├── routes/
│   ├── authRoutes.js           # User & auth related routes
│   ├── reminderRoutes.js       # Reminder-related routes
├── utils/
│   ├── cronJobs.js             # Handles reminder notification
│   ├── errorHandler.js         # Custom error handling class
├── .env                        # Environment variables
├── index.js                    # Entry point of the application
└── package.json                # Dependencies and scripts
```

---


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DaaSH23/Reminder_Management_System.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup the .env file:
    ```bash
    PORT=5000
    DB_uri=<Your MongoDB Connection String>
    JWT_SECRET_KEY=<Your JWT Secret Key>
    NODE_ENV=development
    ```
4. Start the server:
    ```bash
    npm run dev
    OR
    npm start
    ```

---

## API Endpoints

### User Routes

```
| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/createuser`     | Register a new user.         |
| POST   | `/login`          | Log in an existing user.     |
| POST   | `/logout`         | Log out the user.            |
| POST   | `/userdata`       | Fetch users with pagination. |
| PUT    | `/edituser`       | Edit user profile.           |
```
---

### Reminder Routes
```
| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| POST   | `/createreminder` | Create a new reminder.          |
| POST   | `/getreminder`    | Fetch reminders with filters.   |
| POST   | `/editreminder`   | Edit an existing reminder.      |
| POST   | `/deletereminder` | Delete a reminder.              |

```

---

## Middlewares

1. Authorization Middleware:
    - Ensures routes are accessible only to authenticated users.
    - Verifies and decodes JWT tokens.
2. Error Handling Middleware:
    - Captures and formats all errors.
3. Blacklist Middleware:
    - Verifies if a token is blacklisted before granting access.


---


## How to Use

1. Register a new user via the /register endpoint.

2. Log in to generate a JWT and authenticate your session.

3. Use the token to access routes for managing reminders and user profiles.

4. Create, Edit, Delete, Fetch reminders.

5. Log out to invalidate your token and clear the session.


---


## Future Enhancements

1. Implement role-based access control (RBAC) for admin-level operations.

2. Add email notification support for reminders.

3. Enhance reminder recurrence with advanced cron scheduling.


---


## Additional Features implementetion

1. Restricted the expose of sensitive information using mostly POST request and req.body rather than GET.

2. Implemented pagiantion for handling large fetch data sets of reminders or users.

3. Add Authorization layer to ensure secure access to API routes using JWT verification.




## Contact
  email - reachtoabhisheko@gmail.com
  linkedIn - https://www.linkedin.com/in/abhishek-oraon-developer/


Thank you ! 
