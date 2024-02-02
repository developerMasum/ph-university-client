import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
        // body: userInfo,
      }),
    }),
  }),
});
export const {useGetAllSemesterQuery} = academicSemesterApi
