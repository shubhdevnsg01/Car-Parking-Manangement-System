import React from 'react';
import Handler, { HandlerOptions } from './handlers/Handler';
import './styles/canvas.less';
import './styles/contextmenu.less';
import './styles/fabricjs.less';
import './styles/tooltip.less';
import { FabricCanvas } from './utils';
export interface CanvasInstance {
    handler: Handler;
    canvas: FabricCanvas;
    container: HTMLDivElement;
}
export declare type CanvasProps = HandlerOptions & {
    responsive?: boolean;
    style?: React.CSSProperties;
};
declare const Canvas: React.FC<CanvasProps>;
export default Canvas;
