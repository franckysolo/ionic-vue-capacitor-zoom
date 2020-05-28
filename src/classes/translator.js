/**
 * @author franckysolo
 * @version 0.0.3
 */
class Translator {

  constructor (lang) {
    this.data = require(`@/langs/${lang}.json`)
    // if not avaliable fallback to default
    if (!this.data) {
        this.data = require(`@/langs/fr.json`)
    }
  }

  translate (string) {
    // May be change for use direct translation @see langs/fr.json
    return string.split('.').reduce((o,i) => o[i], this.data)
  }
}

export { Translator as default }
