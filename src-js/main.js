/* global $ */
$(document).ready(function () {
  // main scroll setUp
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

  // DOM elements
  var btnNext = $('#navArrowNext')
  var btnPrev = $('#navArrowPrev')
  var progSlide = $('#programmingSlide .image-container')
  var webSlide = $('#webSlide .image-container')
  var graphicSlide = $('#graphicSlide .image-container')
  var animaSlide = $('#animationSlide .image-container')
  var portfolioNav = $('#portfolioNav')
  var portfolioImgArr = [progSlide, webSlide, graphicSlide, animaSlide]

  // global variables
  var isImageShowing = false
  var isHeaderShowing = false
  var portfolioIndex = 0

  function animateContactMe () {
    $('.contact-me').velocity('transition.fadeIn', animateLinks)
  }

  function animateLinks () {
    $('.links i')
      .velocity('transition.fadeIn', { stagger: 200 })
  }

  function animateIn (index) {
    // page 1 animation
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
      $('#programming').addClass('active')
      portfolioImgArr[portfolioIndex]
        .delay(500)
        .velocity('transition.flipBounceYIn')
    }

    // title animation
    $('.page' + index + ' h4').velocity({
      opacity: '100',
      width: '100'
    }, 400)
  }

  // portfolio-nav
  function navClick (e) {
    var id = e.target.id

    if (id) eraseAllSlides()

    if (id === 'programming') portfolioIndex = 0
    if (id === 'web') portfolioIndex = 1
    if (id === 'graphic') portfolioIndex = 2
    if (id === 'animation') portfolioIndex = 3

    // add active to portfolio nav button
    addActiveClass(portfolioIndex)
    // animates next portfolio slide
    portfolioImgArr[portfolioIndex]
      .velocity('transition.expandIn')
  }

  function addActiveClass (index) {
    var id = ''
    $('#portfolioNav li').removeClass('active')

    if (index === 0) id = 'programming'
    if (index === 1) id = 'web'
    if (index === 2) id = 'graphic'
    if (index === 3) id = 'animation'

    $('#' + id).addClass('active')
  }

  function eraseAllSlides () {
    $('.page3 .portfolio-container .image-container').velocity('transition.fadeOut')
  }

  function handleNext () {
    eraseAllSlides()
    portfolioIndex++
    if (portfolioIndex === portfolioImgArr.length) {
      portfolioIndex = 0
    }
    addActiveClass(portfolioIndex)
    portfolioImgArr[portfolioIndex].velocity('transition.expandIn')
  }

  function handlePrev () {
    eraseAllSlides()
    portfolioIndex--
    if (portfolioIndex < 0) {
      portfolioIndex = portfolioImgArr.length - 1
    }
    addActiveClass(portfolioIndex)
    portfolioImgArr[portfolioIndex].velocity('transition.expandIn')
  }

  portfolioNav.click(navClick)
  btnNext.click(handleNext)
  btnPrev.click(handlePrev)

  // imgages loader
  var imgCount = $('body img').length - 1
  var loaderCount = 0
  var loaderBar = $('.loader-bar')
  $('.portfolio-container img').imagesLoaded()
    .done(function (instance) {
      animateLoaderBack()
    })
    .fail(function () {
      console.log('all images loaded, at least one is broken')
    })
    .progress(function (instance, image) {
      loaderCount += 1
      var porcentage = Math.round(loaderCount * 100 / imgCount) + '%'
      loaderBar.css({ width: porcentage })
    })

  function animateLoaderBack () {
    loaderBar.css({ display: 'none' })

    $('.loader-back-top').velocity({
      properties: { top: '-100%' },
      options: { duration: 750 }
    })
    $('.loader-back-bottom').velocity({
      properties: { bottom: '-100%' },
      options: {
        duration: 750,
        complete: function () {
          animateIn(1)
          //.delay(500)
        }
      }
    })
  }

  eraseAllSlides()
})
