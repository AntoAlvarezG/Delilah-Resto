# Delilah-Resto:

REST API for a restaurant. Manages a food delivery system.

## Main file:

**index.js**

---

## Server:

- Protocol = **http**
- Hostname = **127.0.0.1 //localhost**
- Port = **3000**

## NPM dependencies:
Declared in **package.json** file. Must be installed to run the server.

-bcrypt: **$ npm install bcrypt**
- body-parser: **$ npm install body-parser**
- compression: **$ npm install compression**
- dotenv: **$ npm install dotenv**
- express: **$ npm install express**
- express-jwt: **$ npm install express-jwt**
- express-rate-limit: **$ npm install --save express-rate-limit**
- express-validator: **$ npm install express-validator**
- helmet: **$ npm install helmet --save**
- jsonwebtoken: **$ npm install jsonwebtoken**
- mysql2: **$ npm install --save mysql2**
- sequelize:** $ npm install sequelize\*\*

## Database connection:

Download XAMPP software from https://www.apachefriends.org/download.html
Import the **delilah.sql** file into http://localhost/phpmyadmin/

**Local configuration file (default)**
- Host: **localhost**
- Database name: **delilah**
- User: **root**
- Port: **3306**

Access **connection.js** if you need to configure your local connection.

## Start the server:

**$ npm run dev**

## Documentation:

To see the API documentation import **spec.yaml** file into https://editor.swagger.io/
