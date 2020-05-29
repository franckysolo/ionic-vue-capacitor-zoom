<template>
  <div class="ion-page">
    <toolbar />
    <ion-content padding>
      <div class="ion-margin-bottom">
        <h2>Form ionic natif</h2>
        <!-- Form natif ionic -->
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-item class="ion-margin-bottom" lines="none">
            <ion-label position="floating">Email</ion-label>
            <ion-input inputmode="email" type="email" placeholder="Entrer votre email"></ion-input>
          </ion-item>
          <ion-item class="ion-margin-bottom" lines="none">
            <ion-label position="floating">Mot de passe</ion-label>
            <ion-input type="password" placeholder="Entrer votre mot de passe"></ion-input>
          </ion-item>
        </ion-list>
      </div>
      <div class="ion-margin-bottom">
        <h2>Form ionic natif avec validateur</h2>
        <!-- Form natif ionic -->
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-item class="ion-margin-bottom" lines="none">
            <ValidationProvider name="email" v-slot="{ errors }" rules="required|email">
              <ion-label position="floating">Email</ion-label>
              <ion-input
                type="email"
                name="email"
                v-model="email"
                @input="email = $event.target.value"
                :value="email"
                placeholder="Entrer votre email">
              </ion-input>
              <ion-text v-if="errors[0]">
                <p class="io-error" v-text="errors[0]" />
              </ion-text>
            </ValidationProvider>
          </ion-item>
          <ion-item class="ion-margin-bottom" lines="none">
            <ValidationProvider name="password" v-slot="{ errors }" rules="required">
              <ion-label position="floating">Mot de passe</ion-label>
              <ion-input
                v-model="password"
                @input="password = $event.target.value"
                :value="password"
                type="password"
                placeholder="Entrer votre mot de passe"></ion-input>
              <ion-text v-if="errors[0]">
                <p class="io-error" v-text="errors[0]" />
              </ion-text>
            </ValidationProvider>
          </ion-item>
        </ion-list>
      </div>
      <div class="ion-margin-bottom">
        <h2>Form composer</h2>
        <!-- Form composer -->
        <form-composer
          :definition="definition"
          @submit="handleLogin">
        </form-composer>
      </div>
    </ion-content>
  </div>

</template>

<script>
import { Plugins } from '@capacitor/core'
const { Keyboard } = Plugins

import FormComposer from '@/components/FormComposer'
import Toolbar from '@/components/Toolbar'
import definition from '@/forms/login'
import formMixin from '@/mixins/form'
import toastMixin from '@/mixins/toast'

export default {
  name: 'FormPage',
  components: {
    FormComposer,
    Toolbar
  },
  mixins: [formMixin, toastMixin],
  data () {
    return {
      definition: definition,
      email: '',
      password: ''
    }
  },
  mounted () {

    Keyboard.addListener('keyboardDidShow', info => {
        window.console.log('keyboard will did show with height', info.keyboardHeight)
    })

    Keyboard.addListener('keyboardDidShow', info => {
        window.console.log('keyboard did show with height', info.keyboardHeight)
    })

    Keyboard.addListener('keyboardWillHide', () => {
        window.console.log('keyboard will hide')
    })

    Keyboard.addListener('keyboardDidHide', () => {
        window.console.log('keyboard did hide')
    })

    window.addEventListener('keyboardWillShow', (e) => {
      window.console.log('keyboard will show with height', e.keyboardHeight)
    })

    window.addEventListener('keyboardDidShow', (e) => {
      window.console.log("keyboard did show with height", e.keyboardHeight)
    })

    window.addEventListener('keyboardWillHide', () => {
      window.console.log('keyboard will hide');
    })

    window.addEventListener('keyboardDidHide', () => {
      window.console.log('keyboard did hide');
    })
  },
  methods: {
    async handleLogin () {
      this.toast('Form is submitted')
      this.$bus.$emit('reset-form')
    }
  }
}
</script>

<style lang="css">
.d-none {
  display: none;
}
</style>
