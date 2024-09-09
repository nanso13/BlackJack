$(document).ready(function() {
  $('.num').on('click', function() {
    var $this = $(this);
    $('#roulette')
      .removeClass(function(index, className) {
        return (className.match(/(^|\s)number-\S+/g) || []).join(' ');
      })
      .addClass('number-' + $this.val());
  });

  $('#rollRnd').on('click', function() {
    var num = 1 + Math.round(Math.random() * 9);
    $('#roulette')
      .removeClass(function(index, className) {
        return (className.match(/(^|\s)number-\S+/g) || []).join(' ');
      })
      .addClass('number-' + num);
  });
});
