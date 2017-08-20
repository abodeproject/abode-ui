angular.module('abode').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/index.html',
    "<div ui-view></div>"
  );


  $templateCache.put('modules/abode/views/confirm.html',
    "<div class=\"modal-header\">\n" +
    "	<h3 ng-show=\"options.title\"><i class=\"{{options.icon}}\" ng-show=\"options.icon\"></i> {{options.title}}</h3>\n" +
    "	<h4>{{msg}}</h4>\n" +
    "\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-xs-7 col-xs-offset-5\">\n" +
    "			<div class=\"btn-group btn-group-justified\">\n" +
    "				<div class=\"btn-group\" role=\"group\">\n" +
    "			    	<button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"no()\">No</button>\n" +
    "				</div>\n" +
    "				<div class=\"btn-group\" role=\"group\">\n" +
    "			    	<button class=\"btn btn-success btn-sm\" type=\"button\" ng-click=\"yes()\">Yes</button>\n" +
    "				</div>\n" +
    "		    </div>\n" +
    "	    </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/abode/views/display_popover.html',
    "<div style=\"width: 240px;\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"row\" ng-show=\"display.max_brightness\" ng-show=\"device\">\n" +
    "      <div class=\"col-xs-12\">\n" +
    "      	<h4>Brightness</h4>\n" +
    "      	<rzslider rz-slider-model=\"slider.level\" rz-slider-options=\"slider.options\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "      	<div>&nbsp;</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-12\"\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-4\">Status</div>\n" +
    "          <div class=\"col-xs-1\" style=\"font-size: .8em;\"><i class=\"icon-server\"></i></div>\n" +
    "          <div class=\"col-xs-3 text-right\" style=\"font-size: .8em;\"><i class=\"icon-clouddownload\"></i></div>\n" +
    "          <div class=\"col-xs-3 text-right\" style=\"font-size: .8em;\"><i class=\"icon-clouderror\"></i></div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-offset-4 col-xs-1\" style=\"font-size: .8em;\">\n" +
    "            <i class=\"icon-ok text-success\" ng-show=\"root.status.connected\"></i>\n" +
    "            <i class=\"icon-erroralt text-danger\" ng-show=\"!root.status.connected\"></i>\n" +
    "          </div>\n" +
    "          <div class=\"col-xs-3 text-right\" style=\"font-size: .8em;\">{{root.status.messages | number:0}}</div>\n" +
    "          <div class=\"col-xs-3 text-right\" style=\"font-size: .8em;\">{{root.status.errors | number:0}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-show=\"device\">\n" +
    "    	<div class=\"col-xs-12 text-center\">\n" +
    "        <div class=\"btn-group btn-group-justified\">\n" +
    "          <div class=\"btn-group\">\n" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"lock()\"><i class=\"icon-lock\"></i></button>\n" +
    "          </div>\n" +
    "          <div class=\"btn-group\" ng-show=\"root.status.connected\">\n" +
    "            <button class=\"btn btn-default btn-sm\"  ui-sref=\"main.settings.client\"><i class=\"icon-settingsfour-gearsalt\"></i></button>\n" +
    "          </div>\n" +
    "          <div class=\"btn-group\">\n" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"network()\"><i class=\"icon-network\"></i></button>\n" +
    "          </div>\n" +
    "          <div class=\"btn-group\">\n" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"power()\"><i class=\"icon-off\"></i></button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/display_status.html',
    "<div uib-popover-template=\"'modules/abode/views/display_popover.html'\" popover-trigger=\"'outsideClick click'\" popover-placement=\"bottom-right\" popover-is-open=\"popover\">\n" +
    "  <i ng-show=\"loading\" class=\"text-muted pointer icon-circleselection spin\"></i>\n" +
    "  <i ng-hide=\"loading || device == false\" class=\"pointer\" ng-class=\"{'text-danger': !network.connected, 'text-success': network.connected, 'icon-lan': !network.essid, 'icon-lan': !network.essid, 'icon-networksignal': network.essid, 'text-warning': network.connected && !root.status.connected}\"></i>\n" +
    "  <i ng-hide=\"loading || device == true\" class=\"pointer\" ng-class=\"{'icon-plug': !root.status.connected, 'icon-networksignal': root.status.connected, 'text-success': root.status.connected, 'text-danger': !root.status.connected}\"></i>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/abode/views/event_status.html',
    "<div style=\"text-align: left;\">\n" +
    "	<div ng-show=\"root.status.connected\">Status: Connected</div>\n" +
    "	<div ng-show=\"!root.status.connected\">Status: Disconnected</div>\n" +
    "	<div>Events: {{root.status.messages | number:0}}</div>\n" +
    "	<div>Errors: {{root.status.errors | number:0}}</div>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/icons.html',
    "<div class=\"icon-selector bg-muted\">\n" +
    "<ul>\n" +
    "	<li ng-repeat=\"icon in icons | orderBy: 'name'\" ng-class=\"{'icon-selected': icon.class == value}\" ng-click=\"selectIcon(icon)\"><i class=\"{{icon.class}}\"></i></li>\n" +
    "<ul>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/index.html',
    "<div class=\"view\" ui-view>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"anav-shade\" ng-click=\"anav_open = false; notifications.hidden = true\" ng-show=\"anav_open || !notifications.hidden\"></div>\n" +
    "\n" +
    "<slide-nav>\n" +
    "  <div class=\"slide-nav-header\">\n" +
    "        <img src=\"https://abode.scottneel.com/images/home.png\" class=\"slide-nav-header-badge img-circle\">\n" +
    "  </div>\n" +
    "  <div class=\"slide-nav-body\">\n" +
    "    <div class=\"row\">\n" +
    "      <ul class=\"slide-nav-list\">\n" +
    "        <li class=\"slide-nav-list-item\" ng-click=\"go('main.home')\"><i class=\"glyphicon glyphicon-home\"></i> Home</li>\n" +
    "        <li class=\"slide-nav-list-item\" ng-repeat=\"interface in interfaces | orderBy: '+name'\" ui-sref=\"main.home({interface: interface.name})\" ><i class=\"{{interface.icon}}\"></i> {{interface.name}}</li>\n" +
    "        <!--\n" +
    "        <li class=\"slide-nav-list-item\" ng-click=\"go('main.rooms')\"><i class=\"glyphicon glyphicon-modal-window\"></i> Rooms</li>\n" +
    "        <li class=\"slide-nav-list-item\" ng-click=\"go('main.devices')\"><i class=\"glyphicon glyphicon-oil\"></i> Devices</li>\n" +
    "        <li class=\"slide-nav-list-item\" ng-click=\"go('main.scenes')\"><i class=\"icon-picture\"></i> Scenes</li>\n" +
    "        <li class=\"slide-nav-list-item\" ng-click=\"go('main.notifications')\"><i class=\"icon-flag\"></i> Notifications</li>\n" +
    "        <li class=\"slide-nav-list-item\" ng-click=\"go('main.triggers')\"><i class=\"icon-bomb\"></i> Triggers</li>\n" +
    "        -->\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"slide-nav-footer\">\n" +
    "    <div class=\"slide-nav-footer-item\" ng-click=\"go('main.settings')\">\n" +
    "      <i class=\"glyphicon glyphicon-cog\"></i> Settings\n" +
    "    </div>\n" +
    "    <div class=\"slide-nav-footer-item\" ng-click=\"logout()\">\n" +
    "      <i class=\"glyphicon glyphicon-log-out\"></i>Log out</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</slide-nav>\n" +
    "<!--\n" +
    "<div class=\"anav-drawer\" ng-class=\"{'anav-visible': anav_open}\">\n" +
    "  <div class=\"anav-opener\">\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"anav-top\">\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-4\"><img src=\"./images/home.png\" style=\"height: 5em;\"></div>\n" +
    "        <div class=\"col-xs-8\" style=\"text-align: right\">\n" +
    "\n" +
    "  <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\">\n" +
    "    <button id=\"single-button\" type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "      <i class=\"icon-monitor\"></i> Interface <span class=\"caret\"></span>\n" +
    "    </button>\n" +
    "    <ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "      <li role=\"menuitem\" ng-repeat=\"interface in interfaces | orderBy: '+name'\" ui-sref=\"main.home({interface: interface.name})\" ><a href=\"#\"ng-click=\"anav_open=false\"><i class=\"{{interface.icon}}\"></i> {{interface.name}}</a></li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"anav-mid\">\n" +
    "    <ul>\n" +
    "      <li ui-sref=\"main.home\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-home\"></i> Home</li>\n" +
    "      <li ui-sref=\"main.rooms\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-modal-window\"></i> Rooms</li>\n" +
    "      <li ui-sref=\"main.devices\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-oil\"></i> Devices</li>\n" +
    "      <li ui-sref=\"main.scenes\" ng-click=\"anav_open=false\"><i class=\"icon-picture\"></i> Scenes</li>\n" +
    "      <li ui-sref=\"main.notifications\" ng-click=\"anav_open=false\"><i class=\"icon-flag\"></i> Notifications</li>\n" +
    "      <li ui-sref=\"main.triggers\" ng-click=\"anav_open=false\"><i class=\"icon-bomb\"></i> Triggers</li>\n" +
    "\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"anav-bottom\">\n" +
    "    <ul>\n" +
    "      <li ui-sref=\"main.settings\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-cog\"></i> Settings</li>\n" +
    "      <li class=\"text-right\" ng-click=\"logout()\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "-->\n" +
    "<div style=\"position: absolute; z-index: 1000; font-size: 3em;\">\n" +
    "</div>\n" +
    "<div class=\"status-bar\" ng-class=\"{night: time.is.night && client.night_mode}\">\n" +
    "  <div class=\"anav-opener  text-muted pull-left\"  ng-click=\"openNav()\"><i class=\"icon-menu\"></i></div>\n" +
    "  <!--\n" +
    "  <div class=\"anav-opener  text-muted pull-left\"  ng-click=\"anav_open = true\"><i class=\"icon-menu\"></i></div>\n" +
    "  -->\n" +
    "  <div ng-show=\"client.show_date\">{{date | date:'EEE, MMM d'}}</div>\n" +
    "  <weather-status></weather-status>\n" +
    "  <device-status device=\"device\"></device-status>\n" +
    "  <notifications-status></notifications-status>\n" +
    "  &nbsp;\n" +
    "  <span uib-dropdown class=\"pointer\">\n" +
    "    <span uib-dropdown-toggle>\n" +
    "      &nbsp;\n" +
    "      <i class=\"glyphicon glyphicon-option-vertical\"></i>\n" +
    "      &nbsp;\n" +
    "    </span>\n" +
    "    <ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu>\n" +
    "          <li><a ui-sref=\"main.rooms\"><i class=\"glyphicon glyphicon-modal-window\"></i> Rooms</a></li>\n" +
    "          <li><a ui-sref=\"main.devices\"><i class=\"glyphicon glyphicon-oil\"></i> Devices</a></li>\n" +
    "          <li><a ui-sref=\"main.scenes\"><i class=\"icon-picture\"></i> Scenes</a></li>\n" +
    "          <li><a ui-sref=\"main.notifications\"><i class=\"icon-flag\"></i> Notifications</a></li>\n" +
    "          <li><a ui-sref=\"main.triggers\"><i class=\"icon-bomb\"></i> Triggers</a></li>\n" +
    "          <li class=\"divider\"></li>\n" +
    "          <li><a ui-sref=\"main.settings\"><i class=\"glyphicon glyphicon-cog\"></i> Settings</a></li>\n" +
    "          <li class=\"divider\"></li>\n" +
    "          <li><a  ng-click=\"logout()\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li>\n" +
    "      </ul>\n" +
    "  </span>\n" +
    "</div>\n" +
    "<notifications></notifications>\n"
  );


  $templateCache.put('modules/abode/views/locked.html',
    "<div class=\"modal-body text-center\">\n" +
    "<pin-entry pin-model=\"pin\" randomize=\"true\" show-submit=\"true\" submit=\"unlock(pin)\" checking=\"checking\" error=\"error\" success=\"success\"></pin-entry>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/message.html',
    "<div class=\"messages\" ng-class=\"{'messages-active': messages.length > 0}\">\n" +
    "  <div class=\"messages-message\" ng-repeat=\"message in messages\">\n" +
    "    <i class=\"\" ng-class=\"{'text-success': message.type == 'success', 'text-info': message.type == 'info', 'text-danger': message.type == 'failed', 'icon-ok-sign': message.type == 'success', 'icon-info-sign': message.type == 'info', 'icon-warning-sign': message.type == 'failed'}\"></i> {{message.message}}\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/network.html',
    "<div class=\"modal-body\">\n" +
    "  <h3>\n" +
    "    <i class=\"icon-network\"></i>&nbsp;&nbsp;Network\n" +
    "  </h3>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-sm-5 col-md-4\">\n" +
    "      <div class=\"well\" style=\"font-size: .9em;\">\n" +
    "        <div>Connection: <i class=\"icon-circleselection spin\" ng-show=\"checking\"></i><i class=\"icon-ok text-success\" ng-show=\"status.connected && !checking\"></i><i class=\"icon-erroralt text-danger\" ng-show=\"!status.connected && !checking\"></i></div>\n" +
    "        <div ng-show=\"status.connected\">\n" +
    "          <div>Interface: {{status.interface}}</div>\n" +
    "          <div>IP: {{status.ip}}</div>\n" +
    "          <div>Gateway: {{status.gateway}}</div>\n" +
    "          <div ng-show=\"status.essid\">SSID: {{status.essid}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12  col-sm-7 col-md-8\">\n" +
    "      <div class=\"list-group\">\n" +
    "        <button type=\"button\" class=\"list-group-item list-group-item-danger\" ng-show=\"networks.length == 0 && !scanning\" ng-click=\"scan()\"><i class=\"icon-exclamation-sign text-danger\"></i> Unable to detect any networks to connect to. Click to Scan</button>\n" +
    "\n" +
    "        <button type=\"button\" class=\"list-group-item\" ng-repeat=\"ssid in networks\" ng-click=\"connect_wifi(ssid)\">\n" +
    "          <i ng-show=\"ssid.encryption\" class=\"icon-lock\" ng-class=\"{'text-warning': !ssid.connected, 'text-success': ssid.connected}\"></i> \n" +
    "          <i ng-show=\"!ssid.encryption\" class=\"icon-wifi\" ng-class=\"{'text-danger': !ssid.connected, 'text-success': ssid.connected}\"></i> \n" +
    "          {{ssid.essid}} <span class=\"pull-right\">{{ssid.signal}}</span><br> <div class=\"text-muted\" style=\"font-size: .7em;\">{{ssid.macaddress}}</div>\n" +
    "        </button>\n" +
    "\n" +
    "        <button type=\"button\" class=\"list-group-item\" disabled ng-show=\"scanning\"><i class=\"icon-circleselection spin \"></i> Searching of wireless networks...</button>\n" +
    "\n" +
    "        <button type=\"button\" class=\"list-group-item\" ng-show=\"!scanning && networks.length > 0\" ng-click=\"scan()\"><i class=\"icon-ok-sign text-success\"></i> Found {{networks.length}} Networks[s]<div><small>Click to scan again.</small></div></button>\n" +
    "\n" +
    "      </div>\n" +
    "      <p class=\"text-center\"><strong>- Manual Connection -</strong></p>\n" +
    "      <form name=\"manualSSIDFrm\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-group\">\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"ssid\" placeholder=\"SSID\" required=\"\" ng-model=\"manual_wifi.essid\">\n" +
    "          <span class=\"input-group-btn\">\n" +
    "            <button type=\"submit\" class=\"pull-right btn btn-default\" ng-click=\"connect_wifi(manual_wifi)\" ng-disabled=\"!manual_wifi.essid\">\n" +
    "              <i class=\"icon-connected\"></i> Connect\n" +
    "            </button>\n" +
    "          </span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 text-right\">\n" +
    "      <button class=\"btn btn-link btn-sm btn-warning\" ng-click=\"close()\">Close</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/pin_entry.html',
    "<div  style=\"display: inline-block; width: 12em; padding: 0em;\">\n" +
    "	<div style=\"width: 100%; border-radius: .25em;  border: 1px solid #aaa; background-color: #333; padding: .25em; height: 2em; margin: 0em;\" ng-class=\"{'text-danger': error, 'text-muted': !error && !success, 'text-success': success}\">\n" +
    "	<i ng-repeat=\"k in pinModel track by $index\" style=\"margin: .25em;\" class=\"icon-circlerecord \"></i>\n" +
    "	</div>\n" +
    "	<div>\n" +
    "	<div>&nbsp;</div>\n" +
    "	<div style=\"text-align: left\">\n" +
    "		<button ng-repeat=\"k in [0, 1, 2] track by $index\" class=\"pin-entry-key\" ng-class=\"{'pin-entry-key-disabled': checking || error}\" ng-click=\"entry(numbers[k])\" ng-disabled=\"checking || error\">{{numbers[k]}}</button>\n" +
    "	</div>\n" +
    "	<div style=\"text-align: left\">\n" +
    "		<button ng-repeat=\"k in [3, 4, 5] track by $index\" class=\"pin-entry-key\" ng-class=\"{'pin-entry-key-disabled': checking || error}\" ng-click=\"entry(numbers[k])\" ng-disabled=\"checking || error\">{{numbers[k]}}</button>\n" +
    "	</div>\n" +
    "	<div style=\"text-align: left\">\n" +
    "		<button ng-repeat=\"k in [6, 7, 8] track by $index\" class=\"pin-entry-key\" ng-class=\"{'pin-entry-key-disabled': checking || error}\" ng-click=\"entry(numbers[k])\" ng-disabled=\"checking || error\">{{numbers[k]}}</button>\n" +
    "	</div>\n" +
    "	<div style=\"text-align: left\">\n" +
    "		<button class=\"pin-entry-key\" ng-class=\"{'pin-entry-key-disabled': checking || error}\" ng-click=\"entry('back')\"><i class=\"icon-chevron-left\" ng-disabled=\"checking || error\"></i></button><button class=\"pin-entry-key\" ng-class=\"{'pin-entry-key-disabled': checking || error}\" ng-click=\"entry(numbers[9])\" ng-disabled=\"checking || error\">{{numbers[9]}}</button><button class=\"pin-entry-key\" ng-class=\"{'pin-entry-key-danger': error, 'pin-entry-key-disabled': checking || pinModel.length == 0, 'pin-entry-key-submit': !checking && !success && !error && pinModel.length > 0}\" ng-show=\"showSubmit\" ng-click=\"submit()\" ng-disabled=\"checking || error\">\n" +
    "			<i class=\"icon-unlock\" ng-hide=\"checking\"></i>\n" +
    "			<i class=\"icon-circleselection spin\" ng-show=\"checking\"></i>\n" +
    "		</button>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/power.html',
    "<div class=\"modal-body\">\n" +
    "  <h3><i class=\"icon-off\"></i>&nbsp;&nbsp;Power</h3>\n" +
    "  <h6 ng-show=\"action=='restart' && count_down > 0 && !error\">Restarting in {{count_down}} seconds.<br/><button class=\"btn btn-sm btn-link\" ng-click=\"count_down=1\">Restart Now</button></h6>\n" +
    "  <h6 ng-show=\"action=='restart' && count_down == 0 && !error\">Restarting...</h6>\n" +
    "  <h6 ng-show=\"action=='shutdown' && count_down > 0 && !error\">Shutting down in {{count_down}} seconds.<br/><button class=\"btn btn-sm btn-link\" ng-click=\"count_down=1\">Shut down Now</button></h6>\n" +
    "  <h6 ng-show=\"action=='shutdown' && count_down == 0 && !error\">Shutting Down...</h6>\n" +
    "  <h6 ng-show=\"error\"><i class=\"text-danger icon-erroralt\"></i> {{error}}</h6>\n" +
    "  <div>&nbsp;</div>\n" +
    "  <div class=\"btn-group btn-group-justified\">\n" +
    "    <div class=\"btn-group\" role=\"group\">\n" +
    "      <button class=\"btn btn-default btn-sm\" type=\"button\" ng-click=\"cancel()\" ng-disabled=\"action!='' && count_down == 0 && !error\">Cancel</button>\n" +
    "    </div>\n" +
    "    <div class=\"btn-group\" role=\"group\">\n" +
    "      <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"restart()\" ng-disabled=\"action!=''\">Restart</button>\n" +
    "    </div>\n" +
    "    <div class=\"btn-group\" role=\"group\">\n" +
    "      <button class=\"btn btn-danger btn-sm\" type=\"button\" ng-click=\"shutdown()\" ng-disabled=\"action!=''\">Shutdown</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/abode/views/server_gone.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Server Error</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    The server seems to have gone away.  You can either retry and select another server.\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"retry()\"><i class=\"icon-refresh\"></i> Retry</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"select()\"><i class=\"icon-server\"></i> Select Another</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/abode/views/slider.html',
    "<div class=\"slider\">\n" +
    "	<div class=\"slider-track\"></div>\n" +
    "	<div ng-mousedown=\"start($event)\" ng-mouseup=\"end()\" class=\"slider-handle\" ng-style=\"sliderPosition\"></div>{{level}}\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/tags.add.html',
    "\n" +
    "<div class=\"modal-body\">\n" +
    "	<h3><i class=\"icon-addtags\"></i> Add Tag</h3>\n" +
    "	<div class=\"input-group\" ng-class=\"{'has-error': error}\">\n" +
    "		<div class=\"input-group-addon\"><i class=\"icon-tag\"></i></div>\n" +
    "		<input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Tag\" ng-model=\"tag.name\" autocomplete='off'>\n" +
    "	</div>\n" +
    "	<span id=\"helpBlock\" class=\"help-block text-danger\" ng-show=\"error\">{{error}}</span>\n" +
    "	<div>&nbsp;</div>\n" +
    "	<div class=\"text-right\">\n" +
    "	    <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "	    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"add()\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('modules/abode/views/tags.html',
    "<div class=\"tag-list\">\n" +
    "	<div class=\"tag-list-add\">\n" +
    "		<button class=\"btn btn-link btn-sm\" ng-click=\"addTag()\"><i class=\"icon-addtags\"></i></button>\n" +
    "	</div>\n" +
    "	<div class=\"tag-list-tags\">\n" +
    "		<div class=\"tag-list-tag\" ng-repeat=\"tag in tagModel\">{{tag}} <i class=\"icon-remove-circle text-default pointer\" ng-click=\"removeTag($index)\"></i></div>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('modules/alarmclock/views/add.html',
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"alarm.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Enabled</label>\n" +
    "    <div style=\"font-size: 2em;\">\n" +
    "    <toggle value=\"alarm.enabled\"></toggle>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Time</label>\n" +
    "    <div style=\"font-size: 2em;\">\n" +
    "    <epochtime time=\"alarm.time\" disabled=\"false\"></epochtime>\n" +
    "    </div\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Day of Week:</label>\n" +
    "\n" +
    "    <div class=\"alarm-days\" style=\"font-size: 3em;\">\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.sunday}\" ng-click=\"alarm.sunday = (!alarm.sunday)\">S</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.monday}\" ng-click=\"alarm.monday = (!alarm.monday)\">M</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.tuesday}\" ng-click=\"alarm.tuesday = (!alarm.tuesday)\">T</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.wednesday}\" ng-click=\"alarm.wednesday = (!alarm.wednesday)\">W</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.thursday}\" ng-click=\"alarm.thursday = (!alarm.thursday)\">T</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.friday}\" ng-click=\"alarm.friday = (!alarm.friday)\">F</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.saturday}\" ng-click=\"alarm.saturday = (!alarm.saturday)\">S</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Action:</label>\n" +
    "    <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(alarm.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "    <div>\n" +
    "      <ul class=\"list-group bg-muted select-list\" ng-show=\"alarm.actions.length > 0\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in alarm.actions\" ng-click=\"editAction(action)\">\n" +
    "          {{action.name}}\n" +
    "          <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(alarm.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"save()\"><i class=\"icon-addalarm\"></i> Add </button>\n" +
    "    <button class=\"btn btn-default btn-sm\" type=\"button\" ng-click=\"close()\" ng-hide=\"source\">Close</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/alarmclock/views/edit.html',
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"alarm.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Enabled</label>\n" +
    "    <div style=\"font-size: 2em;\">\n" +
    "    <toggle value=\"alarm.enabled\"></toggle>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Time</label>\n" +
    "    <div style=\"font-size: 2em;\">\n" +
    "    <epochtime time=\"alarm.time\" disabled=\"false\"></epochtime>\n" +
    "    </div\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Day of Week:</label>\n" +
    "\n" +
    "    <div class=\"alarm-days\" style=\"font-size: 3em;\">\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.sunday}\" ng-click=\"alarm.sunday = (!alarm.sunday)\">S</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.monday}\" ng-click=\"alarm.monday = (!alarm.monday)\">M</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.tuesday}\" ng-click=\"alarm.tuesday = (!alarm.tuesday)\">T</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.wednesday}\" ng-click=\"alarm.wednesday = (!alarm.wednesday)\">W</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.thursday}\" ng-click=\"alarm.thursday = (!alarm.thursday)\">T</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.friday}\" ng-click=\"alarm.friday = (!alarm.friday)\">F</div>\n" +
    "      <div class=\"alarm-day pointer\" ng-class=\"{'alarm-day-active': alarm.saturday}\" ng-click=\"alarm.saturday = (!alarm.saturday)\">S</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Action:</label>\n" +
    "    <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(alarm.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "    <div>\n" +
    "      <ul class=\"list-group bg-muted select-list\" ng-show=\"alarm.actions.length > 0\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in alarm.actions\" ng-click=\"editAction(action)\">\n" +
    "          {{action.name}}\n" +
    "          <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(alarm.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"save()\">Save <i class=\"icon-edit\"></i></button>\n" +
    "    <button class=\"btn btn-default btn-sm \" type=\"button\" ng-click=\"close()\" ng-hide=\"source\">Close</button>\n" +
    "    <button class=\"btn btn-danger btn-sm pull-left\" type=\"button\" ng-click=\"delete()\">Delete <i class=\"icon-edit\"></i></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/alarmclock/views/list.html',
    "<div style=\"text-align: center\">\n" +
    "  <div class=\"alarm-link\" ng-repeat=\"alarm in alarms\" ng-click=\"open(alarm)\" ng-class=\"{'alarm-enabled': alarm.enabled}\">\n" +
    "    <div class=\"alarm-time\">{{alarm.time | time}}</div>\n" +
    "    <div class=\"alarm-weekdays\">\n" +
    "      <div class=\"alarm-day\" ng-class=\"{'alarm-day-active': alarm.sunday}\">S</div>\n" +
    "      <div class=\"alarm-day\" ng-class=\"{'alarm-day-active': alarm.monday}\">M</div>\n" +
    "      <div class=\"alarm-day\" ng-class=\"{'alarm-day-active': alarm.tuesday}\">T</div>\n" +
    "      <div class=\"alarm-day\" ng-class=\"{'alarm-day-active': alarm.wednesday}\">W</div>\n" +
    "      <div class=\"alarm-day\" ng-class=\"{'alarm-day-active': alarm.thursday}\">T</div>\n" +
    "      <div class=\"alarm-day\" ng-class=\"{'alarm-day-active': alarm.friday}\">F</div>\n" +
    "      <div class=\"alarm-day\" ng-class=\"{'alarm-day-active': alarm.saturday}\">S</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"alarm-link\" ng-click=\"add()\">\n" +
    "    <div class=\"alarm-time-add\"><i class=\"icon-addalarm\"></i></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/autoshades/views/add.device.html',
    "<div class=\"modal-header\"><h3>Assign Device</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "    </div>\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Shades</div>\n" +
    "  <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li style=\"cursor: pointer;\" class=\"list-group-item\" ng-repeat=\"device in devices | filter: search | orderBy: '+name'\" ng-click=\"select(device)\" ng-show=\"assigned.indexOf(device.name) == -1\">{{device.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/autoshades/views/add.html',
    "<div ng-controller=\"autoshadesAdd\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Level at Sunrise <toggle value=\"device.config.sunrise\" class=\"pull-right\"></toggle></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <rzslider rz-slider-model=\"device.config.sunrise_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, disabled: !device.config.sunrise}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Follow the Sun <toggle value=\"device.config.track\" class=\"pull-right\"></toggle></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Mode</label>\n" +
    "        <select class=\"form-control\" ng-model=\"device.config.mode\" ng-options=\"item for item in modes\" ng-disabled=\"!device.config.track\"></select>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Min Azimuth</label>\n" +
    "        <rzslider rz-slider-model=\"device.config.min_azimuth\" rz-slider-options=\"{floor: 0, ceil: 360, hideLimitLabels: true, disabled: !device.config.track}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Max Azimuth</label>\n" +
    "        <rzslider rz-slider-model=\"device.config.max_azimuth\" rz-slider-options=\"{floor: 0, ceil: 360, hideLimitLabels: true, disabled: !device.config.track}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Cloudy Level</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Device</label>\n" +
    "        <select-device value=\"device.config.weather\" capabilities=\"['weather']\"></select-device>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <rzslider rz-slider-model=\"device.config.cloudy_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, disabled: !device.config.weather}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Level at Sunset <toggle value=\"device.config.sunset\" class=\"pull-right\"></toggle></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <rzslider rz-slider-model=\"device.config.sunset_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, disabled: !device.config.sunset}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      Shades \n" +
    "      <button class=\"pull-right btn btn-success btn-xs\" ng-click=\"addDevice()\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <ul class=\"list-group bg-muted select-list\" style=\"height: 20em;\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"device in device.config.devices\" ng-class=\"{'list-group-item-success': device === selected}\">\n" +
    "          {{device.name}}\n" +
    "          <button class=\"pull-right btn btn-danger btn-xs\" ng-click=\"deleteDevice(device.$index)\"><i class=\"icon-trash\"></i></button>\n" +
    "          <rzslider rz-slider-model=\"device.min_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, hidePointerLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "          <div><small>Wait until level: {{device.wait_level}}%</small></div>\n" +
    "          <rzslider rz-slider-model=\"device.wait_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, hidePointerLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "          <div><small>Min Level: {{device.min_level}}%</small></div>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/autoshades/views/edit.html',
    "<div ng-controller=\"autoshadesEdit\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Level at Sunrise <toggle value=\"device.config.sunrise\" class=\"pull-right\"></toggle></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <rzslider rz-slider-model=\"device.config.sunrise_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, disabled: !device.config.sunrise}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Follow the Sun <toggle value=\"device.config.track\" class=\"pull-right\"></toggle></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Mode</label>\n" +
    "        <select class=\"form-control\" ng-model=\"device.config.mode\" ng-options=\"item for item in modes\" ng-disabled=\"!device.config.track\"></select>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Min Azimuth</label>\n" +
    "        <rzslider rz-slider-model=\"device.config.min_azimuth\" rz-slider-options=\"{floor: 0, ceil: 360, hideLimitLabels: true, disabled: !device.config.track}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Max Azimuth</label>\n" +
    "        <rzslider rz-slider-model=\"device.config.max_azimuth\" rz-slider-options=\"{floor: 0, ceil: 360, hideLimitLabels: true, disabled: !device.config.track}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Cloudy Level</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"name\">Device</label>\n" +
    "        <select-device value=\"device.config.weather\" capabilities=\"['weather']\"></select-device>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <rzslider rz-slider-model=\"device.config.cloudy_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, disabled: !device.config.weather}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">Level at Sunset <toggle value=\"device.config.sunset\" class=\"pull-right\"></toggle></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <rzslider rz-slider-model=\"device.config.sunset_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, disabled: !device.config.sunset}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      Shades \n" +
    "      <button class=\"pull-right btn btn-success btn-xs\" ng-click=\"addDevice()\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <ul class=\"list-group bg-muted select-list\" style=\"height: 20em;\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"device in device.config.devices\" ng-class=\"{'list-group-item-success': device === selected}\">\n" +
    "          {{device.name}}\n" +
    "          <button class=\"pull-right btn btn-danger btn-xs\" ng-click=\"deleteDevice(device.$index)\"><i class=\"icon-trash\"></i></button>\n" +
    "          <rzslider rz-slider-model=\"device.wait_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, hidePointerLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "          <div><small>Wait until level: {{device.wait_level}}%</small></div>\n" +
    "          <rzslider rz-slider-model=\"device.min_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true, hidePointerLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "          <div><small>Min Level: {{device.min_level}}%</small></div>\n" +
    "        </li>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/autoshades/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Auto-Shades\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Process Interval (min)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Process Interval\" required=\"\" ng-model=\"config.interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"debug\">Debug Logging: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/browser/views/edit.html',
    "<div ng-controller=\"radEdit\">\n" +
    "	<div class=\"form-group\">\n" +
    "	  <label for=\"name\">Name</label>\n" +
    "	  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\">\n" +
    "		<label for=\"enabled\">Default Interface: </label>\n" +
    "		<select class=\"form-control\" ng-model=\"device.config.interface\" ng-options=\"iface._id as iface.name for iface in interfaces | orderBy:'name'\"></select>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\">\n" +
    "		<label for=\"enabled\">Show events in Browser: </label>\n" +
    "		<toggle value=\"device.config.show_events\" class=\"pull-right\"></toggle>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\">\n" +
    "		<label for=\"enabled\">Dim Display: </label>\n" +
    "		<toggle value=\"device.config.dim_display\" class=\"pull-right\"></toggle>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\" ng-show=\"device.config.dim_display\">\n" +
    "		<label for=\"enabled\">Dim After: </label>\n" +
    "		<input class=\"form-control\" type=\"number\" placeholder=\"Seconds\" ng-model=\"device.config.dim_after\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\">\n" +
    "		<label for=\"enabled\">Night Mode (changes text to red at night): </label>\n" +
    "		<toggle value=\"device.config.night_mode\" class=\"pull-right\"></toggle>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\">\n" +
    "		<label for=\"enabled\">Show Date: </label>\n" +
    "		<toggle value=\"device.config.show_date\" class=\"pull-right\"></toggle>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\">\n" +
    "		<label for=\"enabled\">Show Weather: </label>\n" +
    "		<toggle value=\"device.config.show_weather\" class=\"pull-right\"></toggle>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"form-group\">\n" +
    "	  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "	  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('modules/camera/views/add.html',
    "<div ng-controller=\"cameraAdd\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Username</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"Username\" ng-model=\"device.config.username\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Password</label>\n" +
    "    <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" ng-model=\"device.config.password\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Video URL</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"video_url\" placeholder=\"Video URL\" ng-model=\"device.config.video_url\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Image URL</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"image_url\" placeholder=\"Image URL\" ng-model=\"device.config.image_url\">\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/camera/views/edit.html',
    "<div ng-controller=\"cameraEdit\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Username</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"Username\" ng-model=\"device.config.username\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Password</label>\n" +
    "    <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" ng-model=\"device.config.password\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Video URL</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"video_url\" placeholder=\"Video URL\" ng-model=\"device.config.video_url\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Image URL</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"image_url\" placeholder=\"Image URL\" ng-model=\"device.config.image_url\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "    <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/camera/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Camera\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"debug\">Debug Logging: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/assign.html',
    "<div class=\"modal-header\"><h3>Assign Room</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "    </div>\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Rooms</div>\n" +
    "  <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li style=\"cursor: pointer;\" class=\"list-group-item\" ng-repeat=\"room in rooms | filter: search | orderBy: '+name'\" ng-click=\"select(room)\" ng-show=\"assigned.indexOf(room.name) == -1\">{{room.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/battery_sensor.html',
    "\n" +
    "<h4 style=\" white-space: nowrap\">{{device._battery | number:0}}%\n" +
    "	<i class=\"icon-batteryaltthird text-danger\" ng-show=\"device._battery <= 50\"></i>\n" +
    "	<i class=\"icon-batteryaltsixty text-warning\" ng-show=\"device._battery > 50 && device._battery < 75\"></i>\n" +
    "	<i class=\"icon-batteryaltfull text-success\" ng-show=\"device._battery >= 75\"></i>\n" +
    "</h4>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/beep.html',
    "<div style=\"text-align: center; padding-top: 2em;\" ng-show=\"has_capability('beep')\">\n" +
    "    <button class=\"btn btn-primary btn-sm\" ng-click=\"beep()\"><i class=\"icon-alertalt\"></i></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/camera.html',
    "<div style=\"text-align: center;\">\n" +
    "  <img src=\"{{image_url}}\" style=\"width: 100%; cursor: pointer\" ng-click=\"openVideo(device)\">\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/conditioner.html',
    "<div class=\"container-fluid\">\n" +
    "  <div class=\"col-xs-5\" style=\"padding-top: 0em; font-size: .7em;\">\n" +
    "    <div class=\"img-circle\" ng-click=\"set_mode('HEAT')\" ng-class=\"{'bg-muted': device._mode == 'HEAT', 'bg-danger': (device._mode == 'HEAT' && device._on)}\" style=\"cursor: pointer; margin: .5em; margin-left: -.5em; width: 1.7em; padding-top: .2em; text-align: center; vertical-align: middle; font-size: 3em;\"><i class=\"icon-fire\"></i></div>\n" +
    "    <div class=\"img-circle\" ng-click=\"set_mode('COOL')\"  ng-class=\"{'bg-muted': device._mode == 'COOL', 'bg-info': (device._mode == 'COOL' && device._on)}\" style=\"cursor: pointer; margin: .5em; margin-left: -.5em; width: 1.7em; padding-top: .2em; text-align: center; vertical-align: middle; font-size: 3em;\"><i class=\"icon-snow\"></i></div>\n" +
    "    <div class=\"img-circle\" ng-click=\"set_mode('OFF')\"  ng-class=\"{'bg-muted': device._mode == 'OFF'}\" style=\"cursor: pointer; margin: .5em; margin-left: -.5em; width: 1.7em; padding-top: .2em; text-align: center; vertical-align: middle; font-size: 3em;\"><i class=\"glyphicon glyphicon-off\"></i></div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-7 text-center\" style=\"font-size: 4em;padding-top: 0em;\">\n" +
    "    <div><i class=\"icon-chevron-up\" style=\"cursor: pointer;\" ng-click=\"temp_up()\"></i></div>\n" +
    "    <div>{{device._set_point}}</div>\n" +
    "    <div><i class=\"icon-chevron-down\" style=\"cursor: pointer;\" ng-click=\"temp_down()\"></i></div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/display.html',
    "<div class=\"row\">\n" +
    "  <p><b>Backlight</b></p>\n" +
    "  <div class=\"col-xs-5 text-left\" style=\"padding-top: 0em;\">\n" +
    "    <div style=\"border: .1em solid white; border-radius: .4em; height: 10em; width: 4em; text-align: center; vertical-align: middle; position: relative; cursor: pointer; padding-top: 3em; transition: 2s;\" ng-class=\"{'bg-success':  device._on}\" ng-click=\"toggle_onoff(); device.locked=undefined\">\n" +
    "      <div style=\"text-align: center;\">\n" +
    "        <h2><i class=\"icon-lightbulb-idea\"></i></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-7\" style=\"font-size: 2.5em; text-align: right; padding-left: 1em;\" ng-show=\"has_capability('dimmer')\">\n" +
    "    <div style=\"width: 1em;\">\n" +
    "      <div><i class=\"icon-chevron-up\" style=\"cursor: pointer;\" ng-click=\"level_up();\"></i></div>\n" +
    "      <div style=\"text-align: center; font-size: .75em\">{{device._level}}<i class=\"icon-ban-circle\" ng-show=\"device._level === undefined\"></i></div>\n" +
    "      <div><i class=\"icon-chevron-down\" style=\"cursor: pointer;\" ng-click=\"level_down();\"></i></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <p><b>Display Lock</b></p>\n" +
    "  <div class=\"col-xs-12\">\n" +
    "    <div class=\"btn-group btn-group-justified\" role=\"group\" >\n" +
    "      <div class=\"btn-group\" role=\"group\">\n" +
    "        <button type=\"button\" class=\"btn\" ng-click=\"display_unlock();\" ng-class=\"{'btn-success': device.locked === false, 'btn-default': device.locked !== false}\"><i class=\"icon-unlock\"></i></button>\n" +
    "      </div>\n" +
    "      <div class=\"btn-group\" role=\"group\">\n" +
    "        <button type=\"button\" class=\"btn\" ng-click=\"display_lock();\" ng-class=\"{'btn-success': device.locked === true, 'btn-default': device.locked !== true}\"><i class=\"icon-lock\"></i></button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/fan.html',
    "<div style=\"text-align: center;\">\n" +
    "  <div style=\"border: .1em solid white; border-radius: .4em; height: 9em; width: 10em; text-align: center; vertical-align: middle; margin: 0 auto; position: relative; cursor: pointer; padding-top: 2em; transition: 2s;\" ng-class=\"{'bg-success':  device._on}\" ng-click=\"toggle_onoff()\">\n" +
    "    <div style=\"text-align: center;\">\n" +
    "      <h2><i class=\"icon-fan\" ng-class=\"{'spin': device._on, 'spin-stop': !device._on}\"></i></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/humidity_sensor.html',
    "\n" +
    "<h4 style=\" white-space: nowrap\">{{device._humidity}} <i class=\"wi wi-humidity wi-fw\"></i></h4>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/light.html',
    "<div class=\"container-fluid\">\n" +
    "  <div class=\"col-xs-5 text-left\" style=\"padding-top: 0em;\">\n" +
    "    <div style=\"border: .1em solid white; border-radius: .4em; height: 10em; width: 4em; text-align: center; vertical-align: middle; position: relative; cursor: pointer; padding-top: 3em; transition: 2s;\" ng-class=\"{'bg-success':  device._on || device._level > 0}\" ng-click=\"toggle_onoff()\">\n" +
    "      <div style=\"text-align: center;\">\n" +
    "        <h2><i class=\"icon-lightbulb-idea\"></i></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-3\" style=\" ng-show=\"has_capability('dimmer')\">\n" +
    "    <div style=\"height: 10em;\">\n" +
    "      <rzslider rz-slider-model=\"device._level\" rz-slider-options=\"{floor: 0, ceil: 100, step: 1, vertical: true, hideLimitLabels: true, hidePointerLabels: true, onEnd: level_wait}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4\" style=\"text-align: center; padding-left: 1em;\" ng-show=\"has_capability('dimmer')\">\n" +
    "    <div style=\"width: 1em; font-size: 1.75em\">\n" +
    "      <div><i class=\"icon-chevron-up\" style=\"cursor: pointer;\" ng-click=\"level_up()\"></i></div>\n" +
    "      <div style=\"text-align: center; font-size: .75em\">{{device._level}}</div>\n" +
    "      <div><i class=\"icon-chevron-down\" style=\"cursor: pointer;\" ng-click=\"level_down()\"></i></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/light_sensor.html',
    "\n" +
    "<h4 style=\" white-space: nowrap\">{{device._lumens | number:1}} <i class=\"wi wi-day-sunny wi-fw\"></i></h4>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/lock.html',
    "<div style=\"text-align: center;\">\n" +
    "  <div style=\"border: .1em solid white; border-radius: .4em; height: 12em; width: 8em; text-align: center; vertical-align: middle; margin: 0 auto; position: relative; padding-top: 1em; transition: 2s;\" >\n" +
    "    <div style=\"text-align: center;\">\n" +
    "      <h2 style=\" cursor: pointer;position: absolute; top: .25em; left: 0em; width: 100%; text-align: center;\" ng-click=\"lock()\"><i class=\"icon-lock\"></i></h2>\n" +
    "      <h2 style=\" cursor: pointer;position: absolute; bottom: .25em; left: 0em; width: 100%; text-align: center;\"  ng-click=\"unlock()\"><i class=\"icon-unlock\"></i></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/motion_sensor.html',
    "<div style=\"text-align: center;\">\n" +
    "  <button class=\"btn btn-sm\" ng-click=\"toggle_motion()\" ng-class=\"{'btn-danger':  device._motion, 'btn-primary': !device._motion}\">&nbsp;<i class=\"fi-motion\"></i>&nbsp;</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/onoff.html',
    "<div style=\"text-align: center;\" ng-hide=\"has_capability('dimmer') || has_capability('scene')\">\n" +
    "  <div style=\"border: .1em solid white; border-radius: .4em; height: 6em; width: 14em; text-align: center; vertical-align: middle; margin: 0 auto; position: relative; cursor: pointer; padding-top: 1em; transition: 2s;\" ng-class=\"{'bg-success':  !device._on, 'bg-danger':  device._on}\" ng-click=\"toggle_onoff()\">\n" +
    "    <div style=\"text-align: center;\">\n" +
    "      <h2 ng-show=\"device._on\">On</h2>\n" +
    "      <h2 ng-show=\"!device._on\">Off</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/openclose.html',
    "<div style=\"text-align: center;\">\n" +
    "  <div style=\"border: .1em solid white; border-radius: .4em; height: 4em; width: 10em; text-align: center; vertical-align: middle; margin: 0 auto; position: relative; cursor: pointer;  transition: 2s;\" ng-class=\"{'bg-success':  !device._on, 'bg-danger':  device._on}\" ng-click=\"toggle_onoff()\">\n" +
    "    <div style=\"text-align: center;\">\n" +
    "      <h2 ng-show=\"device._on\">Open</h2>\n" +
    "      <h2 ng-show=\"!device._on\">Closed</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/scene.html',
    "<div style=\"text-align: center;\" ng-hide=\"has_capability('dimmer')\">\n" +
    "  <div style=\"border: .1em solid white; border-radius: .4em; height: 10em; width: 14em; text-align: center; vertical-align: middle; margin: 0 auto; position: relative; cursor: pointer; transition: 2s;\">\n" +
    "    <div style=\"text-align: center;\">\n" +
    "      <h2  ng-click=\"on()\">On</h2>\n" +
    "      <div>&nbsp;</div>\n" +
    "      <h2  ng-click=\"off()\">Off</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/shade.html',
    "<div class=\"container-fluid\">\n" +
    "  <div class=\"col-xs-5 text-left\" style=\"padding-top: 0em;\">\n" +
    "    <div style=\"border: .1em solid white; border-radius: .4em; height: 10em; width: 4em; text-align: center; vertical-align: middle; position: relative; cursor: pointer; padding-top: 3em; transition: 2s;\" ng-click=\"toggle_onoff()\">\n" +
    "      <div style=\"background-color: #666; position: absolute; left: 0px; right: 0px; top: 0px; bottom: {{device._level}}%;\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-3\">\n" +
    "    <div style=\"height: 10em;\">\n" +
    "      <rzslider rz-slider-model=\"device._level\" rz-slider-options=\"{floor: 0, ceil: 100, step: 1, vertical: true, hideLimitLabels: true, hidePointerLabels: true, onEnd: level_wait}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-4\" style=\"text-align: center; padding-left: 1em;\">\n" +
    "    <div style=\"width: 1em; font-size: 1.75em\">\n" +
    "      <div><i class=\"icon-chevron-up\" style=\"cursor: pointer;\" ng-click=\"level_up()\"></i></div>\n" +
    "      <div style=\"text-align: center; font-size: .75em\">{{device._level}}</div>\n" +
    "      <div><i class=\"icon-chevron-down\" style=\"cursor: pointer;\" ng-click=\"level_down()\"></i></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/capabilities/temperature_sensor.html',
    "\n" +
    "<h4 style=\" white-space: nowrap\">{{device._temperature}} <i class=\"wi wi-thermometer wi-fw\"></i></h4>\n"
  );


  $templateCache.put('modules/devices/views/device_level.html',
    "<div class=\"device-level\">\n" +
    "    <rzslider class=\"device-level-slider\" rz-slider-model=\"ngModel.$temp_level\" rz-slider-options=\"slider\" ng-disabled=\"ngModel.$loading || ngModel.$error\"></rzslider>\n" +
    "</div>"
  );


  $templateCache.put('modules/devices/views/device_list_item.html',
    "<li class=\"list-group-item\" style=\"cursor: pointer\" ng-class=\"{'list-group-item-danger': ngModel._on && ngModel.$is('openclose', 'motion_sensor'), 'text-muted': ngModel.$is_open, 'list-group-item-info': ngModel._mode == 'COOL', 'list-group-item-warning': ngModel._mode == 'HEAT'}\" ng-click=\"ngModel.$open()\">\n" +
    "  <div class=\"container-flex\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-8\">\n" +
    "        <i class=\"icon-circleselection spin\" ng-show=\"ngModel.$is_open\"></i>\n" +
    "        <i class=\"{{ngModel.icon}}\" ng-show=\"ngModel.icon && !ngModel.$is_open\"></i>\n" +
    "        <span ng-hide=\"ngModel.icon || ngModel.$is_open\">\n" +
    "          <i class=\"icon-fan\" ng-show=\"ngModel.$is('fan')\"></i>\n" +
    "          <i class=\"icon-videocamerathree\" ng-show=\"ngModel.$is('camera')\"></i>\n" +
    "          <i class=\"icon-lightbulb-idea\" ng-show=\"ngModel.$is('light')\"></i>\n" +
    "          <i class=\"icon-monitor\" ng-show=\"ngModel.$is('display')\"></i>\n" +
    "          <i class=\"fi-window\" ng-show=\"ngModel.$is('window')\"></i>\n" +
    "          <i class=\"fi-door-open\" ng-show=\"ngModel.$is('door')\"></i>\n" +
    "          <i class=\"fi-motion\" ng-show=\"ngModel.$is('motion_sensor')\"></i>\n" +
    "          <i class=\"icon-temperaturealt-thermometeralt\" ng-show=\"ngModel.$is('conditioner')\"></i>\n" +
    "          <i class=\"wi wi-day-snow-thunderstorm\" ng-show=\"ngModel.$is('weather')\"></i>\n" +
    "          <i class=\"icon-browser\" ng-show=\"ngModel.$is('browser')\"></i>\n" +
    "          <i class=\"glyphicon glyphicon-bullhorn\" ng-show=\"ngModel.$is('siren')\"></i>\n" +
    "          <i class=\"icon-lockalt-keyhole\" ng-show=\"ngModel.$is('lock')\"></i>\n" +
    "        </span>\n" +
    "        {{ngModel.name}}\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-4 text-right\" ng-if=\"showControls\" stop-event>\n" +
    "        <div class=\"pull-right\">\n" +
    "            <span class=\"badge\" ng-show=\"ngModel._mode == 'COOL'\">{{ngModel._set_point}} <i class=\"icon-snow\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"ngModel._mode == 'HEAT'\">{{ngModel._set_point}} <i class=\"icon-fire\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"ngModel.$is('temperature_sensor')\">{{ngModel._temperature}} <i class=\"wi wi-thermometer\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"ngModel.$is('humidity_sensor')\">{{ngModel._humidity}} <i class=\"wi wi-humidity\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"ngModel.$is('light_sensor')\">{{ngModel._lumens}} <i class=\"wi wi-day-sunny wi-fw\"></i></span>\n" +
    "\n" +
    "            <device-toggle ng-model=\"ngModel\" ng-if=\"ngModel.$is('onoff', 'light', 'fan')\"></device-toggle>\n" +
    "            <device-toggle ng-model=\"ngModel\" ng-if=\"ngModel.$is('motion_sensor')\" on-color=\"#af4b4b\" off-color=\"#4baf4d\"></device-toggle>\n" +
    "            <device-toggle ng-model=\"ngModel\" ng-if=\"ngModel.$is('openclose')\" on-label=\"Open\" off-label=\"Closed\" on-color=\"#af4b4b\" off-color=\"#4baf4d\"></device-toggle>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-4 text-right\" ng-if=\"!showControls\" stop-event>\n" +
    "        <button class=\"btn btn-xs btn-primary\" ng-click=\"ngModel.$edit()\"><i class=\"icon-edit\"></i> Edit</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-12\" style=\"padding-top: 1em;\">\n" +
    "        <device-level ng-model=\"ngModel\" ng-if=\"ngModel.$is('dimmer') && showControls\" stop-event></device-level>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-show=\"ngModel.tags.length > 0\">\n" +
    "      <div style=\"font-size: .7em\" class=\"col-xs-12 text-muted\"><i class=\"icon-tags\"></i>\n" +
    "        <span ng-repeat=\"tag in ngModel.tags\" style=\"margin-right: 1em;\">{{tag}}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-show=\"ngModel.age\">\n" +
    "      <div class=\"col-xs-12 text-muted\"><small><span ng-show=\"ngModel._on || ngModel._motion\">On</span><span ng-show=\"!ngModel._on && !ngModel._motion\">Off</span> Age: {{ngModel.age | ageHumanReadable}}</small></div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-show=\"ngModel.last_seen\">\n" +
    "      <div class=\"col-xs-12 text-muted\"><small>Seen: {{ngModel.last_seen | date: 'medium'}}</small></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</li>"
  );


  $templateCache.put('modules/devices/views/device_toggle.html',
    "<div class=\"device-toggle\" ng-click=\"toggle()\" ng-style=\"styles\" ng-class=\"{'device-toggle-off': !ngModel._on && !ngModel.$loading && !ngModel.$error, 'device-toggle-on': ngModel._on && !ngModel.$loading && !ngModel.$error, 'device-toggle-loading': ngModel.$loading && !ngModel.$error, 'device-toggle-error': ngModel.$error, 'device-toggle-light': ngModel.$is('light')}\">\n" +
    "<div class=\"device-toggle-button\">\n" +
    "  <div class=\"device-toggle-spinner\" ng-show=\"ngModel.$loading\"><i class=\"glyphicon glyphicon-refresh\"></i></div>\n" +
    "  <div class=\"device-toggle-label-error\" ng-show=\"ngModel.$error\"><i class=\"glyphicon glyphicon-minus-sign text-danger\"></i></div>\n" +
    "  <div class=\"device-toggle-label\" ng-hide=\"ngModel.$loading || ngModel.$error\">{{label}}</div>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('modules/devices/views/devices.add.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Add Device\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-8 col-md-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-sm-3\" style=\"position: relative\">\n" +
    "                <ul class=\"section-nav\">\n" +
    "                  <li ng-click=\"section='provider'\" ng-class=\"{active: section == 'provider'}\">Provider</li>\n" +
    "                  <li ng-click=\"section='settings'\" ng-show=\"device.provider\" ng-class=\"{active: section == 'settings'}\">Settings</li>\n" +
    "                  <li ng-click=\"section='advanced'\" ng-show=\"device.provider\" ng-class=\"{active: section == 'advanced'}\">Advanced</li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-9 col-xs-12\">\n" +
    "                <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "\n" +
    "                <div ng-show=\"section=='provider'\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"name\">Provider</label>\n" +
    "                    <ul class=\"list-group bg-muted select-list\" >\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"p in providers | orderBy: '+name' | filter:{enabled: true}\" ng-click=\"changeProvider(p)\" ng-class=\"{'list-group-item-success': device.provider == p}\">\n" +
    "                        {{p.name | capitalize}}\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <form name=\"addDevice\">\n" +
    "\n" +
    "                  <div ng-show=\"device.provider && section == 'settings'\">\n" +
    "                    <div ng-repeat=\"p in providers | orderBy: '+name' | filter:{enabled: true}\" ng-include=\"provider_templates[p.id]\" ng-if=\"device.provider == p.id\">\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "                  <div ng-show=\"device.provider && section == 'advanced'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Name</label>\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"enabled\">Active: </label>\n" +
    "                      <toggle value=\"device.active\" class=\"pull-right\"></toggle>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Capabilities</label>\n" +
    "                      <div style=\"overflow: auto; height: 8em;\">\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"capability in capabilities | orderBy: '+'\" ng-click=\"toggle_capability(capability)\" ng-class=\"{'list-group-item-success': has_capability(capability)}\">\n" +
    "                          <i class=\"glyphicon glyphicon-ok-circle\" ng-show=\"has_capability(capability)\"></i>\n" +
    "                          <i class=\"glyphicon glyphicon-ban-circle text-muted\" ng-show=\"!has_capability(capability)\"></i>\n" +
    "                          {{capability}}\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Icon</label>\n" +
    "                      <icon-selector value=\"device.icon\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Tags</label>\n" +
    "                      <tags tag-model=\"device.tags\" />\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addDevice.$invalid\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "                </form>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/devices/views/devices.camera.html',
    "<div>\n" +
    "  <img src=\"{{camera_url}}\" style=\"width: 100%\" ng-click=\"ok()\">\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/devices.edit.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Edit Device\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-8 col-md-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-sm-3\" style=\"position: relative\">\n" +
    "                <ul class=\"section-nav\">\n" +
    "                  <li ng-click=\"section='provider'\" ng-class=\"{active: section == 'provider'}\">{{device.provider | capitalize}}</li>\n" +
    "                  <li ng-click=\"section='rooms'\" ng-class=\"{active: section == 'rooms'}\">Rooms</li>\n" +
    "                  <!--\n" +
    "                  <li ng-click=\"section='scenes'\" ng-class=\"{active: section == 'scenes'}\">Scenes</li>\n" +
    "                  <li ng-click=\"section='triggers'\" ng-class=\"{active: section == 'triggers'}\">Triggers</li>\n" +
    "                  -->\n" +
    "                  <li ng-click=\"section='advanced'\" ng-class=\"{active: section == 'advanced'}\">Advanced</li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-9 col-xs-12\">\n" +
    "\n" +
    "                <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "                <form name=\"editDevice\">\n" +
    "                  <div ng-show=\"section=='provider'\">\n" +
    "                    <div ng-include=\"provider_template\"></div>\n" +
    "                  </div>\n" +
    "                  <div ng-show=\"section=='advanced'\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Provider</label>\n" +
    "                      <select size=\"1\" class=\"form-control\" id=\"provider\" placeholder=\"Provider\" required=\"\" ng-model=\"device.provider\" ng-options=\"o.id as o.name for o in providers | orderBy: '+name'\"></select>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"enabled\">Active: </label>\n" +
    "                      <toggle value=\"device.active\" class=\"pull-right\"></toggle>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Capabilities</label>\n" +
    "                      <div style=\"overflow: auto; height: 8em;\">\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"capability in capabilities | orderBy: '+'\" ng-click=\"toggle_capability(capability)\" ng-class=\"{'list-group-item-success': has_capability(capability)}\" style=\"cursor: pointer;\">\n" +
    "                          <i class=\"glyphicon glyphicon-ok-circle\" ng-show=\"has_capability(capability)\"></i>\n" +
    "                          <i class=\"glyphicon glyphicon-ban-circle text-muted\" ng-show=\"!has_capability(capability)\"></i>\n" +
    "                          {{capability}}\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Icon</label>\n" +
    "                      <icon-selector value=\"device.icon\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Tags</label>\n" +
    "                      <tags tag-model=\"device.tags\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='rooms'\">\n" +
    "                    <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Rooms</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Rooms </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addRoom()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"room in rooms\">{{room.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeRoom(room._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='scenes'\">\n" +
    "                    <div ng-show=\"loading_scenes\"><i class=\"icon-refresh spin\"></i> Loading Scenes</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Scenes </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addScene()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"scene in scenes\">{{scene.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeScene(scene._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='triggers'\">\n" +
    "                    <div ng-show=\"loading_triggers\"><i class=\"icon-refresh spin\"></i> Loading Triggers</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Triggers </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addTrigger()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"trigger in triggers\">{{trigger.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeScene(trigger._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                </form>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/devices/views/devices.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/devices.list.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 7em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Devices</h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <p>\n" +
    "          <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "            <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "          </div>\n" +
    "        </p>\n" +
    "        <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "        <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "          <!--\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"view(device)\" ng-repeat=\"device in devices | filter: search | orderBy: '+name'\">\n" +
    "            <i class=\"{{device.icon}}\" ng-show=\"device.icon\"></i>\n" +
    "            <span ng-hide=\"device.icon\">\n" +
    "            <i class=\"icon-fan\" ng-show=\"has_capability(device, 'fan')\"></i>\n" +
    "            <i class=\"icon-videocamerathree\" ng-show=\"has_capability(device, 'camera')\"></i>\n" +
    "            <i class=\"icon-lightbulb-idea\" ng-show=\"has_capability(device, 'light')\"></i>\n" +
    "            <i class=\"icon-monitor\" ng-show=\"has_capability(device, 'display')\"></i>\n" +
    "            <i class=\"fi-window\" ng-show=\"has_capability(device, 'window')\"></i>\n" +
    "            <i class=\"fi-door-open\" ng-show=\"has_capability(device, 'door')\"></i>\n" +
    "            <i class=\"fi-motion\" ng-show=\"has_capability(device, 'motion_sensor')\"></i>\n" +
    "            <i class=\"icon-temperaturealt-thermometeralt\" ng-show=\"has_capability(device, 'conditioner')\"></i>\n" +
    "            <i class=\"wi wi-day-snow-thunderstorm\" ng-show=\"has_capability(device, 'weather')\"></i>\n" +
    "            <i class=\"icon-browser\" ng-show=\"has_capability(device, 'browser')\"></i>\n" +
    "            <i class=\"glyphicon glyphicon-bullhorn\" ng-show=\"has_capability(device, 'siren')\"></i>\n" +
    "            <i class=\"icon-lockalt-keyhole\" ng-show=\"has_capability(device, 'lock')\"></i>\n" +
    "            </span>\n" +
    "            {{device.name}}<div class=\"pull-right\" style=\"margin-left: .5em; margin-top: -.25em\"> <button class=\"btn btn-xs btn-default\" ng-click=\"edit(device)\" stop-event><i class=\"icon-edit\"></i></button></div> <span class=\"badge\">{{device._rooms.length}} <i class=\"glyphicon glyphicon-modal-window\"></i></span>\n" +
    "            <div style=\"font-size: .7em\" class=\"text-muted\" ng-show=\"device.tags.length > 0\"><i class=\"icon-tags\"></i>\n" +
    "              <span ng-repeat=\"tag in device.tags\" style=\"margin-right: 1em;\">{{tag}}</span>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "          -->\n" +
    "          <device-list-item ng-repeat=\"device in devices | filter: search | orderBy: '+name'\" ng-model=\"device\"></device-list-item>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"main.devices.add\"><i class=\"icon-plus\"></i></button>\n"
  );


  $templateCache.put('modules/devices/views/devices.select.html',
    "\n" +
    "<button class=\"btn form-control\" ng-click=\"openAssign()\" ng-class=\"{'btn-default': device, 'btn-primary': !device, 'btn-danger': error}\" ng-disabled=\"loading\">\n" +
    "  <div ng-show=\"!device && !loading && !error\">Select Device</div>\n" +
    "  <div ng-show=\"device && !loading && !error\"><i class=\"{{device.icon}}\"></i> {{device.name}}</div>\n" +
    "  <div ng-show=\"loading && !error\"><i class=\"icon-circleselection spin\"></i> Loading</div>\n" +
    "  <div ng-show=\"error\"><i class=\"icon-erroralt\"></i> Could not find Device</div>\n" +
    "</button>\n"
  );


  $templateCache.put('modules/devices/views/devices.select.modal.html',
    "<div class=\"modal-header\"><h3>Assign Device</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "    </div>\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Devices</div>\n" +
    "  <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li style=\"cursor: pointer;\" class=\"list-group-item\" ng-click=\"select()\" ng-show=\"!required\">None</li>\n" +
    "      <li style=\"cursor: pointer;\" class=\"list-group-item\" ng-repeat=\"device in devices | filter: search | orderBy: '+name'\" ng-click=\"select(device)\">{{device.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/devices/views/devices.view.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">{{name}}\n" +
    "\n" +
    "      <button class=\"btn btn-primary btn-sm pull-right\" ng-hide=\"errors || processing\" ng-click=\"reload(true)\"><i class=\"icon-refresh\"></i></button>\n" +
    "      <button class=\"btn btn-danger btn-sm pull-right\" ng-show=\"errors\" ng-click=\"reload()\"><i class=\"icon-erroralt\"></i></button>\n" +
    "      <button class=\"btn btn-default btn-sm pull-right\" ng-show=\"processing\"><i class=\"icon-loadingalt spin\"></i></button>\n" +
    "    </h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "      <div ng-class=\"{'col-xs-12': sensors.length == 0, 'col-xs-9': sensors.length != 0}\" ng-hide=\"controls.length == 0\">\n" +
    "        <div ng-repeat=\"control in controls\" ng-include=\"control.view\" class=\"row\" > </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-3\" style=\"font-size: .8em;\" ng-class=\"{'col-xs-offset-4': controls.length == 0, 'text-center': controls.length == 0, 'text-right': controls.length != 0}\">\n" +
    "        <div ng-repeat=\"sensor in sensors\" ng-include=\"sensor.view\" class=\"row\" style=\"\" > </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "    <h6 class=\"text-muted\">Seen: {{device.last_seen | date: 'medium'}}</h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"ok()\">Close</button>\n" +
    "    <button class=\"btn btn-default btn-sm pull-left\" type=\"button\" ng-click=\"edit()\" ng-hide=\"source\"><i class=\"icon-edit\"></i></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/home/views/controller.html',
    "<div class=\"controller\" ng-mousedown=\"start()\" ng-mouseup=\"stop()\">\n" +
    "  <div class=\"controller-icon\" ng-class=\"{'controller-pending': pending || obj._state == 'pending', 'controller-success': success, 'controller-failed': failed, 'controller-success': (obj._on || obj._lights_on || obj._fans_on) && (action == 'toggle' || action == 'on' || action == 'off') && obj._state != 'pending', 'controller-cool': obj._mode == 'COOL', 'controller-heat': obj._mode == 'HEAT', 'spin': (obj._on || obj._fans_on) && spin}\">\n" +
    "    <span ng-show=\"icon && !obj._temperature\"><i class=\"{{icon}}\"></i></span>\n" +
    "    <span ng-show=\"obj._temperature\">{{obj._temperature | number:0}}</span>\n" +
    "  </div>\n" +
    "  <div class=\"controller-status\" ng-show=\"loading\"><i class=\"icon-loadingalt spin\"></i></div>\n" +
    "  <div class=\"controller-status\" ng-show=\"error\"><i class=\"icon-warning-sign\"></i></div>\n" +
    "  <div class=\"controller-title\" ng-hide=\"showTitle\">{{title}}</div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/home/views/events.html',
    "<div class=\"events\">\n" +
    "<ul class=\"list-group\">\n" +
    "<li class=\"list-group-item\" ng-repeat=\"event in events\">\n" +
    "	<h4 class=\"list-group-item-heading\">\n" +
    "		<i class=\"{{event.icon}}\"></i>\n" +
    "		<span ng-show=\"event.show_name\">{{event.name}}</span>\n" +
    "		{{event.message}}\n" +
    "		{{event.value}}{{event.units}}\n" +
    "	</h4>\n" +
    "	<p class=\"list-group-item-text\">\n" +
    "		<i class=\"glyphicon glyphicon-home\" ng-show=\"event.type == 'abode'\"></i>\n" +
    "		<i class=\"glyphicon glyphicon-modal-window\" ng-show=\"event.type == 'room'\"></i>\n" +
    "		<i class=\"glyphicon glyphicon-oil\" ng-show=\"event.type == 'device'\"></i>\n" +
    "		<i class=\"icon-picture\" ng-show=\"event.type == 'scene'\"></i>\n" +
    "		<i class=\"icon-notificationbottom\" ng-show=\"event.type == 'notification'\"></i>\n" +
    "		{{event.type | capitalize}} at {{event.timestamp | date: 'shortTime'}}\n" +
    "	</p>\n" +
    "</li>\n" +
    "</ul>\n" +
    "</div>"
  );


  $templateCache.put('modules/home/views/index.html',
    "<div>Home <button ng-click=\"logout()\">Logout</button></div>"
  );


  $templateCache.put('modules/home/views/interfaceLink.html',
    "<div class=\"interface-link\" ui-sref=\"main.home({interface: interface.name})\" ui-sref-active=\"interface-link-active\">\n" +
    "  <div class=\"interface-icon\"><i class=\"{{interface.icon}}\"></i></div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/home/views/interfaceList.html',
    "<div class=\"interface-list\">\n" +
    "  <interface-link ng-repeat=\"interface in interfaces\" interface=\"interface\"></interface-link>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/ifttt/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Providers / IFTTT\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <toggle value=\"config.enabled\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Debug: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/insteon/views/add.html',
    "<div ng-controller=\"insteonAdd\">\n" +
    "  <div class=\"form-group\" ng-hide=\"type\">\n" +
    "    <h3>Step 1: Device Type</h3>\n" +
    "    <ul class=\"insteon-types\">\n" +
    "      <li ng-repeat=\"t in device_types\" ng-click=\"changeType(t)\" ng-class=\"{'bg-success': type.name == t.name}\">{{t.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  {{type}}\n" +
    "  <div class=\"form-group\" ng-show=\"type.controller !== undefined && !device.config.address\">\n" +
    "    <div>\n" +
    "      <h3>Step 2: Link your Device</h3>\n" +
    "      <div>&nbsp;</div>\n" +
    "      <div>Link Status: {{link_status | capitalize}} {{error.message}}</div>\n" +
    "      <div>&nbsp;</div>\n" +
    "      <div>\n" +
    "      <button ng-click=\"start_linking()\" class=\"btn btn-primary\" ng-disabled=\"link_status=='linking'\">Start Linking</button>\n" +
    "      <button ng-click=\"cancel_linking()\" class=\"btn btn-warning\" ng-disabled=\"link_status=='idle'\">Cancel Linking</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\" ng-show=\"type.controller !== undefined && device.config.address\">\n" +
    "    <h3>Step 3: Name Your Device</h3>\n" +
    "    <label for=\"name\">Name ({{device.config.address}})</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div ng-show=\"type && type.controller === undefined\">\n" +
    "    <h3>Step 2: Build Scene</h3>\n" +
    "    <div>&nbsp;</div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Scene Number</label>\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"scene\" placeholder=\"Scene\" required=\"\" ng-model=\"device.config.address\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteon/views/confirm_delete.html',
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <h3 class=\"text-center\"><i class=\"icon-warning-sign text-warning\"></i> Delete this link?</h3>\n" +
    "    <p>\n" +
    "        <small>If this is a battery operated device, hold the set button until linking mode has been entered.</small>\n" +
    "    </p>\n" +
    "    <div uib-alert class=\"alert-danger\" ng-show=\"error\">{{error.message}}</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\" ng-disabled=\"loading\">Cancel</button>\n" +
    "    <button class=\"btn btn-sm\" type=\"button\" ng-click=\"confirm()\" ng-disabled=\"loading\" ng-class=\"{'btn-primary': loading, 'btn-danger': !loading}\">\n" +
    "        <span ng-hide=\"loading\"><i class=\"icon-trash\"></i> Yes</span>\n" +
    "        <span ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Deleting</span></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteon/views/edit.html',
    "\n" +
    "<div ng-controller=\"insteonEdit\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-hide=\"has_capability('scene')\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Device Number</label>\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" id=\"address\" placeholder=\"Address\" required=\"\" ng-model=\"device.config.address\" ng-readonly=\"!editAddress\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button class=\"btn btn-default\" type=\"button\" ng-click=\"toggleAddress()\"><i class=\"icon-edit\"></i></button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"address\" placeholder=\"Address\" required=\"\" ng-model=\"device.config.address\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-hide=\"has_capability('scene')\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-4\">Device Cat</div>\n" +
    "        <div class=\"col-xs-4\">Sub Cat</div>\n" +
    "        <div class=\"col-xs-4\">Firmware</div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-4\">{{device.config.device_cat | toHex}}</div>\n" +
    "        <div class=\"col-xs-4\">{{device.config.device_subcat | toHex}}</div>\n" +
    "        <div class=\"col-xs-4\">{{device.config.firmware | toHex}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"has_capability('scene')\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Scene Number</label>\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" id=\"scene\" placeholder=\"Scene\" required=\"\" ng-model=\"device.config.address\" ng-readonly=\"!editAddress\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button class=\"btn btn-default\" type=\"button\" ng-click=\"toggleAddress()\"><i class=\"icon-edit\"></i></button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <button class=\"btn btn-sm btn-primary\" ng-click=\"on()\" ng-disabled=\"cmd_loading\" ng-class=\"{'btn-danger': cmd_error}\"><i class=\"icon-lighton\"></i> On</button>\n" +
    "      <button class=\"btn btn-sm btn-primary\" ng-click=\"off()\" ng-disabled=\"cmd_loading\" ng-class=\"{'btn-danger': cmd_error}\"><i class=\"icon-lightoff\"></i> Off</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-hide=\"has_capability('scene')\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <button class=\"btn btn-sm btn-primary\" ng-click=\"beep()\" ng-disabled=\"beep_loading\" ng-class=\"{'btn-danger': beep_error}\"><i class=\"icon-volume-down\"></i> Beep</button>\n" +
    "\n" +
    "      <div class=\"btn-group\" uib-dropdown>\n" +
    "        <button id=\"split-button\" type=\"button\" class=\"btn btn-sm btn-primary\"  ng-click=\"enterlinking()\" ng-disabled=\"linking_loading\" ng-class=\"{'btn-danger': linking_error}\">Linking</button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-primary\" uib-dropdown-toggle ng-disabled=\"linking_loading\" ng-class=\"{'btn-danger': linking_error}\">\n" +
    "        <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\">\n" +
    "        <li role=\"menuitem\" ng-repeat=\"n in [].constructor(8) track by $index\"><a style=\"cursor: pointer\" ng-click=\"enterlinking($index + 1)\">Scene {{$index + 1}}</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"btn-group\" uib-dropdown>\n" +
    "        <button id=\"split-button\" type=\"button\" class=\"btn btn-sm btn-primary\"  ng-click=\"enterunlinking()\" ng-disabled=\"linking_loading\" ng-class=\"{'btn-danger': linking_error}\">Un-Linking</button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-primary\" uib-dropdown-toggle ng-disabled=\"linking_loading\" ng-class=\"{'btn-danger': linking_error}\">\n" +
    "        <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\">\n" +
    "        <li role=\"menuitem\" ng-repeat=\"n in [].constructor(8) track by $index\"><a style=\"cursor: pointer\" ng-click=\"enterunlinking($index + 1)\">Scene {{$index + 1}}</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <button class=\"btn btn-sm btn-primary\" ng-click=\"exitlinking()\" ng-disabled=\"linking_loading\" ng-class=\"{'btn-danger': linking_error}\"><i class=\"icon-circlestopempty\"></i> Stop Linking</button>\n" +
    "      <button class=\"btn btn-sm btn-primary\" ng-class=\"{'btn-danger': id_error, 'btn-success': id_success}\" ng-disabled=\"id_loading || id_success || id_error\" ng-click=\"idrequest()\">\n" +
    "        <i class=\"icon-circleselection spin\" ng-show=\"id_loading\"></i>\n" +
    "        <i class=\"icon-circleselect\" ng-show=\"id_success\"></i>\n" +
    "        <i class=\"icon-erroralt\" ng-show=\"id_error\"></i>\n" +
    "\n" +
    "        <i class=\"icon-tagalt-pricealt\" ng-hide=\"id_loading || id_success || id_error\"></i> ID Request\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <insteon-modem-linking ng-model=\"linked\" show-heading=\"true\"></insteon-modem-linking>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div ng-show=\"device.capabilities.indexOf('scene') !== -1\">\n" +
    "    <insteon-scene-members ng-model=\"device\" on-update=\"save()\"></insteon-scene-members>\n" +
    "    <insteon-modem-linking ng-model=\"linked\" show-heading=\"false\" force-controller=\"true\" force-group=\"device.config.address\"></insteon-modem-linking>\n" +
    "  </div>\n" +
    "  <div ng-show=\"device.capabilities.indexOf('scene') === -1\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"clearfix\">\n" +
    "        <label for=\"name\">Links</label>\n" +
    "        <button class=\"pull-right btn btn-success btn-xs\" ng-click=\"add_link()\">\n" +
    "          <i class=\"icon-circleadd\"></i> Add</button>\n" +
    "        <button class=\"pull-right btn btn-xs\" ng-class=\"{'btn-info': !loading && !error, 'btn-primary': loading, 'btn-danger': error}\" ng-click=\"reload_database()\" ng-disabled=\"loading\">\n" +
    "          <i class=\"icon-refresh\" ng-show=\"!loading && !error\"></i>\n" +
    "          <i class=\"icon-circleselection spin\" ng-show=\"loading\"></i>\n" +
    "          <i class=\"icon-erroralt\" ng-show=\"error\"></i>\n" +
    "          Reload</button>\n" +
    "        </div>\n" +
    "      <ul class=\"list-group bg-muted select-list\" style=\"height: 20em;\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"record in device.config.database | orderBy: 'name'\" ng-click=\"edit_link(record)\" ng-show=\"record.used\">\n" +
    "          <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"delete_link(record)\" stop-event>\n" +
    "            <i class=\"icon-trash\"></i>\n" +
    "          </button>\n" +
    "          <div>\n" +
    "            <i class=\"icon-uploadalt\" ng-show=\"record.controller\"></i>\n" +
    "            <i class=\"icon-download-alt\" ng-show=\"!record.controller\"></i>\n" +
    "          {{record.name || record.address}}<span ng-show=\"record.name\"> ({{record.address}})</span>\n" +
    "          </div>\n" +
    "          <div><small>\n" +
    "            <span ng-show=\"!record.controller\">\n" +
    "            When scene {{record.group}}, use on level of {{record.on_level / 255 * 100 | number: 0}}% in {{record.ramp_rate | insteonRate}}<span ng-show=\"record.button > 1\"> and button {{record.button}}</span>\n" +
    "            </span>\n" +
    "            <span ng-show=\"record.controller\">\n" +
    "            Send scene {{record.group}} <span ng-show=\"record.button > 1\">with button {{record.button}}</span>\n" +
    "            </span>\n" +
    "          </small></div>\n" +
    "        </li>\n" +
    "       </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteon/views/link.html',
    "<div class=\"modal-header\"><h3>{{action}} Link</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <select class=\"form-control\" ng-model=\"record.controller\" ng-options=\"controller.value as controller.text for controller in controller_options\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label for=\"on_level\">Device</label>\n" +
    "        <select class=\"form-control\" ng-model=\"record.address\" ng-options=\"device.config.address as device.name for device in devices\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"!record.controller\">\n" +
    "        <label for=\"address\">\n" +
    "            <span ng-show=\"!record.controller\">When this Scene is received:</span>\n" +
    "            <span ng-show=\"record.controller\">Send this Scene</span>\n" +
    "        </label>\n" +
    "        <rzslider rz-slider-model=\"record.group\" rz-slider-options=\"{floor: 1, ceil: 255, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label for=\"address\">\n" +
    "            <span ng-show=\"!record.controller\">Set this button</span>\n" +
    "            <span ng-show=\"record.controller\">Button</span>\n" +
    "        </label>\n" +
    "        <rzslider rz-slider-model=\"record.button\" rz-slider-options=\"{floor: 0, ceil: 255, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"!record.controller\">\n" +
    "        <label for=\"on_level\">On Level</label>\n" +
    "        <rzslider rz-slider-model=\"record.on_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"!record.controller\">\n" +
    "        <label for=\"address\">Ramp Rate</label>\n" +
    "        <select size=\"1\" class=\"form-control\" ng-model=\"record.ramp_rate\" ng-options=\"rate.value as rate.text for rate in rates | orderBy:'value':true\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div uib-alert class=\"alert-danger\" ng-show=\"error\">{{error.message}}</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\" ng-disabled=\"loading\">Cancel</button>\n" +
    "    <button class=\"btn btn-sm\" type=\"button\" ng-click=\"save()\" ng-disabled=\"loading\" ng-class=\"{'btn-primary': loading, 'btn-success': !loading}\">\n" +
    "        <span ng-hide=\"loading\"><i class=\"icon-save-floppy\"></i> Save</span>\n" +
    "        <span ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Saving</span></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteon/views/modem_linking.html',
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\" ng-click=\"isCollapsed = !isCollapsed\" ng-show=\"showHeading\" style=\"cursor: pointer\">\n" +
    "    <i class=\"glyphicon glyphicon-triangle-bottom\" ng-show=\"!isCollapsed\"></i>\n" +
    "    <i class=\"glyphicon glyphicon-triangle-right\" ng-show=\"isCollapsed\"></i>\n" +
    "    Insteon Modem Linking\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\" uib-collapse=\"isCollapsed\">\n" +
    "    <div class=\"form-group\" ng-hide=\"forceController || forceResponder\">\n" +
    "      <label for=\"exampleInputEmail1\">Link Type:</label>\n" +
    "      <label><input type=\"radio\" ng-model=\"linking.controller\" ng-value=\"true\" ng-disabled=\"link_waiting\"> Controller</label>\n" +
    "      <label><input type=\"radio\" ng-model=\"linking.controller\" ng-value=\"false\" ng-disabled=\"link_waiting\"> Responder</label>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-hide=\"forceGroup\">\n" +
    "      <label for=\"exampleInputEmail1\">Group:</label>\n" +
    "      <select class=\"form-control\" ng-model=\"linking.group\" ng-options=\"scene.id as scene.title for scene in scenes\" ng-disabled=\"link_waiting\"></select>\n" +
    "    </div>\n" +
    "\n" +
    "    <button class=\"btn btn-sm btn-primary\" ng-click=\"start_linking(linking.controller, linking.group)\" ng-hide=\"link_waiting\" ng-disabled=\"link_waiting || link_error\" ng-class=\"{'btn-danger': link_error}\">\n" +
    "      <i class=\"icon-link\" ng-hide=\"link_waiting || link_error\"></i>\n" +
    "      <i class=\"icon-circleselection spin\" ng-show=\"link_waiting\"></i>\n" +
    "      <i class=\"icon-erroralt\" ng-show=\"link_error\"></i>\n" +
    "        Start Linking\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-sm btn-muted\" ng-click=\"cancel_linking()\" ng-show=\"link_waiting\" ng-disabled=\"!link_waiting\" ng-class=\"{'btn-warning': link_waiting}\">\n" +
    "      <i class=\"icon-circleselection spin\"></i>\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteon/views/scene_member_modal.html',
    "<div class=\"modal-header\"><h3>{{action}} Link</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <form name=\"memberFrm\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <label for=\"on_level\">Device</label>\n" +
    "        <select ng-hide=\"editing\" class=\"form-control\" ng-model=\"member.address\" ng-options=\"device.config.address as device.name for device in devices | orderBy: 'name'\" ng-required=\"true\" ng-disabled=\"editing\"></select>\n" +
    "        <span ng-show=\"editing\">{{member.name}} ({{member.address}})</span>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label for=\"address\">Button</label>\n" +
    "        <rzslider rz-slider-model=\"member.button\" rz-slider-options=\"{floor: 0, ceil: 255, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label for=\"on_level\">On Level</label>\n" +
    "        <rzslider rz-slider-model=\"member.on_level\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "        <label for=\"address\">Ramp Rate</label>\n" +
    "        <select size=\"1\" class=\"form-control\" ng-model=\"member.ramp_rate\" ng-options=\"rate.value as rate.text for rate in rates | orderBy:'value':true\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    </form>\n" +
    "    <div uib-alert class=\"alert-danger\" ng-show=\"error\">{{error}}</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\" ng-disabled=\"loading\">Cancel</button>\n" +
    "    <button class=\"btn btn-sm\" type=\"button\" ng-click=\"save()\" ng-disabled=\"memberFrm.$invalid\" ng-class=\"{'btn-primary': loading, 'btn-success': !loading}\">\n" +
    "        <span ng-hide=\"loading\"><i class=\"icon-save-floppy\"></i> Save</span>\n" +
    "        <span ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Saving</span></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteon/views/scene_members.html',
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <div class=\"clearfix\">\n" +
    "    <button class=\"pull-right btn btn-success btn-xs\" ng-click=\"add_member()\" ng-disabled=\"status=='applying'\">\n" +
    "      <i class=\"icon-circleadd\"></i> Add</button>\n" +
    "    <button class=\"pull-right btn btn-warning btn-xs\" ng-click=\"apply()\" ng-show=\"has_pending()\" ng-disabled=\"status=='applying'\">\n" +
    "      <i class=\"icon-savetodrive\"></i> Apply</button>\n" +
    "    <label for=\"name\">Members</label>\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"list-group bg-muted select-list\" style=\"height: 20em;\">\n" +
    "    <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"member in ngModel.config.scene_members | orderBy: 'name'\" ng-click=\"edit_member(member)\">\n" +
    "      <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"delete_member(member)\" stop-event ng-disabled=\"status=='applying'\">\n" +
    "        <i class=\"icon-trash\"></i>\n" +
    "      </button>\n" +
    "      <div>\n" +
    "        <i class=\"icon-time text-warning\" ng-show=\"member.status == 'pending' && !member.$processing\" uib-popover=\"{{member.action | capitalize}}\" popover-trigger=\"'mouseenter'\" popover-append-to-body=\"true\"></i>\n" +
    "        <i class=\"icon-ok-circle text-success\" ng-show=\"member.status == 'complete'\"></i>\n" +
    "        <i class=\"icon-circleselection spin\" ng-show=\"member.$processing\"></i>\n" +
    "        <i class=\"icon-exclamation-sign text-danger\" ng-show=\"member.status == 'failed' && !member.$processing\" uib-popover=\"{{member.message}}\" popover-trigger=\"'mouseenter'\" popover-append-to-body=\"true\"></i>\n" +
    "        <span ng-class=\"{'strike-through': member.action === 'delete'}\">{{member.name || member.address}}<span ng-show=\"member.name\"> ({{member.address}})</span></span>\n" +
    "      </div>\n" +
    "      <div><small>\n" +
    "        Set <span ng-show=\"member.button > 1\"> button {{member.button}}</span> level to {{member.on_level}}% in {{member.ramp_rate | insteonRate}}\n" +
    "      </small></div>\n" +
    "    </li>\n" +
    "   </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteon/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Insteon\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "<!--\n" +
    "\n" +
    "enabled = false\n" +
    "debug = false\n" +
    "modem_debug = false\n" +
    "serial_device = /dev/ttyUSB1\n" +
    "\n" +
    "delay = 300\n" +
    "retries = 3\n" +
    "\n" +
    "-->\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-tabset active=\"active\">\n" +
    "              <uib-tab index=\"0\" heading=\"Settings\">\n" +
    "                <div class=\"panel-body\">\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"enabled\">Enabled: </label>\n" +
    "                    <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                      <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                      <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                      <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "                    </button>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"enabled\">Serial Device: </label>\n" +
    "\n" +
    "\n" +
    "                    <ul class=\"list-group bg-muted select-list\">\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"d in ports\" ng-click=\"config.serial_device = d\" ng-class=\"{'list-group-item-success': config.serial_device == d}\">\n" +
    "                        {{d}}\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"serial_baudrate\">Serial Baudrate</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"serial_baudrate\" placeholder=\"Serial Baudrate\" required=\"\" ng-model=\"config.serial_baudrate\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"serial_databits\">Serial Databits</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"serial_databits\" placeholder=\"Serial Databits\" required=\"\" ng-model=\"config.serial_databits\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"serial_stopbits\">Serial Stopbits</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"serial_stopbits\" placeholder=\"Serial Stopbits\" required=\"\" ng-model=\"config.serial_stopbits\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"serial_parity\">Serial Parity</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"serial_parity\" placeholder=\"Serial Parity\" required=\"\" ng-model=\"config.serial_parity\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"serial_flowcontrol\">Serial Flowcontrol</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"serial_flowcontrol\" placeholder=\"Serial Flowcontrol\" required=\"\" ng-model=\"config.serial_flowcontrol\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"timeout\">Timeout (ms)</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"timeout\" placeholder=\"Timeout (ms)\" required=\"\" ng-model=\"config.timeout\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"queue_timeout\">Queue Timeout (ms)</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"queue_timeout\" placeholder=\"Queue Timeout (ms)\" required=\"\" ng-model=\"config.queue_timeout\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"delay\">Delay (ms)</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"delay\" placeholder=\"Delay (ms)\" required=\"\" ng-model=\"config.delay\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"retries\">Retries</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"retries\" placeholder=\"Retries\" required=\"\" ng-model=\"config.retries\">\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"enabled\">Debug: </label>\n" +
    "                    <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"enabled\">Modem Debug: </label>\n" +
    "                    <toggle value=\"config.modem_debug\" class=\"pull-right\"></toggle>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                  </div>\n" +
    "\n" +
    "                </div>\n" +
    "              </uib-tab>\n" +
    "              <uib-tab index=\"1\" heading=\"Devices\">\n" +
    "                  <p>\n" +
    "                    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"device_search\" autocomplete='off'>\n" +
    "                      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "                    </div>\n" +
    "                  </p>\n" +
    "                  <p>\n" +
    "                    <ul class=\"list-group\">\n" +
    "                      <li class=\"list-group-item\" ng-repeat=\"device in devices | orderBy: 'name' | filter: {'is_scene': false, 'name': device_search}\">\n" +
    "                        <button class=\"btn btn-xs btn-default\" uib-popover=\"{{device.config.address}}\" popover-trigger=\"'outsideClick'\" ng-class=\"{'btn-danger': device.low_battery}\">\n" +
    "                          <i class=\"icon-info-sign\" ng-shide=\"device.low_battery\"></i>\n" +
    "                          <i class=\"icon-batteryaltthird\" ng-show=\"device.low_battery\"></i>\n" +
    "                        </button> <a ui-sref=\"main.devices.edit({name: device.name})\">{{device.name}}</a>\n" +
    "                        <div class=\"pull-right\">\n" +
    "                          <button class=\"btn btn-xs btn-success\" ng-class=\"{'btn-danger': !is_linked(device.config.address)}\"><i class=\"icon-linkalt\"></i></button>\n" +
    "                          <button class=\"btn btn-xs\" uib-popover=\"0x{{device.config.device_cat}} 0x{{device.config.device_subcat}}\" popover-trigger=\"'outsideClick'\" ng-class=\"{'btn-success': device.config.device_cat, 'btn-danger': !device.config.device_cat || device.config.device_cat == '00'}\" ng-disabled=\"!device.config.device_cat || device.config.device_cat == '00'\"><i class=\"icon-cpu-processor\"></i></button>\n" +
    "                          <button class=\"btn btn-xs btn-default\" uib-popover=\"{{device.config.last_heartbeat | date: 'short'}}\" popover-trigger=\"'outsideClick'\"ng-class=\"{'btn-danger': age_compare(device.config.last_heartbeat, '1d') === 1, 'btn-success': age(device.config.last_heartbeat, '1d') === -1}\"><i class=\"icon-heart\"></i></button>\n" +
    "                          <button class=\"btn btn-xs\" ng-class=\"{'btn-success': device.config.database.length > 0, 'btn-danger': !device.config.database.length}\"><i class=\"icon-database\"></i></button>\n" +
    "                        </div>\n" +
    "                        <div><small>Last Seen: {{device.last_seen | date : 'short'}}</small></div>\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                  </p>\n" +
    "              </uib-tab>\n" +
    "              <uib-tab index=\"2\" heading=\"Scenes\">\n" +
    "                  <p>\n" +
    "                    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"scene_search\" autocomplete='off'>\n" +
    "                      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "                    </div>\n" +
    "                  </p>\n" +
    "                  <p>\n" +
    "                    <ul class=\"list-group\">\n" +
    "                      <li class=\"list-group-item\" ng-repeat=\"scene in scenes | orderBy: ['address'] | filter: {'name': scene_search}\">\n" +
    "                        <button class=\"btn btn-xs btn-default\" uib-popover=\"{{scene.address}}\" popover-trigger=\"'outsideClick'\" ng-class=\"{'btn-danger': device.low_battery}\">\n" +
    "                          <i class=\"icon-info-sign\"></i>\n" +
    "                        </button> <a ui-sref=\"main.devices.edit({name: scene.name})\" ng-hide=\"scene.name === 'UNUSED'\">{{scene.name}}</a><span class=\"text-muted\" ng-show=\"scene.name === 'UNUSED'\">{{scene.name}}</span>\n" +
    "                        <div class=\"pull-right\">\n" +
    "                          <button class=\"btn btn-xs btn-success\" ng-class=\"{'btn-danger': !scene_used(scene.address)}\"><i class=\"icon-linkalt\"></i></button>\n" +
    "                        </div>\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                  </p>\n" +
    "              </uib-tab>\n" +
    "              <uib-tab index=\"3\" heading=\"Database\">\n" +
    "                <div class=\"panel\"><div class=\"panel-body\">\n" +
    "                  <p>\n" +
    "                    <button class=\"btn btn-primary btn-sm pull-right\" ng-click=\"load_modem_database()\" ng-disabled=\"db_loading || db_error\" ng-class=\"{'btn-danger': db_error}\">\n" +
    "                      <i class=\"icon-database\" ng-hide=\"db_loading || db_error\"></i>\n" +
    "                      <i class=\"icon-erroralt\" ng-show=\"db_error\"></i>\n" +
    "                      <i class=\"icon-circleselection spin\" ng-show=\"db_loading\"></i>\n" +
    "                      Load Database\n" +
    "                    </button>\n" +
    "                    Count: {{database.length}}\n" +
    "                  </p>\n" +
    "                  <p>\n" +
    "                    <ul class=\"list-group\">\n" +
    "                      <li class=\"list-group-item\" ng-repeat=\"record in database\">\n" +
    "                        <i class=\"icon-uploadalt\" ng-show=\"record.controller\"></i>\n" +
    "                        <i class=\"icon-download-alt\" ng-show=\"!record.controller\"></i>\n" +
    "                        {{record.name || record.address}}<span ng-show=\"record.name\"> ({{record.address}})</span>\n" +
    "                        <div><small>\n" +
    "                            <span ng-show=\"!record.controller\">\n" +
    "                                When scene {{record.group}}, use on level of {{record.on_level / 255 * 100 | number: 0}}% in {{record.ramp_rate | insteonRate}}<span ng-show=\"record.button > 1\"> and button {{record.button}}</span>\n" +
    "                            </span>\n" +
    "                            <span ng-show=\"record.controller\">\n" +
    "                                Send scene {{record.group}} <span ng-show=\"record.button > 1\">with button {{record.button}}</span>\n" +
    "                            </span>\n" +
    "                        </small></div>\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                  </p>\n" +
    "                </div></div>\n" +
    "              </uib-tab>\n" +
    "              <uib-tab index=\"4\" heading=\"Linking\">\n" +
    "                <div class=\"panel\"><div class=\"panel-body\">\n" +
    "                  <insteon-modem-linking ng-model=\"linking.device\"></insteon-modem-linking>\n" +
    "                  <div class=\"well\" ng-show=\"linking.device\">\n" +
    "                    <h3><i class=\"icon-ok-sign text-success\"></i> Device Linked</h3>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"address\">Name</label>\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" readonly ng-model=\"linking.device.name\" readonly>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"address\">Address</label>\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"address\" placeholder=\"Address\" readonly ng-model=\"linking.device.config.address\" readonly>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-4\">Device Cat</div>\n" +
    "                            <div class=\"col-xs-4\">Sub Cat</div>\n" +
    "                            <div class=\"col-xs-4\">Firmware</div>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-4\">{{linking.device.config.device_cat | toHex}}</div>\n" +
    "                            <div class=\"col-xs-4\">{{linking.device.config.device_subcat | toHex}}</div>\n" +
    "                            <div class=\"col-xs-4\">{{linking.device.config.firmware | toHex}}</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "\n" +
    "                      <button class=\"btn btn-sm btn-primary\" ng-class=\"{'btn-danger': id_error, 'btn-success': id_success}\" ng-disabled=\"id_loading || id_success || id_error\" ng-click=\"idrequest()\">\n" +
    "                          <i class=\"icon-circleselection spin\" ng-show=\"id_loading\"></i>\n" +
    "                          <i class=\"icon-circleselect\" ng-show=\"id_success\"></i>\n" +
    "                          <i class=\"icon-erroralt\" ng-show=\"id_error\"></i>\n" +
    "\n" +
    "                          <i class=\"icon-tagalt-pricealt\" ng-hide=\"id_loading || id_success || id_error\"></i> ID Request\n" +
    "                      </button>\n" +
    "                      <button class=\"btn btn-sm btn-primary\" ng-class=\"{'btn-danger': device_db_error}\" ng-click=\"reload_database()\" ng-disabled=\"device_db_loading\">\n" +
    "                        <i class=\"icon-database\" ng-show=\"!device_db_loading && !device_db_error\"></i>\n" +
    "                        <i class=\"icon-circleselection spin\" ng-show=\"device_db_loading\"></i>\n" +
    "                        <i class=\"icon-erroralt\" ng-show=\"device_db_error\"></i>\n" +
    "                        Load Database\n" +
    "                      </button>\n" +
    "                    </div>\n" +
    "                    <ul class=\"list-group bg-muted select-list\" style=\"height: 20em;\">\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"record in linking.device.config.database | orderBy: 'name'\" ng-show=\"record.used\">\n" +
    "                        <div>\n" +
    "                          <i class=\"icon-uploadalt\" ng-show=\"record.controller\"></i>\n" +
    "                          <i class=\"icon-download-alt\" ng-show=\"!record.controller\"></i>\n" +
    "                            {{record.name || record.address}}<span ng-show=\"record.name\"> ({{record.address}})</span>\n" +
    "                        </div>\n" +
    "                        <div><small>\n" +
    "                            <span ng-show=\"!record.controller\">\n" +
    "                                When scene {{record.group}}, use on level of {{record.on_level / 255 * 100 | number: 0}}% in {{record.ramp_rate | insteonRate}}<span ng-show=\"record.button > 1\"> and button {{record.button}}</span>\n" +
    "                            </span>\n" +
    "                            <span ng-show=\"record.controller\">\n" +
    "                                Send scene {{record.group}} <span ng-show=\"record.button > 1\">with button {{record.button}}</span>\n" +
    "                            </span>\n" +
    "                        </small></div>\n" +
    "                      </li>\n" +
    "                     </ul>\n" +
    "                  </div>\n" +
    "                </div></div>\n" +
    "              </uib-tab>\n" +
    "            </uib-tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/insteonhub/views/add.html',
    "<div ng-controller=\"insteonhubAdd\">\n" +
    "  <div class=\"form-group\" ng-hide=\"type\">\n" +
    "    <h3>Step 1: Device Type</h3>\n" +
    "    <ul class=\"insteon-types\">\n" +
    "      <li ng-repeat=\"t in device_types\" ng-click=\"changeType(t)\" ng-class=\"{'bg-success': type.name == t.name}\">{{t.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\" ng-show=\"type.type == 'devices' && !device.config.DeviceID\">\n" +
    "      <button class=\"btn btn-primary btn-sm pull-right\" ng-hide=\"errors || processing\" ng-click=\"reload()\"><i class=\"icon-refresh\"></i></button>\n" +
    "      <button class=\"btn btn-danger btn-sm pull-right\" ng-show=\"errors\" ng-click=\"reload()\"><i class=\"icon-erroralt\"></i></button>\n" +
    "      <button class=\"btn btn-default btn-sm pull-right\" ng-show=\"processing\"><i class=\"icon-loadingalt spin\"></i></button>\n" +
    "    <h3>Step 2: Select your Device</h3>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>\n" +
    "      <ul class=\"list-group bg-muted select-list\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"d in devices\" ng-click=\"selectDevice(d)\">\n" +
    "          {{d.DeviceName}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\" ng-show=\"type.type == 'scenes' && !device.config.SceneID\">\n" +
    "      <button class=\"btn btn-primary btn-sm pull-right\" ng-hide=\"errors || processing\" ng-click=\"reload()\"><i class=\"icon-refresh\"></i></button>\n" +
    "      <button class=\"btn btn-danger btn-sm pull-right\" ng-show=\"errors\" ng-click=\"reload()\"><i class=\"icon-erroralt\"></i></button>\n" +
    "      <button class=\"btn btn-default btn-sm pull-right\" ng-show=\"processing\"><i class=\"icon-loadingalt spin\"></i></button>\n" +
    "    <h3>Step 2: Select your Scene</h3>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>\n" +
    "      <ul class=\"list-group bg-muted select-list\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"s in devices\" ng-click=\"selectScene(s)\">\n" +
    "          {{s.SceneName}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\" ng-show=\"type.type == 'rooms' && !device.config.RoomID\">\n" +
    "      <button class=\"btn btn-primary btn-sm pull-right\" ng-hide=\"errors || processing\" ng-click=\"reload()\"><i class=\"icon-refresh\"></i></button>\n" +
    "      <button class=\"btn btn-danger btn-sm pull-right\" ng-show=\"errors\" ng-click=\"reload()\"><i class=\"icon-erroralt\"></i></button>\n" +
    "      <button class=\"btn btn-default btn-sm pull-right\" ng-show=\"processing\"><i class=\"icon-loadingalt spin\"></i></button>\n" +
    "    <h3>Step 2: Select your Room</h3>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>\n" +
    "      <ul class=\"list-group bg-muted select-list\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"r in devices\" ng-click=\"selectRoom(r)\">\n" +
    "          {{r.RoomName}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\" ng-show=\"device.config.DeviceID || device.config.SceneID || device.config.RoomID\">\n" +
    "    <h3>Step 3: Confirm Your Device and Type</h3>\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteonhub/views/edit.html',
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"name\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/insteonhub/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Insteon Hub\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"api_key\">API Key</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"api_key\" placeholder=\"API Key\" required=\"\" ng-model=\"config.api_key\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"api_secret\">Client Secret</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"api_secret\" placeholder=\"Client Secret\" required=\"\" ng-model=\"config.api_secret\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"user\">User</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"user\" placeholder=\"Insteon User\" required=\"\" ng-model=\"config.user\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"password\">Password</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"password\" placeholder=\"Insteon Password\" required=\"\" ng-model=\"config.password\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Debug: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/lutroncaseta/views/add.html',
    "<div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Integration ID</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"integration_id\" placeholder=\"Integration ID\" required=\"\" ng-model=\"device.config.integration_id\">\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/lutroncaseta/views/edit.html',
    "<div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Integration ID</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"integration_id\" placeholder=\"Integration ID\" required=\"\" ng-model=\"device.config.integration_id\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/lutroncaseta/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Lutron Caseta\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"key\">Bridge Host</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"key\" placeholder=\"Bridge Host\" required=\"\" ng-model=\"config.bridge_host\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"server\">Bridge Port</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"server\" placeholder=\"Bridge Port\" required=\"\" ng-model=\"config.bridge_port\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Username</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"interval\" placeholder=\"Username\" required=\"\" ng-model=\"config.username\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Password</label>\n" +
    "              <input type=\"password\" class=\"form-control\" id=\"interval\" placeholder=\"Password\" required=\"\" ng-model=\"config.password\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Reconnect Timeout (seconds)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Reconnect Timeout\" required=\"\" ng-model=\"config.reconnect_timeout\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Message Timeout (seconds)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Message Timeout\" required=\"\" ng-model=\"config.message_time\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Queue Interval (ms)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Queue Interval\" required=\"\" ng-model=\"config.queue_interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Poll Interval (ms)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Poll Interval\" required=\"\" ng-model=\"config.poll_interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"debug\">Debug Logging: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/mqtt/views/add.html',
    "<div ng-controller=\"mqttAdd\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Topic</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"topic\" placeholder=\"Topic\" required=\"\" ng-model=\"device.config.topic\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Parser</label>\n" +
    "    <select size=\"1\" ng-model=\"device.config.parser\"></select>\n" +
    "    <select class=\"form-control\" size=\"1\" ng-model=\"device.config.parser\" ng-options=\"parser.value as parser.name for parser in parsers\"></select>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('modules/mqtt/views/edit.html',
    "<div ng-controller=\"mqttEdit\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Topic</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"topic\" placeholder=\"Topic\" required=\"\" ng-model=\"device.config.topic\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Parser</label>\n" +
    "    <select class=\"form-control\" size=\"1\" ng-model=\"device.config.parser\" ng-options=\"parser.value as parser.name for parser in parsers\"></select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/mqtt/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / MQTT\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"key\">Server</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"key\" placeholder=\"Server\" required=\"\" ng-model=\"config.server\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Save Wait (ms)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Reconnect Timeout\" required=\"\" ng-model=\"config.save_wait\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">min_save_age (ms)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Message Timeout\" required=\"\" ng-model=\"config.min_save_age\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/notifications/views/action.builder.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Action Builder</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "          <form name=\"actionFrm\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Title</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"title\" placeholder=\"Title\" required=\"\" ng-model=\"action.title\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Icon</label>\n" +
    "                <icon-selector value=\"action.icon\"></icon-selector>\n" +
    "              </div>\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                  <label for=\"trigger\">Type<span ng-show=\"action.type\">: {{action.type}}</span></label>\n" +
    "                  <div>\n" +
    "                  <ul class=\"list-group bg-muted select-list\" >\n" +
    "                    <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in action_types\" ng-click=\"changeType(t.value);\" ng-class=\"{'list-group-item-success': action.type == t.value}\">\n" +
    "                      <i class=\"{{t.icon}}\"></i> {{t.name}}\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                  </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-4\" ng-show=\"action.type == 'devices'\">\n" +
    "                    <label for=\"trigger\">Device<span ng-show=\"action.item\">: {{action.item.name}}</span></label>\n" +
    "                    <ul class=\"list-group bg-muted select-list\" >\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in devices | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': action.name == t.name}\">\n" +
    "                        {{t.name}}\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-4\" ng-show=\"action.type == 'rooms'\">\n" +
    "                    <label for=\"trigger\">Room<span ng-show=\"action.item\">: {{action.item.name}}</span></label>\n" +
    "                    <ul class=\"list-group bg-muted select-list\" >\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in rooms | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': action.name == t.name}\">\n" +
    "                        {{t.name}}\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-4\" ng-show=\"action.type == 'scenes'\">\n" +
    "                    <label for=\"trigger\">Scene<span ng-show=\"action.item\">: {{action.item.name}}</span></label>\n" +
    "                    <ul class=\"list-group bg-muted select-list\" >\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in scenes | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': action.name == t.name}\">\n" +
    "                        {{t.name}}\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\" ng-show=\"action.name\">\n" +
    "\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"trigger\">Action<span ng-show=\"action.action\">: {{action.action}}</span></label>\n" +
    "                    <div>\n" +
    "                    <ul class=\"list-group bg-muted select-list\" >\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in type_actions\" ng-click=\"change_action(t)\" ng-show=\"has_capability(t.capabilities)\" ng-class=\"{'list-group-item-success': action.action == t.value}\">\n" +
    "                        {{t.name}}\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"row\" ng-show=\"action.name\">\n" +
    "\n" +
    "                <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('level') != -1\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"name\">Level</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Level\" ng-model=\"action.args[0]\">\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('temperature') != -1\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"name\">Temperature</label>\n" +
    "                    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Temperature\" ng-model=\"action.args[0]\">\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('mode') != -1\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label for=\"name\">Mode</label>\n" +
    "                    <ul class=\"list-group bg-muted select-list\" >\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"action.args[0] = 'COOL'\" ng-class=\"{'list-group-item-success': action.args == 'COOL'}\">\n" +
    "                        <i class=\"icon-snow\"></i> COOL\n" +
    "                      </li>\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"action.args[0] = 'HEAT'\" ng-class=\"{'list-group-item-success': action.args == 'HEAT'}\">\n" +
    "                        <i class=\"icon-fire\"></i> HEAT\n" +
    "                      </li>\n" +
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"action.args[0] = 'OFF'\" ng-class=\"{'list-group-item-success': action.args == 'OFF'}\">\n" +
    "                        <i class=\"glyphicon glyphicon-off\"></i> OFF\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "              </div>\n" +
    "\n" +
    "              <input type=\"hidden\" ng-model=\"action.type\" required>\n" +
    "              <input type=\"hidden\" ng-model=\"action.name\" required>\n" +
    "              <input type=\"hidden\" ng-model=\"action.action\" required>\n" +
    "          </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-disabled=\"actionFrm.$invalid\" ng-click=\"save()\">Save</button>\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"close()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/notifications/views/index.html',
    "<div class=\"notifications\" ng-class=\"{'notifications-open': !notifications.hidden}\">\n" +
    "	<div class=\"notifications-title\">\n" +
    "	  <small><i class=\"icon-flag\"></i></small> Notifications\n" +
    "	  <button class=\"btn btn-sm btn-default pull-right\" ng-click=\"hide()\"><i class=\"icon-fastright\"></i></button>\n" +
    "	</div>\n" +
    "	<ul class=\"notifications-list\">\n" +
    "		<li ng-show=\"notifications.notifications.length == 0\" class=\"notifications-item\">\n" +
    "		  <h2 class=\"notification-title\">No Notifications</h2>\n" +
    "		</li>\n" +
    "		<li ng-repeat=\"notification in notifications.notifications\" class=\"notifications-item\">\n" +
    "		  <h2 class=\"notification-title\">{{notification.message}}</h2>\n" +
    "		  <div class=\"notification-actions\">\n" +
    "			  <controller ng-repeat=\"action in notification.actions\" title=\"{{action.title}}\" type=\"{{action.type}}\" name=\"{{action.name}}\" action=\"{{action.action}}\" icon=\"{{action.icon}}\" args=\"action.args\" onsuccess=\"dismiss\"></controller>\n" +
    "			  <controller title=\"Ignore\" type=\"notification\" name=\"{{notification._id}}\" action=\"deactivate\" icon=\"icon-circledelete\" args=\"[]\" onsuccess=\"dismiss\"></controller>\n" +
    "		  </div>\n" +
    "		  <div class=\"notification-date\">{{notification.active_date | date: 'medium'}}</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('modules/notifications/views/notifications.add.html',
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Add Notification\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "          <form name=\"notificationFrm\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Name</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"notification.name\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Message</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"message\" placeholder=\"Message\" required=\"\" ng-model=\"notification.message\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"check_threshold\">Check Threshold</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"check_threshold\" placeholder=\"Check Threshold\" required=\"\" ng-model=\"notification.check_threshold\">\n" +
    "              <h6 class=\"text-muted\"><i class=\"icon-info-sign\"></i> Require this many successful triggers before activating the notification</h6>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"hold_off_time\">Hold Off Time (minutes)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"hold_off_time\" placeholder=\"Hold Off Time\" required=\"\" ng-model=\"notification.hold_off_time\">\n" +
    "              <h6 class=\"text-muted\"><i class=\"icon-info-sign\"></i> Wait this long before allowing the notification to activate again</h6>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"expire_after\">Expire After (minutes)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"expire_after\" placeholder=\"Expire After\" required=\"\" ng-model=\"notification.expire_after\">\n" +
    "              <h6 class=\"text-muted\"><i class=\"icon-info-sign\"></i> A value of 0 means the notification will not expire automatically</h6>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <toggle value=\"notification.push\"></toggle>\n" +
    "              <small>Enable Push Notifications</small>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Actions</label>\n" +
    "              <button class=\"btn btn-xs btn-primary pull-right\"><i class=\"icon-circleadd\"></i></button>\n" +
    "              <ul class=\"list-group\">\n" +
    "                <li class=\"list-group-item\" ng-repeat=\"action in notification.actions\"><i class=\"{{action.icon}}\"></i> {{action.name}} {{action.type}} {{action.action}}</li>\n" +
    "                <li class=\"list-group-item\" ng-show=\"!notification.actions || notification.actions.length == 0\">No actions added</li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Triggers</label>\n" +
    "              <button class=\"btn btn-xs btn-primary pull-right\"><i class=\"icon-circleadd\"></i></button>\n" +
    "              <ul class=\"list-group\">\n" +
    "                <li class=\"list-group-item\" ng-show=\"!notification.triggers || notification.triggers.length == 0\">No actions added</li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Icon</label>\n" +
    "              <icon-selector value=\"notification.icon\" />\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Tags</label>\n" +
    "              <tags tag-model=\"notification.tags\" />\n" +
    "            </div>\n" +
    "\n" +
    "            <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"notificationFrm.$invalid || saving\">\n" +
    "              <i class=\"icon-loadingalt spin\" ng-show=\"saving\"></i>\n" +
    "              <i class=\"icon-circleadd\" ng-hide=\"saving\"></i>\n" +
    "              Add</button>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/notifications/views/notifications.edit.html',
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Edit Notification\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "          <form name=\"notificationFrm\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"notification.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Message</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"message\" placeholder=\"Message\" required=\"\" ng-model=\"notification.message\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"check_threshold\">Check Threshold</label>\n" +
    "                <input type=\"number\" class=\"form-control\" id=\"check_threshold\" placeholder=\"Check Threshold\" required=\"\" ng-model=\"notification.check_threshold\">\n" +
    "                <h6 class=\"text-muted\"><i class=\"icon-info-sign\"></i> Require this many successful triggers before activating the notification</h6>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"hold_off_time\">Hold Off Time (minutes)</label>\n" +
    "                <input type=\"number\" class=\"form-control\" id=\"hold_off_time\" placeholder=\"Hold Off Time\" required=\"\" ng-model=\"notification.hold_off_time\">\n" +
    "                <h6 class=\"text-muted\"><i class=\"icon-info-sign\"></i> Wait this long before allowing the notification to activate again</h6>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"expire_after\">Expire After (minutes)</label>\n" +
    "                <input type=\"number\" class=\"form-control\" id=\"expire_after\" placeholder=\"Expire After\" required=\"\" ng-model=\"notification.expire_after\">\n" +
    "                <h6 class=\"text-muted\"><i class=\"icon-info-sign\"></i> A value of 0 means the notification will not expire automatically</h6>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <toggle value=\"notification.push\"></toggle>\n" +
    "                <small>Enable Push Notifications</small>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Actions</label>\n" +
    "                <button class=\"btn btn-xs btn-primary pull-right\" ng-click=\"add_action()\"><i class=\"icon-circleadd\"></i></button>\n" +
    "                <ul class=\"list-group\">\n" +
    "                  <li class=\"list-group-item\" ng-repeat=\"action in notification.actions\" ng-click=\"edit_action(action)\"><i class=\"{{action.icon}}\"></i> {{action.name}} {{action.type}} {{action.action}}\n" +
    "                    <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"remove_action(action)\"><i class=\"icon-circledelete\"></i></button></li>\n" +
    "                  <li class=\"list-group-item\" ng-show=\"!notification.actions || notification.actions.length == 0\">No actions added</li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Triggers</label>\n" +
    "                <button class=\"btn btn-xs btn-primary pull-right\" ng-click=\"add_trigger()\"><i class=\"icon-circleadd\"></i></button>\n" +
    "                <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "                <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                  <li class=\"list-group-item\" ng-show=\"!triggers || triggers.length == 0\">No actions added</li>\n" +
    "                  <li class=\"list-group-item\" ng-repeat=\"trigger in triggers | orderBy: 'name'\">\n" +
    "                    {{trigger.name}}\n" +
    "                    <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"remove_trigger(trigger)\"><i class=\"icon-circledelete\"></i></button>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Icon</label>\n" +
    "                <icon-selector value=\"notification.icon\" />\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Tags</label>\n" +
    "                <tags tag-model=\"notification.tags\" />\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"notificationFrm.$invalid || saving || deleting\">\n" +
    "                <i class=\"icon-loadingalt spin\" ng-show=\"saving\"></i>\n" +
    "                <i class=\"icon-savetodrive\" ng-hide=\"saving\"></i> Save</button>\n" +
    "                <button class=\"pull-right btn btn-sm btn-success\" ng-click=\"activate()\" ng-hide=\"notification.active\"><i class=\"icon-circleplayempty\"></i> Activate</button>\n" +
    "                <button class=\"pull-right btn btn-sm btn-danger\" ng-click=\"deactivate()\" ng-show=\"notification.active\"><i class=\"icon-circlestopempty\"></i> De-activate</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"delete()\" ng-disabled=\"saving || deleting\">\n" +
    "                  <i class=\"icon-loadingalt spin\" ng-show=\"deleting\"></i>\n" +
    "                  <i class=\"icon-circledelete\" ng-hide=\"deleting\"></i>\n" +
    "                  Remove</button>\n" +
    "                <button class=\"btn btn-sm btn-warning\" ng-click=\"reset()\">Reset</button>\n" +
    "                <div>\n" +
    "                <h6 class=\"text-muted pull-right\" ng-disabled=\"action.status == 'pending'\" ng-show=\"action.status == 'success'\"><i class=\"text-success icon-info-sign\"></i> {{action.message}}</h6>\n" +
    "                <h6 class=\"text-muted pull-right\" ng-disabled=\"action.status == 'pending'\" ng-show=\"action.status == 'error'\"><i class=\"text-danger icon-erroralt\"></i> {{action.message}}</h6>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "          </form>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/notifications/views/notifications.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/notifications/views/notifications.list.html',
    "\n" +
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 7em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Notifications</h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <p>\n" +
    "          <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "            <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "          </div>\n" +
    "        </p>\n" +
    "        <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "        <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"view(notification)\" ng-repeat=\"notification in notifications | filter: search | orderBy: '+name'\" ui-sref=\"^.edit({'id': notification._id})\">\n" +
    "            <i class=\"{{notification.icon}}\" ng-show=\"notification.icon\"></i>\n" +
    "            {{notification.name}}\n" +
    "            <div style=\"font-size: .7em\" class=\"text-muted\" ng-show=\"notification.tags.length > 0\"><i class=\"icon-tags\"></i>\n" +
    "              <span ng-repeat=\"tag in notification.tags\" style=\"margin-right: 1em;\">{{tag}}</span>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"^.add\"><i class=\"icon-plus\"></i></button>\n"
  );


  $templateCache.put('modules/notifications/views/status.html',
    "<div class=\"notification-status\" ng-click=\"showNotifications()\" ng-class=\"{'text-muted': notifications.notifications.length == 0}\">\n" +
    "	<i class=\"icon-flag\"></i>\n" +
    "	<span class=\"notification-status-badge bg-danger\" ng-show=\"notifications.notifications.length > 0\">{{notifications.notifications.length}}</span>\n" +
    "</div>"
  );


  $templateCache.put('modules/notifications/views/triggers.picker.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Select a Trigger</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "  <div class=\"list-group\" ng-hide=\"loading\">\n" +
    "    <button type=\"button\" class=\"list-group-item\" ng-repeat=\"trigger in triggers | orderBy: 'name'\" ng-click=\"select(trigger)\" ng-hide=\"notification.triggers.indexOf(trigger._id) > -1\">{{trigger.name}}</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"ok()\">Close</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rad/views/add.html',
    "<div ng-controller=\"radAdd\">\n" +
    "	<div ng-show=\"!connecting\">\n" +
    "    <p ><strong>Connect to an Abode Device</strong></p>\n" +
    "    <div class=\"list-group\">\n" +
    "      <button type=\"button\" class=\"list-group-item list-group-item-danger\" ng-show=\"detected.length == 0 && !loading\" ng-click=\"load()\"><i class=\"icon-exclamation-sign text-danger\"></i> Unable to detect any Abode devices. Specify an address manually below or click here to retry</button>\n" +
    "      <button type=\"button\" class=\"list-group-item\" ng-repeat=\"device in detected\" ng-click=\"connect(device)\"><i class=\"icon-home\"></i> {{device.name}}</button>\n" +
    "      <button type=\"button\" class=\"list-group-item\" disabled ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Searching of devices...</button>\n" +
    "      <button type=\"button\" class=\"list-group-item\" ng-show=\"!loading && sources.length > 0\" ng-click=\"load()\"><i class=\"icon-ok-sign text-success\"></i> Found {{detected.length}} Device[s]<div><small>Click to search again.</small></div></button>\n" +
    "    </div>\n" +
    "    <p class=\"text-center\"><strong>- or -</strong></p>\n" +
    "    <form name=\"manualFrm\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Specify Manually\" ng-model=\"manual.url\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button class=\"btn btn-default\" type=\"button\" ng-click=\"connect(manual)\">Go!</button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "    </div>\n" +
    "    <div ng-show=\"connecting\">\n" +
    "	    <div class=\"list-group\">\n" +
    "      		<button type=\"button\" class=\"list-group-item\" disabled ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Connecting to device...</button>\n" +
    "      		<button type=\"button\" class=\"list-group-item\" disabled ng-show=\"!loading\"><i class=\"icon-ok-sign text-success\"></i> Connected to device, click \"Add\" to continue adding.</button>\n" +
    "	    </div>\n" +
    "      <div class=\"form-group\" ng-show=\"!loading\">\n" +
    "        <label for=\"name\">Name</label>\n" +
    "        <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" ng-model=\"device.name\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rad/views/edit.html',
    "<div ng-controller=\"radEdit\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Address</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"address\" placeholder=\"Address\" required=\"\" ng-model=\"device.config.address\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Default Interface: </label>\n" +
    "    <select class=\"form-control\" ng-model=\"device.config.interface\" ng-options=\"iface._id as iface.name for iface in interfaces | orderBy:'name'\"></select>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Show events in Browser: </label>\n" +
    "    <toggle value=\"device.config.show_events\" class=\"pull-right\"></toggle>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Dim Display: </label>\n" +
    "    <toggle value=\"device.config.dim_display\" class=\"pull-right\"></toggle>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-show=\"device.config.dim_display\">\n" +
    "    <label for=\"enabled\">Dim After: </label>\n" +
    "    <rzslider rz-slider-model=\"device.config.dim_after\" rz-slider-options=\"{floor: 0, ceil: 120, step: 5, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Night Mode (changes text to red at night): </label>\n" +
    "    <toggle value=\"device.config.night_mode\" class=\"pull-right\"></toggle>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Show Date: </label>\n" +
    "    <toggle value=\"device.config.show_date\" class=\"pull-right\"></toggle>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Show Weather: </label>\n" +
    "    <toggle value=\"device.config.show_weather\" class=\"pull-right\"></toggle>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label>Minimum Brightness: </label>\n" +
    "    <rzslider rz-slider-model=\"device.config.display.min_brightness\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Put Display Sleep: </label>\n" +
    "    <toggle value=\"device.config.display.sleep\" class=\"pull-right\"></toggle>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-show=\"device.config.display.sleep\">\n" +
    "    <label for=\"enabled\">Sleep after (min): </label>\n" +
    "    <rzslider rz-slider-model=\"device.config.display.wake_timer\" rz-slider-options=\"{floor: 0, ceil: 120, step: 5, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">DHT Sensor: </label>\n" +
    "    <select class=\"form-control\" ng-model=\"device.config.display.dht_sensor\" ng-options=\"sensor as sensor for sensor in dht_sensors\"></select>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-show=\"device.config.display.dht_sensor\">\n" +
    "    <label for=\"enabled\">DHT GPIO Pin: </label>\n" +
    "        <rzslider rz-slider-model=\"device.config.display.dht_pin\" rz-slider-options=\"{floor: 0, ceil: 27, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Light GPIO Pin: </label>\n" +
    "    <rzslider rz-slider-model=\"device.config.display.light_pin\" rz-slider-options=\"{floor: 0, ceil: 27, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"enabled\">Motion GPIO Pin: </label>\n" +
    "    <rzslider rz-slider-model=\"device.config.display.motion_pin\" rz-slider-options=\"{floor: 0, ceil: 27, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "    <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('modules/rad/views/edit_bishop_Feb-06-121234-2016_Conflict.html',
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"name\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rad/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Rad\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Interval (sec)</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"interval\" placeholder=\"Interval (sec)\" required=\"\" ng-model=\"config.interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Debug: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/radiothermostat/views/edit.html',
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"name\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"name\">Address</label>\n" +
    "  <input type=\"text\" class=\"form-control\" id=\"address\" placeholder=\"Address\" required=\"\" ng-model=\"device.config.address\">\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/radiothermostat/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Radiothermostat\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Process Interval (min)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Process Interval\" required=\"\" ng-model=\"config.interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"debug\">Debug Logging: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/rooms/views/assign.html',
    "<div class=\"modal-header\"><h3>Assign Device</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "    </div>\n" +
    "  </p>\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Devices</div>\n" +
    "  <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li style=\"cursor: pointer;\" class=\"list-group-item\" ng-repeat=\"device in devices | filter: search | orderBy: '+name'\" ng-click=\"select(device)\" ng-show=\"assigned.indexOf(device.name) == -1\">{{device.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rooms/views/assign.scene.html',
    "<div class=\"modal-header\"><h3>Assign Scene</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "    </div>\n" +
    "  </p>\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Scenes</div>\n" +
    "  <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li style=\"cursor: pointer;\" class=\"list-group-item\" ng-repeat=\"scene in scenes | filter: search | orderBy: '+name'\" ng-click=\"select(scene)\" ng-show=\"assigned.indexOf(scene.name) == -1\">{{scene.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rooms/views/room.icon.html',
    "<div class=\"room-icon\" ng-style=\"styles\" ng-class=\"{'room-motion': room._motion_on, 'room-light': room._lights_on, 'active': room._motion_on || room._lights_on || room._doors_open || rooms._windows_open || tempType}\" ng-click=\"view()\">\n" +
    "  <div class=\"room-icon-display\" ng-show=\"icon && room._temperature && tempType\"><i class=\"{{icon}}\"></i></div>\n" +
    "  <div class=\"room-icon-temp\" ng-show=\"tempType && room._temperature\">{{room._temperature | number:0}}</div>\n" +
    "  <span ng-show=\"icon && !room._temperature || !tempType\"><i class=\"{{icon}}\"></i></span>\n" +
    "  <div class=\"room-icon-status room-icon-loading\" ng-class=\"{'room-loading': loading}\"><i class=\"icon-loadingalt spin\"></i></div>\n" +
    "  <div class=\"room-icon-status room-icon-error\" ng-class=\"{'room-error': error}\"><i class=\"icon-warning-sign\"></i></div>\n" +
    "  <div class=\"room-icon-badge room-icon-openclose\" ng-class=\"{'room-openclose': room._doors_open || room._windows_open}\">{{room._door_on_count + room._window_on_count}}</div>\n" +
    "  <div class=\"room-icon-badge room-icon-fan\" ng-class=\"{'room-fan': room._fans_on}\"><i class=\"icon-fan\"></i></div>\n" +
    "  <div class=\"room-icon-badge room-icon-conditioner\" ng-class=\"{'room-cool': room._mode_cool}\"><i class=\"icon-snow\"></i></div>\n" +
    "  <div class=\"room-icon-badge room-icon-conditioner\" ng-class=\"{'room-heat': room._mode_heat}\"><i class=\"icon-fire\"></i></div>\n" +
    "  <div class=\"room-title\" ng-show=\"title\"><span style=\"font-size: .6em;\">{{title}}</span></div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rooms/views/rooms.add.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Add Room\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"addRoom\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Icon</label>\n" +
    "                <icon-selector value=\"room.icon\" />\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Tags</label>\n" +
    "                <tags tag-model=\"room.tags\" />\n" +
    "              </div>\n" +
    "\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addRoom.$invalid\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/rooms/views/rooms.cameras.html',
    "<div>\n" +
    "  <div style=\"position: relative;\">\n" +
    "    <div ng-click=\"play()\" ng-show=\"cameras[index].video\" class=\"room-cameras-controls play\"><i class=\"icon-circleplayempty\"></i></div>\n" +
    "    <div ng-click=\"previous()\" ng-show=\"cameras.length > 1\" class=\"room-cameras-controls previous\"><i class=\"icon-chevron-left\"></i></div>\n" +
    "    <div ng-click=\"next()\" ng-show=\"cameras.length > 1\"  class=\"room-cameras-controls next\"><i class=\"icon-chevron-right\"></i></div>\n" +
    "  <img ng-repeat=\"camera in cameras\" src=\"{{camera.image}}\" ng-show=\"$index == index\" style=\"width: 100%\">\n" +
    "    <div ng-click=\"reload($index)\" ng-show=\"cameras.length > 1\" class=\"room-cameras-refresh\"><i class=\"icon-refresh\"></i></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rooms/views/rooms.edit.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Edit Room\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-8 col-md-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-sm-3\" style=\"position: relative\">\n" +
    "                <ul class=\"section-nav\">\n" +
    "                  <li ng-click=\"section='general'\" ng-class=\"{active: section == 'general'}\">General</li>\n" +
    "                  <li ng-click=\"section='devices'\" ng-class=\"{active: section == 'devices'}\">Devices</li>\n" +
    "                  <li ng-click=\"section='scenes'\" ng-class=\"{active: section == 'scenes'}\">Scenes</li>\n" +
    "                  <!-- <li ng-click=\"section='triggers'\" ng-class=\"{active: section == 'triggers'}\">Triggers</li>-->\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-9 col-xs-12\">\n" +
    "\n" +
    "                <form name=\"addRoom\">\n" +
    "                  <div ng-show=\"section=='general'\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Name</label>\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Icon</label>\n" +
    "                      <icon-selector value=\"room.icon\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Tags</label>\n" +
    "                      <tags tag-model=\"room.tags\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"addRoom.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\" ng-disabled=\"addRoom.$invalid\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "                    </div>\n" +
    "                    <room-icon name=\"{{room._id}}\" temp-type=\"cycle\"></room-icon>\n" +
    "                  </div>\n" +
    "                  <div ng-show=\"section=='devices'\">\n" +
    "                    <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Devices</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Devices </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addDevice()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"device in devices\">{{device.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeDevice(device._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div ng-show=\"section=='scenes'\">\n" +
    "                    <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Scenes</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Scenes </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addScene()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"scene in scenes\">{{scene.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeScene(scene._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div ng-show=\"section=='triggers'\">\n" +
    "                    <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Triggers</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Triggers </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addToTrigger()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"trigger in triggers\">{{trigger.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeFromTrigger(trigger._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </form>\n" +
    "\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/rooms/views/rooms.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/rooms/views/rooms.list.html',
    "\n" +
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 7em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Rooms</h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <p>\n" +
    "          <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "            <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "          </div>\n" +
    "        </p>\n" +
    "        <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "        <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"view(room)\" ng-repeat=\"room in rooms | filter: search | orderBy: '+name'\">\n" +
    "            <i class=\"{{room.icon}}\" ng-show=\"room.icon\"></i>\n" +
    "            {{room.name}} <div class=\"pull-right\" style=\"margin-left: .5em; margin-top: -.25em\"> <button class=\"btn btn-xs btn-default\" ng-click=\"edit(room)\" stop-event><i class=\"icon-edit\"></i></button></div> <span class=\"badge\">{{room._devices.length}} <i class=\"glyphicon glyphicon-oil\"></i></span>\n" +
    "            <div style=\"font-size: .7em\" class=\"text-muted\" ng-show=\"room.tags.length > 0\"><i class=\"icon-tags\"></i>\n" +
    "              <span ng-repeat=\"tag in room.tags\" style=\"margin-right: 1em;\">{{tag}}</span>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"main.rooms.add\"><i class=\"icon-plus\"></i></button>\n"
  );


  $templateCache.put('modules/rooms/views/rooms.view.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">{{name}}\n" +
    "\n" +
    "      <button class=\"btn btn-primary btn-sm pull-right\" ng-hide=\"errors || processing\" ng-click=\"reload()\" ng-disabled=\"controls\"><i class=\"icon-refresh\"></i></button>\n" +
    "      <button class=\"btn btn-danger btn-sm pull-right\" ng-show=\"errors\" ng-click=\"reload()\"><i class=\"icon-erroralt\"></i></button>\n" +
    "      <button class=\"btn btn-default btn-sm pull-right\" ng-show=\"processing\"><i class=\"icon-loadingalt spin\"></i></button>\n" +
    "      <button class=\"btn btn-sm pull-right\" style=\"margin-right: 1em;\" ng-show=\"filter_counts.light > 0 || filter_counts.shade > 0\"  ng-click=\"toggleControls()\" ng-class=\"{'btn-info': controls, 'btn-default': !controls}\"><i class=\"icon-controlpanel\"></i></button>\n" +
    "    </h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div  ng-hide=\"controls\">\n" +
    "    <room-cameras devices=\"cameras\" source=\"source\" ng-hide=\"\"></room-cameras>\n" +
    "    <div class=\"row\" ng-class=\"{'room-filter-offset': cameras.length > 0}\">\n" +
    "      <div class=\"col-xs-2\">\n" +
    "        <div class=\"room_filter\" ng-click=\"filter('light')\" ng-class=\"{selected: filter_condition =='light'}\">\n" +
    "          <i class=\"icon-lightbulb-idea\"></i>\n" +
    "          <div class=\"on-count\" ng-class=\"{'on-ok': on_counts.light > 0}\">{{filter_counts.light}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-2\"><div class=\"room_filter\" ng-click=\"filter('scenes')\" ng-class=\"{selected: filter_condition =='scenes'}\"><i class=\"icon-picture\"></i><div class=\"on-count\" ng-class=\"{'on-ok': on_counts.scenes != 0}\">{{filter_counts.scenes}}</div></div></div>\n" +
    "      <div class=\"col-xs-2\"><div class=\"room_filter\" ng-click=\"filter('motion_sensor')\" ng-class=\"{selected: filter_condition =='motion_sensor'}\"><i class=\"fi-motion\"></i><div class=\"on-count\" ng-class=\"{'on-danger': on_counts.motion_sensor != 0}\">{{filter_counts.motion_sensor}}</div></div></div>\n" +
    "      <div class=\"col-xs-2\"><div class=\"room_filter\" ng-click=\"filter('door')\" ng-class=\"{selected: filter_condition =='door'}\"><i class=\"fi-door-open\"></i><div class=\"on-count\" ng-class=\"{'on-danger': on_counts.door != 0}\">{{filter_counts.door}}</div></div></div>\n" +
    "      <div class=\"col-xs-2\"><div class=\"room_filter\" ng-click=\"filter('window')\" ng-class=\"{selected: filter_condition =='window'}\"><i class=\"fi-window\"></i><div class=\"on-count\" ng-class=\"{'on-danger': on_counts.window != 0}\">{{filter_counts.window}}</div></div></div>\n" +
    "      <div class=\"col-xs-2\"><div class=\"room_filter\" ng-click=\"filter('temperature_sensor')\" ng-class=\"{selected: filter_condition =='temperature_sensor'}\">{{room_temperature}}</div></div>\n" +
    "    </div>\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li class=\"list-group-item\" style=\"cursor: pointer\" ng-repeat=\"scene in scenes | orderBy: ['-_on', '+age', '+name']\" ng-class=\"{'list-group-item-success': scene._on}\" ng-show=\"filter_condition=='scenes' || filter_conditions==''\" ng-click=\"openScene(scene)\">\n" +
    "        <h5 class=\"list-group-item-heading\"><i class=\"icon-picture\"></i> {{scene.name}}</h5>\n" +
    "        <p style=\"font-size: .8em;\" class=\"list-group-item-text \">{{scene.age | ageHumanReadable}}</p>\n" +
    "      </li>\n" +
    "      <device-list-item ng-repeat=\"device in devices | orderBy: ['-_motion', '-_on', '+age', '+name']\" ng-model=\"device\" show-controls=\"true\" ng-show=\"check_filter(device)\"></device-list-item>\n" +
    "      <!--\n" +
    "      <li class=\"list-group-item\" style=\"cursor: pointer\" ng-repeat=\"device in devices | orderBy: ['-_motion', '-_on', '+age', '+name']\" ng-class=\"{'list-group-item-success': device_state(device, '_on', true, ['light', 'display', 'fan']), 'list-group-item-danger': device_state(device, '_motion', true, ['motion_sensor']) || device_state(device, '_on', true, ['door', 'window']) || device._mode == 'HEAT', 'list-group-item-info': device._mode == 'COOL'}\" ng-click=\"open(device)\" ng-show=\"check_filter(device)\">\n" +
    "        <h4 class=\"list-group-item-heading\">\n" +
    "          <i class=\"icon-videocamerathree\" ng-show=\"has_capability(device, 'camera')\"></i>\n" +
    "          <i class=\"icon-fan\" ng-show=\"has_capability(device, 'fan')\"></i>\n" +
    "          <i class=\"icon-lightbulb-idea\" ng-show=\"has_capability(device, 'light')\"></i>\n" +
    "          <i class=\"icon-monitor\" ng-show=\"has_capability(device, 'display')\"></i>\n" +
    "          <i class=\"fi-window\" ng-show=\"has_capability(device, 'window')\"></i>\n" +
    "          <i class=\"fi-door-open\" ng-show=\"has_capability(device, 'door')\"></i>\n" +
    "          <i class=\"fi-motion\" ng-show=\"has_capability(device, 'motion_sensor')\"></i>\n" +
    "          <i class=\"wi wi-day-snow-thunderstorm\" ng-show=\"has_capability(device, 'weather')\"></i>\n" +
    "          <i class=\"icon-temperaturealt-thermometeralt\" ng-show=\"has_capability(device, 'conditioner')\"></i>\n" +
    "          {{device.name}}\n" +
    "          <p class=\"list-group-item-text pull-right\">\n" +
    "            <span class=\"badge\"></span>\n" +
    "            <span class=\"badge\" ng-show=\"device._mode == 'COOL'\">{{device._set_point}} <i class=\"icon-snow\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"device._mode == 'HEAT'\">{{device._set_point}} <i class=\"icon-fire\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"has_capability(device, 'temperature_sensor')\">{{device._temperature}} <i class=\"wi wi-thermometer\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"has_capability(device, 'humidity_sensor')\">{{device._humidity}} <i class=\"wi wi-humidity\"></i></span>\n" +
    "            <span class=\"badge\" ng-show=\"has_capability(device, 'light_sensor')\">{{device._lumens}} <i class=\"wi wi-day-sunny wi-fw\"></i></span>\n" +
    "          </p>\n" +
    "        </h4>\n" +
    "\n" +
    "        <p class=\"list-group-item-text \" style=\"font-size: .8em;\">{{device.age | ageHumanReadable}}</p>\n" +
    "      </li>\n" +
    "      -->\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div ng-show=\"controls\" style=\"overflow-x: scroll; overflow-y: hidden; height: 18em; white-space : nowrap;\">\n" +
    "    <div style=\"display: inline-block; margin: 1em; padding: .5em; border: 1px solid #444; border-radius: .25em;\" ng-repeat=\"device in devices\" ng-show=\"has_capability(device, 'light') || has_capability(device, 'shade')\">\n" +
    "        <button class=\"btn btn-default btn-xs pull-right\" ng-hide=\"device.$error || device.$loading\"  ng-click=\"device.$refresh(true)\"><i class=\"icon-refresh\"></i></button>\n" +
    "        <button class=\"btn btn-danger btn-xs pull-right\" ng-show=\"device.$error\" ng-click=\"device.$refresh(true)\"><i class=\"icon-erroralt\"></i></button>\n" +
    "        <button class=\"btn btn-default btn-xs pull-right\" ng-show=\"device.$loading\"><i class=\"icon-circleselection spin\"></i></button>\n" +
    "        <span style=\"margin-top: 5em; margin-right: -1em;\" class=\"pull-right\">{{device._level}}</span>\n" +
    "\n" +
    "        <div style=\"display: inline-block; writing-mode: vertical-rl; width: 1em;\">\n" +
    "          <small>{{device.name}}</small>\n" +
    "        </div>\n" +
    "        <div style=\"display: inline-block; width: 3em;\">\n" +
    "          <div style=\"height: 14em;\">\n" +
    "            <rzslider rz-slider-model=\"device._level\" rz-slider-options=\"{floor: 0, ceil: 100, step: 1, vertical: true, hideLimitLabels: true, hidePointerLabels: true, onEnd: set_device_level(device), disabled: device.$loading }\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"ok()\">Close</button>\n" +
    "    <button class=\"btn btn-default btn-sm pull-left\" type=\"button\" ng-click=\"edit()\" ng-hide=\"source\"><i class=\"icon-edit\"></i></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/scenes/views/add.action.html',
    "<div class=\"modal-header\">\n" +
    "<h3 ng-hide=\"device\">Add Action</h3>\n" +
    "<h3 ng-show=\"device\">{{device.name}}</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"trigger\">Type <span ng-show=\"type\">({{selected.object_type | capitalize}})</span></label>\n" +
    "        <div>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in action_types\" ng-click=\"changeType(t);\" ng-class=\"{'list-group-item-success': selected.object_type == t.value}\">\n" +
    "            <i class=\"{{t.icon}}\"></i> {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-6\"  ng-show=\"selected.object_type == 'devices'\">\n" +
    "        <label for=\"trigger\">Device <span ng-show=\"obj\">({{obj | capitalize}})</span></label>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in devices | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': selected.object_id == t._id}\">\n" +
    "            {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-6\" ng-show=\"selected.object_type == 'rooms'\">\n" +
    "        <label for=\"trigger\">Room <span ng-show=\"obj\">({{obj | capitalize}})</span></label>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in rooms | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': selected.object_id == t._id}\">\n" +
    "            {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-6\" ng-show=\"selected.object_type == 'scenes'\">\n" +
    "        <label for=\"trigger\">Scene <span ng-show=\"obj\">({{obj | capitalize}})</span></label>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in scenes | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': selected.object_id == t._id}\">\n" +
    "            {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"selected.object_id\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\" ng-hide=\"controls.length == 0\">\n" +
    "        <label for=\"enabled\">Setting: </label>\n" +
    "        <div ng-repeat=\"control in controls\" ng-include=\"control.view\" class=\"row\" > </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-4\">\n" +
    "        <label>Stages: </label>\n" +
    "        <div style=\"width: 1em;\">\n" +
    "          <div><i class=\"icon-chevron-up\" style=\"cursor: pointer;\" ng-click=\"stages_up()\"></i></div>\n" +
    "          <div style=\"text-align: center;\">{{selected.stages}}</div>\n" +
    "          <div><i class=\"icon-chevron-down\" style=\"cursor: pointer;\" ng-click=\"stages_down()\"></i></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-sm-8\">\n" +
    "\n" +
    "          <label for=\"enabled\">Duration (hh:mm:ss) </label>\n" +
    "          <epochduration time=\"selected.duration\"></epochduration>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"add()\" ng-show=\"device\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/scenes/views/assign.html',
    "<div class=\"modal-header\"><h3>Assign Room</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "    </div>\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Rooms</div>\n" +
    "  <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li style=\"cursor: pointer; \" class=\"list-group-item\" ng-repeat=\"room in rooms | filter: search | orderBy: '+name'\" ng-click=\"select(room)\" ng-show=\"assigned.indexOf(room.name) == -1\">{{room.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/scenes/views/edit.action.html',
    "<div class=\"modal-header\">\n" +
    "<h3>{{device.name}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\" ng-hide=\"controls.length == 0\">\n" +
    "        <label for=\"enabled\">Setting: </label>\n" +
    "        <div ng-repeat=\"control in controls\" ng-include=\"control.view\" class=\"row\" > </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-2 col-sm-offset-2\">\n" +
    "        <label>Stages: </label>\n" +
    "        <div style=\"width: 1em;\">\n" +
    "          <div><i class=\"icon-chevron-up\" style=\"cursor: pointer;\" ng-click=\"stages_up()\"></i></div>\n" +
    "          <div style=\"text-align: center;\">{{selected.stages}}</div>\n" +
    "          <div><i class=\"icon-chevron-down\" style=\"cursor: pointer;\" ng-click=\"stages_down()\"></i></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-8\">\n" +
    "\n" +
    "          <label for=\"enabled\">Duration (hh:mm:ss) </label>\n" +
    "          <epochduration time=\"selected.duration\"></epochduration>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"save()\" ng-show=\"device\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/scenes/views/scene.builder.devices.html',
    "<div class=\"modal-header\"><h3>Add Device</h3></div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "      <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "    </div>\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Loading Devices</div>\n" +
    "  <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li style=\"cursor: pointer; \" class=\"list-group-item\" ng-repeat=\"device in devices | filter: {capabilities: 'light'} | filter: {capabilities: 'dimmer'} | filter: search | orderBy: '+name'\" ng-click=\"select(device)\">{{device.name}}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\" ng-disabled=\"closing\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/scenes/views/scene.builder.html',
    "<div class=\"modal-body\">\n" +
    "<h3 ng-hide=\"device\">Scene Builder\n" +
    "    <button class=\"btn btn-xs btn-success pull-right\"><i class=\"icon-circleadd\"></i></button></h3>\n" +
    "  <div ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Loading</div>\n" +
    "  <div ng-hide=\"loading\" style=\"overflow-x: scroll; overflow-y: hidden; height: 19em; white-space : nowrap;\">\n" +
    "    <div style=\"display: inline-block; margin: 1em; padding: .5em; height: 16em;  border: 1px solid #444; border-radius: .25em;\" ng-repeat=\"device in devices | filter: {capabilities: 'light'}\">\n" +
    "        <button class=\"btn btn-default btn-xs pull-right\" ng-hide=\"device.$error || device.$loading\"  ng-click=\"device.$refresh(true)\"><i class=\"icon-refresh\"></i></button>\n" +
    "        <button class=\"btn btn-danger btn-xs pull-right\" ng-show=\"device.$error\" ng-click=\"device.$refresh(true)\"><i class=\"icon-erroralt\"></i></button>\n" +
    "        <button class=\"btn btn-default btn-xs pull-right\" ng-show=\"device.$loading\"><i class=\"icon-circleselection spin\"></i></button>\n" +
    "        <span style=\"margin-top: 5em; margin-right: -1em;\" class=\"pull-right\">{{device._level}}</span>\n" +
    "\n" +
    "        <div style=\"display: inline-block; writing-mode: vertical-rl; width: 1em;\">\n" +
    "          <small>{{device.name}}</small>\n" +
    "        </div>\n" +
    "        <div style=\"display: inline-block; width: 3em;\">\n" +
    "          <div style=\"height: 14em;\">\n" +
    "            <rzslider rz-slider-model=\"device._level\" rz-slider-options=\"{floor: 0, ceil: 100, step: 1, vertical: true, hideLimitLabels: true, hidePointerLabels: true, onEnd: set_device_level(device), disabled: device.$loading }\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div style=\"display: inline-block; margin: 1em; padding: .5em; height: 14em; width: 6em; border: 1px solid #444; border-radius: .25em; text-align: center\" ng-show=\"devices.length == 0\">\n" +
    "    	<button class=\"btn btn-sm btn-success \" style=\"margin-top: 7em;\" ng-click=\"addDevice()\"><i class=\"icon-circleadd\"></i></button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"close()\">Done</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/scenes/views/scenes.add.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Add Scene\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"addScene\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"scene.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Icon</label>\n" +
    "                <icon-selector value=\"scene.icon\" />\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Tags</label>\n" +
    "                <tags tag-model=\"scene.tags\" />\n" +
    "              </div>\n" +
    "\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addScene.$invalid\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/scenes/views/scenes.edit.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Edit Scene\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-8 col-md-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-sm-3\" style=\"position: relative\">\n" +
    "                <ul class=\"section-nav\">\n" +
    "                  <li ng-click=\"section='general'\" ng-class=\"{active: section == 'general'}\">General</li>\n" +
    "                  <li ng-click=\"section='steps'\" ng-class=\"{active: section == 'steps'}\">Steps</li>\n" +
    "                  <li ng-click=\"section='rooms'\" ng-class=\"{active: section == 'rooms'}\">Rooms</li>\n" +
    "                  <!-- <li ng-click=\"section='triggers'\" ng-class=\"{active: section == 'triggers'}\">Triggers</li> -->\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-9 col-xs-12\">\n" +
    "\n" +
    "                <form name=\"saveScene\">\n" +
    "                  <div ng-show=\"section=='general'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Name</label>\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"scene.name\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"enabled\">Repeat: </label>\n" +
    "                      <toggle value=\"scene.repeat\" class=\"pull-right\"></toggle>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"enabled\">Enable On/Off: </label>\n" +
    "                      <toggle value=\"scene.onoff\" class=\"pull-right\"></toggle>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-show=\"scene.repeat\">\n" +
    "                      <label for=\"enabled\">Repeat Delay (hh:mm:ss) </label>\n" +
    "                      <epochduration time=\"scene.repeat_delay\" ></epochduration>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Icon</label>\n" +
    "                      <icon-selector value=\"scene.icon\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Tags</label>\n" +
    "                      <tags tag-model=\"scene.tags\" />\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"saveScene.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='steps'\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Steps </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addStep()\"><i class=\"icon-plus-sign\"></i> Add Step</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"step in scene._steps\">\n" +
    "                          <div class=\"row\">\n" +
    "                            <div class=\"col-xs-2\" style=\"text-align: center\">\n" +
    "                              <div><button class=\"btn btn-sm btn-default\"><i class=\"icon-arrow-up\"></i></button></div>\n" +
    "                              <div >{{$index + 1}}</div>\n" +
    "                              <div><button class=\"btn btn-sm btn-default\"><i class=\"icon-arrow-down\"></i></button></div>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-xs-9\">\n" +
    "                              <div class=\"row\">\n" +
    "                                <div class=\"col-md-5\">\n" +
    "                                  <div class=\"form-group\">\n" +
    "                                    <label for=\"enabled\">Step Delay: </label>\n" +
    "                                    <epochduration time=\"step.delay\"></epochduration>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"col-md-7\">\n" +
    "                                  <div class=\"form-group\">\n" +
    "                                    <label for=\"enabled\">Actions: </label>\n" +
    "                                    <button class=\"btn btn-info btn-xs pull-right\" ng-click=\"addAction(step)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                                    <button class=\"btn btn-default btn-xs pull-right\" style=\"margin-right: 1em;\"  ng-click=\"sceneBuilder(step.actions)\"><i class=\"icon-controlpanel\"></i></button>\n" +
    "\n" +
    "                                    <ul class=\"list-group\">\n" +
    "                                      <li class=\"list-group-item\" ng-repeat=\"action in step.actions\" style=\"cursor: pointer\" ng-click=\"editAction(action)\">\n" +
    "                                        {{action.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeDevice(step, $index)\"><i class=\"icon-remove-sign\"></i></button>\n" +
    "                                        <div style=\"font-size: .70em;\">\n" +
    "                                          <span ng-show=\"!action._level && action._on\">Turn ON</span>\n" +
    "                                          <span ng-show=\"action.locked === true\">Lock</span>\n" +
    "                                          <span ng-show=\"action.locked === false\">Unlock</span>\n" +
    "                                          <span ng-show=\"action._level > 0\">Turn ON to {{action._level}}% brightness</span>\n" +
    "                                          <span ng-show=\"action._mode == 'COOL'\">Turn on COOL to {{action._set_point}}&deg;</span>\n" +
    "                                          <span ng-show=\"action._mode == 'HEAT'\">Turn on HEAT to {{action._set_point}}&deg;</span>\n" +
    "                                          <span ng-show=\"action._mode == 'OFF'\">Turn OFF</span>\n" +
    "                                          <span ng-show=\"action._on == false\">Turn OFF</span>\n" +
    "                                          <span ng-show=\"action.duration > 0\"> over {{action.duration | ageHumanReadable}} and {{action.stages}} stages</span>\n" +
    "                                          <span ng-show=\"action.duration == 0\"> immediately</span>\n" +
    "                                        </div>\n" +
    "                                      </li>\n" +
    "                                    </ul>\n" +
    "                                  </div>\n" +
    "\n" +
    "                                  <div class=\"form-group\">\n" +
    "                                    <label for=\"enabled\">Wait for Actions: </label>\n" +
    "                                    <toggle value=\"step.wait\" class=\"pull-right\"></toggle>\n" +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-xs-1\">\n" +
    "                              <button class=\"pull-right btn btn-default btn-sm\" ng-click=\"removeStep($index)\"><i class=\"icon-trash\"></i></button>\n" +
    "                            </div>\n" +
    "                          </div>\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"saveScene.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='rooms'\">\n" +
    "\n" +
    "                    <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Rooms</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Rooms </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addRoom()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"room in rooms\">{{room.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeRoom(room._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='triggers'\">\n" +
    "\n" +
    "                    <div ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading Triggers</div>\n" +
    "                    <div class=\"form-group\" ng-hide=\"loading\">\n" +
    "                      <label for=\"name\">Triggers </label>\n" +
    "                      <button class=\"btn btn-success btn-xs pull-right\" ng-click=\"addToTrigger()\"><i class=\"icon-plus-sign\"></i> Assign</button>\n" +
    "                      <ul class=\"list-group\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"trigger in triggers\">{{trigger.name}} <button class=\"pull-right btn btn-default btn-xs\" ng-click=\"removeFromTrigger(room._id)\"><i class=\"icon-remove-sign\"></i> Unassign</button></li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/scenes/views/scenes.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/scenes/views/scenes.list.html',
    "\n" +
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 7em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Scenes</h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <p>\n" +
    "          <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "            <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "          </div>\n" +
    "        </p>\n" +
    "        <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "        <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"view(scene)\" ng-repeat=\"scene in scenes | filter: search | orderBy: '+name'\">\n" +
    "            <i class=\"{{scene.icon}}\" ng-show=\"scene.icon\"></i>\n" +
    "            {{scene.name}} <div class=\"pull-right\" style=\"margin-left: .5em; margin-top: -.25em\"> <button class=\"btn btn-xs btn-default\" ng-click=\"edit(scene)\" stop-event><i class=\"icon-edit\"></i></button></div> <span class=\"badge\">{{scene._steps.length}} <i class=\"icon-list-alt\"></i></span> <span class=\"badge\">{{scene._rooms.length}} <i class=\"glyphicon glyphicon-modal-window\"></i></span>\n" +
    "            <div style=\"font-size: .7em\" class=\"text-muted\" ng-show=\"scene.tags.length > 0\"><i class=\"icon-tags\"></i>\n" +
    "              <span ng-repeat=\"tag in scene.tags\" style=\"margin-right: 1em;\">{{tag}}</span>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"main.scenes.add\"><i class=\"icon-plus\"></i></button>\n"
  );


  $templateCache.put('modules/scenes/views/scenes.view.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">{{name}}\n" +
    "\n" +
    "      <button class=\"btn btn-primary btn-sm pull-right\" ng-hide=\"errors || processing\" ng-click=\"reload()\"><i class=\"icon-refresh\"></i></button>\n" +
    "      <button class=\"btn btn-danger btn-sm pull-right\" ng-show=\"errors\" ng-click=\"reload()\"><i class=\"icon-erroralt\"></i></button>\n" +
    "      <button class=\"btn btn-default btn-sm pull-right\" ng-show=\"processing\"><i class=\"icon-loadingalt spin\"></i></button>\n" +
    "    </h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "<div style=\"text-align: center;\">\n" +
    "  <div style=\"border: .1em solid white; border-radius: .4em; height: 6em; width: 14em; text-align: center; vertical-align: middle; margin: 0 auto; position: relative; cursor: pointer; padding-top: 1em; transition: 2s;\" ng-class=\"{'bg-success':  scene._state == 'active', 'bg-warning':  scene._state == 'pending'}\" ng-click=\"toggle_onoff()\">\n" +
    "    <div style=\"text-align: center;\">\n" +
    "      <h2>{{scene._state | capitalize}}</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"ok()\">Close</button>\n" +
    "    <button class=\"btn btn-default btn-sm pull-left\" type=\"button\" ng-click=\"edit()\"><i class=\"icon-edit\"></i></button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.advanced.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Advanced\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"settings\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">CA Cert</label>\n" +
    "                <textarea class=\"form-control\" ng-model=\"config.ca_cert\" style=\"font-family: Courier; height: 10em;\"></textarea>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <button class=\"btn btn-success btn-sm\" ng-click=\"save()\">Save</button>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Restart</label>\n" +
    "                <button type=\"submit\" class=\"pull-right btn btn-sm btn-warning\" ng-click=\"restart()\" style=\"width: 10em;\"><i class=\"icon-restart\"></i> Restart</button>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Shutdown</label>\n" +
    "                <button type=\"submit\" class=\"pull-right btn btn-sm btn-danger\" ng-click=\"shutdown()\" style=\"width: 10em;\"><i class=\"icon-shutdown\"></i> Shutdown</button>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Save Config</label>\n" +
    "                <button type=\"submit\" class=\"pull-right btn btn-sm btn-danger\" ng-click=\"write_config()\" style=\"width: 10em;\"><i class=\"icon-save-floppy\"></i> Save Config</button>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.client.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Client\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <form name=\"settings\">\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Client Name: </label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"device.name\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Default Interface: </label>\n" +
    "                <select class=\"form-control\" ng-model=\"device.config.interface\" ng-options=\"iface._id as iface.name for iface in interfaces | orderBy:'name'\"></select>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Push Notifications: </label>\n" +
    "                <button class=\"btn btn-sm btn-info pull-right\" ng-click=\"subscribe()\" ng-hide=\"device.config.push_notifications\">Enable</button>\n" +
    "                <button class=\"btn btn-sm btn-danger pull-right\" ng-click=\"unsubscribe()\" ng-show=\"device.config.push_notifications\">Disable</button>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Show events in Browser: </label>\n" +
    "                <toggle value=\"device.config.show_events\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\" ng-show=\"device.config.show_events\">\n" +
    "                <label for=\"enabled\">Auto Hide Events (m): </label>\n" +
    "                <rzslider rz-slider-model=\"device.config.events_auto_hide\" rz-slider-options=\"{floor: 0, ceil: 60, step: 1, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Dim Display: </label>\n" +
    "                <toggle value=\"device.config.dim_display\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\" ng-show=\"device.config.dim_display\">\n" +
    "                <label for=\"enabled\">Dim After: </label>\n" +
    "                <rzslider rz-slider-model=\"device.config.dim_after\" rz-slider-options=\"{floor: 0, ceil: 120, step: 5, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Night Mode (changes text to red at night): </label>\n" +
    "                <toggle value=\"device.config.night_mode\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Show Date: </label>\n" +
    "                <toggle value=\"device.config.show_date\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Show Weather: </label>\n" +
    "                <toggle value=\"device.config.show_weather\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div ng-show=\"device.provider == 'rad'\">\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label>Minimum Brightness: </label>\n" +
    "                  <rzslider rz-slider-model=\"device.config.display.min_brightness\" rz-slider-options=\"{floor: 0, ceil: 100, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"enabled\">Put Display Sleep: </label>\n" +
    "                  <toggle value=\"device.config.display.sleep\" class=\"pull-right\"></toggle>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\" ng-show=\"device.config.display.sleep\">\n" +
    "                  <label for=\"enabled\">Sleep after (min): </label>\n" +
    "                  <rzslider rz-slider-model=\"device.config.display.wake_timer\" rz-slider-options=\"{floor: 0, ceil: 120, step: 5, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"enabled\">DHT Sensor: </label>\n" +
    "                  <select class=\"form-control\" ng-model=\"device.config.display.dht_sensor\" ng-options=\"sensor as sensor for sensor in dht_sensors\"></select>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\" ng-show=\"device.config.display.dht_sensor\">\n" +
    "                  <label for=\"enabled\">DHT GPIO Pin: </label>\n" +
    "                  <rzslider rz-slider-model=\"device.config.display.dht_pin\" rz-slider-options=\"{floor: 0, ceil: 27, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"enabled\">Light GPIO Pin: </label>\n" +
    "                  <rzslider rz-slider-model=\"device.config.display.light_pin\" rz-slider-options=\"{floor: 0, ceil: 27, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <label for=\"enabled\">Motion GPIO Pin: </label>\n" +
    "                  <rzslider rz-slider-model=\"device.config.display.motion_pin\" rz-slider-options=\"{floor: 0, ceil: 27, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\"></rzslider>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "              </div>\n" +
    "\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.display.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Display\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"settings\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Power</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Backlight</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.general.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / General\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <form name=\"settings\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"config.name\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Location</label>\n" +
    "                <ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\" draggable=\"true\" events=\"map.events\">\n" +
    "                  <ui-gmap-marker ng-repeat=\"marker in map.markers\" coords=\"marker.coords\" idKey=\"marker.id\"></ui-gmap-marker>\n" +
    "                </ui-gmap-google-map>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"web.address\">Web Bind Address:</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"web.address\" placeholder=\"Web Bind Address\" required=\"\" ng-model=\"config.web.address\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"web.port\">Web Port:</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"web.port\" placeholder=\"Web Port\" required=\"\" ng-model=\"config.web.port\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"web.ssl_port\">Web SSL Port:</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"web.ssl_port\" placeholder=\"Web SSL Port\" required=\"\" ng-model=\"config.web.ssl_port\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"web.secureProtocol\">Web Secure Protocol:</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"web.secureProtocol\" placeholder=\"Web Secure Protocol\" required=\"\" ng-model=\"config.web.secureProtocol\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"web.ciphers\">Web Secure Ciphers:</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"web.ciphers\" placeholder=\"Web Secure Ciphers\" required=\"\" ng-model=\"config.web.ciphers\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"web.access_log\">Web Access Log:</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"web.access_log\" placeholder=\"Web Access Log\" required=\"\" ng-model=\"config.web.access_log\">\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Debug: </label>\n" +
    "                <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Web Debug: </label>\n" +
    "                <toggle value=\"config.web.debug\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Devices Debug: </label>\n" +
    "                <toggle value=\"config.devices.debug\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Scenes Debug: </label>\n" +
    "                <toggle value=\"config.scenes.debug\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Rooms Debug: </label>\n" +
    "                <toggle value=\"config.rooms.debug\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Trigger Debug: </label>\n" +
    "                <toggle value=\"config.triggers.debug\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"enabled\">Time Debug: </label>\n" +
    "                <toggle value=\"config.time.debug\" class=\"pull-right\"></toggle>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.interfaces.add.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">=\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Interfaces / Add\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-8 col-md-offset-2\">\n" +
    "\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-body\">\n" +
    "          <form name=\"settings\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Name</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"iface.name\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Icon</label>\n" +
    "              <icon-selector value=\"iface.icon\" />\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Template</label>\n" +
    "              <textarea class=\"form-control\" id=\"template\" placeholder=\"Template\" required=\"\" ng-model=\"iface.template\" style=\"height: 18em;\"></textarea>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.interfaces.edit.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Interfaces / Edit\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-8 col-md-offset-2\">\n" +
    "\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-body\">\n" +
    "          <form name=\"settings\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Name</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"iface.name\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Icon</label>\n" +
    "              <icon-selector value=\"iface.icon\" />\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Template</label>\n" +
    "              <textarea class=\"form-control\" id=\"template\" placeholder=\"Template\" required=\"\" ng-model=\"iface.template\" style=\"height: 18em;\"></textarea>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.interfaces.html',
    "<div class=\"bg-muted\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.interfaces.list.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Interfaces\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-body\">\n" +
    "\n" +
    "                <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                  <li class=\"list-group-item\" style=\"cursor: pointer;\" ui-sref=\"^.edit({'id': iface._id})\" ng-repeat=\"iface in interfaces | orderBy: '+name'\">\n" +
    "                    <i class=\"{{iface.icon}}\"></i> {{iface.name}}</span>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "                <p ng-show=\"interfaces.length == 0\">No Interfaces Found</p>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^.^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"^.add\"><i class=\"icon-plus\"></i></button>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.list.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings</h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "    <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"setting in settings\" ui-sref=\"{{setting.route}}\">\n" +
    "        {{setting.name}}\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.networking.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Networking\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"settings\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Source</label>\n" +
    "                <ul class=\"list-group\">\n" +
    "                  <li class=\"list-group-item\" ><i class=\"glyphicon glyphicon-ban-circle text-muted\"></i> Static</li>\n" +
    "                  <li class=\"list-group-item\" ><i class=\"glyphicon glyphicon-ok-circle text-success\"></i> DHCP </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">IP</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Mask</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Gateway</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">DNS 1</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">DNS 2</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"room.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"settings.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.pins.add.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Settings / Pins / Add\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"addPin\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"pin.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">PIN</label>\n" +
    "                <div style=\"text-align: center\">\n" +
    "                  <pin-entry pin-model=\"pin.pin\"></pin-entry>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"actions\">Unlock Actions</label>\n" +
    "                <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(pin.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                <div class=\"well well-sm\" ng-show=\"pin.actions.length === 0\">No Actions Added</div>\n" +
    "                <div>\n" +
    "                  <ul class=\"list-group bg-muted select-list\" ng-show=\"pin.actions.length > 0\">\n" +
    "                    <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in pin.actions\" ng-click=\"editAction(action)\">\n" +
    "                    {{action.name}}\n" +
    "                    <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(pin.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Icon</label>\n" +
    "                <icon-selector value=\"pin.icon\" />\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Tags</label>\n" +
    "                <tags tag-model=\"pin.tags\" />\n" +
    "              </div>\n" +
    "\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addPin.$invalid\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/settings/views/settings.pins.edit.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Settings / Pins /Edit\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"pinFrm\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"pin.name\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">PIN</label>\n" +
    "                <div style=\"text-align: center\">\n" +
    "                  <pin-entry pin-model=\"pin.pin\"></pin-entry>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"actions\">Unlock Actions</label>\n" +
    "                <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(pin.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                <div class=\"well well-sm\" ng-show=\"pin.actions.length === 0\">No Actions Added</div>\n" +
    "                <div>\n" +
    "                  <ul class=\"list-group bg-muted select-list\" ng-show=\"pin.actions.length > 0\">\n" +
    "                    <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in pin.actions\" ng-click=\"editAction(action)\">\n" +
    "                    {{action.name}}\n" +
    "                    <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(pin.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Icon</label>\n" +
    "                <icon-selector value=\"pin.icon\" />\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"name\">Tags</label>\n" +
    "                <tags tag-model=\"pin.tags\" />\n" +
    "              </div>\n" +
    "\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"pinFrm.$invalid\"><i class=\"icon-save-floppy\"></i> Save</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-sm btn-danger\" ng-click=\"delete()\"><i class=\"icon-trash\"></i> Delete</button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/settings/views/settings.pins.html',
    "<div class=\"bg-muted\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.pins.list.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Pins\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-body\">\n" +
    "\n" +
    "                <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                  <li class=\"list-group-item\" style=\"cursor: pointer;\" ui-sref=\"^.edit({'id': pin._id})\" ng-repeat=\"pin in pins | orderBy: '+name'\">\n" +
    "                    <i class=\"{{pin.icon}}\"></i> {{pin.name}}</span>\n" +
    "                    <div style=\"font-size: .7em\" class=\"text-muted\" ng-show=\"pin.tags.length > 0\"><i class=\"icon-tags\"></i>\n" +
    "                      <span ng-repeat=\"tag in pin.tags\" style=\"margin-right: 1em;\">{{tag}}</span>\n" +
    "                    </div>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "                <p ng-show=\"pins.length == 0\">No Pins Found</p>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^.^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"^.add\"><i class=\"icon-plus\"></i></button>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.providers.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Providers\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"settings\">\n" +
    "              <h3 ng-show=\"loading\">\n" +
    "                <i class=\"icon-circleselection spin\"></i> Loading Providers\n" +
    "              </h3>\n" +
    "              <h3 ng-show=\"error\">\n" +
    "                <i class=\"icon-erroralt text-danger\"></i> Error Loading Providers\n" +
    "              </h3>\n" +
    "              <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                <li class=\"list-group-item\" ng-class=\"{'text-muted': !provider.installed}\" style=\"cursor: pointer;\" ng-click=\"providerSettings(provider)\" ng-repeat=\"provider in providers | orderBy: ['-installed','-enabled','name']\">\n" +
    "                  <i class=\"icon-check text-success\" ng-show=\"provider.enabled\"></i>\n" +
    "                  <i class=\"icon-checkboxalt\" ng-show=\"!provider.enabled\"></i>\n" +
    "                  {{provider.name}}\n" +
    "                  <button class=\"btn btn-xs btn-danger pull-right\" ng-show=\"provider.installed\" ng-click=\"remove_provider(provider)\" stop-event><i class=\"icon-trash\"></i> Remove</button>\n" +
    "                  <button class=\"btn btn-xs btn-default pull-right\" ng-show=\"!provider.installed\" ng-click=\"install_provider(provider)\" stop-event><i class=\"icon-software\"></i> Install</button>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.providers.install.html',
    "<div class=\"modal-body\">\n" +
    "    <h3>Are you sure you want to install this provider?</h3>\n" +
    "    <h4>{{provider.name}}</h4>\n" +
    "    <div class=\"well\" ng-show=\"error\">\n" +
    "        <i class=\"icon-erroralt text-danger\"></i> {{error.message}}\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-sm btn-warning pull-left\" ng-click=\"cancel()\" ng-disabled=\"loading\">Cancel</button>\n" +
    "    <button class=\"btn btn-sm btn-success\" ng-click=\"install()\" ng-disabled=\"loading\">\n" +
    "        <i class=\"icon-circleselection spin\" ng-show=\"loading\"></i>\n" +
    "        <i class=\"icon-trash\" ng-hide=\"loading\"></i>\n" +
    "        Yes\n" +
    "    </button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.providers.remove.html',
    "<div class=\"modal-body\">\n" +
    "    <h3>Are you sure you want to remove this provider?</h3>\n" +
    "    <h4>{{provider.name}}</h4>\n" +
    "    <div class=\"well\" ng-show=\"error\">\n" +
    "        <i class=\"icon-erroralt text-danger\"></i> {{error.message}}\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-sm btn-warning pull-left\" ng-click=\"cancel()\" ng-disabled=\"loading\">Cancel</button>\n" +
    "    <button class=\"btn btn-sm btn-danger\" ng-click=\"remove()\" ng-disabled=\"loading\">\n" +
    "        <i class=\"icon-circleselection spin\" ng-show=\"loading\"></i>\n" +
    "        <i class=\"icon-software\" ng-hide=\"loading\"></i>\n" +
    "        Yes\n" +
    "    </button>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.sensors.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Sensors\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"settings\">\n" +
    "\n" +
    "              <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"view(room)\" ng-repeat=\"sensor in sensors | orderBy: '+name'\">\n" +
    "                  {{sensor.name}} <span class=\"badge\"><i class=\"glyphicon glyphicon-ok text-success\"></i></span>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "              </div>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.sources.add.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Sources / Add\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-body\">\n" +
    "          <form name=\"settings\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Name</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"source.name\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">URL</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"url\" placeholder=\"URL\" required=\"\" ng-model=\"source.url\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.sources.edit.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Sources / Edit\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-body\">\n" +
    "          <form name=\"settings\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">Name</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"source.name\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"name\">URL</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"url\" placeholder=\"URL\" required=\"\" ng-model=\"source.url\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.sources.html',
    "<div class=\"bg-muted\"  ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.sources.list.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Sources\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-body\">\n" +
    "              <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "              <form name=\"settings\">\n" +
    "\n" +
    "                <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                  <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"view(source)\" ng-repeat=\"source in sources | orderBy: '+name'\">\n" +
    "                    {{source.name}}</span>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"main.settings.sources.add\"><i class=\"icon-plus\"></i></button>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/settings/views/settings.users.add.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Settings / Users / Add\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"userFrm\">\n" +
    "              <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.name.$valid && userFrm.name.$dirty, 'has-error': userFrm.name.$invalid && userFrm.name.$dirty}\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"name\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"user.name\">\n" +
    "                <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.name.$valid && userFrm.name.$dirty\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.name.$invalid && userFrm.name.$dirty\"></span>\n" +
    "                <span class=\"help-block text-danger\" ng-show=\"field_errors.name\">{{field_errors.name}}</span>\n" +
    "              </div>\n" +
    "              <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.user.$valid && userFrm.user.$dirty, 'has-error': userFrm.user.$invalid && userFrm.user.$dirty}\">\n" +
    "                <label for=\"user\">User</label>\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"user\" id=\"user\" placeholder=\"User\" required=\"\" ng-model=\"user.user\">\n" +
    "                <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.user.$valid && userFrm.user.$dirty\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.user.$invalid && userFrm.user.$dirty\"></span>\n" +
    "                <span class=\"help-block text-danger\" ng-show=\"field_errors.user\">{{field_errors.user}}</span>\n" +
    "              </div>\n" +
    "              <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.email.$valid && userFrm.email.$dirty, 'has-error': userFrm.email.$invalid && userFrm.email.$dirty}\">\n" +
    "                <label for=\"email\">Email</label>\n" +
    "                <input type=\"email\" class=\"form-control\" name=\"email\" id=\"email\" placeholder=\"Email\" required=\"\" ng-model=\"user.email\">\n" +
    "                <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.email.$valid && userFrm.email.$dirty\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.email.$invalid && userFrm.email.$dirty\"></span>\n" +
    "                <span class=\"help-block text-danger\" ng-show=\"field_errors.email\">{{field_errors.email}}</span>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"well\">\n" +
    "                  <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.newpassword.$valid && userFrm.newpassword.$dirty, 'has-error': userFrm.newpassword.$invalid && userFrm.newpassword.$dirty}\">\n" +
    "                  <label for=\"newpassword\">Password</label>\n" +
    "                  <input type=\"password\" name=\"newpassword\" class=\"form-control\" ng-model=\"user.password\" matches=\"userFrm.newpassword2.$viewValue\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.newpassword.$valid && userFrm.newpassword.$dirty\"></span>\n" +
    "                  <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.newpassword.$invalid && userFrm.newpassword.$dirty\"></span>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.newpassword2.$valid && userFrm.newpassword2.$dirty, 'has-error': userFrm.newpassword2.$invalid && userFrm.newpassword2.$dirty}\">\n" +
    "                  <input type=\"password\" name=\"newpassword2\" class=\"form-control\" ng-model=\"user.newpassword2\" matches=\"userFrm.newpassword.$viewValue\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.newpassword2.$valid && userFrm.newpassword2.$dirty\"></span>\n" +
    "                  <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.newpassword2.$invalid && userFrm.newpassword2.$dirty\"></span>\n" +
    "                  </div>\n" +
    "                  <span class=\"help-block\" ng-class=\"{'text-danger': userFrm.$error.matches}\" ng-show=\"userFrm.$error.matches\">Passwords must match</span>\n" +
    "                  <span class=\"help-block text-danger\" ng-show=\"field_errors.password\">{{field_errors.password}}</span>\n" +
    "              </div>\n" +
    "\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"userFrm.$invalid || working\"><i class=\"icon-circleadd\"></i> Add</button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/settings/views/settings.users.edit.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Settings / Users /Edit\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "            <form name=\"userFrm\">\n" +
    "              <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.name.$valid && userFrm.name.$dirty, 'has-error': userFrm.name.$invalid && userFrm.name.$dirty}\">\n" +
    "                <label for=\"name\">Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"name\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"user.name\">\n" +
    "                <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.name.$valid && userFrm.name.$dirty\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.name.$invalid && userFrm.name.$dirty\"></span>\n" +
    "                <span class=\"help-block text-danger\" ng-show=\"field_errors.name\">{{field_errors.name}}</span>\n" +
    "              </div>\n" +
    "              <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.user.$valid && userFrm.user.$dirty, 'has-error': userFrm.user.$invalid && userFrm.user.$dirty}\">\n" +
    "                <label for=\"user\">User</label>\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"user\" id=\"user\" placeholder=\"User\" required=\"\" ng-model=\"user.user\" readonly>\n" +
    "                <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.user.$valid && userFrm.user.$dirty\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.user.$invalid && userFrm.user.$dirty\"></span>\n" +
    "                <span class=\"help-block text-danger\" ng-show=\"field_errors.user\">{{field_errors.user}}</span>\n" +
    "              </div>\n" +
    "              <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.email.$valid && userFrm.email.$dirty, 'has-error': userFrm.email.$invalid && userFrm.email.$dirty}\">\n" +
    "                <label for=\"email\">Email</label>\n" +
    "                <input type=\"email\" class=\"form-control\" name=\"email\" id=\"email\" placeholder=\"Email\" required=\"\" ng-model=\"user.email\">\n" +
    "                <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.email.$valid && userFrm.email.$dirty\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.email.$invalid && userFrm.email.$dirty\"></span>\n" +
    "                <span class=\"help-block text-danger\" ng-show=\"field_errors.email\">{{field_errors.email}}</span>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\" >\n" +
    "                <label for=\"email\">Tokens</label>\n" +
    "                <button class=\"btn btn-primary btn-xs pull-right\" ng-click=\"load()\"><i class=\"icon-refresh\" ng-class=\"{'spin': loading}\" ng-disabled=\"loading\"></i></button>\n" +
    "                <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                  <li class=\"list-group-item\" ng-repeat=\"token in tokens | orderBy: '-expires'\">\n" +
    "                    <button class=\"btn btn-danger btn-xs pull-right\" ng-click=\"delete_token(token)\" ng-disabled=\"token.client_token == auth.token.client_token\"><i class=\"icon-trash\"></i></button>\n" +
    "                    <div>\n" +
    "                      <i class=\"text-success icon-ok-sign\" ng-show=\"token.client_token == auth.token.client_token\"></i>\n" +
    "                      <i class=\"text-info icon-ok-sign\" ng-show=\"token.status == 'active' && token.client_token != auth.token.client_token\"></i>\n" +
    "                      <i class=\"text-muted icon-tablet\" ng-show=\"token.status == 'nodevice'\"></i>\n" +
    "                      <i class=\"text-muted icon-picture\" ng-show=\"token.status == 'unassigned'\"></i>\n" +
    "                      <small ng-show=\"token.agent.family\">\n" +
    "                        {{token.agent.family}}<span ng-show=\"token.agent.os.family\"> on {{token.agent.os.family}}</span>\n" +
    "                        <button uib-popover=\"{{token.agent.source}}\" popover-trigger=\"'outsideClick click'\" type=\"button\" class=\"btn btn-link btn-xs \"><span class=\"glyphicon glyphicon-question-sign\"></span></button>\n" +
    "                      </small>\n" +
    "                      <small ng-show=\"!token.agent.family\">{{token.agent.source || token.agent}}</small>\n" +
    "                    </div>\n" +
    "                    <div class=\"pull-right\"></div>\n" +
    "\n" +
    "                    <div style=\"font-size: .8em;\" ng-show=\"token.locale\">{{token.locale.city}}, {{token.locale.region}} {{token.locale.country}} ({{token.ip}})</div>\n" +
    "                    <div style=\"font-size: .8em;\" ng-hide=\"token.locale\">IP: {{token.ip}}</div>\n" +
    "                    <div style=\"font-size: .7em;\" class=\"pull-right\">Expires: {{token.expires | date: 'medium'}}</div>\n" +
    "                    <div style=\"font-size: .7em;\">Used: {{token.last_used | date: 'medium'}}</div>\n" +
    "                  </li>\n" +
    "                  <li class=\"list-group-item\" ng-show=\"tokens.length == 0\">No Tokens Found</li>\n" +
    "                </ul>\n" +
    "\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"well\">\n" +
    "                  <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.newpassword.$valid && userFrm.newpassword.$dirty, 'has-error': userFrm.newpassword.$invalid && userFrm.newpassword.$dirty}\">\n" +
    "                  <label for=\"newpassword\">New Password</label>\n" +
    "                  <input type=\"password\" name=\"newpassword\" class=\"form-control\" ng-model=\"user.password\" matches=\"userFrm.newpassword2.$viewValue\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.newpassword.$valid && userFrm.newpassword.$dirty\"></span>\n" +
    "                  <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.newpassword.$invalid && userFrm.newpassword.$dirty\"></span>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"form-group has-feedback\" ng-class=\"{'has-success': userFrm.newpassword2.$valid && userFrm.newpassword2.$dirty, 'has-error': userFrm.newpassword2.$invalid && userFrm.newpassword2.$dirty}\">\n" +
    "                  <input type=\"password\" name=\"newpassword2\" class=\"form-control\" ng-model=\"user.newpassword2\" matches=\"userFrm.newpassword.$viewValue\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok form-control-feedback\"  ng-show=\"userFrm.newpassword2.$valid && userFrm.newpassword2.$dirty\"></span>\n" +
    "                  <span class=\"glyphicon glyphicon-remove form-control-feedback\" ng-show=\"userFrm.newpassword2.$invalid && userFrm.newpassword2.$dirty\"></span>\n" +
    "                  </div>\n" +
    "                  <span class=\"help-block\" ng-class=\"{'text-danger': userFrm.$error.matches}\" ng-show=\"userFrm.$error.matches\">Passwords must match</span>\n" +
    "                  <span class=\"help-block text-danger\" ng-show=\"field_errors.password\">{{field_errors.password}}</span>\n" +
    "              </div>\n" +
    "\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"userFrm.$invalid || working\"><i class=\"icon-save-floppy\"></i> Save</button>\n" +
    "              <button type=\"submit\" class=\"btn btn-sm btn-danger\" ng-click=\"delete()\" ng-disabled=\"auth.token.user == user.user\"><i class=\"icon-trash\"></i> Delete</button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/settings/views/settings.users.html',
    "<div class=\"bg-muted\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/settings/views/settings.users.list.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "      <h2>Settings / Users\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.^\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-body\">\n" +
    "\n" +
    "                <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                  <li class=\"list-group-item\" style=\"cursor: pointer;\" ui-sref=\"^.edit({'id': user._id})\" ng-repeat=\"user in users | orderBy: '+name'\">\n" +
    "                    {{user.name}}</span>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "                <p ng-show=\"users.length == 0\">No Users Found</p>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"state.go('^.^')\"><i class=\"glyphicon glyphicon-arrow-left\"></i> Cancel</button>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"^.add\"><i class=\"icon-plus\"></i></button>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/triggers/views/conditions.edit.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"conditionFrm\">\n" +
    "    <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "    <div class=\"btn-group\">\n" +
    "      <button class=\"btn\" ng-class=\"{'btn-success': type == 'condition', 'btn-primary': type != 'condition'}\" ng-click=\"changeType('condition')\">Check</button>\n" +
    "      <button class=\"btn\" ng-class=\"{'btn-success': type == 'or', 'btn-primary': type != 'or'}\" ng-click=\"changeType('or')\">OR Group</button>\n" +
    "      <button class=\"btn\" ng-class=\"{'btn-success': type == 'and', 'btn-primary': type != 'and'}\" ng-click=\"changeType('and')\">AND Group</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"type != 'condition'\">\n" +
    "      <div>&nbsp;</div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Description of this Group\" ng-model=\"condition.name\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-if=\"type == 'and'\">\n" +
    "        <h5>When ALL of the match\n" +
    "          <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addCondition(condition.and)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "        </h5>\n" +
    "        <ul class=\"list-group bg-muted select-list\">\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"c in condition.and\" ng-click=\"editCondition(c)\" ng-class=\"{'or-conditions': c.or.length, 'and-conditions': c.and.length}\">\n" +
    "            <i class=\"glyphicon glyphicon-th-large\" ng-class=\"{'text-warning': c.or.length, 'text-success': c.and.length}\" ng-show=\"c.or.length || c.and.length\"></i>\n" +
    "            {{c | conditionReadable}}\n" +
    "            <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeCondition(condition.and, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-if=\"type == 'or'\">\n" +
    "        <h5>When ANY of the match\n" +
    "          <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addCondition(condition.or)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "        </h5>\n" +
    "        <ul class=\"list-group bg-muted select-list\">\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"c in condition.or\" ng-click=\"editCondition(c)\" ng-class=\"{'or-conditions': c.or.length, 'and-conditions': c.and.length}\">\n" +
    "            <i class=\"glyphicon glyphicon-th-large\" ng-class=\"{'text-warning': c.or.length, 'text-success': c.and.length}\" ng-show=\"c.or.length || c.and.length\"></i>\n" +
    "            {{c | conditionReadable}}\n" +
    "            <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeCondition(condition.or, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div ng-show=\"type == 'condition'\">\n" +
    "\n" +
    "      <condition-side side=\"left\" value=\"condition\" rooms=\"rooms\" devices=\"devices\" scenes=\"scenes\"></condition-side>\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "\n" +
    "        <div class=\"col-sm-4\">\n" +
    "            <label for=\"trigger\">Condition<span ng-show=\"builder.item\">: {{condition.condition}}</span></label>\n" +
    "            <ul class=\"list-group bg-muted select-list\" >\n" +
    "              <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in condition_options\" ng-click=\"changeCondition(t);\" ng-class=\"{'list-group-item-success': condition.condition == t.value}\">\n" +
    "                {{t.title}}\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <condition-side side=\"right\" value=\"condition\" rooms=\"rooms\" devices=\"devices\" scenes=\"scenes\"></condition-side>\n" +
    "\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"cancel()\">Close</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"save()\" ng-disabled=\"conditionFrm.$invalid\"><i class=\"icon-edit\"></i> Save</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/triggers/views/conditions.side.html',
    "<div>\n" +
    "  <div class=\"row\" style=\"font-size: 1.5em;\">\n" +
    "    <button class=\"btn btn-link\" ng-click=\"toggle()\">\n" +
    "      <i class=\"icon-plus\" ng-show=\"expanded\"></i>\n" +
    "      <i class=\"icon-minus\" ng-hide=\"expanded\"></i>\n" +
    "    </button>\n" +
    "    <span ng-show=\"!type\">Select a value type:</span>\n" +
    "    <span>{{type}}<span ng-show=\"obj\">.{{obj}}</span><span ng-show=\"key != undefined\">.{{key}}</span></span>\n" +
    "  </div>\n" +
    "  <div class=\"row\" ng-show=\"expanded\">\n" +
    "\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"trigger\">Type <span ng-show=\"type\">({{type | capitalize}})</span></label>\n" +
    "        <div>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in condition_types\" ng-click=\"changeType(t);\" ng-class=\"{'list-group-item-success': type == t.value}\">\n" +
    "            <i class=\"{{t.icon}}\"></i> {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-show=\"type == 'devices'\">\n" +
    "        <label for=\"trigger\">Device <span ng-show=\"obj\">({{obj | capitalize}})</span></label>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in devices | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': obj == t.name}\">\n" +
    "            {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-show=\"type == 'rooms'\">\n" +
    "        <label for=\"trigger\">Room <span ng-show=\"obj\">({{obj | capitalize}})</span></label>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in rooms | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': obj == t.name}\">\n" +
    "            {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-show=\"type == 'scenes'\">\n" +
    "        <label for=\"trigger\">Scene <span ng-show=\"obj\">({{obj | capitalize}})</span></label>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in scenes | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': obj == t.name}\">\n" +
    "            {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-if=\"type == 'boolean'\">\n" +
    "        <label for=\"trigger\">Boolean</label>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"watched.key = true\" ng-class=\"{'list-group-item-success': watched.key}\">True</li>\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"watched.key = false\" ng-class=\"{'list-group-item-success': !watched.key}\">False</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-if=\"type == 'timeofday'\">\n" +
    "        <label for=\"trigger\">Time</label>\n" +
    "        <epochtime time=\"watched.key\" disabled=\"false\"></epochtime>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-if=\"type == 'string'\">\n" +
    "        <label for=\"trigger\">String</label>\n" +
    "        <input type=\"input\" ng-model=\"watched.key\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-if=\"type == 'number'\">\n" +
    "        <label for=\"trigger\">Number</label>\n" +
    "        <input type=\"input\" ng-model=\"watched.key\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-if=\"type == 'age'\">\n" +
    "        <label for=\"age\">Age (dd:hh:mm)</label>\n" +
    "        <epochduration time=\"watched.key\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-sm-4\" ng-if=\"capabilities.length > 0\">\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"trigger\">Key  <span ng-show=\"key\">({{key | capitalize}})</span></label>\n" +
    "        <div>\n" +
    "        <ul class=\"list-group bg-muted select-list\" >\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in condition_keys\" ng-click=\"changeKey(t)\" ng-class=\"{'list-group-item-success': key == t.value}\" ng-show=\"hasCapability(t.capabilities)\">\n" +
    "            {{t.name}}\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/triggers/views/notifications.picker.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Select a Notification</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "  <div class=\"list-group\" ng-hide=\"loading\">\n" +
    "    <button type=\"button\" class=\"list-group-item\" ng-repeat=\"notification in notifications | orderBy: 'name'\" ng-click=\"select(notification)\" ng-hide=\"trigger.notifications.indexOf(notification._id) > -1\">{{notification.name}}</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"close()\">Close</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.action.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"actionFrm\">\n" +
    "            <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-6\">\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"trigger\">Type<span ng-show=\"builder.type\">: {{builder.type}}</span></label>\n" +
    "          <div>\n" +
    "          <ul class=\"list-group bg-muted select-list\" >\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in action_types\" ng-click=\"changeType(t.value);\" ng-class=\"{'list-group-item-success': builder.type == t.value}\">\n" +
    "              <i class=\"{{t.icon}}\"></i> {{t.name}}\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"builder.type == 'devices'\">\n" +
    "          <label for=\"trigger\">Device<span ng-show=\"builder.item\">: {{builder.item.name}}</span></label>\n" +
    "          <ul class=\"list-group bg-muted select-list\" >\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in devices | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': builder.item == t}\">\n" +
    "              {{t.name}}\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"builder.type == 'rooms'\">\n" +
    "          <label for=\"trigger\">Room<span ng-show=\"builder.item\">: {{builder.item.name}}</span></label>\n" +
    "          <ul class=\"list-group bg-muted select-list\" >\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in rooms | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': builder.item == t}\">\n" +
    "              {{t.name}}\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"builder.type == 'scenes'\">\n" +
    "          <label for=\"trigger\">Scene<span ng-show=\"builder.item\">: {{builder.item.name}}</span></label>\n" +
    "          <ul class=\"list-group bg-muted select-list\" >\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in scenes | orderBy: '+name'\" ng-click=\"changeItem(t);\" ng-class=\"{'list-group-item-success': builder.item == t}\">\n" +
    "              {{t.name}}\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\">\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"trigger\">Action<span ng-show=\"builder.action\">: {{builder.action}}</span></label>\n" +
    "          <div>\n" +
    "          <ul class=\"list-group bg-muted select-list\" >\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in type_actions\" ng-click=\"change_action(t)\" ng-show=\"has_capability(t.capabilities)\" ng-class=\"{'list-group-item-success': builder.action == t.value}\">\n" +
    "              {{t.name}}\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('count') != -1\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"name\">Count</label>\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Count\" ng-model=\"builder.count\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('level') != -1\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"name\">Level</label>\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Level\" ng-model=\"builder.level\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('url') != -1\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"name\">URL</label>\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"URL\" ng-model=\"builder.url\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('duration') != -1\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"name\">Duration</label>\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Duration (seconds)\" ng-model=\"builder.duration\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('temperature') != -1\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"name\">Temperature</label>\n" +
    "          <input type=\"number\" class=\"form-control\" id=\"name\" placeholder=\"Temperature\" ng-model=\"builder.temperature\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-6\" ng-show=\"type_args.indexOf('mode') != -1\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <label for=\"name\">Mode</label>\n" +
    "          <ul class=\"list-group bg-muted select-list\" >\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"builder.mode = 'COOL'\" ng-class=\"{'list-group-item-success': builder.mode == 'COOL'}\">\n" +
    "              <i class=\"icon-snow\"></i> COOL\n" +
    "            </li>\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"builder.mode = 'HEAT'\" ng-class=\"{'list-group-item-success': builder.mode == 'HEAT'}\">\n" +
    "              <i class=\"icon-fire\"></i> HEAT\n" +
    "            </li>\n" +
    "            <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"builder.mode = 'OFF'\" ng-class=\"{'list-group-item-success': builder.mode == 'OFF'}\">\n" +
    "              <i class=\"glyphicon glyphicon-off\"></i> OFF\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <input type=\"hidden\" required=\"\" ng-model=\"builder.type\">\n" +
    "  <input type=\"hidden\" required=\"\" ng-model=\"builder.action\">\n" +
    "\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"cancel()\">Close</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"save()\" ng-disabled=\"actionFrm.$invalid\"><i class=\"icon-edit\"></i> Save</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.add.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Add Trigger\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-8 col-md-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-sm-3\" style=\"position: relative\">\n" +
    "                <ul class=\"section-nav\">\n" +
    "                  <li ng-click=\"section='general'\" ng-class=\"{active: section == 'general'}\">General</li>\n" +
    "                  <li ng-click=\"section='conditions'\" ng-class=\"{active: section == 'conditions'}\">Conditions</li>\n" +
    "                  <li ng-click=\"section='notifications'\" ng-class=\"{active: section == 'notifications'}\">Notifications</li>\n" +
    "                  <li ng-click=\"section='delay'\" ng-class=\"{active: section == 'delay'}\">Delay</li>\n" +
    "                  <li ng-click=\"section='actions'\" ng-class=\"{active: section == 'actions'}\">Actions</li>\n" +
    "                  <li ng-click=\"section='duration'\" ng-class=\"{active: section == 'duration'}\">Duration</li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-9 col-xs-12\">\n" +
    "\n" +
    "                <form name=\"addTriggerFrm\">\n" +
    "                  <div ng-show=\"section=='general'\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"enabled\">Enabled: </label>\n" +
    "                      <toggle value=\"trigger.enabled\" required class=\"pull-right\"></toggle>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Name</label>\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"trigger.name\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <trigger-matchers ng-model=\"trigger.triggers\" ng-required></trigger-matchers>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Icon</label>\n" +
    "                      <icon-selector value=\"trigger.icon\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Tags</label>\n" +
    "                      <tags tag-model=\"trigger.tags\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='conditions'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Conditions</label>\n" +
    "                      <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"conditions.addCondition(trigger.conditions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "\n" +
    "                      <div class=\"well well-sm\" ng-show=\"trigger.conditions.length === 0\">No Conditions Added</div>\n" +
    "                      <conditions value=\"trigger.conditions\" name=\"conditions\"></conditions>\n" +
    "\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"enabled\">Match All: </label>\n" +
    "                        <toggle value=\"trigger.match_all\" class=\"pull-right\"></toggle>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='notifications'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Notifications</label>\n" +
    "                      <button class=\"btn btn-xs btn-primary pull-right\" ng-click=\"add_notification()\"><i class=\"icon-circleadd\"></i></button>\n" +
    "                      <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "                      <div class=\"well well-sm\" ng-show=\"!notifications || notifications.length == 0\">No notifications added</div>\n" +
    "                      <ul class=\"list-group\" ng-hide=\"loading || notifications.length == 0\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"notification in notifications | orderBy: 'name'\">\n" +
    "                          {{notification.name}}\n" +
    "                          <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"remove_notification(notification)\"><i class=\"icon-circledelete\"></i></button>\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='delay'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Delay (DD:HH:MM)</label>\n" +
    "                      <toggle value=\"delay\" class=\"pull-right\"></toggle>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"delay\">\n" +
    "                        <epochduration time=\"trigger.delay.time\"></epochduration>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"delay\">\n" +
    "                        <toggle value=\"trigger.delay.force\"></toggle>\n" +
    "                        <small>Force Condition Check after Delay</small>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='actions'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Actions</label>\n" +
    "                      <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(trigger.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                      <div class=\"well well-sm\" ng-show=\"trigger.actions.length === 0\">No Actions Added</div>\n" +
    "                      <div>\n" +
    "                        <ul class=\"list-group bg-muted select-list\" ng-show=\"trigger.actions.length > 0\">\n" +
    "                          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in trigger.actions\" ng-click=\"editAction(action)\">\n" +
    "                            {{action.name}}\n" +
    "                            <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(trigger.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='duration'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Duration (DD:HH:MM)</label>\n" +
    "                      <toggle value=\"duration\" class=\"pull-right\"></toggle>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"duration\">\n" +
    "                        <epochduration time=\"trigger.duration.time\"></epochduration>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"duration\">\n" +
    "                        <label for=\"trigger\"><small>Actions</small></label>\n" +
    "                        <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(trigger.duration.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                        <div class=\"well well-sm\" ng-show=\"trigger.duration.actions.length === 0\">No Actions Added</div>\n" +
    "                        <ul class=\"list-group bg-muted select-list\" ng-show=\"trigger.duration.actions.length > 0\">\n" +
    "                          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in trigger.duration.actions\" ng-click=\"editAction(action)\">\n" +
    "                            {{action.name}}\n" +
    "                          <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(trigger.duration.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"duration\">\n" +
    "                        <label for=\"trigger\"><small>Triggers</small></label>\n" +
    "                        <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(trigger.duration.triggers)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                        <div class=\"well well-sm\" ng-show=\"trigger.duration.triggers.length === 0\">No Triggers Added</div>\n" +
    "                        <ul class=\"list-group bg-muted select-list\" ng-show=\"trigger.duration.triggers.length > 0\">\n" +
    "                          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"trigger in trigger.duration.triggers\" ng-click=\"editTrigger(trigger)\">\n" +
    "                            {{trigger.name}}\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"addTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.checker.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Trigger Checker</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"actionFrm\">\n" +
    "\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-12\">\n" +
    "        <h3 ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Checking conditions</h3>\n" +
    "        <div class=\"list-group\" ng-hide=\"loading\">\n" +
    "          <button type=\"button\" class=\"btn btn-default list-group-item\" ng-click=\"isCollapsed = !isCollapsed\">\n" +
    "            <i class=\"icon-ok-sign text-success\" ng-show=\"results.results.matches\"></i>\n" +
    "            <i class=\"icon-remove-sign text-danger\" ng-hide=\"results.results.matches\"></i>\n" +
    "            {{results.results.message}}\n" +
    "          </button>\n" +
    "          <div class=\"list-group-item\" uib-collapse=\"isCollapsed\" ng-show=\"results.results.conditions.length > 0\">\n" +
    "            <div class=\"list-group\" ng-repeat=\"condition in results.results.conditions\">\n" +
    "              <button type=\"button\" class=\"btn btn-default list-group-item\">\n" +
    "                <i class=\"icon-ok-sign text-success\" ng-show=\"condition.value.matches\"></i>\n" +
    "                <i class=\"icon-remove-sign text-danger\" ng-hide=\"condition.value.matches\"></i>\n" +
    "                {{condition.value.message}}\n" +
    "              </button>\n" +
    "              <div class=\"list-group-item\" uib-collapse=\"isCollapsed\" ng-show=\"condition.value.conditions.length > 0\">\n" +
    "                <div class=\"list-group\" ng-repeat=\"condition in condition.value.conditions\">\n" +
    "                  <button type=\"button\" class=\"btn btn-default list-group-item\">\n" +
    "                    <i class=\"icon-ok-sign text-success\" ng-show=\"condition.value.matches\"></i>\n" +
    "                    <i class=\"icon-remove-sign text-danger\" ng-hide=\"condition.value.matches\"></i>\n" +
    "                    {{condition.value.message}}\n" +
    "                  </button>\n" +
    "                  <div class=\"list-group-item\" uib-collapse=\"isCollapsed\" ng-show=\"condition.value.conditions.length > 0\">\n" +
    "                    <div class=\"list-group\" ng-repeat=\"condition in condition.value.conditions\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default list-group-item\">\n" +
    "                        <i class=\"icon-ok-sign text-success\" ng-show=\"condition.value.matches\"></i>\n" +
    "                        <i class=\"icon-remove-sign text-danger\" ng-hide=\"condition.value.matches\"></i>\n" +
    "                        {{condition.value.message}}\n" +
    "                      </button>\n" +
    "                      <div class=\"list-group-item\" uib-collapse=\"isCollapsed\" ng-show=\"condition.value.conditions.length > 0\">\n" +
    "                        {{condition.value.conditions}}\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"close()\">Close</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"check()\" ng-disabled=\"loading\"><i class=\"icon-check\"></i> Check</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.conditions.html',
    "\n" +
    "<ul class=\"list-group bg-muted select-list\" ng-show=\"conditions.length > 0\">\n" +
    "  <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"condition in conditions\" ng-click=\"editCondition(condition)\" ng-class=\"{'or-conditions': condition.or.length, 'and-conditions': condition.and.length}\">\n" +
    "    <i class=\"glyphicon glyphicon-th-large\" ng-class=\"{'text-warning': condition.or.length, 'text-success': condition.and.length}\" ng-show=\"condition.or.length || condition.and.length\"></i>\n" +
    "    {{condition | conditionReadable}}\n" +
    "    <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeCondition($index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "  </li>\n" +
    "</ul>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.edit.html',
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Edit Trigger\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.list\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-8 col-md-offset-2\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-sm-3\" style=\"position: relative\">\n" +
    "                <ul class=\"section-nav\">\n" +
    "                  <li ng-click=\"section='general'\" ng-class=\"{active: section == 'general'}\">General</li>\n" +
    "                  <li ng-click=\"section='conditions'\" ng-class=\"{active: section == 'conditions'}\">Conditions</li>\n" +
    "                  <li ng-click=\"section='notifications'\" ng-class=\"{active: section == 'notifications'}\">Notifications</li>\n" +
    "                  <li ng-click=\"section='delay'\" ng-class=\"{active: section == 'delay'}\">Delay</li>\n" +
    "                  <li ng-click=\"section='actions'\" ng-class=\"{active: section == 'actions'}\">Actions</li>\n" +
    "                  <li ng-click=\"section='duration'\" ng-class=\"{active: section == 'duration'}\">Duration</li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-sm-9 col-xs-12\">\n" +
    "\n" +
    "                <form name=\"editTriggerFrm\">\n" +
    "                  <div ng-show=\"section=='general'\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"enabled\">Enabled: </label>\n" +
    "                      <toggle value=\"trigger.enabled\" class=\"pull-right\"></toggle>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Name</label>\n" +
    "                      <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"trigger.name\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <trigger-matchers ng-model=\"trigger.triggers\" required></trigger-matchers>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-show=\"trigger.trigger\">\n" +
    "                      <label for=\"trigger\">Legacy Trigger<span ng-show=\"trigger.trigger\">: {{trigger.trigger}}</span></label>\n" +
    "\n" +
    "                      <div>\n" +
    "                        {{trigger.trigger}}.{{trigger.match_type}}.{{trigger.match}}\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Icon</label>\n" +
    "                      <icon-selector value=\"trigger.icon\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Tags</label>\n" +
    "                      <tags tag-model=\"trigger.tags\" />\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                      <button class=\"btn btn-info btn-sm pull-left\" type=\"button\" ng-click=\"check()\"><i class=\"icon-check\"></i> Check</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='conditions'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Conditions</label>\n" +
    "                      <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"conditions.addCondition(trigger.conditions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "\n" +
    "                      <div class=\"well well-sm\" ng-show=\"trigger.conditions.length === 0\">No Conditions Added</div>\n" +
    "                      <conditions value=\"trigger.conditions\" name=\"conditions\"></conditions>\n" +
    "\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"enabled\">Match All: </label>\n" +
    "                        <toggle value=\"trigger.match_all\" class=\"pull-right\"></toggle>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                      <button class=\"btn btn-info btn-sm pull-left\" type=\"button\" ng-click=\"check()\"><i class=\"icon-check\"></i> Check</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='notifications'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"name\">Notifications</label>\n" +
    "                      <button class=\"btn btn-xs btn-primary pull-right\" ng-click=\"add_notification()\"><i class=\"icon-circleadd\"></i></button>\n" +
    "                      <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "                      <div class=\"well well-sm\" ng-show=\"!notifications || notifications.length == 0\">No notifications added</div>\n" +
    "                      <ul class=\"list-group\" ng-hide=\"loading || notifications.length == 0\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"notification in notifications | orderBy: 'name'\">\n" +
    "                          {{notification.name}}\n" +
    "                          <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"remove_notification(notification)\"><i class=\"icon-circledelete\"></i></button>\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                      <button class=\"btn btn-info btn-sm pull-left\" type=\"button\" ng-click=\"check()\"><i class=\"icon-check\"></i> Check</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='delay'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Delay (DD:HH:MM)</label>\n" +
    "                      <toggle value=\"delay\" class=\"pull-right\"></toggle>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"delay\">\n" +
    "                        <epochduration time=\"trigger.delay.time\"></epochduration>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"delay\">\n" +
    "                        <toggle value=\"trigger.delay.force\"></toggle>\n" +
    "                        <small>Force Condition Check after Delay</small>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                      <button class=\"btn btn-info btn-sm pull-left\" type=\"button\" ng-click=\"check()\"><i class=\"icon-check\"></i> Check</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='actions'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Actions</label>\n" +
    "                      <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(trigger.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                      <div class=\"well well-sm\" ng-show=\"trigger.actions.length === 0\">No Actions Added</div>\n" +
    "                      <div>\n" +
    "                        <ul class=\"list-group bg-muted select-list\" ng-show=\"trigger.actions.length > 0\">\n" +
    "                          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in trigger.actions\" ng-click=\"editAction(action)\">\n" +
    "                            {{action.name}}\n" +
    "                            <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(trigger.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                      <button class=\"btn btn-info btn-sm pull-left\" type=\"button\" ng-click=\"check()\"><i class=\"icon-check\"></i> Check</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"section=='duration'\">\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Duration (DD:HH:MM)</label>\n" +
    "                      <toggle value=\"duration\" class=\"pull-right\"></toggle>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"duration\">\n" +
    "                        <epochduration time=\"trigger.duration.time\"></epochduration>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"duration\">\n" +
    "                        <label for=\"trigger\"><small>Actions</small></label>\n" +
    "                        <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(trigger.duration.actions)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                        <div class=\"well well-sm\" ng-show=\"trigger.duration.actions.length === 0\">No Actions Added</div>\n" +
    "                        <ul class=\"list-group bg-muted select-list\" ng-show=\"trigger.duration.actions.length > 0\">\n" +
    "                          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"action in trigger.duration.actions\" ng-click=\"editAction(action)\">\n" +
    "                            {{action.name}}\n" +
    "                          <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeAction(trigger.duration.actions, $index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"form-group\" style=\"padding-left: 1em;\" ng-show=\"duration\">\n" +
    "                        <label for=\"trigger\"><small>Triggers</small></label>\n" +
    "                        <button class=\"btn btn-default btn-xs pull-right\" ng-click=\"addAction(trigger.duration.triggers)\"><i class=\"icon-plus-sign\"></i> Add</button>\n" +
    "                        <div class=\"well well-sm\" ng-show=\"trigger.duration.triggers.length === 0\">No Triggers Added</div>\n" +
    "                        <ul class=\"list-group bg-muted select-list\" ng-show=\"trigger.duration.triggers.length > 0\">\n" +
    "                          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"trigger in trigger.duration.triggers\" ng-click=\"editTrigger(trigger)\">\n" +
    "                            {{trigger.name}}\n" +
    "                          </li>\n" +
    "                        </ul>\n" +
    "                      </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTriggerFrm.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "                      <button class=\"btn btn-warning btn-sm pull-left\" type=\"button\" ng-click=\"state.go('^')\">Cancel</button>\n" +
    "                      <button class=\"btn btn-info btn-sm pull-left\" type=\"button\" ng-click=\"check()\"><i class=\"icon-check\"></i> Check</button>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "                </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.list.html',
    "\n" +
    "  <div class=\"container-fluid bg-muted\" style=\"padding-bottom: 7em;\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "        <h2>Triggers</h2>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "        <p>\n" +
    "          <div class=\"input-group\" ng-hide=\"loading\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Search\" ng-model=\"search\" autocomplete='off'>\n" +
    "            <div class=\"input-group-addon\"><i class=\"icon-search\"></i></div>\n" +
    "          </div>\n" +
    "        </p>\n" +
    "        <h4 ng-show=\"loading\"><i class=\"icon-refresh spin\"></i> Loading...</h4>\n" +
    "        <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "          <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"trigger in triggers | filter: search | orderBy: '+name'\" ng-click=\"edit(trigger)\">\n" +
    "            <i class=\"{{trigger.icon}}\" ng-show=\"trigger.icon\"></i>\n" +
    "            {{trigger.name}}<button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"remove(trigger)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "            <div style=\"font-size: .8em;\" class=\"text-muted\" ng-class=\"{'strike-through': !trigger.enabled}\" ng-show=\"trigger.trigger\">\n" +
    "              <span ng-show=\"trigger.match\">{{trigger.match_type | capitalize}} is\n" +
    "                <span ng-show=\"trigger.match_type == 'time'\">{{trigger.match | time}} during </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'date'\">{{trigger.match | date: 'EEE MMM d, yyyy'}} during </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'device'\">{{trigger.match}} from </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'string'\">{{trigger.match}} from </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'number'\">{{trigger.match}} from </span>\n" +
    "              </span>\n" +
    "              {{trigger.trigger}} Event\n" +
    "            </div>\n" +
    "            <ul style=\"font-size: .8em;\" class=\"text-muted\" ng-class=\"{'strike-through': !trigger.enabled}\">\n" +
    "              <li ng-repeat=\"t in trigger.triggers\">\n" +
    "              <span ng-show=\"t.match\">{{t.match_type | capitalize}} is\n" +
    "                <span ng-show=\"t.match_type == 'time'\">{{t.match | time}} during </span>\n" +
    "                <span ng-show=\"t.match_type == 'date'\">{{t.match | date: 'EEE MMM d, yyyy'}} during </span>\n" +
    "                <span ng-show=\"t.match_type == 'device'\">{{t.match}} from </span>\n" +
    "                <span ng-show=\"t.match_type == 'string'\">{{t.match}} from </span>\n" +
    "                <span ng-show=\"t.match_type == 'number'\">{{t.match}} from </span>\n" +
    "              </span>\n" +
    "              {{t.trigger}} Event\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "            <div style=\"font-size: .7em\" class=\"text-muted\" ng-show=\"trigger.tags.length > 0\"><i class=\"icon-tags\"></i>\n" +
    "              <span ng-repeat=\"tag in trigger.tags\" style=\"margin-right: 1em;\">{{tag}}</span>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"main.triggers.add\"><i class=\"icon-plus\"></i></button>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.matchers.html',
    "<div>\n" +
    "    <div class=\"clearfix\">\n" +
    "        <label for=\"trigger\">Triggers </label>\n" +
    "        <button class=\"btn btn-xs btn-success pull-right\" ng-click=\"addTriggerMatcher()\"><i class=\"icon-circleadd\"></i></button>\n" +
    "    </div>\n" +
    "  <ul class=\"list-group bg-muted select-list\">\n" +
    "    <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in ngModel | orderBy: '+trigger'\" ng-click=\"editTriggerMatcher(t)\">\n" +
    "        <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"deleteTriggerMatcher($index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "      {{t.trigger}}\n" +
    "        <div ng-show=\"t.match_type === 'device' || t.match_type === 'room' || t.match_type === 'scene'\">From the {{t.match_type}} {{t.match}}</div>\n" +
    "        <div ng-show=\"t.match_type === 'number' || t.match_type === 'string'\">{{t.match_type | capitalize}} of {{t.match}}</div>\n" +
    "        <div ng-show=\"t.match_type === 'time'\">{{t.match_type | capitalize}} is {{t.match | time}}</div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/triggers/views/triggers.matchers.matcher.html',
    "<div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Trigger Matcher</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"trigger\">Trigger<span ng-show=\"trigger.trigger\">: {{trigger.trigger}}</span></label>\n" +
    "\n" +
    "      <div>\n" +
    "      <ul class=\"list-group bg-muted select-list\">\n" +
    "        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in trigger_types | orderBy: '+name'\" ng-click=\"matcher.trigger = t.name\" ng-class=\"{'list-group-item-success': matcher.trigger == t.name}\">\n" +
    "          {{t.name}}\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"trigger\">Match<span ng-show=\"trigger.match_type\">: {{trigger.match_type}}<span ng-show=\"trigger.match_type == 'device' && trigger.match\">.{{trigger.match}}</span></span></label>\n" +
    "    </div>\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "\n" +
    "          <div class=\"form-group\">\n" +
    "            <ul class=\"list-group bg-muted select-list\" >\n" +
    "              <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in match_types\" ng-click=\"changeType(t.value)\" ng-class=\"{'list-group-item-success': matcher.match_type == t.value}\">\n" +
    "                <i class=\"{{t.icon}}\"></i> {{t.name}}\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-6\">\n" +
    "\n" +
    "          <div class=\"form-group\">\n" +
    "            <div ng-show=\"matcher.match_type == 'device'\">\n" +
    "              <div ng-show=\"devices_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "              <ul class=\"list-group bg-muted select-list\" ng-hide=\"devices_loading\">\n" +
    "                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"device in devices | orderBy: '+name'\" ng-click=\"changeDevice(device)\" ng-class=\"{'list-group-item-success': matcher.match == device.name}\">\n" +
    "                  {{device.name}}\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"matcher.match_type == 'room'\">\n" +
    "              <div ng-show=\"rooms_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "              <ul class=\"list-group bg-muted select-list\" ng-hide=\"rooms_loading\">\n" +
    "                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"room in rooms | orderBy: '+name'\" ng-click=\"changeRoom(room)\" ng-class=\"{'list-group-item-success': matcher.match == room.name}\">\n" +
    "                  {{room.name}}\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"matcher.match_type == 'scene'\">\n" +
    "              <div ng-show=\"scenes_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "              <ul class=\"list-group bg-muted select-list\" ng-hide=\"scenes_loading\">\n" +
    "                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"scene in scenes | orderBy: '+name'\" ng-click=\"changeScene(scene)\" ng-class=\"{'list-group-item-success': matcher.match == scene.name}\">\n" +
    "                  {{scene.name}}\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"matcher.match_type == 'time'\" style=\"padding-left: 1em;\">\n" +
    "              <epochtime time=\"matcher.match\" disabled=\"{{matcher.match_type != 'time'}}\"></epochtime>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"matcher.match_type == 'string'\" style=\"padding-left: 1em;\">\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"match\" placeholder=\"String\" required=\"\" ng-model=\"matcher.match\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"matcher.match_type == 'number'\" style=\"padding-left: 1em;\">\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"match\" placeholder=\"Number\" required=\"\" ng-model=\"matcher.match\">\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button class=\"btn btn-success btn-sm\" type=\"button\" ng-click=\"save()\"><i class=\"icon-save-floppy\"></i> Save</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/video/views/settings.html',
    "\n" +
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Video\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"player\">Player</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"Player\" placeholder=\"Player\" required=\"\" ng-model=\"config.player\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"options\">Options</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"options\" placeholder=\"Options\" required=\"\" ng-model=\"config.options\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Debug: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/weather/views/popover.html',
    "<div style=\"width: 240px;\" class=\"container-fluid\">\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-xs-6\">\n" +
    "				<h1 class=\"text-center\" style=\"font-size: 5em;\"><i class=\"wi {{weather.icon}}\"></i></h1>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-6\">\n" +
    "				<h3>\n" +
    "					{{weather.temperature}}&deg;\n" +
    "				</h3>\n" +
    "				<h5><i class=\"wi wi-thermometer\"></i> {{weather.temp_low}}/{{weather.temp_high}}</h5>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-xs-12\">\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"col-xs-3 text-center\"><i class=\"wi wi-wind-direction\" ng-style=\"wind_degrees\"></i><br/>{{weather.wind}}  </div>\n" +
    "					<div class=\"col-xs-3 text-center\"><i class=\"wi wi-humidity\"></i><br/>{{weather.humidity}}</div>\n" +
    "					<div class=\"col-xs-3 text-center\"><i class=\"wi wi-barometer\"></i><br/><span style=\"white-space: nowrap\">{{weather.pressure}}<i class=\"wi\" ng-class=\"{'wi-direction-up-right': weather.pressure_trend == '+', 'wi-direction-down-right': weather.pressure_trend == '-', 'wi-direction-right': weather.pressure_trend == '='}\"></i></span></div>\n" +
    "					<div class=\"col-xs-3 text-center\"><i class=\"wi wi-umbrella\"></i><br/>{{weather.rain}}</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div>&nbsp;</div>\n" +
    "		<div class=\"row well well-sm text-center\">\n" +
    "			<div class=\"col-xs-12 text-left\"><button class=\"btn btn-xs btn-link\" ng-click=\"show_forecast='daily'\">Daily</button> - <button class=\"btn btn-xs btn-link\" ng-click=\"show_forecast='hourly'\">Hourly</button></div>\n" +
    "			<div class=\"col-xs-4\" ng-show=\"show_forecast=='daily'\">\n" +
    "				<h4><i class=\"wi {{forecast[0].icon}}\"></i></h4>\n" +
    "				<h5>{{forecast[0].temp_low}}/{{forecast[0].temp_high}}</h5>\n" +
    "				<h6><b>{{forecast[0].day}}</b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-4\" ng-show=\"show_forecast=='daily'\">\n" +
    "				<h4><i class=\"wi {{forecast[1].icon}}\"></i></h4>\n" +
    "				<h5>{{forecast[1].temp_low}}/{{forecast[1].temp_high}}</h5>\n" +
    "				<h6><b>{{forecast[1].day}}</b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-4\" ng-show=\"show_forecast=='daily'\">\n" +
    "				<h4><i class=\"wi {{forecast[2].icon}}\"></i></h4>\n" +
    "				<h5>{{forecast[2].temp_low}}/{{forecast[2].temp_high}}</h5>\n" +
    "				<h6><b>{{forecast[2].day}}</b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-1 text-center\" ng-show=\"show_forecast=='hourly'\">\n" +
    "				<h5>&nbsp;</h5>\n" +
    "				<h6><i class=\"wi wi-thermometer\"></i></h6>\n" +
    "				<h6><i class=\"wi wi-umbrella\"></i></h6>\n" +
    "				<h6><i class=\"wi wi-time-1\"></i></b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-2 text-center\" ng-show=\"show_forecast=='hourly'\">\n" +
    "				<h5><i class=\"wi {{hourly[0].icon}}\"></i></h5>\n" +
    "				<h6>{{hourly[0].temp}}</h6>\n" +
    "				<h6>{{hourly[0].rain}}</h6>\n" +
    "				<h6><b>{{hourly[0].hour}}</b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-2 text-center\" ng-show=\"show_forecast=='hourly'\">\n" +
    "				<h5><i class=\"wi {{hourly[1].icon}}\"></i></h5>\n" +
    "				<h6>{{hourly[1].temp}}</h6>\n" +
    "				<h6>{{hourly[1].rain}}</h6>\n" +
    "				<h6><b>{{hourly[1].hour}}</b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-2 text-center\" ng-show=\"show_forecast=='hourly'\">\n" +
    "				<h5><i class=\"wi {{hourly[2].icon}}\"></i></h5>\n" +
    "				<h6>{{hourly[2].temp}}</h6>\n" +
    "				<h6>{{hourly[2].rain}}</h6>\n" +
    "				<h6><b>{{hourly[2].hour}}</b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-2 text-center\" ng-show=\"show_forecast=='hourly'\">\n" +
    "				<h5><i class=\"wi {{hourly[3].icon}}\"></i></h5>\n" +
    "				<h6>{{hourly[3].temp}}</h6>\n" +
    "				<h6>{{hourly[3].rain}}</h6>\n" +
    "				<h6><b>{{hourly[3].hour}}</b></h6>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-2 text-center\" ng-show=\"show_forecast=='hourly'\">\n" +
    "				<h5><i class=\"wi {{hourly[4].icon}}\"></i></h5>\n" +
    "				<h6>{{hourly[4].temp}}</h6>\n" +
    "				<h6>{{hourly[4].rain}}</h6>\n" +
    "				<h6><b>{{hourly[4].hour}}</b></h6>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-xs-12 text-muted\"><small><i ng-class=\"{'spin': loading, 'icon-circleselection': loading, 'text-danger': error, 'icon-erroralt': error, 'icon-ok-circle': !error && !loading}\"></i> {{weather.observation | date: 'short'}}</small></div>\n" +
    "		</div>\n" +
    "</div>"
  );


  $templateCache.put('modules/weather/views/status.html',
    "<div ng-show=\"client.show_weather\">\n" +
    "	<span class=\"pointer\" uib-popover-template=\"'modules/weather/views/popover.html'\" popover-trigger=\"'outsideClick'\" popover-placement=\"bottom-right\">\n" +
    "		{{weather.temperature | number:0}}&deg;\n" +
    "		<i class=\"wi {{weather.icon}}\"></i></span>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/welcome/views/configure.html',
    "<content top=\"0\" bottom=\"0\" left=\"0\" right=\"0\" overflow=\"auto\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1\">\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row well\">\n" +
    "      <div class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-0\">\n" +
    "        <img src=\"images/home.png\"  class=\"img-responsive img-rounded\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-0\">\n" +
    "        <p class=\"text-center\"><strong>Configure your new Abode Server</strong></p>\n" +
    "\n" +
    "        <h3 ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Loading Configuration</h3>\n" +
    "        <form name=\"configureFrm\" ng-hide=\"loading\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"name\">Name</label>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" ng-model=\"config.name\" required ng-disabled=\"saving\">\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"url\">URL</label>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"url\" placeholder=\"URL\" ng-model=\"config.url\" required ng-disabled=\"saving\">\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"url\">Database Server</label>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"url\" placeholder=\"DB Server\" ng-model=\"config.database.server\" required ng-disabled=\"saving\">\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"url\">Database Name</label>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"url\" placeholder=\"DB Name\" ng-model=\"config.database.database\" required ng-disabled=\"saving\">\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"upnp\"><input type=\"checkbox\"  id=\"upnp\" name=\"upnp\" ng-model=\"config.disable_upnp\" ng-disabled=\"saving\"> Disable UPNP</label>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <button class=\"btn btn-success\" ng-disabled=\"configureFrm.$invalid || saving || error\" ng-click=\"setup()\" ng-class=\"{'btn-danger': error}\">\n" +
    "              <span class=\"icon-settingsandroid\" ng-hide=\"saving\"></span>\n" +
    "              <i class=\"icon-circleselection spin\" ng-show=\"saving\"></i>\n" +
    "              Setup\n" +
    "          </button>\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</content>\n" +
    "<div class=\"status-bar\">\n" +
    "  <device-status device=\"device\"></device-status>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/welcome/views/devices.html',
    "<content top=\"0\" bottom=\"0\" left=\"0\" right=\"0\" overflow=\"auto\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1\">\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row well\">\n" +
    "      <div class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-0\">\n" +
    "        <img src=\"images/home.png\"  class=\"img-responsive img-rounded\">\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-0\">\n" +
    "        <div class=\"input-group\">\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"server\" ng-model=\"config.server\" disabled>\n" +
    "          <span class=\"input-group-btn\">\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ng-click=\"reset_server()\">Change</button>\n" +
    "          </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>&nbsp;</div>\n" +
    "\n" +
    "        <p class=\"text-center\"><strong>Select a existing Device</strong></p>\n" +
    "        <div class=\"list-group\">\n" +
    "          <button type=\"button\" class=\"list-group-item\" disabled ng-show=\"loading\"><i class=\"icon-loadingalt spin\"></i> Looking for Devices</button>\n" +
    "          <button type=\"button\" class=\"list-group-item list-group-item-warning\" ng-show=\"devices.length == 0 && !loading && !failed\" ng-click=\"load_devices()\"><i class=\"icon-warning-sign text-warning\"></i> No existing devices found. Create a new one below or click here to retry</button>\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-show=\"failed\" ng-click=\"load_devices()\"><i class=\"icon-warning-sign text-danger\"></i> Unknown error while getting devices.</button>\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-repeat=\"device in devices | orderBy: '+name' | filter:deviceFilter()\" ng-click=\"select(device)\"> {{device.name}}</button>\n" +
    "        </div>\n" +
    "        <p class=\"text-center\"><strong>- or -</strong></p>\n" +
    "        <div class=\"list-group\" ng-show=\"rad.mode\">\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-click=\"add_rad=false\" ng-show=\"add_rad\"><i class=\"icon-ok-sign text-success\"></i> This is an Abode Rad</button>\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-click=\"add_rad=true\" ng-show=\"!add_rad\"><i class=\"icon-circledelete text-danger\"></i> Not adding as an Abode Rad</button>\n" +
    "        </div>\n" +
    "        <form name=\"manualFrm\">\n" +
    "          <div class=\"input-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Create a New Device\" ng-model=\"device.name\">\n" +
    "            <span class=\"input-group-btn\">\n" +
    "              <button class=\"btn btn-default\" type=\"button\" ng-click=\"create()\"><i class=\"icon-plus-sign\"></i> <span class=\"hidden-xs\">Create</span></button>\n" +
    "            </span>\n" +
    "          </div>\n" +
    "\n" +
    "          <p class=\"text-center\"><strong></strong></p>\n" +
    "          <div class=\"list-group\">\n" +
    "            <button ng-repeat=\"item in default_devices\" type=\"button\" class=\"list-group-item\" ng-click=\"device.name=item\">{{item}}</button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</content>\n" +
    "<div class=\"status-bar\">\n" +
    "  <device-status ></device-status>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/welcome/views/index.html',
    "<content top=\"0\" bottom=\"0\" left=\"0\" right=\"0\" overflow=\"auto\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1\">\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row well\">\n" +
    "      <div class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-0\">\n" +
    "        <img src=\"images/home.png\"  class=\"img-responsive img-rounded\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-12  col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-0\" ng-hide=\"checking\">\n" +
    "        <p class=\"text-center\">\n" +
    "          <strong>Connect to an Abode Server</strong>\n" +
    "        </p>\n" +
    "        <div class=\"list-group\">\n" +
    "          <button type=\"button\" class=\"list-group-item list-group-item-danger\" ng-show=\"sources.length == 0 && !loading\" ng-click=\"load()\"><i class=\"icon-exclamation-sign text-danger\"></i> Unable to detect any Abode servers. Specify an address manually below or click here to retry</button>\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-repeat=\"source in sources\" ng-click=\"connect(source)\"><i class=\"icon-home\" ng-hide=\"source.error\"></i><i ng-show=\"source.error\" class=\"icon-erroralt text-danger\"></i> {{source.name}} <span ng-show=\"source.mode == 'device'\">(Setup as New Server)</span></button>\n" +
    "          <button type=\"button\" class=\"list-group-item\" disabled ng-show=\"loading\"><i class=\"icon-circleselection spin \"></i> Searching of servers...</button>\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-show=\"!loading && sources.length > 0\" ng-click=\"load()\"><i class=\"icon-ok-sign text-success\"></i> Found {{sources.length}} Server[s]<div><small>Click to search again.</small></div></button>\n" +
    "        </div>\n" +
    "        <p class=\"text-center\"><strong>- or -</strong></p>\n" +
    "        <form name=\"manualFrm\" ng-submit=\"connect(manual)\">\n" +
    "          <div class=\"input-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Specify Manually\" ng-model=\"manual.url\">\n" +
    "            <span class=\"input-group-btn\">\n" +
    "              <button class=\"btn btn-default\" type=\"button\" ng-click=\"connect(manual)\">Go!</button>\n" +
    "            </span>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-12  col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-0\" ng-show=\"checking\">\n" +
    "        <p class=\"text-center\"><strong>Please wait...</strong></p>\n" +
    "        <div class=\"list-group\">\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-show=\"needs_reboot\" ng-click=\"restart()\"><i class=\"icon-warning-sign text-warning\"></i> Reboot needed to complete certificate installation. Click to Restart</button>\n" +
    "          <button type=\"button\" class=\"list-group-item\" ng-hide=\"needs_reboot\" ><i class=\"icon-circleselection spin\"></i> Checking Connection</button>\n" +
    "          <button type=\"button\" class=\"list-group-item list-group-item-warning\" ng-click=\"cancel_check()\">Cancel</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</content>\n" +
    "<div class=\"status-bar\">\n" +
    "  <device-status device=\"device\"></device-status>\n" +
    "</div>"
  );


  $templateCache.put('modules/welcome/views/interfaces.html',
    "<content top=\"0\" bottom=\"0\" left=\"0\" right=\"0\" overflow=\"auto\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1\">\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row well\">\n" +
    "      <div class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-0\">\n" +
    "        <img src=\"images/home.png\"  class=\"img-responsive img-rounded\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-0\">\n" +
    "        <div class=\"input-group\">\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"server\" ng-model=\"config.server\" disabled>\n" +
    "          <span class=\"input-group-btn\">\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ng-click=\"reset_server()\">Change</button>\n" +
    "          </span>\n" +
    "        </div>\n" +
    "\n" +
    "          <p class=\"text-center\"><strong>Select an Interface</strong></p>\n" +
    "          <div class=\"list-group\">\n" +
    "            <button type=\"button\" class=\"list-group-item\" disabled ng-show=\"loading\"><i class=\"icon-loadingalt spin\"></i> Looking for Interfaces</button>\n" +
    "            <button type=\"button\" class=\"list-group-item \" ng-show=\"checking_device\"><i class=\"icon-loadingalt spin\"></i> Looking for an existing interface...</button>\n" +
    "            <button type=\"button\" class=\"list-group-item list-group-item-primary\" ng-show=\"interfaces.length == 0 && !loading && !checking_device\" ng-click=\"load_interfaces()\"><i class=\"icon-warning-sign text-warning\"></i> No existing interfaces found. Create a new one below or click here to retry</button>\n" +
    "            <button type=\"button\" class=\"list-group-item\" ng-repeat=\"interface in interfaces | orderBy: '+name'\" ng-click=\"select(interface._id)\"><i class=\"{{interface.icon}}\"></i> {{interface.name}}</button>\n" +
    "          </div>\n" +
    "          <p class=\"text-center\" ng-hide=\"checking_device\"><strong>- or -</strong></p>\n" +
    "          <form name=\"manualFrm\">\n" +
    "            <div class=\"input-group\" ng-hide=\"checking_device\">\n" +
    "              <input type=\"text\" class=\"form-control\" placeholder=\"Create a New Interface\" ng-model=\"interface.name\">\n" +
    "              <span class=\"input-group-btn\">\n" +
    "                <button class=\"btn btn-default\" type=\"button\" ng-click=\"create()\"><i class=\"icon-plus-sign\"></i> <span class=\"hidden-xs\">Create</span></button>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <p class=\"text-center\"><strong></strong></p>\n" +
    "            <div class=\"list-group\">\n" +
    "              <button ng-repeat=\"item in default_interfaces\" type=\"button\" class=\"list-group-item\" ng-click=\"interface.name=item\">{{item}}</button>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</content>\n" +
    "<div class=\"status-bar\">\n" +
    "  <device-status device=\"device\"></device-status>\n" +
    "</div>"
  );


  $templateCache.put('modules/welcome/views/login.html',
    "<content top=\"0\" bottom=\"0\" left=\"0\" right=\"0\" overflow=\"auto\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1\">\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row well\">\n" +
    "      <div class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-0\">\n" +
    "        <img src=\"images/home.png\"  class=\"img-responsive img-rounded\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-0\">\n" +
    "        <p class=\"text-center\"><strong>You need to login to continue:</strong></p>\n" +
    "        <form name=\"loginFrm\" ng-submit=\"do_login()\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"user\">Server</label>\n" +
    "\n" +
    "            <div class=\"input-group\">\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"server\" ng-model=\"config.server\" disabled>\n" +
    "              <span class=\"input-group-btn\">\n" +
    "                <button class=\"btn btn-default\" type=\"button\" ng-click=\"reset_server()\">Change</button>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"list-group\">\n" +
    "            <button type=\"button\" class=\"list-group-item \" ng-show=\"checking_login\"><i class=\"icon-loadingalt spin\"></i> Looking for an existing login...</button>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\" ng-hide=\"checking_login\">\n" +
    "            <label for=\"user\">Username</label>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"user\" placeholder=\"Username\" ng-model=\"auth.user\" required>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\" ng-hide=\"checking_login\">\n" +
    "            <label for=\"password\">Password</label>\n" +
    "            <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" ng-model=\"auth.password\" required>\n" +
    "          </div>\n" +
    "          <button class=\"btn btn-success\" ng-disabled=\"loginFrm.$invalid || loading\" ng-click=\"do_login()\" ng-hide=\"checking_login\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</button>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</content>\n" +
    "<div class=\"status-bar\">\n" +
    "  <device-status device=\"device\"></device-status>\n" +
    "</div>"
  );


  $templateCache.put('modules/welcome/views/power.html',
    "<div ng-controller=\"powerController\">\n" +
    "	<button class=\"btn btn-small btn-warning\" style=\"width: 100%\" ng-click=\"restart()\" ng-disabled=\"working\">Restart</button>\n" +
    "	<button class=\"btn btn-small btn-danger\" style=\"width: 100%\" ng-click=\"shutdown()\" ng-disabled=\"working\">Power Off</button>\n" +
    "</div>"
  );


  $templateCache.put('modules/welcome/views/providers.html',
    "<content top=\"0\" bottom=\"0\" left=\"0\" right=\"0\" overflow=\"auto\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1\">\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div>&nbsp;</div>\n" +
    "    <div class=\"row well\">\n" +
    "      <div class=\"col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-0\">\n" +
    "        <img src=\"images/home.png\"  class=\"img-responsive img-rounded\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-0\">\n" +
    "        <p class=\"text-center\"><strong>Setup Providers</strong></p>\n" +
    "\n" +
    "        <h3 ng-show=\"loading\"><i class=\"icon-circleselection spin\"></i> Loading Providers</h3>\n" +
    "        <form name=\"configureFrm\" ng-hide=\"loading\">\n" +
    "\n" +
    "          <button class=\"btn btn-success\" ng-disabled=\"configureFrm.$invalid || saving || error\" ng-click=\"finish()\" ng-class=\"{'btn-danger': error}\">\n" +
    "              <span class=\"icon-ok-circle\"></span>\n" +
    "              Finish\n" +
    "          </button>\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</content>\n" +
    "<div class=\"status-bar\">\n" +
    "  <device-status device=\"device\"></device-status>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/welcome/views/wifi.connect.html',
    "<div class=\"modal-body\">\n" +
    "  <div ng-show=\"!connecting\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"secret\">SSID</label>\n" +
    "        <input type=\"text\" class=\"form-control\" id=\"ssid\" placeholder=\"SSID\" ng-model=\"ssid.essid\" autocomplete='off' readonly>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"ssid.encryption\">\n" +
    "      <label for=\"secret\">Secret</label>\n" +
    "        <input type=\"password\" class=\"form-control\" id=\"secret\" placeholder=\"Secret\" ng-model=\"ssid.secret\" autocomplete='off'>\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-danger\" ng-show=\"error\">{{error}}</div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"connecting\">\n" +
    "  <h3><i class=\"icon-circleselection spin\"></i> Connecting</h3>\n" +
    "  <h4>Attempt {{attempts}}/{{max_attempts}}</h4>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-warning btn-sm\" type=\"button\" ng-click=\"cancel()\" ng-disabled=\"connecting\">Cancel</button>\n" +
    "    <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"connect()\" ng-disabled=\"connecting\"><i class=\"icon-network\"></i> Connect</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/wunderground/views/add.html',
    "<div ng-controller=\"wundergroundAdd\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Location</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"location\" placeholder=\"Location\" required=\"\" ng-model=\"device.config.location\">\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/wunderground/views/edit.html',
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"name\">Name</label>\n" +
    "  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"name\">Location</label>\n" +
    "  <input type=\"text\" class=\"form-control\" id=\"location\" placeholder=\"Location\" required=\"\" ng-model=\"device.config.location\">\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/wunderground/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Wunderground\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"key\">API Key</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"key\" placeholder=\"API Key\" required=\"\" ng-model=\"config.key\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"server\">Server</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"server\" placeholder=\"Server\" required=\"\" ng-model=\"config.server\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Interval (minutes)</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"interval\" placeholder=\"Interval\" required=\"\" ng-model=\"config.interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"temp_units\">Temp Units</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"temp_units\" placeholder=\"Temperature Units\" required=\"\" ng-model=\"config.temp_units\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"wind_units\">Wind Units</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"wind_units\" placeholder=\"Wind Units\" required=\"\" ng-model=\"config.wind_units\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"press_units\">Pressure Units</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"press_units\" placeholder=\"Pressure Units\" required=\"\" ng-model=\"config.press_units\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"dist_units\">Distance Units</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"dist_units\" placeholder=\"Distance Units\" required=\"\" ng-model=\"config.dist_units\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"rain_units\">Rain Units</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"rain_units\" placeholder=\"Rain Units\" required=\"\" ng-model=\"config.rain_units\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"debug\">Debug Logging: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('modules/zwave/views/add.html',
    "<div ng-controller=\"zwaveAdd\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Pending Nodes </label><button class=\"btn btn-xs btn-primary pull-right\" ng-disabled=\"loading\" ng-click=\"refresh()\"><i class=\"icon-refresh\" ng-class=\"{spin: loading}\"></i></button>\n" +
    "\n" +
    "    <ul class=\"list-group bg-muted select-list\">\n" +
    "      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"device in devices\" ng-click=\"selectNode(device)\" ng-class=\"{'list-group-item-success': device === selected}\">\n" +
    "      	{{device.config.nodeinfo.manufacturer}} {{device.config.nodeinfo.product}} ({{device.config.nodeinfo.type}})\n" +
    "      	<div><small>name{{device.config.nodeinfo.name}} <span ng-show=\"device.config.nodeinfo.loc\">in {{device.config.nodeinfo.loc}}</span></small></div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/zwave/views/edit.html',
    "<div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" required=\"\" ng-model=\"device.name\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Node ID</label>\n" +
    "    <input type=\"text\" class=\"form-control\" id=\"node_id\" placeholder=\"Node ID\" required=\"\" ng-model=\"device.config.node_id\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\" ng-repeat=\"(key, config) in device.config.commandclasses.CONFIGURATION['1']\" ng-hide=\"config.type == 'button'\">\n" +
    "    <label for=\"name\">{{key}} <span ng-show=\"config.units\">({{config.units}})</span></label>\n" +
    "\n" +
    "    <ul ng-if=\"config.type=='list' && config.units==''\" class=\"list-group bg-muted select-list\" ng-show=\"config.type=='list' && config.units==''\">\n" +
    "      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"item in config.values\" ng-click=\"config.value=item\" ng-class=\"{'list-group-item-success': config.value==item}\">{{item}}</li>\n" +
    "    </ul>\n" +
    "    <rzslider ng-if=\"config.units=='%' || config.units=='LUX'\" rz-slider-model=\"config.value\" rz-slider-options=\"{floor: 0, ceil: 100, step: 1, hideLimitLabels: true}\" rz-slider-tpl-url=\"vendor/angularjs-slider/src/rzSliderTpl.html\" ng-show=\"config.units=='%' || config.units=='LUX'\"></rzslider>\n" +
    "    <input ng-if=\"config.type=='byte' && config.units==''\" type=\"text\" class=\"form-control\" placeholder=\"{{key}}\" required=\"\" ng-model=\"config.value\" ng-show=\"config.type=='byte' && config.units==''\" min=\"{{config.min}}\" max=\"{{config.max}}\">\n" +
    "    <input ng-if=\"config.type=='int' && config.units==''\" type=\"text\" class=\"form-control\" placeholder=\"{{key}}\" required=\"\" ng-model=\"config.value\" ng-show=\"config.type=='int' && config.units==''\" min=\"{{config.min}}\" max=\"{{config.max}}\">\n" +
    "    <input ng-if=\"config.type=='short' && config.units==''\" type=\"text\" class=\"form-control\" placeholder=\"{{key}}\" required=\"\" ng-model=\"config.value\" ng-show=\"config.type=='short' && config.units==''\" min=\"{{config.min}}\" max=\"{{config.max}}\">\n" +
    "    <epochduration ng-if=\"config.units=='seconds'\" time=\"config.value\" ng-show=\"config.units=='seconds'\"></epochduration>\n" +
    "    <div class=\"help text-muted\" ng-show=\"config.help\"><small>{{config.help}}</small></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editDevice.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "  <button type=\"submit\" class=\"btn btn-sm btn-default\" ng-click=\"remove()\"><i class=\"icon-circledelete\"></i> Remove</button>\n" +
    "</div>\n"
  );


  $templateCache.put('modules/zwave/views/settings.html',
    "\n" +
    "<div class=\"container-fluid bg-muted\" style=\"padding-bottom: 2em;\">\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2 col-xs-offset-1\">\n" +
    "    <h2>Settings / Z-Wave\n" +
    "           <div class=\"pull-right pointer\"  ui-sref=\"^.providers\"><i class=\"glyphicon glyphicon-arrow-left\"></i></div></h2>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-sm-8 col-sm-offset-2\">\n" +
    "\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"enabled\">Enabled: </label>\n" +
    "              <button class=\"btn btn-sm pull-right\" ng-class=\"{'btn-success': !status.enabled, 'btn-danger': status.enabled, 'btn-muted': enabling}\" ng-disabled=\"enabling\" ng-click=\"toggle()\">\n" +
    "                <span ng-show=\"enabling\"><i class=\"icon-circleselection spin\"></i> Enabling</span>\n" +
    "                <span ng-show=\"!status.enabled && !enabling\">Enable</span>\n" +
    "                <span ng-show=\"status.enabled && !enabling\">Disable</span>\n" +
    "              </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"key\">Device</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"device\" placeholder=\"Device\" required=\"\" ng-model=\"config.device\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Message Timeout (sec)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Message Timeout\" required=\"\" ng-model=\"config.message_time\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Queue Interval (ms)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Queue Interval\" required=\"\" ng-model=\"config.queue_interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"interval\">Poll Interval (sec)</label>\n" +
    "              <input type=\"number\" class=\"form-control\" id=\"interval\" placeholder=\"Poll Interval\" required=\"\" ng-model=\"config.poll_interval\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"security_key\">Network Key</label>\n" +
    "              <input type=\"text\" class=\"form-control\" id=\"interval\" placeholder=\"Key\" required=\"\" ng-model=\"config.security_key\" ng-minlength=\"16\" ng-maxlength=\"16\" maxlength=\"16\" >\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <label for=\"debug\">Debug Logging: </label>\n" +
    "              <toggle value=\"config.debug\" class=\"pull-right\"></toggle>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "              <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('vendor/angularjs-slider/src/rzSliderTpl.html',
    "<div class=\"rzslider\">\n" +
    "<span class=\"rz-bar-wrapper\"><span class=\"rz-bar\"></span></span> <!-- // 0 The slider bar -->\n" +
    "<span class=\"rz-bar-wrapper\">\n" +
    "  <span class=\"rz-bar rz-selection\" ng-style=\"barStyle\"></span>\n" +
    "</span> <!-- // 1 Highlight between two handles -->\n" +
    "<span class=\"rz-pointer rz-pointer-min\" ng-style=minPointerStyle></span> <!-- // 2 Left slider handle -->\n" +
    "<span class=\"rz-pointer rz-pointer-max\" ng-style=maxPointerStyle></span> <!-- // 3 Right slider handle -->\n" +
    "<span class=\"rz-bubble rz-limit rz-floor\"></span> <!-- // 4 Floor label -->\n" +
    "<span class=\"rz-bubble rz-limit rz-ceil\"></span> <!-- // 5 Ceiling label -->\n" +
    "<span class=\"rz-bubble\"></span> <!-- // 6 Label above left slider handle -->\n" +
    "<span class=\"rz-bubble\"></span> <!-- // 7 Label above right slider handle -->\n" +
    "<span class=\"rz-bubble\"></span> <!-- // 8 Range label when the slider handles are close ex. 15 - 17 -->\n" +
    "<ul ng-show=\"showTicks\" class=\"rz-ticks\"> <!-- // 9 The ticks -->\n" +
    "  <li ng-repeat=\"t in ticks track by $index\" class=\"rz-tick\"\n" +
    "      ng-class=\"{'rz-selected': t.selected}\" ng-style=\"t.style\"\n" +
    "      ng-attr-uib-tooltip=\"{{ t.tooltip }}\" ng-attr-tooltip-placement=\"{{t.tooltipPlacement}}\"\n" +
    "      ng-attr-tooltip-append-to-body=\"{{ t.tooltip ? true : undefined}}\">\n" +
    "    <span ng-if=\"t.value != null\" class=\"rz-tick-value\"\n" +
    "          ng-attr-uib-tooltip=\"{{ t.valueTooltip }}\"\n" +
    "          ng-attr-tooltip-placement=\"{{t.valueTooltipPlacement}}\">{{ t.value }}</span>\n" +
    "    <span ng-if=\"t.legend != null\" class=\"rz-tick-legend\">{{ t.legend }}</span>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "</div>\n"
  );

}]);
