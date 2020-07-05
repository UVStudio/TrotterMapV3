$(() => {
  //navbar animation, show and hide
  $('.nav-slide').on('click', () => {
    if ($('.navbar').hasClass('show') && $('.navbar').hasClass('expanded')) {
      $('.navbar').animate({ top: '-150px' }, 'fast').toggleClass('show');
    } else if ($('.navbar').hasClass('show')) {
      $('.navbar').animate({ top: '-70px' }, 'fast').toggleClass('show');
    } else {
      $('.navbar').animate({ top: '0px' }, 'fast').toggleClass('show');
    }
  });
  $('.navbar-toggler').on('click', () => {
    $('.navbar').toggleClass('expanded');
    if ($('.navbar').hasClass('expanded')) {
      $('.nav-slide').animate({ top: '110px' }, 'fast');
    } else {
      $('.nav-slide').animate({ top: '60px' }, 'fast');
    }
  });
  //current / forecast dynamic text
  const active = document.getElementsByClassName('active');
  $('.nav-link').html(active[0].innerHTML);
  $('#forecast-dropdown').on('click', (e) => {
    $('.nav-link').html(e.target.textContent);
  });
});
