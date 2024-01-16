import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { consoleError } from '@/utils/error';

async function getUser(value, filterBy) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/users?filterBy=${filterBy}&filterValue=${value}`;
  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
    });

    const user =
      (response.data &&
        response.data.records &&
        response.data.records.length > 0 &&
        response.data.records[0]) ||
      null;

    return user;
  } catch (error) {
    //console.error(error);
    return null;
  }
}

async function fetchUser(username) {
  //DETERMINE IF USERNAME IS AN EMAIL WITH REGEX
  const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.)[a-zA-Z0-9_-]+$/;
  const filterBy = isEmail.test(username) ? 'email' : 'username';
  const user = await getUser(username, filterBy);

  if (!user) {
    throw new Error('User not found');
  }
  // You can now use the user object
  return user;
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      if (user?.name) token.name = user.name;
      if (user?.username) token.username = user.username;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.role) session.user.role = token.role;
      if (token?.name) session.name = token.name;
      if (token?.username) session.username = token.username;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await fetchUser(credentials.username);
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
