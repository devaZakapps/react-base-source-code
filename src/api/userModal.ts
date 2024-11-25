import axiosInstance from './axiosInstance';
import { ApiResponse } from '../type/common';
import { userLoginRequest, UserProfileResponse } from '../type/data/user';

export const userLogin = async (payload: userLoginRequest) => {
  try {
    const response = await axiosInstance.post(
      '/ui-library/api/login',
      payload
    );
    
    return response
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserProfile = async (email: string) => {
  try {
    const response = await axiosInstance.get<ApiResponse<UserProfileResponse[]>>(
      `/ui-library/api/user/${email}`
    );

    return response.data; // TypeScript knows this is of type ApiResponse<User[]>
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};



