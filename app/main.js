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
  extraKeys: {
    "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
    "Ctrl-'": function(){ applyLowercase(); },
    "Ctrl-\\": function(){ applyUppercase(); },
    "Cmd-'": function(){ applyLowercase(); },
    "Cmd-\\": function(){ applyUppercase(); },
    "Shift-Ctrl-'": function(){ applyMinify(); },
    "Shift-Ctrl-\\": function(){ applyBeautify(); },
    "Shift-Cmd-'": function(){ applyMinify(); },
    "Shift-Cmd-\\": function(){ applyBeautify(); },
    "Ctrl-Space": "autocomplete"
  },
  value: "<!-- comment -->\nhello world!",
  paletteHints: true
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
  extraKeys: {
    "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
    "Ctrl-'": function(){ applyLowercase(); },
    "Ctrl-\\": function(){ applyUppercase(); },
    "Cmd-'": function(){ applyLowercase(); },
    "Cmd-\\": function(){ applyUppercase(); },
    "Shift-Ctrl-'": function(){ applyMinify(); },
    "Shift-Ctrl-\\": function(){ applyBeautify(); },
    "Shift-Cmd-'": function(){ applyMinify(); },
    "Shift-Cmd-\\": function(){ applyBeautify(); },
    "Ctrl-Space": "autocomplete"
  },
  paletteHints: true
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
  extraKeys: {
    "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
    "Ctrl-'": function(){ applyLowercase(); },
    "Ctrl-\\": function(){ applyUppercase(); },
    "Cmd-'": function(){ applyLowercase(); },
    "Cmd-\\": function(){ applyUppercase(); },
    "Shift-Ctrl-'": function(){ applyMinify(); },
    "Shift-Ctrl-\\": function(){ applyBeautify(); },
    "Shift-Cmd-'": function(){ applyMinify(); },
    "Shift-Cmd-\\": function(){ applyBeautify(); },
    "Ctrl-Space": "autocomplete"
  },
  mode: {name: "javascript", globalVars: false},
  paletteHints: true
});
var mdEditor = CodeMirror(document.getElementById("mdEditor"), {
  mode: "text/x-markdown",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {
    "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
    "Ctrl-'": function(){ applyLowercase(); },
    "Ctrl-\\": function(){ applyUppercase(); },
    "Cmd-'": function(){ applyLowercase(); },
    "Cmd-\\": function(){ applyUppercase(); },
    "Shift-Ctrl-'": function(){ applyMinify(); },
    "Shift-Ctrl-\\": function(){ applyBeautify(); },
    "Shift-Cmd-'": function(){ applyMinify(); },
    "Shift-Cmd-\\": function(){ applyBeautify(); }
  },
  value: "Welcome!\n===================\n\n![Placer text](http://kodeweave.sourceforge.net/logo.png)  \n\nHey! I'm your placement Markdown text.\n\n----------\n\n\nTypography\n-------------\n\n[kodeWeave Link](http://kodeweave.sourceforge.net/)  \n**bold text**  \n*italic text*  \n\n### Blockquote:\n\n> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n### Bullet List\n\n - Green\n - Eggs\n - and\n - Ham\n\n### Numbered List\n\n 1. Green\n 2. Eggs\n 3. and\n 4. Ham"
});
Inlet(jsEditor);
// emmetCodeMirror(jsEditor);

if ( localStorage.getItem("htmlData")) {
  htmlEditor.setValue(localStorage.getItem("htmlData")); 
}
if ( localStorage.getItem("cssData")) {
  cssEditor.setValue(localStorage.getItem("cssData")); 
}
if ( localStorage.getItem("jsData")) {
  jsEditor.setValue(localStorage.getItem("jsData")); 
}
if ( localStorage.getItem("mdData")) {
  mdEditor.setValue(localStorage.getItem("mdData")); 
}

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
  localStorage.setItem("htmlData", htmlEditor.getValue());
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
  for (var i = 0; i < widgets.length; ++i) {
    cssEditor.removeLineWidget(widgets[i]);
    jsEditor.removeLineWidget(widgets[i]);
  }
  // CodeMirror.showHint(htmlEditor);
});
htmlEditor.on("keyup", function(cm, event) {
  var popupHTMLKeyCodes = {
    "9": "tab",
    "8": "backspace",
    "13": "enter",
    "27": "escape",
    "32": "space",
    "33": "pageup",
    "34": "pagedown",
    "35": "end",
    "36": "home",
    "37": "left",
    "39": "right",
    "38": "up",
    "40": "down",
    "51": "#",
    "91": "command",
    "17": "control",
    "16": "shift",
    "186": "semicolon",
    "219": "[",
    "221": "]",
    "48": "0",
    "50": "1",
    "51": "2",
    "53": "3",
    "54": "4",
    "55": "5",
    "56": "6",
    "57": "7",
    "58": "8",
    "59": "9"
  }
  if (!popupHTMLKeyCodes[(event.keyCode || event.which).toString()]) {
    CodeMirror.showHint(cm, CodeMirror.hint.html);
  }
  localStorage.setItem("htmlData", htmlEditor.getValue());
});
cssEditor.on("change", function() {
  localStorage.setItem("cssData", cssEditor.getValue());
  clearTimeout(delay);
  clearTimeout(cssWaiting);
  delay = setTimeout(updatePreview, 300);
  cssWaiting = setTimeout(updateCSSHints, 300);
  // CodeMirror.showHint(cssEditor);
});
cssEditor.on("keyup", function(cm, event) {
  var popupCSSKeyCodes = {
    "9": "tab",
    "8": "backspace",
    "13": "enter",
    "27": "escape",
    "32": "space",
    "33": "pageup",
    "34": "pagedown",
    "35": "end",
    "36": "home",
    "37": "left",
    "39": "right",
    "38": "up",
    "40": "down",
    "51": "#",
    "91": "command",
    "17": "control",
    "16": "shift",
    "186": "semicolon",
    "219": "[",
    "221": "]",
    "48": "0",
    "50": "1",
    "51": "2",
    "53": "3",
    "54": "4",
    "55": "5",
    "56": "6",
    "57": "7",
    "58": "8",
    "59": "9"
  }
  if (!popupCSSKeyCodes[(event.keyCode || event.which).toString()]) {
    CodeMirror.showHint(cm, CodeMirror.hint.css);
  }

  localStorage.setItem("cssData", cssEditor.getValue());
  clearTimeout(cssWaiting);
  cssWaiting = setTimeout(updateCSSHints, 300);
});
jsEditor.on("change", function() {
  localStorage.setItem("jsData", jsEditor.getValue());
  clearTimeout(delay);
  clearTimeout(jsWaiting);
  delay = setTimeout(updatePreview, 300);
  jsWaiting = setTimeout(updateJSHints, 300);
});
jsEditor.on("keyup", function(cm, event) {
  var popupJSKeyCodes = {
    "9": "tab",
    "8": "backspace",
    "13": "enter",
    "27": "escape",
    "32": "space",
    "33": "pageup",
    "34": "pagedown",
    "35": "end",
    "36": "home",
    "37": "left",
    "39": "right",
    "38": "up",
    "40": "down",
    "51": "#",
    "91": "command",
    "17": "control",
    "16": "shift",
    "186": "semicolon",
    "219": "[",
    "221": "]",
    "48": "0",
    "50": "1",
    "51": "2",
    "53": "3",
    "54": "4",
    "55": "5",
    "56": "6",
    "57": "7",
    "58": "8",
    "59": "9"
  }
  if (!popupJSKeyCodes[(event.keyCode || event.which).toString()]) {
    CodeMirror.showHint(cm, CodeMirror.hint.javascript);
  }

  localStorage.setItem("jsData", jsEditor.getValue());
  clearTimeout(jsWaiting);
  jsWaiting = setTimeout(updateJSHints, 300);
});
// jsEditor.on("keyup", function(cm, event) {
//   var popupKeyCodes = {
//     "9": "tab",
//     // "13": "enter",
//     // "27": "escape",
//     "33": "pageup",
//     "34": "pagedown",
//     "35": "end",
//     "36": "home",
//     "38": "up",
//     "40": "down"
//   }

//   if(!popupKeyCodes[(event.keyCode || event.which).toString()] && !jsEditor.state.completionActive) {
//     if(timeout) clearTimeout(timeout);
//     timeout = setTimeout(function() {
//       console.log('showing hint');        
//         CodeMirror.showHint(cm, CodeMirror.hint.javascript, {completeSingle: false});
//     }, 150);
//   }
// });
mdEditor.on("change", function() {
  localStorage.setItem("mdData", mdEditor.getValue());
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

function callCollabUpdate() {
  var updatehtml = htmlEditor.getValue()
  if (TogetherJS.running) {
    TogetherJS.send({
      type: "update-html",
      output: updatehtml
    });
  }
  var updatecss = cssEditor.getValue()
  if (TogetherJS.running) {
    TogetherJS.send({
      type: "update-css",
      output: updatecss
    });
  }
  var updatejs = jsEditor.getValue()
  if (TogetherJS.running) {
    TogetherJS.send({
      type: "update-js",
      output: updatejs
    });
  }
  var updatemd = mdEditor.getValue()
  if (TogetherJS.running) {
    TogetherJS.send({
      type: "update-md",
      output: updatemd
    });
  }
}

// Update TogetherJS
TogetherJS.hub.on("update-html", function(msg) {
  if (!msg.sameUrl) {
      return;
  }
  htmlEditor.setValue(msg.output);
});
TogetherJS.hub.on("update-css", function(msg) {
  if (!msg.sameUrl) {
      return;
  }
  cssEditor.setValue(msg.output);
});
TogetherJS.hub.on("update-js", function(msg) {
  if (!msg.sameUrl) {
      return;
  }
  jsEditor.setValue(msg.output);
});
TogetherJS.hub.on("update-md", function(msg) {
  if (!msg.sameUrl) {
      return;
  }
  mdEditor.setValue(msg.output);
});