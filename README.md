# Finance Manager

This is a simple app to manage your finances. You can create new transactions, add descriptions for them, and delete transactions.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (in the root of the project)

`DATABASE_URL` - A link to a PostgreSQL database (looks something like `postgres://`)

`CLIENT_ID`

`CLIENT_SECRET`

You can generate an OAuth2.0 Client ID and Client Secret from the Google Cloud Console.

## Features

- Add transactions.
- Delete transactions.
- Maintain a running total of what you have spent.
- Light/dark mode toggle (light mode for those who want to burn their eyes)

## Tech Stack

- **Next.js** for the main frontend
- **Next-Auth** to handle Google OAuth
- **Prisma** to interact with the database
- **Chakra UI** for styling
- **PostgreSQL** as the main database (You can get a free fully managed PostgreSQL Database from Supabase)
- **Vercel** as the hosting provider.

## Screenshots

![App Screenshot](https://i.imgur.com/B9JO1ve.png)

![App Screenshot Not Stonks](https://i.imgur.com/14Go0DP.png)

![I Hate My Eyes](https://i.imgur.com/Xkqdp3K.png)
