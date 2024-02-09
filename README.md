# Project Setup Instructions

Follow these steps to set up the project:

1. **Clone the Repository:**
    - Clone the repository [ecori-tech-test](https://github.com/claudgoeswild/ecori-tech-test) on GitHub.

2. **Install Client Requirements:**
    - Navigate to the `client` folder and install all requirements using the command:
      ```
      npm i
      ```

3. **Install Server Requirements:**
    - Navigate to the `server` folder and install all requirements using the command:
      ```
      npm i
      ```

4. **Set Up PostgreSQL:**
    - Download, install, and create a user in PostgreSQL.

5. **Database Setup:**
    - Set up the database of the project similar to `db.sql` inside the `server` folder.

6. **Set Up Environment Variables:**
    - In the `client` folder, set the following environment variable for local testing:
      ```
      REACT_APP_SERVERURL=http://localhost:8000
      ```
    - In the `server` folder, set up environment variables to access the database:
        - `USRNAME=yourUsername`
        - `PASSWORD=yourPassword`
        - `HOST=localhost`
        - `DBPORT=5432` (or another port you are using)

7. **Start the Servers:**
    - In both the `server` and `client` directories, run the command:
      ```
      npm run start
      ```

## Note:
- Make sure you have Node.js and npm installed on your system.
- Adjust configurations according to your environment setup.

