const focus = {
  async bind (el) {
    await el.focus()
  },
  async inserted (el) {
    await el.focus()
  },
  async update (el) {
    await el.focus()
  }
}

export default focus
