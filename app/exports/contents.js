document.body.innerHTML = "\n    <!-- Opening and Closing for final index.html code -->\n    <div class='hide'>\n      <div id='openHTML'></div>\n      <div id='closeHTML'></div>\n      <div id='closeFinal'></div>\n    </div>\n    \n    <!-- Navigation -->\n    <header>\n      <!-- Hidden Textbox (Detects Active Editor) -->\n      <input type='text' class='hide fl' data-action='activeEditor' value='htmlEditor'>\n      \n      <!-- Float Left -->\n      <a data-action='tools'>\n        <i class='fa fa-wrench'></i>\n      </a>\n      <div class='dialog toolbox hide'>\n        <!-- Website Title -->\n        <div class='txtcenter'>\n          <input type='text' class='heading' data-action='sitetitle' placeholder='site title' value='site title' accept='text/html, text/css, application/x-javascript'>\n        </div>\n      \n        <!--\n        <a class='fn heading' data-action='ipsum'>\n          Lorem Ispum Generator\n        </a><br /><br />\n        -->\n        \n        <div>\n          <a class='fl' data-action='open-html'>\n            <i class='fa fa-upload'></i> HTML\n          </a>\n          <a class='fn' data-action='open-css'>\n            <i class='fa fa-upload'></i> CSS\n          </a>\n          <a class='fr' data-action='open-js'>\n            <i class='fa fa-upload'></i> Javascript\n          </a>\n        </div><br />\n        \n        <a class='fl' data-action='minify'>\n          Minify\n        </a>\n        <a class='fr' data-action='tidy'>\n          Tidy Up\n        </a><br /><br />\n        \n        <!-- Load Files Into Editor -->\n        <div class='hide'>\n          <input id='loadhtml' type='file'>\n          <input id='loadcss' type='file'>\n          <input id='loadjs' type='file'>\n        </div>\n      </div>\n      \n      <a data-action='open-libraries'>\n        <i class='fa fa-book'></i>\n      </a>\n      <div class='libraries-dialog dialog fl hide'>\n        <div class='hide'>\n          <div id='closeRefs'></div>\n          <textarea class='hide' data-action='library-code' placeholder='full library code'></textarea>\n          <textarea class='hide' data-action='libstextarea' placeholder='trigger click on library for online storage'></textarea>\n          <textarea class='hide' data-action='ziplibs'></textarea>\n        </div>\n\n        <div class='addlibrary-tablets'>\n          <ul class='ldd-menu'>\n            <li>\n              <div class='ldd-submenu'>\n                <ul style='border-left:none;'>\n                  <li class='ldd-heading'>A</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='alertify' />\n                      <label for='alertify'>Alertify JS (0.3.11)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;link rel='stylesheet' href='libraries/alertify/themes/alertify.core.css' /&gt;\n    &lt;link rel='stylesheet' href='libraries/alertify/themes/alertify.default.css' /&gt;\n    &lt;script src='libraries/alertify/alertify.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#alertify').trigger('click');</textarea>\n                      <textarea class='alertifyjs alertifyjs1 hide'></textarea>\n                      <textarea class='alertifyjs alertifyjs2 hide'></textarea>\n                      <textarea class='alertifyjs alertifyjs3 hide'></textarea>\n                      <textarea class='alertifyzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>B</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='bootstrap' />\n                      <label for='bootstrap'>Bootstrap (3.3.5)</label>\n                    </a>\n                    <span class='new'>&nbsp; Popular !</span>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;link rel='stylesheet' href='libraries/bootstrap/bootstrap.css' /&gt;\n    &lt;script src='libraries/bootstrap/bootstrap.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#bootstrap').trigger('click');</textarea>\n                      <textarea class='bootstrap bootstrap1 hide'></textarea>\n                      <textarea class='bootstrap bootstrap2 hide'></textarea>\n                      <textarea class='bootstrapzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>C</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='chartjs' />\n                      <label for='chartjs'>Chart JS (0.2)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/chartjs/chart.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#chartjs').trigger('click');</textarea>\n                      <textarea class='chartjs hide'></textarea>\n                      <textarea class='chartjszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='createjs' />\n                      <label for='createjs'>Create JS</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/createjs/createjs.min.js'&gt;&lt;/script&gt;\n    &lt;script src='libraries/createjs/easeljs.min.js'&gt;&lt;/script&gt;\n    &lt;script src='libraries/createjs/tweenjs.min.js'&gt;&lt;/script&gt;\n    &lt;script src='libraries/createjs/soundjs.min.js'&gt;&lt;/script&gt;\n    &lt;script src='libraries/createjs/preloadjs.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#createjs').trigger('click');</textarea>\n                      <textarea class='createjs createjs1 hide'></textarea>\n                      <textarea class='createjs createjs2 hide'></textarea>\n                      <textarea class='createjs createjs3 hide'></textarea>\n                      <textarea class='createjs createjs4 hide'></textarea>\n                      <textarea class='createjs createjs5 hide'></textarea>\n                      <textarea class='createjszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>D</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='d3' />\n                      <label for='d3'>D3</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/d3/d3.js'&gt;&lt;/script&gt;'&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#d3').trigger('click');</textarea>\n                      <textarea class='d3 hide'></textarea>\n                      <textarea class='d3zip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='dojo' />\n                      <label for='dojo'>Dojo</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/dojo/dojo.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#dojo').trigger('click');</textarea>\n                      <textarea class='dojo hide'></textarea>\n                      <textarea class='dojozip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>F</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='fabricjs' />\n                      <label for='fabricjs'>Fabric JS (1.3.0)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/fabric/fabric.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#fabricjs').trigger('click');</textarea>\n                      <textarea class='fabricjs hide'></textarea>\n                      <textarea class='fabricjszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li class='ldd-heading'>J</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='jquery' />\n                      <label for='jquery'>jQuery (1.11.1)</label>\n                    </a>\n                    <span class='new'>&nbsp; Popular !</span>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/jquery/jquery.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#jquery').trigger('click');</textarea>\n                      <textarea class='jquery hide'></textarea>\n                      <textarea class='jqueryzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='jqueryui' />\n                      <label for='jqueryui'>jQuery UI (1.10.4)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;link rel='stylesheet' href='libraries/jqueryui/jqueryui.css' /&gt;\n    &lt;script src='libraries/jqueryui/jqueryui.min.js'&gt;&lt;/script&gt;\n    &lt;script src='libraries/jqueryui/jquery.ui.touch-punch.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#jqueryui').trigger('click');</textarea>\n                      <textarea class='jqueryui jqueryui1 hide'></textarea>\n                      <textarea class='jqueryui jqueryui2 hide'></textarea>\n                      <textarea class='jqueryui jqueryui3 hide'></textarea>\n                      <textarea class='jqueryuizip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='jquerytools' />\n                      <label for='jquerytools'>jQuery Tools (1.2.6)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/jquerytools/jquery.tools.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#jquerytools').trigger('click');</textarea>\n                      <textarea class='jquerytools hide'></textarea>\n                      <textarea class='jquerytoolszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='jszip' />\n                      <label for='jszip'>JSZip (2.4.0)</label>\n                    </a>\n                    <span class='new'>&nbsp; Popular !</span>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/jszip/jszip.min.js'&gt;&lt;/script&gt;\n    &lt;script src='libraries/jszip/jszip-utils.js'&gt;&lt;/script&gt;\n    &lt;script src='libraries/jszip/FileSaver.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#jszip').trigger('click');</textarea>\n                      <textarea class='jszip jszip1 hide'></textarea>\n                      <textarea class='jszip jszip2 hide'></textarea>\n                      <textarea class='jszip jszip3 hide'></textarea>\n                      <textarea class='jszipzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                </ul>\n                <ul>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading no-border'>K</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='kinetic' />\n                      <label for='kinetic'>Kinetic JS (4.7.3)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/kinetic/kinetic.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#kinetic').trigger('click');</textarea>\n                      <textarea class='kinetic hide'></textarea>\n                      <textarea class='kineticzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='knockout' />\n                      <label for='knockout'>Knockout JS (3.0.0)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/knockout/knockout.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#knockout').trigger('click');</textarea>\n                      <textarea class='knockout hide'></textarea>\n                      <textarea class='knockoutzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>M</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='modernizer' />\n                      <label for='modernizer'>Modernizer (2.8.3)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/modernizer/modernizer.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#modernizer').trigger('click');</textarea>\n                      <textarea class='modernizer hide'></textarea>\n                      <textarea class='modernizerzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='mootools' />\n                      <label for='mootools'>MooTools</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/mootools/mootools-yui-compressed.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#mootools').trigger('click');</textarea>\n                      <textarea class='mootools hide'></textarea>\n                      <textarea class='mootoolszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>N</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='normalize' />\n                      <label for='normalize'>Normalize (3.0.1)</label>\n                    </a>\n                    <span class='new'>&nbsp; Popular !</span>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;link rel='stylesheet' href='libraries/normalize/normalize.css' /&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#normalize').trigger('click');</textarea>\n                      <textarea class='normalize hide'></textarea>\n                      <textarea class='normalizezip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>P</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='paperjs' />\n                      <label for='paperjs'>Paper JS (0.9.9)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/paperjs/paperjs.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#paperjs').trigger('click');</textarea>\n                      <textarea class='paperjs hide'></textarea>\n                      <textarea class='paperjszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='polyui' />\n                      <label for='polyui'>Poly UI Kit</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;link rel='stylesheet' href='libraries/polyui/polyui.css'&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#polyui').trigger('click');</textarea>\n                      <textarea class='polyui hide'></textarea>\n                      <textarea class='polyuizip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='processingjs' />\n                      <label for='processingjs'>Processing JS (1.4.1)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/processingjs/processingjs.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#processingjs').trigger('click');</textarea>\n                      <textarea class='processingjs hide'></textarea>\n                      <textarea class='processingjsszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='prototypejs' />\n                      <label for='prototypejs'>Prototype JS (1.7.1)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/prototypejs/prototypejs.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#prototypejs').trigger('click');</textarea>\n                      <textarea class='prototypejs hide'></textarea>\n                      <textarea class='prototypejszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>Q</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='qooxdoo' />\n                      <label for='qooxdoo'>Qooxdoo (3.0.1)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/qooxdoo/qooxdoo.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#qooxdoo').trigger('click');</textarea>\n                      <textarea class='qooxdoo hide'></textarea>\n                      <textarea class='qooxdooszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                </ul>\n                <ul>\n                  <li class='ldd-heading'>R</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='raphael' />\n                      <label for='raphael'>Raphael JS (2.1.0)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/raphael/raphael.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#raphael').trigger('click');</textarea>\n                      <textarea class='raphael hide'></textarea>\n                      <textarea class='raphaelzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='requirejs' />\n                      <label for='requirejs'>Require JS (2.1.16)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/require/require.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#requirejs').trigger('click');</textarea>\n                      <textarea class='requirejs hide'></textarea>\n                      <textarea class='requirejszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>S</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='showdown' />\n                      <label for='showdown'>Showdown (0.4.0)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/showdown/Showdown.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#showdown').trigger('click');</textarea>\n                      <textarea class='showdown hide'></textarea>\n                      <textarea class='showdownzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='scriptaculous' />\n                      <label for='scriptaculous'>Script.aculo.us (1.9.0)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/scriptaculous/scriptaculous.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#scriptaculous').trigger('click');</textarea>\n                      <textarea class='scriptaculous hide'></textarea>\n                      <textarea class='scriptaculouszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='snapsvg' />\n                      <label for='snapsvg'>Snap SVG (0.4.1)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/snap-svg/snap-svg.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#snapsvg').trigger('click');</textarea>\n                      <textarea class='snapsvg hide'></textarea>\n                      <textarea class='snapsvgzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='svgjs' />\n                      <label for='svgjs'>SVG JS (2.0.5)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/svg-js/svg-js.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#svgjs').trigger('click');</textarea>\n                      <textarea class='svgjs hide'></textarea>\n                      <textarea class='svgjszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>T</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='threejs' />\n                      <label for='threejs'>Three JS</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/threejs/three.min.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#threejs').trigger('click');</textarea>\n                      <textarea class='threejs hide'></textarea>\n                      <textarea class='threejszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>U</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='underscorejs' />\n                      <label for='underscorejs'>Underscore JS (1.8.3)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/underscore/underscore.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#underscorejs').trigger('click');</textarea>\n                      <textarea class='underscorejs hide'></textarea>\n                      <textarea class='underscorejszip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>W</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='webfontloader' />\n                      <label for='webfontloader'>Web Font Loader (1.4.10)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/webfont/webfont.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#webfontloader').trigger('click');</textarea>\n                      <textarea class='webfontloader hide'></textarea>\n                      <textarea class='webfontloaderzip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>Y</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='yui' />\n                      <label for='yui'>YUI (3.13.0)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/yui/yui.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#yui').trigger('click');</textarea>\n                      <textarea class='yui hide'></textarea>\n                      <textarea class='yuizip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>Z</li>\n                  <li>\n                    <a>\n                      <input data-action='check' class='check' type='checkbox' id='zepto' />\n                      <label for='zepto'>Zepto (1.1.6)</label>\n                    </a>\n                    <div class='hide'>\n                      <textarea class='libsources hide'>    &lt;script src='libraries/zepto/zepto.js'&gt;&lt;/script&gt;</textarea>\n                      <textarea class='combinelibs hide'>$('#zepto').trigger('click');</textarea>\n                      <textarea class='zepto hide'></textarea>\n                      <textarea class='zeptozip jszipcode hide'></textarea>\n                    </div>\n                  </li>\n                </ul>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n      <a id='collaborate' class='skip'>\n        <i class='fa fa-group'></i>\n      </a>\n      <a data-action='download'>\n        <i class='fa fa-save'></i>\n      </a>\n      <div class='dialog fl hide'>\n        <div class='txtcenter'>\n          <input type='file' data-action='load' accept='image/jpeg, image/png' />\n          <br /><br />\n        </div>\n        \n        <div class='fill watch hide'>\n          <canvas data-action='n16' class='hide' width='16' height='16'></canvas>\n          <canvas data-action='n32' class='hide' width='32' height='32'></canvas>\n          <canvas data-action='n64' class='hide' width='64' height='64'></canvas>\n          <canvas data-action='holder' width='128' height='128'></canvas>\n          <br /><br />\n        </div>\n        \n        <ul>\n          <li>\n            <a data-action='save-online'>\n              Save to the Cloud\n            </a>\n          </li>\n          <li>\n            <a href='http://build.phonegap.com/' target='_blank'>\n              Export for mobile devices\n            </a>\n          </li>\n          <li class='watch hide'>\n            <a data-action='download-as-win-app'>\n              Download as Windows App (Electron)\n            </a>\n          </li>\n          <li class='watch hide'>\n            <a data-action='download-as-mac-app-32'>\n              Download as Mac 32bit App (node-webkit)\n            </a>\n          </li>\n          <li class='watch hide'>\n            <a data-action='download-as-lin-app'>\n              Download as Linux App (Electron)\n            </a>\n          </li>\n          <li class='watch hide'>\n            <a data-action='download-as-chrome-app'>\n              Download as Chrome App\n            </a>\n          </li>\n<!--\n          <li class='watch hide'>\n            <a class='download-as-pygtk-app'>\n              Download as PyGTK (Cross Platform)\n            </a>\n          </li>\n-->\n          <li>\n            <a data-action='download-zip'>\n              Download as .zip\n            </a>\n          </li>\n        </ul>\n      </div>\n      \n      <!-- Code Section -->\n      <div id='charmenu'>\n        <a id='restartapp' href='javascript:location.reload(true)'><span class='fa fa-refresh'></span></a>\n        <a id='undo'><span class='fa fa-undo'></span></a>\n        <a id='redo'><span class='fa fa-repeat'></span></a>\n        <a id='tabindent'>tab</a>\n        <a id='charsym1'>&lt;&gt;</a>\n        <a id='charsym2'>{}</a>\n        <a id='charsym3'>\"\"</a>\n        <a id='charsym4'>''</a>\n        <a id='charsym5'>+</a>\n        <a id='charsym6'>-</a>\n        <a id='charsym7'>.</a>\n        <a id='charsym8'>()</a>\n        <a id='charsym9'>:</a>\n        <a id='charsym10'>;</a>\n        <a id='charsym11'>_</a>\n        <a id='charsym12'>[]</a>\n        <a id='charsym13'>|</a>\n        <a id='charsym14'>/</a>\n        <a id='charsym15'>\\</a>\n        <a id='charsym16'>?</a>\n        <a id='charsym17'>*</a>\n        <a id='charsym18'>\\n</a>\n        <a id='charsym19'>&amp;</a>\n        <a id='charsym20'>%</a>\n        <a id='charsym21'>$</a>\n        <a id='charsym22'>¢</a>\n        <a id='charsym23'>£</a>\n        <a id='charsym24'>¥</a>\n        <a id='charsym25'>€</a>\n        <a id='charsym26'>@</a>\n        <a id='charsym27'>=</a>\n        <a id='charsym28'>#</a>\n        <a id='charsym29'>,</a>\n        <a id='charsym30'>!</a>\n        <a id='charsym31'>^</a>\n        <a id='charsym32'>©</a>\n        <a id='charsym33'>®</a>\n        <a id='charsym34'>™</a>\n        <a id='function'>function() {}</a>\n      </div>\n      \n      <!-- Float Right -->\n      <a class='open-demos'>\n        <i class='fa fa-gift'></i>\n      </a>\n      <div class='demos-dialog dialog fr hide'>\n        <div class='adddemos-tablets'>\n          <ul class='ldd-menu'>\n            <li>\n              <div class='ldd-submenu'>\n                <ul style='border-left:none;'>\n                  <li class='ldd-heading'>A</li>\n                  <li><a data-action='alphabetizer'>alphabetizer</a></li>\n                  <li><a data-action='applicator'>applicator</a></li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>C</li>\n                  <li><a data-action='catchthesquare'>catch the square</a></li>\n                  <li><a data-action='charactermap'>character map</a></li>\n                  <li><a data-action='codeeditor'>code editor</a></li>\n                  <li><a data-action='convertforvalues'>convert for values</a></li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>D</li>\n                  <li><a data-action='dateclock'>date and time</a></li>\n                  <li><a data-action='detectorientation'>detect orientation</a></li>\n                  <li><a data-action='osdisplay'>display operating system</a></li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>K</li>\n                  <li><a data-action='keylogger'>keylogger</a></li>\n                  <li>&nbsp;</li>\n                </ul>\n                <ul>\n                  <li class='ldd-heading'>M</li>\n                  <li><a data-action='markdowneditor'>markdown editor</a></li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>N</li>\n                  <li><a data-action='newdocument'>new document</a></li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>P</li>\n                  <li><a data-action='packagezipfiles'>package zip files</a></li>\n                  <li><a data-action='passwordgen'>password generator</a></li>\n                  <li><a data-action='pdfembed'>pdf embed</a></li>\n                  <li><a data-action='pictureviewer'>picture viewer</a></li>\n                  <li><a data-action='polyui'>poly ui kit</a></li>\n                  <li>&nbsp;</li>\n                  <li class='ldd-heading'>S</li>\n                  <li><a data-action='simpleslideshow'>simple slideshow</a></li>\n                  <li><a data-action='splitter'>splitter</a></li>\n                  <li>&nbsp;</li>\n                </ul>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n      <a class='grid-alignment is-squared skip'>\n        <i class='fa fa-columns'></i>\n      </a>\n    </header>\n    \n    <!-- Editor/Preview -->\n    <div id='splitContainer'>\n      <div>\n        <div id='leftSplitter'>\n          <div>\n            <div class='editor-container html-editor'>\n              <div id='htmlEditor'></div>\n            </div>\n            <a class='fullscreen-html-toggle unfill'>\n              <span class='fa fa-expand' id='fullscreen-html'></span>\n            </a>\n          </div>\n          <div>\n            <div class='editor-container css-editor'>\n              <div id='cssEditor'></div>\n            </div>\n            <a class='fullscreen-css-toggle unfill'>\n              <span class='fa fa-expand' id='fullscreen-css'></span>\n            </a>\n          </div>\n        </div>\n      </div>\n      <div>\n        <div id='rightSplitter'>\n          <div>\n            <div class='editor-container js-editor'>\n              <div id='jsEditor'></div>\n            </div>\n            <a class='fullscreen-js-toggle unfill'>\n              <span class='fa fa-expand' id='fullscreen-js'></span>\n            </a>\n          </div>\n          <div>\n            <div class='editor-container preview-editor'>\n              <iframe id='preview'></iframe>\n            </div>\n            <a class='preview-mode-toggle unfill'>\n              <span class='fa fa-expand' id='preview-mode'></span>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>        \n    \n    <!-- Main Dialog -->\n    <div class='dialog-bg column hide' data-action='chromedialog'>\n      <div>\n        <nav>\n          <div class='grid chromeappwindow'>\n            <form class='form'>\n              <textarea class='form__input' data-action='descr' placeholder='Description' rows='7'></textarea>\n              \n              <h4>\n                Offline:\n              </h4>\n              \n              <p class='onoffswitch'>\n                <input type='checkbox' name='onoffswitch' class='offline-mode' id='myonoffswitch' checked>\n                <label class='onoffswitch-label' for='myonoffswitch'>\n                  <span class='onoffswitch-inner'></span>\n                  <span class='onoffswitch-switch'></span>\n                </label>\n              </p>\n              \n              <h4>\n                Frameless:\n              </h4>\n              \n              <p class='theframeswitch'>\n                <input type='checkbox' name='frameswitch' class='frame-mode' id='myframeswitch'>\n                <label class='frameswitch-label' for='myframeswitch'>\n                  <span class='frameswitch-inner'></span>\n                  <span class='frameswitch-switch'></span>\n                </label>\n              </p>\n            </form>\n              \n            <div class='txtcenter'>\n              <a class='btn--default' data-action='confirm'>Confirm</a>\n              <a class='btn--warning' data-action='cancel'>Cancel</a>\n            </div>\n          </div>\n        </nav>\n      </div>\n    </div>";