<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar class="toolbar-md-primary">
        <ion-title>Capacitor - Scanbar - VueJS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>

      <ion-button @click="$router.push('/')">Home page</ion-button>
      <ion-button @click="scan">Scanner un code barre</ion-button>
      <ion-button @click="notify">Envoyer une notification</ion-button>
      <ion-button @click="setBadge">Définir badge</ion-button>
      <ion-button @click="getBadge">Afficher badge</ion-button>

      <div class="ion-padding" v-if="datas">
        <pre v-html="datas"></pre>
      </div>

      <div class="ion-padding" v-if="isSupported">
          <pre v-html="count"></pre>
      </div>
    </ion-content>
  </div>
</template>


<script>
import toast from '@/mixins/toast'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { Badge } from '@ionic-native/badge'
import { Plugins } from '@capacitor/core'
const { LocalNotifications } = Plugins;

export default {
  name: 'ScanPage',
  mixins: [toast],
  data () {
    return {
      datas: null,
      count: 0,
      isSupported: false
    }
  },
  async mounted () {
    const isSupported = await Badge.isSupported()
    this.$set(this.$data, 'isSupported', isSupported)
    const hasPermission = await Badge.hasPermission()
    if (!hasPermission) {
      this.toast('Please request permission to notify badge')
    }
  },
  methods: {
    async scan () {
      this.toast('Scanning barcode')
      const data = await BarcodeScanner.scan()
      window.console.log(`Barcode data: ${data.text}`)
      this.$set(this.$data, 'datas', data.text)
    },
    async notify () {
      LocalNotifications.schedule({
        notifications: [
          {
            title: "Messages non lus",
            body: "Vous avez des messages non lus",
            id: 1,
            badge: 10
          }
        ]
      })
    },
    async setBadge () {
      await Badge.set(15)
    },
    async getBadge () {
      let count = await Badge.get()
      this.$set(this.$data, 'count', count)
    }
  }
}
</script>
