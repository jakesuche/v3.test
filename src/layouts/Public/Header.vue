<template>
  <div class="header">
    <div class="logo-container">
      <img
        class="logo"
        alt="Juridoc Logo"
        v-lazy="{ src: '/images/logo.png' }"
      />
    </div>
    <div class="selector">
      <span>{{step}}</span>
      <SelectLang v-model="currentLang" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import SelectLang from '@/layouts/Public/SelectLang.vue';

export default defineComponent({
  components: { SelectLang },
  setup() {
    const langStorage = localStorage.getItem('lang');
    const currentLang = ref(langStorage || 'br');
    const i18n = useI18n();
    const route = useRoute();

    watch(currentLang, (newValue) => {
      window.localStorage.setItem('lang', newValue);
      i18n.locale.value = newValue;
    });

    const step = computed(() => {
      if (route.name === 'RegisterStep2') return i18n.t('Step2.form.prelude');
      if (route.name === 'RegisterStep3') return i18n.t('Step3.form.prelude');
      return '';
    });
    return { currentLang, step, t: i18n.t };
  },
});
</script>

<style lang="scss" scoped>

.header {
  border-radius: 5px 5px 0px 0px;
  display: grid;
  grid-column: 1/3;
  grid-template-columns: 510px 480px;
  height: 50px;

  .logo-container {
    border-radius: 5px 0px 0px 0px;
    padding-top: 23px;
    background-color: $neutral-bg ;
    padding-left: 90px;
    img {
      width: 83px;
      height: 23px;
    }
  }
  .selector {
    border-radius: 0px 5px 0px 0px;
    padding-top: 23px;
    padding-right: 90px;
    padding-left: 70px;
    width: 100%;
    background-color: $white;
    justify-content: space-between;
    display: flex;
    span {
      color: $text-dark-grey-6;
      font-size: 14px;
      line-height: 27px;
    }
  }
}

@media (orientation: portrait) {
  .header {
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    .logo-container {
      border-radius: 5px 5px 0px 0px;
      padding-top: 27px;
      background-color: $neutral-bg ;
      padding-left: 10%;
      img {
        width: 83px;
        height: 23px;
      }
    }
    .selector {
      border-radius: 0px 0px 0px 0px;
      padding-right: 10%;
      padding-top: 27px;
      width: 100%;
      background-color: $neutral-bg ;
      justify-content: flex-end;
      display: flex;
    }

  }
}

@media (max-width:1024px) {
  .header {
      grid-template-columns: 400px 400px;
  }
}
@media (max-width:800px) {
  .header {
      grid-template-columns: 300px 300px;
  }
}
</style>
