# Twittle APP

### Project Description

This project is a full-stack application with a frontend built using Next.js and a backend built using NestJS and Firebase. It leverages modern technologies to provide a robust and scalable solution. The main features include user authentication, data storage in Firestore, and file storage using Firebase Storage.

The Twittle app allows users to sign up with email and password or sign up using Google. Users can delete their accounts, as well as change their passwords. Users can update their profile name or profile photo, and view other user profiles along with their posts. They can create, view, edit, and delete posts. In terms of interactions, users can add or remove likes and dislikes to posts, also add, edit, and delete comments.

### Tech Stack

- **Next.js**: for server-side rendering and static site generation.
- **React**: library used for building user interfaces.
- **Redux**: library used for managing application state.
- **Tailwind CSS**: for rapid UI development.
- **Firebase**: for authentication used Firebase Auth, used Firestore for database and Firebase Storage for file storage.
- **NestJS**: framework used for building efficient, reliable, and scalable server-side applications.

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/marynadevk/firebase-twittle-app.git
```

2. **Install dependencies for server and client projects, run:**

```sh
cd frontend/
npm ci
cd ../
cd backend/
npm ci
```

3. **Create a .env.local files based on the provided .env.local.example**

4. **To start the development servers, run:**

```sh
*frontend*
npm run dev

*backend*
npm run start:dev
```

Dive into the code, explore the features, and start building your own social network today.

Happy coding! :)