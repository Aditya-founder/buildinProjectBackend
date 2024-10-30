BUILDIN BACKEND
A backend for managing partnerships, contractors, and workers, built to connect individuals and companies in construction-related fields like architecture, civil engineering, painting, plumbing, electrical work, and more. This project includes hiring processes, location-based partner searches, and blog creation to share company references and information.

TABLE OF CONTENTS:-
Features
Tech Stack
Getting Started
Installation
Configuration
Database Structure
API Endpoints
License


FEATURES:-
User Management: CRUD operations for different user types, including Partners, Architects, Civil Engineers, Contractors, and Workers (Painters, Plumbers, Electricians, Marble Workers, Masons, etc.).
Hiring Process: Allows users to hire engineers and workers, with applications and status tracking.
Blog Creation: Partners and companies can create and share blogs, acting as a reference to their services and previous projects.
Nearby Partners and Workers: Search functionality to find nearby service providers based on user location.
Authentication & Authorization: Secured endpoints with authentication for different roles.


TECH STACK:-
Backend: Node.js, Express
Database: MongoDB (or preferred database)
Authentication: JSON Web Tokens (JWT)
Other Libraries: Mongoose, bcrypt (for password hashing), etc.


GETTING STARTED:-
These instructions will help you get a copy of the project up and running on your local machine for development and testing.

PREREQUISITES:-
Node.js installed on your machine.
MongoDB (or another supported database).
Git (for version control).

INSTALLATION:-
Clone the Repository

git clone https://github.com/yourusername/myProject.git
cd myProject


INSTALL DEPENDENCIES:-
npm install


SET UP ENVIRONMENT VARIABLS:-

Create a .env file in the root directory and add the following:
PORT=4000
MONGODB_URI=mongodb+srv://adityatiwariug22:chCrCaGZLX60JZSL@cluster0.sogx8.mongodb.net/ourFinalProject
JWT_SECRET=tiwari

RUN THE SERVER:-
npm start

