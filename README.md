# 🏫 AU-JRC School Activities Calendar

> **Stay informed. Be involved.**  
> A centralized, interactive school activities calendar and administrative management portal built for **Arellano University - Jose Rizal Campus (AU-JRC)**.

---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [How the Website Works](#-how-the-website-works)
3. [Language Breakdown & Roles](#-language-breakdown--roles)
4. [Key Features](#-key-features)
5. [Repository Structure](#-repository-structure)
6. [Getting Started Locally](#-getting-started-locally)
7. [Administrative Portal & Demo Credentials](#-administrative-portal--demo-credentials)
8. [Deployment (GitHub Pages)](#-deployment-github-pages)
9. [License](#-license)

---

## 🌟 Project Overview

The **AU-JRC School Activities Calendar** gathers campus-wide events—including academic forums, sports festivals, student council programs, and club activities—into one responsive web application. Students and faculty can browse events by month, week, or list view, filter by campus organization, search schedules in real time, and inspect full event details, while administrators can create events with custom organization logos, delete outdated events, and post campus announcements.

---

## ⚙️ How the Website Works

This application runs as a **Client-Side Single-Page Application (SPA)** powered entirely by HTML, CSS, and Vanilla JavaScript:

1. **Initialization (`DOMContentLoaded`):**
   When `index.html` loads, `script.js` initializes the default organization metadata (`ORGS`), preloaded events (`eventsData`), and announcements (`announcementsData`), then renders the organization filter chips, calendar grid, upcoming events sidebar, event directory, and announcements feed[cite: 8].
2. **State-Driven UI Updates:**
   The app tracks active state variables in memory—such as `currentYear`, `currentMonth`, `activeOrgFilter`, `currentViewMode`, and `isAdminLoggedIn`[cite: 8]. Switching months, selecting an organization filter, or logging in as an admin triggers targeted re-renders without reloading the browser page[cite: 8].
3. **Per-Event Custom Logos (`FileReader` & Fallback Assets):**
   When creating an event in the Admin Panel, administrators can either upload an image file (converted client-side via `FileReader` into a Base64 data URL) or provide a relative image path/URL[cite: 8]. If no custom logo is supplied, SSC events default to `images/ssc-logo.png`, while other organizations display their corresponding Font Awesome badge icon[cite: 8].

---

## 💻 Language Breakdown & Roles

* **HTML5 (`index.html`):** Defines the semantic page layout, navigation tabs, calendar containers, event detail and login modals, and the Administrator Control Center forms (including event logo file/URL inputs).
* **CSS3 (`styles.css`):** Implements AU-JRC branding (Navy Blue & Gold), responsive CSS Grid and Flexbox layouts, stacked calendar event cards (circular organization logo above the event title), hover transitions, and admin-only delete button styling.
* **JavaScript ES6+ (`script.js`):** Handles calendar date math, dynamic DOM rendering, live search and organization filtering, modal state, client-side image reading (`FileReader`), and administrative CRUD actions[cite: 8].
* **Font Awesome v6:** Provides vector icons for organization badges, navigation controls, and administrative actions[cite: 8].

---

## ✨ Key Features

* **Stacked Event Logo & Title Cards:** Calendar day cells display each event's circular organization logo prominently above the event title for quick visual scanning[cite: 8].
* **Multi-View Calendar:** Switch seamlessly between **Month**, **Week**, and **List** views, and navigate forward or backward across months[cite: 8].
* **Organization Filtering:** Filter events across the calendar, sidebar, and directory by department[cite: 8]:
  * 🎓 **SSC** – Supreme Student Council[cite: 8]
  * 💻 **ICT** – ICT Club[cite: 8]
  * 🩺 **RCY** – Red Cross Youth[cite: 8]
  * 🏆 **SPORTS** – Sports Development[cite: 8]
  * 🌿 **NSTP** – NSTP Office[cite: 8]
  * 🎖️ **ALUMNI** – Alumni Association[cite: 8]
* **Real-Time Search & Event Modal:** Search events by title, venue, or description, and click any event card to view full schedule details[cite: 8].
* **Campus Announcements:** Dedicated tab displaying categorized notices (`Important`, `Urgent`, `Notice`, `Update`)[cite: 8].
* **Administrator Control Center:**
  * Create new events with a custom organization logo file upload or image path/URL[cite: 8].
  * Delete events directly from either the **Calendar grid** or the **Events Directory**[cite: 8].
  * Publish new campus announcements[cite: 8].

---

## 📁 Repository Structure

```text
AU-JRC-Calendar-App/
├── index.html          # Main HTML structure, modals, and admin forms
├── styles.css          # AU-JRC styling, responsive grids, and event card styles
├── script.js           # Calendar logic, filtering, logo handling, and admin CRUD[cite: 8]
├── images/
│   └── ssc-logo.png    # Default Senior Student Council logo asset[cite: 8]
└── README.md           # Project documentation
