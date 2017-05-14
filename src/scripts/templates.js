angular.module('abode').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/alarmclocks/add.html',
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


  $templateCache.put('views/alarmclocks/edit.html',
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


  $templateCache.put('views/alarmclocks/list.html',
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


  $templateCache.put('views/devices/assign.html',
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


  $templateCache.put('views/devices/devices.add.html',
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
    "                      <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"p in providers | orderBy: '+'\" ng-click=\"changeProvider(p)\" ng-class=\"{'list-group-item-success': device.provider == p}\">\n" +
    "                        {{p | capitalize}}\n" +
    "                      </li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <form name=\"addDevice\">\n" +
    "\n" +
    "                  <div ng-show=\"device.provider && section == 'settings'\">\n" +
    "                    <div ng-repeat=\"p in providers | orderBy: '+'\" ng-include=\"provider_templates[p]\" ng-if=\"device.provider == p\">\n" +
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


  $templateCache.put('views/devices/devices.camera.html',
    "<div>\n" +
    "  <img src=\"{{camera_url}}\" style=\"width: 100%\" ng-click=\"ok()\">\n" +
    "</div>\n"
  );


  $templateCache.put('views/devices/devices.edit.html',
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
    "                      <select size=\"1\" class=\"form-control\" id=\"provider\" placeholder=\"Provider\" required=\"\" ng-model=\"device.provider\" ng-options=\"o as o for o in providers | orderBy: '+'\"></select>\n" +
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


  $templateCache.put('views/devices/devices.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/devices/devices.list.html',
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
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bg-success img-circle \" style=\"position: fixed; bottom: 1.5em; right: 1.5em; font-size: 1.5em; height: 2.5em; width: 2.5em; text-align: center; box-shadow: .2em .2em .3em black; line-height: 2.7em; font-weight: bold; cursor: pointer;\" ui-sref=\"main.devices.add\"><i class=\"icon-plus\"></i></button>\n"
  );


  $templateCache.put('views/devices/devices.select.html',
    "\n" +
    "<button class=\"btn form-control\" ng-click=\"openAssign()\" ng-class=\"{'btn-default': device, 'btn-primary': !device, 'btn-danger': error}\" ng-disabled=\"loading\">\n" +
    "  <div ng-show=\"!device && !loading && !error\">Select Device</div>\n" +
    "  <div ng-show=\"device && !loading && !error\"><i class=\"{{device.icon}}\"></i> {{device.name}}</div>\n" +
    "  <div ng-show=\"loading && !error\"><i class=\"icon-circleselection spin\"></i> Loading</div>\n" +
    "  <div ng-show=\"error\"><i class=\"icon-erroralt\"></i> Could not find Device</div>\n" +
    "</button>\n"
  );


  $templateCache.put('views/devices/devices.select.modal.html',
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


  $templateCache.put('views/devices/devices.view.html',
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


  $templateCache.put('views/home/controller.html',
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


  $templateCache.put('views/home/events.html',
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


  $templateCache.put('views/home/index.html',
    "<div>Home <button ng-click=\"logout()\">Logout</button></div>"
  );


  $templateCache.put('views/home/interfaceLink.html',
    "<div class=\"interface-link\" ui-sref=\"main.home({interface: interface.name})\" ui-sref-active=\"interface-link-active\">\n" +
    "  <div class=\"interface-icon\"><i class=\"{{interface.icon}}\"></i></div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/home/interfaceList.html',
    "<div class=\"interface-list\">\n" +
    "  <interface-link ng-repeat=\"interface in interfaces\" interface=\"interface\"></interface-link>\n" +
    "</div>\n"
  );


  $templateCache.put('views/main/display_popover.html',
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


  $templateCache.put('views/main/display_status.html',
    "<div uib-popover-template=\"'views/main/display_popover.html'\" popover-trigger=\"'outsideClick click'\" popover-placement=\"bottom-right\" popover-is-open=\"popover\">\n" +
    "  <i ng-show=\"loading\" class=\"text-muted pointer icon-circleselection spin\"></i>\n" +
    "  <i ng-hide=\"loading || device == false\" class=\"pointer\" ng-class=\"{'text-danger': !network.connected, 'text-success': network.connected, 'icon-lan': !network.essid, 'icon-lan': !network.essid, 'icon-networksignal': network.essid, 'text-warning': network.connected && !root.status.connected}\"></i>\n" +
    "  <i ng-hide=\"loading || device == true\" class=\"pointer\" ng-class=\"{'icon-plug': !root.status.connected, 'icon-networksignal': root.status.connected, 'text-success': root.status.connected, 'text-danger': !root.status.connected}\"></i>\n" +
    "</div>\n"
  );


  $templateCache.put('views/main/event_status.html',
    "<div style=\"text-align: left;\">\n" +
    "	<div ng-show=\"root.status.connected\">Status: Connected</div>\n" +
    "	<div ng-show=\"!root.status.connected\">Status: Disconnected</div>\n" +
    "	<div>Events: {{root.status.messages | number:0}}</div>\n" +
    "	<div>Errors: {{root.status.errors | number:0}}</div>\n" +
    "</div>"
  );


  $templateCache.put('views/main/icons.html',
    "<div class=\"icon-selector bg-muted\">\n" +
    "<ul>\n" +
    "	<li ng-repeat=\"icon in icons | orderBy: 'name'\" ng-class=\"{'icon-selected': icon.class == value}\" ng-click=\"selectIcon(icon)\"><i class=\"{{icon.class}}\"></i></li>\n" +
    "<ul>\n" +
    "</div>"
  );


  $templateCache.put('views/main/index.html',
    "<div class=\"view\" ui-view>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"anav-shade\" ng-click=\"anav_open = false; notifications.hidden = true\" ng-show=\"anav_open || !notifications.hidden\"></div>\n" +
    "\n" +
    "<div class=\"anav-drawer\" ng-class=\"{'anav-visible': anav_open}\">\n" +
    "	<div class=\"anav-opener\">\n" +
    "\n" +
    "	</div>\n" +
    "	<div class=\"anav-top\">\n" +
    "\n" +
    "	    <div class=\"row\">\n" +
    "	      <div class=\"col-xs-4\"><img src=\"./images/home.png\" style=\"height: 5em;\"></div>\n" +
    "	      <div class=\"col-xs-8\" style=\"text-align: right\">\n" +
    "\n" +
    "	<div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\">\n" +
    "	  <button id=\"single-button\" type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "	    <i class=\"icon-monitor\"></i> Interface <span class=\"caret\"></span>\n" +
    "	  </button>\n" +
    "	  <ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "	    <li role=\"menuitem\" ng-repeat=\"interface in interfaces | orderBy: '+name'\" ui-sref=\"main.home({interface: interface.name})\" ><a href=\"#\"ng-click=\"anav_open=false\"><i class=\"{{interface.icon}}\"></i> {{interface.name}}</a></li>\n" +
    "	  </ul>\n" +
    "	</div>\n" +
    "\n" +
    "	      </div>\n" +
    "	    </div>\n" +
    "\n" +
    "	</div>\n" +
    "	<div class=\"anav-mid\">\n" +
    "	  <ul>\n" +
    "	    <li ui-sref=\"main.home\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-home\"></i> Home</li>\n" +
    "	    <li ui-sref=\"main.rooms\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-modal-window\"></i> Rooms</li>\n" +
    "	    <li ui-sref=\"main.devices\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-oil\"></i> Devices</li>\n" +
    "	    <li ui-sref=\"main.scenes\" ng-click=\"anav_open=false\"><i class=\"icon-picture\"></i> Scenes</li>\n" +
    "      <li ui-sref=\"main.notifications\" ng-click=\"anav_open=false\"><i class=\"icon-flag\"></i> Notifications</li>\n" +
    "	    <li ui-sref=\"main.triggers\" ng-click=\"anav_open=false\"><i class=\"icon-bomb\"></i> Triggers</li>\n" +
    "\n" +
    "	  </ul>\n" +
    "	</div>\n" +
    "	<div class=\"anav-bottom\">\n" +
    "	  <ul>\n" +
    "	    <li ui-sref=\"main.settings\" ng-click=\"anav_open=false\"><i class=\"glyphicon glyphicon-cog\"></i> Settings</li>\n" +
    "	    <li class=\"text-right\" ng-click=\"logout()\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</li>\n" +
    "	  </ul>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div style=\"position: absolute; z-index: 1000; font-size: 3em;\">\n" +
    "</div>\n" +
    "<div class=\"status-bar\" ng-class=\"{night: time.is.night && client.night_mode}\">\n" +
    "	<div class=\"anav-opener  text-muted pull-left\"  ng-click=\"anav_open = true\"><i class=\"icon-menu\"></i></div>\n" +
    "	<div ng-show=\"client.show_date\">{{date | date:'EEE, MMM d'}}</div>\n" +
    "	<weather-status></weather-status>\n" +
    "	<device-status device=\"device\"></device-status>\n" +
    "	<notifications-status></notifications-status>\n" +
    "</div>\n" +
    "<notifications></notifications>\n"
  );


  $templateCache.put('views/main/locked.html',
    "<div class=\"modal-body text-center\">\n" +
    "<pin-entry pin-model=\"pin\" randomize=\"true\" show-submit=\"true\" submit=\"unlock(pin)\" checking=\"checking\" error=\"error\" success=\"success\"></pin-entry>\n" +
    "</div>"
  );


  $templateCache.put('views/main/network.html',
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


  $templateCache.put('views/main/pin_entry.html',
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


  $templateCache.put('views/main/power.html',
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


  $templateCache.put('views/main/server_gone.html',
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


  $templateCache.put('views/main/slider.html',
    "<div class=\"slider\">\n" +
    "	<div class=\"slider-track\"></div>\n" +
    "	<div ng-mousedown=\"start($event)\" ng-mouseup=\"end()\" class=\"slider-handle\" ng-style=\"sliderPosition\"></div>{{level}}\n" +
    "</div>"
  );


  $templateCache.put('views/main/tags.add.html',
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


  $templateCache.put('views/main/tags.html',
    "<div class=\"tag-list\">\n" +
    "	<div class=\"tag-list-add\">\n" +
    "		<button class=\"btn btn-link btn-sm\" ng-click=\"addTag()\"><i class=\"icon-addtags\"></i></button>\n" +
    "	</div>\n" +
    "	<div class=\"tag-list-tags\">\n" +
    "		<div class=\"tag-list-tag\" ng-repeat=\"tag in tagModel\">{{tag}} <i class=\"icon-remove-circle text-default pointer\" ng-click=\"removeTag($index)\"></i></div>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('views/notifications/action.builder.html',
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


  $templateCache.put('views/notifications/index.html',
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


  $templateCache.put('views/notifications/notifications.add.html',
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


  $templateCache.put('views/notifications/notifications.edit.html',
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


  $templateCache.put('views/notifications/notifications.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/notifications/notifications.list.html',
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


  $templateCache.put('views/notifications/status.html',
    "<div class=\"notification-status\" ng-click=\"showNotifications()\" ng-class=\"{'text-muted': notifications.notifications.length == 0}\">\n" +
    "	<i class=\"icon-flag\"></i>\n" +
    "	<span class=\"notification-status-badge bg-danger\" ng-show=\"notifications.notifications.length > 0\">{{notifications.notifications.length}}</span>\n" +
    "</div>"
  );


  $templateCache.put('views/notifications/triggers.picker.html',
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


  $templateCache.put('views/rooms/assign.html',
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


  $templateCache.put('views/rooms/assign.scene.html',
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


  $templateCache.put('views/rooms/room.icon.html',
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
    "</div>\n"
  );


  $templateCache.put('views/rooms/rooms.add.html',
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


  $templateCache.put('views/rooms/rooms.cameras.html',
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


  $templateCache.put('views/rooms/rooms.edit.html',
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


  $templateCache.put('views/rooms/rooms.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/rooms/rooms.list.html',
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


  $templateCache.put('views/rooms/rooms.view.html',
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
    "      <li class=\"list-group-item\" style=\"cursor: pointer\" ng-repeat=\"device in devices | orderBy: ['-_on', '+age', '+name']\" ng-class=\"{'list-group-item-success': device_state(device, '_on', true, ['light', 'display', 'fan']), 'list-group-item-danger': device_state(device, '_on', true, ['door', 'window', 'motion_sensor']) || device._mode == 'HEAT', 'list-group-item-info': device._mode == 'COOL'}\" ng-click=\"open(device)\" ng-show=\"check_filter(device)\">\n" +
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


  $templateCache.put('views/scenes/add.action.html',
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


  $templateCache.put('views/scenes/assign.html',
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


  $templateCache.put('views/scenes/edit.action.html',
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


  $templateCache.put('views/scenes/scene.builder.devices.html',
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


  $templateCache.put('views/scenes/scene.builder.html',
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


  $templateCache.put('views/scenes/scenes.add.html',
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


  $templateCache.put('views/scenes/scenes.edit.html',
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


  $templateCache.put('views/scenes/scenes.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/scenes/scenes.list.html',
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


  $templateCache.put('views/scenes/scenes.view.html',
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


  $templateCache.put('views/settings/settings.advanced.html',
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


  $templateCache.put('views/settings/settings.client.html',
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


  $templateCache.put('views/settings/settings.display.html',
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


  $templateCache.put('views/settings/settings.general.html',
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
    "                <div class=\"input-group\">\n" +
    "                  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Latitude\" required=\"\" ng-model=\"config.location.lat\">\n" +
    "                  <span class=\"input-group-addon\">Lat </span>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\">\n" +
    "                <div class=\"input-group\">\n" +
    "                  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Longitude\" required=\"\" ng-model=\"config.location.long\">\n" +
    "                  <span class=\"input-group-addon\">Long</span>\n" +
    "                </div>\n" +
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


  $templateCache.put('views/settings/settings.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/settings/settings.interfaces.add.html',
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


  $templateCache.put('views/settings/settings.interfaces.edit.html',
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


  $templateCache.put('views/settings/settings.interfaces.html',
    "<div class=\"bg-muted\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/settings/settings.interfaces.list.html',
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


  $templateCache.put('views/settings/settings.list.html',
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


  $templateCache.put('views/settings/settings.networking.html',
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


  $templateCache.put('views/settings/settings.pins.add.html',
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


  $templateCache.put('views/settings/settings.pins.edit.html',
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


  $templateCache.put('views/settings/settings.pins.html',
    "<div class=\"bg-muted\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/settings/settings.pins.list.html',
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


  $templateCache.put('views/settings/settings.providers.html',
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
    "\n" +
    "              <ul class=\"list-group\" ng-hide=\"loading\">\n" +
    "                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-click=\"providerSettings(provider.route)\" ng-repeat=\"provider in providers | orderBy: '+name'\">\n" +
    "                  {{provider.name}} <span class=\"badge\"><i class=\"glyphicon glyphicon-ok text-success\"></i></span>\n" +
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


  $templateCache.put('views/settings/settings.sensors.html',
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


  $templateCache.put('views/settings/settings.sources.add.html',
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


  $templateCache.put('views/settings/settings.sources.edit.html',
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


  $templateCache.put('views/settings/settings.sources.html',
    "<div class=\"bg-muted\"  ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/settings/settings.sources.list.html',
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


  $templateCache.put('views/settings/settings.users.add.html',
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


  $templateCache.put('views/settings/settings.users.edit.html',
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


  $templateCache.put('views/settings/settings.users.html',
    "<div class=\"bg-muted\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/settings/settings.users.list.html',
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


  $templateCache.put('views/triggers/conditions.edit.html',
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


  $templateCache.put('views/triggers/conditions.side.html',
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


  $templateCache.put('views/triggers/notifications.picker.html',
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


  $templateCache.put('views/triggers/triggers.action.html',
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
    "          <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Temperature\" ng-model=\"builder.mode.temperature\">\n" +
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
    "\n" +
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


  $templateCache.put('views/triggers/triggers.add.html',
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
    "                <form name=\"edit\">\n" +
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
    "                      <label for=\"trigger\">Trigger<span ng-show=\"trigger.trigger\">: {{trigger.trigger}}</span></label>\n" +
    "\n" +
    "                      <div>\n" +
    "                      <ul class=\"list-group bg-muted select-list\">\n" +
    "                        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in trigger_types | orderBy: '+name'\" ng-click=\"trigger.trigger = t.name\" ng-class=\"{'list-group-item-success': trigger.trigger == t.name}\">\n" +
    "                          {{t.name}}\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Match<span ng-show=\"trigger.match_type\">: {{trigger.match_type}}<span ng-show=\"trigger.match_type == 'device' && trigger.match\">.{{trigger.match}}</span></span></label>\n" +
    "                    </div>\n" +
    "                    <div class=\"container-fluid\">\n" +
    "                      <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6\">\n" +
    "\n" +
    "                          <div class=\"form-group\">\n" +
    "                            <ul class=\"list-group bg-muted select-list\" >\n" +
    "                              <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in match_types\" ng-click=\"changeType(t.value)\" ng-class=\"{'list-group-item-success': trigger.match_type == t.value}\">\n" +
    "                                <i class=\"{{t.icon}}\"></i> {{t.name}}\n" +
    "                              </li>\n" +
    "                            </ul>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6\">\n" +
    "\n" +
    "                          <div class=\"form-group\">\n" +
    "                            <div ng-show=\"trigger.match_type == 'device'\">\n" +
    "                              <div ng-show=\"devices_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "                              <ul class=\"list-group bg-muted select-list\" ng-hide=\"devices_loading\">\n" +
    "                                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"device in devices | orderBy: '+name'\" ng-click=\"changeDevice(device)\" ng-class=\"{'list-group-item-success': trigger.match == device.name}\">\n" +
    "                                  {{device.name}}\n" +
    "                                </li>\n" +
    "                              </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'room'\">\n" +
    "                              <div ng-show=\"rooms_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "                              <ul class=\"list-group bg-muted select-list\" ng-hide=\"rooms_loading\">\n" +
    "                                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"room in rooms | orderBy: '+name'\" ng-click=\"changeRoom(room)\" ng-class=\"{'list-group-item-success': trigger.match == room.name}\">\n" +
    "                                  {{room.name}}\n" +
    "                                </li>\n" +
    "                              </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'scene'\">\n" +
    "                              <div ng-show=\"scenes_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "                              <ul class=\"list-group bg-muted select-list\" ng-hide=\"scenes_loading\">\n" +
    "                                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"scene in scenes | orderBy: '+name'\" ng-click=\"changeScene(scene)\" ng-class=\"{'list-group-item-success': trigger.match == scene.name}\">\n" +
    "                                  {{scene.name}}\n" +
    "                                </li>\n" +
    "                              </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'time'\" style=\"padding-left: 1em;\">\n" +
    "                              <epochtime time=\"trigger.match\" disabled=\"{{trigger.match_type != 'time'}}\"></epochtime>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'string'\" style=\"padding-left: 1em;\">\n" +
    "                              <input type=\"text\" class=\"form-control\" id=\"match\" placeholder=\"String\" required=\"\" ng-model=\"trigger.match\">\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'number'\" style=\"padding-left: 1em;\">\n" +
    "                              <input type=\"text\" class=\"form-control\" id=\"match\" placeholder=\"Number\" required=\"\" ng-model=\"trigger.match\">\n" +
    "                            </div>\n" +
    "\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
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
    "                    \n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"add()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Add</button>\n" +
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


  $templateCache.put('views/triggers/triggers.checker.html',
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


  $templateCache.put('views/triggers/triggers.conditions.html',
    "\n" +
    "<ul class=\"list-group bg-muted select-list\" ng-show=\"conditions.length > 0\">\n" +
    "  <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"condition in conditions\" ng-click=\"editCondition(condition)\" ng-class=\"{'or-conditions': condition.or.length, 'and-conditions': condition.and.length}\">\n" +
    "    <i class=\"glyphicon glyphicon-th-large\" ng-class=\"{'text-warning': condition.or.length, 'text-success': condition.and.length}\" ng-show=\"condition.or.length || condition.and.length\"></i>\n" +
    "    {{condition | conditionReadable}}\n" +
    "    <button class=\"pull-right btn btn-xs btn-danger\" ng-click=\"removeCondition($index)\" stop-event><i class=\"icon-trash\"></i></button>\n" +
    "  </li>\n" +
    "</ul>\n"
  );


  $templateCache.put('views/triggers/triggers.edit.html',
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
    "                <form name=\"edit\">\n" +
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
    "                      <label for=\"trigger\">Trigger<span ng-show=\"trigger.trigger\">: {{trigger.trigger}}</span></label>\n" +
    "\n" +
    "                      <div>\n" +
    "                      <ul class=\"list-group bg-muted select-list\">\n" +
    "                        <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in trigger_types | orderBy: '+name'\" ng-click=\"trigger.trigger = t.name\" ng-class=\"{'list-group-item-success': trigger.trigger == t.name}\">\n" +
    "                          {{t.name}}\n" +
    "                        </li>\n" +
    "                      </ul>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <label for=\"trigger\">Match<span ng-show=\"trigger.match_type\">: {{trigger.match_type}}<span ng-show=\"trigger.match_type == 'device' && trigger.match\">.{{trigger.match}}</span></span></label>\n" +
    "                    </div>\n" +
    "                    <div class=\"container-fluid\">\n" +
    "                      <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6\">\n" +
    "\n" +
    "                          <div class=\"form-group\">\n" +
    "                            <ul class=\"list-group bg-muted select-list\" >\n" +
    "                              <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"t in match_types\" ng-click=\"changeType(t.value)\" ng-class=\"{'list-group-item-success': trigger.match_type == t.value}\">\n" +
    "                                <i class=\"{{t.icon}}\"></i> {{t.name}}\n" +
    "                              </li>\n" +
    "                            </ul>\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-6\">\n" +
    "\n" +
    "                          <div class=\"form-group\">\n" +
    "                            <div ng-show=\"trigger.match_type == 'device'\">\n" +
    "                              <div ng-show=\"devices_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "                              <ul class=\"list-group bg-muted select-list\" ng-hide=\"devices_loading\">\n" +
    "                                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"device in devices | orderBy: '+name'\" ng-click=\"changeDevice(device)\" ng-class=\"{'list-group-item-success': trigger.match == device.name}\">\n" +
    "                                  {{device.name}}\n" +
    "                                </li>\n" +
    "                              </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'room'\">\n" +
    "                              <div ng-show=\"rooms_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "                              <ul class=\"list-group bg-muted select-list\" ng-hide=\"rooms_loading\">\n" +
    "                                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"room in rooms | orderBy: '+name'\" ng-click=\"changeRoom(room)\" ng-class=\"{'list-group-item-success': trigger.match == room.name}\">\n" +
    "                                  {{room.name}}\n" +
    "                                </li>\n" +
    "                              </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'scene'\">\n" +
    "                              <div ng-show=\"scenes_loading\"><i class=\"icon-loadingalt spin\"></i> Loading...</div>\n" +
    "                              <ul class=\"list-group bg-muted select-list\" ng-hide=\"scenes_loading\">\n" +
    "                                <li class=\"list-group-item\" style=\"cursor: pointer;\" ng-repeat=\"scene in scenes | orderBy: '+name'\" ng-click=\"changeScene(scene)\" ng-class=\"{'list-group-item-success': trigger.match == scene.name}\">\n" +
    "                                  {{scene.name}}\n" +
    "                                </li>\n" +
    "                              </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'time'\" style=\"padding-left: 1em;\">\n" +
    "                              <epochtime time=\"trigger.match\" disabled=\"{{trigger.match_type != 'time'}}\"></epochtime>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'string'\" style=\"padding-left: 1em;\">\n" +
    "                              <input type=\"text\" class=\"form-control\" id=\"match\" placeholder=\"String\" required=\"\" ng-model=\"trigger.match\">\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-show=\"trigger.match_type == 'number'\" style=\"padding-left: 1em;\">\n" +
    "                              <input type=\"text\" class=\"form-control\" id=\"match\" placeholder=\"Number\" required=\"\" ng-model=\"trigger.match\">\n" +
    "                            </div>\n" +
    "\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
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
    "                    \n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
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
    "                      <button type=\"submit\" class=\"pull-right btn btn-sm btn-primary\" ng-click=\"save()\" ng-disabled=\"editTrigger.$invalid\"><i class=\"icon-savetodrive\"></i> Save</button>\n" +
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


  $templateCache.put('views/triggers/triggers.html',
    "<div class=\"bg-muted\" style=\"position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; overflow: auto;\" ui-view>\n" +
    "</div>\n"
  );


  $templateCache.put('views/triggers/triggers.list.html',
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
    "            <div style=\"font-size: .8em;\" class=\"text-muted\" ng-class=\"{'strike-through': !trigger.enabled}\">\n" +
    "              <span ng-show=\"trigger.match\">{{trigger.match_type | capitalize}} is\n" +
    "                <span ng-show=\"trigger.match_type == 'time'\">{{trigger.match | time}} during </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'date'\">{{trigger.match | date: 'EEE MMM d, yyyy'}} during </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'device'\">{{trigger.match}} from </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'string'\">{{trigger.match}} from </span>\n" +
    "                <span ng-show=\"trigger.match_type == 'number'\">{{trigger.match}} from </span>\n" +
    "              </span>\n" +
    "              {{trigger.trigger}} Event\n" +
    "            </div>\n" +
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


  $templateCache.put('views/weather/popover.html',
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


  $templateCache.put('views/weather/status.html',
    "<div ng-show=\"client.show_weather\">\n" +
    "	<span class=\"pointer\" uib-popover-template=\"'views/weather/popover.html'\" popover-trigger=\"'outsideClick'\" popover-placement=\"bottom-right\">\n" +
    "		{{weather.temperature | number:0}}&deg;\n" +
    "		<i class=\"wi {{weather.icon}}\"></i></span>\n" +
    "</div>\n"
  );


  $templateCache.put('views/welcome/configure.html',
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
    "        <form name=\"configureFrm\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"name\">Name</label>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\" ng-model=\"config.name\" required>\n" +
    "          </div>\n" +
    "          <button class=\"btn btn-success\" ng-disabled=\"configureFrm.$invalid || loading\" ng-click=\"do_login()\"><span class=\"icon-settingsandroid\"></span> Setup</button>\n" +
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
    "</div>"
  );


  $templateCache.put('views/welcome/devices.html',
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


  $templateCache.put('views/welcome/index.html',
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


  $templateCache.put('views/welcome/interfaces.html',
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


  $templateCache.put('views/welcome/login.html',
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


  $templateCache.put('views/welcome/power.html',
    "<div ng-controller=\"powerController\">\n" +
    "	<button class=\"btn btn-small btn-warning\" style=\"width: 100%\" ng-click=\"restart()\" ng-disabled=\"working\">Restart</button>\n" +
    "	<button class=\"btn btn-small btn-danger\" style=\"width: 100%\" ng-click=\"shutdown()\" ng-disabled=\"working\">Power Off</button>\n" +
    "</div>"
  );


  $templateCache.put('views/welcome/wifi.connect.html',
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

}]);
