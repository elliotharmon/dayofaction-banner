/*

     ______   ______   ______
    |  ____| |  ____| |  ____|
    | |__    | |__    | |__
    |  __|   |  __|   |  __|
    | |____  | |      | |
    |______| |_|      |_|

  =============================================================================

  Support the Net Neutrality Day of Action campaign by installing this banner on your site.

  https://www.eff.org/deeplinks/2017/06/eff-and-broad-coalition-call-day-action-defend-net-neutrality

  github.com/EFForg/dayofaction-banner for support

  =============================================================================

  @source: github.com/EFForg/dayofaction-banner

  @licstart  The following is the entire license notice for the
             JavaScript code in this page.

  Copyright (C) 2016 Electronic Frontier Foundation <https://eff.org>

  The JavaScript code in this page is free software: you can
  redistribute it and/or modify it under the terms of the GNU
  General Public License (GNU GPL) as published by the Free Software
  Foundation, either version 3 of the License, or (at your option) any
  later version.  The code is distributed WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS FOR
  A PARTICULAR PURPOSE.  See the GNU GPL for more details.

  As additional permission under GNU GPL version 3 section 7, you may
  distribute non-source (e.g., minimized or compacted) forms of that
  code without the copy of the GNU GPL normally required by section
  4, provided you include this license notice and a URL through which
  recipients can access the Corresponding Source.

 @licend  The above is the entire license notice for the JavaScript
          code in this page.

*/

// Wrap widget in function to protect scope
var _banner_config = (typeof banner_config  !== 'undefined') ? banner_config  : {};

(function (window, widgetConfig) {

  // Do configuration
  widgetConfig.show_style = widgetConfig.show_style || 'banner';
  widgetConfig.debug = widgetConfig.debug || false;
  widgetConfig.localAssets = widgetConfig.localAssets || false;
  widgetConfig.callOnly = widgetConfig.callOnly || false;
  widgetConfig.startAsMinimized = widgetConfig.startAsMinimized || false;
  widgetConfig.disableDate = widgetConfig.disableDate || false;
  widgetConfig.campaign = widgetConfig.campaign || 'netneutrality17';
  widgetConfig.cookieTimeout = widgetConfig.cookieTimeout || null;

  // Setup
  var asset_url;
  if (widgetConfig.localAssets)
    asset_url = '../banner_content/';
  else
    asset_url = 'https://www.eff.org/doa/banner_content/';
  asset_url += widgetConfig.campaign + '/';

  // Cookie helpers, taken from w3schools
  function setCookie(c_name, value, seconds) {
    var exdate = new Date(new Date().getTime() + seconds * 1000);
    var c_value = escape(value) + ((seconds === null) ? '' : '; expires=' +
      exdate.toUTCString());
    document.cookie = c_name + '=' + c_value;
  }

  function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(' ' + c_name + '=');

    if (c_start === -1) {
      c_start = c_value.indexOf(c_name + '=');
    }

    if (c_start === -1) {
      c_value = null;
    } else {
      c_start = c_value.indexOf('=', c_start) + 1;
      var c_end = c_value.indexOf(';', c_start);
      if (c_end === -1) { c_end = c_value.length; }
      c_value = unescape(c_value.substring(c_start, c_end));
    }

    return c_value;
  }

  // Define checks
  var checks = {
    correctDate: function (campaign, callback) {
      var today = new Date();
      var activeToday = today.getDate() === campaign.runDate.day &&
                        today.getMonth() === campaign.runDate.month - 1 &&
                        today.getFullYear() === campaign.runDate.year;
      callback({ activeToday: activeToday || widgetConfig.disableDate || widgetConfig.debug });
    }
  };

  // Define campaigns
  var campaign = {
    noglobalwarrants: {
      type: 'banner',
      cookieName: 'noglobalwarrants_hasseen',
      runDate: {
        day: 21,
        month: 6, // Use natural month, e.g. January = 1
        year: 2016
      },
      size: {
        desktop: {
          height: '300px',
          width: '350px'
        },
        mobile: {
          height: '300px',
          width: '350px'
        }
      },
      styles: {
        banner: {
          campaignSpacer: 'height: 50px;',
          campaignContainer: 'background: #000; position: fixed; ' +
            'width: 100%; bottom: 0; left: 0; z-index: 100000; padding: 0; ' +
            '-webkit-box-sizing: border-box; -moz-box-sizing: border-box;',
          iframeContainer: 'position: relative; height: 350px; width: 100%; ' +
            'margin: 0; background: #08A013; z-index: 1;',
          iframe: 'width: 100%; height: 100%; border: 0; margin: 0; ' +
            'padding: 0; background: #08A013;',
          footerOverlay: 'cursor: pointer; position: absolute; bottom: 0; ' +
            'height: 50px; width: 100%; margin: 0; background: none; ' +
            'z-index: 2;',
          closeButton: 'border: 0; height: 26px; width: 26px; ' +
            'cursor: pointer; position: absolute; top: 20px; right: 20px; ' +
            'background: url("' + asset_url + 'imgs/close-button.png") no-repeat right top;',
          mobileCloseButton: 'border: 0; height: 20px; width: 20px; ' +
            'cursor: pointer; position: absolute;top: 10px; right: 10px; ' +
            'background: url("' + asset_url +
            'imgs/close-button-mobile.png") no-repeat right top;',
          openButton: 'border: 0; height: 26px; width: 26px; ' +
            'cursor: pointer; position: absolute; bottom: 10px; ' +
            'right: 20px; background: url("' + asset_url +
            'imgs/open-button.png") no-repeat right top;'
        }
      },
      fullSize: true,
      minimized: false,
      show: function (options) { }
    },
    netneutrality17: {
      type: 'popup',
      cookieName: 'netneutrality17_hasseen',
      runDate: {
        day: 12,
        month: 7, // Use natural month, e.g. January = 1
        year: 2017
      },
      minimized: false,
      show: function (options) { }
    }
  };

  function initCampaign(campaign, config) {
    var cookie = getCookie(campaign.cookieName);

    if (cookie)
      campaign.minimized = JSON.parse(cookie).minimized;
    else if (config.startAsMinimized)
      campaign.minimized = true;

    if (campaign.minimized && campaign.type == 'popup')
      return;

    checks.correctDate(campaign, function(response) {
      if (response.activeToday) {
        var firstTime = !!cookie && campaign.fullSize;
        var iframe = document.createElement('iframe');
        iframe.id = 'eff-campaign-iframe';
        iframe.src = asset_url + widgetConfig.show_style + '.html?firstTime=' + firstTime;

        var e = document.documentElement,
            g = document.getElementsByTagName('body')[0],
            x = window.innerWidth || e.clientWidth || g.clientWidth;

        campaign.fullSize = x >= 767;

        if (campaign.type == 'banner') {
          var style = campaign.styles[widgetConfig.show_style];
          iframe.style.cssText = style.iframe;

          // Create a spacer to prevent the container from covering up
          // parts of the containing page when minimized
          var campaignSpacer = document.createElement('div');
          window.campaignSpacer = campaignSpacer;
          campaignSpacer.style.cssText = style.campaignSpacer;
          campaignSpacer.setAttribute("id", "campaign-spacer");
          campaignSpacer.setAttribute("class", "campaign-spacer");

          // Create a container
          var campaignContainer = document.createElement('div');
          window.campaignContainer = campaignContainer;
          campaignContainer.style.cssText = style.campaignContainer;
          campaignContainer.setAttribute("id", "campaign-container");
          campaignContainer.setAttribute("class", "campaign-container");

          // Create a container for the iframe so we can do padding and
          // border-radius properly
          var iframeContainer = document.createElement('div');
          iframeContainer.style.cssText = style.iframeContainer;

          if (campaign.fullSize) {
            // Find out if user has minimized via cookie
            if (campaign.minimized) {
              iframeContainer.style.height = '50px';
            } else {
              iframeContainer.style.height = campaign.size.desktop.heightOpened;
            }

            var footerOverlay = document.createElement('div');
            footerOverlay.style.cssText = style.footerOverlay;
            campaignContainer.appendChild(footerOverlay);
          } else {
            if (!campaign.minimized) {
              iframeContainer.style.height = '100px';
            } else {
              iframeContainer.style.height = '0px';
            }
          }

          if (campaign.fullSize) {
            // Setup a close button
            var closeButton = document.createElement('button');
            closeButton.style.cssText = style.closeButton;
            iframeContainer.appendChild(closeButton);

            // Setup a open button
            var openButton = document.createElement('button');
            openButton.style.cssText = style.openButton;
            iframeContainer.appendChild(openButton);

            if (campaign.minimized) {
              openButton.style.display = 'block';
              closeButton.style.display = 'none';
              footerOverlay.style.display = 'block';
            } else {
              openButton.style.display = 'none';
              closeButton.style.display = 'block';
              footerOverlay.style.display = 'none';
            }

            var toggleDisplay = function () {
              if (!campaign.minimized) {
                iframeContainer.style.height = '50px';
                campaign.minimized = true;
                footerOverlay.style.display = 'block';
                closeButton.style.display = 'none';
                openButton.style.display = 'block';
                setCookie(campaign.cookieName, '{"minimized": true}', widgetConfig.cookieTimeout);
              } else {
                iframeContainer.style.height = '300px';
                campaign.minimized = false;
                footerOverlay.style.display = 'none';
                openButton.style.display = 'none';
                closeButton.style.display = 'block';
                setCookie(campaign.cookieName, '{"minimized": false}', widgetConfig.cookieTimeout);
              }
            };

            footerOverlay.onclick = toggleDisplay;
            closeButton.onclick = toggleDisplay;
          } else {
            var mobileCloseButton = document.createElement('button');
            mobileCloseButton.style.cssText = style.mobileCloseButton;
            iframeContainer.appendChild(mobileCloseButton);

            if (campaign.minimized) {
              mobileCloseButton.style.display = 'none';
            } else {
              mobileCloseButton.style.display = 'block';
            }
            mobileCloseButton.onclick = function () {
              setCookie(campaign.cookieName, '{"minimized": true}',
                        widgetConfig.cookieTimeout);
              document.body.removeChild(campaignContainer);
            };
          }

          // Append Iframe and campaign container to document
          if (document.getElementById("campaign-spacer"))
            document.body.removeChild(document.getElementById("campaign-spacer"));

          if (document.getElementById("campaign-container"))
            document.body.removeChild(document.getElementById("campaign-container"));

          campaignContainer.appendChild(iframeContainer);
          iframeContainer.appendChild(iframe);

          document.body.appendChild(campaignSpacer);
          document.body.appendChild(campaignContainer);
        } else if (campaign.type == 'popup') {
          iframe.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: transparent';

          var closeModal = function() {
            iframe.style.display = 'none';
            document.getElementsByTagName('body')[0].style.overflow = null;
            setCookie(campaign.cookieName, '{"minimized": true}', widgetConfig.cookieTimeout);
          };

          window.addEventListener("message", function(event) {
            if (event.data == "eff-doa-closeModal")
            closeModal();
          });

          if (document.getElementById("eff-campaign-iframe"))
            document.body.removeChild(document.getElementById("eff-campaign-iframe"));

          document.body.appendChild(iframe);

          document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }

        campaign.config = config;
        campaign.show(config);
      }
    });
  }

  // Load campaign if it exists
  if (typeof campaign[widgetConfig.campaign] !== 'undefined') {
    var activeCampaign = campaign[widgetConfig.campaign];
    initCampaign(activeCampaign, widgetConfig);

    if (window.addEventListener)
      window.addEventListener('resize', function() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;

        if ((activeCampaign.fullSize && x < 767) || (!activeCampaign.fullSize && x > 767)) {
          if (window.bannerResizeCallback)
            clearTimeout(window.bannerResizeCallback);

          window.bannerResizeCallback = setTimeout(function () {
            initCampaign(activeCampaign, widgetConfig);
          }, 50);
        }
      }, false);

  } else {
    return false;
  }
})(window, _banner_config);
