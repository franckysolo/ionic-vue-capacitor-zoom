<template>
  <div class="ion-page">
    <toolbar />
    <ion-content padding>
      <ion-card>
        <ion-card-header color="primary">
          Connexion aux réunions vidéos
        </ion-card-header>
        <ion-card-content padding>
          <p v-if="!loggedIn">Entrer votre nom d'utilisateur et mot de passe</p>
          <ion-list v-if="!loggedIn">
            <ion-item>
              <ion-label position="stacked">Nom d'utilisateur</ion-label>
              <ion-input type="text" :value="username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Mot de passe</ion-label>
              <ion-input type="password" :value="password"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button v-if="!loggedIn" expand="full" @click="loginToZoom">
            Connexion
          </ion-button>
          <ion-button v-if="loggedIn" expand="full" @click="logoutFromZoom">
            Déconnexion
          </ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="loggedIn">
        <ion-card-header>
          Réunions vidéos
        </ion-card-header>
        <ion-card-content padding>
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Numéro de réunion</ion-label>
              <ion-input type="string" @input="meetingNumber = $event.target.value" :value="meetingNumber"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">
                Mot de passe de réunion (si existe)
              </ion-label>
              <ion-input type="password" @input="meetingPassword = $event.target.value" :value="meetingPassword"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button expand="full" @click="joinMeeting">
            Joindre une réunion
          </ion-button>
          <ion-button expand="full" @click="startMeeting">
            Démarrer une réunion
          </ion-button>
          <div padding>
            <ion-button expand="full" fill="outline" @click="startInstantMeeting">
              Démarrer une réunion instantanée
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import { Zoom } from '@ionic-native/zoom/ngx'
import toast from '@/mixins/toast'
import * as credentials from '@/config'
//
export default {
  name: 'ZoomPage',
  mixins: [toast],
  components: {
    Toolbar
  },
  data () {
    return {
      zoom: null,
      initialize: false,
      loggedIn: false,
      username: 'franckysolo@gmail.com',
      password: 'Daddycool212',
      meetingNumber: '',
      meetingPassword: '',
      displayName: 'Zoom Ionic Vuejs Capacitor'
    }
  },
  async mounted () {
    this.zoom = new Zoom()
    let result = await this.zoom.initialize(
      credentials.SDK_KEY,
      credentials.SDK_SECRET
    )
    if (result) {
      this.$set(this.$data, 'initialize', true)
      this.toast('Zoom initialize')
    } else {
      this.toast('Cannot initialize Zoom')
    }
  },
  methods: {
     async loginToZoom () {
      let result = await this.zoom.login(this.username, this.password)
        if (result) {
          this.loggedIn = true
          this.username = ''
          this.password = ''
          this.toast('Zoom login successfull')
        } else {
          this.toast('Cannot login to Zoom')
        }
    },
    async logoutFromZoom () {
      let result = await this.zoom.logout()
      if (result) {
        this.loggedIn = false
        this.toast('Zoom logout successfull')
      } else {
        this.toast('Cannot logout from Zoom')
      }
    },
    async joinMeeting () {
      const options = {
        no_driving_mode: true,
        no_invite: true,
        no_meeting_end_message: true,
        no_titlebar: false,
        no_bottom_toolbar: false,
        no_dial_in_via_phone: true,
        no_dial_out_to_phone: true,
        no_disconnect_audio: true,
        no_share: true,
        no_audio: true,
        no_video: true,
        no_meeting_error_message: true
      }

      let result = await this.zoom.joinMeeting(
        this.meetingNumber,
        this.meetingPassword,
        this.displayName,
        options
      )

      if (result) {
        this.meetingNumber = null
        this.meetingPassword = null
        this.toast(result)
      }
    },
    async startMeeting () {
      const options = {}
      // Call start meeting method.
      let response = await this.zoom.startMeeting(
        this.meetingNumber,
        options
      )
      if (response) {
        this.meetingNumber = null
        this.meetingPassword = null
        this.toast(response.message)
      } else {
        this.toast(response.message)
      }
    },
    async startInstantMeeting () {
      const options = {}
      let result = await this.zoom.startInstantMeeting(options)
      if (result) {
        this.toast(result)
      }
    }
  }
}
</script>
