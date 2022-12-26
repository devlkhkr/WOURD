import axios from "axios";
import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Hash from "pages/components/atoms/Hash";
import { UserDataTypes } from "redux/slices/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "user@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials?.loginUserId && credentials?.hashedPw) {
          const user = startAuthorize(
            credentials.loginUserId,
            credentials.hashedPw
          ).then((userInfo: UserDataTypes | undefined | null) => {
            if (userInfo != null) {
              const userSessionData = {
                id: userInfo.id,
                name: userInfo.nickName,
                email: userInfo.id,
                image: userInfo.prfImg,
                mainWordExpOpts: userInfo.mainWordExpOpts,
                lastLogin: userInfo.lastLogin,
              };
              return userSessionData;
            } else {
              return null;
            }
            // Any object returned will be saved in `user` property of the JWT
          });
          return user;
          // Any object returned will be saved in `user` property of the JWT
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 6 * 60 * 60, // 6 hours
    updateAge: 1 * 60 * 60, // 1 hours
  },
  jwt: {
    maxAge: 6 * 60 * 60, // 6 hours
    secret: "asdfasdf",
  },
  pages: {
    signIn: "/Login",
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user, account }: any) {
      console.log("account::::", account);
      account.lastLogin = user.lastLogin;
      account.mainWordExpOpts = user.mainWordExpOpts;
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account }: any) {
      if (account) {
        console.log("account:::", account);
        console.log("token:::", token);
        token.accessToken = account.access_token;
        token.lastLogin = account.lastLogin;
        token.mainWordExpOpts = account.mainWordExpOpts;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user.lastLogin = token.lastLogin;
      session.user.mainWordExpOpts = token.mainWordExpOpts;

      return session;
    },
  },
};

const insertLoginData = async (userId: string) => {
  const res = await axios.post(
    "http://localhost:3000" + "/api/user/log/history",
    {
      loginUserData: {
        logUserId: userId,
        logAction: 1,
      },
    }
  );
  let logInsertResult = res.data.affectedRows === 1 ? "true" : "false";
  console.log(`로그인 기록 Insert : ${logInsertResult}`);
};

const startAuthorize = async (
  userId: string | undefined,
  hashedPw: string | boolean
) => {
  const res = await axios.post("http://localhost:3000" + "/api/user/log/in", {
    loginUserData: {
      id: userId,
      pw: hashedPw,
    },
  });
  if (res.data.loginFlag === true) {
    console.log("Login Successfully");
    insertLoginData(res.data.userInfo.id);
    return {
      id: res.data.userInfo.id,
      nickName: res.data.userInfo.nickName,
      prfImg: res.data.userInfo.prfImg,
      mainWordExpOpts: res.data.userInfo.mainWordExpOpts,
      lastLogin: res.data.userInfo.lastLogin,
    } as UserDataTypes;
  } else {
    return null;
  }
};

export default NextAuth(authOptions);
