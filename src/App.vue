<template lang='pug'>
  div#app
    header.header
      div.header__left
        hamburger-menu
      div.header__right
        button.header__button guardar
        a.header__link vista previa
    router-view
    transition(name="modal")
      modal(v-if='showModal')
</template>

<script>
import HamburgerMenu from '@/components/HamburgerMenu.vue'
import Modal from '@/components/Modal.vue'
import { EventBus } from '@/event-bus.js'
export default {
  name: 'app',
  data () {
    return {
      showModal: false
    }
  },
  components: {
    'hamburger-menu': HamburgerMenu,
    'modal': Modal
  },
  mounted () {
    EventBus.$on('show-modal', val => {
      this.showModal = val
    })
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body{
  margin: 30px 50px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header{
  display: flex;
  justify-content: space-between;
  &__right{
    display: flex;
    flex-direction: column;
  }
  &__button{
    color: $primary;
    padding: 10px;
    border: 2px solid $primary;
    border-radius: 4px;
    text-transform: uppercase;
    font-size: rem(16);
    font-weight: bold;
  }
  &__link{
    margin-top: 20px;
    text-transform: uppercase;
    color: $primary;
    font-size: rem(16);
    font-weight: bold;
    border-bottom: 2px solid $primary;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
