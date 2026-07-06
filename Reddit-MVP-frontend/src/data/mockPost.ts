import type { Post } from "../types/post";

export const mockPosts: Post[] = [
    {
        id: 1,
        title: "What are you building with ASP.NET core right now?",
        content: "I am working on a Reddit-inspired MVP with React, TypeScript, Tailwind CSS, ASP.NET Core, EF Core, and SQL Server.",
        communityName: "dotnet",
        authorUsername: "amir",
        voteScore: 128,
        commentsCount: 34,
        createdAt: "2 hours ago",
        tag: "Discussion",
    },
    {
        id: 2,
        title: "Best way to structure a full-stack portfolio project?",
        content: "Trying to keep the project clean without overengineering it. What folders and architecture actually matter for junior projects?",
        communityName: "webdev",
        authorUsername: "codelearner",
        voteScore: 87,
        commentsCount: 19,
        createdAt: "5 hours ago",
        tag: "Question",
    },
    {
        id: 3,
        title: "React + Tailwind is perfect for fast UI building",
        content: "Building reusable cards, sidebars, buttons, and layouts feels much faster once the base design system is clear.",
        communityName: "reactjs",
        authorUsername: "frontendfan",
        voteScore: 214,
        commentsCount: 58,
        createdAt: "1 day ago",
        tag: "Frontend",
    },
];