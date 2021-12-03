import { App } from 'vue';
// import GAuth from 'vue3-google-oauth2';
const GAuth:any = ''
export default (app: App): void => {
  const gAuthOptions = {
    clientId: process.env.VUE_APP_API_GOOGLE_CLIENT_ID,
    scope: 'email',
    prompt: 'consent',
    fetch_basic_profile: false,
  };

  app.use(GAuth, gAuthOptions);
};
