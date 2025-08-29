# Job Portal Website: Deep Technical Flow

## 1. Overview

Your Job Portal project typically has these **main components**:

1. **Frontend (ReactJS + Tailwind + Shadcn UI)**  
   - Handles the **UI** and **user interaction**.
   - Pages: Signup, Login, Job Listing, Apply Job, Dashboard.
   - Sends **HTTP requests** to the backend API (Axios or Fetch).

2. **Backend (Node.js + Express.js)**  
   - Handles **API requests**, **business logic**, **authentication**, and **database interactions**.
   - Organized in **Routes → Controllers → Models**.

3. **Database (MongoDB)**  
   - Stores user info, jobs, applications, and authentication details.

4. **Authentication (JWT + Middleware + Cookies)**  
   - Verifies users and protects sensitive routes.
   - Issues **JWT tokens** upon login/signup, stored securely in cookies.

---

## 2. Deep Explanation of User Controllers

### a) Register Controller
- Receives user data from frontend.
- Validates all required fields.
- Checks if user already exists.
- Hashes password using `bcrypt`.
- Saves new user to MongoDB.
- Responds with success message.

**VIMP Points:**
```js
// bcrypt.hash(password, 10) -> secure password hashing
// Validation ensures no field is missing
// MongoDB used to store user data
```

### b) Login Controller
- Receives email, password, and role from frontend.
- Validates input fields.
- Finds user in DB.
- Compares password using `bcrypt.compare()`.
- Checks if role matches.
- Creates JWT token with userId.
- Sends JWT as httpOnly cookie.
- Responds with user info (without password).

**VIMP Points:**
```js
// JWT token used for stateless authentication
// Cookie settings: httpOnly, sameSite: strict, maxAge=1 day
// Role-based access verification
```

### c) Logout Controller
- Clears the JWT cookie by setting maxAge=0.
- Sends success response.

**VIMP Points:**
```js
// Logout is done by clearing cookie, not DB
// Ensures user session is terminated securely
```

### d) Update Profile Controller
- Receives updated fields and optional file from frontend.
- Finds user in DB using userId from JWT middleware.
- Updates fields (fullname, email, phoneNumber, bio, skills).
- Converts skills string to array.
- Saves updated user in MongoDB.
- Responds with updated user info.

**VIMP Points:**
```js
// Skills are stored as array for better querying
// Profile/resume upload handled separately (e.g., Cloudinary)
// Only authenticated users (via JWT) can update profile
```

---

### 3. Authentication Flow (JWT + Cookies)

**Why JWT?**
- JWT = Digital ID card for the user.
- Contains user info (userId, role) and signed with secret key.
- Server does not store session → stateless authentication.

**Why Cookies?**
- Stores JWT securely.
- httpOnly: prevents JS access → protects from XSS.
- sameSite: strict → prevents CSRF attacks.
- secure: true → sent only over HTTPS in production.
- Automatically sent with every request.

**Combined Flow:**
1. User logs in → server creates JWT.
2. JWT stored in httpOnly cookie.
3. Cookie sent automatically with every request.
4. Backend verifies JWT → user is authenticated.

---

### 4. Important Interview Questions & Answers (User Controller)

**Q1: Why use bcrypt for passwords?**
- Hashing prevents storing raw passwords.
- Even if DB is compromised, passwords remain secure.

**Q2: Why JWT + Cookies instead of sessions?**
- JWT = stateless authentication.
- Cookies = secure storage + automatic sending.
- Together = secure, user-friendly, scalable.

**Q3: How do you handle role-based access?**
- Each user has a role (student/recruiter).
- Backend checks role before sensitive actions (e.g., job posting by recruiter).

**Q4: How is logout implemented?**
- Clear the JWT cookie → user session ends.
- No server-side session storage needed.

**Q5: How are profile updates handled securely?**
- UserId comes from JWT → ensures only authenticated user updates own profile.
- Optional file uploads handled via secure cloud storage.
- Skills converted to array for DB querying.

**Q6: What are common security measures in these controllers?**
- Input validation.
- Password hashing.
- JWT authentication.
- Secure cookies.
- Role verification.

**Q7: How does the frontend interact with these controllers?**
- Signup/Login → POST requests with JSON or FormData.
- Update Profile → POST/PUT request with JSON + optional files.
- Logout → GET/POST request to clear cookie.

---

