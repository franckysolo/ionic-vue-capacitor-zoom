<template>
  <div class="ion-page">
    <toolbar />
    <ion-content class="ion-padding">
      <ion-button @click="takePicture">
        <ion-label>Prendre une photo</ion-label>
      </ion-button>
      <div class="ion-padding" v-if="image">
        <img :src="image" alt="Image">
      </div>
    </ion-content>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'

import {
  Plugins,
  CameraSource,
  CameraResultType,
} from "@capacitor/core"
const { Camera } = Plugins

export default {
  name: 'CameraPage',
  components: {
    Toolbar
  },
  data () {
    return {
      image: null
    }
  },
  methods: {
    async takePicture () {
      const file = await Camera.getPhoto({
         quality: 100,
         allowEditing: false,
         resultType: CameraResultType.DataUrl,
         source: CameraSource.Camera
       })
       window.console.log('Image from camera', file)
       this.$set(this.$data, 'image', file.dataUrl)
    }
  }
}
</script>
