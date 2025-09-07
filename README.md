# Store Ratings Management System  

A full-stack web application for managing stores, users, and ratings with three types of user roles: **Admin, Owner, and Normal User**.  
Each role has a separate dashboard and specific functionalities as per the requirements.  

---

##  Tech Stack

**Frontend**  
- React.js (with Vite)  
- React Router DOM  
- Axios  
- React Hook Form  
- Tailwind CSS  

**Backend**  
- Node.js + Express.js  
- Sequelize ORM + MySQL Database  
- JWT Authentication + Bcrypt Password Hashing  
- RESTful APIs  

---

##  Project Structure  

---

## 🌟 Features  

### 1. Authentication & Authorization  
- Signup & Login with **JWT Tokens**  
- Role-based dashboards:  
  - **Admin** → Manage users & stores  
  - **Owner** → View own stores & raters  
  - **User** → View stores & rate them  

### 2. Store Management  
- Admin can create, edit, and delete stores  
- Stores have owner assignments  
- Average ratings calculation for stores  

### 3. User Management (Admin only)  
- Admin can create new users with role selection  
- Admin can delete or edit user details  

### 4. Ratings System  
- Users can rate stores  
- Average ratings auto-update after every rating  

### 5. Password Management  
- Logged-in users can change their password  

---

Backend Setup
cd backend
npm install
npm run dev

---
Create a .env file inside the backend folder:

PORT=5000
DB_NAME=store_ratings
DB_USER=root
DB_PASS=YourMySQLPassword
DB_HOST=localhost
JWT_SECRET=MySecretKey123
---

 Frontend Setup
cd frontend
npm install
npm run dev
---
---------------
API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Signup new user
POST	/api/auth/login	Login & get token
POST	/api/auth/change-password	Change user password
Users (Admin only)
Method	Endpoint	Description
GET	/api/users	Get all users
POST	/api/users	Create new user
DELETE	/api/users/:id	Delete a user
PUT	/api/users/:id	Update user details
Stores
Method	Endpoint	Description
GET	/api/stores	Get all stores
POST	/api/stores	Create new store
PUT	/api/stores/:id	Update store details
DELETE	/api/stores/:id	Delete a store
Ratings
Method	Endpoint	Description
POST	/api/ratings	Add or update rating

-----------



example login emails(testing)
user:
tazeen12@gmail.com
password:Tazeen123.
admin:
admin12@gmail.com
password:Admin123.
Owner:
owner12@gmail.com
password:Owner123.
