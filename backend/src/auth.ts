// src/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db(); // uses default db from URI

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000"],
  database: mongodbAdapter(db),

  baseURL: process.env.BETTER_AUTH_URL!, // e.g. http://localhost:5000

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  // Optional: customize session behavior
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache for 5 minutes
    },
  },
});


/* 
needed this advanced setting if both are in differnt domains
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true, // recommended for modern browsers
    },
  },
  // ...
});
*/

/* 
needed this advanced setting if using sun-domains like app.com and api.app.com
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "myapp.com", // root domain
    },
  },
});

*/

