<template>
  <div class="ion-page">
    <toolbar />
    <ion-content padding>
      <div class="ion-margin-bottom">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-item class="ion-margin-bottom" lines="none">
            <ion-label position="floating">Text 1</ion-label>
            <ion-input inputmode="text" type="text" placeholder="Entrer du texte"></ion-input>
          </ion-item>
          <!-- <ion-item class="ion-margin-bottom" lines="none">
            <ion-label position="floating">Text 2</ion-label>
            <ion-input inputmode="text" type="text" placeholder="Entrer du texte"></ion-input>
          </ion-item> -->
        </ion-list>
      </div>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'DebugPage'
}
</script>

<style lang="css" scoped>
</style>
