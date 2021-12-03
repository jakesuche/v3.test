<template>
  <Description
    :email="email"
    :is-completed="isCompleted"
  />
  <Completed
    v-if="email && isCompleted"
    @set-completed="setCompleted"
  />
  <Form
    v-else
    :is-completed="isCompleted"
    @set-completed="setCompleted"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import Completed from '@/components/Public/CheckEmail/Completed.vue';
import Description from '@/components/Public/CheckEmail/Description.vue';
import Form from '@/components/Public/CheckEmail/Form.vue';

export default defineComponent({
  components: { Description, Completed, Form },
  setup() {
    const store = useStore();
    const email = computed<string>(() => (store.getters['auth/getCheckEmailData']).email);
    const isCompleted = ref(true);

    function setCompleted(value: boolean) {
      isCompleted.value = value;
    }

    return { isCompleted, email, setCompleted };
  },
});
</script>
