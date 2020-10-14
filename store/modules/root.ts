import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
const store = new Vuex.Store({})

@Module({ namespaced: false, dynamic: true, store, name: 'root' })
export default class extends VuexModule {
  _darkMode = false
  _sideNav: null | object = null
  _isEditing = false

  @Mutation
  setDarkMode(darkMode: boolean) {
    this._darkMode = darkMode
    Cookies.set('dark_mode', darkMode.toString(), { expires: 365 })
  }

  @Mutation setIsEditing(val: boolean) {
    this._isEditing = val
  }

  @Mutation
  setSideNav(sideNav: object) {
    this._sideNav = sideNav
  }

  get darkMode() {
    return this._darkMode
  }

  get isEditing() {
    return this._isEditing
  }

  get sideNav() {
    return this._sideNav
  }
}
