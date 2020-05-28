/**
 * Form Helper Mixins
 *
 * @type {Object}
 */
const formMixin = {
    methods: {
      formatMessage (data, base) {
        let message = data.length > 0
                    ? data[0]
                    : base
        return message
      },
      errorMessage (errors, to, from) {
        return errors.replace(to, from)
      },
      fill (name, value) {
        if (this.definition
          && (this.definition.fields.find(f => f.name === name)
          || this.definition.fields.find(f => f.hidden === name))
        ) {
          this.$set(this.$data.form, name, value)
          let field = this.definition.fields.find(f => f.name === name)
          if (field && field.select != null && field.selectEmit) {
            this.$emit(field.select, value)
          }
        } else if (this.definition && this.definition.hiddens) {
          let field = this.definition.hiddens.find(f => f.name === name)
          if (field) {
            this.$set(this.$data.form, name, value)
          }
        }
      },
      mapSelectors (def, res) {
        for (const key in res) {
          let getter = res[key]
          let fieldIndex = def.fields.findIndex(f => f.name == key)
          let field = def.fields[fieldIndex]
          field.items = []
          for (const k in this[getter]) {
            let o = this[getter][k]
            if (typeof o == 'object') {
              field.items.push(o)
            } else {
              field.items.push({
                id: k,
                label: o,
              })
            }
          }
          def.fields.splice(fieldIndex, 1, field)
        }

        return def
      },
      convertToFormData (form) {
        let formData = new FormData()
        for (const field in form) {
          let value = form[field]
          if (typeof(value) == File) {
            formData.append(field, value, value.name)
          } else {
            formData.append(field, value === null ? '' : value)
          }
        }

        return formData
      }
    }
}

export default formMixin
