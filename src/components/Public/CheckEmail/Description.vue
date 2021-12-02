<template>
  <div class="description">
    <h1>{{ t(`CheckEmail.description.main`) }}</h1>
    <p v-if="email && isCompleted">
      {{ t(`CheckEmail.description.sub`) }}
      <span class="highlight">{{email}}</span>
    </p>
    <img
      class="descriptive"
      v-lazy="{ src: '/images/login/check-email.png' }"
      alt="check email figure"
    />
    <div class="description-footer">
      <p>
        {{ t('CheckEmail.description.hasAccount') }}
        <base-link :to="{ name: 'Login' }">
          {{ t('CheckEmail.description.hasAccountLink') }}
        </base-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    email: { type: String, default: '' },
    isCompleted: { type: Boolean, default: false },
  },
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>

<style lang="scss" scoped>
.description {
  h1 {
    color: $text-dark-grey-4;
    font-weight: bold;
    font-size: 30px;
  }
  p {
    color: $text-dark-grey-5;
  }
  a {
    color: $link-color;
  }
  .description-footer p {
    margin-bottom: 0;
  }
}
</style>
