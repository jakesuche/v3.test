import { App } from 'vue';
import { createI18n } from 'vue-i18n';
// import { messages } from '@/i18n';


function setupI18n(app: App): void {
  const i18n = createI18n({
    locale: window.localStorage.getItem('lang') || 'br',
    // messages: messages,
  });

  app.use(i18n);
}



export default setupI18n;
