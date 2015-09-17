var widgets = [];
function updateJSHints() {
  jsEditor.operation(function(){
    for (var i = 0; i < widgets.length; ++i)
      jsEditor.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(jsEditor.getValue());
    for (i = 0; i < JSHINT.errors.length; ++i) {
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

    for (i = 0; i < result.messages.length; ++i) {
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

// Rules Specified for HTML Validation
var ruleSets = {
  "tagname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "doctype-first": false,
  "tag-pair": true,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "attr-no-duplication": true
};

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
  // lint: true,
  // gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
  value: "<!-- comment -->\nhello world!"
});
Inlet(htmlEditor);
emmetCodeMirror(htmlEditor);
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
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }}
});
Inlet(cssEditor);
emmetCodeMirror(cssEditor);
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
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }}
});
var mdEditor = CodeMirror.fromTextArea(document.getElementById("mdEditor"), {
  mode: "text/x-markdown",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }}
});
Inlet(jsEditor);
// emmetCodeMirror(jsEditor);

// Initialize Open and Close for HTML editor
var openHTML = CodeMirror(document.querySelector("#openHTML"), {
  mode: "text/html",
  value: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>"
});
var closeHTML = CodeMirror(document.querySelector("#closeHTML"), {
  mode: "text/html",
  value: "</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n"
});
var closeRefs = CodeMirror(document.querySelector("#closeRefs"), {
  mode: "text/html",
  value: "  </head>\n  <body>\n"
});
var closeFinal = CodeMirror(document.querySelector("#closeFinal"), {
  mode: "text/html",
  value: "\n  </body>\n</html>"
});

// Live preview
htmlEditor.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
    for (var i = 0; i < widgets.length; ++i){
      cssEditor.removeLineWidget(widgets[i]);
      jsEditor.removeLineWidget(widgets[i]);
    }
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
mdEditor.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(markdownPreview, 300);
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
mdEditor.on("drop", function() {
  mdEditor.setValue("");
});

function updatePreview() {
  var previewFrame = document.getElementById("preview");
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
  preview.open();
  var htmlContent = openHTML.getValue() + $("[data-action=sitetitle]").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + "<style>" + cssEditor.getValue() + "</style>" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + "<script>" + jsEditor.getValue() + "</script>" + closeFinal.getValue();
  preview.write(htmlContent);
  preview.close();
}

function markdownPreview() {
  var mdconverter = new Showdown.converter(),
      previewFrame = document.getElementById("preview"),
      preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;

  preview.open();
  preview.write( mdconverter.makeHtml( mdEditor.getValue() ) );
  preview.close();
}
setTimeout(markdownPreview, 300);
setTimeout(updatePreview, 300);
setTimeout(updateCSSHints, 300);
setTimeout(updateJSHints, 300);







