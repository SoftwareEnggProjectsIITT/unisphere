

# 🌐 **Unisphere — Full-Stack Real-Time Community Platform**

Unisphere is a modern, full-stack platform designed to bring college communities together.
It enables students to form interest-based groups, collaborate in structured channels, share updates, and participate in anonymous confession-based interactions — all inside a single unified application.

Unisphere aims to solve the real problems faced by students on campus: scattered communication, unstructured coordination, and the lack of a central digital hub for clubs, activities, and social interactions.

---

# **1. Introduction**

## **1.1 Purpose**

The purpose of this document is to specify the functional and non-functional requirements of **Unisphere**, a web platform built to help college students form interest-based communities, organize meetups, and strengthen campus social life.

This document defines:

* What the system will do
* The features to be implemented
* The platform's constraints and scope
* Intended interactions within the system

It serves as a guide for the development team, testers, and stakeholders.

---

## **1.2 Scope**

**Unisphere** allows students to:

* Create or join **public interest-based groups** (servers)
* Chat with like-minded peers in **real-time**
* Collaborate through **topic-based channels**
* Share media, announcements, and files
* Organize club events and activities
* Use **DMs** for private conversations
* Participate in the **anonymous Confessions module**

The platform automates group creation, membership management, and community moderation.
It is designed to significantly improve how students socialize and collaborate on campus.

Future versions may include:

* Automated schedule-based meetup optimization
* Smart event suggestions
* AI-powered group recommendations

---

## **1.3 Overview**

Unisphere is a **web-based platform** accessible on all modern browsers.
It uses email authentication (Clerk Auth), real-time communication (Socket.io / Pusher), and a robust backend powered by **Next.js + Prisma + PostgreSQL**.

The system offers:

* Club/Server creation
* Channel-based structured communication
* Anonymous confession posting
* Real-time updates
* Scalable architecture

---

# **2. Novelty of the Project**

Unisphere introduces functionality **not commonly found in existing college communication systems**. The novelty lies in its *campus-oriented digital ecosystem* that merges the best elements of Discord, WhatsApp, Reddit, and campus forums — but rebuilt from scratch with a college-first perspective.

### **🚀 1. Real-Time Club-Oriented Architecture**

While colleges rely on scattered WhatsApp groups and Instagram pages, Unisphere provides:

* Dedicated servers for clubs & student communities
* Role-based permissions (Admin, Member, Guest)
* Structured multi-channel communication

This solves the long-standing problem of **unorganized student communication**.

### **🧩 2. Integrated Anonymous Confessions Module**

Most confession systems exist as separate Instagram pages.
Unisphere uniquely embeds:

* Anonymous posting
* Theme-based confessions
* Gradient-styled UI
* Real-time confession feed
* Likes + moderation tools

This creates a **safe, interactive social layer** inside the same platform.

### **⚡ 3. Unified Platform for Events, Chat, Coordination & Fun**

Instead of switching between:

* WhatsApp groups
* Google Forms
* Instagram updates
* Google Meet links
* Reddit threads

Unisphere combines everything into **one integrated college hub**.

### **📡 4. Real-Time Communication Built From Scratch**

Unlike static college portals, Unisphere includes:

* Live messaging
* Typing indicators
* Live file sharing
* Infinite scroll chat
* Audio/video support via LiveKit

This provides a **modern communication experience** that typical college systems lack.

---

# ⭐ **Core Features**

## 🔐 Authentication

* Gmail login
* Protected routes
* Profile creation & management
* Server-based access control

---

## 🗂 Servers (Communities)

Each server represents a **club, interest group, or team**.

Clubs can:

* Create public or private servers
* Set roles & permissions
* Invite members
* Manage channels
* Customize icons & names

---

## 📺 Channels

Channels provide structured communication based on topics:

* Announcements
* Event planning
* General chat
* Tech discussions
* Audio rooms
* Video rooms

---

## 💬 Messaging

* Real-time chat
* Image & file uploads
* Message editing & deletion
* Pagination + infinite scroll
* Optional typing indicators

---

## 👥 Friends / Direct Messages

* Private real-time messaging
* Shared media support
* Dedicated chat interface

---

## 🔊 LiveKit Integration

* Voice rooms
* Video chat
* Virtual discussions & meetings

Perfect for remote club meetings or study sessions.

---

# 🗣 Confessions Module

A unique fun module that lets students post **anonymous confessions**.

### ✨ Features

* Anonymous posting
* Themes: **LOVE, REGRET, FUNNY, STRESS, RANDOM**
* Gradient confession cards
* Real-time confession feed
* Like system
* Edit/delete your own confessions
* Infinite scroll

This module is **fully independent** of main servers and chat features.

---

# 🎨 UI / UX

* Modern, clean, consistent design
* TailwindCSS + Shadcn components
* Animated modals
* Fully responsive layout
* Confession-inspired gradients

---

# 📂 Project Structure

*(unchanged — your original structure retained)*

<details>
<summary><strong>Click to expand Project Structure</strong></summary>

```
[Project Folder Tree Here — unchanged]
```

</details>

---

# 🛠 Tech Stack

## Frontend

* Next.js (App Router)
* TypeScript
* TailwindCSS
* Shadcn/UI
* Axios
* UploadThing
* React Hook Form + Zod

## Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL

## Real-Time

* Socket.io (or Pusher)

## Authentication

* Clerk Authentication (Gmail login)

---

# 📝 License

This project is for **learning and educational use only**.

---
