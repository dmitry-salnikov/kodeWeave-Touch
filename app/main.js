var widgets = [];
function updateJSHints() {
  jsEditor.operation(function(){
    for (var i = 0; i < widgets.length; ++i)
      jsEditor.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(jsEditor.getValue());
    for (var i = 0; i < JSHINT.errors.length; ++i) {
      var err = JSHINT.errors[i];
      if (!err) continue;
      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.innerHTML = "!!";
      icon.className = "lint-error-icon";
      msg.appendChild(document.createTextNode(err.reason));
      msg.className = "lint-error";
      widgets.push(jsEditor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
    }
  });
  var info = jsEditor.getScrollInfo();
  var after = jsEditor.charCoords({line: jsEditor.getCursor().line + 1, ch: 0}, "local").top;
  if (info.top + info.clientHeight < after)
    jsEditor.scrollTo(null, after - info.clientHeight + 3);
}
function updateCSSHints() {
  cssEditor.operation(function(){
    for (var i = 0; i < widgets.length; ++i){
      cssEditor.removeLineWidget(widgets[i]);
    }

    widgets.length = 0;

    var result = CSSLint.verify(cssEditor.getValue());

    for (var i = 0; i < result.messages.length; ++i) {
      var err = result.messages[i];
      if (!err) continue;
      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.innerHTML = "!!";
      icon.className = "lint-error-icon";
      //***** HERE *****
      msg.appendChild(document.createTextNode(err.message));
      msg.className = "lint-error";
      widgets.push(cssEditor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
    }
  });// end of cssEditor.operation
}// end of updateCSSHints
// Handles CodeMirror Preview Delay
var delay;
var cssWaiting;
var jsWaiting;

// Initialize HTML editor
var htmlEditor = CodeMirror(document.getElementById("htmlEditor"), {
  mode: "text/html",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  value: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>site name</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n  </head>\n  <body>\n    <!-- comment -->\n    hello world!\n  </body>\n</html>"
});
var cssEditor = CodeMirror(document.getElementById("cssEditor"), {
  mode: "text/css",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
});
var jsEditor = CodeMirror(document.getElementById("jsEditor"), {
  mode: "text/javascript",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
});

// Live preview
htmlEditor.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
    for (var i = 0; i < widgets.length; ++i){
      cssEditor.removeLineWidget(widgets[i]);
      jsEditor.removeLineWidget(widgets[i]);
    }
  var dest = $(".projectname");
  var content =  htmlEditor.getValue();
  var openTagIndex = content.search(/<title/);
  var closeTagIndex = content.search(/<\/title>/);
  var titleTag = content.slice(openTagIndex , closeTagIndex);
  var editorTitle = titleTag.slice(titleTag.search(/>/) + 1);  
  dest.val(editorTitle).val(dest.val().split(" ").join(""));
});
cssEditor.on("change", function() {
  clearTimeout(delay);
  clearTimeout(cssWaiting);
  delay = setTimeout(updatePreview, 300);
  cssWaiting = setTimeout(updateCSSHints, 300);
});
jsEditor.on("change", function() {
  clearTimeout(delay);
  clearTimeout(jsWaiting);
  delay = setTimeout(updatePreview, 300);
  jsWaiting = setTimeout(updateJSHints, 300);
});

// Don't add to code, replace with new drop file's code
htmlEditor.on("drop", function() {
  htmlEditor.setValue("");
});
cssEditor.on("drop", function() {
  cssEditor.setValue("");
});
jsEditor.on("drop", function() {
  jsEditor.setValue("");
});

function updatePreview() {
  var previewFrame = document.getElementById("preview");
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
  preview.open();
  preview.write('<style type="text/css">' + cssEditor.getValue() + '</style>'); 
  preview.write(htmlEditor.getValue());
  preview.write('<scr' + 'ipt type="text/javascript">' + jsEditor.getValue() + '</scr' + 'ipt>');
  preview.close();
}
setTimeout(updatePreview, 300);
setTimeout(updateCSSHints, 300);
setTimeout(updateJSHints, 300);

// Save Doc as HTML File
function saveTextAsHTML() {
  var htmlContent = htmlEditor.getValue();
  var cssContent = cssEditor.getValue();
  var jsContent = jsEditor.getValue();
  
  var cssLink="  <"+"style type=\"text/css\">\n" + cssContent + "\n    </style\>"+"\n";
  var jsLink="  <"+"script type=\"text/javascript\">\n" + jsContent + "\n    </script\>"+"\n";
  
  cssLink = cssLink + "  </head>";
  jsLink = jsLink + "  </body>";
  
  htmlContent = htmlContent.replace("</head>",cssLink);
  htmlContent = htmlContent.replace("</body>",jsLink);
  
  var textToWrite =  htmlContent;
  var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
  var fileNameToSaveAs = "source.html";

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }
  downloadLink.click();
}
function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}

(function() {
  function scrollMenu(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    document.getElementById('charmenu').scrollLeft -= (delta*40); // Multiplied by 40
    return false;
  }
  if (document.getElementById('charmenu').addEventListener) {
    // IE9, Chrome, Safari, Opera
    document.getElementById('charmenu').addEventListener('mousewheel', scrollMenu, false);
    // Firefox
    document.getElementById('charmenu').addEventListener('DOMMouseScroll', scrollMenu, false);
  } else {
    // IE 6/7/8
    document.getElementById('charmenu').attachEvent('onmousewheel', scrollMenu);
  }
})();
