interface ICanvas  {
    x: number;
    y: number;
}

export default class Line {
     scale: ICanvas;
     initialFrom: ICanvas;
     initialTo: ICanvas;
     from: ICanvas;
     to: ICanvas;
     isCollapse: boolean;

    constructor(from: ICanvas, to: ICanvas) {
        this.initialFrom = {...from};
        this.from = {...from};
        this.initialTo = {...to};
        this.to = {...to};
        this.isCollapse = false;
        this.scale = {
            x: this.initialTo.x - this.initialFrom.x,
            y: this.initialTo.y - this.initialFrom.y
        }
    }

    render(interval: number, crc: CanvasRenderingContext2D) {
        if (this.isCollapse) this.collapse(interval);

        crc.beginPath();
        crc.moveTo(this.from.x, this.from.y);
        crc.lineTo(this.to.x, this.to.y);
        crc.stroke();
    }

    collapse(interval: number) {
        if (!this.scale) return;

        const d = {
            x: this.scale.x / 2 / 3000 * interval,
            y: this.scale.y / 2 / 3000 * interval,
        }

        this.from.x = this.initialFrom.x + d.x;
        this.from.y = this.initialFrom.y + d.y;
        this.to.x = this.initialTo.x - d.x;
        this.to.y = this.initialTo.y - d.y;
    }

    get size(): ICanvas {
        return this.scale;
    }

    get fromThis(): ICanvas {
        return this.from;
    }

    get toThis(): ICanvas {
        return this.to;
    }

    set isCollapses(value: boolean) {
        this.isCollapse = value;
    }
}
