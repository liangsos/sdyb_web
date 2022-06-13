; (function ($, window, document, undefined) {
    //定义的构造函数
    var Drag = function (ele, opt) {
        this.$ele = ele,
		this.x = 0,
		this.y = 0,
        this.defaults = {
            parent: 'parent',
            overlay: false,    //OL 覆盖物图层专用 add by hzx 2018-03-09
       
            handler: false,
            dragStart: function (x, y) { },
            dragEnd: function (x, y) { },
            dragMove: function (x, y) { }
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义方法
    Drag.prototype = {
        run: function () {
            var $this = this;
            var element = this.$ele;
            var handler = this.options.handler;
         
            var overlay = this.options.overlay;
            var parent = this.options.parent;
            var isDown = false; //记录鼠标是否按下
            var fun = this.options; //使用外部函数
            var X = 0,
                Y = 0,
                moveX,
                moveY;
            // 阻止冒泡
            //element.find('*').not('img').mousedown(function (e) {
            //    e.stopPropagation();
            //});
            //初始化判断
            if (parent == 'parent') {
                parent = element.parent();
                if (overlay) {
                    parent = parent.parent();
                }
            } else {
                parent = element.parents(parent);
            }
            if (!handler) {
                handler = element;
            } else {
                handler = element.find(handler);
            }
            //初始化
            //parent.css({ position: 'relative' });
            //element.css({ position: 'absolute' });
            var boxWidth = 0, boxHeight = 0, sonWidth = 0, sonHeight = 0;
            //盒子 和 元素大小初始化
            initSize();
            //盒子 和 元素大小初始化函数
            function initSize() {
                boxWidth = parent.width();
                boxHeight = parent.height();
                sonWidth = element.width();
                sonHeight = element.height();
            }
            handler.css({ cursor: 'move' }).mousedown(function (e) {
                //if (parent.is(":hidden"))
                //    return;
                if ($(e.target).hasClass("close") || $(e.target).hasClass("title-gz"))//点关闭按钮不能移动对话框  
                    return;

                isDown = true;
                X = e.clientX;
                Y = e.clientY;
                $this.x = element.offset().left;
                $this.y = element.offset().top;
                $("#SVGDoc").css({
                    "pointer-events": "none"
                });
                element.addClass('on');
                if (overlay) {
                    fun.dragStart(parseInt(parent.parent().css('left')), parseInt(parent.parent().css('top')));
                } else {
                    fun.dragStart(parseInt(parent.css('left')), parseInt(parent.css('top')));
                }
                return false;
            });
            $(document).mouseup(function (e) {
                //if (parent.is(":hidden"))
                //    return;
                $("#SVGDoc").css({
                    "pointer-events": "auto"
                });
                if (overlay) {
                    fun.dragEnd(parseInt(parent.parent().css('left')), parseInt(parent.parent().css('top')));
                } else {
                    fun.dragEnd(parseInt(parent.css('left')), parseInt(parent.css('top')));
                }
                element.removeClass('on');
                isDown = false;
                X = 0, Y = 0, moveX = 0, moveY = 0;
            });
            $(document).mousemove(function (e) {
                //if (parent.is(":hidden"))
                //    return;
                if (!isDown || parent == undefined)
                    return;

                moveX = $this.x + e.clientX - X;
                moveY = $this.y + e.clientY - Y;
                function thisAllMove() { //全部移动  
                    if (isDown == true) {
                        if (overlay) {
                            if (parent.hasClass("sitecon_left_bottom")) {
                                parent.parent().offset({ left: moveX + boxWidth - 80, top: moveY - 11 });
                            } else {
                                parent.parent().offset({ left: moveX + boxWidth - 80, top: moveY + boxHeight + 11 });
                            }
                        }
                        else {
                            parent.offset({ left: moveX, top: moveY });
                        }
                    } else {
                        return;
                    }
                }
                if (isDown) {
                    if (overlay) {
                        fun.dragMove(parseInt(parent.parent().css('left')), parseInt(parent.parent().css('top')));
                    }
                    else {
                        //console.log(parseInt(parent.css('left')) + "/" + parseInt(parent.css('top')));
                        fun.dragMove(parseInt(parent.css('left')), parseInt(parent.css('top')));
                    }
                } else {
                    return false;
                }
                thisAllMove();
            });
        }
    }

    //插件
    $.fn.myDrag = function (options) {
        //创建实体
        var drag = new Drag(this, options);
        //调用方法
        drag.run();
        return this;
    }
})(jQuery, window, document);