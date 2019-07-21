<template lang='pug'>
  .modal
    .modal__wrapper
      .modal__container
        .modal__filter
          .modal__filter-item.modal__filter-left
            hamburger-menu(
              :default='true'
              @click.native='closeModal')
          .modal__filter-item.modal__filter-center
            .modal__filter-fieldset
              .modal__filter-label Sólo lo mío
              toggle-button(
                v-model="ownContent"
                :labels="true"
                color="#2699FB"
                @change="onChangeEventHandler")
            .modal__filter-fieldset
              .modal__filter-label Webs
              multiselect.modal__select(
                v-model="site"
                @input="onChangeEventHandler"
                :options="sitesOptions"
                :searchable="false"
                :close-on-select="false"
                :show-labels="false")
            .modal__filter-fieldset
              .modal__filter-label Tipos
              multiselect.modal__select(
                v-model="type"
                @input="onChangeEventHandler"
                :options="typesOptions"
                :searchable="false"
                :close-on-select="false"
                :show-labels="false")
          .modal__filter-item.modal__filter-right
            input.modal__search-input(v-model='search' placeholder='Introduce tu búsqueda')
        div.modal__items
          template(v-for='(item, $index) in filteredArticles')
            div.modal__item(:style="{ backgroundImage: 'url(' + (item.type === 'video' ? item.thumbnail.url : item.url) + ')' }")
              div.modal__item-inner
                div.modal__item-name {{ item.name }}
                div.modal__item-resolution(v-if='item.width') {{ item.width }}x{{ item.height }}
                div.modal__item-license Licencia: {{ item.license }}
                button.modal__item-button(@click='insertImage(item)') Insertar
        infinite-loading(:identifier="infiniteId" @infinite="infiniteHandler")
          div(slot="no-more") No hay más artículos
</template>

<script>
import HamburgerMenu from '@/components/HamburgerMenu.vue'
import InfiniteLoading from 'vue-infinite-loading'
import Multiselect from 'vue-multiselect'
import { EventBus } from '@/event-bus.js'
export default {
  name: 'Modal',
  components: {
    InfiniteLoading,
    Multiselect,
    'hamburger-menu': HamburgerMenu
  },
  data () {
    return {
      search: '',
      page: 1,
      items: [],
      ownContent: false,
      infiniteId: +new Date(),
      site: 'Todas',
      sitesOptions: [
        'Todas',
        'computerhoy',
        'autobild',
        'businessinsider'
      ],
      type: 'Todos',
      typesOptions: [
        'Todos',
        'video',
        'image',
        'galería'
      ]
    }
  },
  computed: {
    filteredArticles () {
      let result = this.items.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
      return result
    }
  },
  methods: {
    onChangeEventHandler (val) {
      this.page = 1
      this.items = []
      this.infiniteId += 1
    },
    insertImage (item) {
      let url
      url = item.type === 'video' ? item.thumbnail.url : item.url
      EventBus.$emit('show-modal', false)
      EventBus.$emit('item-selected', url)
    },
    closeModal () {
      EventBus.$emit('show-modal', false)
    },
    infiniteHandler ($state) {
      let url
      if (this.site !== 'Todas' && this.type === 'Todos' && !this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&site=${this.site}`
      } else if (this.site === 'Todas' && this.type !== 'Todos' && !this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&type=${this.type}`
      } else if (this.site === 'Todas' && this.type === 'Todos' && this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&author.id=777`
      } else if (this.site !== 'Todas' && this.type !== 'Todos' && !this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&site=${this.site}&type=${this.type}`
      } else if (this.site !== 'Todas' && this.type === 'Todos' && this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&site=${this.site}&author.id=777`
      } else if (this.site === 'Todas' && this.type !== 'Todos' && this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&type=${this.type}&author.id=777`
      } else if (this.site !== 'Todas' && this.type !== 'Todos' && this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&site=${this.site}&type=${this.type}&author.id=777`
      } else if (this.site === 'Todas' && this.type === 'Todos' && !this.ownContent) {
        url = `http://localhost:3000/api?_page=${this.page}&_limit=10`
      }
      this.$store.dispatch('fetchData', url).then(response => {
        if (response.data.length) {
          setTimeout(() => {
            this.page += 1
            this.items.push(...response.data)
            $state.loaded()
          }, 1000)
        } else {
          $state.complete()
        }
      }).catch(err => {
        console.warn(err)
      })
    }
  },
  created () {
    this.infiniteId += 1
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang='scss' scoped>
.modal{
  position: absolute;
  overflow: auto;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    width: 98%;
    margin: 1% auto;
    padding: 20px 30px;
    background-color: $white;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  &__filter{
    display: flex;
    align-items: center;

    &-item{
      flex: 1;
    }

    &-center{
      display: flex;
      flex: 2;
    }

    &-fieldset{
      min-width: 100px;
      margin-right: 30px;
    }

    &-label{
      color: $secundary;
      font-size: rem(12);
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
  }

  &__search-input{
    width: 100%;
    padding: 10px;
    border: 1px solid $primary;
    font-size: rem(20);
    &:after{
      content: '';
      width: 30px;
      height: 30px;

    }
  }

  &__items{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__item{
    flex: 1 0 365px;
    margin: 15px;
    background-size: cover;
    background-position: center;
    height: 300px;
    max-width: 365px;
    transition: all .3s;
    position: relative;

    &:before{
      content: '';
      background: transparent;
      transition: all .3s;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
    }

    &-inner{
      padding: 15px;
      opacity: 0;
      visibility: hidden;
      position: relative;
      height: 100%;
    }

    &-name{
      color: $white;
      font-size: rem(24);
      font-weight: bold;
    }

    &-resolution, &-license{
      color: $white;
      font-size: rem(20);
      font-weight: bold;
      margin-top: 15px;
    }

    &-button{
      padding: 10px;
      background-color: $primary;
      border: none;
      border-radius: 4px;
      text-transform: uppercase;
      font-size: rem(16);
      font-weight: bold;
      color: $white;
      position: absolute;
      bottom: 15px;
      right: 15px;
      cursor: pointer;
    }

    &:hover{
      .modal__item-inner{
        opacity: 1;
        visibility: visible;
      }

      &:before{
        background: rgba(0, 0, 0, .8);
      }
    }
  }

  &__select{
    width: 200px;
  }
}
</style>
