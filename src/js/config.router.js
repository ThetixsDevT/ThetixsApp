'use strict';
app.factory('MyService',function(){
return {
    data: {}
  };

});

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "tpl/app.html";
          if(window.location.href.indexOf("material") > 0){
            layout = "tpl/blocks/material.layout.html";
            $urlRouterProvider
              .otherwise('/app/dashboard-v3');
          }else{
            $urlRouterProvider
              .otherwise('/access/signin');
          }
          
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: layout
              })
              .state('app.welcome', {
                  url: '/welcome',
                  templateUrl: 'tpl/app_welcome.html',
                  resolve: load(['ui.select','js/controllers/chart.js','js/controllers/bootstrap.js'])
              })
              .state('app.invoice', {
                  url: '/invoice',
                  templateUrl: 'tpl/app_invoice.html'
                  // resolve: load(['ui.select','js/controllers/chart.js','js/controllers/bootstrap.js'])
              })
              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/app_dashboard_v2.html',
                  resolve: load(['js/controllers/chart.js'])
              })
              .state('app.dashboard-v3', {
                  url: '/dashboard-v3',
                  templateUrl: 'tpl/app_dashboard_v3.html'
                  // resolve: load(['js/controllers/chart.js'])
              })
              .state('app.ui', {
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'tpl/ui_buttons.html'
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'tpl/ui_icons.html'
              })
              .state('app.ui.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/ui_grid.html'
              })
              .state('app.ui.widgets', {
                  url: '/widgets',
                  templateUrl: 'tpl/ui_widgets.html'
              })          
              .state('app.ui.bootstrap', {
                  url: '/bootstrap',
                  templateUrl: 'tpl/ui_bootstrap.html'
              })
              .state('app.ui.sortable', {
                  url: '/sortable',
                  templateUrl: 'tpl/ui_sortable.html'
              })
              .state('app.ui.scroll', {
                  url: '/scroll',
                  templateUrl: 'tpl/ui_scroll.html',
                  resolve: load('js/controllers/scroll.js')
              })
              .state('app.ui.portlet', {
                  url: '/portlet',
                  templateUrl: 'tpl/ui_portlet.html'
              })
              .state('app.ui.timeline', {
                  url: '/timeline',
                  templateUrl: 'tpl/ui_timeline.html'
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'tpl/ui_tree.html',
                  resolve: load(['angularBootstrapNavTree', 'js/controllers/tree.js'])
              })
              .state('app.ui.toaster', {
                  url: '/toaster',
                  templateUrl: 'tpl/ui_toaster.html',
                  resolve: load(['toaster', 'js/controllers/toaster.js'])
              })
              .state('app.ui.jvectormap', {
                  url: '/jvectormap',
                  templateUrl: 'tpl/ui_jvectormap.html',
                  resolve: load('js/controllers/vectormap.js')
              })
              .state('app.ui.googlemap', {
                  url: '/googlemap',
                  templateUrl: 'tpl/ui_googlemap.html',
                  resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'js/app/map/map.js'], function(){ return loadGoogleMaps(); })
              })
              .state('app.chart', {
                  url: '/chart',
                  templateUrl: 'tpl/ui_chart.html',
                  resolve: load('js/controllers/chart.js')
              })

               .state('app.partners', {
                  url: '/partners',
                  templateUrl: 'tpl/app_partners.html',
                  controller: 'PartnersCtrl',
                  resolve: load(['xeditable','toaster','js/app/partners/partners.js','js/controllers/bootstrap.js'])
              })
               .state('app.newPartner', {
                  url: '/newPartner',
                  templateUrl: 'tpl/app_newPartner.html',
                  controller: 'NewPartnerCtrl',
                  resolve: load(['angularFileUpload','xeditable','toaster','js/app/partners/newPartner.js','js/controllers/bootstrap.js'])
              })
                .state('app.vendors', {
                  url: '/vendors',
                  templateUrl: 'tpl/app_vendors.html',
                  controller: 'VendorsCtrl',
                  resolve: load(['xeditable','toaster','js/app/vendors/vendors.js','js/controllers/bootstrap.js'])
              })
               .state('app.newVendor', {
                  url: '/newVendor',
                  templateUrl: 'tpl/app_newVendor.html',
                  controller: 'NewVendorCtrl',
                  resolve: load(['xeditable','toaster','js/app/vendors/newVendor.js','js/controllers/bootstrap.js'])
              })
               .state('app.newProduct', {
                  url: '/newProduct',
                  templateUrl: 'tpl/app_newProduct.html',
                  controller: 'NewProductCtrl',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/products/newProduct.js','js/controllers/bootstrap.js','js/controllers/select.js'])
              })
                .state('app.newProductP', {
                  url: '/newProductP',
                  templateUrl: 'tpl/app_newProductP.html',
                  controller: 'NewProductPCtrl',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/products/newProductP.js','js/controllers/bootstrap.js','js/controllers/select.js'])
              })

             
               

              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
              })
              .state('app.table.static', {
                  url: '/static',
                  templateUrl: 'tpl/table_static.html'
              })
              .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: 'tpl/table_datatable.html'
              })
              .state('app.table.footable', {
                  url: '/footable',
                  templateUrl: 'tpl/table_footable.html'
              })
              .state('app.table.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/table_grid.html',
                  resolve: load(['ngGrid','js/controllers/grid.js'])
              })
              .state('app.table.uigrid', {
                  url: '/uigrid',
                  templateUrl: 'tpl/table_uigrid.html',
                  resolve: load(['ui.grid','js/controllers/uigrid.js'])
              })
              .state('app.table.editable', {
                  url: '/editable',
                  templateUrl: 'tpl/table_editable.html',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','js/controllers/xeditable.js'])
              })
              .state('app.table.smart', {
                  url: '/smart',
                  templateUrl: 'tpl/table_smart.html',
                  resolve: load(['smart-table','js/controllers/table.js'])
              })
              // form
              .state('app.form', {
                  url: '/form',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: load('js/controllers/form.js')
              })
              .state('app.form.components', {
                  url: '/components',
                  templateUrl: 'tpl/form_components.html',
                  resolve: load(['ngBootstrap','daterangepicker','js/controllers/form.components.js'])
              })
              .state('app.form.elements', {
                  url: '/elements',
                  templateUrl: 'tpl/form_elements.html'
              })
              .state('app.form.validation', {
                  url: '/validation',
                  templateUrl: 'tpl/form_validation.html'
              })
              .state('app.form.wizard', {
                  url: '/wizard',
                  templateUrl: 'tpl/form_wizard.html'
              })
              .state('app.form.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'tpl/form_fileupload.html',
                  resolve: load(['angularFileUpload','js/controllers/file-upload.js'])
              })
              .state('app.form.imagecrop', {
                  url: '/imagecrop',
                  templateUrl: 'tpl/form_imagecrop.html',
                  resolve: load(['ngImgCrop','js/controllers/imgcrop.js'])
              })
              .state('app.form.select', {
                  url: '/select',
                  templateUrl: 'tpl/form_select.html',
                  controller: 'SelectCtrl',
                  resolve: load(['ui.select','js/controllers/select.js'])
              })
              .state('app.form.slider', {
                  url: '/slider',
                  templateUrl: 'tpl/form_slider.html',
                  controller: 'SliderCtrl',
                  resolve: load(['vr.directives.slider','js/controllers/slider.js'])
              })
              .state('app.form.editor', {
                  url: '/editor',
                  templateUrl: 'tpl/form_editor.html',
                  controller: 'EditorCtrl',
                  resolve: load(['textAngular','js/controllers/editor.js'])
              })
              .state('app.form.xeditable', {
                  url: '/xeditable',
                  templateUrl: 'tpl/form_xeditable.html',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','js/controllers/xeditable.js'])
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })
              .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/page_profile.html',
                   controller: 'ProfileCtrl',
                  resolve: load(['ui.select','js/controllers/profile.js'])
              })
              .state('app.page.appSettings', {
                  url: '/appSettings',
                  templateUrl: 'tpl/app_settings.html',
                  controller: 'AppSettingsCtrl',
                  resolve: load(['ui.select','js/controllers/appSettings.js'])
              })
              .state('app.page.post', {
                  url: '/post',
                  templateUrl: 'tpl/page_post.html'
              })
              .state('app.page.search', {
                  url: '/search',
                  templateUrl: 'tpl/page_search.html'
              })
              .state('app.page.invoice', {
                  url: '/invoice',
                  templateUrl: 'tpl/page_invoice.html'
              })
              .state('app.page.price', {
                  url: '/price',
                  templateUrl: 'tpl/page_price.html'
              })
              .state('app.docs', {
                  url: '/docs',
                  templateUrl: 'tpl/docs.html'
                  
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('generator', {
                  url: '/generator',
                  controller: 'GeneratorCtrl',
                  params: {
                    ser: null
                  },
                  templateUrl: 'tpl/generator.html',
                  resolve: load( ['toaster','ui.select','js/controllers/generator.js','js/controllers/select.js'] )
                  
              })
              .state('printerTixs', {
                  url: '/printerTixs',
                  templateUrl: 'tpl/printerTixs.html',
                   controller: 'PrinterTixsCtrl',
                  resolve: load([
                            // 'js/controllers/payment.js',
                            // 'https://js.squareup.com/v2/paymentform', 
                            // 'js/controllers/chart.js',
                            'js/controllers/printerTixs.js'
                          ])
              })

             
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: load( ['toaster','js/controllers/signin.js',] )
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: load( ['toaster','ui.select','js/controllers/signup.js','js/controllers/select.js'] )
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html',
                  resolve: load( ['toaster','ui.select','js/controllers/forgotpwd.js','js/controllers/select.js'] )

              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'tpl/app_calendar.html',
                  // use resolve to load other dependences
                  resolve: load(['moment','fullcalendar','ui.calendar','js/app/calendar/calendar.js'])
              })

              // mail
              .state('app.mail', {
                  abstract: true,
                  url: '/mail',
                  templateUrl: 'tpl/mail.html',
                  // use resolve to load other dependences
                  resolve: load( ['js/app/mail/mail.js','js/app/mail/mail-service.js','moment'] )
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'tpl/mail.list.html'
              })
              .state('app.mail.detail', {
                  url: '/{mailId:[0-9]{1,4}}',
                  templateUrl: 'tpl/mail.detail.html'
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: 'tpl/mail.new.html'
              })

              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/layout.html'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: load( ['js/controllers/vectormap.js'] )
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_mobile.html'
                      }
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: load( ['js/controllers/tab.js'] )
              })
              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/layout.html'
              })
              .state('apps.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps_note.html',
                  resolve: load( ['js/app/note/note.js','moment'] )
              })
              .state('apps.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/apps_contact.html',
                  resolve: load( ['js/app/contact/contact.js'] )
              })
              .state('apps.products', {
                  url: '/products',
                  templateUrl: 'tpl/apps_products.html',
                  resolve: load(['ui.select','toaster','js/app/products/products.js','js/controllers/bootstrap.js',,'js/controllers/select.js'])
              })
              .state('app.invoicesV', {
                  url: '/invoicesV',
                  templateUrl: 'tpl/app_invoicesV.html',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/invoices/invoicesV.js','js/controllers/bootstrap.js'])
              })
              .state('app.salesV', {
                  url: '/salesV',
                  templateUrl: 'tpl/app_salesV.html',
                  controller: 'SalesVCtrl',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/sales/salesV.js','js/controllers/bootstrap.js','js/controllers/chart.js'])
              })
              .state('app.commission', {
                  url: '/commission',
                  templateUrl: 'tpl/app_commission.html',
                  controller: 'CommissionCtrl',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/products/commissions.js','js/controllers/bootstrap.js','js/controllers/chart.js'])
              })
               .state('apps.supportV', {
                  url: '/supportV',
                  templateUrl: 'tpl/apps_supportV.html',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/support/supportV.js','js/controllers/bootstrap.js'])
              })
                .state('apps.support', {
                  url: '/support',
                  templateUrl: 'tpl/apps_support.html',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/support/support.js','js/controllers/bootstrap.js'])
              })
              .state('apps.productsV', {
                  url: '/productsV',
                  templateUrl: 'tpl/apps_productsV.html',
                // resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/products/productsV.js','js/controllers/bootstrap.js','js/controllers/payment.js'])
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/products/productsV.js','js/controllers/bootstrap.js',,'js/controllers/select.js'])
              })
              .state('apps.productsP', {
                  url: '/productsP',
                  templateUrl: 'tpl/apps_productsP.html',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/products/productsP.js','js/controllers/bootstrap.js',,'js/controllers/select.js'])
              })
              .state('apps.supportP', {
                  url: '/supportP',
                  templateUrl: 'tpl/apps_supportP.html',
                  resolve: load(['angularFileUpload','ui.select','xeditable','toaster','js/app/support/supportP.js','js/controllers/bootstrap.js'])
              })
              .state('app.weather', {
                  url: '/weather',
                  templateUrl: 'tpl/apps_weather.html',
                  resolve: load(['js/app/weather/skycons.js','angular-skycons','js/app/weather/ctrl.js','moment'])
              })
              .state('app.todo', {
                  url: '/todo',
                  templateUrl: 'tpl/apps_todo.html',
                  resolve: load(['js/app/todo/todo.js', 'moment'])
              })
              .state('app.todo.list', {
                  url: '/{fold}'
              })
              .state('app.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps_note_material.html',
                  resolve: load(['js/app/note/note.js', 'moment'])
              })
              .state('music', {
                  url: '/music',
                  templateUrl: 'tpl/music.html',
                  controller: 'MusicCtrl',
                  resolve: load([
                            'com.2fdevs.videogular', 
                            'com.2fdevs.videogular.plugins.controls', 
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js', 
                            'js/app/music/theme.css'
                          ])
              })

              .state('app.preCheckout', {
                  url: '/preCheckout',
                  templateUrl: 'tpl/app_preCheckout.html',
                  // controller: 'PaymentController',
                  resolve: load([
                            // 'js/controllers/payment.js',
                            // 'https://js.squareup.com/v2/paymentform', 
                            'js/controllers/chart.js'
                          ])
              })
              
              // .state('app.checkout', {
              //     url: '/checkout',
              //     templateUrl: 'tpl/app_checkout.html',
              //     // controller: 'PaymentController',
              //     resolve: load([
              //               'js/controllers/payment.js',
              //               'https://js.squareup.com/v2/paymentform', 
              //               // 'js/controllers/chart.js'
              //             ])
              // })
              .state('app.checkout', {
                  url: '/checkout',
                  templateUrl: 'tpl/app_checkoutPayeezy.html',
                  // controller: 'PaymentController',
                  resolve: load([
                            'js/controllers/paymentPayeezy.js'
                            // 'https://js.squareup.com/v2/paymentform', 
                            // 'js/controllers/chart.js'
                          ])
              })
              .state('app.checkoutSandBox', {
                  url: '/checkoutSandBox',
                  templateUrl: 'tpl/app_checkoutPayeezySandBox.html',
                  // controller: 'PaymentController',
                  resolve: load([
                            'js/controllers/paymentPayeezySandBox.js'
                            // 'https://js.squareup.com/v2/paymentform', 
                            // 'js/controllers/chart.js'
                          ])
              })
      
              .state('app.okCheckout', {
                  url: '/okCheckout',
                  templateUrl: 'tpl/app_okCheckout.html',
                  controller: 'OkCheckoutController',
                  resolve: load([
                            'js/controllers/okCheckout.js',
                          
                            'js/controllers/chart.js'
                          ])
              })
              .state('app.listTixs', {
                  url: '/listTixs',
                  templateUrl: 'tpl/app_listTixs.html',
                  controller: 'ListTixsController',
                  resolve: load([
                            'js/controllers/listTixs.js',
                          
                            'js/controllers/chart.js'
                          ])
              })
              .state('app.printTixs', {
                  url: '/printTixs',
                  templateUrl: 'tpl/app_printTixs.html',
                  controller: 'PrintTixsController',
                  resolve: load([
                            'js/controllers/printTixs.js',
                          
                            'js/controllers/chart.js'
                          ])
              })
               .state('printTixsCustomer', {
                  url: '/printTixsCustomer',
                  templateUrl: 'tpl/app_printTixsCustomer.html',
                  controller: 'PrintTixsCustomerController',
                  resolve: load([
                            'js/controllers/printTixsCustomer.js'
                          
                            // 'js/controllers/chart.js'
                          ])
              })
                  // .state('music.home', {
                  //     url: '/home',
                  //     templateUrl: 'tpl/music.home.html'
                  // })
                  .state('music.genres', {
                      url: '/genres',
                      templateUrl: 'tpl/music.genres.html'
                  })
                  .state('music.detail', {
                      url: '/detail',
                      templateUrl: 'tpl/music.detail.html'
                  })
                  .state('music.mtv', {
                      url: '/mtv',
                      templateUrl: 'tpl/music.mtv.html'
                  })
                  .state('music.mtvdetail', {
                      url: '/mtvdetail',
                      templateUrl: 'tpl/music.mtv.detail.html'
                  })
                  .state('music.playlist', {
                      url: '/playlist/{fold}',
                      templateUrl: 'tpl/music.playlist.html'
                  })
              .state('app.material', {
                  url: '/material',
                  template: '<div ui-view class="wrapper-md"></div>',
                  resolve: load(['js/controllers/material.js'])
                })
                .state('app.material.button', {
                  url: '/button',
                  templateUrl: 'tpl/material/button.html'
                })
                .state('app.material.color', {
                  url: '/color',
                  templateUrl: 'tpl/material/color.html'
                })
                .state('app.material.icon', {
                  url: '/icon',
                  templateUrl: 'tpl/material/icon.html'
                })
                .state('app.material.card', {
                  url: '/card',
                  templateUrl: 'tpl/material/card.html'
                })
                .state('app.material.form', {
                  url: '/form',
                  templateUrl: 'tpl/material/form.html'
                })
                .state('app.material.list', {
                  url: '/list',
                  templateUrl: 'tpl/material/list.html'
                })
                .state('app.material.ngmaterial', {
                  url: '/ngmaterial',
                  templateUrl: 'tpl/material/ngmaterial.html'
                });

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );
