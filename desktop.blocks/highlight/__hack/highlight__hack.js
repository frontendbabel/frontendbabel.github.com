modules.require(['jquery'], function($) {

    $(function(){
        $('.highlight').each(function(i, block){
            var $block = $(block);
            $block.addClass('i-bem').addClass('highlight_theme_solarized-light');
            $block.attr('data-bem', JSON.stringify({ highlight: {} }));
        });
    })

});
