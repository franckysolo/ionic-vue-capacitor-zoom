/**
 * Toast Ionic Mixin
 *
 * @type {Object}
 */
const toastMixin = {
  methods: {
    async toast (message) {
      const toast = await this.$ionic.toastController.create({
        message,
        position: 'bottom',
        color: 'primary',
        duration: 2000
      })
      toast.present()
    }
  }
}

export default toastMixin
