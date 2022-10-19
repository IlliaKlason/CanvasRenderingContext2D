import {RefObject, FC, useEffect, useRef, useState} from "react";
import Canvas from "../models/Canvas";

interface CanvasProps {
    canvas: Canvas;
}

const useRenderingContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    
    useEffect(() => {
        if (!canvasRef.current) setCtx(null);
        else setCtx(canvasRef.current.getContext('2d'));
    }, [canvasRef]);

    return ctx;
}
const CanvasComponent: FC<CanvasProps> = ({ canvas }) => {
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 100);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = useRenderingContext(canvasRef);


 
    useEffect(() => {
        canvas.ctx = ctx;
        const listener = () => {
            setCanvasWidth(window.innerWidth - 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [canvas, ctx]);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={600}
            onMouseMove={canvas.handleMouseMove.bind(canvas)}
            onMouseDown={canvas.handleMouseDown.bind(canvas)}
        />
    )
}

export default CanvasComponent;