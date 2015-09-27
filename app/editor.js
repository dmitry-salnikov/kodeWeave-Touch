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
    ctx = canvas[0].getContext("2d"),
    holder = document.getElementById("holder");

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
    download_to_editor = function (url, el) {
      return $.get(url, null, function (data) {
        el.setValue(data);
      }, "text");
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
      if ($("#function").is(":hidden")) {
        $("#function").show();
      }
    } else if ( $(this).attr("id") === "cssEditor" ) {
      activeEditor.val("cssEditor");
      setTimeout(updatePreview, 300);
      setTimeout(updateCSSHints, 300);
      if ($("#function").is(":visible")) {
        $("#function").hide();
      }
    } else if ( $(this).attr("id") === "jsEditor" ) {
      activeEditor.val("jsEditor");
      setTimeout(updatePreview, 300);
      setTimeout(updateJSHints, 300);
      if ($("#function").is(":hidden")) {
        $("#function").show();
      }
    } else if ( $(this).attr("id") === "mdEditor" ) {
      activeEditor.val("mdEditor");
      setTimeout(markdownPreview, 300);
      if ($("#function").is(":hidden")) {
        $("#function").show();
      }
    }
    
    if ( $(".active").is(":visible") ) {
      $(".active").trigger("click");
    }
  });

  /**
   * Chooser (Drop Box)
   * https://www.dropbox.com/developers/dropins/chooser/js
   */
  options = {
      success: function(file) {
        if (file[0].link.toLowerCase().substring(file[0].link.length - 5) === ".html") {
          download_to_editor(file[0].link, htmlEditor);
        } else if (file[0].link.toLowerCase().substring(file[0].link.length - 4) === ".css") {
          download_to_editor(file[0].link, cssEditor);
        } else if (file[0].link.toLowerCase().substring(file[0].link.length - 3) === ".js") {
          download_to_editor(file[0].link, jsEditor);
        } else if (file[0].link.toLowerCase().substring(file[0].link.length - 3) === ".md") {
          download_to_editor(file[0].link, mdEditor);
        } else if (file[0].link.toLowerCase().substring(file[0].link.length - 4) === ".svg") {
          download_to_editor(file[0].link, htmlEditor);
        } else {
          alertify.error("Sorry kodeWeave does not support that file type!");
        }
        window.close();
      },
      cancel: function() {
        //optional
      },
      linkType: "direct", // "preview" or "direct"
      multiselect: false, // true or false
      extensions: [".html", ".css", ".js", ".md", ".svg"]
  };

  $("[data-action=open-dropbox]").click(function() {
    Dropbox.choose(options);
  });

  TogetherJS.hub.on("togetherjs.hello togetherjs.hello-back", function() {
    TogetherJS.reinitialize();
  });

  // Load Files Into Editor
  $("[data-action=open-file]").click(function() {
    $("#loadfile").trigger("click");
  });
  $("#loadfile").on("change", function() {
    loadfile(this);
  });
  
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    function loadfile(input) {
      var reader = new FileReader();
      reader.onload = function(e) {
        // var path = input.value.replace(/.*(\/|\\)/, '');
        var path = input.value;
        if (path.toLowerCase().substring(path.length - 5) === ".html") {
          htmlEditor.setValue( e.target.result );
        } else if (path.toLowerCase().substring(path.length - 4) === ".css") {
          cssEditor.setValue( e.target.result );
        } else if (path.toLowerCase().substring(path.length - 3) === ".js") {
          jsEditor.setValue( e.target.result );
        } else if (path.toLowerCase().substring(path.length - 3) === ".md") {
          mdEditor.setValue( e.target.result );
        } else if (path.toLowerCase().substring(path.length - 3) === ".svg") {
          htmlEditor.setValue( e.target.result );
        } else {
          alertify.error("Sorry kodeWeave does not support that file type!");
        }
      }
      $("[data-action=tools].active").trigger("click");
      reader.readAsText(input.files[0]);
    }
  } else {
    alertify.error("The File APIs are not fully supported in this browser.");
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

// Save Site Title Value for LocalStorage
if ( localStorage.getItem("siteTitle")) {
  $("[data-action=sitetitle]").val(localStorage.getItem("siteTitle")); 
}
$("[data-action=sitetitle]").on("keyup change", function() {
  localStorage.setItem("siteTitle", $("[data-action=sitetitle]").val());
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

$("[data-action=call]").click(function() {
  $("[data-action=load]").trigger("click");
});

// Drag and drop image load
holder.ondragover = function () {
  this.className = "hover";
  return false;
};
holder.ondragend = function () {
  this.className = "";
  return false;
};
holder.ondrop = function(e) {
  this.className = "";
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  desktopExport(file);
  $(".watch").removeClass("hide");
};

var desktopExport = function(file) {
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
    $("[data-action=download-as-mac-app]").on("click", function() {
      if ( $("[data-action=download]").hasClass("active") ) {
        $("[data-action=download]").trigger("click");
      }

      JSZipUtils.getBinaryContent('zips/YourMacApp.zip', function(err, data) {
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
          if (jsEditor.getValue() === "") {
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

        zip.file("data/package.json", '{\n  "main"  : "content/index.html",\n  "name"  : "'+ $("[data-action=sitetitle]").val() +'",\n  "window": {\n    "toolbar"    : false\n  }\n}');
        zip.file("data/content/index.html", '<!doctype html>\n<html>\n <head>\n    <title>'+ $("[data-action=sitetitle]").val() +'</title>\n    <style>\n      iframe {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        overflow: visible;\n        border: 0;\n      }\n    </style>\n  </head>\n <body>\n    <iframe src="app/index.html"></iframe>\n\n    <script src="js/main.js"></script>\n  </body>\n</html>');
        zip.file("data/content/js/main.js", 'document.addEventListener("DOMContentLoaded", function() {\n  // Load library\n  var gui = require("nw.gui");\n\n  // Reference to window\n  var win = gui.Window.get();\n\n  window.addEventListener("keydown", function(e) {\n  // Reload App (CMD+R)\n    if ( e.metaKey && e.keyCode == 82 ) {\n      location.reload(true);\n    }\n  //   else \n  // // Hide Mac App (CMD+W)\n  //   if ( e.metaKey && e.keyCode == 87 ) {\n  //     win.hide();\n  //   }\n    // else\n  // Toggle fullscreen window (CTRL+CMD+F)\n    // if ( e.shiftKey && e.metaKey && e.keyCode == 70 ) {\n      // win.toggleFullscreen();\n    // }\n  });\n\n  // Close buttons hides app\n  // var hidden = false;\n  // gui.App.on("reopen", function(){\n  //   hidden = false;\n  //   win.show();\n  // })\n\n  // win.on("close", function(){\n  //   if (hidden == true) {\n  //     gui.App.quit();\n  //   } else {\n  //     win.hide();\n  //     hidden = true;\n  //   }\n  // });\n\n  // Create menu container\n  var Menu = new gui.Menu({\n    type: "menubar"\n  });\n\n  //initialize default mac menu\n  Menu.createMacBuiltin("'+ $("[data-action=sitetitle]").val() +'");\n\n  // Get the root menu from the default mac menu\n  var rootMenu = Menu.items[2].submenu;\n\n  // Append new item to root menu\n  rootMenu.insert(\n    new gui.MenuItem({\n      type: "normal",\n      label: "Toggle Fullscreen",\n      key: "F",\n      modifiers: "cmd",\n      click : function () {\n        win.toggleFullscreen();\n      }\n    })\n  );\n\n  rootMenu.insert(\n    new gui.MenuItem({\n      type: "normal",\n      label: "Reload App",\n      key: "R",\n      modifiers: "shift-cmd",\n      click : function () {\n        location.reload(true);\n      }\n    })\n  );\n\n  // Append Menu to Window\n  gui.Window.get().menu = Menu;\n});');

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
};

// Check Application Fields (For Download)
$("[data-action=load]").on("change", function(evt) {
  if ( $(this).val() === "" ) {
    $(".watch").addClass("hide");
  } else {
    $(".watch").removeClass("hide");
    var file = evt.target.files[0];
  desktopExport(file);
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

// Save Checked Libraries for LocalStorage
var textarea = $("[data-action=library-code]");
if (localStorage.getItem("checkedLibraries")) {
 textarea.val(localStorage.getItem("checkedLibraries"));

 var lsStored = JSON.parse(localStorage.getItem('checkedInputs')) || [];
 for (var j = 0, jLen = lsStored.length; j < jLen; j++) {
   $('#' + lsStored[j]).prop('checked', true);
 }
}

// Add/Remove Libraries
$("[data-action=check]").on("change", function() {
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

  var checked = $("[type=checkbox].check:checked");
  var lsChecked = [];
  for (var i = 0, iLen = checked.length; i < iLen; i++) {
    lsChecked.push($(checked[i]).attr('id'))
  }
  localStorage.setItem("checkedLibraries", textarea.val());
  localStorage.setItem("checkedInputs", JSON.stringify(lsChecked));
});

shortcutKeys();
initGenerators();
fullscreenEditor();
appDemos();
charGeneration();

// $(window).on("beforeunload", function() {
//   return "Are you sure you wish to leave? All your changes will be lost.";
// });