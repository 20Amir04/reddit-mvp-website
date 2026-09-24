# Reddit MVP — Full-Stack Social Forum Website

## 📌 About the Project

Reddit MVP is a full-stack responsive social forum web application inspired by Reddit.

The project was built as a portfolio full-stack application to practice building a real-world community platform using React, TypeScript, TailwindCSS, ASP.NET Core Web API, Entity Framework Core, SQL Server, and JWT authentication.

The application includes a complete social platform flow: user registration, login, community creation, joining communities, creating posts, voting, commenting, saving posts, searching content, editing account settings, and managing community information.

---

## 🚀 Features

### 👤 User System

- User registration
- User login
- JWT authentication
- Protected routes and protected API endpoints
- User profile page
- User posts page
- Change account email
- Change account password
- Authentication-based UI updates

### 🧵 Communities

- Create communities
- Explore communities page
- Community detail page
- Join communities
- Leave communities
- Conditional Join / Leave button state
- Edit community description
- Edit community banner image URL
- Community creator ownership checks

### 📝 Posts

- Create posts inside communities
- View posts on the home feed
- View posts inside a specific community
- View posts by user profile
- Post detail page
- Edit own posts
- Delete own posts
- Responsive post cards
- Post sorting by newest and popular

### ⬆️ Voting System

- Upvote posts
- Downvote posts
- Toggle votes
- Change vote direction
- Vote score calculation
- Karma based on votes received on user's posts

### 💬 Comments

- Add comments to posts
- Reply to comments
- Edit own comments
- Delete own comments
- Nested comment display
- Comment count shown on post cards

### 🔖 Saved Posts

- Save posts
- Unsave posts
- Saved posts page
- Persistent saved posts stored in SQL Server
- Saved state displayed on post cards

### 🔍 Search

- Search posts
- Search communities
- Search results page
- Search from navbar
- Filter results by type:
  - All
  - Posts
  - Communities

### ✨ UI / UX

- Dark Reddit-style interface
- Responsive navigation with mobile burger menu
- Left sidebar navigation
- Right sidebar with popular communities
- Loading states
- Empty states
- Error messages
- Active navigation states
- Mobile responsive layout

### 📱 Responsive Design

- Desktop layout
- Tablet layout
- Mobile layout

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- TailwindCSS
- React Router
- Heroicons
- Axios
- Vite

### Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- ASP.NET Core Identity
- JWT Authentication
- SQL Server

### Tools

- Git & GitHub
- VS Code
- Visual Studio
- SQL Server Management Studio
- SQL Server Express

---

## 🎯 Project Goals

This project was created to practice:

- Building a full-stack social media style application
- Structuring a React + TypeScript frontend project
- Creating reusable UI components
- Building protected frontend routes
- Working with JWT authentication
- Building REST API endpoints with ASP.NET Core Web API
- Using ASP.NET Core Identity for authentication
- Designing relational database models with Entity Framework Core
- Working with SQL Server and EF Core migrations
- Connecting React frontend to ASP.NET Core backend
- Managing real CRUD features across multiple entities
- Improving responsive UI design with TailwindCSS

---

## 📂 Pages

- **Home** — main post feed, create post CTA, sorting by newest / popular
- **Login** — user authentication page
- **Register** — new account creation page
- **Explore Communities** — list of all communities with search and join / leave actions
- **Community Details** — community banner, description, members, posts, join / leave, edit community
- **Create Community** — form for creating a new community
- **Create Post** — form for creating a post inside a community
- **Post Details** — full post view with comments and replies
- **User Profile** — user information, karma, post count, comment count, user posts
- **Saved Posts** — posts saved by the current user
- **Search Results** — posts and communities matching the search query
- **Settings** — change email and password

---

## 📦 Backend Functionality

The backend handles authentication, communities, posts, voting, comments, saved posts, search, profile data, and account settings.

### Main Backend Features

- User registration and login with ASP.NET Core Identity
- JWT token generation
- Protected API endpoints with authorization
- Community CRUD functionality
- Community membership system
- Post CRUD functionality
- Post voting system
- Comment and reply system
- Saved posts system
- User profile statistics
- Search across posts and communities
- Account email update
- Account password update

---

## 🗄️ Database Tables

The project uses SQL Server with Entity Framework Core.

Main database tables include:

- `AspNetUsers`
- `Communities`
- `CommunityMembers`
- `Posts`
- `PostVotes`
- `Comments`
- `SavedPosts`

ASP.NET Core Identity also creates additional authentication-related tables such as roles, claims, logins, and tokens.

---

## ⚙️ Installation

### Clone repository

```bash
git clone https://github.com/20Amir04/reddit-mvp-website.git
cd reddit-mvp-website