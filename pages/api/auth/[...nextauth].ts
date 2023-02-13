import axios from "axios";
import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Hash from "pages/components/atoms/Hash";
export interface UserDataTypes {
  id: string;
  nickName: string;
  prfImg: string;
  mainWordExpOpts: object;
  lastLogin: Date | string;
}

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
                name: "",
                email: userInfo.id,
                image: "",
                mainWordExpOpts: {},
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
    secret: "nextauthjwtsecret",
  },
  pages: {
    signIn: "/Login",
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user, account }: any) {
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
        token.accessToken = account.access_token;
        token.lastLogin = account.lastLogin;
        token.mainWordExpOpts = account.mainWordExpOpts;
      }
      return token;
    },
    async session({ session, token }: any) {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_ORIGIN + "/api/user/info",
        {
          email: session.user.email,
        }
      );
      session.user.image = res.data.userInfo.prfImg;
      session.user.name = res.data.userInfo.nickName;
      session.user.mainWordExpOpts = res.data.userInfo.mainWordExpOpts;
      session.user.lastLogin = token.lastLogin;

      session.accessToken = token.accessToken;

      return session;
    },
  },
};

const insertLoginData = async (userId: string) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_ORIGIN + "/api/user/log/history",
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
  const res = await axios.post(
    process.env.NEXT_PUBLIC_ORIGIN + "/api/user/log/in",
    {
      loginUserData: {
        id: userId,
        pw: hashedPw,
      },
    }
  );
  if (res.data.loginFlag === true) {
    console.log("Login Successfully");
    insertLoginData(res.data.userInfo.id);
    return {
      id: res.data.userInfo.id,
      nickName: "",
      prfImg: "",
      mainWordExpOpts: {},
      lastLogin: res.data.userInfo.lastLogin,
    } as UserDataTypes;
  } else {
    return null;
  }
};

export default NextAuth(authOptions);
