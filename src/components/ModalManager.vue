<template>
  <teleport to="body">
    <component
      :is="modalData.component"
      :open="modalData.show"
      @close="
        handleModalToogle({ show: false, component: modalData.component })
      "
    />
  </teleport>
</template>

<script lang="ts">
import { reactive, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import useModal, { ModalData } from '@/hooks/useModal'
import AddCompanyModal from '@/components/Settings/Companies/AddCompanyModal.vue'
import AddWorkspaceModal from '@/components/Settings/Workspaces/AddWorkspaceModal.vue'
import InviteModal from '@/components/Settings/Team/InviteModal.vue'

export default defineComponent({
  components: {
    AddCompanyModal,
    AddWorkspaceModal,
    InviteModal,
  },
  setup() {
    const modal = useModal()

    const modalData = reactive({
      show: false,
      component: '',
    })

    function handleModalToogle(payload: ModalData) {
      modalData.show = payload.show
      modalData.component = payload.component || ''
    }

    onMounted(() => {
      modal.on(handleModalToogle)
    })

    onBeforeUnmount(() => {
      modal.off(handleModalToogle)
    })

    return {
      modalData,
      handleModalToogle,
    }
  },
})
</script>

<style></style>
