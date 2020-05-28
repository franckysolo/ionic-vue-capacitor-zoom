import toastMixin from '@/mixins/toast'
/**
 * File System Mixin
 *
 * @type {Object}
 */
const filesystemMixin = {
  mixins: [toastMixin],
  data () {
    return {
      files: [],
      maxfilesize: process.env.VUE_APP_MAX_FILE_SIZE || 1024 * 1024 * 3,
      fileRules: `size:${process.env.VUE_APP_MAX_FILE_SIZE || 1024 * 1024 * 2}`,
      mimetypes:[
        'image/png',
        'image/jpeg',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/pdf',
        'video/quicktime',
        'video/ogg',
        'video/webm',
        'video/mp4'
      ]
    }
  },
  methods: {
    async onChangeFile () {
      await this.openBrowserFileManager('upload')
    },
    async openBrowserFileManager (id) {
      var el = document.getElementById(id)
      el.click()
    },
    fileHeaders () {
      let boundary = Math.random().toString().substr(2)
      return {
        headers: {
          'Content-Type': `multipart/form-data;charset=utf-8; boundary="${boundary}"`
        }
      }
    },
    isMimeAccept (file) {
      return this.mimetypes.indexOf(file.type) !== -1
    },
    convertToBase64 (file) {
      if (file.type.startsWith('image/')) {
        let reader = new FileReader()
        var vm = this
        reader.onload = (event) => {
            vm.files.push(event.target.result)
        }
        // display image as base64
        reader.readAsDataURL(file)
      } else {
        this.files.push(file)
      }
    },
    convertDataUrlToFileObject (f) {
      // file return object from camera example :
      /*
       // from uri
        {
          path: 'file:///data/data/com.chatdmvet.io/cache/JPEG_20200114_010304_-1928982128.jpg',
          webPath: 'http://192.168.1.15:8080//_capacitor_file_/data/data/com.chatdmvet.io/cache/JPEG_20200114_010304_-1928982128.jpg',
          format: 'jpeg',
          exif: Object
        }
        // from DataUrl
        {
          dataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2...",
          format: 'jpeg',
          exif: Object
        }
       */
      let byteString = atob(f.dataUrl.split(',')[1])
      let ab = new ArrayBuffer(byteString.length)
      let ia = new Uint8Array(ab)
      let mime = f.dataUrl.split(',')[0].match(/:(.*?);/)[1]
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
      }
      let blob = new Blob([ia], { type: mime })
      window.console.log(blob)
      let file = new File([blob], `img-${this.uuid()}.${f.format}`) // may be spécifier array for extension
      window.console.log(file)
      this.toast('store file')
      // work with blob not with file @todo à reverifier sur apk
      this.form.files.push(blob)
    },
    uuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0
        let v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    setFileRules (rules) {
      this.$set(this.$data, 'fileRules', rules)
    },
    storeFiles (e) {
      let input = e.target
      input.files.forEach(f => {
        if (f.size > this.maxfilesize) {
          this.toast('Fichier(s) joint(s) trop volumineux')
          return
        }
        if (!this.isMimeAccept(f)) {
          this.toast(
            'Fichier(s) joint(s) invalide(s), vérifier l\'extension et le type'
          )
          return
        }
        this.convertToBase64(f)
        this.form.files.push(f)
      })
    }
  }
}

export default filesystemMixin
