<template lang="html">
  <div class="ion-page">
    <toolbar />
    <ion-content>
      <ion-list>
        <ion-item button @click="$router.push(action.path)"
          v-for="(action, i) in actions" :key="i">
          <ion-label v-html="action.label"></ion-label>
        </ion-item>
        <ion-item button @click="displayToast">
          <ion-label>Afficher message surgissant</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
import toast from '@/mixins/toast'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'HomePage',
  mixins: [toast],
  components: {
    Toolbar
  },
  data () {
    return {
      actions: [
        {
          label: 'Tester le scan code',
          path: '/scan'
        },
        // {
        //   label: 'Tester Zoom',
        //   path: '/zoom'
        // },
        {
          label: 'Tester les formulaires',
          path: '/forms'
        },
        {
          label: 'Tester l\'appareil photo',
          path: '/photos'
        },
        {
          label: 'Tester les notifications et badge',
          path: '/badge'
        }
      ]
    }
  },
  methods: {
    async displayToast () {
      this.toast('hello this is a toast message')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
