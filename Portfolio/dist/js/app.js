"use strict";!function(o){o(function(){o(document).ready(function(){o(".header__link").on("click",function(t){t.preventDefault();var n=o(this).attr("href"),e=o(n).offset().top;o("body,html").animate({scrollTop:e},300)})})})}(jQuery);