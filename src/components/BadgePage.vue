<template>
  <div class="ion-page">
    <toolbar />
    <ion-content class="ion-padding">
      <ion-button @click="notify">Envoyer une notification</ion-button>
      <ion-button @click="setBadge">Définir badge</ion-button>
      <ion-button @click="getBadge">Afficher badge</ion-button>
      <div class="ion-padding" v-if="isSupported">
          <pre v-html="count"></pre>
      </div>
    </ion-content>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import toast from '@/mixins/toast'
import { Badge } from '@ionic-native/badge'
import { Plugins } from '@capacitor/core'
const { LocalNotifications } = Plugins

export default {
  name: 'BadgePage',
  mixins: [toast],
  components: {
    Toolbar
  },
  data () {
    return {
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
    async beforeDestroy() {
      await this.notify(10)
    },
    async notify (delay) {
      delay = delay || 5
      LocalNotifications.schedule({
        notifications: [
          {
            title: "Messages non lus",
            body: "Vous avez des messages non lus",
            schedule: { at: new Date(Date.now() + 1000 * delay) }, // dans 5sec
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

<style lang="css" scoped>
</style>
