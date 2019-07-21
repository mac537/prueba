<template lang='pug'>
  div.hamburger-menu(:class='{"hamburger-menu--close": status}' @click='close = !close')
    span.hamburger-menu__bar.hamburger-menu__bar--top
    span.hamburger-menu__bar.hamburger-menu__bar--middle
    span.hamburger-menu__bar.hamburger-menu__bar--bottom
</template>

<script>
export default {
  name: 'HamburgerMenu',
  data () {
    return {
      close: false
    }
  },
  computed: {
    status () {
      return this.close || this.default
    }
  },
  props: {
    default: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
.hamburger-menu{
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;

  &--close{
    .hamburger-menu__bar--top{
      transform: rotate(45deg);
      top: 49%;
    }
    .hamburger-menu__bar--middle, .hamburger-menu__bar--bottom{
      transform: rotate(-45deg);
      top: 49%;
    }

    .hamburger-menu__bar--bottom{
      width: 100%;
    }
  }

  &__bar{
    position: absolute;
    background-color: $primary;
    height: 5px;
    width: 100%;
    border-radius: 8px;
    transition: all .3s;

    &--top{
      top: 15%;
    }

    &--middle{
      top: 45%;
    }

    &--bottom{
      top: 75%;
      width: 60%;
    }
  }
}
</style>
