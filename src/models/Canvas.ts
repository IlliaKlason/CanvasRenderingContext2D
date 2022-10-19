import Line from "./Line";
import React from "react";
import Dot from "./Dot";

class Canvas {
    line: Line[];
    drawingLine: Line | null;
    crc: CanvasRenderingContext2D | null;
    isAnimated: boolean;

    constructor() {
        this.line = [];
        this.crc = null;
        this.isAnimated = false;
        this.drawingLine = null;
    }

    render(interval: number) {
        if (!this.ctx) return;

        this.crc?.clearRect(0, 0, this.crc!.canvas.clientWidth, this.crc!.canvas.clientHeight);
        this.lines.forEach(line => line.render(interval, this.ctx!));
        this.drawingLine?.render(interval, this.ctx!);

        this.getDots().forEach(dot => dot.render(this.ctx!));
    }

    private getDots() {
        const dots: Dot[] = [];
        const lines = [...this.line];
        !!this.drawingLine && lines.push(this.drawingLine);

        
        for (let i = 0; i < lines.length; i++) {
            for (let j = i + 1; j < lines.length; j++) {
                const x1 = lines[i].from.x;
                const y1 = lines[i].from.y;

                const x2 = lines[i].to.x;
                const y2 = lines[i].to.y;

                const x3 = lines[j].from.x;
                const y3 = lines[j].from.y;

                const x4 = lines[j].to.x;
                const y4 = lines[j].to.y;

                const ua = ((x4-x3)*(y1-y3)-(y4-y3)*(x1-x3))/((y4-y3)*(x2-x1)-(x4-x3)*(y2-y1));
                const ub = ((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/((y4-y3)*(x2-x1)-(x4-x3)*(y2-y1));

                if ((ua < 0 || ua > 1) || (ub < 0 || ub > 1)) continue;

                dots.push(new Dot({
                    x: x1 + ua * (x2 - x1),
                    y: y1 + ua * (y2 - y1)
                }))
            }
        }

        return dots;
    }

    collapse() {
        if (this.line.length === 0) return;

        this.lines.forEach(line => line.isCollapse = true);
        this.isAnimated = true;
        this.drawingLine = null;

        const start = Date.now();
        const f = (timestamp: number) => {
            const interval = Date.now() - start;

            if (interval > 3000) {
                this.lines = [];
                this.isAnimated = false;
            } else {
                requestAnimationFrame(f);
            }

            this.render(interval)
        }

        requestAnimationFrame(f);
    }

    handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        if (this.drawingLine && !this.isAnimated) {
            const point = {
                x: e.pageX - 50, 
                y: e.pageY - 50
            }
            this.drawingLine = new Line(this.drawingLine.from, point)

            this.render(0);
        }
    }

    handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        if (this.isAnimated) return;

        if (e.button === 2) {
            this.drawingLine = null;
            this.render(0);
            return;
        }

        if (this.drawingLine) {
            this.line.push(this.drawingLine);
            this.drawingLine = null;
        } else {
            const point = {
                x: e.pageX - 50, 
                y: e.pageY - 50
            }
            this.drawingLine = new Line(point, point);
        }
    }

    get lines(): Line[] {
        return this.line;
    }

    set lines(value: Line[]) {
        this.line = value;
    }

    get ctx(): CanvasRenderingContext2D | null {
        return this.crc;
    }

    set ctx(value: CanvasRenderingContext2D | null) {
        this.crc = value;

        if (this.crc) {    
            this.crc.strokeStyle = "#0057b8";
            this.crc.fillStyle = "#ffd700";
            this.crc.lineWidth = 1;
        }

        this.render(0);
    }

    get isAnimate(): boolean {
        return this.isAnimated;
    }

    set isAnimate(value: boolean) {
        this.isAnimated = value;
    }
}

export default Canvas;