$(() => {
  $('.navbar').offset({ top: -50 });
  $('.navbar').on('mouseover', (e) => {
    if (e) {
      $('.navbar').animate({ top: '0px' }, 'fast');
    }
  });
  $('.navbar').on('mouseleave', (e) => {
    if (e) {
      $('.navbar').animate({ top: '-50px' }, 'fast');
    }
  });
});
