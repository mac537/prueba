<template lang='pug'>
  div.home
    input.home__input(placeholder='Escribe aquí el titular de tu artículo')
    div.home__box
      img.home__box-icon(v-if='media === ""' :src='url' @click='showModal')
      div.home__media(v-else :style="{ backgroundImage: 'url(' + media+ ')' }")
        div.home__button
          img.home__icon(:src='pencil' @click='showModal')
</template>

<script>
import { EventBus } from '@/event-bus.js'
export default {
  name: 'home',
  data () {
    return {
      media: ''
    }
  },
  computed: {
    url () {
      return require('../assets/magnifying-glass.svg')
    },
    pencil () {
      return require('../assets/pencil.png')
    }
  },
  methods: {
    showModal () {
      EventBus.$emit('show-modal', true)
    }
  },
  mounted () {
    EventBus.$on('item-selected', val => {
      this.media = val
    })
  }
}
</script>

<style lang='scss' scoped>
.home{
  width: 600px;
  margin: 0 auto;
  &__input{
    border: 0;
    width: 100%;
    height: 40px;
    font-size: rem(30);
    font-weight: bold;
    outline: none;
    color: #707070;
  }

  &__media{
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &__box{
    position: relative;
    margin-top: 20px;
    background-color: #E3E3E3;
    padding: 30px 100px;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &-icon{
      cursor: pointer;
      max-width: 100px;
      color: #2699FB;
    }
  }

  &__button{
    width: 60px;
    height: 60px;
    background-color: #000;
    border-radius: 100%;
    position: absolute;
    right: 15px;
    bottom: 15px;
  }

  &__icon{
    max-width: 100%;
    height: auto;
    cursor: pointer;
  }
}
</style>
