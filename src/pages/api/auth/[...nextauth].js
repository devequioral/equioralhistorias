import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

async function getUser(value, filterBy) {
  const url = `${process.env.VIRTEL_DASHBOARD_URL}6d498a2a94a3/quoter/users?filterBy=${filterBy}&filterValue=${value}&filterOperator=eq`;
  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${process.env.VIRTEL_DASHBOARD_API_KEY}`,
      },
    });

    const user =
      (response.data && response.data.length > 0 && response.data[0]) || null;
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
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await fetchUser(credentials.username);
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.userType === 'admin',
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
