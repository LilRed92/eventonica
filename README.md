# Eventonica 🎉

Eventonica is a full-stack web application with CRUD for managing, discovering, and organizing events. Built with a robust PERN stack (PostgreSQL, Express, React, Node.js), this application allows users to seamlessly add events, assign categories, update details, search by name, and track their favorite activities. 

## 🛠️ Built With

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) [![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)

[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/) [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/) [![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)](https://github.com/motdotla/dotenv) [![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)](https://nodemon.io/) [![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/) [![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

## ✨ Features

* **Interactive Dashboard**: View a comprehensive list of all events with associated categories, descriptions, and timestamps.
* **Event Management (CRUD)**: Create, read, update, and delete events directly from the UI.
* **Search & Filter**: Search for specific events by name, or toggle the view to show only your favorited events.
* **Categorization**: Organize events by category (e.g., Music, Tech, Sports), complete with custom color-coding and emojis.
* **Favorites System**: Quickly "heart" or "un-heart" events to keep track of your top picks. 

## 📸 Screenshots

*(Replace these placeholder links with actual paths to your screenshots/gifs once uploaded to your repository)*

| Dashboard View | Add/Edit Event |
|:---:|:---:|
| ![Dashboard View](./screenshots/dashboard.png) | ![Add Event Form](./screenshots/add-event.png) |

| Search & Filter Functionality |
|:---:|
| ![Search Filter GIF](./screenshots/search-filter.gif) |

## 💻 Tech Stack

**Frontend:**
* React 18 (Bootstrapped with Vite)
* React Router DOM
* Bootstrap / React-Bootstrap for responsive styling
* React Icons & Moment.js for UI enhancements

**Backend:**
* Node.js & Express.js
* PostgreSQL
* `pg` (node-postgres) for database connections
* Cors & Body-Parser

## 🔌 API Reference

The backend exposes the following RESTful endpoints under `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/events` | Fetches all events (accepts `?searchInput=` query to filter by name). |
| `POST` | `/api/events` | Creates a new event. |
| `PATCH` | `/api/events/:id` | Updates details of an existing event. |
| `PUT` | `/api/events/:id/favorites` | Toggles the favorite (`is_favorite`) status of an event. |
| `DELETE`| `/api/events/:id` | Deletes a specific event from the database. |
| `GET` | `/api/categories` | Fetches the list of all available categories. |

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file located in your `server/` directory:

```env
# Your PostgreSQL Database URI
VITE_DB_URI="postgresql://<user>:<password>@localhost/<database>"

# Optional: Port for the Express server (Defaults to 3000)
PORT=3000
```

## 🚀 How to Run Locally
Follow these steps to get the development environment running on your machine:

### Clone the repository
```
    git clone [https://github.com/LilRed92/eventonica.git](https://github.com/LilRed92/eventonica.git)
    cd eventonica
```
    
    
### Setup the Database
Ensure PostgreSQL is running on your machine. Load the provided database dump to create the necessary schemas and initial category data:

```
psql -U postgres -d postgres -f server/db/eventonica_dump.sql
```
(Note: Replace postgres with your specific database username/database if different).

### Install Dependencies
You will need to install the dependencies for both the client and the server.

```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Start the Application
The server's package.json includes a concurrently script that will launch both the Express backend and the Vite frontend at the same time.

```
# Navigate back to the server directory if you aren't already there
cd ../server

# Start both servers
npm run dev
```
- The frontend will be running on http://localhost:5173

- The backend API will be listening on http://localhost:3000

## 🌍 Deployment
This application is configured for continuous deployment (CD) utilizing GitHub Actions.

* **Frontend:** Deployed and hosted via Netlify.
* **Backend API & Database:** Deployed and hosted via Render.

The `.github/workflows/ci.yml` pipeline is set up to automatically trigger production deployments when code is pushed or merged into the main branch. Deployments are only executed if all prerequisite linting, formatting, and tests pass successfully.

## Future Feature Updates

- [ ] **Transition to TypeScript:** Migrate the existing JavaScript codebase to TypeScript to improve type safety, code maintainability, and the overall developer experience.
- [ ] **Expand Database Schema:** Add a `users` table to the PostgreSQL database to support individual user profiles.
- [ ] **Implement User Favorites:** Create a `user_favorites` join table to establish a many-to-many relationship, allowing multiple users to maintain their own unique lists of favorited events.
- [ ] **Integrate Authentication:** Implement secure user authentication to allow individuals to register, log in, and manage their personalized event dashboards.
- [ ] **Add Comprehensive Testing:** Write and implement automated tests across the frontend, backend, and API to ensure application reliability.
- [x] **Deploy Application:** Deploy the completed application to a cloud hosting platform for live, public access.
