<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar class="toolbar-md-primary">
        <ion-title>Capacitor - Zoom - VueJS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>

      <ion-button @click="displayToast">Afficher message surgissant</ion-button>
      <ion-button @click="takePicture">Prendre une photo</ion-button>
      <ion-button @click="nextPage">Zoom Conférence</ion-button>
      <ion-button @click="scan">Scanner un code barre</ion-button>

      <div class="ion-padding">
        <img :src="image" alt="Image">
      </div>
    </ion-content>
  </div>
</template>

<script>

import toast from '@/mixins/toast'

import {
  Plugins,
  CameraSource,
  CameraResultType,
} from "@capacitor/core"
const { Camera } = Plugins

export default {
  name: 'CameraPage',
  mixins: [toast],
  data () {
    return {
      image: null
    }
  },
  methods: {
    async displayToast () {
      this.toast('hello this is a toast message')
    },
    async takePicture () {
      const file = await Camera.getPhoto({
         quality: 100,
         allowEditing: false,
         resultType: CameraResultType.DataUrl,
         source: CameraSource.Camera
       })
       window.console.log('Image from camera', file)
       this.$set(this.$data, 'image', file.dataUrl)
    },
    async scan () {

    },
    async nextPage () {
      this.$router.push('/zoom')
    }
  }
}
</script>
