## Accordion List Project

In this project, all users are listed. Users can change the sorting of users, view detailed information by clicking on an icon, and filter for each field separately. The technologies used in the project are ReactJs, TypeScript, SCSS, and Docker.

### Directory Structure

- **public**
- **src**
    - **components**
    - **utils**  (common functions)   
- **.env**
- **Dockerfile**

### How to Run the Project?

#### Installation
1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Add a `.env` file to the root directory with the following content:

REACT_APP_API_URL =  https://jsonplaceholder.typicode.com

- `REACT_APP_API_URL` is the endpoint from which user data is fetched.

#### Usage
To run the project, follow these steps:

1. docker compose up
2. Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.
