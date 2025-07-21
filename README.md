## 👨‍💼 Employee Manager App

A fully functional employee management app built with React Native, Redux Toolkit, SQLite (via Drizzle ORM), React Native Paper, and React Hook Form. It supports offline data storage, mocked authentication, form validation, and quote fetching via a public API.

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-593d88?style=for-the-badge&logo=redux&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-000000?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-DB7093?style=for-the-badge)
![React Native Paper](https://img.shields.io/badge/React%20Native%20Paper-6200EE?style=for-the-badge&logo=react&logoColor=white)

<img width="300" alt="Splash Screen" src="https://github.com/user-attachments/assets/baef80fc-44d5-412d-a4f3-1a2d33ec98d4" />

---

## 📱 Screenshots

### 🔐 Login Screen(iOS)
<img width="402" alt="Login Screen(iOS)" src="https://github.com/user-attachments/assets/fe723871-a395-4f03-8e55-01f69ee6320d" />

### 🔐 Login Screen(Android)
<img width="400" alt="Login Screen(Android)" src="https://github.com/user-attachments/assets/a61aaf1b-0c34-4de8-bad9-d3804a5b1668" />

### 🏠 Main Screen(iOS)
<img width="402" alt="Main Screen(iOS)" src="https://github.com/user-attachments/assets/f4e1f3e7-5c01-41e4-b012-0928c1240d16" />

### 🏠 Main Screen(Android)
<img width="400" alt="Main Screen(Android)" src="https://github.com/user-attachments/assets/6ab0a014-7099-4d4b-b3f5-f7bcce5b582c" />

### 👤 Add Employee Screen(iOS)
<img width="402" alt="Add Employee Screen(iOS)" src="https://github.com/user-attachments/assets/03ab2043-4237-429a-8a02-a5b8330411cf" />

### 👤 Add Employee Screen(Android)
<img width="400" alt="Add Employee Screen(Android)" src="https://github.com/user-attachments/assets/1cac20b9-3971-4186-b5fb-c727344310d1" />

### ✏️ Edit/View/Delete Employee Screen(iOS)
<p align="center">
<img width="402" alt="IMG_0657" src="https://github.com/user-attachments/assets/3030c3a5-3cc2-4bb9-97d0-c19e96cca462" />
<img width="402" alt="IMG_0658" src="https://github.com/user-attachments/assets/a5982d3c-177a-48fe-8fd7-4b8c7504be97" />

</p>

### ✏️ Edit/View/Delete Employee Screen(Android)
<p align="center">
<img width="400" alt="Screenshot_1753125019" src="https://github.com/user-attachments/assets/94a9a710-c081-40a5-af79-8e1c0ad9d181" />
<img width="400" alt="Screenshot_1753125045" src="https://github.com/user-attachments/assets/14c85058-f537-4cb4-9f04-14658963e05e" />
</p>

---

## 🧰 Libraries

| Category                | Tech Used                                       |
|------------------------|--------------------------------------------------|
| 📱 Framework           | React Native (Expo)                              |
| ⚛️ State Management    | Redux Toolkit (RTK)                              |
| 💾 Local DB            | SQLite + Drizzle ORM                             |
| 🧱 UI Framework        | React Native Paper                               |
| 🧮 Form Handling       | React Hook Form + Yup                            |
| 📅 Date Input          | react-native-ui-datepicker                       |
| 🌐 API                 | https://api.realinspire.live/v1/quotes/random    |

---

## 🔐 Environment Variables

This app supports `.env` configuration for flexibility in development and testing.

Create a `.env` file in the root of your project:

```env
EXPO_PUBLIC_QUOTES_API_URL=https://api.realinspire.live/v1/quotes/random
EXPO_PUBLIC_MOCKED_PIN=1234
EXPO_PUBLIC_DUMMY_DATA=true
```

| Variable                     | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| `EXPO_PUBLIC_QUOTES_API_URL` | Endpoint for fetching random quotes.                                |
| `EXPO_PUBLIC_MOCKED_PIN`     | Mocked PIN for login. Default: `1234`                               |
| `EXPO_PUBLIC_DUMMY_DATA`     | `true` to preload dummy data on first launch, `false` to disable it |

---

## 🛠 Setup Instructions
1. Clone the Repository
```bash
git clone https://github.com/your-username/employee-manager-app.git
cd employee-manager-app
```
2. Install Dependencies
```bash
npm install
```
3. Create a .env file accoring to Environment Variables

4. Run the App

```bash
npx expo start
```
Open in Expo Go app or Android/iOS emulator.

## 🧪 Testing the App
Use 1234 (or value in .env) as the login PIN.

Toggle EXPO_PUBLIC_DUMMY_DATA=true to insert test employees at app start
