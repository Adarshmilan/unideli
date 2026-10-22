# 🛍️ UniDeli – College Market App

A campus marketplace where students **request items** they need (textbooks, food, supplies) and offer a delivery fee, and other students **accept and deliver** them to earn money. This is the React + TypeScript version of the UniSync idea, with a modern UI designed in Figma.

> 📘 Detailed docs: [`src/PROJECT_DOCUMENTATION.md`](src/PROJECT_DOCUMENTATION.md)
> 🎨 Original design: [College Market App Design (Figma)](https://www.figma.com/design/q02LnEJ9XWZ2ms2jHsQ5qM/College-Market-App-Design)

## ✨ Features

- **Sign up / log in** with college details
- **Dashboard** – browse open requests from other students
- **Create request** – item, location and delivery fee
- **My Requests** – manage what you've posted
- **Accepted Requests** – track deliveries you've taken on
- **Chat** – message the other student about a delivery
- **Profile** – your info and stats
- Responsive layout with a top navigation bar

## 🛠️ Tech stack

- **React 18** + **TypeScript**
- **Vite 6**
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives)
- **Lucide** icons
- **React Context API** for app state (currently using mock data)
- **Supabase** – client and an edge-function key-value store are set up for the backend

## 📁 Structure

```
src/
├── App.tsx                  # App shell + simple page routing
├── contexts/AppContext.tsx  # Global state: user, requests, chats
├── pages/                   # Login, SignUp, Dashboard, CreateRequest, MyRequests,
│                            # AcceptedRequests, Chat, UserProfile
├── components/
│   ├── Navigation.tsx
│   ├── RequestCard.tsx
│   └── ui/                  # shadcn/ui components
├── supabase/functions/server/   # Supabase edge function + kv_store
└── styles/globals.css
js/supabaseClient.js         # Supabase client config
```

## 🚀 Run it

```bash
git clone https://github.com/Adarshmilan/unideli.git
cd unideli
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
