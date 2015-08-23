var loader = $("[data-action=load]"),
    c16 = $("[data-action=n16]"),
    c32 = $("[data-action=n32]"),
    c64 = $("[data-action=n64]"),
    canvas = $("[data-action=holder]"),
    ctx16 = c16[0].getContext("2d"),
    ctx32 = c32[0].getContext("2d"),
    ctx64 = c64[0].getContext("2d"),
    ctx = canvas[0].getContext("2d");

function displayPreview(file) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var img = new Image();
    var img16 = new Image();
    var img32 = new Image();
    var img64 = new Image();
    img.src = e.target.result;
    img16.src = e.target.result;
    img32.src = e.target.result;
    img64.src = e.target.result;
    img16.onload = function() {
      // x, y, width, height
      ctx16.drawImage(img16, 0, 0, 16, 16);
    };
    img32.onload = function() {
      // x, y, width, height
      ctx32.drawImage(img32, 0, 0, 32, 32);
    };
    img64.onload = function() {
      // x, y, width, height
      ctx64.drawImage(img64, 0, 0, 64, 64);
    };
    img.onload = function() {
      // x, y, width, height
      ctx.drawImage(img, 0, 0, 128, 128);
    };
  };
  reader.readAsDataURL(file);
}

// Clear Input Values - JQuery Plugin
(function($) {
  $.fn.clear = function() {
    $(this).val("");
  };
}) (jQuery) ;

$(document).ready(function() {
  var myarray = [],
      current = 1,
      activeEditor = $("[data-action=activeEditor]"),
      download_to_textbox = function (url, el) {
        return $.get(url, null, function (data) {
          el.val(data);
        }, "text");
      },
      shortcutKeys = function() {
        // New Document
        shortcut.add("Ctrl+N", function() {
          $(".check").attr("checked", false).trigger("change");
          htmlEditor.setValue("<!-- comment -->\nhello world!");
          cssEditor.setValue("");
          jsEditor.setValue("");
        });
        // Export layout hotkey
        shortcut.add("Ctrl+S", function() {
          $("[data-action=download-zip]").trigger("click");
        });
      },
      initGenerators = function() {
        // Text generator (Lorem Ipsum)
        $("[data-action=ipsum]").click(function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            htmlEditor.replaceSelection("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
            $("[data-action=tools].active").trigger("click");
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            cssEditor.replaceSelection("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
            $("[data-action=tools].active").trigger("click");
            cssEditor.focus();
            // alertify.error("Lorem ipsum is not allowed in cssEditor.");
          } else if ( activeEditor.val() === "jsEditor" ) {
            jsEditor.replaceSelection("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
            $("[data-action=tools].active").trigger("click");
            jsEditor.focus();
          }
        });

        // Tidy Up/Beautify Code
        $("[data-action=tidy]").click(function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var htmlLines = htmlEditor.lineCount();
            htmlEditor.autoFormatRange({line:0, ch:0}, {line:htmlLines});
          } else if ( activeEditor.val() === "cssEditor" ) {
            var cssLines = cssEditor.lineCount();
            cssEditor.autoFormatRange({line:0, ch:0}, {line:cssLines});
          } else if ( activeEditor.val() === "jsEditor" ) {
            var jsLines = jsEditor.lineCount();
            jsEditor.autoFormatRange({line:0, ch:0}, {line:jsLines});
          }
          $("[data-action=tools].active").trigger("click");
        });

        // Minify Code
        $("[data-action=minify]").click(function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            htmlEditor.setValue( "\n" + htmlEditor.getValue() + "\n".replace(/\<\!--\s*?[^\s?\[][\s\S]*?--\>/g,"").replace(/\>\s*\</g,"><").replace(/\n/g,"") );
            $("[data-action=tools].active").trigger("click");
          } else if ( activeEditor.val() === "cssEditor" ) {
            cssEditor.setValue( cssEditor.getValue().replace(/\/\*.*\*\/|\/\*[\s\S]*?\*\/|\n|\t|\v|\s{2,}/g,"").replace(/\s*\{\s*/g,"{").replace(/\s*\}\s*/g,"}").replace(/\s*\:\s*/g,":").replace(/\s*\;\s*/g,";").replace(/\s*\,\s*/g,",").replace(/\s*\~\s*/g,"~").replace(/\s*\>\s*/g,">").replace(/\s*\+\s*/g,"+").replace(/\s*\!\s*/g,"!") );
          } else if ( activeEditor.val() === "jsEditor" ) {
            jsEditor.setValue( jsEditor.getValue().replace(/\/\*[\s\S]*?\*\/|\/\/.*\n|\s{2,}|\n|\t|\v|\s(?=function\(.*?\))|\s(?=\=)|\s(?=\{)/g,"").replace(/\s?function\s?\(/g,"function(").replace(/\s?\{\s?/g,"{").replace(/\s?\}\s?/g,"}").replace(/\,\s?/g,",").replace(/if\s?/g,"if") );
          }
          $("[data-action=tools].active").trigger("click");
        });
      },
      fullscreenEditor = function() {
        $(".fullscreen-html-toggle").click(function() {
          $(this).toggleClass("fill unfill");
          if ( $(".fullscreen-html-toggle.unfill").is(":visible") ) {
            $(this).html('<span class="fa fa-expand" id="fullscreen-html"></span>');
            GridScheme();
          } else if ( $(".fullscreen-html-toggle.fill").is(":visible") ) {
            $(this).html('<span class="fa fa-compress" id="fullscreen-html"></span>');
            $("#splitContainer").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "vertical",
              showSplitBar: false,
              panels: [{ size: "100%" },
                       { size: "100%" }]
            });
            $("#leftSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "100%" },
                       { size: "0%"}]
            });
            $("#rightSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "0%"},
                       { size: "0%"}]
            });
          }
        });
        $(".fullscreen-css-toggle").click(function() {
          $(this).toggleClass("fill unfill");
          if ( $(".fullscreen-css-toggle.unfill").is(":visible") ) {
            $(this).html('<span class="fa fa-expand" id="fullscreen-css"></span>');
            GridScheme();
          } else if ( $(".fullscreen-css-toggle.fill").is(":visible") ) {
            $(this).html('<span class="fa fa-compress" id="fullscreen-css"></span>');
            $("#splitContainer").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "vertical",
              showSplitBar: false,
              panels: [{ size: "100%" },
                       { size: "100%" }]
            });
            $("#leftSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "0%" },
                       { size: "100%"}]
            });
            $("#rightSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "100%"},
                       { size: "0%"}]
            });
          }
        });
        $(".fullscreen-js-toggle").click(function() {
          $(this).toggleClass("fill unfill");
          if ( $(".fullscreen-js-toggle.unfill").is(":visible") ) {
            $(this).html('<span class="fa fa-expand" id="fullscreen-js"></span>');
            GridScheme();
          } else if ( $(".fullscreen-js-toggle.fill").is(":visible") ) {
            $(this).html('<span class="fa fa-compress" id="fullscreen-js"></span>');
            $("#splitContainer").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "vertical",
              showSplitBar: false,
              panels: [{ size: "0%" },
                       { size: "100%" }]
            });
            $("#leftSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "0%" },
                       { size: "0%"}]
            });
            $("#rightSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "100%"},
                       { size: "0%"}]
            });
          }
        });
        $(".preview-mode-toggle").click(function() {
          $(this).toggleClass("fill unfill");
          if ( $(".preview-mode-toggle.unfill").is(":visible") ) {
            $(this).html('<span class="fa fa-expand" id="preview-mode"></span>');
            GridScheme();
          } else if ( $(".preview-mode-toggle.fill").is(":visible") ) {
            $(this).html('<span class="fa fa-compress" id="preview-mode"></span>');
            $("#splitContainer").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "vertical",
              showSplitBar: false,
              panels: [{ size: "0%" },
                       { size: "100%" }]
            });
            $("#leftSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "0%" },
                       { size: "0%"}]
            });
            $("#rightSplitter").jqxSplitter({
              height: "100%",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: false,
              panels: [{ size: "0%"},
                       { size: "100%"}]
            });
          }
        });
      },
      appDemos = function() {
        $("[data-action=alphabetizer]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Alphabetizer");
          htmlEditor.setValue("<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <a class=\"btn--default\" data-action=\"alphabetize\">Alphabetize</a>\n    <textarea class=\"form__input\" data-action=\"input-list\" rows=\"7\" placeholder=\"Alphabetize your text here...\">China\nIndia\nUnited States of America\nIndonesia\nBrazil\nPakistan\nNigeria\nBangladesh\nRussia\nJapan\nMexico\nPhilippines\nEthiopia\nVietnam\nEgypt\nGermany\nIran\nTurkey\nDemocratic Republic of the Congo\nFrance</textarea>\n  </div>\n</div>");
          cssEditor.setValue("");
          jsEditor.setValue("var txt = document.querySelector(\"[data-action=input-list]\");\ndocument.querySelector(\"[data-action=alphabetize]\").addEventListener(\"click\", function() {\n  txt.value = (txt.value.split(\"\\n\").sort(caseInsensitive).join(\"\\n\"));\n\n  function caseInsensitive(a, b) {\n    return a.toLowerCase().localeCompare(b.toLowerCase());\n  }\n});\n");
          $(".open-demos, #polyui").trigger("click");
        });
        $("[data-action=applicator]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Code Applicator");
          htmlEditor.setValue("<textarea id=\"addcode\" placeholder=\"Encode here...\"></textarea>\n<textarea id=\"encode\" readonly placeholder=\"Encoded code goes here...\"></textarea>\n<div id=\"decode\">Preview code here.</div>");
          cssEditor.setValue("body {\n  margin: 0;\n}\n\n::-webkit-input-placeholder { /* WebKit browsers */\n  color: #555;\n}\n:-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n  color: #555;\n}\n::-moz-placeholder { /* Mozilla Firefox 19+ */\n  color: #555;\n}\n:-ms-input-placeholder { /* Internet Explorer 10+ */\n  color: #555;\n}\n\n#addcode, #encode, #decode {\n  position: absolute;\n  font-family: monospace;\n  line-height: 1.4em;\n  font-size: 1em;\n  overflow: auto;\n  resize: none;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n#encode, #decode {\n  left: 0;\n  width: 50%;\n  height: 50%;\n  background-color: #fff;\n}\n\n#addcode {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  width: 50%;\n  height: 100%;\n  min-height: 1.4em;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n  color: #ccc;\n  background-color: #111;\n}\n\n#encode {\n  top: 0;\n}\n\n#decode {\n  bottom: 0;\n}\n");
          jsEditor.setValue("document.querySelector(\"#addcode\").addEventListener(\"keyup\", function() {\n  document.querySelector(\"#encode\").textContent = this.value;\n  document.querySelector(\"#encode\").textContent = document.querySelector(\"#encode\").innerHTML;\n  document.querySelector(\"#decode\").innerHTML = this.value;\n  return false;\n});\n\ndocument.querySelector(\"#encode\").addEventListener(\"click\", function() {\n  this.select();\n  return false;\n});\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=catchthesquare]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Catch the Squares");
          htmlEditor.setValue("<div class=\"catch\">\n  counter\n</div>");
          cssEditor.setValue("body {\n  background-color: rgb(0, 14, 40);\n  font-family: arial;\n  color: rgb(255, 255, 255);\n  padding: 0;\n  margin: 0;\n}\n\n.catch {\n  top: 0;\n  left: 1px;\n  padding: 1em;\n  font-family: courier;\n  font-size: 23px;\n  font-weight: bold;\n  color: rgb(188, 255, 193);\n}");
          jsEditor.setValue("var count = 0;\n$(\".catch\").empty();\n\n(function makeDiv(){\n  var divsize = ((Math.random() * 100)  +  50).toFixed();\n  var color = \"#\" +  Math.round(0xffffff * Math.random()).toString(16);\n  $newdiv = $(\"<div class=\\\"grab\\\">\").css({\n    \"width\": divsize + \"px\",\n    \"height\": divsize + \"px\",\n    \"background-color\":  color\n  });\n\n  var posx = (Math.random() * ($(document).width() - divsize)).toFixed();\n  var posy = (Math.random() * ($(document).height() - divsize)).toFixed();\n\n  $newdiv.css({\n    \"position\": \"absolute\",\n    \"left\": posx + \"px\",\n    \"top\": posy + \"px\",\n    \"display\": \"none\"\n  }).appendTo(\"body\").fadeIn(100).delay(300).fadeOut(200, function(){\n    $(this).remove();\n    makeDiv(); \n    $(\".grab\").bind(\"click\", function() { \n      count++;\n      $(\".catch\").html(count);\n    });\n  }); \n})();");
          $(".open-demos, #jquery").trigger("click");
        });
        $("[data-action=charactermap]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Character Map");
          htmlEditor.setValue("<iframe src=\"http://dev.w3.org/html5/html-author/charref\"></iframe>");
          cssEditor.setValue("html, body {\n  height: 100%;\n}\n\niframe {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}");
          jsEditor.setValue("");
          $(".open-demos").trigger("click");
        });
        $("[data-action=codeeditor]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Code Editor");
          htmlEditor.setValue("<script src=\"http://codemirror.net/lib/codemirror.js\"></script>\n<script src=\"http://codemirror.net/javascripts/code-completion.js\"></script>\n<script src=\"http://codemirror.net/javascripts/css-completion.js\"></script>\n<script src=\"http://codemirror.net/javascripts/html-completion.js\"></script>\n<script src=\"http://codemirror.net/mode/javascript/javascript.js\"></script>\n<script src=\"http://codemirror.net/mode/xml/xml.js\"></script>\n<script src=\"http://codemirror.net/mode/css/css.js\"></script>\n<script src=\"http://codemirror.net/mode/htmlmixed/htmlmixed.js\"></script>\n<script src=\"http://codemirror.net/addon/edit/closetag.js\"></script>\n<script src=\"http://codemirror.net/addon/edit/matchbrackets.js\"></script>\n<script src=\"http://codemirror.net/addon/selection/active-line.js\"></script>\n<script src=\"http://codemirror.net/keymap/extra.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/foldcode.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/foldgutter.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/brace-fold.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/xml-fold.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/comment-fold.js\"></script>\n\n<textarea id=\"code\"><!doctype html>\n<html>\n  <head>\n    <meta charset=utf-8>\n    <title>HTML5 canvas demo</title>\n    <style>p {font-family: monospace;}</style>\n  </head>\n  <body>\n    <p>Canvas pane goes here:</p>\n    <canvas id=pane width=300 height=200></canvas>\n\n    <script>\n      var canvas = document.getElementById(\"pane\");\n      var context = canvas.getContext(\"2d\");\n\n      context.fillStyle = \"rgb(250,0,0)\";\n      context.fillRect(10, 10, 55, 50);\n\n      context.fillStyle = \"rgba(0, 0, 250, 0.5)\";\n      context.fillRect(30, 30, 55, 50);\n    </script>\n  </body>\n</html></textarea>\n\n<iframe id=\"preview\"></iframe>");
          cssEditor.setValue("@import url(\"http://codemirror.net/lib/codemirror.css\");\n@import url(\"http://codemirror.net/addon/fold/foldgutter.css\");\n\n.CodeMirror {\n  float: left;\n  width: 50%;\n  border: 1px solid black;\n}\n\niframe {\n  width: 49%;\n  float: left;\n  height: 300px;\n  border: 1px solid black;\n  border-left: 0;\n}");
          jsEditor.setValue("var delay;\n\n// Initialize CodeMirror editor\nvar editor = CodeMirror.fromTextArea(document.getElementById(\"code\"), {\n  mode: \"text/html\",\n  tabMode: \"indent\",\n  styleActiveLine: true,\n  lineNumbers: true,\n  lineWrapping: true,\n  autoCloseTags: true,\n  foldGutter: true,\n  dragDrop : true,\n  gutters: [\"CodeMirror-linenumbers\", \"CodeMirror-foldgutter\"]\n});\n\n// Live preview\neditor.on(\"change\", function() {\n  clearTimeout(delay);\n  delay = setTimeout(updatePreview, 300);\n});\n\nfunction updatePreview() {\n  var previewFrame = document.getElementById(\"preview\");\n  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;\n  preview.open();\n  preview.write(editor.getValue());\n  preview.close();\n}\nsetTimeout(updatePreview, 300);\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=convertforvalues]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Convert for Values");
          htmlEditor.setValue("<textarea class=\"editor\" placeholder=\"Code with multiple lines here...\"></textarea>\n<textarea class=\"preview\" placeholder=\"Generated result here...\"></textarea>");
          cssEditor.setValue("body {\n  margin: 0;\n  background: #333;\n}\n\n.editor, .preview {\n  position: absolute;\n  width: 50%;\n  height: 100%;\n  padding: 0;\n  font-family: monospace;\n  min-height: 1.4em;\n  line-height: 1.4em;\n  font-size: 1em;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n}\n\n.editor {\n  left: 0;\n  color: #0b0;\n  background-color: #000;\n}\n\n::-webkit-input-placeholder { /* WebKit browsers */\n  color: #0f6;\n}\n:-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n  color: #0f6;\n}\n::-moz-placeholder { /* Mozilla Firefox 19+ */\n  color: #0f6;\n}\n:-ms-input-placeholder { /* Internet Explorer 10+ */\n  color: #0f6;\n}\n\n.preview {\n  right: 0;\n  background-color: #fff;\n}\n");
          jsEditor.setValue("$(document).ready(function() {\n  var editor = $(\".editor\"),\n      preview = $(\".preview\");\n  \n  // Remove new line and insert new line showing the text in value\n  editor.keyup(function() {\n    preview.val( this.value.replace(/\"/g,'\\\\\"').replace(/\\n/g,\"\\\\n\") );\n  }).click(function() {\n    this.select();\n  });\n  \n  // Easily Select Converted Code\n  preview.click(function() {\n    this.select();\n  });\n});\n");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=dateclock]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Date and Time");
          htmlEditor.setValue("<span class=\"date\" data-action=\"leftdate\"></span>\n<span class=\"date fr\" data-action=\"rightdate\"></span>\n<div class=\"clock\" data-action=\"clock\"></div>\n");
          cssEditor.setValue(".date {\n  font-family: arial;\n}\n\n.fr {\n  float: right;\n}\n\n.clock {\n  font: bold 1.5em sans;\n  text-align: center;\n}");
          jsEditor.setValue("// Define a function to display the current time\nfunction displayTime() {\n  var now = new Date();\n  document.querySelector('[data-action=clock]').innerHTML =  now.toLocaleTimeString();\n  setTimeout(displayTime, 1000);\n}\ndisplayTime();\n\n// Date\nvar currentTime = new Date();\nvar month = currentTime.getMonth() + 1;\nvar date = currentTime.getDate();\nvar year = currentTime.getFullYear();\ndocument.querySelector('[data-action=leftdate]').innerHTML = month + '/' + date + '/' + year;\n\nvar today = new Date();\nif (year < 1000)\n  year += 1900;\nvar day = today.getDay();\nvar monthname = today.getMonth();\nif (date < 10)\n  date = '0' + date;\nvar dayarray = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');\nvar montharray = new Array('January','February','March','April','May','June','July','August','September','October','November','December');\ndocument.querySelector('[data-action=rightdate]').innerHTML = dayarray[day] + ', ' + montharray[monthname] + ' ' + date + ', ' + year;\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=detectorientation]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Detect Orientation");
          htmlEditor.setValue("<h1 class=\"portrait\">Portrait</h1>\n<h1 class=\"landscape\">Landscape</h1>\n<footer class=\"foot\"></footer>");
          cssEditor.setValue("body {\n  font: 26px arial;\n}\n.portrait, .landscape, .foot {\n  text-align: center;\n}\n.foot {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 26px;\n}\n");
          jsEditor.setValue("var detectOrientation = function() {\n  if ( window.innerWidth > window.innerHeight ) {\n    document.querySelector(\".landscape\").style.display = \"block\";\n    document.querySelector(\".portrait\").style.display = \"none\";\n  } else if ( window.innerWidth < window.innerHeight ) {\n    document.querySelector(\".landscape\").style.display = \"none\";\n    document.querySelector(\".portrait\").style.display = \"block\";\n  }\n  document.querySelector(\".foot\").innerHTML =  window.innerWidth + \"px, \" + window.innerHeight + \"px\";\n};\n\nwindow.addEventListener(\"resize\", function() {\n  detectOrientation();\n});\n\ndetectOrientation();\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=osdisplay]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Detect Operating System");
          htmlEditor.setValue("<div data-output=\"os\"></div>");
          jsEditor.setValue("document.addEventListener(\"DOMContentLoaded\", function() {\n  document.querySelector(\"[data-output=os]\").innerHTML = \"<strong>Operating System</strong>: \" + navigator.platform;\n});");
          $(".open-demos").trigger("click");
        });
        $("[data-action=keylogger]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Keylogger");
          htmlEditor.setValue("<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <input type=\"text\" class=\"form-control\" data-action=\"input\" placeholder=\"Type here for keyCode\" />\n    </div>\n  </div>\n</div>");
          cssEditor.setValue("html, body {\n  height: 100%;\n}\n\nbody {\n  padding: 1em 0;\n  background: #0072ff;\n}\n\n.form-control {\n  border-radius: 5px;\n  box-shadow: 0 0 25px #00162d;\n}");
          jsEditor.setValue("$(\"[data-action=input]\").keydown(function(e) {\n  this.value = e.which;\n  e.preventDefault();\n});");
          $(".open-demos, #jquery, #bootstrap").trigger("click");
        });
        $("[data-action=newdocument]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("site title");
          htmlEditor.setValue("");
          cssEditor.setValue("");
          jsEditor.setValue("");
          $(".open-demos").trigger("click");
        });
        $("[data-action=packagezipfiles]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Package Zip Files [JSZip Demo]");
          htmlEditor.setValue("<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <button class=\"btn--default download\">Run</button>\n    <textarea class=\"form__input\" id=\"jszipdemo\" rows=\"7\" placeholder=\"Demo code here...\">var zip = new JSZip();\nzip.file(\"Hello.txt\", \"Hello World\");\nvar folder = zip.folder(\"images\");\nfolder.file(\"folder.txt\", \"I'm a file in a new folder\");\nvar content = zip.generate({type:\"blob\"});\n// see FileSaver.js\nsaveAs(content, \"example.zip\");</textarea>\n  </div>\n</div>\n");
          cssEditor.setValue("");
          jsEditor.setValue("$(\".download\").click(function() {\n  eval( $(\"#jszipdemo\").val() );\n});\n");
          $(".open-demos, #polyui, #jquery, #jszip").trigger("click");
        });
        $("[data-action=passwordgen]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Password Generator");
          htmlEditor.setValue("<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" data-action=\"genoutput\" />\n        <span class=\"input-group-btn\">\n          <button class=\"btn btn-default btn-primary\" type=\"button\" data-action=\"gen\">\n            Generate!\n          </button>\n        </span>\n      </div>\n    </div>\n  </div>\n</div>");
          cssEditor.setValue("html, body {\n  height: 100%;\n}\n\nbody {\n  padding: 1em 0;\n  background: #0072ff;\n}\n\n.input-group {\n  box-shadow: 0 0 25px #00162d;\n}\n\n.input-group, .form-control, .input-group-btn, .btn {\n  border-radius: 5px;\n}");
          jsEditor.setValue("function PasswordGen() {\n  var char = \"0123456789abcdefghijklmnopqrstuvwxyz\";\n    var fullchar = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\";\n    var genHash = \"\";\n    var i;\n    \n    for (i = 0; i < 8; i++) {\n      var rnum = Math.floor(Math.random() * char.length);\n      genHash += char.substring(rnum, rnum + 1);\n    }\n    \n    $(\"[data-action=genoutput]\").val(genHash);\n}\n\n$(\"[data-action=gen]\").click(function() {\n  PasswordGen();\n});\n\nPasswordGen();\n");
          $(".open-demos, #jquery, #bootstrap").trigger("click");
        });
        $("[data-action=pdfembed]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Embed a PDF Example");
          htmlEditor.setValue("<embed width=\"100%\" height=\"100%\" name=\"plugin\" src=\"http://www.usconstitution.net/const.pdf\" type=\"application/pdf\">");
          cssEditor.setValue("html, body {\n  height: 100%;\n  overflow: hidden;\n}");
          jsEditor.setValue("");
          $(".open-demos, #normalize").trigger("click");
        });
        $("[data-action=pictureviewer]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("FileReader Picture Viewer");
          htmlEditor.setValue("<div id=\"holder\">\n  Drag and drop image <a data-action=\"call\" href=\"javascript:void()\">here</a>...\n</div> \n\n<div class=\"fill check hide\" align=\"center\">\n  <canvas class=\"logo\" width=\"128\" height=\"128\"></canvas>\n</div>\n\n<div class=\"hide\">\n  <input type=\"file\" data-action=\"load\">\n</div>\n\n<p id=\"status\">\n  File API &amp; FileReader API not supported\n</p>");
          cssEditor.setValue("#holder {\n  border: 10px dashed #ccc;\n  margin: 20px auto;\n  text-align: center;\n}\n#holder.hover {\n  border: 10px dashed #333;\n}\n\n.hide {\n  display: none;\n}\n.fill {\n  width: 100%;\n}");
          jsEditor.setValue("var canvas = $(\".logo\"),\n    ctx = canvas[0].getContext(\"2d\"),\n    holder = document.getElementById(\"holder\"),\n    state = document.getElementById(\"status\");\n\nif (typeof window.FileReader === \"undefined\") {\n  state.className = \"fail\";\n} else {\n  state.className = \"success\";\n  state.innerHTML = \"File API & FileReader available\";\n}\n\nfunction displayPreview(file) {\n  var reader = new FileReader();\n\n  reader.onload = function(e) {\n    var img = new Image();\n    img.src = e.target.result;\n    img.onload = function() {\n      // x, y, width, height\n      ctx.drawImage(img, 0, 0, 128, 128);\n    };\n  };\n  reader.readAsDataURL(file);\n}\n\n$(\"[data-action=call]\").click(function() {\n  $(\"[data-action=load]\").trigger(\"click\");\n});\n\n$(\"[data-action=load]\").change(function(e) {\n  var file = e.target.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n});\n\n// Drag and drop image load\nholder.ondragover = function () {\n  this.className = \"hover\";\n  return false;\n};\nholder.ondragend = function () {\n  this.className = \"\";\n  return false;\n};\nholder.ondrop = function(e) {\n  this.className = \"\";\n  e.preventDefault();\n  var file = e.dataTransfer.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n};\n");
          $(".open-demos, #jquery").trigger("click");
        });
        $("[data-action=polyui]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Poly UI Kit");
          htmlEditor.setValue("<div class=\"grid\">\n  <header class=\"grid__col--12 panel--padded--centered\" role=\"banner\"> \n    <a class=\"site-logo\" href=\"javascript:void(0)\">\n      <b class=\"srt\">Poly - UI Toolkit</b>\n    </a>\n    <nav class=\"navbar\" role=\"navigation\">\n      <span id=\"toggle\" class=\"icn--nav-toggle is-displayed-mobile\">\n        <b class=\"srt\">Toggle</b>\n      </span>   \n      <ul class=\"nav is-collapsed-mobile\" role=\"navigation\">\n        <li class=\"nav__item\"><a href=\"#type\">Typography</a></li>\n        <li class=\"nav__item\"><a href=\"#buttons\">Buttons</a></li>\n        <li class=\"nav__item\"><a href=\"#forms\">Form</a></li>\n        <li class=\"nav__item\"><a href=\"#images\">Images</a></li>\n        <li class=\"nav__item\"><a href=\"#grid\">Grid</a></li>\n        <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li>\n        <!-- Current Page Class Style -->\n        <!-- <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li> -->\n      </ul>\n    </nav>\n  </header>\n</div>\n\n<div class=\"grid is-hidden-mobile\">\n  <div class=\"grid__col--12\">\n    <img class=\"img--hero\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/hero.jpg\" alt=\"Poly - A simple UI Kit\">\n  </div>\n</div>\n\n<h4 id=\"type\" class=\"grid\">Typography</h4>\n\n<div class=\"grid\">\n  <div class=\"centered grid__col--8\">\n    <h1 class=\"headline-primary--grouped\">Take a look at this amazing headline</h1>\n    <h2 class=\"headline-secondary--grouped\">Don't forget about the subtitle</h2>\n    <p>This is a typical paragraph for the UI Kit. <a href=\"#\">Here is what a link might look like</a>. The typical font family for this kit is Helvetica Neue.  This kit is intended for clean and refreshing web layouts. No jazz hands here, just the essentials to make dreams come true, with minimal clean web design. The kit comes fully equipped with everything from full responsive media styling to buttons to form fields. <em>I enjoy using italics as well from time to time</em>. Fell free to create the most amazing designs ever with this kit. I truly hope you enjoy not only the kit but this amazing paragraph as well. :)</p>\n    <blockquote>You know what really gets me going? A really nice set of block quotes.  That's right, block quotes that say, \"Hey, I'm an article you want to read and nurture.\"</blockquote>\n  </div>\n</div>\n\n<h4 id=\"buttons\" class=\"grid\">Buttons</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <a class=\"btn--default\" href=\"#\">Button Default</a>\n    <a class=\"btn--success\" href=\"#\">Button Success</a>\n    <a class=\"btn--error\" href=\"#\">Button Error</a>\n    <button class=\"btn--warning\">Button Warning</button>\n    <button class=\"btn--info\">Button Info</button>\n  </div>\n</div>\n\n<h4 id=\"forms\" class=\"grid\">Form Elements</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\"> \n    <form class=\"form\">\n      <label class=\"form__label--hidden\" for=\"name\">Name:</label> \n      <input class=\"form__input\" type=\"text\" id=\"name\" placeholder=\"Name\">\n\n      <label class=\"form__label--hidden\" for=\"email\">Email:</label>\n      <input class=\"form__input\" type=\"email\" id=\"email\" placeholder=\"email@website.com\">\n\n      <label class=\"form__label--hidden\" for=\"msg\">Message:</label>\n      <textarea class=\"form__input\" id=\"msg\" placeholder=\"Message...\" rows=\"7\"></textarea>\n\n      <input class=\"btn--default\" type=\"submit\" value=\"Submit\">\n      <input class=\"btn--warning\" type=\"reset\" value=\"Reset\">\n    </form>\n  </div>\n  <div class=\"grid__col--4\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n    <form>\n      <label class=\"form__label--hidden\" for=\"username\">Username:</label> \n      <input class=\"form__input\" type=\"text\" id=\"username\" placeholder=\"Username\">\n      <label class=\"form__label--hidden\" for=\"password\">Password:</label>\n      <input class=\"form__input\" type=\"password\" id=\"password\" placeholder=\"Password\">\n      <input class=\"form__btn\" type=\"submit\" value=\"Login\">\n    </form>\n  </div>\n</div>\n\n<h4 id=\"images\" class=\"grid\">Images</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--5\">\n    <img src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--5\">\n    <img class=\"img--wrap\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--2\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n  </div>\n</div>\n\n<h4 id=\"grid\" class=\"grid\">Grid System</h4>\n\n<div class=\"theme__poly\">\n  <div class=\"grid\">\n    <div class=\"grid__col--12\">.grid__col--12</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--6\">.grid__col--6</div>\n    <div class=\"grid__col--6\">.grid__col--6</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--5\">.grid__col--5</div>\n    <div class=\"grid__col--7\">.grid__col--7</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--8\">.grid__col--8</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"centered grid__col--7\">.centered .grid__col--7</div>\n  </div>\n</div>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\">\n    <h4 id=\"nav\">Navigation</h4>\n    <ul class=\"nav\" role=\"navigation\">\n      <li class=\"nav__item\"><a href=\"#\">Nav Link</a></li>\n      <li class=\"nav__item\"><a href=\"#\">Nav Link 2</a></li>\n      <li class=\"nav__item--current\"><a href=\"#\">Nav Current</a></li>\n    </ul>\n    <p>This is what the navigation menu looks like when the screen is at 769px or higher. When the screen is less than 769px, you will have the option to display a toggle menu icon.</p>\n  </div>\n\n  <div class=\"grid__col--4\">\n    <h4>Offcanvas Menu</h4>\n    <div class=\"offcanvas\">\n      <span class=\"icn--close\">\n        <b class=\"srt\">close</b>\n      </span>\n      <ul class=\"menu\" role=\"navigation\">\n        <a class=\"menu__link\" href=\"#\">Link 1</a>\n        <a class=\"menu__link\" href=\"#\">Link 2</a>\n        <a class=\"menu__link\" href=\"#\">Link 3</a>\n        <a class=\"menu__link--end\" href=\"#\">Link 4</a>\n      </ul>\n    </div>\n  </div>\n</div>");
          cssEditor.setValue("@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900\");\n\n.grid:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.srt, .form__label--hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.panel--centered, .panel--padded--centered, [class^=\"btn--\"] {\n  text-align: center; }\n\n[class^=\"progbar__\"]:after, .icn--nav-toggle:before {\n  display: block;\n  content: '';\n  position: absolute; }\n\n.centered, .grid {\n  float: none;\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\n*\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbody {\n  color: #797e83;\n  font-size: 16px;\n  font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.5; }\n\nh3 {\n  font-size: 1.125em; }\n\nh4 {\n  margin-top: 1.375em;\n  margin-bottom: 2.57143em;\n  color: #d6d7d9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 400;\n  font-size: 0.875em; }\n  @media (min-width: 769px) {\n    h4 {\n      margin-top: 2.625em; } }\n\na {\n  color: #656a6e;\n  text-decoration: none;\n  font-weight: 400; }\n\np {\n  margin: 0 0 1.66667em;\n  font-weight: 300;\n  font-size: 1.125em;\n  line-height: 1.5; }\n\nblockquote {\n  font-weight: 300;\n  font-style: italic;\n  font-size: 1.25em; }\n  @media (min-width: 769px) {\n    blockquote {\n      margin: 1.33333em 0;\n      padding: 0 0 0 5%;\n      border-left: 0.33333em solid #ebecec;\n      font-size: 1.5em; } }\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n\nimg {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  height: auto; }\n\ninput,\ntextarea {\n  display: block;\n  padding: 15px;\n  width: 100%;\n  outline: 0;\n  border: 0; }\n\ninput:focus,\ntextarea:focus {\n  transition: 0.3s; }\n\nbutton {\n  outline: 0; }\n\nfooter {\n  border-top: 1px solid #ebecec; }\n  footer p {\n    font-size: 1em;\n    margin-top: 1.375em; }\n\n.panel, .panel--centered {\n  padding-top: 1.875em; }\n  @media (min-width: 769px) {\n    .panel, .panel--centered {\n      padding-bottom: 1.25em; } }\n\n.panel--padded, .panel--padded--centered {\n  padding-top: 2.125em; }\n  @media (min-width: 769px) {\n    .panel--padded, .panel--padded--centered {\n      padding-top: 5em;\n      padding-bottom: 2.125em; } }\n\n.grid {\n  width: 90%; }\n  [class*=\"grid__col--\"] > .grid {\n    width: 100%; }\n  @media (min-width: 1100px) {\n    .grid {\n      max-width: 1050px; } }\n\n@media (min-width: 769px) {\n  .grid__col--1 {\n    width: 6.5%; }\n  .grid__col--2 {\n    width: 15%; }\n  .grid__col--3 {\n    width: 23.5%; }\n  .grid__col--4 {\n    width: 32%; }\n  .grid__col--5 {\n    width: 40.5%; }\n  .grid__col--6 {\n    width: 49%; }\n  .grid__col--7 {\n    width: 57.5%; }\n  .grid__col--8 {\n    width: 66%; }\n  .grid__col--9 {\n    width: 74.5%; }\n  .grid__col--10 {\n    width: 83%; }\n  .grid__col--11 {\n    width: 91.5%; }\n  .grid__col--12 {\n    width: 100%; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  [class^=\"grid__col--\"] {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em; } }\n@media (min-width: 769px) {\n  [class^=\"grid__col--\"] {\n    float: left;\n    min-height: 1px;\n    padding-left: 10px;\n    padding-right: 10px; }\n    [class^=\"grid__col--\"] + [class^=\"grid__col--\"] {\n      margin-left: 2%; }\n    [class^=\"grid__col--\"]:last-of-type {\n      float: right; } }\n\n.theme__poly .grid [class*=\"grid__col\"] {\n  font-weight: 100;\n  margin-bottom: 1em;\n  padding: 1.75%; }\n\n@media (min-width: 769px) {\n  .nav__item, .nav__item--current {\n    display: inline-block;\n    margin: 0 0.625em; } }\n\n.nav__item--current a, .nav__item a {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    .nav__item--current a, .nav__item a {\n      border-bottom-color: #ebecec;\n      padding-top: 0.77778em;\n      padding-bottom: 0.77778em; } }\n\n.nav__item--current a, .nav__item a:hover {\n  color: #0b0b0b;\n  border-color: #52bab3; }\n\nh1, .headline-primary, .headline-primary--grouped {\n  color: #525559;\n  font-weight: 300;\n  font-size: 2.625em;\n  line-height: 1.09524;\n  margin-top: 0; }\n\nh2, .headline-secondary, .headline-secondary--grouped {\n  color: #999da1;\n  letter-spacing: 1px;\n  font-weight: 100;\n  font-size: 1.5em;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\n.form__btn, [class^=\"btn--\"] {\n  padding: 15px 30px;\n  border: 0;\n  border-radius: 0.4em;\n  color: #fff;\n  text-transform: uppercase;\n  font-size: 0.875em;\n  font-weight: 400;\n  transition: opacity 0.3s;\n  display: block; }\n  .form__btn:hover, [class^=\"btn--\"]:hover {\n    opacity: .75; }\n  .form__btn:active, [class^=\"btn--\"]:active {\n    opacity: initial; }\n\n.menu__link, .menu__link--end {\n  display: block;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px rgba(11, 11, 11, 0.2);\n  font-size: 1.125em; }\n\n.icn--nav-toggle, .icn--close {\n  line-height: 0;\n  cursor: pointer; }\n\n.img--wrap {\n  border: 1px solid #d6d7d9;\n  padding: 0.75em; }\n.img--avatar {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%; }\n  @media (min-width: 769px) {\n    .img--avatar {\n      margin-top: 1.5em; } }\n@media (min-width: 769px) {\n  .img--hero {\n    margin-bottom: 2.625em; } }\n\n.headline-primary {\n  margin-bottom: 1.66667em; }\n  .headline-primary--grouped {\n    margin-bottom: 0; }\n.headline-secondary {\n  margin-bottom: 0.91667em; }\n  .headline-secondary--grouped {\n    margin-top: 0.41667em;\n    margin-bottom: 2.25em; }\n\n.form__label {\n  display: block;\n  margin-bottom: 0.625em; }\n.form__input {\n  font-size: 1.125em;\n  margin-bottom: 1.11111em;\n  border-bottom: 6px solid #d6d7d9;\n  border-radius: 0.4em;\n  background: #ebecec;\n  color: black;\n  font-weight: 300; }\n  .form__input:focus {\n    border-color: #52bab3; }\n.form__btn {\n  background: #52bab3; }\n\n.btn--default {\n  background-color: #52bab3; }\n.btn--success {\n  background-color: #5ece7f; }\n.btn--error {\n  background-color: #e67478; }\n.btn--warning {\n  background-color: #ff784f; }\n.btn--info {\n  background-color: #9279c3; }\n\n[class^=\"btn--\"] {\n  margin-bottom: 1.42857em; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    [class^=\"btn--\"] {\n      width: 100%; } }\n  @media (min-width: 769px) {\n    [class^=\"btn--\"] {\n      width: auto;\n      display: inline-block; }\n      [class^=\"btn--\"] + [class^=\"btn--\"] {\n        margin-left: 20px; } }\n\n.navbar {\n  position: relative; }\n  @media (min-width: 769px) {\n    .navbar {\n      margin-top: 3.375em;\n      margin-bottom: 0; } }\n\n.nav {\n  margin-top: 1.25em;\n  margin-bottom: 1.875em; }\n  .nav__item a {\n    color: #797e83; }\n\n.offcanvas {\n  position: relative;\n  padding: 0.625em;\n  letter-spacing: 1px;\n  background: #39add1;\n  background: linear-gradient(45deg, rgba(94, 206, 127, 0.8) 0%, #39add1 100%); }\n\n.menu {\n  margin-top: 1.25em; }\n  .menu__link {\n    border-bottom: solid 1px rgba(255, 255, 255, 0.3); }\n\n.progbar {\n  height: 4px;\n  border-radius: 2px;\n  background: #d6d7d9;\n  position: relative;\n  margin-bottom: 2.875em; }\n  .progbar__status--default {\n    background-color: #52bab3; }\n    .progbar__status--default:after {\n      background-color: #6fc6c0; }\n  .progbar__status--success {\n    background-color: #5ece7f; }\n    .progbar__status--success:after {\n      background-color: #7dd898; }\n  .progbar__status--error {\n    background-color: #e67478; }\n    .progbar__status--error:after {\n      background-color: #ec979a; }\n  .progbar__status--warning {\n    background-color: #ff784f; }\n    .progbar__status--warning:after {\n      background-color: #ff9778; }\n  .progbar__status--info {\n    background-color: #9279c3; }\n    .progbar__status--info:after {\n      background-color: #a995d0; }\n\n[class^=\"progbar__\"] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  border-radius: inherit;\n  position: relative; }\n  [class^=\"progbar__\"]:after {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    right: -10px;\n    top: -8px; }\n\n.site-logo {\n  background-image: url(\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/logo.svg\");\n  background-repeat: no-repeat;\n  width: 115px;\n  height: 45px;\n  display: inline-block; }\n\n.icn--nav-toggle {\n  width: 25px;\n  height: 17px;\n  border-top: solid 3px #797e83;\n  border-bottom: solid 3px #797e83;\n  position: relative; }\n  .icn--nav-toggle:before {\n    width: 25px;\n    height: 3px;\n    background: #999da1;\n    top: 4px; }\n.icn--close {\n  background-image: url(\"img/icn-close.svg\");\n  background-repeat: no-repeat;\n  width: 20px;\n  height: 20px;\n  display: block;\n  position: absolute;\n  right: 4%;\n  top: 4%; }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-displayed-mobile {\n    display: block; }\n    .is-hidden-mobile {\n      display: none; } }\n@media (min-width: 769px) {\n  .is-displayed-mobile {\n    display: none; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-collapsed-mobile {\n    visibility: collapse;\n    padding: 0;\n    height: 0;\n    margin: 0;\n    line-height: 0; } }\n\n.theme__poly .grid__col--12 {\n  background-color: #DEF4E5; }\n\n.theme__poly .grid__col--8 {\n  background-color: #DCE0F2; }\n\n.theme__poly .grid__col--7 {\n  background-color: #DCF0EF; }\n\n.theme__poly .grid__col--6 {\n  background-color: #FFE3DB; }\n\n.theme__poly .grid__col--4 {\n  background-color: #F8EDD0; }\n\n.theme__poly .grid__col--5 {\n  background-color: #EAEBEC; }\n\n.theme__poly .grid__col--2 {\n  background-color: #C5E2CE; }\n\n.theme__poly .grid__col--3 {\n  background-color: #D6EEF5; }\n\n/*# sourceMappingURL=application.css.map */\n\n/* Tabs */\n.tabs input[type=radio] {\n  display: none;\n}\n.tabs {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n}\n.tabs li {\n  float: left;\n}\n.tabs label {\n  display: inline-block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.tabs label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.tab-content {\n  z-index: 2;\n  display: none;\n  left: 0;\n  width: 100%;\n  padding: 1em 0.4em;\n  position: absolute;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=tab]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=tab]:checked ~ [id^=tab-content] {\n  display: block;\n}\n\n/* Accordion */\n.accordion input[type=radio] {\n  display: none;\n}\n.accordion {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n  margin-top: 1.25em;\n}\n.accordion label {\n  display: block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.accordion label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.acc-content {\n  z-index: 2;\n  display: none;\n  width: 100%;\n  padding: 1em 0.4em;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=acc]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=acc]:checked ~ [id^=acc-content] {\n  display: block;\n}\n.grid {\n  text-align: left;\n}\n");
          jsEditor.setValue("// Toggle Menu for Phones\n$(\"#toggle\").click(function() {\n  $(this).next(\".nav\").toggleClass(\"is-collapsed-mobile\");\n});\n\n// Handles Navigation Style Classes\n$(\".nav__item\").on(\"click\", function() {\n  $(this).parent().find(\"li\").removeClass(\"nav__item--current\").addClass(\"nav__item\");\n  $(this).addClass(\"nav__item--current\").removeClass(\"nav__item\");\n});");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=simpleslideshow]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("Simplest jQuery Slideshow");
          htmlEditor.setValue("<div class=\"fadelinks\">\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2610/4148988872_990b6da667.jpg\">\n  </a>\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2597/4121218611_040cd7b3f2.jpg\">\n  </a>\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2531/4121218751_ac8bf49d5d.jpg\">\n  </a>\n</div>\n");
          cssEditor.setValue("body {\n  font-family: arial, helvetica, sans-serif;\n  font-size: 12px;\n}\n\n.fadelinks {\n  position: relative;\n  height: 332px;\n  width: 500px;\n}\n\n.fadelinks > a {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n}");
          jsEditor.setValue("$(document).ready(function(){\n  $('.fadelinks > :gt(0)').hide();\n  setInterval(function() {\n    $('.fadelinks > :first-child').fadeOut().next().fadeIn().end().appendTo('.fadelinks');\n  }, 3000);\n});");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=splitter]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $("[data-action=sitetitle]").val("JQWidgets Splitter");
          htmlEditor.setValue("<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/jquery-1.11.1.min.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxcore.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxsplitter.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/demos.js\"></script>\n\n<div id=\"mainSplitter\">\n  <div>\n    <div id=\"firstNested\">\n      <div>\n        <div id=\"secondNested\">\n          <div>\n            <span>Panel 1</span></div>\n          <div>\n            <span>Panel 2</span></div>\n        </div>\n      </div>\n      <div>\n        <span>Panel 3</span></div>\n    </div>\n  </div>\n  <div>\n    <div id=\"thirdNested\">\n      <div>\n        <span>Panel 4</span></div>\n      <div>\n        <span>Panel 5</span></div>\n    </div>\n  </div>\n</div>\n");
          cssEditor.setValue("@import url(\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/styles/jqx.base.css\");");
          jsEditor.setValue("$(document).ready(function () {\n  $(\"#mainSplitter\").jqxSplitter({\n    width: 850,\n    height: 850,\n    orientation: \"horizontal\",\n    panels: [{\n      size: 300,\n      collapsible: false\n    }]\n  });\n  $(\"#firstNested\").jqxSplitter({\n    width: \"100%\",\n    height: \"100%\",\n    orientation: \"vertical\",\n    panels: [{\n      size: 300,\n      collapsible: false\n    }]\n  });\n  $(\"#secondNested\").jqxSplitter({\n    width: \"100%\", \n    height: \"100%\", \n    orientation: \"horizontal\",\n    panels: [{ size: 150 }]\n  });\n  $(\"#thirdNested\").jqxSplitter({\n    width: \"100%\",\n    height: \"100%\", \n    orientation: \"horizontal\",\n    panels: [{\n      size: 150,\n      collapsible: false\n    }]\n  });\n});\n");
          $(".open-demos, #jquery").trigger("click");
        });
      },
      charGeneration = function() {
        $("#undo").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            htmlEditor.undo();
          } else if ( activeEditor.val() === "cssEditor" ) {
            cssEditor.undo();
          } else if ( activeEditor.val() === "jsEditor" ) {
            jsEditor.undo();
          }
        });
        $("#redo").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            htmlEditor.redo();
          } else if ( activeEditor.val() === "cssEditor" ) {
            cssEditor.redo();
          } else if ( activeEditor.val() === "jsEditor" ) {
            jsEditor.redo();
          }
        });
        $("#tabindent").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            htmlEditor.replaceRange("  ", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            cssEditor.replaceRange("  ", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            jsEditor.replaceRange("  ", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym1").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange("<>", htmlEditor.getCursor());
            htmlEditor.focus();
            var str = ">";
            var mynum = str.length;
            var start_cursor = htmlEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            htmlEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            htmlEditor.replaceRange(selected_text, htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange("<>", cssEditor.getCursor());
            cssEditor.focus();
            var str = ">";
            var mynum = str.length;
            var start_cursor = cssEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            cssEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            cssEditor.replaceRange(selected_text, cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange("<>", jsEditor.getCursor());
            jsEditor.focus();
            var str = ">";
            var mynum = str.length;
            var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            jsEditor.replaceRange(selected_text, jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym2").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange("{}", htmlEditor.getCursor());
            htmlEditor.focus();
            var str = "]";
            var mynum = str.length;
            var start_cursor = htmlEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            htmlEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            htmlEditor.replaceRange(selected_text, htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange("{}", cssEditor.getCursor());
            cssEditor.focus();
            var str = "]";
            var mynum = str.length;
            var start_cursor = cssEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            cssEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            cssEditor.replaceRange(selected_text, cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange("{}", jsEditor.getCursor());
            jsEditor.focus();
            var str = "]";
            var mynum = str.length;
            var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            jsEditor.replaceRange(selected_text, jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym3").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange('""', htmlEditor.getCursor());
            htmlEditor.focus();
            var str = '"';
            var mynum = str.length;
            var start_cursor = htmlEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            htmlEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            htmlEditor.replaceRange(selected_text, htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange('""', cssEditor.getCursor());
            cssEditor.focus();
            var str = '"';
            var mynum = str.length;
            var start_cursor = cssEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            cssEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            cssEditor.replaceRange(selected_text, cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange('""', jsEditor.getCursor());
            jsEditor.focus();
            var str = '"';
            var mynum = str.length;
            var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            jsEditor.replaceRange(selected_text, jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym4").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange("''", htmlEditor.getCursor());
            htmlEditor.focus();
            var str = "'";
            var mynum = str.length;
            var start_cursor = htmlEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            htmlEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            htmlEditor.replaceRange(selected_text, htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange("''", cssEditor.getCursor());
            cssEditor.focus();
            var str = "'";
            var mynum = str.length;
            var start_cursor = cssEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            cssEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            cssEditor.replaceRange(selected_text, cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange("''", jsEditor.getCursor());
            jsEditor.focus();
            var str = "'";
            var mynum = str.length;
            var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            jsEditor.replaceRange(selected_text, jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym5").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "+", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "+", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "+", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym6").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "-", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "-", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "-", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym7").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + ".", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + ".", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + ".", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym8").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange("()", htmlEditor.getCursor());
            htmlEditor.focus();
            var str = ")";
            var mynum = str.length;
            var start_cursor = htmlEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            htmlEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            htmlEditor.replaceRange(selected_text, htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange("()", cssEditor.getCursor());
            cssEditor.focus();
            var str = ")";
            var mynum = str.length;
            var start_cursor = cssEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            cssEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            cssEditor.replaceRange(selected_text, cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange("()", jsEditor.getCursor());
            jsEditor.focus();
            var str = ")";
            var mynum = str.length;
            var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            jsEditor.replaceRange(selected_text, jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym9").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + ":", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + ":", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + ":", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym10").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + ";", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + ";", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + ";", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym11").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "_", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "_", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "_", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym12").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange("[]", htmlEditor.getCursor());
            htmlEditor.focus();
            var str = "]";
            var mynum = str.length;
            var start_cursor = htmlEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            htmlEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            htmlEditor.replaceRange(selected_text, htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange("[]", cssEditor.getCursor());
            cssEditor.focus();
            var str = "]";
            var mynum = str.length;
            var start_cursor = cssEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            cssEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            cssEditor.replaceRange(selected_text, cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange("[]", jsEditor.getCursor());
            jsEditor.focus();
            var str = "]";
            var mynum = str.length;
            var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
            jsEditor.replaceRange(selected_text, jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym13").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "|", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "|", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "|", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym14").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "/", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "/", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "/", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym15").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "\\", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "\\", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "\\", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym16").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "?", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "?", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "?", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym17").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "*", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "*", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "*", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym18").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "\\n", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"\\n\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "\\n", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym19").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "&", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym20").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "%", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "%", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "%", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym21").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "$", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"$\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "$", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym22").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&cent;", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"&cent;\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&cent;", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym23").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&pound;", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"&pound;\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&pound;", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym24").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&yen;", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"&yen;\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&yen;", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym25").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&euro;", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"&euro;\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&euro;", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym26").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "@", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "@", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "@", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym27").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "=", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "=", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "=", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym28").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "#", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "#", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "#", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym29").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + ",", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + ",", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + ",", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym30").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "!", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "!", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "!", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym31").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "^", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            var selected_text = cssEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            cssEditor.replaceSelection("", cssEditor.getCursor());
            cssEditor.replaceRange(selected_text + "^", cssEditor.getCursor());
            cssEditor.focus();
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "^", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym32").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&copy;", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"&copy;\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&copy;", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym33").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&reg;", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"&reg;\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&reg;", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#charsym34").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            htmlEditor.replaceSelection("", htmlEditor.getCursor());
            htmlEditor.replaceRange(selected_text + "&trade;", htmlEditor.getCursor());
            htmlEditor.focus();
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"&trade;\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            var selected_text = jsEditor.getSelection();  // Need to grab the Active Selection
            console.log(selected_text);  // Active Selection

            jsEditor.replaceSelection("", jsEditor.getCursor());
            jsEditor.replaceRange(selected_text + "&trade;", jsEditor.getCursor());
            jsEditor.focus();
          }
        });
        $("#function").on("click", function() {
          if ( activeEditor.val() === "htmlEditor" ) {
            htmlEditor.replaceRange("function() {}", htmlEditor.getCursor());
            htmlEditor.focus();
            var str = "}";
            var mynum = str.length;
            var start_cursor = htmlEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            htmlEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          } else if ( activeEditor.val() === "cssEditor" ) {
            alertify.alert("Can't add <strong>\"function() {}\"</strong> into CSS");
          } else if ( activeEditor.val() === "jsEditor" ) {
            jsEditor.replaceRange("function() {}", jsEditor.getCursor());
            jsEditor.focus();
            var str = "}";
            var mynum = str.length;
            var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
            console.log(start_cursor);  // Cursor position
            var cursorLine = start_cursor.line;
            var cursorCh = start_cursor.ch;

            // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
            jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          }
        });
      };

  // Load Files, Grid Alignment
  $(window).load(function() {
    // Splitter Theme
    $("#splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
      theme: "metro"
    });

    // Select active editor when clicked/touched
    $("#htmlEditor, #cssEditor, #jsEditor").on("mouseup touchend", function() {
      if ( $(this).attr("id") === "htmlEditor" ) {
        activeEditor.val("htmlEditor");
      } else if ( $(this).attr("id") === "cssEditor" ) {
        activeEditor.val("cssEditor");
      } else if ( $(this).attr("id") === "jsEditor" ) {
        activeEditor.val("jsEditor");
      }
    });

    // Load Files Into Editor
    $("[data-action=open-html]").click(function() {
      $("#loadhtml").trigger("click");
    });
    $("[data-action=open-css]").click(function() {
      $("#loadcss").trigger("click");
    });
    $("[data-action=open-js]").click(function() {
      $("#loadjs").trigger("click");
    });

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var loadHTML = function(input) {
        var reader = new FileReader();
          reader.onload = function(e) {
            var content = e.target.result;
            htmlEditor.setValue( e.target.result );
          };
        reader.readAsText(input[0]);
      };
      var loadCSS = function(input) {
        var reader = new FileReader();
          reader.onload = function(e) {
            var content = e.target.result;
            cssEditor.setValue( e.target.result );
          };
        reader.readAsText(input[0]);
      };
      var loadJS = function(input) {
        var reader = new FileReader();
          reader.onload = function(e) {
            var content = e.target.result;
            jsEditor.setValue( e.target.result );
          };
        reader.readAsText(input[0]);
      };

      try {
        $('#loadhtml').on('change', function() {
          loadHTML(this.files);
          $("[data-action=tools].active").trigger("click");
        });
        $('#loadcss').on('change', function() {
          loadCSS(this.files);
          $("[data-action=tools].active").trigger("click");
        });
        $('#loadjs').on('change', function() {
          loadJS(this.files);
          $("[data-action=tools].active").trigger("click");
        });
      }
      catch(event) {
        alert("Oops there's been an error.");
      }
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  }).on("load resize", function() {
    // Dropdown Styles Libraries
    if ( $(this).width() > 924 ) {
      if ( $(this).height() > 552 ) {
        $(".libraries-dialog").css({
          "width": "auto",
          "height": "auto",
          "overflow-y": "auto"
        });
      } else {
        $(".libraries-dialog").css({
          "width": "auto",
          "overflow-y": "auto",
          "height": $(window).height() - 100 + "px"
        });
      }
    } else {
      if ( $(this).height() < 552 ) {
        $(".libraries-dialog").css({
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      } else {
        $(".libraries-dialog").css({
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      }
      
      if ( $(this).width() > 551 ) {
        $(".libraries-dialog").css({
          "width": "212px"
        });
      }
    }
    
    // Dropdown Styles Demos
    if ( $(this).width() > 530 ) {
      if ( $(this).height() > 405 ) {
        $(".demos-dialog").css({
          "width": "auto",
          "height": "310px",
          "overflow-y": "visible"
        });
      } else {
        $(".demos-dialog").css({
          "width": "auto",
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      }
    } else {
      if ( $(this).height() < 335 ) {
        $(".demos-dialog").css({
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      } else {
        $(".demos-dialog").css({
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      }
      
      if ( $(this).width() > 538 ) {
        $(".demos-dialog").css({
          "width": "212px"
        });
      }
    }
  });

  // Team up / Collaborate
  $("#collaborate").click(function() {
    TogetherJS(this); return false;
  });

  // Choose Grid Scheme
  $(".grid-alignment").click(function() {
    $("#htmlEditor, #cssEditor, #jsEditor").css("style", "");
    $(".jqx-widget-content").css("visibility", "visible");
    if ( $(".is-squared").is(":visible") ) {
      $(this).addClass("is-horizontal").removeClass("is-squared");
      $('#splitContainer').jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%' }]
      });
      $('#leftSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%'}]
      });
      $('#rightSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%'},
                 { size: '50%',collapsible:false }]
      });
      return false;
    }
    if ( $(".is-horizontal").is(":visible") ) {
      $(this).addClass("is-vertical").removeClass("is-horizontal");;
      $('#splitContainer').jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%' }]
      });
      $('#leftSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%'}]
      });
      $('#rightSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%'},
                 { size: '50%',collapsible:false}]
      });
      return false;
    }
    if ( $(".is-vertical").is(":visible") ) {
      $(this).addClass("is-squared").removeClass("is-vertical");
      $('#splitContainer').jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%' }]
      });
      $('#leftSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%'}]
      });
      $('#rightSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%'},
                 { size: '50%'}]
      });
      return false;
    }
  }).click();
  $("header a:not(.skip, .dialog a)").on("click", function() {
    $(this).not(".dialog a").toggleClass("active");
    $(this).next(":not([data-action=download-zip], #collaborate, .grid-alignment)").not(".dialog a").toggleClass("hide");

    if ( $("[data-action=tools].active").is(":visible") || $(".add-source.active").is(":visible") || $("[data-action=download].active").is(":visible") || $(".open-demos.active").is(":visible")) {
      $("header a:not(#collaborate, .grid-alignment)").not(".dialog a").not(this).removeClass("active").next().addClass("hide");
    }

    $(".dialog.fl").css({
      "left": $(this).offset().left
    });
    //$(".dialog.fr").css({
      //"left": $(this).offset().left - $(".dialog.fr").width() + $(this).width()
    //});
  });

  // Grids
  function GridScheme() {
    if ( $(".is-horizontal").is(":visible") ) {
      $('#splitContainer').jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%' }]
      });
      $('#leftSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%'}]
      });
      $('#rightSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%'},
                 { size: '50%',collapsible:false }]
      });
      return false;
    }
    if ( $(".is-vertical").is(":visible") ) {
      $('#splitContainer').jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%' }]
      });
      $('#leftSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%'}]
      });
      $('#rightSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%'},
                 { size: '50%',collapsible:false}]
      });
      return false;
    }
    if ( $(".is-squared").is(":visible") ) {
      $('#splitContainer').jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%' }]
      });
      $('#leftSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%'}]
      });
      $('#rightSplitter').jqxSplitter({
        height: '100%',
        width: '100%',
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%'},
                 { size: '50%'}]
      });
      return false;
    }
  }

  // Check Application Fields (For Download)
  $("[data-action=load]").on("change", function(evt) {
    if ( $(this).val() === "" ) {
      $(".check").addClass("hide");
    } else {
      $(".check").removeClass("hide");
      var file = evt.target.files[0];
      displayPreview(file);

      var reader = new FileReader();

      reader.onload = function(e) {
        // Download as Windows App
        $("[data-action=download-as-win-app]").on("click", function() {
          $("[data-action=download]").trigger("click");

          JSZipUtils.getBinaryContent('YourWinApp.zip', function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("data/content/icons/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/128.png", Img128.split('base64,')[1],{base64: true});
            zip.file("data/content/css/index.css", cssEditor.getValue());
            zip.file("data/content/js/script.js", jsEditor.getValue());
            zip.file("data/content/index.html", htmlContent);
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"data/content/libraries") );
            var content = zip.generate({type:"blob"});

            saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-win.zip");
          });
        });

        // Download as Mac App
        $("[data-action=download-as-mac-app]").on("click", function() {
          $("[data-action=download]").trigger("click");

          JSZipUtils.getBinaryContent('YourMacApp.zip', function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("data/content/icons/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/128.png", Img128.split('base64,')[1],{base64: true});
            zip.file("data/content/css/index.css", cssEditor.getValue());
            zip.file("data/content/js/script.js", jsEditor.getValue());
            zip.file("data/content/index.html", htmlContent);
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"data/content/libraries") );
            var content = zip.generate({type:"blob"});
            saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-mac.zip");
          });
        });

        // Download as Linux App
        $("[data-action=download-as-lin-app-32]").on("click", function() {
          $("[data-action=download]").trigger("click");

          JSZipUtils.getBinaryContent('YourLinApp.zip', function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("data/content/icons/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/128.png", Img128.split('base64,')[1],{base64: true});
            zip.file("data/content/css/index.css", cssEditor.getValue());
            zip.file("data/content/js/script.js", jsEditor.getValue());
            zip.file("data/content/index.html", htmlContent);
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"data/content/libraries") );
            
            // zip.file("source.c", "/*\n  Save this file as main.c and compile it using this command\n  (those are backticks, not single quotes):\n    gcc -Wall -g -o main main.c `pkg-config --cflags --libs gtk+-2.0 webkit-1.0` -export-dynamic\n  \n  Then execute it using:\n  ./main\n  \n  If you can't compile chances are you don't have gcc installed.\n  Install gcc/c with the following terminal command. (This command is for Debian based Linux distros)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc\n  \n  WebKit requires libraries to successfully aquire, configure, and compile. You can get libraries by issuing the following command in your terminal:\n    sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n  \n  Ubuntu Webkit information - https://help.ubuntu.com/community/WebKit\n    sudo apt-get install libwebkitgtk-dev python-webkit-dev python-webkit\n  \n  Required dependencies for this build: (If you installed all the above this is not needed)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev libwebkitgtk-dev\n*/\n\n#include <limits.h>\n#include <gtk/gtk.h>\n#include <webkit/webkit.h>\n\nstatic GtkWidget* window;\nstatic WebKitWebView* web_view;\n\nstatic void destroy_cb (GtkWidget* widget, gpointer data) {\n  gtk_main_quit();\n}\n\nstatic GtkWidget* create_browser() {\n  GtkWidget* scrolled_window = gtk_scrolled_window_new (NULL, NULL);\n  gtk_scrolled_window_set_policy (GTK_SCROLLED_WINDOW (scrolled_window), GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);\n\n  web_view = WEBKIT_WEB_VIEW (webkit_web_view_new ());\n  gtk_container_add (GTK_CONTAINER (scrolled_window), GTK_WIDGET (web_view));\n\n  return scrolled_window;\n}\n\nint main (int argc, char* argv[]) {\n  gtk_init (&argc, &argv);\n\n  GtkWidget* vbox = gtk_vbox_new (FALSE, 0);\n  gtk_box_pack_start (GTK_BOX (vbox), create_browser(), TRUE, TRUE, 0);\n\n  GtkWidget* window = gtk_window_new (GTK_WINDOW_TOPLEVEL);\n  gtk_window_set_default_size (GTK_WINDOW (window), 800, 560);\n  gtk_widget_set_name (window, \"" + $("[data-action=sitetitle]").val().split(" ").join("-") + "\");\n  /* gtk_window_set_icon_from_file(window, \"app/logo.png\", NULL); */\n  g_signal_connect (G_OBJECT (window), \"destroy\", G_CALLBACK (destroy_cb), NULL);\n  gtk_container_add (GTK_CONTAINER (window), vbox);\n  \n  char uri[PATH_MAX];\n  char cwd[PATH_MAX];\n\n  getcwd(cwd, sizeof(cwd));\n\n  if (argc > 1)\n      snprintf(uri, sizeof(uri), \"%s\", argv[1]);\n  else\n      snprintf(uri, sizeof(uri), \"file://%s/" + $("[data-action=sitetitle]").val().split(" ").join("-") + "/app/index.html\", cwd);\n  \n  webkit_web_view_open (web_view, uri);\n\n  gtk_widget_grab_focus (GTK_WIDGET (web_view));\n  gtk_widget_show_all (window);\n  gtk_main ();\n\n  return 0;\n}\n");
            // zip.file("README", "This application for Linux relies on the following dependencies...\n  sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n\nIf kodeWeave was at all helpful for you. Would you consider donating to the project?\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSYGA2RB5ZJCC\n\n");
            var content = zip.generate({type:"blob"});
            saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-32lin.zip");
          });
        });
        $("[data-action=download-as-lin-app-64]").on("click", function() {
          $("[data-action=download]").trigger("click");

          JSZipUtils.getBinaryContent('YourLinApp.zip', function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("data/content/icons/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/128.png", Img128.split('base64,')[1],{base64: true});
            zip.file("data/content/css/index.css", cssEditor.getValue());
            zip.file("data/content/js/script.js", jsEditor.getValue());
            zip.file("data/content/index.html", htmlContent);
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"data/content/libraries") );
            // zip.file("source.c", "/*\n  Save this file as main.c and compile it using this command\n  (those are backticks, not single quotes):\n    gcc -Wall -g -o main main.c `pkg-config --cflags --libs gtk+-2.0 webkit-1.0` -export-dynamic\n  \n  Then execute it using:\n  ./main\n  \n  If you can't compile chances are you don't have gcc installed.\n  Install gcc/c with the following terminal command. (This command is for Debian based Linux distros)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc\n  \n  WebKit requires libraries to successfully aquire, configure, and compile. You can get libraries by issuing the following command in your terminal:\n    sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n  \n  Ubuntu Webkit information - https://help.ubuntu.com/community/WebKit\n    sudo apt-get install libwebkitgtk-dev python-webkit-dev python-webkit\n  \n  Required dependencies for this build: (If you installed all the above this is not needed)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev libwebkitgtk-dev\n*/\n\n#include <limits.h>\n#include <gtk/gtk.h>\n#include <webkit/webkit.h>\n\nstatic GtkWidget* window;\nstatic WebKitWebView* web_view;\n\nstatic void destroy_cb (GtkWidget* widget, gpointer data) {\n  gtk_main_quit();\n}\n\nstatic GtkWidget* create_browser() {\n  GtkWidget* scrolled_window = gtk_scrolled_window_new (NULL, NULL);\n  gtk_scrolled_window_set_policy (GTK_SCROLLED_WINDOW (scrolled_window), GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);\n\n  web_view = WEBKIT_WEB_VIEW (webkit_web_view_new ());\n  gtk_container_add (GTK_CONTAINER (scrolled_window), GTK_WIDGET (web_view));\n\n  return scrolled_window;\n}\n\nint main (int argc, char* argv[]) {\n  gtk_init (&argc, &argv);\n\n  GtkWidget* vbox = gtk_vbox_new (FALSE, 0);\n  gtk_box_pack_start (GTK_BOX (vbox), create_browser(), TRUE, TRUE, 0);\n\n  GtkWidget* window = gtk_window_new (GTK_WINDOW_TOPLEVEL);\n  gtk_window_set_default_size (GTK_WINDOW (window), 800, 560);\n  gtk_widget_set_name (window, \"" + $("[data-action=sitetitle]").val().split(" ").join("-") + "\");\n  /* gtk_window_set_icon_from_file(window, \"app/logo.png\", NULL); */\n  g_signal_connect (G_OBJECT (window), \"destroy\", G_CALLBACK (destroy_cb), NULL);\n  gtk_container_add (GTK_CONTAINER (window), vbox);\n  \n  char uri[PATH_MAX];\n  char cwd[PATH_MAX];\n\n  getcwd(cwd, sizeof(cwd));\n\n  if (argc > 1)\n      snprintf(uri, sizeof(uri), \"%s\", argv[1]);\n  else\n      snprintf(uri, sizeof(uri), \"file://%s/" + $("[data-action=sitetitle]").val().split(" ").join("-") + "/app/index.html\", cwd);\n  \n  webkit_web_view_open (web_view, uri);\n\n  gtk_widget_grab_focus (GTK_WIDGET (web_view));\n  gtk_widget_show_all (window);\n  gtk_main ();\n\n  return 0;\n}\n");
            // zip.file("README", "This application for Linux relies on the following dependencies...\n  sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n\nIf kodeWeave was at all helpful for you. Would you consider donating to the project?\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSYGA2RB5ZJCC\n\n");
            var content = zip.generate({type:"blob"});
            saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-64lin.zip");
          });
        });

        // Download as Chrome App
        $("[data-action=download-as-chrome-app]").on("click", function() {
          $("[data-action=download]").trigger("click");
          $("[data-action=chromedialog]").fadeIn();
        });
        $("[data-action=cancel]").on("click", function() {
          $("[data-action=chromedialog]").fadeOut();
        });
        $("[data-action=confirm]").on("click", function() {
          if ( ($("[data-action=name]").val() === "") || ($("[data-action=descr]").val() === "") ) {
            alertify.error("Download failed! Please fill in all required fields.");
          } else {
            var zip = new JSZip();

            // Your Web App
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            zip.file("app/css/index.css", cssEditor.getValue());
            zip.file("app/js/script.js", jsEditor.getValue());
            zip.file("app/index.html", htmlContent);
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("assets/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("assets/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("assets/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("assets/128.png", Img128.split('base64,')[1],{base64: true});
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"app/libraries") );
            zip.file("css/index.css", "html, body {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n}\n\nwebview, iframe {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}");
            zip.file("index.html", "<!DOCTYPE html>\n<html>\n  <head>\n    <title>"+ $("[data-action=name]").val() +"</title>\n    <link rel=\"stylesheet\" href=\"css/index.css\" />\n  </head>\n  <body>\n    <iframe src=\"app/index.html\">\n      Your Chromebook does not support the iFrame html element.\n    </iframe>\n  </body>\n</html>");

            if ( $(".offline-mode").is(":checked") ) {
              zip.file("manifest.json", '{\n  "manifest_version": 2,\n  "name": "'+ $("[data-action=name]").val() +'",\n  "short_name": "'+ $("[data-action=name]").val() +'",\n  "description": "'+ $("[data-action=descr]").val() +'",\n  "version": "1.0",\n  "minimum_chrome_version": "38",\n  "offline_enabled": true,\n  "permissions": [ "storage", "fileSystem", "unlimitedStorage", "http://*/", "https://*/" ],\n  "icons": {\n    "16": "assets/16.png",\n    "32": "assets/32.png",\n    "64": "assets/64.png",\n    "128": "assets/128.png"\n  },\n\n  "app": {\n    "background": {\n      "scripts": ["background.js"]\n    }\n  }\n}\n');
              if ( $(".frame-mode").is(":checked") ) {
                zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      frame: 'none',\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
              } else {
                zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
              }
            } else {
              zip.file("manifest.json", '{\n  "manifest_version": 2,\n  "name": "'+ $("[data-action=name]").val() +'",\n  "short_name": "'+ $("[data-action=name]").val() +'",\n  "description": "'+ $("[data-action=descr]").val() +'",\n  "version": "1.0",\n  "minimum_chrome_version": "38",\n  "offline_enabled": false,\n  "permissions": [ "storage", "fileSystem", "unlimitedStorage", "http://*/", "https://*/" ],\n  "icons": {\n    "16": "assets/16.png",\n    "32": "assets/32.png",\n    "64": "assets/64.png",\n    "128": "assets/128.png"\n  },\n\n  "app": {\n    "background": {\n      "scripts": ["background.js"]\n    }\n  }\n}\n');
              if ( $(".frame-mode").is(":checked") ) {
                zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      frame: 'none',\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
              } else {
                zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
              }
            }

            // Your Web App
            var content = zip.generate({type:"blob"});
            saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-chrome.zip");
            $(".dialog-bg").fadeOut();
          }
          return false;
        });
        return false;
      };
      reader.readAsArrayBuffer(file);
    }
  });

  // Download as zip
  $("[data-action=download-zip]").on("click", function() {
    $("[data-action=download]").trigger("click");

    JSZipUtils.getBinaryContent("font-awesome.zip", function(err, data) {
      if(err) {
        throw err; // or handle err
      }

      var zip = new JSZip(data);

      // Your Web App
      var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
      zip.file("css/index.css", cssEditor.getValue());
      zip.file("js/script.js", jsEditor.getValue());
      zip.file("index.html", htmlContent);
      eval( $("[data-action=ziplibs]").val() );
      var content = zip.generate({type:"blob"});
      saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + ".zip");
    });
  });

  // Add/Remove Libraries
  $("[data-action=check]").on("change", function() {
    var textarea = $("[data-action=library-code]");
    var value = $(this).parent().nextAll("div").children(".libsources:first").val() + "\n";
    
    if ( $("#alertify").is(":checked") ) {
      $('.alertifyjs').clear();
      download_to_textbox('libraries/alertify/themes/alertify.core.css', $('.alertifyjs1'));
      download_to_textbox('libraries/alertify/themes/alertify.default.css', $('.alertifyjs2'));
      download_to_textbox('libraries/alertify/alertify.min.js', $('.alertifyjs3'));
      $(".alertifyzip").val("zip.file('libraries/alertify/themes/alertify.core.css', $(\".alertifyjs1\").val());\nzip.file('libraries/alertify/themes/alertify.default.css', $(\".alertifyjs2\").val());\nzip.file('libraries/alertify/alertify.min.js', $(\".alertifyjs3\").val());");
    } else {
      $('.alertifyjs, .alertifyzip').clear();
    }
    
    if ( $("#bootstrap").is(":checked") ) {
      $('.bootstrap').clear();
      download_to_textbox('libraries/bootstrap/bootstrap.css', $('.bootstrap1'));
      download_to_textbox('libraries/bootstrap/bootstrap.js', $('.bootstrap2'));
      $('.bootstrap1, .bootstrap2').trigger("change");
      $(".bootstrapzip").val("zip.file('libraries/bootstrap/bootstrap.css', $('.bootstrap1').val());\n  zip.file('libraries/bootstrap/bootstrap.js', $('.bootstrap2').val());");
    } else {
      $('.bootstrap, .bootstrapzip').clear();
    }
    
    if ( $("#chartjs").is(":checked") ) {
      $('.chartjs').clear();
      download_to_textbox('libraries/chartjs/chart.min.js', $('.chartjs'));
      $('.chartjs').trigger("change");
      $(".chartjszip").val("zip.file('libraries/chartjs/chart.min.js', $('.chartjs').val());");
    } else {
      $('.chartjs, .chartjszip').clear();
    }
    if ( $("#createjs").is(":checked") ) {
      $('.createjs').clear();
      download_to_textbox('libraries/createjs/createjs.min.js', $('.createjs1'));
      download_to_textbox('libraries/createjs/easeljs.min.js', $('.createjs2'));
      download_to_textbox('libraries/createjs/tweenjs.min.js', $('.createjs3'));
      download_to_textbox('libraries/createjs/soundjs.min.js', $('.createjs4'));
      download_to_textbox('libraries/createjs/preloadjs.min.js', $('.createjs5'));
      $('.createjs').trigger("change");
      $(".createjszip").val("zip.file('libraries/createjs/createjs.min.js', $('.createjs1').val());\nzip.file('libraries/createjs/easeljs.min.js', $('.createjs2').val());\nzip.file('libraries/createjs/tweenjs.min.js', $('.createjs3').val());\nzip.file('libraries/createjs/soundjs.min.js', $('.createjs4').val());\nzip.file('libraries/createjs/preloadjs.min.js', $('.createjs5').val());");
    } else {
      $('.createjs, .createjszip').clear();
    }
    if ( $("#d3").is(":checked") ) {
      $('.d3').clear();
      download_to_textbox('libraries/d3/d3.js', $('.d3'));
      $('.d3').trigger("change");
      $(".d3zip").val("zip.file('libraries/d3/d3.js', $(\".d3\").val());");
    } else {
      $('.d3, .d3zip').clear();
    }
    if ( $("#dojo").is(":checked") ) {
      $('.dojo').clear();
      download_to_textbox('libraries/dojo/dojo.js', $('.dojo'));
      $('.dojo').trigger("change");
      $(".dojozip").val("zip.file('libraries/dojo/dojo.js', $(\".dojo\").val());");
    } else {
      $('.dojo, .dojozip').clear();
    }
    if ( $("#fabric").is(":checked") ) {
      $('.fabric').clear();
      download_to_textbox('libraries/fabric/fabric.min.js', $('.fabric'));
      $('.fabric').trigger("change");
      $(".fabriczip").val("zip.file('libraries/fabric/fabric.min.js', $(\".fabric\").val());");
    } else {
      $('.fabric, .fabriczip').clear();
    }
    if ( $("#jquery").is(":checked") ) {
      $('.jquery').clear();
      download_to_textbox('libraries/jquery/jquery.js', $('.jquery'));
      $('.jquery').trigger("change");
      $(".jqueryzip").val("zip.file('libraries/jquery/jquery.js', $(\".jquery\").val());");
    } else {
      $('.jquery, .jqueryzip').clear();
    }
    if ( $("#jqueryui").is(":checked") ) {
      $('.jqueryui').clear();
      download_to_textbox('libraries/jqueryui/jqueryui.css', $('.jqueryui1'));
      download_to_textbox('libraries/jqueryui/jqueryui.min.js', $('.jqueryui2'));
      download_to_textbox('libraries/jqueryui/jquery.ui.touch-punch.min.js', $('.jqueryui3'));
      $('.jqueryui').trigger("change");
      $(".jqueryuizip").val("zip.file('libraries/jqueryui/jqueryui.css', $(\".jqueryui1\").val());\nzip.file('libraries/jqueryui/jqueryui.min.js', $(\".jqueryui2\").val());\nzip.file('libraries/jqueryui/jquery.ui.touch-punch.min.js', $(\".jqueryui3\").val());");
    } else {
      $('.jqueryui, .jqueryuizip').clear();
    }
    if ( $("#jquerytools").is(":checked") ) {
      $('.jquerytools').clear();
      download_to_textbox('libraries/jquerytools/jquery.tools.min.js', $('.jquerytools'));
      $('.jquerytools').trigger("change");
      $(".jquerytoolszip").val("zip.file('libraries/jquerytools/jquery.tools.min.js', $(\".jquerytools\").val());");
    } else {
      $('.jquerytools, .jquerytoolszip').clear();
    }
    if ( $("#jszip").is(":checked") ) {
      $('.jszip').clear();
      download_to_textbox('libraries/jquery/jquery.js', $('.jszip'));
      $('.jszip').trigger("change");
      $(".jszipzip").val("zip.file('libraries/jszip/jszip.min.js', $(\".jszip\").val());\nzip.file('libraries/jszip/jszip-utils.js', $(\".jszip\").val());\nzip.file('libraries/jszip/FileSaver.js', $(\".jszip\").val());");
    } else {
      $('.jszip, .jszipzip').clear();
    }
    if ( $("#jquerytools").is(":checked") ) {
      $('.jquerytools').clear();
      download_to_textbox('libraries/jquerytools/jquery.tools.min.js', $('.jquerytools'));
      $('.jquerytools').trigger("change");
      $(".jquerytoolszip").val("zip.file('libraries/jquerytools/jquery.tools.min.js', $(\".jquerytools\").val());");
    } else {
      $('.jquerytools, .jquerytoolszip').clear();
    }
    if ( $("#kinetic").is(":checked") ) {
      $('.kinetic').clear();
      download_to_textbox('libraries/kinetic/kinetic.js', $('.kinetic'));
      $('.kinetic').trigger("change");
      $(".kineticzip").val("zip.file('libraries/kinetic/kinetic.js', $(\".kinetic\").val());");
    } else {
      $('.kinetic, .kineticzip').clear();
    }
    if ( $("#knockout").is(":checked") ) {
      $('.knockout').clear();
      download_to_textbox('libraries/knockout/knockout.js', $('.knockout'));
      $('.knockout').trigger("change");
      $(".knockoutzip").val("zip.file('libraries/knockout/knockout.js', $(\".knockout\").val());");
    } else {
      $('.knockout, .knockoutzip').clear();
    }
    if ( $("#modernizer").is(":checked") ) {
      $('.modernizer').clear();
      download_to_textbox('libraries/modernizer/modernizer.js', $('.modernizer'));
      $('.modernizer').trigger("change");
      $(".modernizerzip").val("zip.file('libraries/modernizer/modernizer.js', $(\".modernizer\").val());");
    } else {
      $('.modernizer, .modernizerzip').clear();
    }
    if ( $("#mootools").is(":checked") ) {
      $('.mootools').clear();
      download_to_textbox('libraries/mootools/mootools-yui-compressed.js', $('.mootools'));
      $('.mootools').trigger("change");
      $(".mootoolszip").val("zip.file('libraries/mootools/mootools-yui-compressed.js', $(\".mootools\").val());");
    } else {
      $('.mootools, .mootoolszip').clear();
    }
    if ( $("#normalize").is(":checked") ) {
      $('.normalize').clear();
      download_to_textbox('libraries/normalize/normalize.css', $('.normalize'));
      $('.normalize').trigger("change");
      $(".normalizezip").val("zip.file('libraries/normalize/normalize.css', $(\".normalize\").val());");
    } else {
      $('.normalize, .normalizezip').clear();
    }
    if ( $("#paperjs").is(":checked") ) {
      $('.paperjs').clear();
      download_to_textbox('libraries/paperjs/paperjs.js', $('.paperjs'));
      $('.paperjs').trigger("change");
      $(".paperjszip").val("zip.file('libraries/paperjs/paperjs.js', $(\".paperjs\").val());");
    } else {
      $('.paperjs, .paperjszip').clear();
    }
    if ( $("#polyui").is(":checked") ) {
      $('.polyui').clear();
      download_to_textbox('libraries/polyui/polyui.css', $('.polyui'));
      $('.polyui').trigger("change");
      $(".polyuizip").val("zip.file('libraries/polyui/polyui.css', $(\".polyui\").val());");
    } else {
      $('.polyui, .polyuizip').clear();
    }
    if ( $("#processingjs").is(":checked") ) {
      $('.processingjs').clear();
      download_to_textbox('libraries/processingjs/processingjs.js', $('.processingjs'));
      $('.processingjs').trigger("change");
      $(".processingjszip").val("zip.file('libraries/processingjs/processingjs.js', $(\".processingjs\").val());");
    } else {
      $('.processingjs, .processingjsszip').clear();
    }
    if ( $("#prototypejs").is(":checked") ) {
      $('.prototypejs').clear();
      download_to_textbox('libraries/processingjs/prototypejs.js', $('.prototypejs'));
      $('.prototypejs').trigger("change");
      $(".prototypejszip").val("zip.file('libraries/prototypejs/prototypejs.js', $(\".prototypejs\").val());");
    } else {
      $('.prototypejs, .prototypejszip').clear();
    }
    if ( $("#qooxdoo").is(":checked") ) {
      $('.qooxdoo').clear();
      download_to_textbox('libraries/qooxdoo/qooxdoo.js', $('.qooxdoo'));
      $('.qooxdoo').trigger("change");
      $(".qooxdooszip").val("zip.file('libraries/qooxdoo/qooxdoo.js', $(\".qooxdoo\").val());");
    } else {
      $('.qooxdoo, .qooxdooszip').clear();
    }
    if ( $("#raphael").is(":checked") ) {
      $('.raphael').clear();
      download_to_textbox('libraries/raphael/raphael.js', $('.raphael'));
      $('.raphael').trigger("change");
      $(".raphaelzip").val("zip.file('libraries/raphael/raphael.js', $(\".raphael\").val());");
    } else {
      $('.raphael, .raphaelzip').clear();
    }
    if ( $("#requirejs").is(":checked") ) {
      $('.requirejs').clear();
      download_to_textbox('libraries/require/require.js', $('.requirejs'));
      $('.requirejs').trigger("change");
      $(".requirejszip").val("zip.file('libraries/require/require.js', $(\".requirejs\").val());");
    } else {
      $('.requirejs, .requirejszip').clear();
    }
    if ( $("#scriptaculous").is(":checked") ) {
      $('.scriptaculous').clear();
      download_to_textbox('libraries/scriptaculous/scriptaculous.js', $('.scriptaculous'));
      $('.scriptaculous').trigger("change");
      $(".scriptaculouszip").val("zip.file('libraries/scriptaculous/scriptaculous.js', $(\".scriptaculous\").val());");
    } else {
      $('.scriptaculous, .scriptaculouszip').clear();
    }
    if ( $("#snapsvg").is(":checked") ) {
      $('.snapsvg').clear();
      download_to_textbox('libraries/snap-svg/snap-svg.js', $('.snapsvg'));
      $('.snapsvg').trigger("change");
      $(".snapsvgzip").val("zip.file('libraries/snap-svg/snap-svg.js', $(\".snapsvg\").val());");
    } else {
      $('.snapsvg, .snapsvgzip').clear();
    }
    if ( $("#svgjs").is(":checked") ) {
      $('.svgjs').clear();
      download_to_textbox('libraries/svg-svg/svg-svg.js', $('.svgjs'));
      $('.svgjs').trigger("change");
      $(".svgjszip").val("zip.file('libraries/svg-svg/svg-svg.js', $(\".svgjs\").val());");
    } else {
      $('.svgjs, .svgjszip').clear();
    }
    if ( $("#threejs").is(":checked") ) {
      $('.threejs').clear();
      download_to_textbox('libraries/threejs/three.min.js', $('.threejs'));
      $('.threejs').trigger("change");
      $(".threejszip").val("zip.file('libraries/threejs/three.min.js', $(\".threejs\").val());");
    } else {
      $('.threejs, .threejszip').clear();
    }
    if ( $("#underscorejs").is(":checked") ) {
      $('.underscorejs').clear();
      download_to_textbox('libraries/underscore/underscore.js', $('.underscorejs'));
      $('.underscorejs').trigger("change");
      $(".underscorejszip").val("zip.file('libraries/underscore/underscore.js', $(\".underscorejs\").val());");
    } else {
      $('.underscorejs, .underscorejszip').clear();
    }
    if ( $("#webfontloader").is(":checked") ) {
      $('.webfontloader').clear();
      download_to_textbox('libraries/webfont/webfont.js', $('.webfontloader'));
      $('.webfontloader').trigger("change");
      $(".webfontloaderzip").val("zip.file('libraries/webfont/webfont.js', $(\".webfontloader\").val());");
    } else {
      $('.webfontloader, .webfontloaderzip').clear();
    }
    if ( $("#yui").is(":checked") ) {
      $('.yui').clear();
      download_to_textbox('libraries/yui/yui.js', $('.yui'));
      $('.yui').trigger("change");
      $(".yuizip").val("zip.file('libraries/yui/yui.js', $(\".yui\").val());");
    } else {
      $('.yui, .yuizip').clear();
    }
    if ( $("#zepto").is(":checked") ) {
      $('.zepto').clear();
      download_to_textbox('libraries/zepto/zepto.js', $('.zepto'));
      $('.zepto').trigger("change");
      $(".zeptozip").val("zip.file('libraries/zepto/zepto.js', $(\".zepto\").val());");
    } else {
      $('.zepto, .zeptozip').clear();
    }
    
    // Update JSZip (Applied dynamically from HTML div )
    $("[data-action=ziplibs]").val(function() {
      return $.map($(".jszipcode"), function (el) {
        return el.value;
      }).join("");
    });
    
    if ( $(this).prop("checked") === true ) {
      textarea.val( textarea.val() + value );
    } else {
      textarea.val( textarea.val().replace( value, "") );
    }
    
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });
  
  shortcutKeys();
  initGenerators();
  fullscreenEditor();
  appDemos();
  charGeneration();

  $(window).on("beforeunload", function() {
    return "Are you sure you wish to leave? All your changes will be lost.";
  });
});
