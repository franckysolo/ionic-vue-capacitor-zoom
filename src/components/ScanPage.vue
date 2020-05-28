<template>
  <div class="ion-page">
    <toolbar />
    <ion-content class="ion-padding">
      <ion-button @click="scan">Scanner un code barre</ion-button>
      <div class="ion-padding" v-if="datas">
        <pre v-html="datas"></pre>
      </div>
    </ion-content>
  </div>
</template>


<script>
import toast from '@/mixins/toast'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'ScanPage',
  mixins: [toast],
  components: {
    Toolbar
  },
  data () {
    return {
      datas: null
    }
  },
  methods: {
    async scan () {
      this.toast('Scanning barcode')
      const data = await BarcodeScanner.scan()
      window.console.log(`Barcode data: ${data.text}`)
      this.$set(this.$data, 'datas', data.text)
    }
  }
}
</script>
