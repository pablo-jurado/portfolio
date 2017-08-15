/* global $ */
$(document).ready(function () {
  $('.main').onepage_scroll({
    sectionContainer: 'section',     // sectionContainer accepts any kind of selector in case you don't want to use section
    easing: 'ease',                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
    animationTime: 600,             // AnimationTime let you define how long each section takes to animate
    pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
    updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
    beforeMove: null,  // This option accepts a callback function. The function will be called before the page moves.
    afterMove: animateIn,   // This option accepts a callback function. The function will be called after the page moves.
    loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
    keyboard: true,                  // You can activate the keyboard controls
    responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
    direction: 'vertical'            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
  })

  let isImageShowing = false
  let isHeaderShowing = false

  function animateContactMe () {
    $('.contact-me').velocity('transition.fadeIn', animateLinks)
  }

  function animateLinks () {
    $('.links i')
      .velocity('transition.fadeIn', { stagger: 200 })
  }

  function animateIn (index) {
    // page 1 animation
    // this will animate only onces
    if (index === 1 && !isHeaderShowing) {
      isHeaderShowing = true
      $('#headerIMG')
        .velocity('transition.slideLeftBigIn', 1200)
      $('#headerText')
        .velocity('transition.slideRightBigIn', 1200, animateContactMe)
    }
    // page 3 animation
    if (index === 3 && !isImageShowing) {
      isImageShowing = true
      $('.page3 .image-container')
        .velocity('transition.fadeIn', { stagger: 100 })
    }

    // title animation
    $('.page' + index + ' h4').velocity({
      opacity: '100',
      width: '100'
    }, 400)
  }

  // trigger first animation
  animateIn(1)
})
