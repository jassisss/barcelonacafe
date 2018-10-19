(function () {
  var __sections__ = {};
  (function () {
    for (var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function () {
    if (!__sections__["header"]) return;
    try {

      (function ($) {

        // CURRENCY SELECTOR ////////////////////////////////////////////////////////////////////////////////////////
        if (typeof theme.shopCurrency != 'undefined') {

          var shopCurrency = theme.shopCurrency;

          var currencyActive = $('#currency_active');
          var currencySelector = $('#currency_selector');
          var currencySelectorItem = $('.currency_selector__item');

          // Sometimes merchants change their shop currency, let's tell our JavaScript file
          Currency.money_with_currency_format[shopCurrency] = theme.moneyFormatCurrency;
          Currency.money_format[shopCurrency] = theme.moneyFormat;

          // Cookie currency
          var cookieCurrency = Currency.cookie.read();

          // Saving the current price
          $('span.money').each(function () {
            $(this).attr('data-currency-' + theme.shopCurrency, $(this).html());
          });

          // If there's no cookie.
          if (cookieCurrency == null) {
            Currency.currentCurrency = shopCurrency;
          }
          // If the cookie value does not correspond to any value in the currency dropdown.
          else if ($('#currency_selector li[data-value=' + cookieCurrency + ']').length === 0) {
            Currency.currentCurrency = shopCurrency;
            Currency.cookie.write(shopCurrency);
          }
          else if (cookieCurrency === shopCurrency) {
            Currency.currentCurrency = shopCurrency;
          }
          else {
            Currency.convertAll(shopCurrency, cookieCurrency, 'span.money', 'money_format');
          }
          ;

          currencySelectorItem.on('click', function (e) {
            var newCurrency = $(this).data('value');
            Currency.convertAll(Currency.currentCurrency, newCurrency, 'span.money', 'money_format');
            currencyActive.text(newCurrency);

            currencyActive.removeClass('opened');
            currencySelector.removeClass('opened');

          });

          currencySelectorItem.each(function () {
            var currencyValue = $(this).data('value');

            if (currencyValue == cookieCurrency) {
              currencyActive.text(currencyValue);
            }
            ;

          });

          currencyActive.on('click', function () {
            if (currencyActive.hasClass('opened')) {
              currencyActive.removeClass('opened');
              currencySelector.removeClass('opened');
            }
            else {
              currencyActive.addClass('opened');
              currencySelector.addClass('opened');
            }
            ;
          });

          $(document).on('click', function () {
            if (currencyActive.hasClass('opened')) {
              currencyActive.removeClass('opened');
              currencySelector.removeClass('opened');
            }
            ;
          });

          currencyActive.on('click', function (e) {
            e.stopPropagation();
          });

        }
        ;


        // MEGAMENU /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var mobFlag = 0;

        megamenuToggle = function () {
          if ($(window).width() > 991) {
            $('#megamenu').removeClass('megamenu_mobile').addClass('megamenu_desktop');

            $('#megamenu_level__1').superfish();

            $('#megamenu .level_1, #megamenu .level_2, #megamenu .level_3').removeAttr('style');

            $('#megamenu_mobile_toggle, .megamenu_trigger').off('.mobileMenu').removeClass('off active');

            $('#megamenu_level__1, #megamenu_mobile_close').removeClass('on');

            $('html, body').css('overflow', 'auto');

            mobFlag = 0;
          }
          else {
            $('#megamenu_level__1, #megamenu_mobile_close').hide();
            $('#megamenu').removeClass('megamenu_desktop').addClass('megamenu_mobile');

            $('#megamenu_level__1').superfish('destroy');

            if (mobFlag == 0) {
              menuMobile();
              mobFlag = 1;
            }
            ;
          }
          ;
        };

        menuMobile = function () {
          $('#megamenu_mobile_toggle').on('click.mobileMenu', function () {
            $('#megamenu_level__1, #megamenu_mobile_close').show().addClass('on');

            $('html, body').css({'overflow': 'hidden', 'position': 'fixed'});

          });

          $('#megamenu_mobile_close').on('click', function () {
            $('#megamenu_level__1, #megamenu_mobile_close').removeClass('on');

            $('html, body').css({'overflow': 'auto', 'position': 'static'});

          });

          $('.megamenu_trigger').on('click.mobileMenu', function () {
            var targetMenu = '#' + $(this).data('submenu');

            $(targetMenu).slideToggle(300);

            $(this).toggleClass('active');

            return false;
          });

        };


        // STICKY MENU v.1 //////////////////////////////////////////////////////////////////////////////////////////////////////////
        stickyHeader = function () {

          var target = $('.header_stuck');
          var pseudo = $('#pseudo_sticky_block');
          var stick_class = 'megamenu_stuck';

          $(window).on('load scroll resize', function () {

            if ($(window).width() > 991) {
              var scrolledValue = parseInt($(window).scrollTop());
              var offsetValue = parseInt(pseudo.offset().top);
              var headHeight = target.outerHeight();

              if (scrolledValue > offsetValue) {
                target.addClass(stick_class);
                pseudo.css({'height': headHeight});
              }
              else {
                target.removeClass(stick_class);
                pseudo.css({'height': 0});
              }
              ;
            }
            else {
              target.removeClass(stick_class);
              pseudo.css({'height': 0});
            }
            ;

          });

          $(window).on('load', function () {
            setTimeout(
              function () {
                $(window).trigger('scroll')
              }
              , 180);
          });

        };

        stickyHeader();


        // STICKY MENU v.2 //////////////////////////////////////////////////////////////////////////////////////////////////////////
        // stickyHeader = function() {

        // 	var target = $('#page_header');
        // 	var pseudo = $('#pseudo_sticky_block');
        // 	var stick_class = 'megamenu_stuck';

        // 	if ( $(window).width() > 991 ) {
        // 		var scrolledValue = parseInt( $(window).scrollTop() );
        // 		var offsetValue = parseInt( pseudo.offset().top );
        // 		var headHeight = target.outerHeight();

        // 		if ( scrolledValue > offsetValue ) {
        // 			target.addClass( stick_class );
        // 			pseudo.css({ 'height' : headHeight });
        // 		}
        // 		else {
        // 			target.removeClass( stick_class );
        // 			pseudo.css({ 'height' : 0 });
        // 		};
        // 	}
        // 	else {
        // 		target.removeClass( stick_class );
        // 		pseudo.css({ 'height' : 0 });
        // 	};

        // };

        // $(window).on('load scroll resize', function() {
        // 	stickyHeader();
        // });

        // $(window).on('load', function() {
        // 	setTimeout(
        // 		function(){ $(window).trigger('scroll') }
        // 	, 180 );
        // });


        $(window).on('load resize', function () {
          megamenuToggle();
        });


        $(document).on('shopify:section:load', '#shopify-section-header', function () {
          stickyHeader();
          megamenuToggle();
        });


        // DROPDOWN
        function dropDown() {
          elementClick = '.elem_toggle';
          elementSlide = '.slide_element';
          activeClass = 'active';
          $(elementClick).on('click', function (e) {
            e.stopPropagation();
            var subUl = $(this).next(elementSlide);
            $(this).toggleClass(activeClass);

            $(elementClick).not(this).removeClass(activeClass);
            e.preventDefault();
          });
          $(document).on('click', elementSlide, function (e) {
            e.stopPropagation();
          });
          $(document).on('click', function (e) {
            e.stopPropagation();
            if (e.which != 3) {
              var elementHide = $(elementClick).next(elementSlide);
              // $(elementHide).hide();
              $(elementClick).removeClass('active');
            }
          });
        }

        dropDown()

      })(jQuery);

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["index-featured-products"] && !window.DesignMode) return;
    try {

      jQuery(document).ready(function ($) {
        $('.products_carousel').each(function (i) {

          var sliderId = '#' + $(this).attr('id');
          var sliderVar = $(this).attr('id');
          var sliderPrev = '#carousel_swiper__prev_' + sliderVar.replace('products_carousel_', '');
          var sliderNext = '#carousel_swiper__next_' + sliderVar.replace('products_carousel_', '');
          var productsQ = $(this).data('products');
          var sliderPagination = '#pagination_' + sliderVar.replace('products_carousel_', '');

          if (productsQ > 4) {
            var carouselVar = new Swiper(sliderId, {
              effect: 'slide',
              slidesPerView: 4,
              spaceBetween: 0,
              loop: true,
              speed: 500,
              autoplayDisableOnInteraction: false,
              pagination: sliderPagination,
              paginationClickable: true,

              breakpoints: {
                1763: {
                  slidesPerView: 3
                },
                991: {
                  slidesPerView: 2
                }
              },

              prevButton: sliderPrev,
              nextButton: sliderNext,

            });

            $(window).on('load', function () {
              carouselVar.onResize(); // updating swiper after loading
            });
          }
          ;

        });

        /*    $.fn.splitWords = function(index) {
                return this.each(function() {
                    var el = $(this),
                    i, first, words = el.text().split(/\s/);
                    if (typeof index === 'number') {
                        i = (index > 0) ? index : words.length + index;
                    }
                    else {
                        i = Math.floor(words.length / 3);
                    }
                    first = words.splice(0, i);
                    el.empty().
                    append(makeWrapElem(1, first)).
                    append(makeWrapElem(2, words));
                });
            };
            function makeWrapElem(i, wordList) {
                return $('<span class="wrap-' + i + '">' + wordList.join('') + '</span>');
            }

            $('.collection_img__overlay h2').splitWords(1);
        */

        $('.collection_img__overlay h2').each(function () {
          var word = $(this).html();
          var index = word.indexOf(' ');
          if (index == -1) {
            index = word.length;
          }
          $(this).html('<span class="first-word">' + word.substring(0, index) + '</span>' + '<span>' + word.substring(index, word.length) + '</span>');
        });


      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["index-image-with-text-overlay"] && !window.DesignMode) return;
    try {

      jQuery(function ($) {

        morkoParallax = function () {
          $('.parallax_block').each(function () {
            var parallaxBlock = $(this);
            var parallaxLayer = $(this).find('.parallax_layer');

            $(window).on('load scroll', function () {
              var parallaxHeight = parseInt(parallaxBlock.outerHeight());
              var parallaxImgHeight = parseInt(parallaxLayer.outerHeight());

              var parallaxOffset1 = parseInt(parallaxBlock.offset().top);
              var parallaxOffset2 = parseInt(parallaxOffset1 + parallaxHeight);

              var translateMax = parseInt(parallaxImgHeight - parallaxHeight) - 2; // minus 2 to prevent floated numbers and borders between sections

              var scrollTemp = $(window).scrollTop() + window.innerHeight;

              if ((scrollTemp >= parallaxOffset1) && ($(window).scrollTop() <= parallaxOffset2)) {
                // var translateKoff = parallaxHeight/parallaxImgHeight;

                // if ( translateKoff > 0.2 ) {
                // 	var translateVal = parseInt( ( scrollTemp - parallaxOffset1 ) * 0.2 );
                // }
                // else {
                // 	var translateVal = parseInt( ( scrollTemp - parallaxOffset1 ) * translateKoff );
                // };

                var translateVal = parseInt((scrollTemp - parallaxOffset1) * 0.15);

                if (translateVal <= translateMax) {
                  parallaxLayer.css({'transform': 'translate3d(0, -' + translateVal + 'px, 0)'});
                }
                else if (translateVal > translateMax) {
                  parallaxLayer.css({'transform': 'translate3d(0, -' + translateMax + 'px, 0)'});
                }
                ;

              }
              ;

            });

          });

        };


        morkoParallax();


        $(document).on('shopify:section:load shopify:section:unload', '.section_image-with-text-overlay', function () {
          morkoParallax();
        });

      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["index-map"] && !window.DesignMode) return;
    try {

      jQuery(document).ready(function ($) {
        $.getScript('//maps.googleapis.com/maps/api/js?key=' + theme.mapKey).then(function () {

          $('.section_map').each(function (i) {

            var mapId = $(this).data('section');
            var mapBlock = 'map_' + mapId;

            var mapAddress = $(this).data('map-address');
            var mapMarker = $(this).data('map-marker');
            var mapStyle = $(this).data('map-style');

            var mapLoad = function (mapAddress, mapMarker, mapStyle) {

              var latlng = new google.maps.LatLng(0, 0);

              var mapOptions = {
                center: latlng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                scrollwheel: false,
                streetViewControl: false,
                rotateControl: false
              };

              var map = new google.maps.Map(document.getElementById(mapBlock), mapOptions);

              var geocoder = new google.maps.Geocoder();

              geocoder.geocode({'address': mapAddress}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  map.setCenter(results[0].geometry.location);

                  var mapIcon = {
                    path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
                    fillColor: mapMarker,
                    fillOpacity: 0.9,
                    scale: 1,
                    strokeWeight: 0
                  };

                  var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    icon: mapIcon,
                    map: map
                  });

                }
                else {
                  alert("Geocode was not successful for the following reason: " + status);
                }
                ;

              });

              // MAP STYLES
              map.setOptions({styles: mapStyle});

              // MAP RESPONSIVE RESIZE
              google.maps.event.addDomListener(window, 'resize', function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);

              });

            };


            // LOADING MAPS
            mapLoadTrigger = true;

            $(document).on('shopify:section:load', '#shopify-section-' + mapId, function () {

              var mapInstance = $(this).find('.section_map');

              var mapAddress = mapInstance.data('map-address');
              var mapMarker = mapInstance.data('map-marker');
              var mapStyle = mapInstance.data('map-style');

              mapLoad(mapAddress, mapMarker, mapStyle);
              mapLoadTrigger = false;

            });

            if (mapLoadTrigger = true) {
              mapLoad(mapAddress, mapMarker, mapStyle);
            }
            ;

          });

        });
      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["index-single-product"] && !window.DesignMode) return;
    try {

      jQuery(document).ready(function ($) {
        $('.section_product').each(function () {
          var sectionID = $(this).data('section');

          var productLoad = function () {


            // PRODUCT IMAGES
            var primaryImg = $('#primary_img_' + sectionID);

            var galleryImages = $('#gallery_big-' + sectionID);
            var galleryImagesPrev = $('#prev_' + sectionID);
            var galleryImagesNext = $('#next_' + sectionID);

            var galleryThumbs = $('#gallery_thumbs-' + sectionID);

            var thumbsCount = 0;

            if (galleryThumbs.hasClass('gallery_thumbs__small')) {
              thumbsCount = 3;
            }
            else if (galleryThumbs.hasClass('gallery_thumbs__medium')) {
              thumbsCount = 5;
            }
            else {
              thumbsCount = 7;
            }
            ;

            var galleryImageSlider = new Swiper(galleryImages, {
              prevButton: galleryImagesPrev,
              nextButton: galleryImagesNext,
            });

            var galleryThumbSlider = new Swiper(galleryThumbs, {
              slidesPerView: thumbsCount,
              breakpoints: {
                991: {
                  slidesPerView: 3
                }
              },
              spaceBetween: 20,
              centeredSlides: true,
              touchRatio: 0.2,
              slideToClickedSlide: true
            });


            $(window).on('load', function () {
              galleryImageSlider.onResize(); // updating swiper after loading
              galleryThumbSlider.onResize(); // updating swiper after loading
            });

            galleryImageSlider.params.control = galleryThumbSlider;
            galleryThumbSlider.params.control = galleryImageSlider;


            // PRODUCT OPTIONS
            var productSelect = 'product_select_' + sectionID;

            var productArray = JSON.parse($('#product_json_' + sectionID).html());
            var variantWeights = JSON.parse($('#variant_weights_' + sectionID).html());

            var productWeight = $('#single_product__weight-' + sectionID);
            var productSKU = $('#single_product__sku-' + sectionID);
            var productBarcode = $('#single_product__barcode-' + sectionID);

            var productAvailability = $('#single_product__availability-' + sectionID);
            var productPrice = $('#single_product__price-' + sectionID);

            var productQuantity = $('#single_product__quantity-' + sectionID);
            var productAdd = $('#single_product__addtocart-' + sectionID);


            selectCallback = function (variant, selector) {
              if (variant && variant.available) {


                // VARIANT WEIGHT
                if (variant.requires_shipping == true) {

                  for (var i in variantWeights) {
                    i = parseInt(i);

                    if (i == variant.id) {
                      productWeight.html(variantWeights[i]);
                    }
                    ;
                  }
                  ;
                }
                else {
                  productWeight.html('—');
                }
                ;


                // VARIANT SKU
                if (variant.sku && variant.sku.length) {
                  productSKU.html(variant.sku);
                }
                else {
                  productSKU.html('—');
                }
                ;


                // VARIANT BARCODE
                if (variant.barcode != null) {
                  productBarcode.html(variant.barcode);
                }
                else {
                  productBarcode.html('—');
                }
                ;


                // VARIANT AVAILABILITY
                if (variant.inventory_management != null) {

                  if ((variant.inventory_quantity == 0) && (variant.inventory_policy == 'continue')) {
                    productAvailability.removeClass('notify_danger').addClass('notify_success').html(producText.available);
                  }
                  else {
                    productAvailability.removeClass('notify_danger').addClass('notify_success').html(variant.inventory_quantity + ' ' + producText.items);
                  }
                  ;

                }
                else {
                  productAvailability.removeClass('notify_danger').addClass('notify_success').html(producText.available);
                }
                ;


                // VARIANT PRICE
                if (variant.price < variant.compare_at_price) {
                  productPrice.html('<span class="money">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span>' + '<span class="money money_sale">' + Shopify.formatMoney(variant.compare_at_price, theme.moneyFormat) + '</span><span class="money_sale_percent">– ' + parseInt(100 - (variant.price * 100) / variant.compare_at_price) + '%</span>');
                }
                else {
                  productPrice.html('<span class="money">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span>');
                }
                ;


                // VARIANT QUANTITY
                productQuantity.removeAttr('disabled', 'disabled');


                // VARIANT ADD TO CART BUTTON
                productAdd.removeAttr('disabled', 'disabled');


                // SWITCH VARIANT IMAGE
                var newImage = variant.featured_image;
                var element = primaryImg[0];

                Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {
                  galleryImageSlider.slides.each(function (i) {
                    var thumb = $(this).find('img').attr('src').replace('_crop_top', '').replace('_crop_center', '').replace('_crop_bottom', '').replace(/\?v=.*/, '');
                    var newImg = newImageSizedSrc.replace(/\?v=.*/, '');

                    if (thumb == newImg) {
                      galleryImageSlider.slideTo(i);
                    }
                    ;
                  });
                });

              }
              else {
                // VARIANT AVAILABILITY
                productAvailability.removeClass('notify_success').addClass('notify_danger').html(producText.unavailable);


                // VARIANT QUANTITY
                productQuantity.attr('disabled', 'disabled');


                // VARIANT ADD TO CART BUTTON
                productAdd.attr('disabled', 'disabled');

              }
              ;


              // SWITCH CURRENCY
              if (typeof theme.shopCurrency != 'undefined') {
                var newCurrency = Currency.cookie.read();
                var moneySelector = productPrice.find('span.money');
                Currency.convertAll(theme.shopCurrency, newCurrency, moneySelector, 'money_format');

              }
              ;

            };

            new Shopify.OptionSelectors(productSelect, {
              product: productArray,
              onVariantSelected: selectCallback,
              enableHistoryState: false
            });

          };


          // LOADING PRODUCTS
          productLoadTrigger = true;

          $(document).on('shopify:section:load', '#shopify-section-' + sectionID, function () {
            productLoad();
            productLoadTrigger = false;
          });

          if (productLoadTrigger = true) {
            productLoad();
          }
          ;

        });

      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["index-slideshow"] && !window.DesignMode) return;
    try {

      jQuery(document).ready(function ($) {
        $('.section_slideshow').each(function (i) {

          var sliderId = '#' + $(this).attr('id');
          var sliderVarId = $(this).attr('id');
          var sliderPagination = '#pagination_' + sliderVarId.replace('slideshow_', '');
          var sliderPrev = '#slider_prev_' + sliderVarId.replace('slideshow_', '');
          var sliderNext = '#slider_next_' + sliderVarId.replace('slideshow_', '');

          var sliderAutoplay = $(this).data('autoplay');
          if (sliderAutoplay == true) {
            sliderAutoplay = $(this).data('speed');
          }
          ;

          var sliderVar = new Swiper(sliderId, {
            effect: 'fade',
            autoplay: sliderAutoplay,
            loop: true,
            speed: 500,
            autoplayDisableOnInteraction: false,

            pagination: sliderPagination,
            paginationClickable: true,

            prevButton: sliderPrev,
            nextButton: sliderNext,

          });

          $(window).on('load', function () {
            sliderVar.onResize(); // updating swiper after loading
          });

        });

      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["index-testimonials"] && !window.DesignMode) return;
    try {

      jQuery(document).ready(function ($) {
        $('.section_testimonials').each(function () {

          var sectionId = $(this).attr('id').replace('shopify-section-', '');

          var testimonialSliderTag = '#testimonials_' + sectionId;
          var testimonialSliderPagination = '#pagination_' + sectionId;


          var testimonialsLoad = function () {

            if ($(testimonialSliderTag).length) {

              var testimonialSlider = new Swiper(testimonialSliderTag, {
                slidesPerView: 3,
                breakpoints: {
                  768: {
                    slidesPerView: 2
                  },
                  480: {
                    slidesPerView: 1
                  }
                },
                spaceBetween: 30,
                pagination: testimonialSliderPagination,
                paginationClickable: true,
              });

            }
            ;

          };


          // LOADING SLIDERS
          testimonialsLoadTrigger = true;

          $(document).on('shopify:section:load', '#shopify-section-' + sectionId, function () {
            testimonialsLoad();
            testimonialsLoadTrigger = false;
          });

          if (testimonialsLoadTrigger = true) {
            testimonialsLoad();
          }
          ;

        });
      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["template-addresses"]) return;
    try {

      jQuery(document).ready(function ($) {
        // ADD NEW ADDRESS
        $('#address_add, #address_add__close').hide();

        $('#address_add__link').on('click', function (e) {
          e.preventDefault();

          $(this).fadeOut(300);
          $('#address_add__close').delay(300).fadeIn();
          $('#address_add').slideDown();
        });

        $('#address_add__close, #address_add__cancel').on('click', function (e) {
          e.preventDefault();

          $('#address_add__close').fadeOut(300);
          $('#address_add__link').delay(300).fadeIn();
          $('#address_add').slideUp();
        });


        // EDIT EXISTING ADDRESS
        $('.account_address__edit').hide();
        $('.account_address__item .link_close').hide();

        $('.link_edit').on('click', function (e) {
          e.preventDefault();

          var t = $(this).attr('href');

          $(t).find('.account_address__edit').slideDown();

          $(this).fadeOut(300);

          $(t).find('.link_close').delay(300).fadeIn();

          $(t).find('.link_close').on('click', function (event) {
            event.preventDefault();

            $(t).find('.account_address__edit').slideUp();

            $(this).fadeOut(300);

            $(t).find('.link_edit').delay(300).fadeIn();
          });

          $(t).find('.link_cancel').on('click', function (event) {
            event.preventDefault();

            $(t).find('.link_close').trigger('click');
          });

        });


        // DELETING ADDRESS
        $('.link_delete').on('click', function () {
          Shopify.CustomerAddress.destroy($(this).attr('title'));
        });

      });


// PROVINCES SELECTS
      new Shopify.CountryProvinceSelector('address_country_new', 'address_province_new', {hideElement: 'address_province_container_new'});

      var customerAddresses = JSON.parse(theme.customerAddresses);

      for (i = 0; i < customerAddresses.length; i++) {
        var addressCountry = 'address_country_' + customerAddresses[i].id;
        var addressProvince = 'address_province_' + customerAddresses[i].id;
        var addressProvinceHide = 'address_province_container_' + customerAddresses[i].id;

        new Shopify.CountryProvinceSelector(addressCountry, addressProvince, {hideElement: addressProvinceHide});

      }
      ;

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["template-collection"]) return;
    try {

      jQuery(document).ready(function ($) {
        // PRODUCTS VIEW GRID/LIST
        if (typeof $.cookie('productSortView') == 'undefined') {
          $.cookie('productSortView', 'grid', {path: '/'});
        }
        else if ($.cookie('productSortView') == 'list') {
          $('#view_grid').removeClass('active');
          $('#view_list').addClass('active');

          $('#product_listing__sorted').addClass('product_listing__list');

        }
        ;

        $('#view_grid, #view_list').on('click', function () {
          var thisView = $(this).data('view');

          $('#view_grid, #view_list').removeClass('active');
          $('#product_listing__sorted').removeClass('product_listing__list product_listing__grid');

          $(this).addClass('active');

          $.cookie('productSortView', thisView, {path: '/'});
          $('#product_listing__sorted').addClass('product_listing__' + thisView);

        });


        // PRODUCTS NUMBER
        $('#products_number_select option[value=' + theme.productNumber + ']').prop('selected', 'true');

        $('#products_number_select').on('change', function () {
          var productSortQuery = document.location.origin + document.location.pathname + '?page=1&sort_by=' + $('#sort_by_select').val() + '&view=' + $(this).val();
          document.location.href = productSortQuery;
        });


        // PRODUCTS SORTING
        $('#sort_by_select option').each(function () {
          if (document.location.href.indexOf($(this).prop('value')) != -1) {
            $(this).attr('selected', 'selected');
          }
          ;

        });

        $('#sort_by_select').on('change', function () {
          var productSortQuery = document.location.origin + document.location.pathname + '?page=1&sort_by=' + $(this).val() + '&view=' + theme.productNumber;
          document.location.href = productSortQuery;
        });
      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["template-login"]) return;
    try {

      jQuery(document).ready(function ($) {
        if ($('#create_customer').find('.alert').length) {
          $('#account_section__register').show().removeClass('account_section__hidden');
          $('#account_section__wrapper').hide();
        }
        else if ($('#account_section__reset').find('.alert').length) {
          $('#account_section__reset').show().removeClass('account_section__hidden');
        }
        ;


        $('#account_register__link').on('click', function (e) {
          e.preventDefault();

          $('#account_section__wrapper').slideUp();
          $('#account_section__register').slideDown();

          if ($('#account_section__reset').is(':visible')) {
            $('#account_section__reset').slideUp();
          }
          ;

        });


        $('.account_register__close').on('click', function (e) {
          e.preventDefault();

          $('#account_section__register').slideUp();
          $('#account_section__wrapper').slideDown();

        });


        $('#account_reset__link').on('click', function (e) {
          e.preventDefault();

          if ($('#account_section__reset').is(':hidden')) {
            $('#account_section__reset').slideDown();
          }
          ;

        });


        $('.account_reset__cancel').on('click', function (e) {
          e.preventDefault();

          $('#account_section__reset').slideUp();
        });


        if (document.location.href.indexOf('#recover') !== -1) {
          $('#account_section__reset').removeClass('account_section__hidden');
        }
        ;


        $('#create_customer').formValidation();

        $('#create_customer').on('submit', function () {
          $('#password_confirmed').val($('#password_1').val());
        });


        $('#customer_login').formValidation();


        $('#account_section__activation form').formValidation();


        $('#account_section__reset-account form').formValidation();

      });

    } catch (e) {
      console.error(e);
    }
  })();

  (function () {
    if (!__sections__["template-product"]) return;
    try {

      jQuery(document).ready(function ($) {

        var sectionID = $('.section_product').attr('id').replace('shopify-section-', '');

        var productLoad = function () {


          // PRODUCT IMAGES
          var primaryImg = $('#primary_img_' + sectionID);

          var galleryImages = $('#gallery_big-' + sectionID);
          var galleryImagesPrev = $('#prev_' + sectionID);
          var galleryImagesNext = $('#next_' + sectionID);

          var galleryThumbs = $('#gallery_thumbs-' + sectionID);
          var thumbsCount = 0;

          if (galleryThumbs.hasClass('gallery_thumbs__small')) {
            thumbsCount = 3;
          }
          else if (galleryThumbs.hasClass('gallery_thumbs__medium')) {
            thumbsCount = 5;
          }
          else {
            thumbsCount = 7;
          }
          ;

          var galleryImageSlider = new Swiper(galleryImages, {
            prevButton: galleryImagesPrev,
            nextButton: galleryImagesNext,
          });

          var galleryThumbSlider = new Swiper(galleryThumbs, {
            slidesPerView: thumbsCount,
            breakpoints: {
              991: {
                slidesPerView: 3
              }
            },
            spaceBetween: 20,
            centeredSlides: true,
            touchRatio: 0.2,
            slideToClickedSlide: true,
          });


          $(window).on('load', function () {
            galleryImageSlider.onResize(); // updating swiper after loading
            galleryThumbSlider.onResize(); // updating swiper after loading
          });


          galleryImageSlider.params.control = galleryThumbSlider;
          galleryThumbSlider.params.control = galleryImageSlider;


          // PRODUCT OPTIONS
          var productSelect = 'product_select_' + sectionID;

          var productArray = JSON.parse($('#product_json_' + sectionID).html());
          var variantWeights = JSON.parse($('#variant_weights_' + sectionID).html());

          var productWeight = $('#single_product__weight-' + sectionID);
          var productSKU = $('#single_product__sku-' + sectionID);
          var productBarcode = $('#single_product__barcode-' + sectionID);

          var productAvailability = $('#single_product__availability-' + sectionID);
          var productPrice = $('#single_product__price-' + sectionID);

          var productQuantity = $('#single_product__quantity-' + sectionID);
          var productAdd = $('#single_product__addtocart-' + sectionID);


          selectCallback = function (variant, selector) {
            if (variant && variant.available) {


              // VARIANT WEIGHT
              if (variant.requires_shipping == true) {

                for (var i in variantWeights) {
                  i = parseInt(i);

                  if (i == variant.id) {
                    productWeight.html(variantWeights[i]);
                  }
                  ;
                }
                ;
              }
              else {
                productWeight.html('—');
              }
              ;


              // VARIANT SKU
              if (variant.sku && variant.sku.length) {
                productSKU.html(variant.sku);
              }
              else {
                productSKU.html('—');
              }
              ;


              // VARIANT BARCODE
              if (variant.barcode != null) {
                productBarcode.html(variant.barcode);
              }
              else {
                productBarcode.html('—');
              }
              ;


              // VARIANT AVAILABILITY
              if (variant.inventory_management != null) {

                if ((variant.inventory_quantity == 0) && (variant.inventory_policy == 'continue')) {
                  productAvailability.removeClass('notify_danger').addClass('notify_success').html(producText.available);
                }
                else {
                  productAvailability.removeClass('notify_danger').addClass('notify_success').html(variant.inventory_quantity + ' ' + producText.items);
                }
                ;

              }
              else {
                productAvailability.removeClass('notify_danger').addClass('notify_success').html(producText.available);
              }
              ;


              // VARIANT PRICE
              if (variant.price < variant.compare_at_price) {
                productPrice.html('<span class="money">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span>' + '<span class="money money_sale">' + Shopify.formatMoney(variant.compare_at_price, theme.moneyFormat) + '</span><span class="money_sale_percent">– ' + parseInt(100 - (variant.price * 100) / variant.compare_at_price) + '%</span>');
              }
              else {
                productPrice.html('<span class="money">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span>');
              }
              ;


              // VARIANT QUANTITY
              productQuantity.removeAttr('disabled', 'disabled');


              // VARIANT ADD TO CART BUTTON
              productAdd.removeAttr('disabled', 'disabled');


              // SWITCH VARIANT IMAGE
              var newImage = variant.featured_image;
              var element = primaryImg[0];

              Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {
                galleryImageSlider.slides.each(function (i) {
                  var thumb = $(this).find('img').attr('src').replace('_crop_top', '').replace('_crop_center', '').replace('_crop_bottom', '').replace(/\?v=.*/, '');
                  var newImg = newImageSizedSrc.replace(/\?v=.*/, '');

                  if (thumb == newImg) {
                    galleryImageSlider.slideTo(i);
                  }
                  ;
                });
              });

            }
            else {
              // VARIANT AVAILABILITY
              productAvailability.removeClass('notify_success').addClass('notify_danger').html(producText.unavailable);


              // VARIANT QUANTITY
              productQuantity.attr('disabled', 'disabled');


              // VARIANT ADD TO CART BUTTON
              productAdd.attr('disabled', 'disabled');

            }
            ;


            // SWITCH CURRENCY
            if (typeof theme.shopCurrency != 'undefined') {
              var newCurrency = Currency.cookie.read();
              var moneySelector = productPrice.find('span.money');
              Currency.convertAll(theme.shopCurrency, newCurrency, moneySelector, 'money_format');

            }
            ;

          };

          new Shopify.OptionSelectors(productSelect, {
            product: productArray,
            onVariantSelected: selectCallback,
            enableHistoryState: true
          });

        };


        // LOADING PRODUCTS
        productLoadTrigger = true;

        $(document).on('shopify:section:load', '#shopify-section-' + sectionID, function () {
          productLoad();
          productLoadTrigger = false;
        });

        if (productLoadTrigger = true) {
          productLoad();
        }
        ;

      });

    } catch (e) {
      console.error(e);
    }
  })();

})();
