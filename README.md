# FightHub

An application intented to act as a bridge between combat sport athletes and tournaments

## Overview

FightHub Platform provides a comprehensive solution for combat sports enthusiasts, offering features tailored to meet the unique needs of athletes.

## Key Features

- **User-friendly Profiles:**
  - Create and manage a personalized athlete profile.
  - Maintain a detailed record of their combat sports journey.
  - Showcase achievements
  - Access statistics and insights from past events performance

- **Event Registration:**
  - Seamlessly register for upcoming championships and events.
  - Explore and register for upcoming championships and events.
  - Stay informed about event details, schedules, and locations.


## Build with

[![My Skills](https://skillicons.dev/icons?i=,mongo,express,angular,nodejs)](https://skillicons.dev)

## Prerequisites

Before you begin working with this Angular project, ensure that you have the following software installed globally on your machine:

1. **Node.js and npm:**
   - Download and install Node.js and npm from the official website: [Node.js Downloads](https://nodejs.org/).
   - Verify the installation by running the following commands in your terminal or command prompt:
     ```bash
     node -v
     npm -v
     ```

2. **Angular CLI:**
   - Install the Angular CLI globally using npm by running the following command:
     ```bash
     npm install -g @angular/cli
     ```
   - Verify the installation by checking the Angular CLI version:
     ```bash
     ng --version
     ```
## Setup
Once you have installed the prerequisites, follow these steps to set up your development environment:
1. **Clone this repository to your local machine:**
   ```bash
   git clone https://github.com/VasilisMoutz/fight-hub-frontend.git
   
2. **Navigate to the project directory:**
   ```bash
   cd fight-hub-frontend

3. **Optional: Backend configuration**

   The application is currently connected to a deployed backend. If you wish to use the backend locally, follow these steps:

  - Find the backend source code at [FightHub Backend](https://github.com/VasilisMoutz/fight-hub-backend).

  - Set up and run the backend on your local machine by following the instructions provided in the backend repository.

  - **Navigate to the `src/environments` directory.**

  - **Open the `environment.ts` file.**
    
  - Update the `api` configuration to point to your desired server URL:

    ```typescript
    export const environment = {
      production: false,
      api: {
        url: 'http://localhost:5000/', // Your custom server URL
      },
    };

3. **Install project dependencies:**
   ```bash
   npm install

4. **Start the development server:**
   ```bash
   ng serve

## Usage

For complete user experience logging in is required. You are welcome to create your own account. Alternatively, you can use the following dummy account details:

- **Email:** test@gmail.com
- **Password:** abcABC1!

## Routes

- **Home:**
  - `/home`

- **New Events:**
  - `/explore`

- **Event Details:**
  - `/details/:id`

- **Event Registration Status:**
  - `/register-status/:status`

- **Login:**
  - `/login`

- **User Registration:**
  - `/register`

- **User Profile:**
  - `/profile`
    - `/profile/record`
    - `/profile/fights`

