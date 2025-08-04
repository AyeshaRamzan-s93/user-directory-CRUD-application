# User Directory CRUD Application (Local JSON Server)

This is a beginner-friendly CRUD (Create, Read, Update, Delete) application built with HTML, CSS, and JavaScript. It uses json-server to simulate a backend REST API using a local 'db.json' file.

##  Features

- Add new users with unique ID
- Edit user details (ID is not editable after creation)
- Delete user from UI and database
- Fetch & display users from local JSON database


## Tech Stack

- HTML5
- CSS3 (vanilla)
- JavaScript (vanilla)
- `json-server` for local REST API

## Getting Started

Prerequisites

Make sure Node.js and npm are installed. You can check:

node -v
npm -v

If not, download Node.js

### Setup Steps 

1. Clone the repository
   git clone https://github.com/AyeshaRamzan-s93/user-directory-CRUD-application

2. Install json-server globally
   
   npm install -g json-server

3. Start the local JSON Server
   
   json-server --watch db.json --port 3000

4. Open index.html in your browser

