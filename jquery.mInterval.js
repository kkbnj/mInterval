/*!
 * jQuery method mInterval v2.0
 * Copyright 2015-2016 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 */
$.fn.mInterval = function(options){
  var $self = this,
      default_options = {
        type: 'fade',
        interval_time: 5000,
        duration: 260,
        easing: 'swing',
        random_init: false,

        velocity_js: true,
        css_animation: true,

        first_set_only: false,

        before_switch: function(now) {},
        after_switch: function(now) {}
      },
      params = $.extend({}, default_options, options),

      animation_method = 'jquery_animate';

    if(params.interval_time < params.duration + 16) {
      params.interval_time = params.duration + 16;
    }

    selectAnimationMethod();

    function selectAnimationMethod() {
      //selection of animation_method
      if(params.velocity_js === true && typeof $.fn.velocity !== 'undefined') {
        animation_method = 'velocity';

      } else if(params.css_animation === true) {
        (function() {
          var div = document.createElement('div'),
            prop = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition'],
            i;

          for (i = 0; i < prop.length; i++) {
            if (prop[i] in div.style) {
              animation_method = 'css_transition';
              break;
            }
          }
        }());
      }
    }

  $self.each(function(){
    var $self = $(this),
        $li = $('> li', $self),
        len = $li.length,
        now = 0,
        prev = -1;

    if(options === 'stop') {
      if(!$self[0]['mInterval']) {
        return;
      }

      clearInterval($self[0]['mInterval']['id']);
      return;
    }

    if(options === 'start') {
      if(!$self[0]['mInterval']) {
        return;
      }

      params = $self[0]['mInterval']['params'];

      now = $li.index($li.filter('.now'));

      selectAnimationMethod();

      $self[0]['mInterval']['id'] = setInterval(interval, params.interval_time);

      return;
    }

    if(params.random_init) {
      now = Math.floor(Math.random() * len);
    }

    function setInitCSS() {
      $li.css({
        opacity: 0,
        zIndex: 0,
        display: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      });
    }

    function setBeforeCSS() {
      $li.eq(now).css({
        display: 'block',
        zIndex: 1
      });
    }

    function afterFadeIn() {
      $li.removeClass('now').eq(now).addClass('now');

      if(prev >= 0) {
        $li.eq(prev).css({
          opacity: 0,
          zIndex: 0,
          display: 'none'
        });
      }
      $li.eq(now).css({
        zIndex: 0
      });

      if (typeof params.after_switch === 'function') {
        params.after_switch(now);
      }
    }

    function velocityFadeIn() {
      $li.eq(now).velocity({
        opacity: 1
      },{
        duration: params.duration,
        easing: params.easing,
        complete: afterFadeIn
      });
    }

    function transitionFadeIn() {
      $li.eq(now).css({
        transition: 'opacity ' + params.duration + 'ms ease-in-out'
      });
      setTimeout(function() {
        $li.eq(now).css({
          opacity: 1
        });

        setTimeout(function() {
          if(prev >= 0) {
            $li.eq(prev).css({
              transition: 'none',
            });
          }
          afterFadeIn();
        }, params.duration + 16);
      }, 16);
    }

    function animateFadeIn() {
      $li.eq(now).animate({
        opacity: 1
      },{
        duration: params.duration,
        easing: params.easing,
        complete: afterFadeIn
      });
    }

    function fadeIn() {
      if (typeof params.before_switch === 'function') {
        params.before_switch(now);
      }

      setBeforeCSS();
      switch(animation_method) {
        case 'velocity':
          velocityFadeIn();

          break;
        case 'css_transition':
          transitionFadeIn();

          break;
        case 'jquery_animate':
          animateFadeIn();

          break;
      }
    }

    function interval() {
      prev = now;

      now++;
      if(now >= len) {
        now = 0;
      }

      fadeIn();
    }

    setInitCSS();
    fadeIn();

    $self[0]['mInterval'] = {
      'id': null,
      params: params
    };

    if(!params.first_set_only) {
      $self[0]['mInterval']['id'] = setInterval(interval, params.interval_time);
    }
  });
};
