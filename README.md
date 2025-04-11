Next.js Project
This is a Next.js project bootstrapped with create-next-app.

Features
Authentication: Login and Signup functionality.

Task Management: Create, delete, and update task status.

User Interceptor: Middleware to handle user-specific logic.

UI Framework: Built with Tailwind CSS and Shadcn UI for a modern design system.

Validation: Zod for schema-based validation.

UI view

<img width="1663" alt="Screenshot 2025-04-11 at 12 16 44 PM" src="https://github.com/user-attachments/assets/bf74db88-07d9-436d-944d-55e1e40a426a" />

<img width="1664" alt="Screenshot 2025-04-11 at 12 16 24 PM" src="https://github.com/user-attachments/assets/7b2b43fb-256d-43f8-b934-2d899b4b21ef" />

<img width="1263" alt="Screenshot 2025-04-11 at 12 23 03 PM" src="https://github.com/user-attachments/assets/c990a572-941c-4ea9-858a-ccc13d8c1ebb" />

<img width="1203" alt="Screenshot 2025-04-11 at 12 17 50 PM" src="https://github.com/user-attachments/assets/274d9ea0-b77c-481a-9e55-d7065d09b479" />

<img width="1172" alt="Screenshot 2025-04-11 at 12 17 16 PM" src="https://github.com/user-attachments/assets/2963af69-e7c6-4039-bfcb-6e14365520d0" />


Getting Started
Run the Development Server
Start the development server using your preferred package manager:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 in your browser to view the application.

Edit Pages
You can start editing the application by modifying app/page.tsx. Changes will auto-update in development mode.

Technologies Used
Framework
Next.js: React-based framework for building web applications.

UI
Tailwind CSS: Utility-first CSS framework.

Shadcn UI: Component library built on Tailwind CSS.

Validation
Zod: TypeScript-first schema validation library.

Authentication
Custom login and signup components integrated with API routes for user management.

Task Management
API routes for task creation, deletion, and status updates.

Learn More
To learn more about Next.js and its features, check out the following resources:

Next.js Documentation - Learn about Next.js features and APIs.

Learn Next.js - Interactive tutorial for Next.js.

Deployment
The easiest way to deploy your Next.js app is through the Vercel Platform. Follow the Next.js deployment documentation for more details.

Installation Instructions
Clone the repository:

bash
git clone <repository-url>
cd <repository-folder>
Install dependencies:

bash
npm install
# or
yarn install
# or
pnpm install
Set up environment variables:

Create a .env.local file in the root directory.

Add required variables (e.g., database connection strings, API keys).

Start the development server:

bash
npm run dev
API Routes
Authentication
POST /api/auth/signup: Register a new user.

POST /api/auth/login: Authenticate an existing user.

Tasks
POST /api/tasks: Create a new task.

DELETE /api/tasks/:id: Delete a task by ID.

PATCH /api/tasks/:id: Update task status by ID.

Contributing
We welcome contributions! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit (git commit -m "Add feature-name").

Push to your branch (git push origin feature-name).

Open a pull request.
