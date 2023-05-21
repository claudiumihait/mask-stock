

# Mask Stock #


### Description ###

_Note: This application was created as a learning project to practice JavaScript development skills, specifically utilizing the MERN (MongoDB, Express.js, React, Node.js) stack. It is not intended for actual commercial use._

The Mask-Stock is a web application designed to streamline the process of ordering medical equipment for hospital employees. It provides a user-friendly interface where employees can log in to their accounts, place orders for medical equipment. Registered users also have the ability to add new hospital data, including information about hospitals and define users with admin privileges who are authorized to place orders specifically for their respective hospitals. This feature allows for efficient management and customization of user roles within the application, ensuring that only authorized individuals can initiate mask orders on behalf of their hospitals


### Installation ###

To set up the Hospital Mask Ordering App, please follow the steps below:

1. Navigate to the "back-end" folder in the project directory.

```cd back-end```
2. Install the required dependencies by running the following command:

```npm install```

3. Start the backend server by running the following command:

```npm start```

This command is equivalent to running `nodemon server.js` and will start the backend server for the app.

4. Open a new terminal window and navigate to the "front-end" folder in the project directory.

```cd front-end/```

5. Install the necessary dependencies for the frontend by running the following command:

```npm install```

6. Start the frontend development server using the following command:

```npm run dev```

This command uses **Vite** as the run engine and will launch the frontend development server for the app.

Once the backend and frontend servers are running, you can access the application by opening your web browser and visiting the appropriate URL or localhost address.

**_Note:_** _Make sure to start the backend server first before launching the frontend server to ensure proper communication between the two components._


### Usage & Features ###

Follow these instructions to effectively use the Mask Stock App:

1. Launch the app by accessing the provided localhost URL in your web browser.
2. Upon launching the app, you will be prompted with a login form. If you are not logged in, you can click on the register button or navigate to the registration tab at the top of the page.
3. If registering as a new user, fill in the required credentials and proceed with the registration process. Note that you will need to verify your email address before being able to log in.
4. After logging in, you will be directed to the home page, where you can view the hospitals you are registered to and your corresponding rights.
5. To place an order, navigate to the "Order" tab. Here, you can select the hospital for which the order is being placed, choose the desired item for the order, and specify the quantity. Clicking the "Place Order" button will generate an invoice and save the order in the database.
6. If you are logged in, you can add a new hospital by going to the "Add Hospital" tab. A complete form will be rendered, allowing you to provide the required information. You can also add user email addresses related to the added hospital and set roles (admin/non-admin) from this form.
7. The app includes a logout option, which allows you to securely log out of your account.
8. Once logged in, you will see your username displayed at the top right of the page, indicating the user you are currently logged in as.


### Screenshots ###


#### Registration Page ####

![Login Form](https://i.imgur.com/u0t8AY6.png)

#### Login Page ####

![Register Form](https://i.imgur.com/DnaOYbh.png)

#### Home Page ####

![Home Page](https://i.imgur.com/xBGRnpe.png)

#### Placing an order ####

![Placed order](https://i.imgur.com/WoIANhv.png)

#### Generated Invoice ####

![Invoice PDF](https://i.imgur.com/WIBTBuc.png)

#### Adding New Hospital ####

![Add New Hospital Form](https://i.imgur.com/a5rWoWQ.png)


### Technologies ###

Following technologies were used in developing this app:

1. **JavaScript:** The core programming language used to develop the app, enabling interactive and dynamic functionalities.
2. **Node.js:** The app is developed using Node.js, an open-source JavaScript runtime environment, which allows running JavaScript on the server-side.
3. **HTML:** The standard markup language for creating the structure and content of web pages.
3. **CSS:** Cascading Style Sheets are utilized to enhance the visual presentation and styling of the application, ensuring an appealing and user-friendly interface.
4. **Express:** The app is built on the Express framework, a popular web application framework for Node.js. Express simplifies the development of server-side functionality, routing, and handling of requests and responses, enabling efficient and scalable web applications.
5. **MongoDB:** The app utilizes MongoDB, a NoSQL database, to store and manage the app's data, including user information, orders, and hospital details. MongoDB's flexibility and scalability make it well-suited for handling complex data structures and high volumes of data.
6. **Nodemailer:** Library used for sending emails in the app. It provides a simple and straightforward way to send emails, enabling functionalities such as email verification and notifications.
7. **Passport:** A popular authentication middleware for Node.js applications. It offers various strategies, including Passport-JWT (JSON Web Token) and Passport-Local, which were utilized in the app for implementing authentication and authorization functionalities. Passport-JWT allows secure handling of JSON Web Tokens, while Passport-Local provides local authentication using username and password.

### License

This project is licensed under the MIT License. See the LICENSE file for details.


### Contact ### 

Feel free to contact me at: [claudium.tudor@gmail.com](claudium.tudor@gmail.com)