# 🥗 React Calorie Tracker

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/css_modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)

A sleek, responsive frontend application built with React to help users track their daily calorie intake. This project focuses on clean component architecture, robust state management, and an intuitive user interface.

🔴 **Live Demo:** [View the Application Here](https://mostafagamalbisher.github.io/Calories-Tracker/)  
📂 **Repository:** [GitHub Source Code](https://github.com/MostafaGamalBisher/Calories-Tracker)

---

## ✨ Features

- **Daily Tracking:** Add custom meal records including date, meal type (Breakfast, Lunch, Dinner, Snack), description, and calorie count.
- **Persistent Storage:** Fully integrated with the browser's `localStorage`. Your meal history is automatically saved and persists even after refreshing or closing the page.
- **Date Filtering:** Dynamically filter and view your meal history by selecting a specific date.
- **Interactive UI:** Utilizes a custom-styled popup modal (`react-modal`) for seamless and distraction-free data entry.
- **Smart Validation:** Includes front-end Guard Clauses and HTML5 validation to prevent incomplete or erroneous data submissions.
- **Graceful Empty States:** Displays friendly, styled empty-state messages when no meals are recorded for a selected day.

## 🛠️ Tech Stack

- **Core:** React (via Vite), JavaScript (ES6+)
- **Styling:** CSS Modules (Scoping styles to specific components to prevent global leakage)
- **Libraries:** `react-modal` (Accessible popup architecture)
- **Data Flow:** Unidirectional Top-Down data flow with functional state updates.

## 🧠 Architectural Highlights

This project was built with a strong emphasis on modern React best practices:

- **Separation of Concerns:** Dividing logic between "Manager" components (handling state and filtering) and "Painter" components (handling UI rendering).
- **Conditional Rendering:** Utilizing logical operators (`&&`) and early `return` guard clauses to safely control the UI state based on dynamic data.
- **State Consolidation:** Condensing multiple form inputs into unified state objects for cleaner update logic.

## 🚀 How to Run Locally

If you'd like to clone and run this project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/MostafaGamalBisher/Calories-Tracker.git](https://github.com/MostafaGamalBisher/Calories-Tracker.git)
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Calories-Tracker
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Built by Mostafa Gamal Bisher
