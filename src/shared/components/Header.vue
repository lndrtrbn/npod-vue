<template>
    <header>
        <nav class="menu" ref="navigation">
            <router-link class="link" to="/apod/today">Picture of the Day</router-link>
            <router-link class="link" to="/apod/all-pictures">All pictures</router-link>
            <router-link class="link" to="/about">About</router-link>
        </nav>
    </header>
</template>

<script lang="ts">
import DIContainer from "@/di-container";
import { Options, Vue } from "vue-class-component";
import { CursorHoverService } from "../services/cursor-hover.service";

@Options({})
export default class Header extends Vue {
    cursorService!: CursorHoverService;

    /**
     * Retrieve dependancies.
     * 
     * cursorService: To manage the cursor animation on the menu.
     */
    beforeCreate() {
        this.cursorService = DIContainer.get(CursorHoverService);
    }

    mounted(): void {
        // Fetch each item of the menu and mark them for the menu animation
        // that is managed in the cursorService.
        const menu: HTMLElement = this.$refs.navigation as HTMLElement;
        const menuItems: NodeListOf<HTMLElement> = menu.querySelectorAll(".link");
        menuItems.forEach(i => this.cursorService.addFocusableElement(i));
  }
}
</script>

<style scoped lang="scss">
header {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
}

.menu {
    display: flex;
    height: 60px;
    align-items: flex-end;
    justify-content: flex-end;
    padding-right: 40px;
}

.link {
    color: var(--color-text-half);
    text-shadow: 0px 0px 5px var(--color-bg);
    text-decoration: none;
    margin-right: 30px;

    &:hover, &.router-link-active {
        color: var(--color-primary);
    }
}
</style>