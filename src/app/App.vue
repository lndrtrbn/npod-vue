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
  height: 100%;
}
</style>
