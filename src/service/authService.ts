import api from './api';
import {AxiosResponse} from "axios";
// const register = (username, email, password) => {
//   return axios.post(API_URL + 'signup', {
//     username,
//     email,
//     password,
//   });
// };

const users = [
  {
    username: 'l1user1',
    password: 'test',
    token: 'cc16e267-89c7-4d48-8379-4105e90e538e'
  },
  {
    username: 'l2user1',
    password: 'test',
    token: 'cc16e267-89c7-4d48-8379-4105e90e52322cd'
  },
  {
    username: 'l3user1',
    password: 'test',
    token: 'cc16e267-89c7-4d48-8379-4105e90e52322cd'
  }
];

const login = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.username === email);
    if (user) {
      setTimeout(() => {
        resolve({
          message: 'success',
          data: {
            Id: 101,
            Name: user.username,
            Email: 'abc@example.com',
            Token: user.token,
          }
        });
      }, 300);
    } else {
      setTimeout(() => {
        reject({message: 'failed to login'});
      }, 300);
    }
  });
};

const logout = () => {
  localStorage.removeItem('user');
};
export default {
  login,
  logout,
};
