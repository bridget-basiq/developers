import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
const store = new Vuex.Store({})

@Module({ namespaced: false, dynamic: true, store, name: 'root' })
export default class extends VuexModule {
  _darkMode = false
  _sideNav: null | object = null

  @Mutation
  setDarkMode(darkMode: boolean) {
    this._darkMode = darkMode
    Cookies.set('dark_mode', darkMode.toString(), { expires: 365 })
  }

  @Mutation
  setSideNav(sideNav: object) {
    this._sideNav = sideNav
  }

  get darkMode() {
    return this._darkMode
  }

  get sideNav() {
    return this._sideNav
  }
}
