//demo code for radial progress
$(function () {
    //radial progress 1
    radialObj= $('#indicatorContainer').radialIndicator({
        barColor:  {
        0: '#FF0000',
        33: '#FFFF00',
        66: '#0066FF',
        100: '#33CC33'
    },
        barWidth: 10,
        initValue: 0,
        roundCorner: true,
        percentage: true
    });
   // var radObj = $('#indicatorContainer').data('radialIndicator');
 
  //  radObj.animate(90);
});;