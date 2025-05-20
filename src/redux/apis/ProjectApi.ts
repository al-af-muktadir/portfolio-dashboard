import { baseApi } from "./baseApi/BaseApi";

export const ProjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getSingleProjects: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    createProjects: builder.mutation({
      query: (projects) => ({
        url: `/projects`,
        method: "POST",
        body: projects,
      }),
      invalidatesTags: ["projects"],
    }),
    deleteProjects: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
    updateProjects: builder.mutation({
      query: ({ id, project }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetSingleProjectsQuery,
  useCreateProjectsMutation,
  useDeleteProjectsMutation,
  useUpdateProjectsMutation,
} = ProjectApi;
