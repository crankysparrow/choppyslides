$(function() {

  let images = [
    "https://images.unsplash.com/photo-1591186023606-7d859f9d1b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
    "https://images.unsplash.com/photo-1520769955559-663886e5169a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1591122715222-54c2d4eb881b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"        
  ]

  let slides = $('.slide');
  let slider = $('.slider-text');
  let container = $('.container');
  let sliderImage = $('.slider-images');

  let backgrounds = $('<div />', {
    class: 'backgrounds'
  });

  images.forEach((image, i) => {
    let bgslide = $('<div />', {
      class: 'bg-pieces bg-' + i.toString()
    });

    let bgpiece = $('<div />').css({
      backgroundImage: 'url("' + image + '")',
    })
    
    bgpiece.clone().addClass('bgpiece one').appendTo(bgslide);
    bgpiece.clone().addClass('bgpiece two').appendTo(bgslide);
    bgpiece.clone().addClass('bgpiece three').appendTo(bgslide);

    backgrounds.append(bgslide);
  })

  sliderImage.prepend(backgrounds);

  let imageSlides = $('.slide-image');

  let cur = (slides.length)-1;
  let boxBottom = $('.slider-image-box-bottom');
  let boxLeft = $('.slider-image-box-left');

  let width = slider.width();

  gsap.set( '.slide', { y: 400, opacity: 0 } )

  gsap.set('.image-outer', {y: 400});
  gsap.set('.one', {left: '100vw'});
  gsap.set('.two', {left: '-100vw'});
  gsap.set('.three', {left: '100vw'});
  gsap.set('.image-inner', {y: -400});
  moveSlideN();

  $('button.nav-next').click(() => {
    moveSlideN();
  })

  function moveSlideN() {

    let text = slides[cur];
    let inner = imageSlides[cur].querySelector( '.image-inner' );  
    let bgPieces = $('.bg-pieces')[cur];

    gsap.to(text, .6,
      {opacity: '0'})
    gsap.to(text, .4, {y: 40});

    let tl = gsap.timeline({paused: true});

    tl.to(bgPieces.querySelector('.three'),
      {left: '100vw', duration: .5})
    // .add('whiteLines', .4)
    .to(inner,
      {opacity: .5, duration: .6}, '-=.4')
    .to(bgPieces.querySelector('.one'), 
      {left: '100vw', duration:.5}, '-=.3')
    .to(bgPieces.querySelector('.two'),
      {left: '-100vw', duration: .5}, '-=.8')
    .to(inner, 
      {y: -400, duration: .2}, '-=.6');


    // tl.to(boxBottom, .4,
    //   {rotate: randomDeg(5), ease: 'power1.out)'}, 'whiteLines')
    // .to(boxLeft, .9,
    //   {rotate: randomDeg(10), x: -10, y: 20, ease: 'power1.out'}, '<.2')

    cur = (cur < slides.length-1) ? cur + 1 : 0;

    text = slides[cur];
    inner = imageSlides[cur].querySelector('.image-inner');
    bgPieces = $('.bg-pieces')[cur];

    gsap.to(text, .8, 
      {y: 0, opacity: '1'});    

    tl.to(bgPieces.querySelector('.one'),
      {left: 0, duration: .5}, '-=.8')
    .to(bgPieces.querySelector('.two'),
      {left: '-50px', duration: .5}, '<+.3')
    .to(bgPieces.querySelector('.three'),
      {left: '40px', duration: .5}, '<+.3')
    .fromTo(inner,
      {y: 400}, {y: 0, duration: .4}, '<+.2')   
    .to(inner,
      {opacity: 1, duration: .4}, '<')
    .to(inner.querySelector('img'), .2,
      {scale: 1.08, ease: "power1.out"}, '<')
    .to(inner.querySelector('img'), .5,
      {scale: 1, ease: "power1.out"}, '<+.2')

    tl.play();

  }

});

function randomDeg(n) {
  let x = (Math.floor(Math.random() * 2) === 0)
  return x ? (Math.random() * -n).toString() + 'deg' : (Math.random() * n).toString() + 'deg';
}