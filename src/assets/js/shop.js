jQuery(function($){

	// SEARCH FORMS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(document).on('submit', '.search_form', function(e) {
		var searchQuery = $(this).find('input').val().replace(/ /g, '+');
		var placeHolder = $(this).find('input').attr('placeholder').replace(/ /g, '+');

		if ( !(searchQuery.length && searchQuery != placeHolder) ) {
			e.preventDefault();
			e.stopPropagation();
		};
	});




	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(document).ready(function(){
		var currencyCookie = $.cookie('currency');
		if ( currencyCookie == undefined ) {
			Currency.cookie.write(theme.shopCurrency);
		}
	});




	// PRODUCT QUANTITY BOX /////////////////////////////////////////////////////////////////////////////////////////////////////
	$(document).on("focusout",".quantity_input",function(){var a=$(this).val();isNaN(parseFloat(a))&&!isFinite(a)||0==parseInt(a)||""==a?$(this).val(1):parseInt(a)<0?$(this).val(parseInt(a)-2*parseInt(a)):$(this).val(parseInt(a))}),$(document).on("click",".quantity_up",function(){var a=$(this).parent().find(".quantity_input");isNaN(parseFloat(a.val()))||!isFinite(a.val())||a.attr("disabled")?a.val(1):a.val(parseInt(a.val())+1)}),$(document).on("click",".quantity_down",function(){var a=$(this).parent().find(".quantity_input");!isNaN(parseFloat(a.val()))&&isFinite(a.val())&&a.val()>1&&!a.attr("disabled")?a.val(parseInt(a.val())-1):a.val(1)});

	// $(document).on('focusout', '.quantity_input', function() {
	// 	var N = $(this).val();

	// 	if ( ( isNaN(parseFloat( N )) && !isFinite( N ) ) || parseInt( N ) == 0 || N == '' ) {
	// 		$(this).val(1);
	// 	}
	// 	else if ( parseInt( N ) < 0 ) {
	// 		$(this).val( parseInt( N ) - parseInt( N )*2 );
	// 	}
	// 	else {
	// 		$(this).val( parseInt( N ) );
	// 	};
	// });

	// $(document).on('click', '.quantity_up', function() {
	// 	var N = $(this).parent().find('.quantity_input');

	// 	if ( !isNaN( parseFloat( N.val() ) ) && isFinite( N.val() ) && !N.attr('disabled') ) {
	// 		N.val( parseInt( N.val() ) + 1 );
	// 	}
	// 	else {
	// 		N.val(1);
	// 	};
	// });

	// $(document).on('click', '.quantity_down', function() {
	// 	var N = $(this).parent().find('.quantity_input');

	// 	if ( !isNaN( parseFloat( N.val() ) ) && isFinite( N.val() ) && ( N.val() > 1 ) && !N.attr('disabled') ) {
	// 		N.val( parseInt( N.val() ) - 1 );
	// 	}
	// 	else {
	// 		N.val(1);
	// 	};
	// });




	// RTE YOUTUBE WRAPPER //////////////////////////////////////////////////////////////////////////////////////////////////////
	$(document).ready(function() {
		if ( $('.rte').length ) {
			$('.rte iframe[src *= youtube]').wrap('<div class="rte_youtube_wrapper"></div>');
		};
	});




	// BACK TO TOP BUTTON ///////////////////////////////////////////////////////////////////////////////////////////////////////
	$(document).ready(function(){
		$(window).on('scroll', function(){
			if ( $(this).scrollTop() > 300 ) {
				$('#back_top').fadeIn("slow");
			}
			else {
				$('#back_top').fadeOut("slow");
			};
		});

		$('#back_top').on('click', function(e) {
			e.preventDefault();
			$('html, body').animate( {scrollTop : 0}, 800 );
			$('#back_top').fadeOut("slow").stop();
		});

	});




	// FORM VALIDATION //////////////////////////////////////////////////////////////////////////////////////////////////////////
	$.fn.formValidation = function() {
		this.find('input[type=text], input[type=email], input[type=password], textarea').after('<p class="alert-inline" style="display: none;"></p>');

		this.on('submit', function(event) {
			$(this).find('input[type=text], input[type=email], input[type=password], textarea').each(function() {

				if ( $(this).val() == '' ) {
					$(this).addClass('alert-inline').next().html('Field can\'t be blank').slideDown();

					$(this).on('focus', function() {
						$(this).removeClass('alert-inline').next().slideUp();
					});

					event.preventDefault();

				};

			});

			if ( $(this).find('input[type=email]').length ) {
				var inputEmail = $(this).find('input[type=email]');

				if ( inputEmail.val().length > 0 && ( inputEmail.val().length < 6 || inputEmail.val().indexOf("@") == -1 || inputEmail.val().indexOf(".") == -1 ) ) {
					inputEmail.addClass('alert-inline').next().html('Incorrect email').slideDown();

					inputEmail.on('focus', function() {
						$(this).removeClass('alert-inline').next().slideUp();
					});

					event.preventDefault();

				};

			};

			if ( $(this).find('input[type=password]').length == 2 ) {
				var pwd1 = $(this).find('input[type=password]:eq(0)');
				var pwd2 = $(this).find('input[type=password]:eq(1)');

				if ( pwd1.val() != pwd2.val() ) {
					pwd1.addClass('alert-inline');
					pwd2.addClass('alert-inline').next().html('Passwords do not match').slideDown();

					pwd1.on('focus', function() {
						pwd1.removeClass('alert-inline');
						pwd2.removeClass('alert-inline').next().slideUp();
					});

					pwd2.on('focus', function() {
						pwd1.removeClass('alert-inline');
						pwd2.removeClass('alert-inline').next().slideUp();
					});

					event.preventDefault();

				};

			};

		});

	};



	// MAIN PRODUCT LISTING IMAGE CHANGE
	$(document).ready(function(){
		if ( device.desktop() ) {
			$(document).on({
			     mouseenter: function(){
			        $(this).find(".img__1").stop().animate({"opacity": 0});
			        $(this).find(".img__2").stop().animate({"opacity": 1});
			    },
			    mouseleave: function(){
			        $(this).find(".img__1").stop().animate({"opacity": 1});
			        $(this).find(".img__2").stop().animate({"opacity": 0});
			    }
			}, '.product_item');
			
		};
	});



	// PRODUCT QUICK VIEW MINI
	jQuery(function(e){e(document.body).on("click",".quick_view_btn",function(i){i.preventDefault();e(document.body).append('<div id="product_quick_view" style="display: none;"><div class="product_quick_wrapper"><div class="quick_view__left"><div id="img_big"></div><div class="product_images"><div id="img_gallery" class="swiper-container"><div class="swiper-wrapper"></div><div id="img_gallery__prev" class="swiper_btn btn_prev"></div><div id="img_gallery__next" class="swiper_btn btn_next"></div></div></div></div><div class="quick_view__right"><form action="/cart/add" method="post" enctype="multipart/form-data" id="product-actions" class="quick_view_form"><p id="quick_view__name" class="product_name"></p><p id="quick_view__type"><label for="">Product type:</label> <span></span></p><p id="quick_view__vendor"><label for="">Vendor:</label> <span></span></p><p id="quick_view__variants"><label for="">Options:</label><select id="product-select" name="id" class="hidden"></select></p><p id="quick_view__price" class="product_price"></p><p id="quick_view__availability"><label for="">Availability:</label> <span></span></p><div id="quick_view__form"><label for="quantity">Choose quantity:</label><div class="quantity_box"><input min="1" type="text" name="quantity" value="1" class="quantity_input" /><span class="quantity_modifier quantity_down"><i class="fa fa-minus"></i></span><span class="quantity_modifier quantity_up"><i class="fa fa-plus"></i></span></div><button class="btn btn-cart" type="submit" id="quick_view__add">Add to cart</button></div></form></div></div></div>'),e.fancybox.showLoading(),e.fancybox.helpers.overlay.open({parent:e("body")});e.getJSON(e(this).attr("href")+".js",function(i){if(e(document).on("click","#img_gallery a",function(i){i.preventDefault();var a=e(this).attr("href");e("#product_quick_view #img_big img").attr("src",a)}),i.title.length<60)var a=i.title;else var a=e.trim(i.title).substring(0,75)+"...";e("#quick_view__name").html('<a href="'+i.url+'">'+a+"</a>"),e("#quick_view__type span").html(i.type),e("#quick_view__vendor span").html(i.vendor),e.each(i.variants,function(i,a){e("#product-select").append('<option value="'+a.id+'">'+a.title+" - "+a.price+"</option>")}),e("#quantity").on("focusout",function(){var i=e(this).val();e(this).val(isNaN(parseFloat(i))&&!isFinite(i)||0==parseInt(i)||""==i?1:parseInt(i)<0?parseInt(i)-2*parseInt(i):parseInt(i))}),e("#quantity_up").on("click",function(){var i=e("#quantity").val();e("#quantity").val(!isNaN(parseFloat(i))&&isFinite(i)?parseInt(i)+1:1)}),e("#quantity_down").on("click",function(){var i=e("#quantity").val();e("#quantity").val(!isNaN(parseFloat(i))&&isFinite(i)&&i>1?parseInt(i)-1:1)}),e.getScript("//cdn.shopify.com/s/assets/themes_support/option_selection-ea4f4a242e299f2227b2b8038152223f741e90780c0c766883939e8902542bda.js",function(){function a(i,a){var t=i.length;0===t&&a();var n=0;e(i).each(function(){e("<img>").attr("src",this).load(function(){n++,n===t&&a()})})}a(i.images,function(){e("#product_quick_view #img_big").append('<img src="'+i.images[0]+'" alt="" />'),e.each(i.images,function(i,a){e("#img_gallery .swiper-wrapper").append('<a class="swiper-slide" href="'+a+'"><img src="'+a+'" alt="" /></a>')});var a=(new Swiper("#img_gallery",{width:302,loop:!0,speed:500,slidesPerView:3,spaceBetween:10,prevButton:"#img_gallery__prev",nextButton:"#img_gallery__next"}),function(i,a){if(i&&i.available?(jQuery("#quick_view__add").removeAttr("disabled").removeClass("disabled"),i.price<i.compare_at_price?jQuery("#quick_view__price").html('<span class="money">'+Shopify.formatMoney(i.price,"")+'</span><span class="money compare-at-price money_sale">'+Shopify.formatMoney(i.compare_at_price,"")+'</span><span class="money_sale_percent">– '+parseInt(100-100*i.price/i.compare_at_price)+"%</span>"):jQuery("#quick_view__price").html('<span class="money">'+Shopify.formatMoney(i.price,"")+"</span>"),null!=i.inventory_management?jQuery("#quick_view__availability span").removeClass("notify_danger").addClass("notify_success").html("Available"):jQuery("#quick_view__availability span").removeClass("notify_danger").addClass("notify_success").html("Available")):(jQuery("#quick_view__add").addClass("disabled").attr("disabled","disabled"),jQuery("#quick_view__availability span").removeClass("notify_success").addClass("notify_danger").html("Unavailable"),jQuery("#quick_view__price").html('<span class="money">'+Shopify.formatMoney(i.price,"")+"</span>")),i&&i.featured_image){var t=e("#img_big img"),n=i.featured_image,s=t[0];Shopify.Image.switchImage(n,s,function(i,a,t){e("#img_big img").attr("src",i)})}currencyToggle("#quick_view__price .money")});new Shopify.OptionSelectors("product-select",{product:i,onVariantSelected:a,enableHistoryState:!1}),e.each(e("#quick_view__variants select option"),function(){"Default Title"==e(this).val()&&e("#quick_view__variants").hide()}),e.fancybox(e("#product_quick_view"),{openSpeed:500,closeSpeed:500,tpl:{wrap:'<div id="quick_view__wrap" class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',closeBtn:'<a title="Close" id="quick_view__close" class="fancybox-item fancybox-close" href="javascript:;"></a>'},afterClose:function(){e("#product_quick_view").remove()}})})}),e("#quick_view__add").on("click",function(){e.fancybox.close()})})})});

	function currencyToggle(target) {
		// SWITCH CURRENCY
	    if ( typeof theme.shopCurrency != 'undefined' ) {
	    	var newCurrency = Currency.cookie.read();
	    	Currency.convertAll( theme.shopCurrency, newCurrency, target, 'money_format' ); 
	    }
	};



	// CHOOSE OPTIONS BUTTON
		$(document.body).on('click', '.btn_options', function(e) {
			if ( $(window).width() >= 768 ) {
				$(this).parent().parent().parent().parent().find('.quick_view_btn').trigger('click');
				e.preventDefault();
			};
		});



	// JQUERY.AJAX-CART.JS MINI
	jQuery(document).ready(function(t){var e={TOTAL_ITEMS:".cart-total-items",TOTAL_PRICE:".cart-total-price",SUBMIT_ADD_TO_CART:"input[type=image], input.submit-add-to-cart",FORM_UPDATE_CART:"form[name=cartform]",FORM_UPDATE_CART_BUTTON:"form[name=cartform] input[name=update]",FORM_UPDATE_CART_BUTTONS:"input[type=image], input.button-update-cart",LINE_ITEM_ROW:".cart-line-item",LINE_ITEM_QUANTITY_PREFIX:"input#updates_",LINE_ITEM_PRICE_PREFIX:".cart-line-item-price-",LINE_ITEM_REMOVE:".remove a",EMPTY_CART_MESSAGE:"#empty"},a=function(t){return Shopify.formatMoney(t,"${{ amount }}")};t(document).on("submit",'form[action*="/cart/add"]',function(e){e.preventDefault(),t(e.target).find(".btn-cart").attr("disabled",!0).addClass("disabled"),Shopify.addItemFromForm(e.target)}),t(document).on("click",".btn-cart",function(){t.fancybox.showLoading(),t.fancybox.helpers.overlay.open({parent:t("body")})}),t(e.FORM_UPDATE_CART_BUTTON).click(function(a){a.preventDefault(),t(a.target.form).find(e.FORM_UPDATE_CART_BUTTONS).attr("disabled",!0).addClass("disabled"),Shopify.updateCartFromForm(a.target.form)}),t(e.FORM_UPDATE_CART).delegate(e.LINE_ITEM_REMOVE,"click",function(a){a.preventDefault();var i=this.href.split("/").pop().split("?").shift();Shopify.removeItem(i),t(this).parents(e.LINE_ITEM_ROW).remove()}),Shopify.onItemAdded=function(e,a){t(a).find(".btn-cart").attr("disabled",!1).removeClass("disabled"),Shopify.getCart()},Shopify.onCartUpdate=function(i,n){t("#cart_items").html(i.item_count);var r=a(i.total_price);t(e.TOTAL_PRICE).html(r),t(e.EMPTY_CART_MESSAGE).length>0&&0==i.item_count&&(t(e.FORM_UPDATE_CART).hide(),t(e.EMPTY_CART_MESSAGE).show()),n=n||!1,n&&i.item_count>0&&(t.each(i.items,function(i,n){t(e.LINE_ITEM_PRICE_PREFIX+n.id).html(a(n.line_price)),t(e.LINE_ITEM_QUANTITY_PREFIX+n.id).val(n.quantity)}),t(n).find("input[value=0]").parents(e.LINE_ITEM_ROW).remove(),t(n).find(e.FORM_UPDATE_CART_BUTTONS).attr("disabled",!1).removeClass("disabled"))},Shopify.onError=function(){t("form").find(".btn-cart").attr("disabled",!1).removeClass("disabled")}});


// JQUERY.API.JS MINI
	function floatToString(t,a){var e=t.toFixed(a).toString();return e.match(/^\.\d+/)?"0"+e:e}function attributeToString(t){return"string"!=typeof t&&(t+="","undefined"===t&&(t="")),jQuery.trim(t)}"undefined"==typeof Shopify&&(Shopify={}),Shopify.money_format="$ ",Shopify.onError=function(XMLHttpRequest,textStatus){var data=eval("("+XMLHttpRequest.responseText+")");alert(data.message+"("+data.status+"): "+data.description)},Shopify.onCartUpdate=function(t){alert("There are now "+t.item_count+" items in the cart.")},Shopify.onItemAdded=function(t){alert(t.title+" was added to your shopping cart.")},Shopify.onProduct=function(t){alert("Received everything we ever wanted to know about "+t.title)},Shopify.formatMoney=function(t,a){var e="",r=/\{\{\s*(\w+)\s*\}\}/,o=a||this.money_format;switch(o.match(r)[1]){case"amount":e=floatToString(t/100,2).replace(/(\d+)(\d{3}[\.,]?)/,"$1 $2");break;case"amount_no_decimals":e=floatToString(t/100,0).replace(/(\d+)(\d{3}[\.,]?)/,"$1 $2");break;case"amount_with_comma_separator":e=floatToString(t/100,2).replace(/\./,",").replace(/(\d+)(\d{3}[\.,]?)/,"$1.$2")}return o.replace(r,e)},Shopify.resizeImage=function(t,a){try{if("original"==a)return t;var e=t.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);return e[1]+"_"+a+"."+e[2]}catch(r){return t}},Shopify.addItem=function(t,a,e){a=a||1;var r={type:"POST",url:"/cart/add.js",data:"quantity="+a+"&id="+t,dataType:"json",success:function(t){"function"==typeof e?e(t):Shopify.onItemAdded(t)},error:function(t,a){Shopify.onError(t,a)}};jQuery.ajax(r)},Shopify.addItemFromForm=function(t,o){var r={type:"POST",url:"/cart/add.js",data:jQuery(t).serialize(),dataType:"json",success:function(a){if("function"==typeof o?o(a,t):Shopify.onItemAdded(a,t),$("body").append('<div id="cart_added"><h4>Product added to cart</h4><div class="cart_added__row"><div class="cart_added__1" id="cart_added__img"><img src="" alt="" /></div><div class="cart_added__2"><span id="cart_added__name" class="product_name"></span><p id="cart_added__quantity">Quantity: <span></span></p><a class="btn" href="/cart">Go to cart</a><a class="btn btn-alt" id="cart_added__close" href="#">Continue shopping</a></div></div></div>'),a.title.length<60)var e=a.title;else var e=$.trim(a.title).substring(0,60)+"...";$("#cart_added__name").html(e),$("#cart_added__quantity span").html(a.quantity),$("#cart_added__close").on("click",function(t){t.preventDefault(),$(".fancybox-close").trigger("click")}),$("#cart_added__img img").attr("src",a.image).load(function(){$.fancybox.open($("#cart_added"),{openSpeed:500,closeSpeed:300,afterClose:function(){$("#cart_added").remove()}})})},error:function(t,o){Shopify.onError(t,o);var errorData=eval("("+t.responseText+")");$("body").append('<div id="cart_added" class="cart_error"><h4></h4><p class="alert alert-error"></p></div>'),$("#cart_added h4").html(errorData.message),$("#cart_added p").html(errorData.description),$.fancybox.open($("#cart_added"),{openSpeed:500,closeSpeed:300,afterClose:function(){$("#cart_added").remove()}})}};jQuery.ajax(r)},Shopify.getCart=function(t){jQuery.getJSON("/cart.js",function(a){"function"==typeof t?t(a):Shopify.onCartUpdate(a)})},Shopify.getProduct=function(t,a){jQuery.getJSON("/products/"+t+".js",function(t){"function"==typeof a?a(t):Shopify.onProduct(t)})},Shopify.changeItem=function(t,a,e){var r={type:"POST",url:"/cart/change.js",data:"quantity="+a+"&id="+t,dataType:"json",success:function(t){"function"==typeof e?e(t):Shopify.onCartUpdate(t)},error:function(t,a){Shopify.onError(t,a)}};jQuery.ajax(r)},Shopify.removeItem=function(t,a){var e={type:"POST",url:"/cart/change.js",data:"quantity=0&id="+t,dataType:"json",success:function(t){"function"==typeof a?a(t):Shopify.onCartUpdate(t)},error:function(t,a){Shopify.onError(t,a)}};jQuery.ajax(e)},Shopify.clear=function(t){var a={type:"POST",url:"/cart/clear.js",data:"",dataType:"json",success:function(a){"function"==typeof t?t(a):Shopify.onCartUpdate(a)},error:function(t,a){Shopify.onError(t,a)}};jQuery.ajax(a)},Shopify.updateCartFromForm=function(t,a){var e={type:"POST",url:"/cart/update.js",data:jQuery(t).serialize(),dataType:"json",success:function(e){"function"==typeof a?a(e,t):Shopify.onCartUpdate(e,t)},error:function(t,a){Shopify.onError(t,a)}};jQuery.ajax(e)},Shopify.updateCartAttributes=function(t,a){var e="";jQuery.isArray(t)?jQuery.each(t,function(t,a){var r=attributeToString(a.key);""!==r&&(e+="attributes["+r+"]="+attributeToString(a.value)+"&")}):"object"==typeof t&&null!==t&&jQuery.each(t,function(t,a){e+="attributes["+attributeToString(t)+"]="+attributeToString(a)+"&"});var r={type:"POST",url:"/cart/update.js",data:e,dataType:"json",success:function(t){"function"==typeof a?a(t):Shopify.onCartUpdate(t)},error:function(t,a){Shopify.onError(t,a)}};jQuery.ajax(r)},Shopify.updateCartNote=function(t,a){var e={type:"POST",url:"/cart/update.js",data:"note="+attributeToString(t),dataType:"json",success:function(t){"function"==typeof a?a(t):Shopify.onCartUpdate(t)},error:function(t,a){Shopify.onError(t,a)}};jQuery.ajax(e)};







});



