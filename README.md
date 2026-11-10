# AU-JRC-Calendar-App

# 🏫 AU-JRC School Activities Calendar

> **Stay informed. Be involved.**  
> A centralized, interactive school activities calendar and administrative management portal built specifically for Arellano University - Jose Rizal Campus (AU-JRC)[cite: 1].

---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [How the Website Works (Architecture & Data Flow)](#-how-the-website-works-architecture--data-flow)
3. [Language Breakdown & Their Roles](#-language-breakdown--their-roles)
4. [Key Features Breakdown](#-key-features-breakdown)
5. [Getting Started Locally](#-getting-started-locally)
6. [Administrative Portal & Demo Credentials](#-administrative-portal--demo-credentials)
7. [Deployment](#-deployment)

---

## 🌟 Project Overview

The **AU-JRC School Activities Calendar** is designed to eliminate fragmented event announcements by gathering academic forums, sports fests, student council activities, and club schedules into a single, responsive platform. It features an interactive monthly grid, organization filtering, real-time search, detailed event metadata modals, an announcements bulletin, and a secured administrator control panel[cite: 1].

---

## ⚙️ How the Website Works (Architecture & Data Flow)

This project operates as a **Client-Side Single-Page Application (SPA)**. Unlike traditional websites that reload the entire page when you click a link or switch tabs, this app dynamically rewrites parts of the webpage using JavaScript.

1. **Initialization (`DOMContentLoaded`):** 
   When the browser loads `index.html`, the attached JavaScript file (`script.js`) triggers an initialization function. It reads local data arrays containing events and announcements, and dynamically builds out the UI components (organization filter chips, calendar grid cells, and sidebar cards).
2. **State Management:** 
   The app keeps track of user states in real-time—such as the currently selected month/year, active organization filters (e.g., SSC, ICT Club), active view modes (Month vs. Week vs. List), and authentication status (Guest vs. Admin).
3. **Dynamic DOM Rendering:** 
   When a user interacts with the page (e.g., clicking the next month arrow or filtering by an organization), JavaScript recalculates the required items and updates only the necessary container elements in the HTML structure without refreshing the browser window.

---

## 💻 Language Breakdown & Their Roles

The project is built using three core web technologies working in synergy:

### **1. HTML5 (`index.html`) - *The Skeleton & Structure***
* **What it does:** HTML defines the semantic layout and layout blocks of the website. It creates the navigation bar, hero banner container, main grid layouts, modal overlays for event details and admin login, and the footer.
* **How it works:** It acts as the blueprint. Every button, input field, and content section you see on the screen exists as an HTML element waiting for CSS to style it and JavaScript to animate or populate it.

### **2. CSS3 (`styles.css`) - *The Skin & Styling***
* **What it does:** CSS handles the visual presentation, color schemes, typography, responsive grids, and transitions. 
* **How it works:** 
  * **Branding & Variables:** Utilizes custom CSS variables (`:root`) to enforce Arellano University’s official navy blue (`--au-navy`) and gold (`--au-gold`) color palette.
  * **Layout Systems:** Implements **CSS Grid** for the calendar month layout and **Flexbox** for the navigation bars, filter chips, and header toolbars.
  * **Responsiveness:** Uses media queries (`@media`) to dynamically rearrange layout elements from multi-column desktop grids into single-column layouts optimized for smartphones and tablets.

### **3. JavaScript (ES6+) (`script.js`) - *The Brain & Interactivity***
* **What it does:** JavaScript drives all the logic, user interactions, calculations, and data manipulation.
* **How it works in this app:**
  * **Calendar Grid Math:** Dynamically calculates calendar dates, aligning the first day of any given month with the correct day of the week (Sunday–Saturday) while padding out past/future month overflows.
  * **Event Filtering:** Filters JavaScript array objects based on active category chips and search input strings.
  * **DOM Manipulation:** Injects HTML strings dynamically into containers (like the upcoming events sidebar or event directory).
  * **Admin CRUD Operations:** Manages state transitions for logging in, validating credentials, pushing new event objects into the runtime array, and rendering delete functions.

---

## 🚀 Key Features Breakdown

* **Interactive Calendar Views:** Seamlessly switch between a full monthly grid, weekly perspective, or flat list view[cite: 1].
* **Organization Filter Chips:** Click any department badge (SSC, ICT, Red Cross, Sports, NSTP, Alumni) to instantly filter calendar cells and sidebars[cite: 1].
* **Event Details Modal:** Clicking any event card opens an overlay detailing time, venue, description, eligibility, and contact details[cite: 1].
* **Announcements Feed:** A dedicated bulletin board keeping students informed of schedule shifts, venue changes, and urgent notices[cite: 1].

---

## 🛠️ Getting Started Locally

1. **Clone or Download** the repository to your computer.
2. Ensure `index.html`, `styles.css`, and `script.js` are saved together inside the same project folder.
3. **Launch:** Double-click `index.html` to open it in any modern web browser.

---

## 🔑 Administrative Portal & Demo Credentials

To test adding new events or posting campus announcements:
* Click the **Login** button on the upper right of the navigation bar[cite: 1].
* **Username:** `admin`
* **Password:** `au1938`
* Once authenticated, the **Administrator Control Center** panel unlocks at the bottom of the page, allowing live event creation and deletion.

---

## 📄 License

Distributed under the MIT License. And idea owner of Cheska Burce
