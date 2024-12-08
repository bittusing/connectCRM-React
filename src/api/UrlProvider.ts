// export const TEST_URL = "http://13.49.49.9:3000/api";
// export const LIVE_URL = "http://13.49.49.9:3000/api";
// export const TEST_URL = "http://localhost:9000/api";
// export const LIVE_URL = "http://localhost:9000/api";

import { EndPointType } from "../types/UrlProvider";

// UrlProvider.ts
declare global {
  interface ImportMetaEnv {
    VITE_API_URL: string;
  }
}
const env = import.meta.env;
console.log({ env });

export const BASE_URL: string = env.VITE_API_URL;

export const END_POINT: EndPointType = {
  LOGIN: "signin",
  SIGNUP: "register",
  USER_REGISTER: "register/users-register",
  Funnel: "survey",
  Crefunel: "survey",
  SubscrPlane: "v1/subscription",
  Faq: "faq",
  PolicyQ: "policy",
  PolicyA: "policy/all",
  Policyf: "policy",
  planget: "subscription",
  Notifi: "notification",
  Notifiborad: "notification/broadcast",
  UserapiAl: "users/user",
  Userme: "v1/users/me",
  Userapi: "users",
  UserapiA: "users/admin",
  UserapiS: "users/support",
  Rsetpas: "users/set-password",
  Videoapi: "admin-content",
  Tages: "tag",
  Setintags: "tag-setting",
  UserPost: "user-post",
  Permission: "permission",
  feature: "feature",
} as const;
