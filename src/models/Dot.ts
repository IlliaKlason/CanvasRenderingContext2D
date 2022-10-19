interface ICanvas  {
    x: number;
    y: number;
}

export default class Dot {
    position: ICanvas;

    constructor(position: ICanvas) {
        this.position = position;
    }

    public render(crc: CanvasRenderingContext2D) {
        
        crc.beginPath();
        crc.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        crc.fill();
    }
}