import { ActionTree, GetterTree, MutationTree } from 'vuex';
import $api from '@/services';

export type LoginDataType = {
  email: string;
  password: string;
};

export type RegisterActivationDataType ={
  firstName: string;
  lastName: string;
  job?: string;
  whatBringsYouHere?: string;
  phone?: string;
  company: string;
  size?: string;
  industry?: string;
  crm?: string;
};

export type RegisterAccessDataType = LoginDataType & { language: string };

export type RegisterType = {
  accessData: RegisterAccessDataType;
  data: RegisterActivationDataType;
  activationToken?: string;
  tokenId?: string;
};

export type ForgotPasswordType = {
  email: string;
  language: string;
};

export type CheckEmailType = {
  email: string;
  language: string;
};

type GlobalType = {
  login: LoginDataType;
  register: RegisterType;
  forgotPassword: ForgotPasswordType;
  checkEmail: CheckEmailType;
};

export const state: GlobalType = {
  login: {
    email: '',
    password: '',
  },
  checkEmail: {
    email: '',
    language: '',
  },
  register: {
    accessData: {
      email: '',
      password: '',
      language: '',
    },
    activationToken: '',
    tokenId: '',
    data: {
      firstName: '',
      lastName: '',
      company: '',
    },
  },
  forgotPassword: {
    email: '',
    language: '',
  },
};

export const mutations: MutationTree<GlobalType> = {
  SET_LOGIN_DATA(state, data) {
    state.login = data;
  },
  SET_REGISTER_DATA(state, data) {
    state.register = data;
  },
  SET_REGISTER_ACCESS_DATA(state, data) {
    state.register.accessData = data;
  },
  SET_FORGOT_PASSWORD_DATA(state, data) {
    state.forgotPassword = data;
  },
  SET_CHECK_EMAIL_DATA(state, data) {
    state.checkEmail = data;
  },
};

export const actions: ActionTree<GlobalType, void> = {
  setLoginData: ({ commit }, data: LoginDataType) => commit('SET_LOGIN_DATA', data),
  setCheckEmailData: ({ commit }, data: CheckEmailType) => commit('SET_CHECK_EMAIL_DATA', data),
  setRegisterAccessData: ({ commit }, data: LoginDataType & { language: string }) => commit('SET_REGISTER_ACCESS_DATA', data),
  setForgotPasswordData: ({ commit }, data: { email: string }) => commit('SET_FORGOT_PASSWORD_DATA', data),
  async submitLogin({ state }) {
    const body = state.login;
    const response = await $api.auth.login(body);

    return response;
  },
  async submitGoogleLogin(_, tokenId: string) {
    const response = await $api.auth.googleLogin(tokenId);

    return response;
  },
  async submitCheckEmail({ state }) {
    const body = state.checkEmail;
    const response = await $api.auth.resendActivation(body);

    return response;
  },
  async submitRegister({ state }) {
    const body = state.register.accessData;
    const response = await $api.auth.register(body);

    return response;
  },
  async submitActivation({ state }) {
    const body = state.register.data;

    const response = await $api.auth.activation({
      activationToken: state.register.activationToken || '',
      ...body,
    });

    return response;
  },
  async submitGoogleActivation({ state }) {
    const body = state.register.data;

    const response = await $api.auth.googleRegister({
      tokenId: state.register.tokenId || '',
      ...body,
    });

    return response;
  },
  async submitForgotPassword({ state }) {
    const body = state.forgotPassword;
    const response = await $api.auth.forgotPassword(body);

    return response;
  },
};

export const getters: GetterTree<GlobalType, void> = {
  getLoginData: (state):LoginDataType => state.login,
  getRegisterAccessData: (state):RegisterAccessDataType => state.register.accessData,
  getRegisterActivationData: (state):RegisterActivationDataType => state.register.data,
  getRegisterData: (state): RegisterType => state.register,
  getCheckEmailData: (state):CheckEmailType => state.checkEmail,
  getForgotPasswordData: (state):ForgotPasswordType => state.forgotPassword,
};
