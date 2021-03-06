import axios from 'axios';
import {setAuthStorage} from '../config/Storage';
import httpClient from './HttpClient';

class UserController {
  constructor() {
    // this.basePath = '/login_mobile';
    this.basePath = 'http://34.87.121.155:8181/apiwebpbi/api';
  }

  login = async (email, password, token_firebase) => {
    console.log('token firebase yg akan dikirim', token_firebase);
    try {
      const result = await httpClient.request({
        url: '/login_mobile',
        method: 'POST',
        data: {
          email,
          password,
          token: '',
          device: 'ios',
          mac: 'mac',
          token_firebase: token_firebase,
        },
      });
      // alert(result.Pesan);
      console.log('vardums result -->', result);
      // ini ada isreset dalemnya, sementara dihilangin, buat biar ga nyangkut insert token firebase
      if (result.Error) {
        return Promise.reject(result.Pesan);
      } else {
        return result;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  resetPassword = async (conPass, newPass, email) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/Resetpass`,

        method: 'POST',
        data: {
          conpass: conPass,
          newpass: newPass,
          email: email,
        },
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  logout = () => {
    try {
      //  const result = await httpClient.request({
      //    url: '/login_mobile',
      //    method: 'POST',
      //    data: {
      //      email,
      //      password,
      //      token: '',
      //      device: 'ios',
      //      mac: 'mac',
      //      token_firebase,
      //    },
      //  });
      //  // alert(result.Pesan);

      //  if (result.Error) {
      //    return Promise.reject(result.Pesan);
      //  } else {
      //    return result;
      //  }
      console.log('logout');
    } catch (error) {
      return Promise.reject(error);
    }
  };

  saveProfile = async data => {
    console.log('save profile daata controler', data);
    try {
      const result = await httpClient.request({
        url: `http://34.87.121.155:2121/apiwebpbi/api/changeprofile_mobile`,

        method: 'POST',
        data: {
          email: data.emails,
          name: data.name,
          hp: data.phone,
          gender: data.genders,
        },
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new UserController();
