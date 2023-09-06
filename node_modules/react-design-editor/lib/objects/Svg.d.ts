import { FabricGroup, FabricObject, FabricObjectOption } from '../utils';
export declare type SvgObject = (FabricGroup | FabricObject) & {
    loadSvg(option: SvgOption): Promise<SvgObject>;
    setFill(value: string): SvgObject;
    setStroke(value: string): SvgObject;
};
export interface SvgOption extends FabricObjectOption {
    svg?: string;
    loadType?: 'file' | 'svg';
}
declare const Svg: any;
export default Svg;
