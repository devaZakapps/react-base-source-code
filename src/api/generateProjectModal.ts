
import { GenerateProjectReq } from "../type/data/generateProject";
import { redirectToPage } from "../utils/utils";
import axiosInstance from "./axiosInstance";


export const getProjectDetailsApi = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(
      `/ui-library/api/project/${projectId}`,

    );

    // const responseData= response.data; // Adjust based on actual API response

    console.log("inside getProjectDetailsApi: ", response)
   
    return response;

  } catch (error) {
    console.error('Error getProjectDetailsApi:', error);
    if(error){
      if(error.status ==403){
      redirectToPage('/login', false);
      }
    }
    
    throw error;
  }
};

export const generateProjectApi = async (payload: GenerateProjectReq) => {
  try {
    const response = await axiosInstance.post(
      '/ui-library/api/project',
      payload, {
      responseType: 'arraybuffer', // Handle both binary and JSON responses
    }
    );
    console.log("generateProjectApi - response:  ", response)


    return response
  } catch (error) {
    console.error('Error generateProjectApi:', error);
    throw error;
  }
};

export const getProjectsByUserApi = async (email: string) => {
  try {
    const response = await axiosInstance.get(
      `/ui-library/api/projects/${email}`
    );
    console.log("generateProjectApi - response:  ", response)

    return response
  } catch (error) {
    console.error('Error getProjectsByUserApi:', error);
    throw error;
  }
};



