import NextAuth, { DefaultSession, ISODateString } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface mainWordExpOpts {
    stateFlags: {
      [key: string]: boolean,
      user_main_k_flag: boolean,
      user_main_d_flag: boolean,
      user_main_f_flag: boolean,
      user_main_s_flag: boolean,
    },
    cateFlags: {
      [key: string]: boolean,
      user_main_cs_flag: boolean,
      user_main_web_flag: boolean,
      user_main_ntv_flag: boolean,
    }
  }
  interface Session {
    user: {
      lastLogin?: string | null;
      mainWordExpOpts?: mainWordExpOpts | null;
    } & DefaultSession["user"]
  }
}