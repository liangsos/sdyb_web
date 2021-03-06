import SeriesModel from '../../model/Series';
import { TreeNode } from '../../data/Tree';
import Model from '../../model/Model';
import { SeriesOption, BoxLayoutOptionMixin, ItemStyleOption, LabelOption, RoamOptionMixin, CallbackDataParams, ColorString, StatesOptionMixin, OptionId, OptionName, DecalObject, SeriesLabelOption, DefaultEmphasisFocus } from '../../util/types';
import GlobalModel from '../../model/Global';
import { LayoutRect } from '../../util/layout';
import List from '../../data/List';
declare type TreemapSeriesDataValue = number | number[];
interface BreadcrumbItemStyleOption extends ItemStyleOption {
    textStyle?: LabelOption;
}
interface TreemapSeriesLabelOption extends SeriesLabelOption {
    ellipsis?: boolean;
    formatter?: string | ((params: CallbackDataParams) => string);
}
interface TreemapSeriesItemStyleOption extends ItemStyleOption {
    borderRadius?: number | number[];
    colorAlpha?: number;
    colorSaturation?: number;
    borderColorSaturation?: number;
    gapWidth?: number;
}
interface TreePathInfo {
    name: string;
    dataIndex: number;
    value: TreemapSeriesDataValue;
}
interface TreemapSeriesCallbackDataParams extends CallbackDataParams {
    treePathInfo?: TreePathInfo[];
}
interface ExtraStateOption {
    emphasis?: {
        focus?: DefaultEmphasisFocus | 'descendant' | 'ancestor';
    };
}
export interface TreemapStateOption {
    itemStyle?: TreemapSeriesItemStyleOption;
    label?: TreemapSeriesLabelOption;
    upperLabel?: TreemapSeriesLabelOption;
}
export interface TreemapSeriesVisualOption {
    /**
     * Which dimension will be applied with the visual properties.
     */
    visualDimension?: number | string;
    colorMappingBy?: 'value' | 'index' | 'id';
    visualMin?: number;
    visualMax?: number;
    colorAlpha?: number[] | 'none';
    colorSaturation?: number[] | 'none';
    /**
     * A node will not be shown when its area size is smaller than this value (unit: px square).
     */
    visibleMin?: number;
    /**
     * Children will not be shown when area size of a node is smaller than this value (unit: px square).
     */
    childrenVisibleMin?: number;
}
export interface TreemapSeriesLevelOption extends TreemapSeriesVisualOption, TreemapStateOption, StatesOptionMixin<TreemapStateOption, ExtraStateOption> {
    color?: ColorString[] | 'none';
    decal?: DecalObject[] | 'none';
}
export interface TreemapSeriesNodeItemOption extends TreemapSeriesVisualOption, TreemapStateOption, StatesOptionMixin<TreemapStateOption, ExtraStateOption> {
    id?: OptionId;
    name?: OptionName;
    value?: TreemapSeriesDataValue;
    children?: TreemapSeriesNodeItemOption[];
    color?: ColorString[] | 'none';
    decal?: DecalObject[] | 'none';
}
export interface TreemapSeriesOption extends SeriesOption<TreemapStateOption, ExtraStateOption>, TreemapStateOption, BoxLayoutOptionMixin, RoamOptionMixin, TreemapSeriesVisualOption {
    type?: 'treemap';
    /**
     * configuration in echarts2
     * @deprecated
     */
    size?: (number | string)[];
    /**
     * If sort in desc order.
     * Default to be desc. asc has strange effect
     */
    sort?: boolean | 'asc' | 'desc';
    /**
     * Size of clipped window when zooming. 'origin' or 'fullscreen'
     */
    clipWindow?: 'origin' | 'fullscreen';
    squareRatio?: number;
    /**
     * Nodes on depth from root are regarded as leaves.
     * Count from zero (zero represents only view root).
     */
    leafDepth?: number;
    drillDownIcon?: string;
    /**
     * Be effective when using zoomToNode. Specify the proportion of the
     * target node area in the view area.
     */
    zoomToNodeRatio?: number;
    /**
     * Leaf node click behaviour: 'zoomToNode', 'link', false.
     * If leafDepth is set and clicking a node which has children but
     * be on left depth, the behaviour would be changing root. Otherwise
     * use behavious defined above.
     */
    nodeClick?: 'zoomToNode' | 'link';
    breadcrumb?: BoxLayoutOptionMixin & {
        show?: boolean;
        height?: number;
        emptyItemWidth: number;
        itemStyle?: BreadcrumbItemStyleOption;
        emphasis?: {
            itemStyle?: BreadcrumbItemStyleOption;
        };
    };
    levels?: TreemapSeriesLevelOption[];
    data?: TreemapSeriesNodeItemOption[];
}
declare class TreemapSeriesModel extends SeriesModel<TreemapSeriesOption> {
    static type: string;
    type: string;
    static layoutMode: "box";
    preventUsingHoverLayer: boolean;
    layoutInfo: LayoutRect;
    designatedVisualItemStyle: TreemapSeriesItemStyleOption;
    private _viewRoot;
    private _idIndexMap;
    private _idIndexMapCount;
    static defaultOption: TreemapSeriesOption;
    /**
     * @override
     */
    getInitialData(option: TreemapSeriesOption, ecModel: GlobalModel): List<Model<any>, import("../../data/List").DefaultDataVisual>;
    optionUpdated(): void;
    /**
     * @override
     * @param {number} dataIndex
     * @param {boolean} [mutipleSeries=false]
     */
    formatTooltip(dataIndex: number, multipleSeries: boolean, dataType: string): import("../../component/tooltip/tooltipMarkup").TooltipMarkupNameValueBlock;
    /**
     * Add tree path to tooltip param
     *
     * @override
     * @param {number} dataIndex
     * @return {Object}
     */
    getDataParams(dataIndex: number): TreemapSeriesCallbackDataParams;
    /**
     * @public
     * @param {Object} layoutInfo {
     *                                x: containerGroup x
     *                                y: containerGroup y
     *                                width: containerGroup width
     *                                height: containerGroup height
     *                            }
     */
    setLayoutInfo(layoutInfo: LayoutRect): void;
    /**
     * @param  {string} id
     * @return {number} index
     */
    mapIdToIndex(id: string): number;
    getViewRoot(): TreeNode;
    resetViewRoot(viewRoot?: TreeNode): void;
    enableAriaDecal(): void;
}
export default TreemapSeriesModel;
