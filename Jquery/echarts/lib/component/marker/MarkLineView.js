
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
import { __extends } from "tslib";
import List from '../../data/List';
import * as numberUtil from '../../util/number';
import * as markerHelper from './markerHelper';
import LineDraw from '../../chart/helper/LineDraw';
import MarkerView from './MarkerView';
import { getStackedDimension } from '../../data/helper/dataStackHelper';
import { isCoordinateSystemType } from '../../coord/CoordinateSystem';
import { getECData } from '../../util/innerStore';
import MarkerModel from './MarkerModel';
import { isArray, retrieve, clone, extend, logError, merge, map, defaults, curry, filter } from 'zrender/lib/core/util';
import { makeInner } from '../../util/model';
import { getVisualFromData } from '../../visual/helper';
var inner = makeInner();

var markLineTransform = function (seriesModel, coordSys, mlModel, item) {
  var data = seriesModel.getData();
  var itemArray;

  if (!isArray(item)) {
    // Special type markLine like 'min', 'max', 'average', 'median'
    var mlType = item.type;

    if (mlType === 'min' || mlType === 'max' || mlType === 'average' || mlType === 'median' // In case
    // data: [{
    //   yAxis: 10
    // }]
    || item.xAxis != null || item.yAxis != null) {
      var valueAxis = void 0;
      var value = void 0;

      if (item.yAxis != null || item.xAxis != null) {
        valueAxis = coordSys.getAxis(item.yAxis != null ? 'y' : 'x');
        value = retrieve(item.yAxis, item.xAxis);
      } else {
        var axisInfo = markerHelper.getAxisInfo(item, data, coordSys, seriesModel);
        valueAxis = axisInfo.valueAxis;
        var valueDataDim = getStackedDimension(data, axisInfo.valueDataDim);
        value = markerHelper.numCalculate(data, valueDataDim, mlType);
      }

      var valueIndex = valueAxis.dim === 'x' ? 0 : 1;
      var baseIndex = 1 - valueIndex; // Normized to 2d data with start and end point

      var mlFrom = clone(item);
      var mlTo = {
        coord: []
      };
      mlFrom.type = null;
      mlFrom.coord = [];
      mlFrom.coord[baseIndex] = -Infinity;
      mlTo.coord[baseIndex] = Infinity;
      var precision = mlModel.get('precision');

      if (precision >= 0 && typeof value === 'number') {
        value = +value.toFixed(Math.min(precision, 20));
      }

      mlFrom.coord[valueIndex] = mlTo.coord[valueIndex] = value;
      itemArray = [mlFrom, mlTo, {
        type: mlType,
        valueIndex: item.valueIndex,
        // Force to use the value of calculated value.
        value: value
      }];
    } else {
      // Invalid data
      if (process.env.NODE_ENV !== 'production') {
        logError('Invalid markLine data.');
      }

      itemArray = [];
    }
  } else {
    itemArray = item;
  }

  var normalizedItem = [markerHelper.dataTransform(seriesModel, itemArray[0]), markerHelper.dataTransform(seriesModel, itemArray[1]), extend({}, itemArray[2])]; // Avoid line data type is extended by from(to) data type

  normalizedItem[2].type = normalizedItem[2].type || null; // Merge from option and to option into line option

  merge(normalizedItem[2], normalizedItem[0]);
  merge(normalizedItem[2], normalizedItem[1]);
  return normalizedItem;
};

function isInifinity(val) {
  return !isNaN(val) && !isFinite(val);
} // If a markLine has one dim


function ifMarkLineHasOnlyDim(dimIndex, fromCoord, toCoord, coordSys) {
  var otherDimIndex = 1 - dimIndex;
  var dimName = coordSys.dimensions[dimIndex];
  return isInifinity(fromCoord[otherDimIndex]) && isInifinity(toCoord[otherDimIndex]) && fromCoord[dimIndex] === toCoord[dimIndex] && coordSys.getAxis(dimName).containData(fromCoord[dimIndex]);
}

function markLineFilter(coordSys, item) {
  if (coordSys.type === 'cartesian2d') {
    var fromCoord = item[0].coord;
    var toCoord = item[1].coord; // In case
    // {
    //  markLine: {
    //    data: [{ yAxis: 2 }]
    //  }
    // }

    if (fromCoord && toCoord && (ifMarkLineHasOnlyDim(1, fromCoord, toCoord, coordSys) || ifMarkLineHasOnlyDim(0, fromCoord, toCoord, coordSys))) {
      return true;
    }
  }

  return markerHelper.dataFilter(coordSys, item[0]) && markerHelper.dataFilter(coordSys, item[1]);
}

function updateSingleMarkerEndLayout(data, idx, isFrom, seriesModel, api) {
  var coordSys = seriesModel.coordinateSystem;
  var itemModel = data.getItemModel(idx);
  var point;
  var xPx = numberUtil.parsePercent(itemModel.get('x'), api.getWidth());
  var yPx = numberUtil.parsePercent(itemModel.get('y'), api.getHeight());

  if (!isNaN(xPx) && !isNaN(yPx)) {
    point = [xPx, yPx];
  } else {
    // Chart like bar may have there own marker positioning logic
    if (seriesModel.getMarkerPosition) {
      // Use the getMarkerPoisition
      point = seriesModel.getMarkerPosition(data.getValues(data.dimensions, idx));
    } else {
      var dims = coordSys.dimensions;
      var x = data.get(dims[0], idx);
      var y = data.get(dims[1], idx);
      point = coordSys.dataToPoint([x, y]);
    } // Expand line to the edge of grid if value on one axis is Inifnity
    // In case
    //  markLine: {
    //    data: [{
    //      yAxis: 2
    //      // or
    //      type: 'average'
    //    }]
    //  }


    if (isCoordinateSystemType(coordSys, 'cartesian2d')) {
      // TODO: TYPE ts@4.1 may still infer it as Axis instead of Axis2D. Not sure if it's a bug
      var xAxis = coordSys.getAxis('x');
      var yAxis = coordSys.getAxis('y');
      var dims = coordSys.dimensions;

      if (isInifinity(data.get(dims[0], idx))) {
        point[0] = xAxis.toGlobalCoord(xAxis.getExtent()[isFrom ? 0 : 1]);
      } else if (isInifinity(data.get(dims[1], idx))) {
        point[1] = yAxis.toGlobalCoord(yAxis.getExtent()[isFrom ? 0 : 1]);
      }
    } // Use x, y if has any


    if (!isNaN(xPx)) {
      point[0] = xPx;
    }

    if (!isNaN(yPx)) {
      point[1] = yPx;
    }
  }

  data.setItemLayout(idx, point);
}

var MarkLineView =
/** @class */
function (_super) {
  __extends(MarkLineView, _super);

  function MarkLineView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = MarkLineView.type;
    return _this;
  }

  MarkLineView.prototype.updateTransform = function (markLineModel, ecModel, api) {
    ecModel.eachSeries(function (seriesModel) {
      var mlModel = MarkerModel.getMarkerModelFromSeries(seriesModel, 'markLine');

      if (mlModel) {
        var mlData_1 = mlModel.getData();
        var fromData_1 = inner(mlModel).from;
        var toData_1 = inner(mlModel).to; // Update visual and layout of from symbol and to symbol

        fromData_1.each(function (idx) {
          updateSingleMarkerEndLayout(fromData_1, idx, true, seriesModel, api);
          updateSingleMarkerEndLayout(toData_1, idx, false, seriesModel, api);
        }); // Update layout of line

        mlData_1.each(function (idx) {
          mlData_1.setItemLayout(idx, [fromData_1.getItemLayout(idx), toData_1.getItemLayout(idx)]);
        });
        this.markerGroupMap.get(seriesModel.id).updateLayout();
      }
    }, this);
  };

  MarkLineView.prototype.renderSeries = function (seriesModel, mlModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;
    var seriesId = seriesModel.id;
    var seriesData = seriesModel.getData();
    var lineDrawMap = this.markerGroupMap;
    var lineDraw = lineDrawMap.get(seriesId) || lineDrawMap.set(seriesId, new LineDraw());
    this.group.add(lineDraw.group);
    var mlData = createList(coordSys, seriesModel, mlModel);
    var fromData = mlData.from;
    var toData = mlData.to;
    var lineData = mlData.line;
    inner(mlModel).from = fromData;
    inner(mlModel).to = toData; // Line data for tooltip and formatter

    mlModel.setData(lineData);
    var symbolType = mlModel.get('symbol');
    var symbolSize = mlModel.get('symbolSize');

    if (!isArray(symbolType)) {
      symbolType = [symbolType, symbolType];
    }

    if (!isArray(symbolSize)) {
      symbolSize = [symbolSize, symbolSize];
    } // Update visual and layout of from symbol and to symbol


    mlData.from.each(function (idx) {
      updateDataVisualAndLayout(fromData, idx, true);
      updateDataVisualAndLayout(toData, idx, false);
    }); // Update visual and layout of line

    lineData.each(function (idx) {
      var lineStyle = lineData.getItemModel(idx).getModel('lineStyle').getLineStyle(); // lineData.setItemVisual(idx, {
      //     color: lineColor || fromData.getItemVisual(idx, 'color')
      // });

      lineData.setItemLayout(idx, [fromData.getItemLayout(idx), toData.getItemLayout(idx)]);

      if (lineStyle.stroke == null) {
        lineStyle.stroke = fromData.getItemVisual(idx, 'style').fill;
      }

      lineData.setItemVisual(idx, {
        fromSymbolRotate: fromData.getItemVisual(idx, 'symbolRotate'),
        fromSymbolSize: fromData.getItemVisual(idx, 'symbolSize'),
        fromSymbol: fromData.getItemVisual(idx, 'symbol'),
        toSymbolRotate: toData.getItemVisual(idx, 'symbolRotate'),
        toSymbolSize: toData.getItemVisual(idx, 'symbolSize'),
        toSymbol: toData.getItemVisual(idx, 'symbol'),
        style: lineStyle
      });
    });
    lineDraw.updateData(lineData); // Set host model for tooltip
    // FIXME

    mlData.line.eachItemGraphicEl(function (el, idx) {
      el.traverse(function (child) {
        getECData(child).dataModel = mlModel;
      });
    });

    function updateDataVisualAndLayout(data, idx, isFrom) {
      var itemModel = data.getItemModel(idx);
      updateSingleMarkerEndLayout(data, idx, isFrom, seriesModel, api);
      var style = itemModel.getModel('itemStyle').getItemStyle();

      if (style.fill == null) {
        style.fill = getVisualFromData(seriesData, 'color');
      }

      data.setItemVisual(idx, {
        symbolRotate: itemModel.get('symbolRotate'),
        symbolSize: itemModel.get('symbolSize') || symbolSize[isFrom ? 0 : 1],
        symbol: itemModel.get('symbol', true) || symbolType[isFrom ? 0 : 1],
        style: style
      });
    }

    this.markKeep(lineDraw);
    lineDraw.group.silent = mlModel.get('silent') || seriesModel.get('silent');
  };

  MarkLineView.type = 'markLine';
  return MarkLineView;
}(MarkerView);

function createList(coordSys, seriesModel, mlModel) {
  var coordDimsInfos;

  if (coordSys) {
    coordDimsInfos = map(coordSys && coordSys.dimensions, function (coordDim) {
      var info = seriesModel.getData().getDimensionInfo(seriesModel.getData().mapDimension(coordDim)) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys

      return defaults({
        name: coordDim
      }, info);
    });
  } else {
    coordDimsInfos = [{
      name: 'value',
      type: 'float'
    }];
  }

  var fromData = new List(coordDimsInfos, mlModel);
  var toData = new List(coordDimsInfos, mlModel); // No dimensions

  var lineData = new List([], mlModel);
  var optData = map(mlModel.get('data'), curry(markLineTransform, seriesModel, coordSys, mlModel));

  if (coordSys) {
    optData = filter(optData, curry(markLineFilter, coordSys));
  }

  var dimValueGetter = coordSys ? markerHelper.dimValueGetter : function (item) {
    return item.value;
  };
  fromData.initData(map(optData, function (item) {
    return item[0];
  }), null, dimValueGetter);
  toData.initData(map(optData, function (item) {
    return item[1];
  }), null, dimValueGetter);
  lineData.initData(map(optData, function (item) {
    return item[2];
  }));
  lineData.hasItemOption = true;
  return {
    from: fromData,
    to: toData,
    line: lineData
  };
}

export default MarkLineView;