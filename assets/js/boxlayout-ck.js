/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */var Boxlayout=function(){function d(){v()}function v(){t.each(function(){var t=$(this);t.on("click",function(){f=t;if(!t.data("open")){t.data("open",!0).addClass("bl-expand bl-expand-top");e.addClass("bl-expand-item")}}).find("span.bl-icon-close").on("click",function(){t.data("open",!1).removeClass("bl-expand").on(u,function(e){if(!$(e.target).is("section"))return!1;$(this).off(u).removeClass("bl-expand-top")});a||t.removeClass("bl-expand-top");e.removeClass("bl-expand-item");return!1})});n.on("click",function(e){f.addClass("bl-scale-down");c=$(".bl-panel-items."+f.attr("id"));c.addClass("bl-panel-items-show");l=c.find("[data-panel='"+$(this).data("panel")+"']");p=l.index();l.addClass("bl-show-work");return!1});r.on("click",function(e){if(i)return!1;i=!0;var t=c.children("div"),n=p<t.length-1?p+1:0,r=t.eq(n);l.removeClass("bl-show-work").addClass("bl-hide-current-work").on(u,function(e){if(!$(e.target).is("div"))return!1;$(this).off(u).removeClass("bl-hide-current-work");i=!1});if(!a){l.removeClass("bl-hide-current-work");i=!1}r.addClass("bl-show-work");l=r;p=n;return!1});s.on("click",function(e){f.removeClass("bl-scale-down");c.removeClass("bl-panel-items-show");l.removeClass("bl-show-work");return!1})}var e=$("#bl-main"),t=e.children("section"),n=$(".item"),r=$(".nextItem"),i=!1,s=$(".closeItem"),o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},u=o[Modernizr.prefixed("transition")],a=Modernizr.csstransitions,f,l,c,h,p;return{init:d}}();