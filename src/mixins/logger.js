const mixinLogger = {
  data () {
    return {
      logger: window.console
    }
  },
  methods: {
    log (message) {
      return this.logger.log(message)
    },
    info (message) {
      return this.logger.info(message)
    },
    warn (message) {
      return this.logger.warn(message)
    },
    err (message) {
      return this.logger.error(message)
    }
  }
}

export default mixinLogger
