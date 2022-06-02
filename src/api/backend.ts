import axios from "axios";

const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const companyCount = async () => {
  const response = await backendApi.get("/company/count");
  return response.data;
};

export const companyList = async (params: any) => {
  const response = await backendApi.get("/company", params);
  return response.data;
};

export const findCompanyById = async (id: string) => {
  const response = await backendApi.get(`/company/id/${id}`);
  return response.data;
};

export const findPosts = async (params: any) => {
  const response = await backendApi.get("/post", params);
  return response.data;
};

export const findJobs = async (params: any) => {
  const response = await backendApi.get("/job", params);
  return response.data;
};
