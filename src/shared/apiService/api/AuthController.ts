// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { AxiosResponse } from 'axios';
import {
  AuthEmail,
  AuthPhone,
  CurrrentUser,
} from '../../../entities/interface/UserControllerInterface';
import RestClient from '../restClient';

class AuthController {
  static postPhone(data: AuthPhone): Promise<AxiosResponse<CurrrentUser>> {
    return RestClient.postAxios(`/auth/phone`, data);
  }
  static postEmail(data: AuthEmail): Promise<AxiosResponse<CurrrentUser>> {
    return RestClient.postAxios(`/auth/email`, data);
  }
  static register(data: AuthEmail): Promise<AxiosResponse<CurrrentUser>> {
    return RestClient.postAxios(`/auth/new_user`, {
      email: data.email,
      password: data.password,
      phoneNumber: '791234645789234',
      name: 'string',
      lastName: 'string',
    });
  }

  static postEmailToXenBlog(data: AuthEmail): Promise<AxiosResponse<CurrrentUser>> {
    return RestClient.postAxios(`/api/sign`, data);
  }
  static getCurrentUser(): Promise<AxiosResponse<CurrrentUser>> {
    return RestClient.getAxios(`/auth/currentUser`);
  }
}
export default AuthController;
