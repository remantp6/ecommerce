# Simple eCommerce App

## Project Overview

This project is a simple eCommerce frontend application that allows authenticated users to:

- Register and log in using JWT authentication.
- View and manage products (Admin can add).
- Add and remove items from the shopping cart.
- View total price and modify quantity in the cart.
- Protect routes for authenticated users only.
- View an order history page.
- Search products.

## Additional Features

  - **Protected Routes**  
  Certain pages are accessible only to authenticated users.

- **Centralized Error Handling**  
  All API-related errors are handled in one place using Axios interceptors.

- **Refetch Mechanism**  
  Add refetch mechanism in case of unexpected error while loading data.

- **Skeleton Loaders**  
  Skeleton screens are displayed while data is loading to improve user experience.

- **Toast Notifications**  
  Feedback messages from the server (success, error, etc.) are shown using toast notifications for better user interaction.

## Technologies Used

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **State Management:** Zustand
- **Data Fetching:** React Query
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/remantp6/ecommerce.git
   cd ecommerce

2. Install dependency:
   npm install

3. Run application:
   npm run dev

### Project Structure
```
├── app/
├── components/
├── config/
├── hooks/
├── libs/
│ ├── api/
│ ├── validations/
│ └── utils.ts
├── provider/
├── store/
├── types/
