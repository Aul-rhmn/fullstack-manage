Berikut versi README-mu yang sudah dirapikan dan rapi secara format Markdown:

---

# Fullstack Project: Next.js + Node.js + MySQL

> Fullstack project dengan frontend React (Next.js + TypeScript) dan backend Node.js + Express + MySQL.
> Fitur: login/register, role-based access (user/admin), dashboard user & admin, employee CRUD dengan upload foto (jpg/jpeg, max 300KB). UI: Bootstrap 5.

---

## Fitur

* Login & Register
* Role-based access:

  * **User**: dashboard, list/add employees
  * **Admin**: dashboard, user management (CRUD)
* Employee CRUD:

  * Upload foto jpg/jpeg ≤ 300KB
* Bootstrap 5 responsive UI
* JWT Authentication

---

## Backend Setup (Node.js + Express + MySQL)

1. Masuk folder backend:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Buat file `.env` berdasarkan `.env.example`:

   ```env
   PORT=4000
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=test_fullstack
   JWT_SECRET=supersecretkey
   UPLOAD_DIR=uploads
   ```
4. Buat database & tabel di MySQL:

   ```bash
   mysql -u root -p < migrations.sql
   ```
5. Jalankan server:

   ```bash
   npm run dev
   ```

   Server default di `http://localhost:4000`.

---

## Frontend Setup (Next.js + TypeScript)

1. Masuk folder frontend:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Jalankan Next.js:

   ```bash
   npm run dev
   ```

   Frontend default di `http://localhost:3000`.

---

### Testing singkat

* Buka [http://localhost:3000](http://localhost:3000)
* Register user baru → login
* **Default admin account:**

  * Email: `admin@gmail.com`
  * Password: `admin123`

---

## Login & Role Admin

* User baru otomatis role `user`.
* Untuk membuat admin, update role di MySQL:

  ```sql
  UPDATE users SET role='admin' WHERE email='youremail@example.com';
  ```
* Login:

  * Admin → redirect ke `/dashboard/admin`
  * User → redirect ke `/dashboard`
  
---
