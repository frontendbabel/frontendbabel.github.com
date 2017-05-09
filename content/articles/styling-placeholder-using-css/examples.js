(function(){

  var examples = [
    ['example1', 'example1source'],
    ['example2', 'example2source'],
    ['example3', 'example3source'],
    ['example4', 'example4source'],
    ['example5', 'example5source']
  ];

  examples.forEach(function(example){

    var source = example[0];
    var output = example[1];
    var shadow = document.querySelector('#' + source).createShadowRoot();
    shadow.innerHTML = document.querySelector('#' + output).innerHTML;

  });

})();
