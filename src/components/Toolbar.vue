<template>
  <ion-header>
    <ion-toolbar class="toolbar-md-primary">
      <ion-title>Démo App</ion-title>
      <ion-buttons slot="start" v-if="$route.path != '/'">
        <ion-back-button default-href="/"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>

<style lang="css" scoped>
</style>
