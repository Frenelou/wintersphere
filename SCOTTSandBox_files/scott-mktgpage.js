var scott=scott||{};scott.mktgpage=scott.mktgpage||new function(){var that=this;this.init=function(){this.setTeaserLinesBgImgs();this.initAnalyticsEventBinding();};this.setTeaserLinesBgImgs=function(){var isMobile="ontouchstart"in document.documentElement;jQuery('section.teaserline').each(function(){var bgImgDesktop=jQuery('input#bgImgDesktop',this).val();var bgImgMobile=jQuery('input#bgImgMobile',this).val();var bgImg=isMobile?bgImgMobile:bgImgDesktop;if(bgImg!=undefined){jQuery(this).css('background-image','url('+bgImg+')');}});};this.initAnalyticsEventBinding=function(){jQuery(".teaserline .container .row").each(function(rowIndex){var row=this;jQuery(row).children().each(function(){var box=this;jQuery(box).find("a").click(function(){var href=jQuery(this).attr('href');if(href!=undefined&&href!=null&&href.indexOf('#')!=0){var name=jQuery(row).data('title');var pos=rowIndex+1;var contentType=jQuery(row).data('content');var clickType=jQuery(box).data('content');tagmanager_event('home content',{'name':name,'position':pos,'content type':contentType,'click type':clickType});};});});});};};jQuery(".prospect-color-variants").addClass('owl-carousel');jQuery(".prospect-color-variants").owlCarousel({items:4,navigation:false,pagination:true,dots:true,mouseDrag:true,touchDrag:true,scrollPerPage:true,itemsDesktop:[1182,3],itemsDesktopSmall:[979,2],itemsTablet:[750,3],itemsTabletSmall:[670,2],itemsMobile:[450,1],});jQuery(document).ready(function(){if(jQuery('.teaserline').size()){scott.mktgpage.init();}});