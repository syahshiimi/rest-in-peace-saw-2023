import getAsyncData from '~/assets/js/utils/datas/getAsyncData'
import slugsQuery from '~/assets/graphql/slugs.js'
import livestreamQuery from '~/assets/graphql/livestream.js'
import { shuffle } from 'lodash'

export const state = () => ({
  path: process.env.NODE_ENV === 'production' ? '/' : '/',
  isNavOpen: false,
  isSearchOpen: false,
  isShareOpen: false,
  isSidebarOpen: false,
  isLoaderAnimationDone: false,
  hideLoader: false,
  nextArticleClicked: false,
  isDarkMode: false,
  allPresentations: {},
  allRepresentations: {},
  activeFilters: [],
  updateScrollTrigger: 0,
  allTags: [],
  isPhone: false,
  livestream: {},
  broadcast: {},
  isBroadcastOpen: false,
  isScheduleOpen: false,
  isLive: false,
  isMuted: true,
  youtubePlayCheck: 0,
  youtubeHasMountedOnce: 0,
  youtubeHasPlayedOnce: 0,
  activeDayGlobal: null,
  activeProgrammeGlobal: null
})
export const mutations = {
  SET(state, obj) {
    state[obj.property] = obj.value
  },
  SET_NAV_OPEN(state, bool) {
    state.isNavOpen = bool
  },
  TOGGLE_NAV_OPEN(state) {
    state.isNavOpen = !state.isNavOpen
  },
  SET_SEARCH_OPEN(state, bool) {
    state.isSearchOpen = bool
  },
  TOGGLE_SEARCH_OPEN(state) {
    state.isSearchOpen = !state.isSearchOpen
  },
  SET_SCHEDULE_OPEN(state, bool) {
    state.isScheduleOpen = bool
  },
  TOGGLE_SCHEDULE_OPEN(state) {
    state.isScheduleOpen = !state.isScheduleOpen
  },
  SET_BROADCAST_OPEN(state, bool) {
    state.isBroadcastOpen = bool
  },
  TOGGLE_BROADCAST_OPEN(state) {
    state.isBroadcastOpen = !state.isBroadcastOpen
  },
  SET_SHARE_OPEN(state, bool) {
    state.isShareOpen = bool
  },
  TOGGLE_SHARE_OPEN(state) {
    state.isShareOpen = !state.isShareOpen
  },
  TOGGLE_MUTED(state) {
    state.isMuted = !state.isMuted
  },
  SET_SIDEBAR_OPEN(state, bool) {
    state.isSidebarOpen = bool
  },
  TOGGLE_SIDEBAR_OPEN(state) {
    state.isSidebarOpen = !state.isSidebarOpen
  },
  SET_LOADER_ANIMATION(state, bool) {
    state.isLoaderAnimationDone = bool
  },
  SET_HIDE_LOADER(state, bool) {
    state.hideLoader = bool
  },
  SET_ALL_PRESENTATIONS(state, data) {
    state.allPresentations = data.allPresentations
  },
  SET_ALL_REPRESENTATIONS(state, data) {
    state.allRepresentations = data.allRepresentations
  },
  SET_NEXTARTICLE_CLICKED(state, bool) {
    state.nextArticleClicked = bool
  },
  SET_DARK_MODE(state, bool) {
    state.isDarkMode = bool
  },
  ALL_TAGS(state, { tags }) {
    state.allTags = tags
  },
  SHUFFLE_DATA(state) {
    state.allTags = _.shuffle(state.allTags)
  },
  SET_FILTER(state, { filter }) {
    const checked = filter.val
    const active = filter.filter
    const exist = state.activeFilters.find((item) => filter.filter === item)
    if (checked && !exist) {
      state.activeFilters.push(active)
    } else if (!checked && exist) {
      state.activeFilters.splice(state.activeFilters.indexOf(active), 1)
    }
    state.activeFilters = state.activeFilters
  },
  CLEAR_FILTER(state) {
    state.activeFilters = []
  },
  SET_UPDATE_SCROLLTRIGGER(state, data) {
    state.updateScrollTrigger = data
  },
  SET_LIVESTREAM(state, data) {
    state.livestream = data.livestream
  },
  SET_BROADCAST(state, data) {
    state.broadcast = data.broadcast
  },
  SET_CHECK_YOUTUBE(state, data) {
    state.youtubePlayCheck = data
  },
  SET_YOUTUBE_HAS_PLAYED_ONCE(state, data) {
    state.youtubeHasPlayedOnce = data
  },
  SET_YOUTUBE_HAS_MOUNTED_ONCE(state, data) {
    state.youtubeHasMountedOnce = data
  },
  SET_ACTIVEDAY_GLOBAL(state, data) {
    state.activeDayGlobal = data
  },
  SET_ACTIVEPROGRAMME_GLOBAL(state, data) {
    state.activeProgrammeGlobal = data
  }
}
export const actions = {
  nuxtServerInit({ context, commit }) {
    return getAsyncData(context, slugsQuery, 'allRepresentations').then(
      (data) => {
        commit('SET_ALL_REPRESENTATIONS', data)
        return getAsyncData(context, slugsQuery, 'allPresentations').then(
          (data) => {
            commit('SET_ALL_PRESENTATIONS', data)
            return getAsyncData(context, livestreamQuery, 'livestream').then(
              (data) => {
                commit('SET_LIVESTREAM', data)
                return getAsyncData(context, livestreamQuery, 'broadcast').then(
                  (data) => {
                    commit('SET_BROADCAST', data)
                  }
                )
              }
            )
          }
        )
      }
    )
  },
  setNavOpen({ commit }, bool) {
    commit('SET_NAV_OPEN', bool)
  },
  toggleNavOpen({ commit }) {
    commit('TOGGLE_NAV_OPEN')
  },
  setScheduleOpen({ commit }, bool) {
    commit('SET_SCHEDULE_OPEN', bool)
  },
  toggleScheduleOpen({ commit }) {
    commit('TOGGLE_SCHEDULE_OPEN')
  },
  setBroadcastOpen({ commit }, bool) {
    commit('SET_BROADCAST_OPEN', bool)
  },
  toggleBroadcastOpen({ commit }) {
    commit('TOGGLE_BROADCAST_OPEN')
  },
  setSearchOpen({ commit }, bool) {
    commit('SET_SEARCH_OPEN', bool)
  },
  toggleSearchOpen({ commit }) {
    commit('TOGGLE_SEARCH_OPEN')
  },
  setShareOpen({ commit }, bool) {
    commit('SET_SHARE_OPEN', bool)
  },
  toggleShareOpen({ commit }) {
    commit('TOGGLE_SHARE_OPEN')
  },
  toggleMuted({ commit }) {
    commit('TOGGLE_MUTED')
  },
  setSidebarOpen({ commit }, bool) {
    commit('SET_SIDEBAR_OPEN', bool)
  },
  toggleSidebarOpen({ commit }) {
    commit('TOGGLE_SIDEBAR_OPEN')
  },
  setFirstLoaderDone({ commit }, bool) {
    commit('SET_LOADER_ANIMATION', bool)
  },
  setHideLoader({ commit }, bool) {
    commit('SET_HIDE_LOADER', bool)
  },
  setNextArticleClicked({ commit }, bool) {
    commit('SET_NEXTARTICLE_CLICKED', bool)
  },
  setDarkMode({ commit }, bool) {
    commit('SET_DARK_MODE', bool)
  },
  setUpdateScrollTrigger({ commit }, val) {
    commit('SET_UPDATE_SCROLLTRIGGER', val)
  },
  shuffleData({ commit }) {
    commit('SHUFFLE_DATA')
  },
  setCheckYoutubePlay({ commit }, val) {
    commit('SET_CHECK_YOUTUBE', val)
  },
  setYoutubeHasPlayedOnce({ commit }, val) {
    commit('SET_YOUTUBE_HAS_PLAYED_ONCE', val)
  },
  setYoutubeHasMountedOnce({ commit }, val) {
    commit('SET_YOUTUBE_HAS_MOUNTED_ONCE', val)
  },
  setActiveDayGlobal({ commit }, val) {
    commit('SET_ACTIVEDAY_GLOBAL', val)
  },
  setActiveProgrammeGlobal({ commit }, val) {
    commit('SET_ACTIVEPROGRAMME_GLOBAL', val)
  }
}

export const getters = {
  allBlocks(state) {
    let pBlocks = []
    let rBlocks = []
    if (!state.allRepresentations && !state.allPresentations) return false
    if (state.allPresentations && state.allRepresentations) {
      pBlocks = state.allPresentations.map((block) => block.content).flat(1)
      rBlocks = state.allRepresentations.map((block) => block.content).flat(1)
      return [...pBlocks, ...rBlocks]
    }
  },
  presentationsBlock(state) {
    let pBlocks = []
    if (!state.allPresentations) return false
    if (state.allPresentations) {
      pBlocks = state.allPresentations.map((block) => block.content).flat(1)
      return [...pBlocks]
    }
  },
  removeDuplicates(state, getters) {
    if (!state.allRepresentations) return false
    if (state.allRepresentations.length > 0) {
      let rBlocks = state.allRepresentations
        .map((block) => block.content)
        .flat(1)
      return getters.allBlocks.filter((item) => {
        return rBlocks.includes(item) === false
      })
    }
  },
  hasBlocks(state, getters) {
    if (!getters.removeDuplicates) return false
    return getters.removeDuplicates.filter((item) => {
      return item.content.tag
        ? item.content.tag.length > 0
        : null || item.content.reference
        ? item.content.reference.categoryName
        : null
    })
  },
  filteredBlocks(state, getters) {
    if (!getters.hasBlocks) return []
    let blocks = [...getters.hasBlocks]
    if (state.activeFilters.length) {
      let filterBlock = blocks.filter((block) => {
        if (block.content.tag) {
          let tagBlock = block.content.tag.some((tag) => {
            return state.activeFilters.indexOf(tag) !== -1
          })
          if (tagBlock) {
            return true
          }
        }
        if (block.content.reference) {
          let catBlock =
            state.activeFilters.indexOf(
              block.content.reference.categoryName
            ) !== -1
          return catBlock
        }
        return false
      })
      return filterBlock
    }
    return []
  },
  getAll(state, getters) {
    let tags = getters.allBlocks.map((block) => block.content.tag).flat(1)
    return [...tags]
  },
  getCategory(state, getters) {
    let categories = getters.presentationsBlock
      .map((block) =>
        block.content.reference ? block.content.reference.categoryName : null
      )
      .flat(1)
    return [...categories]
  },
  getUniqCategory(state, getters) {
    let uniq = [...new Set(getters.getCategory)]
    return uniq.filter((el) => {
      return el != null
    })
  },
  getUniq(state, getters) {
    let uniq = [...new Set(getters.getAll)]
    return uniq.filter((el) => {
      return el != null
    })
  },
  getFrequency(state, getters) {
    let frequency = {}
    let allTags = getters.getAll.filter((el) => {
      return el != null
    })
    allTags.forEach((tag) => {
      if (frequency[tag]) {
        frequency[tag]++
      } else {
        frequency[tag] = 1
      }
    })
    return frequency
  },
  sortbyFrequency(state, getters) {
    return getters.getUniq.sort(
      (a, b) => getters.getFrequency[b] - getters.getFrequency[a]
    )
  },
  removeFilter(state, getters) {
    if (!state.allTags) return false
    return state.allTags.filter((item) => {
      return state.activeFilters.includes(item) === false
    })
  },
  removeCategory(state, getters) {
    if (!getters.getUniqCategory) return false
    return getters.getUniqCategory.filter((item) => {
      return state.activeFilters.includes(item) === false
    })
  }
}
