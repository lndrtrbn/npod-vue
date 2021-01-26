<template>
    <div ref="smallCursor" class="cursor cursor--small"></div>
    <canvas id="cursorCanvas" class="cursor cursor--canvas" resize></canvas>
</template>

<script lang="ts">
import * as paper from "paper";
import { Options, Vue } from "vue-class-component";
import { CursorPosition } from "@/shared/interfaces/cursor-position.interface";
import { CursorCircleConf } from "@/shared/interfaces/cursor-conf.interface";
import { CursorHoverService } from "../services/cursor-hover.service";
import DIContainer from "@/di-container";

@Options({})
export default class Cursor extends Vue {
    cursorService!: CursorHoverService;
    // ======

    position: CursorPosition = { x: -100, y: -100 };
    lastPosition: CursorPosition = { x: -100, y: -100 };
    stuckPosition: CursorPosition|null = { x: -100, y: -100 };

    circleConf: CursorCircleConf = {
        strokeColor: new paper.Color(1, 1, 1, 0.2),
        strokeColorHover: new paper.Color(0.176, 0.855, 0.722, 0.8),
        strokeWidth: 1,
        segments: 8,
        radius: 15
    };

    // Determines if the cursor should stick to an element.
    isStuck = false;
    isNoisy = false;

    // Paper object containing our circle.
    polygon?: paper.Path.RegularPolygon;

    /**
     * Retrieve dependancies.
     * 
     * cursorService: To listen for stuck position.
     */
    beforeCreate() {
        this.cursorService = DIContainer.get(CursorHoverService);
    }

    /**
     * Starts cursor animation when the dom is ready.
     */
    mounted() {
        document.addEventListener("mousemove", this.updateCursorPosition);
        this.cursorService.stuckPosition.subscribe(p => this.stuckPosition = p);
        new paper.Project("cursorCanvas");

        // The base shape for the noisy circle.
        this.polygon = this.buildCirclePolygon();
        // The draw loop of Paper.js.
        // (60fps with requestAnimationFrame under the hood).
        paper.view.onFrame = () => {
            this.renderCircleCursor();
            this.renderSmallCursor();
        };
    }

    unmounted() {
        document.removeEventListener("mousemove", this.updateCursorPosition);
    }

    /**
     * Computes the position of the circle of the cursor.
     */
    renderCircleCursor(): void {
        if (this.polygon) {
            // function for linear interpolation of values
            const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
            // Using linear interpolation, the circle will move 0.2 (20%)
            // of the distance between its current position and the mouse
            // coordinates per Frame.
            if (!this.stuckPosition) {
                this.lastPosition.x = lerp(this.lastPosition.x, this.position.x, 0.2);
                this.lastPosition.y = lerp(this.lastPosition.y, this.position.y, 0.2);
                this.polygon.strokeColor = this.circleConf.strokeColor;
                if (this.isNoisy) {
                    this.polygon.scale(0.5, 200);
                    this.isNoisy = false;
                }
            } else {
                this.lastPosition.x = lerp(this.lastPosition.x, this.stuckPosition.x, 0.2);
                this.lastPosition.y = lerp(this.lastPosition.y, this.stuckPosition.y, 0.2);
                this.polygon.strokeColor = this.circleConf.strokeColorHover;
                if (!this.isNoisy) {
                    this.polygon.scale(2, 0.005);
                    this.isNoisy = true;
                }
            }
            this.polygon.position = new paper.Point(this.lastPosition.x, this.lastPosition.y);
        }
    }

    /**
     * Computes the position of the small cursor.
     */
    renderSmallCursor(): void {
        const newPosition = `translate(${this.position.x}px, ${this.position.y}px)`;
        const smallCursor: HTMLDivElement = this.$refs.smallCursor as HTMLDivElement;
        smallCursor.style.transform = newPosition;
    }

    /**
     * Update the position with the one retrieve from mouse event.
     * 
     * @param event The mouse event used to get position.
     */
    private updateCursorPosition(event: MouseEvent) {
        this.position = { x: event.clientX, y: event.clientY };
    }

    /**
     * Builds the circle polygon that follow the cursor.
     * 
     * @returns The paper object Polygon.
     */
    private buildCirclePolygon(): paper.Path.RegularPolygon {
        const polygon = new paper.Path.RegularPolygon(
        new paper.Point(0, 0),
        this.circleConf.segments,
        this.circleConf.radius
        );
        polygon.strokeColor = this.circleConf.strokeColor;
        polygon.strokeWidth = this.circleConf.strokeWidth;
        polygon.smooth();
        return polygon;
    }
}
</script>

<style scoped lang="scss">
.cursor {
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
}
.cursor--small {
    width: 5px;
    height: 5px;
    left: -2.5px;
    top: -2.5px;
    border-radius: 50%;
    z-index: 11000;
    background: var(--color-text);
}
.cursor--canvas {
    width: 100vw;
    height: 100vh;
    z-index: 12000;
}
</style>