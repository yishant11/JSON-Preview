JSON Schema Builder

A dynamic, interactive JSON Schema Builder application built with React, Ant Design, React Hook Form, and Tailwind CSS. Define JSON schemas by adding, editing, and nesting fields, with real-time preview of the generated JSON.

Live Demo: https://tiny-fox-2eb898.netlify.app/

Screenshot



Schema Builder (left) and live JSON Preview (right)

Features

Add, edit, and delete fields dynamically

Support for String, Number, and Nested field types

Recursive nested fields for deep schema structures

Real-time JSON preview synchronized with builder

Responsive split-layout using Tailwind CSS

Built with Ant Design components and React Hook Form for robust form handling

Installation

Clone the repository

git clone <your-repo-url>
cd <project-folder>

Install dependencies

npm install

Run in development mode

npm start

Build for production

npm run build

Technologies Used

React for UI

Ant Design for ready-made UI components

React Hook Form for form state management

Tailwind CSS for utility-first styling

Netlify for hosting live demo

File Structure

src/
├── components/
│   ├── SchemaBuilder.jsx
│   ├── NestedArray.jsx
│   └── JsonPreview.jsx
├── App.jsx
└── index.jsx

License

This project is open source and available under the MIT License.

