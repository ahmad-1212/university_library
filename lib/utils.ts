import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const emailTemplate = {
  welcomeEmail: (name: string) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to BookWise</title>
    <style>
      html {
        background-color: #1a1c2c !important;
      }
    * {
      color: white;
      }
      body {
        background-color: #1a1c2c !important;
        color: #ffffff;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }

      .email-container {
        background-color: #1a1c2c;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        text-align: left;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      .logo img {
        width: 30px;
        height: 30px;
      }

      hr {
        border: 0;
        border-top: 1px solid #333;
        margin: 20px 0;
      }

      h1 {
        font-size: 22px;
        color: #ffffff;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #cccccc;
      }

      .btn {
        all: unset;
        display: inline-block;
        background-color: #f4c38e !important;
        color: #000000 !important;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      }

      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #cccccc;
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="https://uni-library-management-system.vercel.app/icons/logo.svg"
          alt="BookWise Logo"
        />
        BookWise
      </div>

      <hr />

      <h1>Welcome to BookWise, Your Reading Companion!</h1>

      <p>Hi ${name},</p>

      <p>
        Welcome to BookWise! We're excited to have you join our community of
        book enthusiasts. Explore a wide range of books, borrow with ease, and
        manage your reading journey seamlessly.
      </p>

      <p>Get started by logging in to your account:</p>

      <a
        href="https://uni-library-management-system.vercel.app/sign-in"
        class="btn"
        >Login to BookWise</a
      >

      <div class="footer">
        <p>Happy reading,<br />The BookWise Team</p>
      </div>
    </div>
  </body>
</html>

  `,

  inActiveReminder: (name: string, threeDays: boolean = true) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>We Miss You at BookWise!</title>
    <style>
      html {
        background-color: #1a1c2c !important;
      }
    * {
      color: white;
      }
      body {
        background-color: #1a1c2c !important;
        color: #ffffff;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }

      .email-container {
        background-color: #1a1c2c;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        text-align: left;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      .logo img {
        width: 30px;
        height: 30px;
      }

      hr {
        border: 0;
        border-top: 1px solid #333;
        margin: 20px 0;
      }

      h1 {
        font-size: 22px;
        color: #ffffff;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #cccccc;
      }

      .btn {
        all: unset;
        display: inline-block;
        background-color: #f4c38e !important;
        color: #000000 !important;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      }

      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #cccccc;
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="https://uni-library-management-system.vercel.app/icons/logo.svg"
          alt="BookWise Logo"
        />
        BookWise
      </div>

      <hr />

      <h1>We Miss You at BookWise!</h1>

      <p>Hi ${name},</p>

      <p>
    It’s been a while since we last saw you${
      threeDays ? "—over three days, to be exact!" : "."
    } New books are waiting for you, and your next great read might just be a click away.
      </p>

      <p>Come back and explore now:</p>

      <a
        href="https://uni-library-management-system.vercel.app/"
        class="btn"
        >Login to BookWise</a
      >

      <div class="footer">
        <p>Happy reading,<br />The BookWise Team</p>
      </div>
    </div>
  </body>
</html>

  `,

  borrowedBook: ({
    name,
    borrowDate,
    dueDate,
    bookTitle,
  }: {
    name: string;
    borrowDate: string | Date;
    dueDate: string | Date;
    bookTitle: string;
  }) => `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Book Borrowed Confirmation</title>
    <style>
      html {
        background-color: #1c1c28 !important;
      }
      * {
      color: white;
      }
      body {
        background-color: #1c1c28 !important;
        color: #ffffff;
        font-family: Arial, sans-serif;
        padding: 20px;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      .logo img {
        width: 30px;
        height: 30px;
      }
      .container {
        background-color: #2c2c3c;
        padding: 20px;
        border-radius: 8px;
        max-width: 600px;
        margin: auto;
      }
      h1 {
        color: #ffffff;
      }
      p {
        color: #cccccc;
      }
      .highlight {
        color: #f4c38e;
        font-weight: bold;
      }
      .button {
        all: unset;
        display: inline-block;
        background-color: #f4c38e;
        color: #1c1c28 !important;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 15px;
        cursor: pointer;
      }
      .footer {
        margin-top: 20px;
        color: #aaaaaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img
          src="https://uni-library-management-system.vercel.app/icons/logo.svg"
          alt="BookWise Logo"
        />
        BookWise
      </div>
      <hr style="border: 0; border-top: 1px solid #444" />
      <h2>You've Borrowed a Book!</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        You've successfully borrowed <strong>${bookTitle}</strong>. Here are the
        details:
      </p>
      <ul>
        <li>Borrowed On: <span class="highlight">${borrowDate}</span></li>
        <li>Due Date: <span class="highlight">${dueDate}</span></li>
      </ul>
      <p>Enjoy your reading, and don’t forget to return the book on time!</p>
      <a
        href="https://uni-library-management-system.vercel.app/my-profile"
        class="button"
        >View Borrowed Books</a
      >
      <div class="footer">
        <p>Happy reading,<br />The BookWise Team</p>
      </div>
    </div>
  </body>
</html>


  `,

  bookReminder: ({
    bookTitle,
    name,
    dueDate,
  }: {
    bookTitle: string;
    name: string;
    dueDate: string;
  }) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to BookWise</title>
    <style>
      html {
        background-color: #1a1c2c !important;
      }
    * {
      color: white;
      }
      body {
        background-color: #1a1c2c !important;
        color: #ffffff;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }

      .email-container {
        background-color: #1a1c2c;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        text-align: left;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      .logo img {
        width: 30px;
        height: 30px;
      }

      hr {
        border: 0;
        border-top: 1px solid #333;
        margin: 20px 0;
      }

      h1 {
        font-size: 22px;
        color: #ffffff;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #cccccc;
      }

      .btn {
        all: unset;
        display: inline-block;
        background-color: #f4c38e !important;
        color: #000000 !important;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      }

      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #cccccc;
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="https://uni-library-management-system.vercel.app/icons/logo.svg"
          alt="BookWise Logo"
        />
        BookWise
      </div>

      <hr />

      <h1>Reminder: ${bookTitle} is Due soon!</h1>

      <p>Hi ${name},</p>

      <p>
        Just a reminder that ${bookTitle} is due for return on ${dueDate}.
        Kindly return it on time to avoid late fees.
      </p>

      <p>If you’re still reading, you can renew the book in your account.</p>

      <a
        href="https://university-library-z18n-pi.vercel.app/my-profile"
        class="btn"
        >Renew Book Now</a
      >

      <div class="footer">
        <p>Happy reading,<br />The BookWise Team</p>
      </div>
    </div>
  </body>
</html>

  `,

  userApprove: (name: string) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to BookWise</title>
    <style>
      html {
        background-color: #1a1c2c !important;
      }
    * {
      color: white;
      }
      body {
        background-color: #1a1c2c !important;
        color: #ffffff;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }

      .email-container {
        background-color: #1a1c2c;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        text-align: left;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      .logo img {
        width: 30px;
        height: 30px;
      }

      hr {
        border: 0;
        border-top: 1px solid #333;
        margin: 20px 0;
      }

      h1 {
        font-size: 22px;
        color: #ffffff;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #cccccc;
      }

      .btn {
        all: unset;
        display: inline-block;
        background-color: #f4c38e !important;
        color: #000000 !important;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      }

      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #cccccc;
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="https://uni-library-management-system.vercel.app/icons/logo.svg"
          alt="BookWise Logo"
        />
        BookWise
      </div>

      <hr />

      <h1>Your BookWise Account Has Been Approved!</h1>

      <p>Hi ${name},</p>

      <p>
        Congratulations! Your BookWise account has been approved. You can now
        browse our library, borrow books, and enjoy all the features of your new
        account.
      </p>

      <p>Get started by logging in to your account</p>

      <a
        href="https://uni-library-management-system.vercel.app/sign-in"
        class="btn"
        >Login to BookWise</a
      >

      <div class="footer">
        <p>Happy reading,<br />The BookWise Team</p>
      </div>
    </div>
  </body>
</html>

  `,

  bookReturn: (name: string, bookTitle: string) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thanks For Returning the Book!</title>
    <style>
      html {
        background-color: #1a1c2c !important;
      }
    * {
      color: white;
      }
      body {
        background-color: #1a1c2c !important;
        color: #ffffff;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }

      .email-container {
        background-color: #1a1c2c;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        text-align: left;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }

      .logo img {
        width: 30px;
        height: 30px;
      }

      hr {
        border: 0;
        border-top: 1px solid #333;
        margin: 20px 0;
      }

      h1 {
        font-size: 22px;
        color: #ffffff;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: #cccccc;
      }

      .btn {
        all: unset;
        display: inline-block;
        background-color: #f4c38e !important;
        color: #000000 !important;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      }

      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #cccccc;
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <div class="logo">
        <img
          src="https://uni-library-management-system.vercel.app/icons/logo.svg"
          alt="BookWise Logo"
        />
        BookWise
      </div>

      <hr />

      <h1>Thank you for Returning ${bookTitle}</h1>

      <p>Hi ${name},</p>

      <p>
        We’ve successfully received your return of <strong> ${bookTitle}</strong>. Thank you for returning it on time.
      </p>

      <p>Looking for your next read? Browse our collection and borrow your next favorite book!</p>

      <a
        href="https://university-library-z18n-pi.vercel.app/"
        class="btn"
        >Explore New Books</a
      >

      <div class="footer">
        <p>Happy Exploring,<br />The BookWise Team</p>
      </div>
    </div>
  </body>
</html>

  `,
};

/**
 * Updates the query parameters in the URL.
 * @param params - An array of key-value pairs to set in the query.
 * @param href - The current URL as a string.
 * @returns The updated URL as a string.
 */
export const setUrlQuery = (
  params: { key: string; value: string }[],
  href: string
): string => {
  const url = new URL(href);
  params.forEach((param) => {
    if (param.value) {
      url.searchParams.set(param.key, param.value);
    } else {
      url.searchParams.delete(param.key); // Remove the key if the value is empty
    }
  });
  return url.href;
};

/**
 * Removes specified keys from the query parameters in the URL.
 * @param keys - An array of keys to remove from the query.
 * @param href - The current URL as a string.
 * @returns The updated URL as a string.
 */
export const removeKeysFromQuery = (keys: string[], href: string): string => {
  const url = new URL(href);
  keys.forEach((key) => url.searchParams.delete(key));
  return url.href;
};
