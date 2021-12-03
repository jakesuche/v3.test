<template>
  <form
    class="form"
    @submit.prevent
  >
    <div class="form-content">
      <div class="form-title">
        <!-- <h1>{{ t(`Step3.form.title`) }}</h1> -->
      </div>
      <div class="inputs">
        <base-input
          v-model="v$.company.$model"
          required
          :error="v$.company.$errors[0]?.$message"
          :label="t(`Step3.form.companyName`)"
          :placeholder="t(`Step3.form.companyNamePlaceholder`)"
        />
        <base-select
          v-model="v$.size.$model"
          :error="v$.size.$errors[0]?.$message"
          :label="t(`Step3.form.companySize`)"
          :placeholder="t(`Step3.form.defaultSelectPlaceholder`)"
          :options="options.industrySize"
        />
        <base-select
          v-model="v$.industry.$model"
          :error="v$.industry.$errors[0]?.$message"
          :label="t(`Step3.form.industry`)"
          :placeholder="t(`Step3.form.defaultSelectPlaceholder`)"
          :options="options.industry"
        />
        <base-select
          v-model="v$.crm.$model"
          :error="v$.crm.$errors[0]?.$message"
          :label="t(`Step3.form.crm`)"
          :placeholder="t(`Step3.form.defaultSelectPlaceholder`)"
          :options="options.crm"
        />
        <base-checkbox
          id="confirm_terms"
          v-model="isConfirmedTerms"
          :label="t(`Step3.form.confirmTerms`)"
        />
      </div>
      <div class="buttons">
        <base-button
          undo
          @click="toBack"
        >
          {{ t(`Step3.form.returnButton`) }}
        </base-button>
        <base-button
          block
          :disabled="v$.$invalid || !isConfirmedTerms"
          primary
          @click="handleActivationRegister"
        >
          {{ t(`Step3.form.nextButton`) }}
        </base-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import {
  defineComponent, reactive, computed, onBeforeMount, ref, onMounted, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { required } from '@/utils/I18nValidators';
import { RulesType } from '@/types/Vuelidate';
import { RegisterActivationDataType, RegisterType } from '@/store/modules/auth';
import { CompanySizeOptions, CRMOptions, IndustryOptions } from '@/utils/options/Register';
import useToast from '@/hooks/useToast';

type OptionType = {
  [key: string]: string | number;
}

type OptionsType = {
  industrySize: OptionType[] | undefined;
  industry: OptionType[] | undefined;
  crm: OptionType[] | undefined;
}

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { t, locale } = useI18n();
    const toast = useToast();

    const token = ref('');
    const isGoogle = ref(false);

    const options: OptionsType = reactive({
      industrySize: [],
      industry: [],
      crm: [],
    });

    const form = computed<RegisterActivationDataType>(() => store.getters['auth/getRegisterActivationData']);
    const register = computed<RegisterType>(() => store.getters['auth/getRegisterData']);

    const rules = {
      company: { required },
      size: {},
      industry: {},
      crm: {},
    } as RulesType;

    const isConfirmedTerms = ref(false);

    const v$ = useVuelidate(rules, form.value);

    function toBack() {
      router.push({
        name: 'RegisterStep2',
        params: {
          token: token.value,
          isGoogle: String(isGoogle.value),
        },
      });
    }

    async function handleActivationRegister() {
      const isValidate = await v$.value.$validate();
      let response;

      if (isValidate) {
        try {
          if (isGoogle.value) {
            response = await store.dispatch('auth/submitGoogleActivation');
          } else {
            response = await store.dispatch('auth/submitActivation');
          }

          if (response.data) {
            toast.open({ mesage: response.data.msg });
            router.push({ name: 'RegisterFinished' });
            store.dispatch('auth/resetRegister');
          }
        } catch (err: any) {
          toast.open({ mesage: err?.response?.data?.message });
        }
      }
    }

    onMounted(() => {
      token.value = String(route.params.token) || '';
      isGoogle.value = route.params.isGoogle === 'true' || false;

      if (!token.value) router.push({ name: 'Login' });

      if (isGoogle.value) {
        register.value.tokenId = String(token.value);
      } else {
        register.value.activationToken = String(token.value);
      }
    });

    onBeforeMount(() => {
      options.industrySize = CompanySizeOptions();
      options.industry = IndustryOptions();
      options.crm = CRMOptions();
    });

    watch(locale, () => {
      options.industrySize = CompanySizeOptions();
      options.industry = IndustryOptions();
      options.crm = CRMOptions();
    });

    return {
      v$,
      options,
      isConfirmedTerms,
      t,
      toBack,
      handleActivationRegister,
    };
  },
});
</script>

<style lang="scss" scoped>
.form .buttons {
  flex-direction: row;
  
}
.btn{
  font-size: 16px;
}
.form .form-title h1 {
  font-size: 28px;
}
</style>
