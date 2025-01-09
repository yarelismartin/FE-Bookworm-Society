<div style="text-align:center">
    
![logo](https://github.com/yarelismartin/FE-Bookworm-Society/blob/5e8b8f38fc12be70590c4e83fe6bd0fdb15eb349/public/images/Blue%20Book%20Club%20Logo.png)


</div>

## Get Started 

Clone this repo and submit the following command: 

npm install

npm run prepare

Set up environment variables. Create a .env.local file at the root of the project and add the following:
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key_here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain_here"
NEXT_PUBLIC_DATABASE_URL="http://localhost:7087"  # Adjust this as necessary

npm run dev



## Topics 
- [What is Bookworm Society ?](#what-is-bookworm-society-)
- [Who is the user ?](#who-is-the-user-)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backedend](#backend)
- [Contributors](#contributors)
___

## What is Bookworm Society ?
**Bookworm** is a book club management platform where users can join clubs, vote on books to read, participate in discussions, and track their reading history. This repository contains the frontend code for the Bookworm platform, built with **Next.js** and **React**.


## Who is the user ?
- **Book Club Enthusiasts**: Individuals who enjoy reading and discussing books with others. These users can join or create book clubs, participate in voting sessions, and engage in discussions with other members.
- **Club Hosts**: Users who create and manage book clubs. They have administrative control, such as approving or rejecting join requests, setting up voting sessions, and moderating discussions.
- **Readers**: Users who are primarily interested in tracking their reading journey. They can follow along with book clubs, participate in voting, and add books to their personal reading list.

## Features
- A users can create, read, and edit their profile.
- A user can create, read, edit, delete their post.
- A user can create and delete their comments and reviews. 
- A user can message other users through the profile detail page for each user card. 
- A user can search on the Disocver page by name, location, skill and learning preference.
- A user can filter posts by navigating through the menu on the Community page. 

## Tech Stack
- [date-fns](https://date-fns.org/)
- React.js
- Next.js
- React Bootstrap
- CSS
- Tailwind
- DaisyUI
- Firebase
- **Backend**: The backend of this application is built with Node.js

## Backend
Make sure to check the backend documentation for setup and configuration instructions.
[Bookworm Society Backend](https://github.com/yarelismartin/Bookworm-Society-BE)


## Contributors
- [Yarelis Martin](https://github.com/your-github-url)
