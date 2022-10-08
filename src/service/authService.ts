import api from './api';
import axios, {Axios, AxiosResponse} from "axios";

// const register = (username, email, password) => {
//   return axios.post(API_URL + 'signup', {
//     username,
//     email,
//     password,
//   });
// };

const users = [
  {
    username: 'user1',
    password: 'test',
    token: 'cc16e267-89c7-4d48-8379-4105e90e538e'
  }
];

const login = async (email: string, password: string) => {
    const user = await api.post('/admin/login', {email, password})
      .then((result)=> {
          return result;
      }).catch((error)=> {
        return error.response.data;
      })
    return user;  
}
// const login = (email: string, password: string) => {
//   return new Promise((resolve, reject) => {
//     const user = users.find(user => user.username === email);
//     if (user) {
//       setTimeout(() => {
//         resolve({
//           message: 'success',
//           data: {
//             Id: 101,
//             Name: user.username,
//             Email: 'abc@example.com',
//             Token: user.token,
//           }
//         });
//       }, 300);
//     } else {
//       setTimeout(() => {
//         reject({message: 'failed to login'});
//       }, 300);
//     }
//   });
// };

const logout = () => {
  localStorage.removeItem('user');
};
export default {
  login,
  logout,
};
