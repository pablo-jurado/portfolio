/* global $ */
$(document).ready(function(){

  // -----------------------------------------------------------------------------
  // main scroll setUp
  // -----------------------------------------------------------------------------

  $('.main').onepage_scroll({
    sectionContainer: 'section',    // sectionContainer accepts any kind of selector in case you don't want to use section
    easing: 'ease',                 // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
    animationTime: 600,             // AnimationTime let you define how long each section takes to animate
    pagination: true,               // You can either show or hide the pagination. Toggle true for show, false for hide.
    updateURL: false,               // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
    beforeMove: null,               // This option accepts a callback function. The function will be called before the page moves.
    afterMove: animateIn,           // This option accepts a callback function. The function will be called after the page moves.
    loop: false,                    // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
    keyboard: true,                 // You can activate the keyboard controls
    responsiveFallback: false,      // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
    direction: 'vertical'           // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
  })

  // -----------------------------------------------------------------------------
  // animation
  // -----------------------------------------------------------------------------
  var isAboutShowing = false
  var isHeaderShowing = false

  function animateContactMe () {
    $('.contact-me').velocity('transition.fadeIn', animateLinks)
  }

  function animateLinks () {
    $('.links i').velocity('transition.fadeIn', { stagger: 200 })
  }
  // intro animation
  function animateIn (index) {
    // page 1 animation
    if (index === 1 && !isHeaderShowing) {
      isHeaderShowing = true
      $('#headerIMG')
        .velocity('transition.slideLeftBigIn', 1200)
      $('#headerText')
        .velocity('transition.slideRightBigIn', 1200, animateContactMe)
    }
    // page 2 animation
    if (index === 2 && !isAboutShowing) {
      isAboutShowing = true
      $('.page2 .about .about-text').velocity('transition.slideLeftBigIn', 1200)
      $('.page2 .gradient-back').velocity('transition.slideRightBigIn', 1200)
    }
    // page 3 animation
    // if (index === 3 && !isImageShowing) {
    //   isImageShowing = true
    //   $('.portfolio-nav').velocity('transition.fadeIn')
    //   $('#programming').addClass('active')
    //   portfolioImgArr[portfolioIndex]
    //     .delay(500)
    //     .velocity('transition.flipBounceYIn')
    // }

    // title animation
    $('.page' + index + ' h4').velocity({
      opacity: '100',
      width: '100'
    }, 400)
  }


  // -----------------------------------------------------------------------------
  // imgages loader
  // -----------------------------------------------------------------------------

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
        }
      }
    })
  }


  // -----------------------------------------------------------------------------
  // modal
  // -----------------------------------------------------------------------------
  $('.modal-btn-graphic').click(function (event) {
    $('#modal-container #modalBody').html('')
    var id = event.target.id

    var img = '<img src="img/modal/' + id + '.jpg">'
    $('#modal-container #modalBody').html(img)
    $('#modal-container').removeAttr('class').addClass('open')
  })

  $('.modal-btn-anima').click(function (event) {
    $('#modal-container #modalBody').html('')
    var id = event.target.id

    var movie = '<video autoplay controls>'
    movie += '<source src="img/modal/' + id + '.mp4" type="video/mp4">'
    movie += '</video>'

    $('#modal-container #modalBody').html(movie)
    $('#modal-container').removeAttr('class').addClass('open')
  })

  $('#modal-container').click(function () {
    $(this).addClass('out')
  })

  $('.slider').slick({
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    variableWidth: false,
    prevArrow: $('#navArrowPrev'),
    nextArrow: $('#navArrowNext'),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false,
        }
      },
    ]
  });

});
