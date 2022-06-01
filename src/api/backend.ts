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
