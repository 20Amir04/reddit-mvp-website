# Reddit MVP — Full-Stack Website

## 📌 About the Project

Reddit MVP is a full-stack responsive social forum web application inspired by Reddit.

The project was built as a full-stack application to practice building a real-world community platform using React, TypeScript, TailwindCSS, C#, ASP.NET Core Web API, Entity Framework Core, SQL Server, and JWT authentication.

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
- Account settings
- Authentication-based UI updates

### 🧵 Communities

- Create communities
- Explore communities page
- Community detail page
- Join/Leave communities
- Conditional Join / Leave button state
- Community settings
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

- Building a full-stack social media style website
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

## 📸 Screenshots

### Desktop
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e7752a71-4f22-4957-a923-8003cc1d5663" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/27fb4ac8-c5a5-4410-8a62-d0823ca4d104" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f189f910-738f-4304-b6e3-fa28d17c394b" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/82c7040f-9aae-4da5-a24e-d16a7f95c92b" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/49a54427-2fcc-492b-b51e-45ca28601c69" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ff70be5c-90eb-4916-adb3-f47d4653d818" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ddb76477-77cb-4189-bda2-a782b8a34983" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7841f101-be64-404a-aa49-7268c04ab8be" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2d31c505-6c01-4536-bf0b-b5dd3a0271c2" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0615bef1-b4ff-4bee-9f9f-3fa607b5ff2c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e44adafe-f91b-4253-87ce-a9159dbce899" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/56b066c9-7751-47af-8dc7-f39f2b6daf81" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e9c8794c-27c3-47b1-8bb3-9945ec9ed85f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/018caf99-7cf1-42b3-8190-85bf431723e7" />


### Mobile version
<img width="328" height="717" alt="Screenshot (185)" src="https://github.com/user-attachments/assets/86b2fce6-2b68-4f96-aa9a-61bd5fe8fd97" />
<img width="328" height="716" alt="Screenshot (187)" src="https://github.com/user-attachments/assets/0d368358-4159-4706-bfe2-e398f1e42fc2" />
<img width="326" height="716" alt="Screenshot (186)" src="https://github.com/user-attachments/assets/0be0857a-9005-43b6-8aba-911a43c1c07b" />
<img width="331" height="714" alt="Screenshot (188)" src="https://github.com/user-attachments/assets/6448dd29-cf0e-4c25-99af-aaa4b12fce33" />
<img width="331" height="714" alt="Screenshot (189)" src="https://github.com/user-attachments/assets/afae1cdc-74d5-4605-9c2e-b6ef63b62a84" />
<img width="330" height="715" alt="Screenshot (190)" src="https://github.com/user-attachments/assets/9a233298-3741-40e5-8ab5-13e20e980a06" />
<img width="326" height="715" alt="Screenshot (191)" src="https://github.com/user-attachments/assets/88b3f5dd-675d-4adf-b097-9e0dc7feea52" />
<img width="324" height="718" alt="Screenshot (192)" src="https://github.com/user-attachments/assets/9dc96275-1b51-4211-a3f3-e1a2a4bb7e0c" />

---

## ⚙️ Installation

### Clone repository
```bash
git clone https://github.com/20Amir04/reddit-mvp-website.git
cd reddit-mvp-website
```

### Run Backend
```bash
cd Reddit-MVP-backend
dotnet restore
dotnet ef database update
dotnet run
```

### Run Frontend
```bash
cd Reddit-MVP-frontend
npm install
npm run dev
```

## 🔌 API Endpoints
```bash
Base URL example:
https://localhost:7117/api
```

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Communities

- `GET /api/communities`
- `GET /api/communities/{name}`
- `POST /api/communities`
- `PUT /api/communities/{id}`
- `POST /api/communities/{id}/join`
- `DELETE /api/communities/{id}/leave`
- `GET /api/communities/{name}/posts`

### Posts

- `GET /api/posts`
- `GET /api/posts/{id}`
- `POST /api/posts`
- `PUT /api/posts/{id}`
- `DELETE /api/posts/{id}`
- `POST /api/posts/{id}/vote`
- `POST /api/posts/{id}/save`
- `DELETE /api/posts/{id}/save`

### Comments

- `GET /api/posts/{postId}/comments`
- `POST /api/posts/{postId}/comments`
- `PUT /api/comments/{id}`
- `DELETE /api/comments/{id}`

### Users

- `GET /api/users/{username}`
- `GET /api/users/{username}/posts`
- `GET /api/users/me/saved-posts`

### Search

- `GET /api/search?query={query}&type=all`
- `GET /api/search?query={query}&type=posts`
- `GET /api/search?query={query}&type=communities`

### Account Settings

- `PUT /api/account/email`
- `PUT /api/account/password`

---

## 👨‍💻 Author

Amir Arabi
Software Engineering Student
Junior / Intern Full-Stack Developer

GitHub: https://github.com/20Amir04
