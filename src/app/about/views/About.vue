<template>
    <section class="about">
        <div ref="container" class="container">
            <h1 class="title">N.P.O.D</h1>
            <p class="text subtitle">Nasa Picture of the Day</p>

            <p class="text">
                Is an app developped by
                <a class="link" href="https://fr.linkedin.com/in/trebonlandry" target="blank">Landry Trebon</a>
                using the open API "APOD" of the NASA.
            </p>

            <p class="text">
                The NASA has an
                <a class="link" href="https://apod.nasa.gov/apod/astropix.html" target="blank">official website</a>
                to publish astronomy pictures every day.
            </p>

            <div class="text">
                The NASA shares freely a multitude of 
                <a class="link" href="https://api.nasa.gov/" target="blank">Open APIs</a>
                accessible for developpers.
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import DIContainer from "@/di-container";
import { CursorHoverService } from "@/shared/services/cursor-hover.service";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class About extends Vue {
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
        const containerRef: HTMLElement = this.$refs.container as HTMLElement;
        const items: NodeListOf<HTMLElement> = containerRef.querySelectorAll(".link");
        items.forEach(i => this.cursorService.addFocusableElement(i));
  }
}
</script>

<style lang="scss" scoped>
.about {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.container {
    position: relative;
    min-width: 380px;
    padding: 10px;
}

.title {
    font-size: 85px;
    font-family: "Raleway", sans-serif;
    color: var(--color-secondary);
    margin: 0;
    letter-spacing: 4px;
}

.text {
    margin: 0;
    margin-left: 5px;
    margin-bottom: 5px;

    a {
        text-decoration: none;
        color: var(--color-primary);
    }
}
.subtitle {
    font-family: "Raleway", sans-serif;
    letter-spacing: 4px;
    background-color: var(--color-secondary);
    color: var(--color-bg);
    font-size: 18px;
    margin-bottom: 30px;
    display: inline-block;
    padding: 5px 10px;
}
</style>