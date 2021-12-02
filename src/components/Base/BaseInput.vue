<template>
  <div
    class="input-container"
    :class="classes"
  >
    <label v-if="label">{{ label }}</label>
    <input
      :class="classes"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="updateValue"
    >
    <span
      v-if="required"
      class="required"
    >*</span>
    <span>
      {{ error }}
    </span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  props: {
    type: { type: String, required: false, default: 'text' },
    label: { type: String, required: false, default: '' },
    modelValue: { type: [Number, String], default: '' },
    placeholder: { type: String, default: '' },
    error: { type: String, default: '' },
    block: { type: Boolean },
    required: { type: Boolean },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const classes = computed(() => ({
      block: props.block,
      error: props.error,
      hasData: props.modelValue,
    }));

    function updateValue(event: Event) {
      const { value } = event.target as HTMLInputElement;

      emit('update:modelValue', value);
    }

    return {
      updateValue,
      classes,
    };
  },
});
</script>

<style scoped lang="scss">
.input-container {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 4px;

  &.block {
    width: 100%;
  }

  label {
    color: $input-labels;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  input {
    border: 1px solid $border-neutral;
    padding: 1rem;
    height: 3rem;
    color: $text-dark-grey-2;
    outline: none !important;
    border-radius: 5px;
    font-size: 14px;
    &.error {
      border-color: $error;
    }

    &:focus, &.hasData{ /* Microsoft Edge */
      border-color: $primary-button;
      background-color: $transparent-focus-bg-elements;
    }

    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: $text-soft-grey;
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: $text-soft-grey;
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: $text-soft-grey;
    }
    // font-size: 24px;

    // padding: 0.5rem 1.25rem;

    // cursor: pointer;

    // border: 0;
    // border-radius: 20px;

    // border: 1px solid #cecece;

    // &.block {
    //   width: 100%;
    // }

  }

  span {
    color: $error;
    padding-left: 8px;
    font-size:13px;
    &.required {
      position: absolute;
      top: 32px;
      right: 8px;
    }
  }

}
</style>
