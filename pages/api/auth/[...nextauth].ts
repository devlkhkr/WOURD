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
        console.log("authorize:::", credentials);
        if (credentials?.loginUserId && credentials?.hashedPw) {
          const user = startLogin(
            credentials.loginUserId,
            credentials.hashedPw
          ).then((userInfo: UserDataTypes | undefined | null) => {
            if (userInfo != null) {
              const userSessionData = {
                id: userInfo.id,
                name: userInfo.nickName,
                email: userInfo.id,
                image: userInfo.prfImg,
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
  pages: {
    signIn: "/Login",
  },
  secret: process.env.SECRET,
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      return token;
    },
    async session({ session, userOrToken }: any) {
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

const startLogin = async (
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
      lastLogin: res.data.userInfo.lastLogin,
    } as UserDataTypes;
  } else {
    return null;
  }
};

export default NextAuth(authOptions);
