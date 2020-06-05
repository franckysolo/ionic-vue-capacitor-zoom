<template>
  <div class="mb-4">
    <ValidationObserver v-slot="{ invalid, handleSubmit }" tag="div" ref="formComposer">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <ion-list>
          <slot name="hiddens"></slot>
          <template v-for="(field, i) in definition.fields">
            <input :key="field.hidden + '-' + i"
              v-if="field && field.hidden && field.type == 'search'"
              type="hidden" :name="field.hidden" :id="field.hidden"
              :value="form[field.hidden]">
          </template>
          <template v-for="(fieldset, j) in definition.fieldsets">
            <fieldset :key="'fieldset-' + j" v-if="!fieldset.disabled">
              <legend :class="fieldset.css" v-if="fieldset.legend" v-html="$trans(fieldset.legend)" />
              <template v-for="(field, i) in definition.fields">
              <ValidationProvider
                v-if="field.fieldset == fieldset.key"
                :key="i"
                :tag="field.tag"
                :name="field.name"
                :rules="field.rules"
                v-slot="{ validate, errors }">
                <ion-item v-if="field.model == 'input'" class="my-1">
                    <img v-if="field.trouverMonVet" class="logo-small" src="/img/logo_trouvermonvet.png" />
                    <ion-label v-if="field.label && field.label.name"
                      :color="errors[0] ? 'danger' : defaultColor(field)"
                      :position="field.label.position">
                      {{ $trans(field.label.name) }}
                      <span v-if="field.rules.includes('required')">*</span>
                    </ion-label>
                    <ion-input v-if="field.type != 'search'"
                      :id="field.name"
                      :name="field.name"
                      :type="field.type"
                      :slot="field.slot"
                      :disabled="field.disabled || false"
                      :min="field.min"
                      :max="field.max"
                      :autocomplete="field.autocomplete"
                      v-model="form[field.name]"
                      @input="fill(field.name, $event.target.value)"
                      @focusout="validate"
                      :value="form[field.name]"
                      :placeholder="$trans(field.placeholder)">
                    </ion-input>
                    <ion-input v-else
                        :id="field.name"
                        :name="field.name"
                        :type="field.type"
                        :slot="field.slot"
                        :disabled="field.disabled || false"
                        v-model="form[field.name]"
                        @input="$emit(field.search, $event)"
                        @focusout="validate"
                        :value="form[field.name]"
                        :placeholder="$trans(field.placeholder)">
                    </ion-input>
                </ion-item>
                <ion-list v-show="field.canSearch" class="bg-light mb-3 y-scroll">
                  <ion-item :key="item.id" @click.stop="choose(field, item)"
                    v-for="item in field.items" class="border-0 pointer">
                    <span class="small">{{ item.label }}</span>
                  </ion-item>
                </ion-list>
                <ion-item v-if="field.model == 'select'" class="my-1">
                    <img v-if="field.trouverMonVet" class="logo-small" src="/img/logo_trouvermonvet.png" />
                    <ion-label
                      :color="errors[0] ? 'danger' : defaultColor(field)"
                      :position="field.label.position">
                        {{ $trans(field.label.name) }}
                        <span v-if="field.rules.includes('required')">*</span>
                    </ion-label>
                    <ion-select
                      v-if="!field.multiple"
                      :id="field.name"
                      :interface="field.interface"
                      :interface-options="field.interfaceOptions"
                      :ok-text="field.okText"
                      :cancel-text="field.cancelText"
                      :disabled="field.disabled || false"
                      :name="field.name"
                      :type="field.type"
                      :slot="field.slot"
                      v-model="form[field.name]"
                      @ionChange="fill(field.name, $event.target.value)"
                      @focusout="validate"
                      :value="form[field.name]"
                      :placeholder="field.placeholder">
                      <ion-select-option  v-for="(item, index) in field.items"
                        :key="index" :value="item.id">
                        {{ item.label }}
                      </ion-select-option>
                    </ion-select>
                    <ion-select
                      v-else
                      :id="field.name"
                      :interface="field.interface"
                      :interface-options="field.interfaceOptions"
                      :ok-text="field.okText"
                      :cancel-text="field.cancelText"
                      :disabled="field.disabled || false"
                      :name="field.name"
                      :type="field.type"
                      :slot="field.slot"
                      multiple="true"
                      v-model="form[field.name]"
                      @ionChange="fill(field.name, $event.target.value)"
                      @focusout="validate"
                      :placeholder="$trans(field.placeholder)">
                      <ion-select-option  v-for="(item, index) in field.items"
                        :key="index" :value="item.id">
                        {{ item.label }}
                      </ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item v-if="field.model == 'textarea'" class="ion-margin-bottom ion-margin-top">
                    <ion-label
                      v-if="field.label && field.label.name"
                      :color="errors[0] ? 'danger' : defaultColor(field)"
                      :position="field.label.position">
                        {{ $trans(field.label.name) }}
                        <span v-if="field.rules.includes('required')">*</span>
                    </ion-label>
                    <ion-textarea
                      rows="3"
                      :id="field.id"
                      :name="field.name"
                      :type="field.type"
                      :slot="field.slot"
                      :disabled="field.disabled || false"
                      v-model="form[field.name]"
                      @input="fill(field.name, $event.target.value)"
                      @focusout="validate"
                      :value="form[field.name]"
                      :placeholder="$trans(field.placeholder)">
                    </ion-textarea>
                </ion-item>
                <ion-item v-if="field.model == 'datetime'" class="ion-margin-bottom ion-margin-top">
                    <ion-label
                      v-if="field.label && field.label.name"
                      :color="errors[0] ? 'danger' : defaultColor(field.label)"
                      :position="field.label.position">
                        {{ $trans(field.label.name) }}
                        <span v-if="field.rules.includes('required')">*</span>
                    </ion-label>
                    <ion-datetime
                      :id="field.id"
                      :name="field.name"
                      :min="field.min"
                      :max="field.max"
                      :slot="field.slot"
                      :display-format="field.displayFormat"
                      :picker-format="field.pickerFormat"
                      :picker-options="field.options"
                      :disabled="field.disabled || false"
                      :done-text="field.doneText"
                      :cancel-text="field.cancelText"
                      :month-short-names="field.months.join(',')"
                      v-model="form[field.name]"
                      @ionChange="fill(field.name, $event.target.value)"
                      @focusout="validate"
                      :value="form[field.name]"
                      :placeholder="$trans(field.placeholder)">
                    </ion-datetime>
                </ion-item>
                <ion-item v-if="field.model == 'checkbox'" class="ion-margin-bottom ion-margin-top">
                    <ion-label v-if="isPrepend(field)"
                      :position="field.label.position"
                      :color="errors[0] ? 'danger' : defaultColor(field)">
                        {{ $trans(field.label.name) }}
                        <span v-if="field.rules.includes('required')">*</span>
                    </ion-label>
                    <ion-checkbox
                      :name="field.name"
                      :type="field.type"
                      class="mr-2"
                      :slot="field.slot"
                      :disabled="field.disabled || false"
                      @ionChange="check(field, $event)"
                      v-model="form[field.name]"
                      :checked="setChecked(field)"
                      @focusout="validate"
                      :placeholder="$trans(field.placeholder)">
                    </ion-checkbox>
                    <ion-label
                      v-if="isAppend(field)"
                      :position="field.label.position"
                      :color="errors[0] ? 'danger' : defaultColor(field)">
                        <span class="small">{{ $trans(field.label.name) }}</span>
                        <span v-if="field.rules.includes('required')">*</span>
                    </ion-label>
                </ion-item>
                <ion-item v-if="field.model == 'file'" class="ion-margin-bottom" lines="none">
                  <img v-if="field.trouverMonVet" class="logo-small" src="/img/logo_trouvermonvet.png" />
                  <ion-label v-if="isPrepend(field)"
                    :position="field.label.position"
                    :color="errors[0] ? 'danger' : defaultColor(field)">
                      <span class="small">{{ $trans(field.label.name) }}</span>
                      <span v-if="field.rules.includes('required')">*</span>
                  </ion-label>
                  <div class="input-group pt-3">
                      <div class="image-box" v-if="field.value && field.showImage">
                          <img v-if="field.value.includes('http')" :src="field.value" :alt="field.value">
                      </div>
                      <!--div class="input-group-prepend">
                        <button :class="field.value ? 'dropdown-toggle' : ''"
                          class="btn btn-light" type="button"
                          @click="field.showImage = !field.showImage">
                          <span v-html="$trans(field.label.name)"></span>
                        </button>
                      </div-->
                    <div class="custom-file">
                      <input type="file" class="custom-file-input"
                        :name="field.name"
                        :id="field.name"
                        :placeholder="form[field.name]"
                        @change="addFile($event, field)">
                      <label class="custom-file-label" :for="field.name">
                        <span v-if="!form[field.name]">{{ $trans('choose file') }}</span>
                        <span v-else>
                          {{ form[field.name].name }}
                        </span>
                      </label>
                    </div>
                  </div>
                  <!--ion-label
                    v-if="isAppend(field)"
                    :position="field.label.position"
                    :color="errors[0] ? 'danger' : defaultColor(field)">
                      {{ $trans(field.label.name) }}
                      <span v-if="field.rules.includes('required')">*</span>
                  </ion-label>
                  <div class="image-box" v-if="field.value && field.showImage">
                    <img v-if="field.value.includes('http')" :src="field.value" :alt="field.value">
                  </div-->
                </ion-item>
                <ion-radio-group v-if="field.model == 'radio'" :name="field.name" :value="form[field.name]">
                  <ion-list-header v-if="field.label && field.label.name">
                    <ion-label
                      :position="field.label.position"
                      :color="errors[0] ? 'danger' : defaultColor(field)">
                        {{ $trans(field.label.name) }}
                        <span v-if="field.rules.includes('required')">*</span>
                    </ion-label>
                  </ion-list-header>
                  <template v-for="(item, i) in field.items">
                    <ion-item :key="'radio-' + i">
                      <ion-label
                        v-html="$trans(item.label.name)"
                        :position="item.label.position"
                        :color="defaultColor(item)"
                        v-if="isPrepend(item)" />
                      <ion-radio
                        :checked="item.checked"
                        :slot="item.slot"
                        :disabled="field.disabled || false"
                        :value="item.value"
                        :color="item.color" />
                      <ion-label
                        v-html="$trans(item.label.name)"
                        :position="item.label.position"
                        :color="defaultColor(item)"
                        v-if="isAppend(item)" />
                    </ion-item>
                    <template v-if="item.fields && item.fields.length > 0">
                      <div v-for="(child, k) in item.fields" :key="'div-' + k + '-' + i">
                        <ValidationProvider
                          :key="'validate-' + k"
                          :tag="child.tag"
                          :name="child.name"
                          :rules="child.rules"
                          v-slot="{ validate, errors }">
                          <ion-item v-if="child.model == 'input'" class="ion-margin-bottom ion-margin-top">
                              <ion-label v-if="child.label && child.label.name"
                                :color="errors[0] ? 'danger' : defaultColor(child)"
                                :position="child.label.position">
                                {{ child.label.name }}
                                <span v-if="child.rules.includes('required')">*</span>
                              </ion-label>
                              <ion-input
                                :name="child.name"
                                :type="child.type"
                                :slot="child.slot"
                                :min="child.min"
                                :disabled="child.disabled || false"
                                v-model="form[child.name]"
                                @input="fill(child.name, $event.target.value)"
                                @focusout="validate"
                                :value="form[child.name]"
                                :placeholder="child.placeholder">
                              </ion-input>
                          </ion-item>
                          <ion-item v-if="child.model == 'file'" class="ion-margin-bottom ion-margin-top" lines="none">
                            <div class="custom-file">
                              <input type="file" class="custom-file-input"
                                @change="fill(child.name, $event.target.value)"
                                :name="child.name" :id="child.name">
                              <label class="custom-file-label" :for="child.name">{{$trans('choose file')}}</label>
                            </div>
                          </ion-item>
                          <!--ion-text v-if="errors[0]">
                            <p class="io-error" v-text="errorMessage(errors[0], child.name, child.errorLabel)" />
                          </ion-text-->
                          <ion-text v-if="child.description">
                            <p class="info" v-html="child.description" />
                          </ion-text>
                        </ValidationProvider>
                      </div>
                    </template>
                  </template>
                </ion-radio-group>
                 <!--ion-text v-if="errors[0]">
                   <p class="io-error" v-text="errorMessage(errors[0], field.name, field.errorLabel)" />
                 </ion-text-->
                 <ion-text v-if="field.description">
                   <p class="info" v-html="field.description" />
                 </ion-text>
              </ValidationProvider>
              </template>
            </fieldset>
          </template>
          <slot name="fields"></slot>
        </ion-list>

        <div v-if="invalid && !hte" class="small text-danger pl-4 mb-4 pb-4">
          {{ $trans('form error message') }}
        </div>

        <div class="d-none d-md-block" :class="ccs">
            <ion-button v-if="!submitted" type="submit" :color="cbsc" :disabled="invalid" v-html="$trans(definition.button.submit.label)" />
            <ion-button v-else type="button" :color="cbsc" :disabled="true">
              <!--ion-text>{{ $trans('please wait') }}</ion-text-->
              <ion-spinner name="dots"></ion-spinner>
            </ion-button>
        </div>
        <div class="d-md-none text-center">
            <ion-button v-if="!submitted" mode="md" @click="onSubmit" :color="cbsc" :disabled="invalid">
                {{ $trans(definition.button.submit.label) }}
            </ion-button>
            <ion-button v-else mode="md" :color="cbsc" :disabled="true">
              <!--ion-text>{{ $trans('please wait') }}</ion-text-->
              <ion-spinner name="dots"></ion-spinner>
            </ion-button>
        </div>

        <slot name="footer"></slot>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
//import _ from 'lodash'
import { map } from 'lodash/core'
import formMixin from '@/mixins/form'
import logger from '@/mixins/logger'
import filesystemMixin from '@/mixins/filesystem'
/**
 * Form Composer
 *
 * @type {Object}
 */
export default {
  name: 'FormComposer',
  mixins: [formMixin, filesystemMixin, logger],
  props: ['classButtonSubmit','classContainerSubmit','classButtonSubmitColor', 'definition', 'hideTextError'],
  data () {
    return {
      submitted: false,
      cbs: this.classButtonSubmit ? this.classButtonSubmit : null,
      cbsc: this.classButtonSubmitColor ? this.classButtonSubmitColor : 'primary',
      ccs: this.classContainerSubmit ? this.classContainerSubmit : 'container-submit',
      form: {},
      hte: this.hideTextError ? this.hideTextError : false,
      showImage: [],
    }
  },
  created () {
    this.$bus.$on('populate-form', values => this.populate(values))
    this.$bus.$on('reset-form', () => this.resetForm())
  },
  methods: {
    async onSubmit () {
      this.$set(this.$data, 'submitted', true)
      this.$emit('submit', this.form)
      if (!this.isValid()) {
        this.removeSpinner()
      }
    },
    async isValid () {
       return await this.$refs.formComposer.validate()
    },
    check (field, event) {
      this.fill(field.name, event.detail.checked ? 1 : 0)
    },
    setChecked (field) {
      if (this.form[field.name] === undefined) {
          return field.checked ? true : false
      } else {
          return this.form[field.name] == 1 ? true : false
      }
    },
    choose (field, item) {
      this.log(item)
      this.fill(field.name, item.label)
      this.fill(field.hidden, item.id)
      field.canSearch = false
      if (field.select && field.selectEmit) {
        this.$emit(field.select, {
          id: item.id,
          label: item.label
        })
      }
    },
    addFile (e, field) {
      let file = e.target.files[0]
      this.fill(field.name, file)
    },
    /**
     * Pré-rempli le formulaire
     *
     * @return {Void}
     */
    populate (values) {
      map(values, (value, key) => {
        this.fill(key, value)
      })
    },
    resetForm () {
      this.removeSpinner()
      map(this.form, (value, key) => {
        this.fill(key, '')
      })
    },
    removeSpinner () {
      this.$set(this.$data, 'submitted', false)
    },
    isAppend (field) {
     return field.label
             && field.label.name
             && field.label.append
    },
    isPrepend (field) {
       return field.label
               && field.label.name
               && !field.label.append
    },
    defaultColor (field) {
       if (field && field.label) {
         return field.label.color || 'info'
       }

       return 'dark'
    },
    debug (message) {
       alert(message)
    }
  }
}
</script>
