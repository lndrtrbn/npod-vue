<template>
  <Cursor></Cursor>
  <Header></Header>
  <router-view/>
</template>

<script lang="ts">
import Cursor from "@/shared/components/Cursor.vue";
import Header from "@/shared/components/Header.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: { Cursor, Header }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
