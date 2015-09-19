// Clear Input Values - JQuery Plugin
(function($) {
  $.fn.clear = function() {
    $(this).val("");
  };
}) (jQuery) ;

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
      ctx16.clearRect(0, 0, 16, 16);
      ctx16.drawImage(img16, 0, 0, 16, 16);
    };
    img32.onload = function() {
      // x, y, width, height
      ctx32.clearRect(0, 0, 32, 32);
      ctx32.drawImage(img32, 0, 0, 32, 32);
    };
    img64.onload = function() {
      // x, y, width, height
      ctx64.clearRect(0, 0, 64, 64);
      ctx64.drawImage(img64, 0, 0, 64, 64);
    };
    img.onload = function() {
      // x, y, width, height
      ctx.clearRect(0, 0, 128, 128);
      ctx.drawImage(img, 0, 0, 128, 128);
    };
  };
  reader.readAsDataURL(file);
}

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
      window.addEventListener("keydown", function(e) {
      // New Document (CMD+N)
        if ( e.metaKey && e.keyCode == 78 ) {
          $(".check").attr("checked", false).trigger("change");
          htmlEditor.setValue("<!-- comment -->\nhello world!");
          cssEditor.setValue("");
          jsEditor.setValue("");
          mdEditor.setValue("");
        }
      // Export as Zip (CMD+S)
        if ( e.metaKey && e.keyCode == 83 ) {
          $("[data-action=download-zip]").trigger("click");
        }
      });
    },
    initGenerators = function() {
      // Tidy Up/Beautify Code
      $("[data-action=tidy]").click(function() {
        // if ( activeEditor.val() === "htmlEditor" ) {
        //   var htmlLines = htmlEditor.lineCount();
        //   htmlEditor.autoFormatRange({line:0, ch:0}, {line:htmlLines});
        // } else if ( activeEditor.val() === "cssEditor" ) {
        //   var cssLines = cssEditor.lineCount();
        //   cssEditor.autoFormatRange({line:0, ch:0}, {line:cssLines});
        // } else if ( activeEditor.val() === "jsEditor" ) {
        //   var jsLines = jsEditor.lineCount();
        //   jsEditor.autoFormatRange({line:0, ch:0}, {line:jsLines});
        // }
        
        if ( activeEditor.val() === "htmlEditor" ) {
          beautifyHTML();
        } else if ( activeEditor.val() === "cssEditor" ) {
          beautifyCSS();
        } else if ( activeEditor.val() === "jsEditor" ) {
          beautifyJS();
        }
        
        $("[data-action=tools].active").trigger("click");
      });

      // Minify Code
      $("[data-action=minify]").click(function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.setValue(htmlEditor.getValue().replace(/\<\!--\s*?[^\s?\[][\s\S]*?--\>/g,'').replace(/\>\s*\</g,'><'));
          $("[data-action=tools].active").trigger("click");
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.setValue( cssEditor.getValue().replace(/\/\*.*\*\/|\/\*[\s\S]*?\*\/|\n|\t|\v|\s{2,}/g,"").replace(/\s*\{\s*/g,"{").replace(/\s*\}\s*/g,"}").replace(/\s*\:\s*/g,":").replace(/\s*\;\s*/g,";").replace(/\s*\,\s*/g,",").replace(/\s*\~\s*/g,"~").replace(/\s*\>\s*/g,">").replace(/\s*\+\s*/g,"+").replace(/\s*\!\s*/g,"!") );
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.setValue( jsEditor.getValue().replace(/\/\*[\s\S]*?\*\/|\/\/.*\n|\s{2,}|\n|\t|\v|\s(?=function\(.*?\))|\s(?=\=)|\s(?=\{)/g,"").replace(/\s?function\s?\(/g,"function(").replace(/\s?\{\s?/g,"{").replace(/\s?\}\s?/g,"}").replace(/\,\s?/g,",").replace(/if\s?/g,"if") );
        }
        $("[data-action=tools].active").trigger("click");
      });
      
      $("[data-action=lowercase]").click(function() {
        applyLowercase();
        $("[data-action=tools].active").trigger("click");
      });

      $("[data-action=uppercase]").click(function() {
        applyUppercase();
        $("[data-action=tools].active").trigger("click");
      });

      $("[data-action=search]").click(function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.execCommand("find");
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.execCommand("find");
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.execCommand("find");
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.execCommand("find");
        }
        $("[data-action=tools].active").trigger("click");
      });
      $("[data-action=replace]").click(function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.execCommand("replace");
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.execCommand("replace");
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.execCommand("replace");
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.execCommand("replace");
        }
        $("[data-action=tools].active").trigger("click");
      });
      $("[data-action=replaceall]").click(function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.execCommand("replaceAll");
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.execCommand("replaceAll");
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.execCommand("replaceAll");
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.execCommand("replaceAll");
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
          $("#mainSplitter").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "vertical",
            showSplitBar: false,
            panels: [{ size: '0%' },
                     { size: '100%',collapsible:false }]
          });
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
          $("#mainSplitter").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "vertical",
            showSplitBar: false,
            panels: [{ size: '0%' },
                     { size: '100%',collapsible:false }]
          });
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
          $("#mainSplitter").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "vertical",
            showSplitBar: false,
            panels: [{ size: '0%' },
                     { size: '100%',collapsible:false }]
          });
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
      $(".fullscreen-md-toggle").click(function() {
        $(this).toggleClass("fill unfill");
        if ( $(".fullscreen-md-toggle.unfill").is(":visible") ) {
          $(this).html('<span class="fa fa-expand" id="fullscreen-md"></span>');
          GridScheme();
        } else if ( $(".fullscreen-md-toggle.fill").is(":visible") ) {
          $(this).html('<span class="fa fa-compress" id="fullscreen-md"></span>');
          $("#mainSplitter").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "vertical",
            showSplitBar: false,
            panels: [{ size: '100%' },
                     { size: '0%',collapsible:false }]
          });
          $("#splitContainer").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "vertical",
            showSplitBar: false,
            panels: [{ size: "0%" },
                     { size: "0%" }]
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
          $("#mainSplitter").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "vertical",
            showSplitBar: false,
            panels: [{ size: '0%' },
                     { size: '100%',collapsible:false }]
          });
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
        htmlEditor.setValue("<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <button class=\"btn--default\" data-action=\"alphabetize\">Alphabetize</button>\n    <textarea class=\"form__input\" data-action=\"input-list\" rows=\"7\" placeholder=\"Alphabetize your text here...\">China\nIndia\nUnited States of America\nIndonesia\nBrazil\nPakistan\nNigeria\nBangladesh\nRussia\nJapan\nMexico\nPhilippines\nEthiopia\nVietnam\nEgypt\nGermany\nIran\nTurkey\nDemocratic Republic of the Congo\nFrance</textarea>\n  </div>\n</div>");
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
        cssEditor.setValue("");
        jsEditor.setValue("document.addEventListener(\"DOMContentLoaded\", function() {\n  document.querySelector(\"[data-output=os]\").innerHTML = \"<strong>Operating System</strong>: \" + navigator.platform;\n});");
        $(".open-demos").trigger("click");
      });
      $("[data-action=markdowneditor]").on("click", function() {
        $(".check").attr("checked", false).trigger("change");
        $("[data-action=sitetitle]").val("Live Markdown Editor");
        htmlEditor.setValue("<div class=\"editor-and-preview-container\">\n  <div class=\"editor-container\">Markdown Editor</div>\n  <div class=\"preview-container\">Preview</div>\n</div>\n<div class=\"editor-and-preview-container\">\n  <div class=\"editor-container\">\n    <textarea id=\"editor\">Welcome!\n===================\n\n![Placer text](http://kodeweave.sourceforge.net/logo.png)  \n\nHey! I'm your placement Markdown text.\n\n----------\n\n\nTypography\n-------------\n\n[kodeWeave Link](http://kodeweave.sourceforge.net/)  \n**bold text**  \n*italic text*  \n\n### Blockquote:\n\n> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n### Bullet List\n\n - Green\n - Eggs\n - and\n - Ham\n\n### Numbered List\n\n 1. Green\n 2. Eggs\n 3. and\n 4. Ham\n</textarea>\n  </div>\n  <div class=\"preview-container\">\n    <div id=\"preview\"></div>\n  </div>\n</div>");
        cssEditor.setValue("* {\n  box-sizing: border-box;\n}\n\nbody {\n  line-height: 1.4;\n}\n\n.editor-and-preview-container {\n  padding: 1em;\n  width: 100%;\n  height: 100%;\n}\n\n.editor-container, .preview-container {\n  display: inline;\n  overflow: hidden;\n  float: left;\n  width: 50%;\n  height: 100%;\n}\n\n#editor {\n  display: inline-block;\n  width: 100%;\n  height: 500px;\n  resize: none;\n  padding: 1em;\n  line-height: 1.5;\n}\n#editor:focus {\n  outline: none;\n}\n\n#preview {\n  width: 100%;\n  height: 500px;\n  border: 1px green solid;\n  padding: 0 1em;\n  overflow: auto;\n}");
        jsEditor.setValue('var mdconverter = new Showdown.converter();\nvar editor = $("#editor");\nvar preview = $("#preview");\nfunction updatePreview() {\n  preview.html(mdconverter.makeHtml(editor.val()));\n}\nupdatePreview();\neditor.on("keyup", function () {\n  updatePreview();\n});');
        $(".open-demos, #normalize, #jquery, #showdown").trigger("click");
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
        jsEditor.setValue("var canvas = $(\".logo\"),\n    ctx = canvas[0].getContext(\"2d\"),\n    holder = document.getElementById(\"holder\"),\n    state = document.getElementById(\"status\");\n\nif (typeof window.FileReader === \"undefined\") {\n  state.className = \"fail\";\n} else {\n  state.className = \"success\";\n  state.innerHTML = \"File API & FileReader available\";\n}\n\nfunction displayPreview(file) {\n  var reader = new FileReader();\n\n  reader.onload = function(e) {\n    var img = new Image();\n    img.src = e.target.result;\n    img.onload = function() {\n      // x, y, width, height\n      ctx.clearRect(0, 0, 128, 128);\n      ctx.drawImage(img, 0, 0, 128, 128);\n    };\n  };\n  reader.readAsDataURL(file);\n}\n\n$(\"[data-action=call]\").click(function() {\n  $(\"[data-action=load]\").trigger(\"click\");\n});\n\n$(\"[data-action=load]\").change(function(e) {\n  var file = e.target.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n});\n\n// Drag and drop image load\nholder.ondragover = function () {\n  this.className = \"hover\";\n  return false;\n};\nholder.ondragend = function () {\n  this.className = \"\";\n  return false;\n};\nholder.ondrop = function(e) {\n  this.className = \"\";\n  e.preventDefault();\n  var file = e.dataTransfer.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n};\n");
        $(".open-demos, #jquery").trigger("click");
      });
      $("[data-action=polyui]").on("click", function() {
        $(".check").attr("checked", false).trigger("change");
        $("[data-action=sitetitle]").val("Poly UI Kit");
        htmlEditor.setValue("<div class=\"grid\">\n  <header class=\"grid__col--12 panel--padded--centered\" role=\"banner\"> \n    <a class=\"site-logo\" href=\"javascript:void(0)\">\n      <b class=\"srt\">Poly - UI Toolkit</b>\n    </a>\n    <nav class=\"navbar\" role=\"navigation\">\n      <span id=\"toggle\" class=\"icn--nav-toggle is-displayed-mobile\">\n        <b class=\"srt\">Toggle</b>\n      </span>   \n      <ul class=\"nav is-collapsed-mobile\" role=\"navigation\">\n        <li class=\"nav__item\"><a href=\"#type\">Typography</a></li>\n        <li class=\"nav__item\"><a href=\"#buttons\">Buttons</a></li>\n        <li class=\"nav__item\"><a href=\"#forms\">Form</a></li>\n        <li class=\"nav__item\"><a href=\"#images\">Images</a></li>\n        <li class=\"nav__item\"><a href=\"#grid\">Grid</a></li>\n        <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li>\n        <!-- Current Page Class Style -->\n        <!-- <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li> -->\n      </ul>\n    </nav>\n  </header>\n</div>\n\n<div class=\"grid is-hidden-mobile\">\n  <div class=\"grid__col--12\">\n    <img class=\"img--hero\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/hero.jpg\" alt=\"Poly - A simple UI Kit\">\n  </div>\n</div>\n\n<h4 id=\"type\" class=\"grid\">Typography</h4>\n\n<div class=\"grid\">\n  <div class=\"centered grid__col--8\">\n    <h1 class=\"headline-primary--grouped\">Take a look at this amazing headline</h1>\n    <h2 class=\"headline-secondary--grouped\">Don't forget about the subtitle</h2>\n    <p>This is a typical paragraph for the UI Kit. <a href=\"#\">Here is what a link might look like</a>. The typical font family for this kit is Helvetica Neue.  This kit is intended for clean and refreshing web layouts. No jazz hands here, just the essentials to make dreams come true, with minimal clean web design. The kit comes fully equipped with everything from full responsive media styling to buttons to form fields. <em>I enjoy using italics as well from time to time</em>. Fell free to create the most amazing designs ever with this kit. I truly hope you enjoy not only the kit but this amazing paragraph as well. :)</p>\n    <blockquote>You know what really gets me going? A really nice set of block quotes.  That's right, block quotes that say, \"Hey, I'm an article you want to read and nurture.\"</blockquote>\n  </div>\n</div>\n\n<h4 id=\"buttons\" class=\"grid\">Buttons</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <a class=\"btn--default\" href=\"#\">Button Default</a>\n    <a class=\"btn--success\" href=\"#\">Button Success</a>\n    <a class=\"btn--error\" href=\"#\">Button Error</a>\n    <button class=\"btn--warning\">Button Warning</button>\n    <button class=\"btn--info\">Button Info</button>\n  </div>\n</div>\n\n<h4 id=\"forms\" class=\"grid\">Form Elements</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\"> \n    <form class=\"form\">\n      <label class=\"form__label--hidden\" for=\"name\">Name:</label> \n      <input class=\"form__input\" type=\"text\" id=\"name\" placeholder=\"Name\">\n\n      <label class=\"form__label--hidden\" for=\"email\">Email:</label>\n      <input class=\"form__input\" type=\"email\" id=\"email\" placeholder=\"email@website.com\">\n\n      <label class=\"form__label--hidden\" for=\"msg\">Message:</label>\n      <textarea class=\"form__input\" id=\"msg\" placeholder=\"Message...\" rows=\"7\"></textarea>\n\n      <input class=\"btn--default\" type=\"submit\" value=\"Submit\">\n      <input class=\"btn--warning\" type=\"reset\" value=\"Reset\">\n    </form>\n  </div>\n  <div class=\"grid__col--4\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n    <form>\n      <label class=\"form__label--hidden\" for=\"username\">Username:</label> \n      <input class=\"form__input\" type=\"text\" id=\"username\" placeholder=\"Username\">\n      <label class=\"form__label--hidden\" for=\"password\">Password:</label>\n      <input class=\"form__input\" type=\"password\" id=\"password\" placeholder=\"Password\">\n      <input class=\"form__btn\" type=\"submit\" value=\"Login\">\n    </form>\n  </div>\n</div>\n\n<h4 id=\"images\" class=\"grid\">Images</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--5\">\n    <img src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--5\">\n    <img class=\"img--wrap\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--2\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n  </div>\n</div>\n\n<h4 id=\"grid\" class=\"grid\">Grid System</h4>\n\n<div class=\"theme__poly\">\n  <div class=\"grid\">\n    <div class=\"grid__col--12\">.grid__col--12</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--6\">.grid__col--6</div>\n    <div class=\"grid__col--6\">.grid__col--6</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--5\">.grid__col--5</div>\n    <div class=\"grid__col--7\">.grid__col--7</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--8\">.grid__col--8</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"centered grid__col--7\">.centered .grid__col--7</div>\n  </div>\n</div>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\">\n    <h4 id=\"nav\">Navigation</h4>\n    <ul class=\"nav\" role=\"navigation\">\n      <li class=\"nav__item\"><a href=\"#\">Nav Link</a></li>\n      <li class=\"nav__item\"><a href=\"#\">Nav Link 2</a></li>\n      <li class=\"nav__item--current\"><a href=\"#\">Nav Current</a></li>\n    </ul>\n    <p>This is what the navigation menu looks like when the screen is at 769px or higher. When the screen is less than 769px, you will have the option to display a toggle menu icon.</p>\n  </div>\n\n  <div class=\"grid__col--4\">\n    <h4>Offcanvas Menu</h4>\n    <div class=\"offcanvas\">\n      <span class=\"icn--close\">\n        <b class=\"srt\">close</b>\n      </span>\n      <ul class=\"menu\" role=\"navigation\">\n        <a class=\"menu__link\" href=\"#\">Link 1</a>\n        <a class=\"menu__link\" href=\"#\">Link 2</a>\n        <a class=\"menu__link\" href=\"#\">Link 3</a>\n        <a class=\"menu__link--end\" href=\"#\">Link 4</a>\n      </ul>\n    </div>\n  </div>\n</div>");
        cssEditor.setValue("");
        jsEditor.setValue("// Toggle Menu for Phones\n$(\"#toggle\").click(function() {\n  $(this).next(\".nav\").toggleClass(\"is-collapsed-mobile\");\n});\n\n// Handles Navigation Style Classes\n$(\".nav__item\").on(\"click\", function() {\n  $(this).parent().find(\"li\").removeClass(\"nav__item--current\").addClass(\"nav__item\");\n  $(this).addClass(\"nav__item--current\").removeClass(\"nav__item\");\n});");
        $(".open-demos, #polyui, #jquery").trigger("click");
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.undo();
        }
      });
      $("#redo").on("click", function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.redo();
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.redo();
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.redo();
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.redo();
        }
      });
      $("#tabindent").on("click", function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.execCommand("indentMore");
          htmlEditor.focus();
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.execCommand("indentMore");
          cssEditor.focus();
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.execCommand("indentMore");
          jsEditor.focus();
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.execCommand("indentMore");
          mdEditor.focus();
        }
      });
      $("#taboutdent").on("click", function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.execCommand("indentLess");
          htmlEditor.focus();
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.execCommand("indentLess");
          cssEditor.focus();
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.execCommand("indentLess");
          jsEditor.focus();
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.execCommand("indentLess");
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange("<>", mdEditor.getCursor());
          mdEditor.focus();
          var str = ">";
          var mynum = str.length;
          var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          mdEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          mdEditor.replaceRange(selected_text, mdEditor.getCursor());
          mdEditor.focus();
        }
      });
      $("#charsym2").on("click", function() {
        if ( activeEditor.val() === "htmlEditor" ) {
          var selected_text = htmlEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          htmlEditor.replaceSelection("", htmlEditor.getCursor());
          htmlEditor.replaceRange("{}", htmlEditor.getCursor());
          htmlEditor.focus();
          var str = "}";
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
          var str = "}";
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
          var str = "}";
          var mynum = str.length;
          var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          jsEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          jsEditor.replaceRange(selected_text, jsEditor.getCursor());
          jsEditor.focus();
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange("{}", mdEditor.getCursor());
          mdEditor.focus();
          var str = "}";
          var mynum = str.length;
          var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          mdEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          mdEditor.replaceRange(selected_text, mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange('""', mdEditor.getCursor());
          mdEditor.focus();
          var str = '"';
          var mynum = str.length;
          var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          mdEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          mdEditor.replaceRange(selected_text, mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange("''", mdEditor.getCursor());
          mdEditor.focus();
          var str = "'>'";
          var mynum = str.length;
          var start_cursor = jsEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          mdEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          mdEditor.replaceRange(selected_text, mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "+", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "-", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + ".", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange("()", mdEditor.getCursor());
          mdEditor.focus();
          var str = ")";
          var mynum = str.length;
          var start_cursor = mdEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          mdEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          mdEditor.replaceRange(selected_text, mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + ":", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + ";", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "_", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange("[]", mdEditor.getCursor());
          mdEditor.focus();
          var str = "]";
          var mynum = str.length;
          var start_cursor = mdEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          mdEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
          mdEditor.replaceRange(selected_text, mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "|", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "/", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "\\", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "?", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "*", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "\\n", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "%", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "$", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&cent;", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&pound;", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&yen;", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&euro;", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "@", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "=", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "#", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + ",", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "!", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "^", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&copy;", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&reg;", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          var selected_text = mdEditor.getSelection();  // Need to grab the Active Selection
          console.log(selected_text);  // Active Selection

          mdEditor.replaceSelection("", mdEditor.getCursor());
          mdEditor.replaceRange(selected_text + "&trade;", mdEditor.getCursor());
          mdEditor.focus();
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
        } else if ( activeEditor.val() === "mdEditor" ) {
          mdEditor.replaceRange("function() {}", mdEditor.getCursor());
          mdEditor.focus();
          var str = "}";
          var mynum = str.length;
          var start_cursor = mdEditor.getCursor();  // Need to get the cursor position
          console.log(start_cursor);  // Cursor position
          var cursorLine = start_cursor.line;
          var cursorCh = start_cursor.ch;

          // Code to move cursor back [x] amount of spaces. [x] is the data-val value.
          mdEditor.setCursor({line: cursorLine , ch : cursorCh -mynum });
        }
      });
    };

// Load Files, Grid Alignment
$(window).load(function() {
  // Splitter Theme
  $("#mainSplitter, #splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
    theme: "metro"
  });

  // Select active editor when clicked/touched
  $("#htmlEditor, #cssEditor, #jsEditor, #mdEditor").on("mouseup touchend", function() {
    if ( $(this).attr("id") === "htmlEditor" ) {
      activeEditor.val("htmlEditor");
      setTimeout(updatePreview, 300);
    } else if ( $(this).attr("id") === "cssEditor" ) {
      activeEditor.val("cssEditor");
      setTimeout(updatePreview, 300);
      setTimeout(updateCSSHints, 300);
    } else if ( $(this).attr("id") === "jsEditor" ) {
      activeEditor.val("jsEditor");
      setTimeout(updatePreview, 300);
      setTimeout(updateJSHints, 300);
    } else if ( $(this).attr("id") === "mdEditor" ) {
      activeEditor.val("mdEditor");
      setTimeout(markdownPreview, 300);
    }
    
    if ( $(".active").is(":visible") ) {
      $(".active").trigger("click");
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
  $("[data-action=open-md]").click(function() {
    $("#loadmd").trigger("click");
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
    var loadMD = function(input) {
      var reader = new FileReader();
        reader.onload = function(e) {
          var content = e.target.result;
          mdEditor.setValue( e.target.result );
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
      $('#loadmd').on('change', function() {
        loadMD(this.files);
        $("[data-action=tools].active").trigger("click");
      });
    }
    catch(event) {
      alertify.error("Oops there's been an error.");
    }
  } else {
    alertify.error('The File APIs are not fully supported in this browser.');
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
    if ( $(this).height() > 465 ) {
      $(".demos-dialog").css({
        "width": "auto",
        "height": "355px",
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

// Toggle Theme
// $("#call-theme").click(function() {
//   $(this).toggleClass("darkTheme");
//   if ( $(this).hasClass("darkTheme") ) {
//     $("link[rel=stylesheet]").attr({href : "css/dark.css"});

//     // Splitter Theme
//     $("#splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
//       theme: "metrodark"
//     });
//   } else {
//     $("link[rel=stylesheet]").attr({href : "css/light.css"});
    
//     // Splitter Theme
//     $("#splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
//       theme: "metro"
//     });
//   }
// });

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
});
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
  $("#mainSplitter").jqxSplitter({
    height: "auto",
    width: "100%",
    orientation: "vertical",
    showSplitBar: true,
    panels: [{ size: '25%' },
             { size: '75%',collapsible:false }]
  });
  $("#splitContainer").jqxSplitter({
    height: "auto",
    width: "100%",
    orientation: "horizontal",
    showSplitBar: true,
    panels: [{ size: "50%",collapsible:false },
             { size: "50%" }]
  });
  $("#leftSplitter").jqxSplitter({
    width: "100%",
    height: "100%",
    orientation: "vertical",
    showSplitBar: true,
    panels: [{
      size: "50%",
      collapsible: false
    }]
  });
  $("#rightSplitter").jqxSplitter({
    width: "100%",
    height: "100%",
    orientation: "vertical",
    showSplitBar: true,
    panels: [{
      size: "50%",
      collapsible: false
    }]
  });
};
GridScheme();
$("#mainSplitter").jqxSplitter({
  height: "auto",
  width: "100%",
  orientation: "vertical",
  showSplitBar: true,
  panels: [{ size: '25%' },
           { size: '75%',collapsible:false }]
}).jqxSplitter("collapse");

// Check Application Fields (For Download)
$("[data-action=load]").on("change", function(evt) {
  if ( $(this).val() === "" ) {
    $(".watch").addClass("hide");
  } else {
    $(".watch").removeClass("hide");
    var file = evt.target.files[0];
    displayPreview(file);

    var reader = new FileReader();

    reader.onload = function(e) {
      // Download as Windows App
      $("[data-action=download-as-win-app]").on("click", function() {
        if ( $("[data-action=download]").hasClass("active") ) {
          $("[data-action=download]").trigger("click");
        }

        JSZipUtils.getBinaryContent('zips/YourWinApp.zip', function(err, data) {
          if(err) {
            throw err; // or handle err
          }

          var zip = new JSZip();
          var appName = zip.folder( $("[data-action=sitetitle]").val().replace(/ /g, "-")  );
          appName.load(data);

          // Your Web App
          var grabString = "<script src=\"libraries/jquery/jquery.js\"></script\>",
              replaceString = "<script src=\"libraries/jquery/jquery.js\"></script\>\n    <script>\n      try {\n        $ = jQuery = module.exports;\n        // If you want module.exports to be empty, uncomment:\n        // module.exports = {};\n      } catch(e) {}\n    </script\>";
          
          var Img16 = c16[0].toDataURL("image/png");
          var Img32 = c32[0].toDataURL("image/png");
          var Img64 = c64[0].toDataURL("image/png");
          var Img128 = canvas[0].toDataURL("image/png");
          appName.file("resources/default_app/icons/16.png", Img16.split('base64,')[1],{base64: true});
          appName.file("resources/default_app/icons/32.png", Img32.split('base64,')[1],{base64: true});
          appName.file("resources/default_app/icons/64.png", Img64.split('base64,')[1],{base64: true});
          appName.file("resources/default_app/icons/128.png", Img128.split('base64,')[1],{base64: true});


          // check if css editor has a value
          if (cssEditor.getValue() !== "") {
            closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n    " + closeFinal.getValue();
      
            appName.file("resources/default_app/css/index.css", cssEditor.getValue());
            appName.file("resources/default_app/index.html", htmlContent);
          }
          // check if js editor has a value
          if ( jsEditor.getValue() !== "") {
            if (cssEditor.getValue() === "") {
              closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />" + "\n  </head>\n  <body>\n\n");
            } else {
              closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            }
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
      
            appName.file("resources/default_app/js/index.js", jsEditor.getValue());
            appName.file("resources/default_app/index.html", htmlContent);
          }
          // check if css and js editors have values
          if (cssEditor.getValue() !== "" && jsEditor.getValue() !== "") {
            closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
      
            appName.file("resources/default_app/css/index.css", cssEditor.getValue());
            appName.file("resources/default_app/js/index.js", jsEditor.getValue());
            appName.file("resources/default_app/index.html", htmlContent);
          }
          // check if markdown editor has a value
          if ( mdEditor.getValue() !== "") {
            appName.file("resources/default_app/README.md", mdEditor.getValue());
          }
          
          
          appName.file("resources/default_app/package.json", "{\n  \"name\": \""+ $("[data-action=sitetitle]").val() +"\",\n  \"productName\": \""+ $("[data-action=sitetitle]").val() +"\",\n  \"version\": \"1.0.0\",\n  \"main\": \"default_app.js\",\n  \"license\": \"MIT\"\n}\n");
          eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"resources/default_app/libraries").replace(/zip.file/g,"appName.file") );

          var content = zip.generate({type:"blob"});
          saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-win.zip");
        });
      });

      // Download as Mac App
      $("[data-action=download-as-mac-app-32]").on("click", function() {
        if ( $("[data-action=download]").hasClass("active") ) {
          $("[data-action=download]").trigger("click");
        }

        JSZipUtils.getBinaryContent('zips/YourMacApp-32bit.zip', function(err, data) {
          if(err) {
            throw err; // or handle err
          }

          var zip = new JSZip(data);

          // Your Web App
          var grabString = "<script src=\"libraries/jquery/jquery.js\"></script\>",
              replaceString = "<script src=\"libraries/jquery/jquery.js\"></script\>\n    <script>\n      try {\n        $ = jQuery = module.exports;\n        // If you want module.exports to be empty, uncomment:\n        // module.exports = {};\n      } catch(e) {}\n    </script\>";
          
          closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
          var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
          var Img16 = c16[0].toDataURL("image/png");
          var Img32 = c32[0].toDataURL("image/png");
          var Img64 = c64[0].toDataURL("image/png");
          var Img128 = canvas[0].toDataURL("image/png");
          zip.file("data/content/app/icons/16.png", Img16.split('base64,')[1],{base64: true});
          zip.file("data/content/app/icons/32.png", Img32.split('base64,')[1],{base64: true});
          zip.file("data/content/app/icons/64.png", Img64.split('base64,')[1],{base64: true});
          zip.file("data/content/app/icons/128.png", Img128.split('base64,')[1],{base64: true});


          // check if css editor has a value
          if (cssEditor.getValue() !== "") {
            closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n    " + closeFinal.getValue();
      
            zip.file("data/content/app/css/index.css", cssEditor.getValue());
            zip.file("data/content/app/index.html", htmlContent);
          }
          // check if js editor has a value
          if ( jsEditor.getValue() !== "") {
            if (zip.getValue() === "") {
              closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />" + "\n  </head>\n  <body>\n\n");
            } else {
              closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            }
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
      
            zip.file("data/content/app/js/index.js", jsEditor.getValue());
            zip.file("data/content/app/index.html", htmlContent);
          }
          // check if css and js editors have values
          if (cssEditor.getValue() !== "" && jsEditor.getValue() !== "") {
            closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
      
            zip.file("data/content/app/css/index.css", cssEditor.getValue());
            zip.file("data/content/app/js/index.js", jsEditor.getValue());
            zip.file("data/content/app/index.html", htmlContent);
          }
          // check if markdown editor has a value
          if ( mdEditor.getValue() !== "") {
            zip.file("resources/default_app/README.md", mdEditor.getValue());
          }

          
          eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"data/content/app/libraries") );

          zip.file("data/package.json", '{\n  "main"  : "content/index.html",\n  "name"  : "'+ $("[data-action=sitetitle]").val() +'",\n  "window": {\n    "toolbar"    : false,\n    "frame"      : false,\n    "transparent": true\n  }\n}');
          zip.file("data/content/index.html", '<!doctype html>\n<html>\n <head>\n    <title>'+ $("[data-action=sitetitle]").val() +'</title>\n    <link rel="stylesheet" href="css/style.css">\n  </head>\n <body>\n    <div class="container">\n      <div class="titlebar txtcenter">\n        <div class="fl menubtns">\n          <a class="fl close">\n            <i class="fa fa-times"></i>\n          </a>\n          <a class="fl minimize">\n            <i class="fa fa-minus"></i>\n          </a>\n          <a class="fl maximize">\n            <i class="maxtr fa fa-caret-left"></i>\n            <i class="maxbl fa fa-caret-left"></i>\n          </a>\n        </div>\n        \n        <span data-set="appname"></span>\n      </div>\n\n      <iframe src="app/index.html"></iframe>\n    </div>\n\n    <script src="js/main.js"></script>\n  </body>\n</html>');
          zip.file("data/content/js/main.js", 'document.addEventListener("DOMContentLoaded", function() {\n  // Load library\n  var gui = require("nw.gui");\n\n  // Reference to window\n  var win = gui.Window.get();\n\n  document.querySelector(".close").onclick = function() {\n    window.close();\n  };\n\n  document.querySelector(".minimize").onclick = function() {\n    win.minimize();\n  };\n\n  document.querySelector(".titlebar").addEventListener("dblclick", function() {\n    if (win.isMaximized) {\n      win.unmaximize();\n      win.isMaximized = false;\n    } else {\n      win.maximize();\n    }\n  });\n\n  document.querySelector(".maximize").onclick = function() {\n    if (win.isMaximized) {\n      win.unmaximize();\n      win.isMaximized = false;\n    } else {\n      win.maximize();\n    }\n  };\n\n  win.on("maximize", function() {\n    win.isMaximized = true;\n  });\n  win.on("unmaximize", function() {\n    win.isMaximized = false;\n  });\n  win.on("enter-fullscreen", function() {\n    document.querySelector(".titlebar").classList.toggle("hide");\n    document.querySelector("iframe").style.top = 0;\n    document.querySelector("iframe").style.height = "100%";\n  });\n  win.on("leave-fullscreen", function() {\n    document.querySelector(".titlebar").classList.toggle("hide");\n    document.querySelector("iframe").style.top = 28 + "px";\n    document.querySelector("iframe").style.height = window.innerHeight - 28 + "px";\n  });\n  document.querySelector("iframe").style.height = window.innerHeight - 28 + "px";\n\n  window.addEventListener("keydown", function(e) {\n  // Reload App (CMD+R)\n    if ( e.metaKey && e.keyCode == 82 ) {\n      location.reload(true);\n    } else \n  // Hide Mac App (CMD+W)\n    if ( e.metaKey && e.keyCode == 87 ) {\n      win.hide();\n    }\n    // else\n  // Toggle fullscreen window (CTRL+CMD+F)\n    // if ( e.shiftKey && e.metaKey && e.keyCode == 70 ) {\n      // win.toggleFullscreen();\n    // }\n  });\n\n  // Close buttons hides app\n  // var hidden = false;\n  // gui.App.on("reopen", function(){\n  //   hidden = false;\n  //   win.show();\n  // })\n\n  // win.on("close", function(){\n  //   if (hidden == true) {\n  //     gui.App.quit();\n  //   } else {\n  //     win.hide();\n  //     hidden = true;\n  //   }\n  // });\n\n  // Create menu container\n  var Menu = new gui.Menu({\n    type: "menubar"\n  });\n\n  //initialize default mac menu\n  Menu.createMacBuiltin("'+ $("[data-action=sitetitle]").val() +'");\n\n  // Get the root menu from the default mac menu\n  var rootMenu = Menu.items[2].submenu;\n\n  // Append new item to root menu\n  rootMenu.insert(\n    new gui.MenuItem({\n      type: "normal",\n      label: "Toggle Fullscreen",\n      key: "F",\n      modifiers: "cmd",\n      click : function () {\n        win.toggleFullscreen();\n      }\n    })\n  );\n\n  rootMenu.insert(\n    new gui.MenuItem({\n      type: "normal",\n      label: "Reload App",\n      key: "R",\n      modifiers: "shift-cmd",\n      click : function () {\n        location.reload(true);\n      }\n    })\n  );\n\n  // Append Menu to Window\n  gui.Window.get().menu = Menu;\n\n  // Show app name in titlebar\n  document.querySelector("[data-set=appname]").innerHTML = document.title;\n\n  // Responsive UI\n  window.addEventListener("resize", function() {\n    document.querySelector("iframe").style.height = window.innerHeight - 28 + "px";\n  });\n});');

          zip.file("run.sh", "open -a /Applications/"+ $("[data-action=sitetitle]").val().replace(/ /g, "") +".app/Contents/data/"+ $("[data-action=sitetitle]").val().replace(/ /g, "") +".app");

          var content = zip.generate({type:"blob"});
          saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-mac.zip");
        });
      });

      // Download as Linux App
      $("[data-action=download-as-lin-app]").on("click", function() {
        if ( $("[data-action=download]").hasClass("active") ) {
          $("[data-action=download]").trigger("click");
        }

        JSZipUtils.getBinaryContent('zips/YourLinApp.zip', function(err, data) {
          if(err) {
            throw err; // or handle err
          }

          var zip = new JSZip();
          var appName = zip.folder( $("[data-action=sitetitle]").val().replace(/ /g, "-")  );
          appName.load(data);
          
          // Your Web App
          var grabString = "<script src=\"libraries/jquery/jquery.js\"></script\>",
              replaceString = "<script src=\"libraries/jquery/jquery.js\"></script\>\n    <script>\n      try {\n        $ = jQuery = module.exports;\n        // If you want module.exports to be empty, uncomment:\n        // module.exports = {};\n      } catch(e) {}\n    </script\>";
          
          var Img16 = c16[0].toDataURL("image/png");
          var Img32 = c32[0].toDataURL("image/png");
          var Img64 = c64[0].toDataURL("image/png");
          var Img128 = canvas[0].toDataURL("image/png");
          appName.file("resources/default_app/icons/16.png", Img16.split('base64,')[1],{base64: true});
          appName.file("resources/default_app/icons/32.png", Img32.split('base64,')[1],{base64: true});
          appName.file("resources/default_app/icons/64.png", Img64.split('base64,')[1],{base64: true});
          appName.file("resources/default_app/icons/128.png", Img128.split('base64,')[1],{base64: true});

          
          // check if css editor has a value
          if (cssEditor.getValue() !== "") {
            closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n    " + closeFinal.getValue();
      
            appName.file("resources/default_app/css/index.css", cssEditor.getValue());
            appName.file("resources/default_app/index.html", htmlContent);
          }
          // check if js editor has a value
          if ( jsEditor.getValue() !== "") {
            if (cssEditor.getValue() === "") {
              closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />" + "\n  </head>\n  <body>\n\n");
            } else {
              closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            }
            var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
      
            appName.file("resources/default_app/js/index.js", jsEditor.getValue());
            appName.file("resources/default_app/index.html", htmlContent);
          }
          // check if css and js editors have values
          if (cssEditor.getValue() !== "" && jsEditor.getValue() !== "") {
            closeRefs.setValue($("[data-action=library-code]").val().split(grabString).join(replaceString) + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
            htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
      
            appName.file("resources/default_app/css/index.css", cssEditor.getValue());
            appName.file("resources/default_app/js/index.js", jsEditor.getValue());
            appName.file("resources/default_app/index.html", htmlContent);
          }
          // check if markdown editor has a value
          if ( mdEditor.getValue() !== "") {
            appName.file("resources/default_app/README.md", mdEditor.getValue());
          }
          
          
          appName.file("resources/default_app/package.json", "{\n  \"name\": \""+ $("[data-action=sitetitle]").val() +"\",\n  \"productName\": \""+ $("[data-action=sitetitle]").val() +"\",\n  \"version\": \"1.0.0\",\n  \"main\": \"default_app.js\",\n  \"license\": \"MIT\"\n}\n");
          eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"resources/default_app/libraries").replace(/zip.file/g,"appName.file") );
          
          zip.file("make.sh", "if [ -d ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +" ]; then\n  typeset LP_FILE=${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +".desktop\n\n  # Remove the target file if any\n  rm -f ${LP_FILE}\n  printf \"%s[Desktop Entry]\\nName="+ $("[data-action=sitetitle]").val() +"\\nPath=${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"\\nActions=sudo\\nExec=./"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/electron\\nIcon=${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/resources/default_app/icons/128.png\\nTerminal=true\\nType=Application\\nStartupNotify=true > ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +".desktop\" >> ${LP_FILE}\n\n  echo 'Your application and launcher are now located at ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"'\n  rm README.md\n  rm make.sh\n  cd ../\n  rmdir "+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"-lin\n  cd ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/\n  chmod 775 electron\nfi\n\nif [ ! -d ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +" ]; then\n  mv "+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +" ${HOME}\n\n  typeset LP_FILE=${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +".desktop\n\n  # Remove the target file if any\n  rm -f ${LP_FILE}\n  printf \"%s[Desktop Entry]\\nName="+ $("[data-action=sitetitle]").val() +"\\nPath=${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"\\nActions=sudo\\nExec=./"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/electron\\nIcon=${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/resources/default_app/icons/128.png\\nTerminal=true\\nType=Application\\nStartupNotify=true > ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +".desktop\" >> ${LP_FILE}\n\n  echo 'Your application and launcher are now located at ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"'\n  rm README.md\n  rm make.sh\n  cd ../\n  rmdir "+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"-lin\n  cd ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"/\n  chmod 775 electron\nfi\n\n# For Windows OS\n#if EXIST ${HOME}/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +" (\n  #echo Yes\n#) ELSE (\n  #echo No\n#)\n");
          zip.file("README.md", "### Instructions\n 1. Extract the `"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"-lin.zip` folder anywhere on your computer except the home folder. \n 2. Open a terminal and then navigate to "+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"'s directory and `run the make.sh file`.\n\n  **example**:\n  cd Downloads/"+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +"-lin\n\n 3. This will move the "+ $("[data-action=sitetitle]").val().replace(/ /g, "-") +" sibling folder and it's decendants to your home directory and create an application launcher.\n");
          
          // zip.file("source.c", "/*\n  Save this file as main.c and compile it using this command\n  (those are backticks, not single quotes):\n    gcc -Wall -g -o main main.c `pkg-config --cflags --libs gtk+-2.0 webkit-1.0` -export-dynamic\n  \n  Then execute it using:\n  ./main\n  \n  If you can't compile chances are you don't have gcc installed.\n  Install gcc/c with the following terminal command. (This command is for Debian based Linux distros)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc\n  \n  WebKit requires libraries to successfully aquire, configure, and compile. You can get libraries by issuing the following command in your terminal:\n    sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n  \n  Ubuntu Webkit information - https://help.ubuntu.com/community/WebKit\n    sudo apt-get install libwebkitgtk-dev python-webkit-dev python-webkit\n  \n  Required dependencies for this build: (If you installed all the above this is not needed)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev libwebkitgtk-dev\n*/\n\n#include <limits.h>\n#include <gtk/gtk.h>\n#include <webkit/webkit.h>\n\nstatic GtkWidget* window;\nstatic WebKitWebView* web_view;\n\nstatic void destroy_cb (GtkWidget* widget, gpointer data) {\n  gtk_main_quit();\n}\n\nstatic GtkWidget* create_browser() {\n  GtkWidget* scrolled_window = gtk_scrolled_window_new (NULL, NULL);\n  gtk_scrolled_window_set_policy (GTK_SCROLLED_WINDOW (scrolled_window), GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);\n\n  web_view = WEBKIT_WEB_VIEW (webkit_web_view_new ());\n  gtk_container_add (GTK_CONTAINER (scrolled_window), GTK_WIDGET (web_view));\n\n  return scrolled_window;\n}\n\nint main (int argc, char* argv[]) {\n  gtk_init (&argc, &argv);\n\n  GtkWidget* vbox = gtk_vbox_new (FALSE, 0);\n  gtk_box_pack_start (GTK_BOX (vbox), create_browser(), TRUE, TRUE, 0);\n\n  GtkWidget* window = gtk_window_new (GTK_WINDOW_TOPLEVEL);\n  gtk_window_set_default_size (GTK_WINDOW (window), 800, 560);\n  gtk_widget_set_name (window, \"" + $("[data-action=sitetitle]").val().split(" ").join("-") + "\");\n  /* gtk_window_set_icon_from_file(window, \"app/logo.png\", NULL); */\n  g_signal_connect (G_OBJECT (window), \"destroy\", G_CALLBACK (destroy_cb), NULL);\n  gtk_container_add (GTK_CONTAINER (window), vbox);\n  \n  char uri[PATH_MAX];\n  char cwd[PATH_MAX];\n\n  getcwd(cwd, sizeof(cwd));\n\n  if (argc > 1)\n      snprintf(uri, sizeof(uri), \"%s\", argv[1]);\n  else\n      snprintf(uri, sizeof(uri), \"file://%s/" + $("[data-action=sitetitle]").val().split(" ").join("-") + "/app/index.html\", cwd);\n  \n  webkit_web_view_open (web_view, uri);\n\n  gtk_widget_grab_focus (GTK_WIDGET (web_view));\n  gtk_widget_show_all (window);\n  gtk_main ();\n\n  return 0;\n}\n");
          // zip.file("README", "This application for Linux relies on the following dependencies...\n  sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n\nIf kodeWeave was at all helpful for you. Would you consider donating to the project?\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSYGA2RB5ZJCC\n\n");
          var content = zip.generate({type:"blob"});
          saveAs(content, $("[data-action=sitetitle]").val().split(" ").join("-") + "-lin.zip");
        });
      });

      // Download as Chrome App
      $("[data-action=download-as-chrome-app]").on("click", function() {
        if ( $("[data-action=download]").hasClass("active") ) {
          $("[data-action=download]").trigger("click");
        }
        $("[data-action=chromedialog]").fadeIn();
      });
      $("[data-action=cancel]").on("click", function() {
        $("[data-action=chromedialog]").fadeOut();
      });
      $("[data-action=confirm]").on("click", function() {
        if ( ($("[data-action=sitetitle]").val() === "") || ($("[data-action=descr]").val() === "") ) {
          alertify.error("Download failed! Please fill in all required fields.");
        } else {
          JSZipUtils.getBinaryContent("zips/font-awesome-chrome.zip", function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            // check if css editor has a value
            if (cssEditor.getValue() !== "") {
              closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
              var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n    " + closeFinal.getValue();
        
              zip.file("app/css/index.css", cssEditor.getValue());
              zip.file("app/index.html", htmlContent);
            }
            // check if js editor has a value
            if ( jsEditor.getValue() !== "") {
              if (cssEditor.getValue() === "") {
                closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />" + "\n  </head>\n  <body>\n\n");
              } else {
                closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
              }
              var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
        
              zip.file("app/js/index.js", jsEditor.getValue());
              zip.file("app/index.html", htmlContent);
            }
            // check if css and js editors have values
            if (cssEditor.getValue() !== "" && jsEditor.getValue() !== "") {
              closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
              htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
        
              zip.file("app/css/index.css", cssEditor.getValue());
              zip.file("app/js/index.js", jsEditor.getValue());
              zip.file("app/index.html", htmlContent);
            }
            // check if markdown editor has a value
            if ( mdEditor.getValue() !== "") {
              zip.file("README.md", mdEditor.getValue());
            }
            
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
            zip.file("index.html", "<!DOCTYPE html>\n<html>\n  <head>\n    <title>"+ $("[data-action=sitetitle]").val() +"</title>\n    <link rel=\"stylesheet\" href=\"css/index.css\" />\n  </head>\n  <body>\n    <iframe src=\"app/index.html\">\n      Your Chromebook does not support the iFrame html element.\n    </iframe>\n  </body>\n</html>");

            if ( $(".offline-mode").is(":checked") ) {
              zip.file("manifest.json", '{\n  "manifest_version": 2,\n  "name": "'+ $("[data-action=sitetitle]").val() +'",\n  "short_name": "'+ $("[data-action=sitetitle]").val() +'",\n  "description": "'+ $("[data-action=descr]").val() +'",\n  "version": "1.0",\n  "minimum_chrome_version": "38",\n  "offline_enabled": true,\n  "permissions": [ "storage", "fileSystem", "unlimitedStorage", "http://*/", "https://*/" ],\n  "icons": {\n    "16": "assets/16.png",\n    "32": "assets/32.png",\n    "64": "assets/64.png",\n    "128": "assets/128.png"\n  },\n\n  "app": {\n    "background": {\n      "scripts": ["background.js"]\n    }\n  }\n}\n');
              if ( $(".frame-mode").is(":checked") ) {
                zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      frame: 'none',\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
              } else {
                zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
              }
            } else {
              zip.file("manifest.json", '{\n  "manifest_version": 2,\n  "name": "'+ $("[data-action=sitetitle]").val() +'",\n  "short_name": "'+ $("[data-action=sitetitle]").val() +'",\n  "description": "'+ $("[data-action=descr]").val() +'",\n  "version": "1.0",\n  "minimum_chrome_version": "38",\n  "offline_enabled": false,\n  "permissions": [ "storage", "fileSystem", "unlimitedStorage", "http://*/", "https://*/" ],\n  "icons": {\n    "16": "assets/16.png",\n    "32": "assets/32.png",\n    "64": "assets/64.png",\n    "128": "assets/128.png"\n  },\n\n  "app": {\n    "background": {\n      "scripts": ["background.js"]\n    }\n  }\n}\n');
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
          });
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
  if ( $("[data-action=download]").hasClass("active") ) {
    $("[data-action=download]").trigger("click");
  }

  JSZipUtils.getBinaryContent("zips/font-awesome.zip", function(err, data) {
    if(err) {
      throw err; // or handle err
    }

    var zip = new JSZip(data);

    // check if css editor has a value
    if (cssEditor.getValue() !== "") {
      closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
      var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n    " + closeFinal.getValue();

      zip.file("css/index.css", cssEditor.getValue());
      zip.file("index.html", htmlContent);
    }
    // check if js editor has a value
    if ( jsEditor.getValue() !== "") {
      if (cssEditor.getValue() === "") {
        closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />" + "\n  </head>\n  <body>\n\n");
      } else {
        closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
      }
      var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();

      zip.file("js/index.js", jsEditor.getValue());
      zip.file("index.html", htmlContent);
    }
    // check if css and js editors have values
    if (cssEditor.getValue() !== "" && jsEditor.getValue() !== "") {
      closeRefs.setValue($("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\" />\n    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\" />\n    <link rel=\"stylesheet\" href=\"css/index.css\" /></textarea>" + "\n  </head>\n  <body>\n\n");
      htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + closeRefs.getValue() + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();

      zip.file("css/index.css", cssEditor.getValue());
      zip.file("js/index.js", jsEditor.getValue());
      zip.file("index.html", htmlContent);
    }
    // check if markdown editor has a value
    if ( mdEditor.getValue() !== "") {
      zip.file("README.md", mdEditor.getValue());
    }
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
  if ( $("#showdown").is(":checked") ) {
    $('.showdown').clear();
    download_to_textbox('libraries/showdown/Showdown.min.js', $('.showdown'));
    $('.showdown').trigger("change");
    $(".showdownzip").val("zip.file('libraries/showdown/Showdown.min.js', $(\".showdown\").val());");
  } else {
    $('.showdown, .showdownzip').clear();
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
  
  
  var libsTextarea = $("[data-action=libstextarea]");
  var libsValue = $(this).parent().nextAll("div").children(".combinelibs:first").val() + "\n";
  
  if ( $(this).prop("checked") === true ) {
    textarea.val( textarea.val() + value );
    libsTextarea.val( libsTextarea.val() + libsValue );
  } else {
    textarea.val( textarea.val().replace( value, "") );
    libsTextarea.val( libsTextarea.val().replace( libsValue, "") );
  }
  
  setTimeout(updatePreview, 300);
});

shortcutKeys();
initGenerators();
fullscreenEditor();
appDemos();
charGeneration();

// $(window).on("beforeunload", function() {
//   return "Are you sure you wish to leave? All your changes will be lost.";
// });