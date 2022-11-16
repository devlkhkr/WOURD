import axios from "axios";
import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Hash from "pages/components/atoms/Hash";
import { UserDataTypes } from "redux/slices/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "user@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials?.username && credentials?.password) {
          const user = Hash.makePasswordHashed(
            credentials.username,
            credentials.password
          ).then((hashedPw: string | boolean) => {
            return startLogin(credentials.username, hashedPw).then(
              (userInfo: UserDataTypes | undefined | null) => {
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
              }
            );
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
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      return token;
    },
    async session({ session, userOrToken }: any) {
      return session;
    },
  },
};

const startLogin = async (
  userId: string | undefined,
  hashedPw: string | boolean
) => {
  if (hashedPw) {
    const res = await axios.post("http://localhost:3000" + "/api/user/log/in", {
      loginUserData: {
        id: userId,
        pw: hashedPw,
      },
    });
    if (res.data.loginFlag === true) {
      return {
        id: res.data.userInfo.id,
        nickName: res.data.userInfo.nickName,
        prfImg: res.data.userInfo.prfImg,
        lastLogin: res.data.userInfo.lastLogin,
      } as UserDataTypes;
      // insertLoginData(loginUserId);
      // setIsTokenLive(res.data.loginFlag);
    } else {
      return null;
    }
  }
};

export default NextAuth(authOptions);
