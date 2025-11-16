# 🌐 *Unisphere — Full-Stack Real-Time Community Platform*

Unisphere is a modern full-stack platform designed for community interaction, real-time chat, media sharing, and private or group communication.
It also includes an additional *Confessions module* for anonymous posts within communities.

Unisphere was built with the goal of providing *clubs, student groups, and communities* a place to:

* Interact with each other
* Create their own spaces
* Have structured conversations via channels
* Share updates, files, and announcements
* Coordinate events and activities
* Communicate instantly in organized groups

---

## 🚀 *Tech Stack*

### *Frontend*

* Next.js (App Router)
* TypeScript
* TailwindCSS
* Shadcn/UI
* Axios
* UploadThing
* React Hook Form + Zod

### *Backend*

* Next.js API Routes
* Prisma ORM
* PostgreSQL

### *Real-Time*

* Socket.io (or Pusher)

### *Authentication*

* Clerk Authentication (Gmail Login Enabled)

---

# ✨ *Core Features*

## 🔐 Authentication

* Gmail login
* Protected routes
* Profile management
* Server & channel access control

---

## 🗂 *Servers*

The *server system* was added specifically so that *clubs and student communities can have their own dedicated spaces*.

Clubs can:

* Create private or public servers
* Customize server icons & names
* Invite new members
* Set roles (Admin, Member, Guest, etc.)
* Use role-based permissions to manage access

This structure enables *organized communication for each club or team*.

---

## 📺 *Channels*

Channels allow for *topic-based discussion*, making it easy for club members to stay structured:

* Announcement channels
* Event planning channels
* Technical discussion channels
* General chat channels
* Text, audio, and video support

This helps prevent clutter and keeps conversations focused.

---

## 💬 *Messaging*

* Real-time text chat
* Image & file uploads
* Edit and delete messages
* Infinite scroll with pagination
* Optional typing indicators

Ideal for club coordination, updates, and team discussions.

---

## 👥 *Friends / DM*

* Direct messaging between members
* Real-time updates
* Shared media support

Useful for one-on-one communication outside group spaces.

---

## 🎧 *LiveKit (Optional)*

* Voice rooms
* Video chat

Helps clubs host *meetings, discussions, online events, or virtual study sessions*.

---

# 🗣 *Confessions (Additional Feature)*

A fun extra module inside Unisphere that allows users to post anonymous confessions.

### Confession Features:

* Submit *anonymous confessions*
* Choose themes: LOVE, REGRET, FUNNY, STRESS, RANDOM
* Gradient-themed cards
* Real-time confession feed
* Like confessions
* Edit/delete your own posts
* Infinite scroll / pagination

This module is independent and does not affect the main communication system.

---

# 🎨 *UI / UX*

* Clean Unisphere-style interface
* Animated modals via Shadcn
* Responsive layout
* Unified design with confession-style gradients

---

# 📂 *Project Structure*

<details>
<summary><strong>Click to expand Project Structure</strong></summary>

<pre><code>
src/
├── app
│   ├── api
│   │   ├── channels
│   │   │   ├── [channelId]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── confessions
│   │   │   └── route.ts
│   │   ├── members
│   │   │   └── [memberId]
│   │   │       └── route.ts
│   │   ├── messages
│   │   │   └── route.ts
│   │   ├── servers
│   │   │   ├── route.ts
│   │   │   └── [serverId]
│   │   │       ├── invite-code
│   │   │       │   └── route.ts
│   │   │       ├── leave
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── socket
│   │   │   └── messages
│   │   │       ├── [messageId]
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   └── uploadthing
│   │       ├── core.ts
│   │       └── route.ts
│   ├── (auth)
│   │   └── (routes)
│   │       ├── layout.tsx
│   │       └── sign-in
│   │           └── [[...sign-in]]
│   │               └── page.tsx
│   ├── favicon.ico
│   ├── generated
│   │   └── prisma
│   │       ├── browser.ts
│   │       ├── client.ts
│   │       ├── commonInputTypes.ts
│   │       ├── enums.ts
│   │       ├── internal
│   │       │   ├── class.ts
│   │       │   ├── prismaNamespaceBrowser.ts
│   │       │   └── prismaNamespace.ts
│   │       ├── libquery_engine-debian-openssl-3.0.x.so.node
│   │       ├── models
│   │       │   ├── Channel.ts
│   │       │   ├── Confession.ts
│   │       │   ├── Conversation.ts
│   │       │   ├── DirectMessage.ts
│   │       │   ├── Member.ts
│   │       │   ├── Message.ts
│   │       │   ├── Profile.ts
│   │       │   └── Server.ts
│   │       └── models.ts
│   ├── globals.css
│   ├── (invite)
│   │   └── (routes)
│   │       └── invite
│   │           └── [inviteCode]
│   │               └── page.tsx
│   ├── layout.tsx
│   ├── (main)
│   │   ├── layout.tsx
│   │   └── (routes)
│   │       ├── confessions
│   │       │   ├── layout.tsx
│   │       │   └── page.tsx
│   │       └── servers
│   │           └── [serverId]
│   │               ├── channels
│   │               │   └── [channelId]
│   │               │       └── page.tsx
│   │               ├── conversations
│   │               │   └── [memberId]
│   │               │       └── page.tsx
│   │               ├── layout.tsx
│   │               └── page.tsx
│   └── (setup)
│       └── page.tsx
├── components
│   ├── action-tooltip.tsx
│   ├── chat
│   │   ├── chat-header.tsx
│   │   ├── chat-input.tsx
│   │   ├── chat-item.tsx
│   │   ├── chat-messages.tsx
│   │   └── chat-welcome.tsx
│   ├── confessions
│   │   ├── AddConfessionModal.tsx
│   │   ├── ConfessionCard.module.css
│   │   ├── ConfessionCard.tsx
│   │   ├── ConfessionCollage.tsx
│   │   ├── ConfessionModal.tsx
│   │   ├── ConfessionsPageClient.tsx
│   │   ├── HeroSection.tsx
│   │   └── Toast.tsx
│   ├── emoji-picker.tsx
│   ├── file-upload.tsx
│   ├── mobile-toggle.tsx
│   ├── modals
│   │   ├── create-channel-modal.tsx
│   │   ├── create-server-modal.tsx
│   │   ├── delete-channel-modal.tsx
│   │   ├── delete-message-modal.tsx
│   │   ├── delete-server-modal.tsx
│   │   ├── edit-channel-modal.tsx
│   │   ├── edit-server-modal.tsx
│   │   ├── initial-modal.tsx
│   │   ├── invite-modal.tsx
│   │   ├── leave-server-modal.tsx
│   │   ├── members-modal.tsx
│   │   └── message-file-modal.tsx
│   ├── mode-toggle.tsx
│   ├── navigation
│   │   ├── navigation-action.tsx
│   │   ├── navigation-confessions-button.tsx
│   │   ├── navigation-item.tsx
│   │   └── navigation-sidebar.tsx
│   ├── providers
│   │   ├── modal-provider.tsx
│   │   ├── query-provider.tsx
│   │   ├── socket-provider.tsx
│   │   └── theme-provider.tsx
│   ├── server
│   │   ├── server-channel.tsx
│   │   ├── server-header.tsx
│   │   ├── server-member.tsx
│   │   ├── server-search.tsx
│   │   ├── server-section.tsx
│   │   └── server-sidebar.tsx
│   ├── socket-indicator.tsx
│   ├── ui
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── tooltip.tsx
│   └── user-avatar.tsx
├── hooks
│   ├── use-chat-query.ts
│   ├── use-chat-socket.ts
│   ├── use-modal-store.ts
│   └── use-origin.ts
├── lib
│   ├── conversation.ts
│   ├── current-profile.ts
│   ├── db.ts
│   ├── initial-profile.ts
│   ├── socket.ts
│   ├── themes.ts
│   ├── uploadthing.ts
│   └── utils.ts
├── proxy.ts
└── types
    └── types.ts
</code></pre>

</details>


---

# 📝 *License*

This project is for *learning and educational use only*.

