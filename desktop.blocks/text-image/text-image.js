modules.define(
    'text-image',
    ['i-bem__dom', 'jquery'],
    function(provide, BEMDOM, $) {

BEMDOM.decl({ block: this.name }, {

    onSetMod : {
        'js' : {
            'inited' : function() {
                this._getRealSize();
            }
        },
        'size' : {
            'normal' : function() {
                this.domElem.css({
                    'margin-left': '-' + (this._realWidth - this._width) / 2 + 'px'
                })
            },
            'small' : function() {
                this.domElem.css({
                    'margin-left' : '0'
                })
            }
        }
    },
    _toggle: function() {
        if (this._realWidth > this._width) {
            this.toggleMod('size', 'normal', 'small');
        }
    },
    _getRealSize: function() {
        var textImage = this;
        $('<img/>')
            .attr('src', this.domElem.attr('src'))
            .load(function(){
                textImage._realWidth = this.width;
                textImage._width = parseInt(textImage.domElem.css('width'));
                if (textImage._realWidth > textImage._width) {
                    textImage.setMod('size', 'small')
                }
            });
    }
}, {
    live: function() {
        this.liveBindTo('click', function(){
            this._toggle();
        });
        return false;
    }
});

provide(BEMDOM);

});
