import { axiosInstance } from '../lib/axios';

export const signup = async (signUpData) => {
        const res = await axiosInstance.post('/auth/signup', signUpData);
        return res.data;
}

export const getauthuser = async ()=>{
      try{
            const res = await axiosInstance.get('auth/protected', {withCredentials:true})
            return res.data;
      }
      catch(err){
            console.log(err);
            return null;
      }
}
export const onboardingUser = async (onboardingData) => {
      const res = await axiosInstance.post('/auth/onboarding', onboardingData, {withCredentials:true});
      console.log(res.data);
      return res.data;
}
export const loginUser = async (loginData) => {
      const res = await axiosInstance.post('/auth/login', loginData);
      return res.data;
}
export const logout = async () => {
      const res = await axiosInstance.post('/auth/logout');
      // return res.data;
}
export const getUserfriends = async () => {
      const res = await axiosInstance.get('/users/friends');
      return res.data;
}
export const getRecUser = async () => {
      const res = await axiosInstance.get('/users');
      return res.data;
}
export const outgoingFriendReqs = async () => {
      const res = await axiosInstance.get('/users/outgoing-friend-requests');
      return res.data;
}
export const sendFriendReq = async (userId) => {
      const res = await axiosInstance.post(`/users/friend-request/${userId}`);
      return res.data;
}
export const getNotifications = async () => {
      const res = await axiosInstance.get('/users/friend-requests');
      return res.data;
}
export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-requests/${requestId}/accept`);
  return response.data;
}
export async function getStreamtoken() {
  const response = await axiosInstance.get('/chats/token');
  return response.data;
}            
