// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../features/store";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000/api/v1",
//   // credentials  for set up cookies to browser from backend
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("authorization", `${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);
//   console.log(result);
//   if (result?.error?.status === 401) {
//     console.log("sending token");
//   }
// const res = fetch('http://localhost:5000/api/v1/auth/refresh-token',{
//   method:'POST',
//   credentials:'include'
// })
// const data = await  res.json()
// const user = (api.getState() as RootState).auth.user ;

// api.dispatch({
//   setUser({
// user,token:data.accessToken
//   })
// })


// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,
//   endpoints: () => ({}),
// });
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      const refreshTokenResponse = await fetch(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!refreshTokenResponse.ok) {
        // Handle refresh token failure
        throw new Error("Refresh token failed");
      }

      const data = await refreshTokenResponse.json();
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        // Assuming you have a setUser action creator in your code
        setUser({
          user,
          token: data.accessToken,
        })
      );

      // Retry the original request with the new token
      return baseQuery(args, api, extraOptions);
    }

    return result;
  } catch (error) {
    // Handle errors during token refresh or original request
    console.error("Error during API request:", error);
    throw error;
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
