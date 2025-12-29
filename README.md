# 🚀 ProjectManager

Real-time collaborative task management application (Trello style).
Developed with **Vue 3 (Composition API)**, **Vite**, **Pinia**, and **Firebase**.

---

## 📋 Current Project Status

The project is **functional** and includes the following features:
1.  **Authentication:** Sign up, Login, Logout (via Firebase Auth).
2.  **Dashboard:** Project list, Create/Edit/Delete projects.
3.  **Kanban:** Task management by columns (To Do, In Progress, Done).
4.  **Drag & Drop:** Smooth task movement between columns.
5.  **Design:** Responsive interface, dark mode for mobile navbar, modern gradient background.
6.  **Architecture:** Strict separation (Views / Components / Stores).

---

## 🛠️ Installation & Launch (For Leila)

Since you are retrieving the updated code, here is how to launch the project without errors:

### 1. Get dependencies
Open the terminal in the project folder and run:
```bash
npm install
```
This will install Vue, Pinia, Bootstrap (CSS only), and Firebase.

### 2. Firebase Verification
Make sure the `src/firebase/config.js` file contains your API keys (those from your Firebase project created in Part 1). Since you are the Firebase admin, verify that Firestore and Authentication are enabled in your Google console.

### 3. Launch in development mode
```bash
npm run dev
```
Click on the local link (e.g., `http://localhost:5173`) to view the app.

---

## 📂 Code Structure (Read before modifying)
To avoid conflicts, the code has been structured in a modular way.

*   **`src/stores/`**: Contains all business logic.
  *   `authStore.js`: Manages the logged-in user.
  *   `projectStore.js`: Manages CRUD for projects, tasks, and Drag & Drop. Do not modify the sorting logic here.

*   **`src/views/`**: The main pages.
  *   `DashboardView.vue`: Displays the list of projects.
  *   `ProjectDetails.vue`: Displays the Kanban board.

*   **`src/components/`**: Reusable blocks.
  *   `AppNavbar.vue`: Manages the menu (The mobile menu script is custom-made, do not touch the responsive CSS).
  *   `ProjectModal.vue`: Creation/Editing form.
  *   `TaskCard.vue`: The card for an individual task.

*   **`src/assets/` & `src/main.js`**:
  We are using only Bootstrap CSS. Bootstrap JS has been removed to keep the site lightweight. Do not add it back, as it might create conflicts with the mobile menu.

---

## 🚀 Deployment on Firebase Hosting (Your final step)
Since you have administration rights on the Firebase project, it is up to you to put the site online.

1.  **Build the application**: This command will create a `dist/` folder optimized for production.
  ```bash
  npm run build
  ```

2.  **Install Firebase tools** (if you don't have them):
  ```bash
  npm install -g firebase-tools
  ```

3.  **Login to your account**:
  ```bash
  firebase login
  ```

4.  **Initialization** (To be done only once):
  ```bash
  firebase init hosting
  ```
  *   Question: *"What do you want to use as your public directory?"* -> Type **dist** (Important!).
  *   Question: *"Configure as a single-page app?"* -> Type **Yes** (or y).
  *   Question: *"Set up automatic builds and deploys with GitHub?"* -> **No**.
  *   Question: *"File dist/index.html already exists. Overwrite?"* -> **No**.

5.  **Deploy**:
  ```bash
  firebase deploy
  ```

Once finished, Firebase will give you a public URL (e.g., `https://project-management-xyz.web.app`). This is the link we will need to submit.

---

## ⚠️ Important notes for the presentation
*   **Responsiveness:** The site has been tested on mobile. The menu becomes a "Hamburger" and columns stack up.
*   **Sorting:** Projects are sorted from newest to oldest on the client side (JavaScript) to avoid Firestore index errors.

