'use strict';

class SidemenuController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  $onInit() {
    var URL = window.location,
        $BODY = $('body'),
        $SIDEBAR_MENU = $('#sidebar-menu'),
        $MENU_TOGGLE = $('#menu_toggle'),
        $SIDEBAR_FOOTER = $('.sidebar-footer'),
        $LEFT_COL = $('.left_col');

    $SIDEBAR_MENU.find('li ul').slideUp();
    $SIDEBAR_MENU.find('li').removeClass('active');

    $SIDEBAR_MENU.find('li').on('click', function(ev) {
        var link = $('a', this).attr('href');

        // prevent event bubbling on parent menu
        if (link) {
            ev.stopPropagation();
        }
        // execute slidedown if parent menu
        else {
            if ($(this).is('.active')) {
                $(this).removeClass('active');
                $('ul', this).slideUp();
            } else {
                $SIDEBAR_MENU.find('li').removeClass('active');
                $SIDEBAR_MENU.find('li ul').slideUp();

                $(this).addClass('active');
                $('ul', this).slideDown();
            }
        }
    });

    $MENU_TOGGLE.on('click', function() {
        if ($BODY.hasClass('nav-md')) {
            $BODY.removeClass('nav-md').addClass('nav-sm');
            $LEFT_COL.removeClass('scroll-view').removeAttr('style');
            $SIDEBAR_FOOTER.hide();

            if ($SIDEBAR_MENU.find('li').hasClass('active')) {
                $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            }
        } else {
            $BODY.removeClass('nav-sm').addClass('nav-md');
            $SIDEBAR_FOOTER.show();

            if ($SIDEBAR_MENU.find('li').hasClass('active-sm')) {
                $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            }
        }
    });

    // check active menu
    $SIDEBAR_MENU.find('a[href="' + URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href == URL;
    }).parent('li').addClass('current-page').parent('ul').slideDown().parent().addClass('active');

  }

}

angular.module('siteCurApp')
  .controller('SidemenuController', SidemenuController);
