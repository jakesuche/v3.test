<template>
  <form
    class="form"
    @submit.prevent
  >
    <div class="form-content">
      <div class="form-title">
        <h1>{{ t(`Login.form.title`) }} &#9996;</h1>
        <p>
          {{ t(`Login.form.subtitle`) }}
          <base-link
            primary
            :to="{ name: 'RegisterStep1' }"
          >
            {{ t(`Login.form.subtitleLink`) }}
          </base-link>
        </p>
      </div>
      <div class="inputs">
        <base-input
          v-model="v$.email.$model"
          :error="v$.email.$errors[0]?.$message"
          :label="t(`Login.form.email`)"
          :placeholder="t(`Login.form.emailPlaceholder`)"
        />
        <base-input
          v-model="v$.password.$model"
          :error="v$.password.$errors[0]?.$message"
          type="password"
          :label="t(`Login.form.password`)"
          :placeholder="t(`Login.form.passwordPlaceholder`)"
        />
      </div>
      <div class="buttons">
        <div>
          <base-button
            :disabled="v$.$invalid"
            block
            primary
            @click="handleLogin"
          >
            {{ t(`Login.form.loginButton`) }}
            
          </base-button>
          <div class="forgotPassword">
            <base-link :to="{ name: 'ForgotPassword' }">
              {{ t(`Login.form.forgotPassword`) }}
            </base-link>
          </div>
        </div>
        <base-button
          block
          neutral
          @click="handleGoogleLogin"
        >
          <img
            v-lazy="{ src: '/images/login/g-icon.png' }"
            class="descriptive"
            alt="Google G icon"
          >
          {{ t(`Login.form.loginWithGoogle`) }}
          
        </base-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { useRouter } from 'vue-router';
import GoogleAuth from '@/utils/GoogleAuth';
import {
  required, email, maxLength, minLength,
} from '@/utils/I18nValidators';
import useToast from '@/hooks/useToast';

import { LoginDataType } from '@/store/modules/auth';
import { RulesType } from '@/types/Vuelidate';

export default defineComponent({
  methods: {
    async handleGoogleAuth() {
      // const user = await this.$gAuth.signIn();
      // console.log(user);
    },
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const form = computed<LoginDataType>(() => store.getters['auth/getLoginData']);

    const rules = computed(() => ({
      email: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(16) },
    } as RulesType));

    const v$ = useVuelidate(rules.value, form.value);

    async function handleLogin() {
      const isValidate = await v$.value.$validate();

      if (isValidate) {
        const { data, error } = await store.dispatch('auth/submitLogin', form);

        if (data) {
          router.push({ name: 'Dashboard' });
        }

        if (error) {
          toast.open({ mesage: error });
        }
      }
    }

    async function handleGoogleLogin() {
      const auth = await GoogleAuth();
      const user = await auth.signIn();
      const tokenId = user.getAuthResponse().id_token;
      const { data, errors } = await store.dispatch('auth/submitGoogleLogin', tokenId);

      if (data) {
        router.push({ name: 'Dashboard' });
      }
      if (errors) {
        toast.open({ mesage: errors });
      }
    }

    return {
      v$, t, handleLogin, handleGoogleLogin,
    };
  },
});
</script>

<style lang="scss"  scoped>
.forgotPassword a {
  font-size: 13px;
}
</style>
