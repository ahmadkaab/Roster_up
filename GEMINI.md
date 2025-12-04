# Gemini Context: RosterUp Project

This document provides a comprehensive overview of the RosterUp project, its structure, and key operational commands, intended to be used as a persistent context for the Gemini assistant.

## Project Overview

RosterUp is a full-stack application designed for sports and esports recruitment. It consists of a mobile application for players and teams, and a corresponding web application. The platform facilitates the matching of players looking for teams with teams looking for players.

### Core Technologies

*   **Mobile App**: React Native with [Expo](https://expo.dev/).
*   **Web App**: [Next.js](https://nextjs.org/).
*   **Language**: TypeScript.
*   **Backend & Database**: [Supabase](https://supabase.com/).
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (used via `nativewind` for mobile and standard PostCSS for web).
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand).
*   **Data Fetching/Caching**: [TanStack Query](https://tanstack.com/query/latest) (React Query).
*   **UI Components (Web)**: Radix UI.

### Architecture

The project is structured as a monorepo:

*   The root directory contains the Expo mobile application.
*   The `rosterup-web/` directory contains the Next.js web application.

Both applications share a similar technology stack and connect to the same Supabase backend for data consistency.

### Key Features (from `TESTING.md`)

*   **Dual User Roles**: Users can sign up as a "Player" or a "Team".
*   **Player Profiles**: Players can create and manage their "Player Card" to showcase their skills.
*   **Team Recruitment**: Teams can create profiles, post recruitment listings for specific roles, and manage incoming applications.
*   **Application System**: Players can browse and apply for team tryouts. Teams can review applications and update their status (e.g., Shortlist, Reject).

---

## Getting Started

### 1. Initial Setup

Install dependencies for both the mobile and web applications.

```bash
# Install dependencies for the mobile app (from root)
npm install

# Install dependencies for the web app
cd rosterup-web
npm install
cd ..
```

### 2. Environment Variables

The project requires Supabase credentials. Create a `.env` file in the root directory and populate it with the following keys. A similar file may be needed for `rosterup-web`.

```
EXPO_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## Running the Application

### Mobile App (Expo)

Use the following commands from the root directory:

```bash
# Start the Metro bundler and see options for Android, iOS, and web
npx expo start

# Start directly on an Android emulator
npm run android

# Start directly on an iOS simulator
npm run ios
```

### Web App (Next.js)

Navigate to the `rosterup-web` directory and run:

```bash
cd rosterup-web
npm run dev
```
The web app will be available at `http://localhost:3000`.

---

## Building the Project

### Android (Production)

The mobile app uses [Expo Application Services (EAS)](https.docs.expo.dev/build/introduction/) for builds.

1.  **Configure EAS**:
    ```bash
    eas build:configure
    ```
2.  **Run Build**:
    *   For a preview build (`.apk`):
        ```bash
        eas build -p android --profile preview
        ```
    *   For a production build for the Play Store (`.aab`):
        ```bash
        eas build -p android --profile production
        ```

### Web (Production)

Navigate to the `rosterup-web` directory and run:

```bash
cd rosterup-web
npm run build
```

---

## Testing

A manual testing guide is available in `TESTING.md`. It outlines test cases for core functionality like authentication, player actions, and team actions.

For linting, run the following commands from their respective directories:

```bash
# From root directory for the mobile app
npm run lint

# From rosterup-web for the web app
npm run lint
```
