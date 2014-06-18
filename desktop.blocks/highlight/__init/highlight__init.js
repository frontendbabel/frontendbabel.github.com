/** @requires BEM */
/** @requires BEM.DOM */

modules.define(
    'highlight',
    ['i-bem__dom', 'jquery'],
    function(provide, BEMDOM, $) {

provide(BEMDOM.decl({ block: this.name }, {
    getCodeContainer: function() {
        this._codeContainer = this._codeContainer || this.domElem.find('code')[0];
        return this._codeContainer;
    },
    get$CodeContainer: function() {
        this._$CodeContainer = this._$CodeContainer || $(this.getCodeContainer());
        return this._$CodeContainer;
    },
    getDefaultParams: function() {
        return {
            lang: this.get$CodeContainer().attr('data-lang')
        }
    }
}));

});
