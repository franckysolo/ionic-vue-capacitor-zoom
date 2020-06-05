<template>
  <div class="ion-page">
    <toolbar />
    <ion-content class="ion-padding">
      <ion-button @click="getCurrentPosition">
        <ion-label>Geolocalisé moi</ion-label>
      </ion-button>
      <div class="ion-padding" v-if="position">
          <ion-list v-if="position.coords">
            <ion-item>
              <ion-label>Latitude</ion-label>
              <ion-badge slot="end">{{ position.coords.latitude}}</ion-badge>
            </ion-item>
            <ion-item>
              <ion-label>Longitude</ion-label>
              <ion-badge slot="end">{{ position.coords.longitude}}</ion-badge>
            </ion-item>
            <ion-item>
              <ion-label>Altitude</ion-label>
              <ion-badge slot="end">{{ position.coords.altitude}}</ion-badge>
            </ion-item>
            <ion-item>
              <ion-label>Vitesse</ion-label>
              <ion-badge slot="end">{{ position.coords.speed }}</ion-badge>
            </ion-item>
          </ion-list>
      </div>
    </ion-content>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

export default {
  name: 'GeolocationPage',
  components: {
    Toolbar
  },
  data () {
    return {
      position: null
    }
  },
  async beforeDestroy () {
    if (Geolocation) {
      await Geolocation.clearWatch()
    }
  },
  methods: {
    async getCurrentPosition () {
      if (Geolocation) {
        let position = await Geolocation.getCurrentPosition()
        this.$set(this.$data, 'position', position)
        this.watchPosition()
      }
    },
    async watchPosition () {
      let vm = this
      if (Geolocation) {
        await Geolocation.clearWatch()
        await Geolocation.watchPosition({}, (position, err) => {
          if (!err) {
            vm.$set(vm.$data, 'position', position)
          }
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
