<template>
  <div class="description">
    <h1>{{ t(`Step2.description.main`) }}</h1>
    <p>{{ t(`Step2.description.sub`) }}</p>
    <div class="lawyer-image-container">
      <img
        class="descriptive"
        v-lazy="{ src: '/images/login/Felipe-Novak-juridoc-socio.png' }"
        alt="Felipe Novak picture"
      />
      <div class="legend">
        <span>Felipe Novak</span>
        <span>{{ t(`Step2.description.lawyerSub`) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>

<style lang="scss" scoped>
div.description {
  h1 {
    flex-grow: 1;
  }
  img.descriptive {
    width: 100px;
  }
}
.lawyer-image-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content:center;
  .legend {
    display: flex;
    flex-direction: column;
    span {
      color: $text-dark-grey;
    }
  }
}
</style>
