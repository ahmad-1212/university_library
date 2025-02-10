# University Library Management System

### [LIVE SITE](https://uni-library-management-system.vercel.app/sign-in)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### User Features

- Student Signup & Approval
- Email Confirmation
- Borrowing Books with Email Notifications
- Returning Books with Confirmation Email
- Due Date Reminder Emails
- Inactivity Reminder Emails

### Admin Features

- Dashboard Access
- User Management (Approve & Manage Students)
- Book Management (Add, Update, Remove Books)
- Borrow & Return Logs

## Tech Stack

This project utilizes the following technologies:

- **Framework**: [Next.js](https://nextjs.org/) (15.1.5)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [React Hook Form](https://react-hook-form.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Email Service**: [Mailjet](https://mailjet.com/)
- **Workflow Management**: [Upstash Workflow](https://upstash.com/)
- **Rate Limiting**: [Upstash Ratelimit](https://upstash.com/)
- **Caching & Queuing**: [Upstash Redis](https://upstash.com/)
- **Image Storage**: [ImageKit](https://imagekit.io/)

## Installation & Setup

### Prerequisites

- Node.js (>= 18.0.0)
- PostgreSQL (or a cloud-hosted database)
- Upstash account for Redis & Workflow
- Mailjet API Key for email services
- ImageKit account for image storage

### Steps to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/university-library.git
   cd university-library
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables: Create a `.env.local` file and configure the following:
   ```env
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT= your imagekit url endpoint
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY= your imagekit public key
   IMAGEKIT_PRIVATE_KEY= your imagekit private key
   NEXT_PUBLIC_API_ENDPOINT= your localhost endpoint
   NEXT_PUBLIC_PROD_API_ENDPOINT= your app production api endpoint
   DATABASE_URL= database url
   AUTH_SECRET= nextauth secret
   UPSTASH_REDIS_URL= your upstash redis url
   UPSTASH_REDIS_TOKEN= your upstash redis token
   QSTASH_URL= your qstash url
   QSTASH_TOKEN= your qstash token
   MAILJET_API_KEY= your mailjet api key
   MAILJET_SECRET_KEY= your mailjet secret key
   ```
4. Run database migrations:
   ```sh
   npm run db:migrate
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Drizzle ORM](https://orm.drizzle.team/) - Learn about the database ORM used in this project.
- [NextAuth.js](https://next-auth.js.org/) - Learn about authentication in Next.js.
- [Tailwind CSS](https://tailwindcss.com/) - Learn about styling with Tailwind.
- [ImageKit Documentation](https://imagekit.io/docs) - Learn about image optimization and storage.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact

For any queries or support, reach out via [ahmadali.swat333@gmail.com](mailto:ahmadali.swat333@gmail.com).
