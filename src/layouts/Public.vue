<template>
  <div class="login-page">
    <div class="login-card">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/layouts/Public/Header.vue';

export default {
  components: { Header },
};
</script>

<style lang="scss" scoped>
.login-card {
  display: grid;
  grid-template-columns: 510px 480px;
  zoom:85%;
  // width: 990px;
  height: fit-content;
}



@media (max-width:1024px) {
  .login-card{
      grid-template-columns: 400px 400px;
  }
}
@media (max-width:800px) {
  .login-card{
      grid-template-columns: 300px 300px;
  }
}

@media screen and (max-width: 640px) {
  .login-card {
    width: 100%;
    padding: 0px 10px;
  }
}

@media (orientation: portrait) {
  .login-card {
    display: flex;
    flex-direction: column;
  }
}
</style>
