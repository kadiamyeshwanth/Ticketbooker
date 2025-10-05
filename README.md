# 🎫 Ticket Booking System (React + Vite)

This project is a simple, state-driven, multi-step ticket reservation application built using **React** and **Vite**. It demonstrates a clean component structure and effective use of React hooks (`useState`, `useEffect`, `useCallback`) to manage the booking workflow. The front-end user interface is styled using **Tailwind CSS**.

## ✨ Features

The application guides the user through a clear, three-step process, all handled by the main **`TicketBookingApp.jsx`** component:

* **Event Selection (Step 1):** Users choose from a mock list of available events. Event data is loaded asynchronously to simulate an API call (`fetchEventsApi`).
* **Details Entry (Step 2):** Customer contact information (Full Name and Email) is collected, with client-side form validation.
* **Confirmation (Step 3):** A summary of the reservation is displayed, including the **Total Cost**, which is calculated as Event Price multiplied by the number of tickets.
* **State Logic:** The application uses a single parent component to manage the entire booking state and step navigation.
* **Visual Status:** A simple progress indicator tracks the user's progress through the booking steps.

---

## 🛠️ Technology Stack

* **Framework:** React v19+
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (via CDN)
* **Icons:** Lucide React

---

## 🚀 Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

You need **Node.js** and **npm** (or Yarn/pnpm) installed on your machine.

### 1. Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ticket-app # Or the name of your repository folder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

### 2. Execution

Run the development server with Hot Module Replacement (HMR):

```bash
npm run dev
# or
# yarn dev
