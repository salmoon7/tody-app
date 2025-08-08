
# 📝 Tody Mobile – React Native Todo App

A mobile Todo List application built as part of the **React Native Developer Test** for **P2vest Technology Ltd**.  
The app implements **authentication**, **upcoming tasks listing**, and **settings management** based on the provided Figma design, using a combination of modern React Native tools and clean architecture.

---

## 📦 Tech Stack

- **React Native 0.79.5** (via Expo SDK 53)
- **Expo Router** for file-based navigation
- **TypeScript** for type safety
- **Axios** for API calls
- **Zustand** for lightweight state management
- **React Navigation** for navigation patterns
- **Day.js** for date handling
- **React Native Paper** for UI components
- **@expo/vector-icons** for scalable icons (instead of static image icons — reduces app size and improves performance)

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/tody-mobile.git
cd tody-mobile
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm start
# or
yarn start
```

### 4. Run on a device or emulator

```bash
npm run android   # for Android
npm run ios       # for iOS (Mac required)
```

> **Note:** Requires Node.js ≥ 18 and Expo Go app installed on your device for development preview.

---

## 🎯 Features Implemented

### 1. **Authentication (Register / Sign In)**

* Integrated with [DummyJSON Auth API](https://dummyjson.com/docs/auth) `/auth/login`
* Simulated login flow using **Axios**
* Displays error messages for invalid credentials
* Uses **Zustand** to store authentication state globally

### 2. **Home Dashboard**

* Clean and responsive layout based on Figma design
* Shows a welcoming dashboard for logged-in users

### 3. **Upcoming Tasks**

* Integrated with [DummyJSON Todos API](https://dummyjson.com/docs/todos)
* Lists upcoming tasks for the authenticated user
* Mark tasks as completed
* Displays **"No todos for today"** message if there are no scheduled tasks
* Uses **Day.js** to filter and display tasks for the selected day

### 4. **Settings Screen**

* Displays authenticated user’s profile (fetched from DummyJSON Users API)
* Static options for additional settings per Figma design

### 5. **UI Enhancements**

* Replaced static image icons from Figma with **vector icons** for:

  * Better scalability
  * Smaller app size
  * Consistent styling across screen densities

---

## 🎨 Design Choices & Assumptions

1. **Vector Icons over PNG Assets**

   * Chose `@expo/vector-icons` instead of static images from the Figma design to optimize memory usage and reduce final APK size.

2. **Zustand for State Management**

   * Selected over Redux for its simplicity and minimal boilerplate, ensuring a clean codebase for a small-to-medium scale app.

3. **API Integration**

   * Used Axios for HTTP requests with interceptors for potential future enhancements like token refresh.

4. **Figma Layout Matching**

   * Replicated the Figma layout as closely as possible while making minor adjustments for mobile responsiveness.

5. **No Todos Message**

   * Implemented a user-friendly fallback message when a selected day has no tasks.

---

## 📸 Screenshots

> *Screenshots from the implemented app running on Android*

| Login Screen                    | Home Dashboard                | Upcoming Tasks                        | No Todos Message                      | Settings Screen                       |
| ------------------------------- | ----------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Log<img width="720" height="1600" alt="login-screen" src="https://github.com/user-attachments/assets/fdc49d21-ff35-4383-b099-5df9957d44c5" />
in]| ![Hom<img width="720" height="1600" alt="home-screen" src="https://github.com/user-attachments/assets/24342933-f58f-466e-a135-bf5cf5a5fb9b" />
e| ![Upcomi<img width="720" height="1600" alt="upcoming" src="https://github.com/user-attachments/assets/9257d239-e587-4cd2-95eb-b59027c02987" />
ng]  | ![Settings<img width="720" height="1600" alt="settings" src="https://github.com/user-attachments/assets/f7202f25-a712-4a0f-aca2-f37a63410776" />
]  |

---

## ⚠️ Challenges Faced

1. **Figma → React Native Conversion**

   * Translating exact pixel-perfect designs into React Native while keeping layouts responsive across multiple devices required fine-tuning styles.

2. **API Data Shape**

   * The DummyJSON API does not perfectly match the Figma’s UI data requirements, so I transformed and filtered the API responses to match the design expectations.

3. **Date Filtering**

   * Handling date-specific todos required consistent parsing with Day.js and time zone considerations.

4. **Optimizing for APK Size**

   * Replacing images with vector icons and minimizing dependencies helped reduce bundle size for faster installation.

---

## 📂 Project Structure

```
tody-mobile/
├── app/                  # App screens (Expo Router)
│   ├── (tabs)/           # Tab navigation screens
│   ├── _layout.tsx       # Navigation layout
├── assets/               # Fonts & images (only essential)
├── components/           # Reusable UI components
├── hooks/                # Custom hooks
├── store/                # Zustand state store
├── constants/            # Theme colors & constants
├── scripts/              # Helper scripts (e.g., reset project)
└── package.json
```

---

## 📦 Build & APK

To generate an APK for submission:

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

The resulting `.apk` can be downloaded from the EAS build dashboard.

---

## 👨‍💻 Author

**Taofeek AbdulSalam Adebayo**
React Native Developer Candidate – P2vest Technology Ltd
[GitHub](https://github.com/salmoon7) 

---


