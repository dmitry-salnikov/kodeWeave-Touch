$(document).ready(function() {
  var myarray = [],
      current = 1,
      activeEditor = $(".activeEditor");
      
  $("#htmlEditor, #cssEditor, #jsEditor").on("mouseup touchend", function() {
    if ( $(this).attr("id") === "htmlEditor" ) {
      activeEditor.val("htmlEditor");
    } else if ( $(this).attr("id") === "cssEditor" ) {
      activeEditor.val("cssEditor");
    } else if ( $(this).attr("id") === "jsEditor" ) {
      activeEditor.val("jsEditor");
    }
  });
  
  $('#splitContainer, #leftSplitter, #rightSplitter').jqxSplitter({
    theme: 'metro'
  });
  
  // Load Files Into Editor
  $(window).load(function() {
    $(".open-html").click(function() {
      $("#loadhtml").trigger('click');
    });
    $(".open-css").click(function() {
      $("#loadcss").trigger('click');
    });
    $(".open-js").click(function() {
      $("#loadjs").trigger('click');
    });

    // Load Files into Editor
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
          $(".tools.active").trigger("click");
        });
        $('#loadcss').on('change', function() {
          loadCSS(this.files);
          $(".tools.active").trigger("click");
        });
        $('#loadjs').on('change', function() {
          loadJS(this.files);
          $(".tools.active").trigger("click");
        });
      }
      catch(event) {
        alert("Oops there's been an error.");
      }
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
    
  }).on("load resize", function() {
    if ( $(this).width() < 681 ) {
      if ( $(this).height() < 600 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "height": "auto",
          "overflow-y": "auto"
        });
      }
    } else {
      if ( $(this).height() < 600 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "height": $(this).height() - 80 + "px",
          "overflow-y": "auto"
        });
      } else if ( $(this).height() < 630 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "height": "auto"
        });
      } else {
        $(".libraries-dialog, .demos-dialog").css({
          "height": "auto"
        });
      }
    }
  });
  
  // Team up / Collaborate
  $("#collaborate").click(function() {
    TogetherJS(this); return false;
  });
  
  // Reset inputs & selects onload
  function resetInputs() {
    $("#search-libraries, select").val("");
  }
  resetInputs();
  
  function reset() {
    alertify.set({
      labels : {
        ok     : "OK",
        cancel : "Cancel"
      },
      delay : 5000,
      buttonReverse : false,
      buttonFocus   : "ok"
    });
  }
  reset();
  
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
  $("header a:not(#collaborate, .dialog a, .grid-alignment)").on("click", function() {
    $(this).not(".dialog a").toggleClass("active");
    $(this).next(":not(.download-zip, #collaborate, .grid-alignment)").not(".dialog a").toggleClass("hide");
    
    if ( $(".tools.active").is(":visible") || $(".add-source.active").is(":visible") || $(".download.active").is(":visible") || $(".open-demos.active").is(":visible")) {
      $("header a:not(#collaborate, .grid-alignment)").not(".dialog a").not(this).removeClass("active").next().addClass("hide");
    }
    
    $(".dialog.fl").css({
      "left": $(this).offset().left
    });
    //$(".dialog.fr").css({
      //"left": $(this).offset().left - $(".dialog.fr").width() + $(this).width()
    //});
  });
  
  // Append JS library to HTML <head>
  function appendLib(txt) {
    var textArea = htmlEditor.getValue();
    var searchText = textArea.search('<head>');
    if(searchText>0) {
      txt = '<head>'+'\n'+txt;
      var updatedTextArea = textArea.replace('<head>',txt);
      htmlEditor.setValue(updatedTextArea);
    }
    else {
      reset();
      alertify.alert('<strong>WARNING!</strong> The &lt;head&gt tag seems to be missing in your HTML. Although your code may still work, we highly recommened that you have a valid HTML syntax. Refer to new document for correct format');
      txt = txt + textArea;
      htmlEditor.setLine(0, txt);
      return false;
    }
  }
  // Append script to HTML <body>
  function appendScript(txt) {
    var textArea = htmlEditor.getValue();
    var searchText = textArea.search('<body>');
    if(searchText > 0) {
      txt = '<body>' + '\n' + txt;
      var updatedTextArea = textArea.replace('<body>', txt);
      htmlEditor.setValue(updatedTextArea);
    }
    else {
      reset();
      alertify.alert('<strong>WARNING!</strong> The &lt;body&gt tag seems to be missing in your HTML. Although your code may still work, we highly recommened that you have a valid HTML syntax. Refer to new document for correct format');
      txt = txt + textArea;
      htmlEditor.setLine(0, txt);
      return false;
    }
  }
  
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
  
  // Fullscreen Editor
  $(function() {
    $(".fullscreen-html-toggle").click(function() {
      $(this).toggleClass("fill unfill");
      if ( $(".fullscreen-html-toggle.unfill").is(":visible") ) {
        $(this).html('<span class="fa fa-expand" id="fullscreen-html"></span>');
        GridScheme();
      } else if ( $(".fullscreen-html-toggle.fill").is(":visible") ) {
        $(this).html('<span class="fa fa-compress" id="fullscreen-html"></span>');
        $('#splitContainer').jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: 'vertical',
          showSplitBar: false,
          panels: [{ size: '100%' },
                   { size: '100%' }]
        });
        $('#leftSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '100%' },
                   { size: '0%'}]
        });
        $('#rightSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '0%'},
                   { size: '0%'}]
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
        $('#splitContainer').jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: 'vertical',
          showSplitBar: false,
          panels: [{ size: '100%' },
                   { size: '100%' }]
        });
        $('#leftSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '0%' },
                   { size: '100%'}]
        });
        $('#rightSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '100%'},
                   { size: '0%'}]
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
        $('#splitContainer').jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: 'vertical',
          showSplitBar: false,
          panels: [{ size: '0%' },
                   { size: '100%' }]
        });
        $('#leftSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '0%' },
                   { size: '0%'}]
        });
        $('#rightSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '100%'},
                   { size: '0%'}]
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
        $('#splitContainer').jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: 'vertical',
          showSplitBar: false,
          panels: [{ size: '0%' },
                   { size: '100%' }]
        });
        $('#leftSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '0%' },
                   { size: '0%'}]
        });
        $('#rightSplitter').jqxSplitter({
          height: '100%',
          width: '100%',
          orientation: 'horizontal',
          showSplitBar: false,
          panels: [{ size: '0%'},
                   { size: '100%'}]
        });
      }
    });
  });
  
  // Hotkeys
  $(function() {
    // New Document
    shortcut.add("Ctrl+N", function() {
      htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>site name</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n  </head>\n  <body>\n    <!-- comment -->\n    hello world!\n  </body>\n</html>");
      cssEditor.setValue("");
      jsEditor.setValue("");
    });
    // Export layout hotkey
    shortcut.add("Ctrl+S", function() {
      $(".download-zip").trigger("click");
      $(".download").trigger("click");
    });
    
    var dest = $(".projectname");
    var content =  htmlEditor.getValue();
    var openTagIndex = content.search(/<title/);
    var closeTagIndex = content.search(/<\/title>/);
    var titleTag = content.slice(openTagIndex , closeTagIndex);
    var editorTitle = titleTag.slice(titleTag.search(/>/) + 1);  
    dest.val(editorTitle).val(dest.val().split(" ").join(""));
  });
  
  // Download
  $(function() {

    // Download as Android Project
    $(".download-as-droid-app").on("click", function() {
      $(".download").trigger("click");
      
      JSZipUtils.getBinaryContent('YourAndroidApp.zip', function(err, data) {
        if(err) {
          throw err; // or handle err
        }
        
        var zip = new JSZip(data);
        
        var htmlContent = htmlEditor.getValue();
        var cssContent = cssEditor.getValue();
        var jsContent = jsEditor.getValue();
        
        var cssLink="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\""+"/>"+"\n";
        var jsLink="    <"+"script type=\"text/javascript\" src=\"js/script.js\">"+"</"+"script"+">"+"\n";
        
        cssLink = cssLink + "</head>";
        jsLink = jsLink + "</body>";
        
        htmlContent = htmlContent.replace("</head>",cssLink);
        htmlContent = htmlContent.replace("</body>",jsLink);
        
        // Your Android Files
        zip.file("AndroidManifest.xml", "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<manifest xmlns:android=\"http://schemas.android.com/apk/res/android\"\n    android:windowSoftInputMode=\"adjustPan\"\n	package=\"com.kodeweave."+ $('.projectname').val() +"\"\n    android:versionName=\"1.0.0\" android:versionCode=\"1\"\n	android:hardwareAccelerated=\"true\">\n	\n	<support-screens\n		android:xlargeScreens=\"true\"\n		android:largeScreens=\"true\"\n		android:normalScreens=\"true\"\n		android:smallScreens=\"true\"\n		android:anyDensity=\"true\" />\n	\n	<uses-permission android:name=\"android.permission.INTERNET\" />\n	<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\" />\n	\n    <application\n        android:icon=\"@drawable/logo\"\n        android:label=\"@string/app_name\" \n		android:hardwareAccelerated=\"true\">\n        <activity\n            android:name=\".MainActivity\"\n            android:label=\"@string/app_name\"\n			android:configChanges=\"orientation|keyboardHidden|keyboard|screenSize|locale\"\n			>\n            <intent-filter >\n                <action android:name=\"android.intent.action.MAIN\" />\n                <category android:name=\"android.intent.category.LAUNCHER\" />\n            </intent-filter>\n        </activity>\n    </application>\n\n    <uses-sdk \n        android:minSdkVersion=\"7\" \n        android:targetSdkVersion=\"17\" />\n\n</manifest>\n");
        zip.file("src/com/kodeweave/" + $('.projectname').val() + "/MainActivity.java", "package com.kodeweave." + $('.projectname').val() + ";\n\nimport android.os.Bundle;\nimport org.apache.cordova.*;\n\npublic class MainActivity extends DroidGap\n{\n    /** Called when the activity is first created. */\n    @Override\n    public void onCreate(Bundle savedInstanceState)\n	{\n        super.onCreate(savedInstanceState);\n        // Set by <content src=\"index.html\" /> in config.xml\n		super.loadUrl(Config.getStartUrl());\n		// super.loadUrl(\"file://android_asset/www/index.html\")\n    }\n}\n");
        zip.file("res/values/strings.xml", "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources>\n    <string name=\"app_name\">" + $('.projectname').val() + "</string>\n</resources>\n");
        
        // Your Web App
        zip.file("assets/www/css/style.css", cssContent);
        zip.file("assets/www/js/script.js", jsContent);
        zip.file("assets/www/index.html", htmlContent);
        var content = zip.generate({type:"blob"});
        saveAs(content, $('.projectname').val() + "-android.zip");
      });
    });
    
    // Download as iOS App
    $(".download-as-ios-app").on("click", function() {
      $(".download").trigger("click");
      
      JSZipUtils.getBinaryContent('YouriOSApp.zip', function(err, data) {
        if(err) {
          throw err; // or handle err
        }
        
        var zip = new JSZip(data);
        
        var htmlContent = htmlEditor.getValue();
        var cssContent = cssEditor.getValue();
        var jsContent = jsEditor.getValue();
        
        var cssLink="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\""+"/>"+"\n";
        var jsLink="    <"+"script type=\"text/javascript\" src=\"js/script.js\">"+"</"+"script"+">"+"\n";
        
        cssLink = cssLink + "</head>";
        jsLink = jsLink + "</body>";
        
        htmlContent = htmlContent.replace("</head>",cssLink);
        htmlContent = htmlContent.replace("</body>",jsLink);
        
        // Your Web App
        zip.file("www/css/style.css", cssContent);
        zip.file("www/js/script.js", jsContent);
        zip.file("www/index.html", htmlContent);
        zip.file("config.xml", "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!--\n Licensed to the Apache Software Foundation (ASF) under one\n or more contributor license agreements.  See the NOTICE file\n distributed with this work for additional information\n regarding copyright ownership.  The ASF licenses this file\n to you under the Apache License, Version 2.0 (the\n \"License\"); you may not use this file except in compliance\n with the License.  You may obtain a copy of the License at\n\n http://www.apache.org/licenses/LICENSE-2.0\n\n Unless required by applicable law or agreed to in writing,\n software distributed under the License is distributed on an\n \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n KIND, either express or implied.  See the License for the\n specific language governing permissions and limitations\n under the License.\n-->\n<widget xmlns     = \"http://www.w3.org/ns/widgets\"\n        id        = \"io.kodeweave."+ $('.projectname').val() +"\"\n        version   = \"2.0.0\">\n    <name>"+ $('.projectname').val() +"</name>\n\n    <description>\n        This application for iOS was exported using kodeWeave.\n    </description>\n\n    <author href=\"http://cordova.io\" email=\"dev@cordova.apache.org\">\n        Apache Cordova Team\n    </author>\n\n    <access origin=\"*\"/>\n\n    <!-- <content src=\"http://mysite.com/myapp.html\" /> for external pages -->\n    <content src=\"index.html\" />\n\n    <!-- Preferences for iOS -->\n    <preference name=\"AllowInlineMediaPlayback\" value=\"false\" />\n    <preference name=\"AutoHideSplashScreen\" value=\"true\" />\n    <preference name=\"BackupWebStorage\" value=\"cloud\" />\n    <preference name=\"DisallowOverscroll\" value=\"false\" />\n    <preference name=\"EnableLocation\" value=\"false\" /><!-- DEPRECATED -->\n    <preference name=\"EnableViewportScale\" value=\"false\" />\n    <preference name=\"FadeSplashScreen\" value=\"true\" />\n    <preference name=\"FadeSplashScreenDuration\" value=\".25\" />\n    <preference name=\"HideKeyboardFormAccessoryBar\" value=\"false\" />\n    <preference name=\"KeyboardDisplayRequiresUserAction\" value=\"true\" />\n    <preference name=\"KeyboardShrinksView\" value=\"false\" />\n    <preference name=\"MediaPlaybackRequiresUserAction\" value=\"false\" />\n    <preference name=\"ShowSplashScreenSpinner\" value=\"true\" />\n    <preference name=\"SuppressesIncrementalRendering\" value=\"false\" />\n    <preference name=\"TopActivityIndicator\" value=\"gray\" />\n\n\n    <feature name=\"Geolocation\">\n      <param name=\"ios-package\" value=\"CDVLocation\"/>\n    </feature>\n    <feature name=\"Device\">\n      <param name=\"ios-package\" value=\"CDVDevice\"/>\n    </feature>\n    <feature name=\"Accelerometer\">\n      <param name=\"ios-package\" value=\"CDVAccelerometer\"/>\n    </feature>\n    <feature name=\"Compass\">\n      <param name=\"ios-package\" value=\"CDVLocation\"/>\n    </feature>\n    <feature name=\"Media\">\n      <param name=\"ios-package\" value=\"CDVSound\"/>\n    </feature>\n    <feature name=\"Camera\">\n      <param name=\"ios-package\" value=\"CDVCamera\"/>\n    </feature>\n    <feature name=\"Contacts\">\n      <param name=\"ios-package\" value=\"CDVContacts\"/>\n    </feature>\n    <feature name=\"File\">\n      <param name=\"ios-package\"  value=\"CDVFile\"/>\n    </feature>\n    <feature name=\"NetworkStatus\">\n      <param name=\"ios-package\" value=\"CDVConnection\"/>\n    </feature>\n    <feature name=\"Notification\">\n      <param name=\"ios-package\" value=\"CDVNotification\"/>\n    </feature>\n    <feature name=\"FileTransfer\">\n      <param name=\"ios-package\" value=\"CDVFileTransfer\"/>\n    </feature>\n    <feature name=\"Capture\">\n      <param name=\"ios-package\" value=\"CDVCapture\"/>\n    </feature>\n    <feature name=\"Battery\">\n      <param name=\"ios-package\" value=\"CDVBattery\"/>\n    </feature>\n    <feature name=\"SplashScreen\">\n      <param name=\"ios-package\" value=\"CDVSplashScreen\"/>\n    </feature>\n    <feature name=\"Echo\">\n      <param name=\"ios-package\" value=\"CDVEcho\"/>\n    </feature>\n    <feature name=\"Globalization\">\n      <param name=\"ios-package\" value=\"CDVGlobalization\"/>\n    </feature>\n    <feature name=\"InAppBrowser\">\n      <param name=\"ios-package\" value=\"CDVInAppBrowser\"/>\n    </feature>\n    <feature name=\"Logger\">\n      <param name=\"ios-package\" value=\"CDVLogger\"/>\n    </feature>\n    <feature name=\"LocalStorage\">\n        <param name=\"ios-package\" value=\"CDVLocalStorage\"/>\n    </feature>\n</widget>\n");
        zip.file("README", "If kodeWeave was at all helpful for you. Would you consider donating to the project?\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSYGA2RB5ZJCC\n\n");
        var content = zip.generate({type:"blob"});
        saveAs(content, $('.projectname').val() + "-ios.zip");
      });
    });
    
    // Download as Windows App
    $(".download-as-win-app").on("click", function() {
      $(".download").trigger("click");
      
      JSZipUtils.getBinaryContent('YourWinApp.zip', function(err, data) {
        if(err) {
          throw err; // or handle err
        }
        
        var zip = new JSZip(data);
        
        var htmlContent = htmlEditor.getValue();
        var cssContent = cssEditor.getValue();
        var jsContent = jsEditor.getValue();
        
        var cssLink="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\""+"/>"+"\n";
        var jsLink="    <"+"script type=\"text/javascript\" src=\"js/script.js\">"+"</"+"script"+">"+"\n";
        
        cssLink = cssLink + "</head>";
        jsLink = jsLink + "</body>";
        
        htmlContent = htmlContent.replace("</head>",cssLink);
        htmlContent = htmlContent.replace("</body>",jsLink);
        
        // Your Web App
        zip.file("data/content/css/style.css", cssContent);
        zip.file("data/content/js/script.js", jsContent);
        zip.file("data/content/index.html", htmlContent);
        var content = zip.generate({type:"blob"});

        saveAs(content, $('.projectname').val() + "-win.zip");
      });
    });
    
    // Download as Mac App
    $(".download-as-mac-app").on("click", function() {
      $(".download").trigger("click");
      
      JSZipUtils.getBinaryContent('YourMacApp.zip', function(err, data) {
        if(err) {
          throw err; // or handle err
        }
        
        var zip = new JSZip(data);
        
        var htmlContent = htmlEditor.getValue();
        var cssContent = cssEditor.getValue();
        var jsContent = jsEditor.getValue();
        
        var cssLink="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\""+"/>"+"\n";
        var jsLink="    <"+"script type=\"text/javascript\" src=\"js/script.js\">"+"</"+"script"+">"+"\n";
        
        cssLink = cssLink + "</head>";
        jsLink = jsLink + "</body>";
        
        htmlContent = htmlContent.replace("</head>",cssLink);
        htmlContent = htmlContent.replace("</body>",jsLink);
        
        // Your Web App
        zip.file("data/content/css/style.css", cssContent);
        zip.file("data/content/js/script.js", jsContent);
        zip.file("data/content/index.html", htmlContent);
        var content = zip.generate({type:"blob"});
        saveAs(content, $('.projectname').val() + "-mac.zip");
      });
    });
    
    // Download as Linux App
    $(".download-as-lin-app").on("click", function() {
      $(".download").trigger("click");
      
      JSZipUtils.getBinaryContent('YourLinApp.zip', function(err, data) {
        if(err) {
          throw err; // or handle err
        }
        
        var zip = new JSZip(data);
        
        var htmlContent = htmlEditor.getValue();
        var cssContent = cssEditor.getValue();
        var jsContent = jsEditor.getValue();
        
        var cssLink="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\""+"/>"+"\n";
        var jsLink="    <"+"script type=\"text/javascript\" src=\"js/script.js\">"+"</"+"script"+">"+"\n";
        
        cssLink = cssLink + "</head>";
        jsLink = jsLink + "</body>";
        
        htmlContent = htmlContent.replace("</head>",cssLink);
        htmlContent = htmlContent.replace("</body>",jsLink);
        
        // Your Web App
        zip.file("app/css/style.css", cssContent);
        zip.file("app/js/script.js", jsContent);
        zip.file("app/index.html", htmlContent);
        zip.file("source.c", "/*\n  Save this file as main.c and compile it using this command\n  (those are backticks, not single quotes):\n    gcc -Wall -g -o main main.c `pkg-config --cflags --libs gtk+-2.0 webkit-1.0` -export-dynamic\n  \n  Then execute it using:\n  ./main\n  \n  If you can't compile chances are you don't have gcc installed.\n  Install gcc/c with the following terminal command. (This command is for Debian based Linux distros)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc\n  \n  WebKit requires libraries to successfully aquire, configure, and compile. You can get libraries by issuing the following command in your terminal:\n    sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n  \n  Ubuntu Webkit information - https://help.ubuntu.com/community/WebKit\n    sudo apt-get install libwebkitgtk-dev python-webkit-dev python-webkit\n  \n  Required dependencies for this build: (If you installed all the above this is not needed)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev libwebkitgtk-dev\n*/\n\n#include <limits.h>\n#include <gtk/gtk.h>\n#include <webkit/webkit.h>\n\nstatic GtkWidget* window;\nstatic WebKitWebView* web_view;\n\nstatic void destroy_cb (GtkWidget* widget, gpointer data) {\n  gtk_main_quit();\n}\n\nstatic GtkWidget* create_browser() {\n  GtkWidget* scrolled_window = gtk_scrolled_window_new (NULL, NULL);\n  gtk_scrolled_window_set_policy (GTK_SCROLLED_WINDOW (scrolled_window), GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);\n\n  web_view = WEBKIT_WEB_VIEW (webkit_web_view_new ());\n  gtk_container_add (GTK_CONTAINER (scrolled_window), GTK_WIDGET (web_view));\n\n  return scrolled_window;\n}\n\nint main (int argc, char* argv[]) {\n  gtk_init (&argc, &argv);\n\n  GtkWidget* vbox = gtk_vbox_new (FALSE, 0);\n  gtk_box_pack_start (GTK_BOX (vbox), create_browser(), TRUE, TRUE, 0);\n\n  GtkWidget* window = gtk_window_new (GTK_WINDOW_TOPLEVEL);\n  gtk_window_set_default_size (GTK_WINDOW (window), 800, 560);\n  gtk_widget_set_name (window, \"" + $('.projectname').val() + "\");\n  /* gtk_window_set_icon_from_file(window, \"app/logo.png\", NULL); */\n  g_signal_connect (G_OBJECT (window), \"destroy\", G_CALLBACK (destroy_cb), NULL);\n  gtk_container_add (GTK_CONTAINER (window), vbox);\n  \n  char uri[PATH_MAX];\n  char cwd[PATH_MAX];\n\n  getcwd(cwd, sizeof(cwd));\n\n  if (argc > 1)\n      snprintf(uri, sizeof(uri), \"%s\", argv[1]);\n  else\n      snprintf(uri, sizeof(uri), \"file://%s/" + $('.projectname').val() + "/app/index.html\", cwd);\n  \n  webkit_web_view_open (web_view, uri);\n\n  gtk_widget_grab_focus (GTK_WIDGET (web_view));\n  gtk_widget_show_all (window);\n  gtk_main ();\n\n  return 0;\n}\n");
        zip.file("README", "This application for Linux relies on the following dependencies...\n  sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n\nIf kodeWeave was at all helpful for you. Would you consider donating to the project?\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSYGA2RB5ZJCC\n\n");
        var content = zip.generate({type:"blob"});
        saveAs(content, $('.projectname').val() + "-lin.zip");
      });
    });
    
    // Download as PyGTK App
    $(".download-as-pygtk-app").on("click", function() {
      $(".download").trigger("click");
      var zip = new JSZip();
      
      var htmlContent = htmlEditor.getValue();
      var cssContent = cssEditor.getValue();
      var jsContent = jsEditor.getValue();
      
      var cssLink="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\""+"/>"+"\n";
      var jsLink="    <"+"script type=\"text/javascript\" src=\"js/script.js\">"+"</"+"script"+">"+"\n";
      
      cssLink = cssLink + "</head>";
      jsLink = jsLink + "</body>";
      
      htmlContent = htmlContent.replace("</head>",cssLink);
      htmlContent = htmlContent.replace("</body>",jsLink);
      
      // Your Web App
      zip.file($('.projectname').val() + "/app/css/style.css", cssContent);
      zip.file($('.projectname').val() + "/app/js/script.js", jsContent);
      zip.file($('.projectname').val() + "/app/index.html", htmlContent);
      zip.file($('.projectname').val() + "/app.py", "#!/usr/bin/env python\n\nimport webkit, pygtk, gtk, os\n\nif gtk.pygtk_version < (2,3,90):\n  print \"Please upgrade pygtk\"\n  raise SystemExit\n\nclass "+ $('.projectname').val() +":\n  def __init__(self):\n      \n    def reload_page(frame, event):\n      if event.keyval == gtk.keysyms.F5:\n        web.reload()\n      \n    def fill_screen(self, event):\n      if event.keyval == gtk.keysyms.F11:\n        if full.get_active() == False:\n          full.set_active(True)\n          win.fullscreen()\n        else:\n          full.set_active(False)\n          win.unfullscreen()\n      \n    win = gtk.Window(gtk.WINDOW_TOPLEVEL)\n    win.set_title(\""+ $('.projectname').val() +"\")\n    win.resize(800,600)\n    win.connect(\"destroy\", lambda w: gtk.main_quit())\n    win.connect(\"key-press-event\", reload_page)\n    win.connect(\"key-press-event\", fill_screen)\n    \n    vbox = gtk.VBox()\n    hbox = gtk.HBox()\n    mb = gtk.MenuBar()\n    viewmenu = gtk.Menu()\n    vm = gtk.MenuItem(\"View\")\n    vm.set_submenu(viewmenu)\n\n    full = gtk.CheckMenuItem()\n    full.set_label(\"Fullscreen\")\n    full.set_active(False)\n    full.connect(\"activate\", fill_screen)\n    viewmenu.append(full)\n    mb.append(vm)\n\n    vbox = gtk.VBox(False, 0)\n    win.add(vbox)\n       \n    scroller = gtk.ScrolledWindow()\n    vbox.pack_start(scroller, 1)\n    web = webkit.WebView()\n    path=os.getcwd()\n    print path\n    web.open(\"file://\" + path + \"/app/index.html\")\n    web.props.settings.props.enable_default_context_menu = True\n    scroller.add(web)\n    win.show_all()\n\n"+ $('.projectname').val() +"()\ngtk.main()\n");
      zip.file($('.projectname').val() + "/README", "PyGTK information - http://www.pygtk.org/downloads.html\nUbuntu Webkit information - https://help.ubuntu.com/community/WebKit\n\nThis PyGTK application relies on webkit, pygtk, gtk, os\n  sudo apt-get install libwebkitgtk-dev python-webkit-dev python-webkit\n\n~~~...For Linux users...~~~\nUsing `apt-cache search your_package` is handy when you cannot find a package.\n\nOpen your terminal and navigate to it using...\ncd Desktop/AppName\n\nTo run type ./app.py or python app.py\n\nIf kodeWeave was at all helpful for you. Would you consider donating to the project?\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSYGA2RB5ZJCC\n\n");
      var content = zip.generate({type:"blob"});
      saveAs(content, $('.projectname').val() + "-pygtk.zip");
    });
    
    // Download as html
    $(".download-html").on("click", function() {
      $(".download").trigger("click");
      saveTextAsHTML();
    });

    // Download as zip
    $(".download-zip").on("click", function() {
      $(".download").trigger("click");
      downloadZip();
    });
    
    // Download function
    function downloadZip() {
      var zip = new JSZip();
      
      var htmlContent = htmlEditor.getValue();
      var cssContent = cssEditor.getValue();
      var jsContent = jsEditor.getValue();
      
      var cssLink="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\""+"/>"+"\n";
      var jsLink="    <"+"script type=\"text/javascript\" src=\"js/script.js\">"+"</"+"script"+">"+"\n";
      
      cssLink = cssLink + "</head>";
      jsLink = jsLink + "</body>";
      
      htmlContent = htmlContent.replace("</head>",cssLink);
      htmlContent = htmlContent.replace("</body>",jsLink);

      zip.file("css/style.css", cssContent);
      zip.file("js/script.js", jsContent);
      zip.file("index.html", htmlContent);
      var content = zip.generate({type:"blob"});
      // see FileSaver.js
      saveAs(content, "source.zip");
    }
  });
  
  // Generators
  $(function() {
    // Text generator (Lorem Ipsum)
    $(".ipsum").click(function() {
      if ( activeEditor.val() === "htmlEditor" ) {
        htmlEditor.replaceSelection("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        $(".tools.active").trigger("click");
        htmlEditor.focus();
      } else if ( activeEditor.val() === "cssEditor" ) {
        cssEditor.replaceSelection("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        $(".tools.active").trigger("click");
        cssEditor.focus();
        // alertify.error("Lorem ipsum is not allowed in cssEditor.");
      } else if ( activeEditor.val() === "jsEditor" ) {
        jsEditor.replaceSelection("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        $(".tools.active").trigger("click");
        jsEditor.focus();
      }
    });
    
    // Color Picker
    $(".picker").spectrum({
      preferredFormat: "hex",
      className: "full-spectrum",
      flat: true,
      allowEmpty: true,
      showAlpha: true,
      showInitial: true,
      showInput: true,
      showPalette: true,
      showSelectionPalette: true,
      maxPaletteSize: 10,
      maxSelectionSize: 10,
      palette: [ ],
      change: function(color) {
        if ( activeEditor.val() === "htmlEditor" ) {
          htmlEditor.replaceSelection( color.toString() );
        } else if ( activeEditor.val() === "cssEditor" ) {
          cssEditor.replaceSelection( color.toString() );
        } else if ( activeEditor.val() === "jsEditor" ) {
          jsEditor.replaceSelection( color.toString() );
        }
      }
    });
  });
  
  // Add Libraries
  $(function() {
    $("#add-library").on("click", function() {
      var $val = $("#search-libraries").val();
      var myjs = ".js";
      var findJS = myjs.substr(myjs.length - 3); // => ".js"
      var mycss = ".css";
      var findCSS = mycss.substr(mycss.length - 4); // => ".css"
      
      if ( $val === "" ) {
        alertify.error("Access denied! No value set.");
      } else if ($.inArray($val.toLowerCase(), ["angularjs"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["backbone", "backbonejs"]) > -1) {
        txt1="    <"+"script type=\"text/javascript\" src=\"http://documentcloud.github.io/backbone/backbone-min.js\">"+"</"+"script"+">\n";
        txt2="    <"+"script type=\"text/javascript\" src=\"http://documentcloud.github.io/underscore/underscore-min.js\">"+"</"+"script"+">";
        appendLib(txt1 + txt2);
      } else if ($.inArray($val.toLowerCase(), ["bootstrap"]) > -1) {
        txt1="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"http://getbootstrap.com/dist/css/bootstrap.css\" />\n";
        txt2="    <"+"script type=\"text/javascript\" src=\"http://code.jquery.com/jquery.min.js\">"+"</"+"script"+">\n";
        txt3="    <"+"script type=\"text/javascript\" src=\"http://getbootstrap.com/dist/js/bootstrap.js\">"+"</"+"script"+">";
        appendLib(txt1 + txt2 + txt3);
      } else if ($.inArray($val.toLowerCase(), ["createjs", "create js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://code.createjs.com/createjs-2013.09.25.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["chartjs", "chart js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://cdnjs.cloudflare.com/ajax/libs/Chart.js/0.2.0/Chart.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["d3"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://d3js.org/d3.v3.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["dojo"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["ember"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://builds.emberjs.com/tags/v1.1.2/ember.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["enyojs", "enyo js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://nightly.enyojs.com/latest/enyo/enyo.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["extjs", "ext js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://cdn.sencha.io/ext-4.2.0-gpl/ext-all.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["fabricjs", "fabric js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.3.0/fabric.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["fontawesome", "font awesome", "fa"]) > -1) {
        txt="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"http://netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.css\" />";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["jquery"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["jqui", "jq ui", "jqueryui", "jquery ui"]) > -1) {
        txt1="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/smoothness/jquery-ui.css\" />\n";
        txt2="    <"+"script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\">"+"</"+"script"+">\n";
        txt3="    <"+"script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js\">"+"</"+"script"+">";
        appendLib(txt1 + txt2 + txt3);
      } else if ($.inArray($val.toLowerCase(), ["jqmobile", "jq mobile", "jquerymobile", "jquery mobile"]) > -1) {
        txt1="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"http://demos.jquerymobile.com/1.4.5/css/themes/default/jquery.mobile-1.4.5.min.css\" />\n";
        txt2="    <"+"script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\">"+"</"+"script"+">\n";
        txt3="    <"+"script type=\"text/javascript\" src=\"http://demos.jquerymobile.com/1.4.5/js/jquery.mobile-1.4.5.min.js\">"+"</"+"script"+">";
        appendLib(txt1 + txt2 + txt3);
      } else if ($.inArray($val.toLowerCase(), ["jqtools", "jq tools", "jquerytools", "jquery tools"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["jszip"]) > -1) {
        txt1="    <"+"script type=\"text/javascript\" src=\"http://stuk.github.io/jszip/dist/jszip.min.js\">"+"</"+"script"+">\n";
        txt2="    <"+"script type=\"text/javascript\" src=\"http://stuk.github.io/jszip-utils/dist/jszip-utils.js\">"+"</"+"script"+">\n";
        txt3="    <"+"script type=\"text/javascript\" src=\"http://stuk.github.io/jszip/vendor/FileSaver.js\">"+"</"+"script"+">";
        appendLib(txt1 + txt2 + txt3);
      } else if ($.inArray($val.toLowerCase(), ["kineticjs", "kinetic js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.3.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["knockoutjs", "knockout js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://knockoutjs.com/downloads/knockout-3.0.0.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["modernizr"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://modernizr.com/downloads/modernizr-latest.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["mootools"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/mootools/1/mootools-yui-compressed.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["normalize"]) > -1) {
        txt="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["paperjs", "paper js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.9/paper.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["processingjs", "processing js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://cloud.github.com/downloads/processing-js/processing-js/processing-1.4.1.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["prototypejs", "prototype js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["qooxdoo"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://demo.qooxdoo.org/3.0.1/framework/q-3.0.1.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["raphaeljs", "raphael js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["requirejs", "require js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://requirejs.org/docs/release/2.1.16/minified/require.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["script.aculo.us", "script aculous", "scriptaculous"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/scriptaculous/1/scriptaculous.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["snapsvg", "snap js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://snapsvg.io/assets/js/snap.svg-min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["svgjs", "svg js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"https://raw.github.com/wout/svg.js/master/dist/svg.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["threejs", "three js", "3js", "3 js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://threejs.org/build/three.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["underscorejs", "underscore js"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://underscorejs.org/underscore-min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["webfontloader", "web font loader", "wfl", "webfont loader", "web fontloader"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/webfont/1.4.10/webfont.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["yui"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($.inArray($val.toLowerCase(), ["zepto"]) > -1) {
        txt="    <"+"script type=\"text/javascript\" src=\"http://zeptojs.com/zepto.min.js\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($val.toLowerCase().substring($val.length - 3) === ".js") {
        txt="    <"+"script type=\"text/javascript\" src=\""+ $val +"\">"+"</"+"script"+">";
        appendLib(txt);
      } else if ($val.toLowerCase().substring($val.length - 4) === ".css") {
        txt="    <"+"link type=\"text/css\" rel=\"stylesheet\" href=\""+ $val +"\" />";
        appendLib(txt);
      }
      
      if ( $val === "" ) {
        // error alert specified earlier
      } else {
        alertify.success("Successfully added library");
      }
      
      htmlEditor.focus();
      resetInputs();
      $(".open-libraries").trigger("click");
    });
    
    $(".addlibrary-tablets a").on("click", function() {
      $("#search-libraries").val( $(this).parent().prop("id") );
      $("#add-library").trigger("click");
    });

    $("#search-select-libraries").on("change", function() {
      $("#search-libraries").val( $(this).val() );
    });

    // Adds JS Sources
    $("#search-libraries").keyup(function(e) {
      if (e.which === 13) {
        $("#add-library").trigger("click");
      }
    });
  });
  
  // Demos
  $(function() {
    $("#add-demo").on("click", function() {
      var $val = $("#search-demos").val();
      
      if ( $val === "" ) {
        alertify.error("Sorry! No demo picked.");
      } else if ($.inArray($val.toLowerCase(), ["360deg angle slider"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>360 Degree Angle Slider</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  </head>\n  <body>\n    <div class=\"angleInput\">\n      <svg class=\"angler\" width=\"50\" height=\"50\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <radialGradient spreadMethod=\"pad\" id=\"svg_10\">\n            <stop offset=\"0.90887\" stop-opacity=\"0.99609\" stop-color=\"#e1e1e1\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99609\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_11\">\n            <stop offset=\"0.81122\" stop-opacity=\"0.99609\" stop-color=\"#e1e1e1\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99609\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_12\">\n            <stop offset=\"0.76434\" stop-opacity=\"0.99609\" stop-color=\"#e1e1e1\"/>\n            <stop offset=\"0.92059\" stop-opacity=\"0.99609\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_13\">\n            <stop offset=\"0.81903\" stop-opacity=\"0.99609\" stop-color=\"#e1e1e1\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_14\">\n            <stop offset=\"0.81903\" stop-opacity=\"0.99609\" stop-color=\"#e1e1e1\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_16\">\n            <stop offset=\"0.00262\" stop-opacity=\"0.99219\" stop-color=\"#e1e1e1\"/>\n            <stop offset=\"1\" stop-opacity=\"0.01172\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_18\">\n            <stop offset=\"0\" stop-opacity=\"0.99219\" stop-color=\"#adadad\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_19\">\n            <stop offset=\"0\" stop-opacity=\"0.98828\" stop-color=\"#777777\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_20\">\n            <stop offset=\"0\" stop-opacity=\"0.98438\" stop-color=\"#b2b2b2\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_21\">\n            <stop offset=\"0\" stop-opacity=\"0.98047\" stop-color=\"#cccccc\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_22\">\n            <stop offset=\"0.81122\" stop-opacity=\"0.98047\" stop-color=\"#cccccc\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_24\">\n            <stop offset=\"0.37372\" stop-opacity=\"0.97656\" stop-color=\"#b7b7b7\"/>\n            <stop offset=\"0.70966\" stop-opacity=\"0.03516\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_25\">\n            <stop offset=\"0\" stop-opacity=\"0.97656\" stop-color=\"#b7b7b7\"/>\n            <stop offset=\"0.70966\" stop-opacity=\"0.03516\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_26\">\n            <stop offset=\"0.77606\" stop-opacity=\"0.98047\" stop-color=\"#cccccc\"/>\n            <stop offset=\"0.93622\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_27\">\n            <stop offset=\"0.83856\" stop-opacity=\"0.98047\" stop-color=\"#cccccc\"/>\n            <stop offset=\"0.95184\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_28\">\n            <stop offset=\"0.86591\" stop-opacity=\"0.98047\" stop-color=\"#cccccc\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_29\">\n            <stop offset=\"0.81903\" stop-opacity=\"0.98047\" stop-color=\"#cccccc\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_30\">\n            <stop offset=\"0.81903\" stop-opacity=\"0.97656\" stop-color=\"#dbdbdb\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_31\">\n            <stop offset=\"0.81903\" stop-opacity=\"0.97266\" stop-color=\"#e5e5e5\"/>\n            <stop offset=\"1\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n          <radialGradient r=\"0.5\" cy=\"0.5\" cx=\"0.5\" spreadMethod=\"pad\" id=\"svg_32\">\n            <stop offset=\"0.81903\" stop-opacity=\"0.97266\" stop-color=\"#e5e5e5\"/>\n            <stop offset=\"0.91278\" stop-opacity=\"0.99219\" stop-color=\"#ffffff\"/>\n          </radialGradient>\n        </defs>\n        <g>\n          <title>Layer 1</title>\n          <circle id=\"svg_9\" stroke-width=\"2\" stroke=\"#727272\" r=\"22.07772\" cy=\"25\" cx=\"25\" fill=\"url(#svg_32)\"/>\n          <g id=\"svg_17\">\n            <rect stroke=\"#727272\" id=\"svg_4\" height=\"18.75\" width=\"1.15\" y=\"5.475\" x=\"24.5\" stroke-linecap=\"null\" stroke-linejoin=\"null\" stroke-dasharray=\"null\" stroke-width=\"0\" fill=\"#727272\"/>\n            <rect stroke=\"#727272\" id=\"svg_8\" height=\"2.8\" width=\"3.1\" y=\"23.5\" x=\"23.5\" stroke-linecap=\"null\" stroke-linejoin=\"null\" stroke-dasharray=\"null\" stroke-width=\"0\" fill=\"#727272\"/>\n          </g>\n        </g>\n      </svg>\n      <input type=\"text\" value=\"0\">\n    </div>\n  </body>\n</html>\n\n");
        cssEditor.setValue("html, body {\n  background: #ccc;\n}\n\n.angler {\n  display: inline-block;\n}\n\n.angleInput {\n  padding: 1em;\n}");
        jsEditor.setValue("$(document).ready(function() {\n  $(\".angleInput\").each(function() {\n    var container = $(this),\n        body = $(document.body),\n        angler = container.find(\".angler\"),\n        input = container.find(\"input\"),\n        val = 0;\n\n    angler.on(\"mousedown touchstart\", mouseDown);\n    body.on(\"mouseup touchstop\", mouseUp);\n\n    input.on(\"blur keyup change\", function() {\n      if (input.val() != val) {\n        setAngle(input.val());\n      }\n    });\n\n    function setAngle(value) {\n      angler.css(\"transform\", \"rotate(\" + value + \"deg)\");\n      input.val(value);\n    }\n\n    function mouseDown(event) {\n      body.on(\"mousemove.angleInput\", handleMove);\n      handleMove(event);\n      event.preventDefault();\n    }\n\n    function mouseUp(event) {\n      body.off(\"mousemove.angleInput\", handleMove);\n    }\n\n    function handleMove(event) {\n      var mouseX = event.pageX;\n      var mouseY = event.pageY;\n\n      setAngle(0);\n      var ofs = angler.offset();\n      ofs.left += angler.height()/2;\n      ofs.top += angler.width()/2;\n\n      var x = mouseX - ofs.left;\n      var y = mouseY - ofs.top;\n\n      var angle = Math.atan2(x, y) * 180 / Math.PI;\n      angle = 180 - angle;\n      // strip decimal, go between 0-360\n      angle = ((angle + 360) | 0) % 360;\n      setAngle(angle);\n    }\n  });\n});");
      } else if ($.inArray($val.toLowerCase(), ["alphabetizer"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Alphabetizer</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  </head>\n  <body>\n    <div class=\"grid\">\n      <div class=\"grid__col--12\">\n        <a class=\"btn--default alphabetize\" href=\"javascript:void(0)\">Alphabetize</a>\n        <textarea class=\"form__input input-text\" rows=\"7\" placeholder=\"Alphabetize your text here...\">China\nIndia\nUnited States of America\nIndonesia\nBrazil\nPakistan\nNigeria\nBangladesh\nRussia\nJapan\nMexico\nPhilippines\nEthiopia\nVietnam\nEgypt\nGermany\nIran\nTurkey\nDemocratic Republic of the Congo\nFrance</textarea>\n      </div>\n    </div>\n  </body>\n</html>\n");
        cssEditor.setValue("@import url(\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\");\n@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900\");\n\n.grid:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.srt, .form__label--hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.panel--centered, .panel--padded--centered, [class^=\"btn--\"] {\n  text-align: center; }\n\n[class^=\"progbar__\"]:after, .icn--nav-toggle:before {\n  display: block;\n  content: '';\n  position: absolute; }\n\n.centered, .grid {\n  float: none;\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\n*\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbody {\n  color: #797e83;\n  font-size: 16px;\n  font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.5; }\n\nh3 {\n  font-size: 1.125em; }\n\nh4 {\n  margin-top: 1.375em;\n  margin-bottom: 2.57143em;\n  color: #d6d7d9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 400;\n  font-size: 0.875em; }\n  @media (min-width: 769px) {\n    h4 {\n      margin-top: 2.625em; } }\n\na {\n  color: #656a6e;\n  text-decoration: none;\n  font-weight: 400; }\n\np {\n  margin: 0 0 1.66667em;\n  font-weight: 300;\n  font-size: 1.125em;\n  line-height: 1.5; }\n\nblockquote {\n  font-weight: 300;\n  font-style: italic;\n  font-size: 1.25em; }\n  @media (min-width: 769px) {\n    blockquote {\n      margin: 1.33333em 0;\n      padding: 0 0 0 5%;\n      border-left: 0.33333em solid #ebecec;\n      font-size: 1.5em; } }\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n\nimg {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  height: auto; }\n\ninput,\ntextarea {\n  display: block;\n  padding: 15px;\n  width: 100%;\n  outline: 0;\n  border: 0; }\n\ninput:focus,\ntextarea:focus {\n  transition: 0.3s; }\n\nbutton {\n  outline: 0; }\n\nfooter {\n  border-top: 1px solid #ebecec; }\n  footer p {\n    font-size: 1em;\n    margin-top: 1.375em; }\n\n.panel, .panel--centered {\n  padding-top: 1.875em; }\n  @media (min-width: 769px) {\n    .panel, .panel--centered {\n      padding-bottom: 1.25em; } }\n\n.panel--padded, .panel--padded--centered {\n  padding-top: 2.125em; }\n  @media (min-width: 769px) {\n    .panel--padded, .panel--padded--centered {\n      padding-top: 5em;\n      padding-bottom: 2.125em; } }\n\n.grid {\n  width: 90%; }\n  [class*=\"grid__col--\"] > .grid {\n    width: 100%; }\n  @media (min-width: 1100px) {\n    .grid {\n      max-width: 1050px; } }\n\n@media (min-width: 769px) {\n  .grid__col--1 {\n    width: 6.5%; }\n  .grid__col--2 {\n    width: 15%; }\n  .grid__col--3 {\n    width: 23.5%; }\n  .grid__col--4 {\n    width: 32%; }\n  .grid__col--5 {\n    width: 40.5%; }\n  .grid__col--6 {\n    width: 49%; }\n  .grid__col--7 {\n    width: 57.5%; }\n  .grid__col--8 {\n    width: 66%; }\n  .grid__col--9 {\n    width: 74.5%; }\n  .grid__col--10 {\n    width: 83%; }\n  .grid__col--11 {\n    width: 91.5%; }\n  .grid__col--12 {\n    width: 100%; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  [class^=\"grid__col--\"] {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em; } }\n@media (min-width: 769px) {\n  [class^=\"grid__col--\"] {\n    float: left;\n    min-height: 1px;\n    padding-left: 10px;\n    padding-right: 10px; }\n    [class^=\"grid__col--\"] + [class^=\"grid__col--\"] {\n      margin-left: 2%; }\n    [class^=\"grid__col--\"]:last-of-type {\n      float: right; } }\n\n.theme__poly .grid [class*=\"grid__col\"] {\n  font-weight: 100;\n  margin-bottom: 1em;\n  padding: 1.75%; }\n\n@media (min-width: 769px) {\n  .nav__item, .nav__item--current {\n    display: inline-block;\n    margin: 0 0.625em; } }\n\n.nav__item--current a, .nav__item a {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    .nav__item--current a, .nav__item a {\n      border-bottom-color: #ebecec;\n      padding-top: 0.77778em;\n      padding-bottom: 0.77778em; } }\n\n.nav__item--current a, .nav__item a:hover {\n  color: #0b0b0b;\n  border-color: #52bab3; }\n\nh1, .headline-primary, .headline-primary--grouped {\n  color: #525559;\n  font-weight: 300;\n  font-size: 2.625em;\n  line-height: 1.09524;\n  margin-top: 0; }\n\nh2, .headline-secondary, .headline-secondary--grouped {\n  color: #999da1;\n  letter-spacing: 1px;\n  font-weight: 100;\n  font-size: 1.5em;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\n.form__btn, [class^=\"btn--\"] {\n  padding: 15px 30px;\n  border: 0;\n  border-radius: 0.4em;\n  color: #fff;\n  text-transform: uppercase;\n  font-size: 0.875em;\n  font-weight: 400;\n  transition: opacity 0.3s;\n  display: block; }\n  .form__btn:hover, [class^=\"btn--\"]:hover {\n    opacity: .75; }\n  .form__btn:active, [class^=\"btn--\"]:active {\n    opacity: initial; }\n\n.menu__link, .menu__link--end {\n  display: block;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px rgba(11, 11, 11, 0.2);\n  font-size: 1.125em; }\n\n.icn--nav-toggle, .icn--close {\n  line-height: 0;\n  cursor: pointer; }\n\n.img--wrap {\n  border: 1px solid #d6d7d9;\n  padding: 0.75em; }\n.img--avatar {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%; }\n  @media (min-width: 769px) {\n    .img--avatar {\n      margin-top: 1.5em; } }\n@media (min-width: 769px) {\n  .img--hero {\n    margin-bottom: 2.625em; } }\n\n.headline-primary {\n  margin-bottom: 1.66667em; }\n  .headline-primary--grouped {\n    margin-bottom: 0; }\n.headline-secondary {\n  margin-bottom: 0.91667em; }\n  .headline-secondary--grouped {\n    margin-top: 0.41667em;\n    margin-bottom: 2.25em; }\n\n.form__label {\n  display: block;\n  margin-bottom: 0.625em; }\n.form__input {\n  font-size: 1.125em;\n  margin-bottom: 1.11111em;\n  border-bottom: 6px solid #d6d7d9;\n  border-radius: 0.4em;\n  background: #ebecec;\n  color: black;\n  font-weight: 300; }\n  .form__input:focus {\n    border-color: #52bab3; }\n.form__btn {\n  background: #52bab3; }\n\n.btn--default {\n  background-color: #52bab3; }\n.btn--success {\n  background-color: #5ece7f; }\n.btn--error {\n  background-color: #e67478; }\n.btn--warning {\n  background-color: #ff784f; }\n.btn--info {\n  background-color: #9279c3; }\n\n[class^=\"btn--\"] {\n  margin-bottom: 1.42857em; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    [class^=\"btn--\"] {\n      width: 100%; } }\n  @media (min-width: 769px) {\n    [class^=\"btn--\"] {\n      width: auto;\n      display: inline-block; }\n      [class^=\"btn--\"] + [class^=\"btn--\"] {\n        margin-left: 20px; } }\n\n.navbar {\n  position: relative; }\n  @media (min-width: 769px) {\n    .navbar {\n      margin-top: 3.375em;\n      margin-bottom: 0; } }\n\n.nav {\n  margin-top: 1.25em;\n  margin-bottom: 1.875em; }\n  .nav__item a {\n    color: #797e83; }\n\n.offcanvas {\n  position: relative;\n  padding: 0.625em;\n  letter-spacing: 1px;\n  background: #39add1;\n  background: linear-gradient(45deg, rgba(94, 206, 127, 0.8) 0%, #39add1 100%); }\n\n.menu {\n  margin-top: 1.25em; }\n  .menu__link {\n    border-bottom: solid 1px rgba(255, 255, 255, 0.3); }\n\n.progbar {\n  height: 4px;\n  border-radius: 2px;\n  background: #d6d7d9;\n  position: relative;\n  margin-bottom: 2.875em; }\n  .progbar__status--default {\n    background-color: #52bab3; }\n    .progbar__status--default:after {\n      background-color: #6fc6c0; }\n  .progbar__status--success {\n    background-color: #5ece7f; }\n    .progbar__status--success:after {\n      background-color: #7dd898; }\n  .progbar__status--error {\n    background-color: #e67478; }\n    .progbar__status--error:after {\n      background-color: #ec979a; }\n  .progbar__status--warning {\n    background-color: #ff784f; }\n    .progbar__status--warning:after {\n      background-color: #ff9778; }\n  .progbar__status--info {\n    background-color: #9279c3; }\n    .progbar__status--info:after {\n      background-color: #a995d0; }\n\n[class^=\"progbar__\"] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  border-radius: inherit;\n  position: relative; }\n  [class^=\"progbar__\"]:after {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    right: -10px;\n    top: -8px; }\n\n.site-logo {\n  background-image: url(\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/logo.svg\");\n  background-repeat: no-repeat;\n  width: 115px;\n  height: 45px;\n  display: inline-block; }\n\n.icn--nav-toggle {\n  width: 25px;\n  height: 17px;\n  border-top: solid 3px #797e83;\n  border-bottom: solid 3px #797e83;\n  position: relative; }\n  .icn--nav-toggle:before {\n    width: 25px;\n    height: 3px;\n    background: #999da1;\n    top: 4px; }\n.icn--close {\n  background-image: url(\"img/icn-close.svg\");\n  background-repeat: no-repeat;\n  width: 20px;\n  height: 20px;\n  display: block;\n  position: absolute;\n  right: 4%;\n  top: 4%; }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-displayed-mobile {\n    display: block; }\n    .is-hidden-mobile {\n      display: none; } }\n@media (min-width: 769px) {\n  .is-displayed-mobile {\n    display: none; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-collapsed-mobile {\n    visibility: collapse;\n    padding: 0;\n    height: 0;\n    margin: 0;\n    line-height: 0; } }\n\n.theme__poly .grid__col--12 {\n  background-color: #DEF4E5; }\n\n.theme__poly .grid__col--8 {\n  background-color: #DCE0F2; }\n\n.theme__poly .grid__col--7 {\n  background-color: #DCF0EF; }\n\n.theme__poly .grid__col--6 {\n  background-color: #FFE3DB; }\n\n.theme__poly .grid__col--4 {\n  background-color: #F8EDD0; }\n\n.theme__poly .grid__col--5 {\n  background-color: #EAEBEC; }\n\n.theme__poly .grid__col--2 {\n  background-color: #C5E2CE; }\n\n.theme__poly .grid__col--3 {\n  background-color: #D6EEF5; }\n\n/*# sourceMappingURL=application.css.map */\n\n/* Tabs */\n.tabs input[type=radio] {\n  display: none;\n}\n.tabs {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n}\n.tabs li {\n  float: left;\n}\n.tabs label {\n  display: inline-block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.tabs label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.tab-content {\n  z-index: 2;\n  display: none;\n  left: 0;\n  width: 100%;\n  padding: 1em 0.4em;\n  position: absolute;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=tab]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=tab]:checked ~ [id^=tab-content] {\n  display: block;\n}\n\n/* Accordion */\n.accordion input[type=radio] {\n  display: none;\n}\n.accordion {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n  margin-top: 1.25em;\n}\n.accordion label {\n  display: block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.accordion label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.acc-content {\n  z-index: 2;\n  display: none;\n  width: 100%;\n  padding: 1em 0.4em;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=acc]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=acc]:checked ~ [id^=acc-content] {\n  display: block;\n}\n.grid {\n  text-align: left;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  var txt = $(\".input-text\");\n  $(\".alphabetize\").on(\"click\", function() {\n    txt.val(txt.val().split(\"\\n\").sort(caseInsensitive).join(\"\\n\"));\n\n    function caseInsensitive(a, b) {\n      return a.toLowerCase().localeCompare(b.toLowerCase());\n    }\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["append from value"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Detect Element Children (Numeric)</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <div class='contenu' align='center'>\n      <div>\n        Value number = .enfants children\n      </div>\n      <input min='0' class='ajouter-enfants' value='1' type='number'>\n      <div class='enfants'>\n        <div>1</div>\n      </div>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  color: #fff;\n  font: 16px arial;\n  background-color: #222;\n}\n\n.contenu > div:nth-child(1) {\n  font-size: 12px;\n  padding-top: 10px;\n}\n\n.enfants > div {\n  width: 80%;\n  background-color: #4a4;\n  padding: 1em 0;\n}\n\n.ajouter-enfants {\n  color: #fff;\n  font: 16px arial;\n  background-color: #0aa;\n  margin: 1em;\n  padding: 1em 2em;\n  border: 0;\n  border-radius: 1em;\n}\n\n.ajouter-enfants:focus {\n  background-color: #0cc;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  // Value number = .enfants children\n  $('.ajouter-enfants').on('keyup change', function() {\n    var content = '';\n    var numDivs = $(this).val();\n    var i;\n    \n    for (i = 1; i <= numDivs; i += 1) {\n      content += '<div>' + i + '</div>';\n    }\n    \n    $('.enfants').html(content);\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["applicator"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Code Applicator</title>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <textarea id='addcode' placeholder='Encode here...'></textarea>\n    <textarea id='encode' readonly placeholder='Encoded code goes here...'></textarea>\n    <div id='decode'>Preview code here.</div>\n  </body>\n</html>\n");
        cssEditor.setValue("body {\n  margin: 0;\n}\n\n::-webkit-input-placeholder { /* WebKit browsers */\n  color: #555;\n}\n:-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n  color: #555;\n}\n::-moz-placeholder { /* Mozilla Firefox 19+ */\n  color: #555;\n}\n:-ms-input-placeholder { /* Internet Explorer 10+ */\n  color: #555;\n}\n\n#addcode, #encode, #decode {\n  position: absolute;\n  font-family: monospace;\n  line-height: 1.4em;\n  font-size: 1em;\n  overflow: auto;\n  resize: none;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n#encode, #decode {\n  left: 0;\n  width: 50%;\n  height: 50%;\n  background-color: #fff;\n}\n\n#addcode {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  width: 50%;\n  height: 100%;\n  min-height: 1.4em;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n  color: #ccc;\n  background-color: #111;\n}\n\n#encode {\n  top: 0;\n}\n\n#decode {\n  bottom: 0;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  $('#addcode').on('keyup', function() {\n    $('#encode').text($(this).val());\n    $('#encode').text($('#encode').html());\n    $('#decode').html($(this).val());\n    return false;\n  });\n  \n  $('#encode').on('click', function() {\n    $(this).select();\n    return false;\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["calculator"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Basic JQuery Calculator</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n        <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <div id='calculatorbg' align='center'>\n      <input type='text' id='Result' />\n      <form id='Calc'>\n        <input type='text' id='Input' /><br />\n        <input type='button' id='one' value='1' />\n        <input type='button' id='two' value='2' />\n        <input type='button' id='three' value='3' />\n        <input type='button' id='plus' value='+' />\n        <br />\n        <input type='button' id='four' value='4' />\n        <input type='button' id='five' value='5' />\n        <input type='button' id='six' value='6' />\n        <input type='button' id='minus' value='-' />\n        <br />\n        <input type='button' id='seven' value='7' />\n        <input type='button' id='eight' value='8' />\n        <input type='button' id='nine' value='9' />\n        <input type='button' id='times' value='*' />\n        <br />\n        <input type='button' id='clear' value='C' />\n        <input type='button' id='zero' value='0' />\n        <input type='button' id='comp' value='=' />\n        <input type='button' id='div' value='/' />\n      </form>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("#calculatorbg {\n  cursor: default;\n  width: 14em;\n  height: auto;\n  background: #6ac;\n  border-radius: 2em;\n}\n\ninput {\n  font-family: Sans-Serif;\n  font-size: 1.75em;\n  height: 1.5em;\n  border: 0;\n  border-radius: 25em;\n}\n\n#Input {\n  width: 80%;\n  margin: -.125em 0 .25em 0;\n  cursor: text;\n  background: #fff;\n  color: #000;\n}\n\n#Calc {\n  padding: 1em 0 1em 0;\n  width: 14em;\n  height: auto;\n}\n\n#Result {\n  cursor: text;\n  margin-top: 1em;\n  margin-bottom: -.25em;\n  font-family: Sans-Serif;\n  font-size: .7em;\n  width: 80%;\n  color: #ccc;\n  text-align: right;\n  border-radius: 25em;\n  background: #366;\n}\n\n#Calc input[type=button] {\n  cursor: pointer;\n  width: 1.5em;\n  color: #fff;\n  background: #6cf;\n}\n\n#Calc input[type=button]:hover {\n  color: #efe;\n  background: #0cc;\n}\n\n#Calc input[type=button]:active {\n  color: #fff;\n  background: #0aa;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  var Calc = $('#Calc');\n  var Result = $('#Result');\n  var Input = $('#Input');\n  var one = $('#one');\n  var two = $('#two');\n  var three = $('#three');\n  var four = $('#four');\n  var five = $('#five');\n  var six = $('#six');\n  var seven = $('#seven');\n  var eight = $('#eight');\n  var nine = $('#nine');\n  var zero = $('#zero');\n  var clear = $('#clear');\n  var plus = $('#plus');\n  var minus = $('#minus');\n  var times = $('#times');\n  var div = $('#div');\n  var comp = $('#comp');\n  \n  zero.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '0';\n    });\n  });\n  \n  one.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '1';\n    });\n  });\n  \n  two.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '2';\n    });\n  });\n  \n  three.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '3';\n    });\n  });\n  \n  four.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '4';\n    });\n  });\n  \n  five.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '5';\n    });\n  });\n  \n  six.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '6';\n    });\n  });\n  \n  seven.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '7';\n    });\n  });\n  \n  eight.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '8';\n    });\n  });\n  \n  nine.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '9';\n    });\n  });\n  \n  plus.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '+';\n    });\n  });\n  \n  minus.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '-';\n    });\n  });\n  \n  times.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '*';\n    });\n  });\n  \n  div.on('click', function() {\n    Input.val(function(_, oldVal) {\n      return oldVal + '/';\n    });\n  });\n  \n  clear.on('click', function() {\n    Input.val('');\n  });\n  \n  comp.click(function () {\n    Result.val(function(_, oldVal) {\n      return oldVal + Input.val() + '=' + eval(Input.val()) + ' | ';\n    });\n    Input.val('');\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["catch the square"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Catch The Square</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  </head>\n  <body>\n    <div class=\"catch\">\n      counter\n    </div>\n  </body>\n</html>\n");
        cssEditor.setValue("body {\n  background-color: rgb(0, 14, 40);\n  font-family: arial;\n  color: rgb(255, 255, 255);\n  padding: 0;\n  margin: 0;\n}\n\n.catch {\n  top: 0px;\n  left: 1px;\n  padding: 1em;\n  font-family: courier;\n  font-size: 23px;\n  font-weight: bold;\n  color: rgb(188, 255, 193);\n}");
        jsEditor.setValue("$(document).ready(function() {\n  var count = 0;\n  $(\".catch\").html('');\n\n  (function makeDiv(){\n    var divsize = ((Math.random()*100) + 50).toFixed();\n    var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);\n    $newdiv = $('<div class=\"grab\" />').css({\n      'width':divsize+'px',\n      'height':divsize+'px',\n      'background-color': color\n    });\n\n    var posx = (Math.random() * ($(document).width() - divsize)).toFixed();\n    var posy = (Math.random() * ($(document).height() - divsize)).toFixed();\n\n    $newdiv.css({\n      'position':'absolute',\n      'left':posx+'px',\n      'top':posy+'px',\n      'display':'none'\n    }).appendTo( 'body' ).fadeIn(100).delay(300).fadeOut(200, function(){\n      $(this).remove();\n      makeDiv(); \n      $('.grab').bind(\"click\", function() { \n        count++;\n        $('.catch').html(count);\n      });\n    }); \n  })();\n\n});");
      } else if ($.inArray($val.toLowerCase(), ["character map"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Character Map</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n  </head>\n  <body>\n    <p>Head to <a href='http://www.fileformat.info/info/unicode/block/geometric_shapes/list.htm'>to find more unicode characters</a></p>\n    \n    <div class='htmlbox'>\n      <div class='asciiletter'>&aacute; </div>\n      <code>&amp;aacute;</code><br />\n      <code>&amp;#225;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Aacute; </div>\n      <code>&amp;Aacute;</code><br />\n      <code>&amp;#193;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&acirc; </div>\n      <code>&amp;acirc;</code><br />\n      <code>&amp;#226;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Acirc; </div>\n      <code>&amp;Acirc;</code><br />\n      <code>&amp;#194;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&acute; </div>\n      <code>&amp;acute;</code><br />\n      <code>&amp;#180;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&aelig; </div>\n      <code>&amp;aelig;</code><br />\n      <code>&amp;#230;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&AElig; </div>\n      <code>&amp;AElig;</code><br />\n      <code>&amp;#198;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&agrave; </div>\n      <code>&amp;agrave;</code><br />\n      <code>&amp;#224;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Agrave; </div>\n      <code>&amp;Agrave;</code><br />\n      <code>&amp;#192;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&alefsym; </div>\n      <code>&amp;alefsym;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&alpha; </div>\n      <code>&amp;alpha;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Alpha; </div>\n      <code>&amp;Alpha;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&amp; </div>\n      <code>&amp;amp;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&and; </div>\n      <code>&amp;and;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ang; </div>\n      <code>&amp;ang;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&aring; </div>\n      <code>&amp;aring;</code><br />\n      <code>&amp;#229;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Aring; </div>\n      <code>&amp;Aring;</code><br />\n      <code>&amp;#197;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&asymp; </div>\n      <code>&amp;asymp;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&atilde; </div>\n      <code>&amp;atilde;</code><br />\n      <code>&amp;#227;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Atilde; </div>\n      <code>&amp;Atilde;</code><br />\n      <code>&amp;#195;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&auml; </div>\n      <code>&amp;auml;</code><br />\n      <code>&amp;#228;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Auml; </div>\n      <code>&amp;Auml;</code><br />\n      <code>&amp;#196;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&bdquo; </div>\n      <code>&amp;bdquo;</code><br />\n      <code>&amp;#8222;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&beta; </div>\n      <code>&amp;beta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Beta; </div>\n      <code>&amp;Beta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&brvbar; </div>\n      <code>&amp;brvbar;</code><br />\n      <code>&amp;#166;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&bull; </div>\n      <code>&amp;bull;</code><br />\n      <code>&amp;#8226;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&cap; </div>\n      <code>&amp;cap;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ccedil; </div>\n      <code>&amp;ccedil;</code><br />\n      <code>&amp;#231;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ccedil; </div>\n      <code>&amp;Ccedil;</code><br />\n      <code>&amp;#199;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&cedil; </div>\n      <code>&amp;cedil;</code><br />\n      <code>&amp;#184;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&cent; </div>\n      <code>&amp;cent;</code><br />\n      <code>&amp;#162;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&chi; </div>\n      <code>&amp;chi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Chi; </div>\n      <code>&amp;Chi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&circ; </div>\n      <code>&amp;circ;</code><br />\n      <code>&amp;#710;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&clubs; </div>\n      <code>&amp;clubs;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&cong; </div>\n      <code>&amp;cong;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&copy; </div>\n      <code>&amp;copy;</code><br />\n      <code>&amp;#169;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&crarr; </div>\n      <code>&amp;crarr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&cup; </div>\n      <code>&amp;cup;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&curren; </div>\n      <code>&amp;curren;</code><br />\n      <code>&amp;#164;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&dagger; </div>\n      <code>&amp;dagger;</code><br />\n      <code>&amp;#8224;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Dagger; </div>\n      <code>&amp;Dagger;</code><br />\n      <code>&amp;#8225;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&darr; </div>\n      <code>&amp;darr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&dArr; </div>\n      <code>&amp;dArr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&deg; </div>\n      <code>&amp;deg;</code><br />\n      <code>&amp;#176;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&delta; </div>\n      <code>&amp;delta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Delta; </div>\n      <code>&amp;Delta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&diams; </div>\n      <code>&amp;diams;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&divide; </div>\n      <code>&amp;divide;</code><br />\n      <code>&amp;#247;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&eacute; </div>\n      <code>&amp;eacute;</code><br />\n      <code>&amp;#233;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Eacute; </div>\n      <code>&amp;Eacute;</code><br />\n      <code>&amp;#201;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ecirc; </div>\n      <code>&amp;ecirc;</code><br />\n      <code>&amp;#234;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ecirc; </div>\n      <code>&amp;Ecirc;</code><br />\n      <code>&amp;#202;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&egrave; </div>\n      <code>&amp;egrave;</code><br />\n      <code>&amp;#232;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Egrave; </div>\n      <code>&amp;Egrave;</code><br />\n      <code>&amp;#200;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&empty; </div>\n      <code>&amp;empty;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&emsp; </div>\n      <code>&amp;emsp;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ensp; </div>\n      <code>&amp;ensp;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&epsilon; </div>\n      <code>&amp;epsilon;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Epsilon; </div>\n      <code>&amp;Epsilon;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&equiv; </div>\n      <code>&amp;equiv;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&eta; </div>\n      <code>&amp;eta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Eta; </div>\n      <code>&amp;Eta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&eth; </div>\n      <code>&amp;eth;</code><br />\n      <code>&amp;#240;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ETH; </div>\n      <code>&amp;ETH;</code><br />\n      <code>&amp;#208;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&euml; </div>\n      <code>&amp;euml;</code><br />\n      <code>&amp;#235;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Euml; </div>\n      <code>&amp;Euml;</code><br />\n      <code>&amp;#203;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&euro; </div>\n      <code>&amp;euro;</code><br />\n      <code>&amp;#8364;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&exist; </div>\n      <code>&amp;exist;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&fnof; </div>\n      <code>&amp;fnof;</code><br />\n      <code>&amp;#402;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&forall; </div>\n      <code>&amp;forall;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&frac12; </div>\n      <code>&amp;frac12;</code><br />\n      <code>&amp;#189;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&frac14; </div>\n      <code>&amp;frac14;</code><br />\n      <code>&amp;#188;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&frac34; </div>\n      <code>&amp;frac34;</code><br />\n      <code>&amp;#190;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&frasl; </div>\n      <code>&amp;frasl;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&gamma; </div>\n      <code>&amp;gamma;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Gamma; </div>\n      <code>&amp;Gamma;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ge; </div>\n      <code>&amp;ge;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&gt; </div>\n      <code>&amp;gt;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&harr; </div>\n      <code>&amp;harr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&hArr; </div>\n      <code>&amp;hArr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&hearts; </div>\n      <code>&amp;hearts;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&hellip; </div>\n      <code>&amp;hellip;</code><br />\n      <code>&amp;#8230;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&iacute; </div>\n      <code>&amp;iacute;</code><br />\n      <code>&amp;#237;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Iacute; </div>\n      <code>&amp;Iacute;</code><br />\n      <code>&amp;#205;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&icirc; </div>\n      <code>&amp;icirc;</code><br />\n      <code>&amp;#238;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Icirc; </div>\n      <code>&amp;Icirc;</code><br />\n      <code>&amp;#206;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&iexcl; </div>\n      <code>&amp;iexcl;</code><br />\n      <code>&amp;#161;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&igrave; </div>\n      <code>&amp;igrave;</code><br />\n      <code>&amp;#236;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Igrave; </div>\n      <code>&amp;Igrave;</code><br />\n      <code>&amp;#204;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&image; </div>\n      <code>&amp;image;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&infin; </div>\n      <code>&amp;infin;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&int; </div>\n      <code>&amp;int;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&iota; </div>\n      <code>&amp;iota;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Iota; </div>\n      <code>&amp;Iota;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&iquest; </div>\n      <code>&amp;iquest;</code><br />\n      <code>&amp;#191;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&isin; </div>\n      <code>&amp;isin;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&iuml; </div>\n      <code>&amp;iuml;</code><br />\n      <code>&amp;#239;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Iuml; </div>\n      <code>&amp;Iuml;</code><br />\n      <code>&amp;#207;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&kappa; </div>\n      <code>&amp;kappa;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Kappa; </div>\n      <code>&amp;Kappa;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lambda; </div>\n      <code>&amp;lambda;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Lambda; </div>\n      <code>&amp;Lambda;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lang; </div>\n      <code>&amp;lang;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&laquo; </div>\n      <code>&amp;laquo;</code><br />\n      <code>&amp;#171;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&larr; </div>\n      <code>&amp;larr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lArr; </div>\n      <code>&amp;lArr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lceil; </div>\n      <code>&amp;lceil;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ldquo; </div>\n      <code>&amp;ldquo;</code><br />\n      <code>&amp;#8220;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&le; </div>\n      <code>&amp;le;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lfloor; </div>\n      <code>&amp;lfloor;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lowast; </div>\n      <code>&amp;lowast;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&loz; </div>\n      <code>&amp;loz;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lrm; </div>\n      <code>&amp;lrm;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lsaquo; </div>\n      <code>&amp;lsaquo;</code><br />\n      <code>&amp;#8249;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lsquo; </div>\n      <code>&amp;lsquo;</code><br />\n      <code>&amp;#8216;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&lt; </div>\n      <code>&amp;lt;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&macr; </div>\n      <code>&amp;macr;</code><br />\n      <code>&amp;#175;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&mdash; </div>\n      <code>&amp;mdash;</code><br />\n      <code>&amp;#8212;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&micro; </div>\n      <code>&amp;micro;</code><br />\n      <code>&amp;#181;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&middot; </div>\n      <code>&amp;middot;</code><br />\n      <code>&amp;#183;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&minus; </div>\n      <code>&amp;minus;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&mu; </div>\n      <code>&amp;mu;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Mu; </div>\n      <code>&amp;Mu;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&nabla; </div>\n      <code>&amp;nabla;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&nbsp; </div>\n      <code>&amp;nbsp;</code><br />\n      <code> </code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ndash; </div>\n      <code>&amp;ndash;</code><br />\n      <code>&amp;#8211;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ne; </div>\n      <code>&amp;ne;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ni; </div>\n      <code>&amp;ni;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&not; </div>\n      <code>&amp;not;</code><br />\n      <code>&amp;#172;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&notin; </div>\n      <code>&amp;notin;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&nsub; </div>\n      <code>&amp;nsub;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ntilde; </div>\n      <code>&amp;ntilde;</code><br />\n      <code>&amp;#241;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ntilde; </div>\n      <code>&amp;Ntilde;</code><br />\n      <code>&amp;#209;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&nu; </div>\n      <code>&amp;nu;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Nu; </div>\n      <code>&amp;Nu;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&oacute; </div>\n      <code>&amp;oacute;</code><br />\n      <code>&amp;#243;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Oacute; </div>\n      <code>&amp;Oacute;</code><br />\n      <code>&amp;#211;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ocirc; </div>\n      <code>&amp;ocirc;</code><br />\n      <code>&amp;#244;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ocirc; </div>\n      <code>&amp;Ocirc;</code><br />\n      <code>&amp;#212;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&oelig; </div>\n      <code>&amp;oelig;</code><br />\n      <code>&amp;#339;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&OElig; </div>\n      <code>&amp;OElig;</code><br />\n      <code>&amp;#338;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ograve; </div>\n      <code>&amp;ograve;</code><br />\n      <code>&amp;#242;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ograve; </div>\n      <code>&amp;Ograve;</code><br />\n      <code>&amp;#210;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&oline; </div>\n      <code>&amp;oline;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&omega; </div>\n      <code>&amp;omega;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Omega; </div>\n      <code>&amp;Omega;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&omicron; </div>\n      <code>&amp;omicron;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Omicron; </div>\n      <code>&amp;Omicron;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&oplus; </div>\n      <code>&amp;oplus;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&or; </div>\n      <code>&amp;or;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ordf; </div>\n      <code>&amp;ordf;</code><br />\n      <code>&amp;#170;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ordm; </div>\n      <code>&amp;ordm;</code><br />\n      <code>&amp;#186;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&oslash; </div>\n      <code>&amp;oslash;</code><br />\n      <code>&amp;#248;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Oslash; </div>\n      <code>&amp;Oslash;</code><br />\n      <code>&amp;#216;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&otilde; </div>\n      <code>&amp;otilde;</code><br />\n      <code>&amp;#245;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Otilde; </div>\n      <code>&amp;Otilde;</code><br />\n      <code>&amp;#213;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&otimes; </div>\n      <code>&amp;otimes;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ouml; </div>\n      <code>&amp;ouml;</code><br />\n      <code>&amp;#246;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ouml; </div>\n      <code>&amp;Ouml;</code><br />\n      <code>&amp;#214;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&para; </div>\n      <code>&amp;para;</code><br />\n      <code>&amp;#182;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&part; </div>\n      <code>&amp;part;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&permil; </div>\n      <code>&amp;permil;</code><br />\n      <code>&amp;#8240;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&perp; </div>\n      <code>&amp;perp;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&phi; </div>\n      <code>&amp;phi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Phi; </div>\n      <code>&amp;Phi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&pi; </div>\n      <code>&amp;pi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Pi; </div>\n      <code>&amp;Pi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&piv; </div>\n      <code>&amp;piv;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&plusmn; </div>\n      <code>&amp;plusmn;</code><br />\n      <code>&amp;#177;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&pound; </div>\n      <code>&amp;pound;</code><br />\n      <code>&amp;#163;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&prime; </div>\n      <code>&amp;prime;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Prime; </div>\n      <code>&amp;Prime;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&prod; </div>\n      <code>&amp;prod;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&prop; </div>\n      <code>&amp;prop;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&psi; </div>\n      <code>&amp;psi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Psi; </div>\n      <code>&amp;Psi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&quot; </div>\n      <code>&amp;quot;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&radic; </div>\n      <code>&amp;radic;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rang; </div>\n      <code>&amp;rang;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&raquo; </div>\n      <code>&amp;raquo;</code><br />\n      <code>&amp;#187;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rarr; </div>\n      <code>&amp;rarr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rArr; </div>\n      <code>&amp;rArr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rceil; </div>\n      <code>&amp;rceil;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rdquo; </div>\n      <code>&amp;rdquo;</code><br />\n      <code>&amp;#8221;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&real; </div>\n      <code>&amp;real;</code><br />\n      <code>R</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&reg; </div>\n      <code>&amp;reg;</code><br />\n      <code>&amp;#174;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rfloor; </div>\n      <code>&amp;rfloor;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rho; </div>\n      <code>&amp;rho;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Rho; </div>\n      <code>&amp;Rho;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rlm; </div>\n      <code>&amp;rlm;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rsaquo; </div>\n      <code>&amp;rsaquo;</code><br />\n      <code>&amp;#8250;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&rsquo; </div>\n      <code>&amp;rsquo;</code><br />\n      <code>&amp;#8217;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sbquo; </div>\n      <code>&amp;sbquo;</code><br />\n      <code>&amp;#8218;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&scaron; </div>\n      <code>&amp;scaron;</code><br />\n      <code>&amp;#353;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Scaron; </div>\n      <code>&amp;Scaron;</code><br />\n      <code>&amp;#352;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sdot; </div>\n      <code>&amp;sdot;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sect; </div>\n      <code>&amp;sect;</code><br />\n      <code>&amp;#167;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&shy; </div>\n      <code>&amp;shy;</code><br />\n      <code>&amp;#173;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sigma; </div>\n      <code>&amp;sigma;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Sigma; </div>\n      <code>&amp;Sigma;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sigmaf; </div>\n      <code>&amp;sigmaf;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sim; </div>\n      <code>&amp;sim;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&spades; </div>\n      <code>&amp;spades;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sub; </div>\n      <code>&amp;sub;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sube; </div>\n      <code>&amp;sube;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sum; </div>\n      <code>&amp;sum;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sup; </div>\n      <code>&amp;sup;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sup1; </div>\n      <code>&amp;sup1;</code><br />\n      <code>&amp;#185;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sup2; </div>\n      <code>&amp;sup2;</code><br />\n      <code>&amp;#178;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&sup3; </div>\n      <code>&amp;sup3;</code><br />\n      <code>&amp;#179;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&supe; </div>\n      <code>&amp;supe;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&szlig; </div>\n      <code>&amp;szlig;</code><br />\n      <code>&amp;#223;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&tau; </div>\n      <code>&amp;tau;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Tau; </div>\n      <code>&amp;Tau;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&there4; </div>\n      <code>&amp;there4;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&theta; </div>\n      <code>&amp;theta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Theta; </div>\n      <code>&amp;Theta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&thetasym; </div>\n      <code>&amp;thetasym;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&thinsp; </div>\n      <code>&amp;thinsp;</code><br />\n      <code></code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&thorn; </div>\n      <code>&amp;thorn;</code><br />\n      <code>&amp;#254;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&THORN; </div>\n      <code>&amp;THORN;</code><br />\n      <code>&amp;#222;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&tilde; </div>\n      <code>&amp;tilde;</code><br />\n      <code>&amp;#732;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&times; </div>\n      <code>&amp;times;</code><br />\n      <code>&amp;#215;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&trade; </div>\n      <code>&amp;trade;</code><br />\n      <code>&amp;#8482;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&uacute; </div>\n      <code>&amp;uacute;</code><br />\n      <code>&amp;#250;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Uacute; </div>\n      <code>&amp;Uacute;</code><br />\n      <code>&amp;#218;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&uarr; </div>\n      <code>&amp;uarr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&uArr; </div>\n      <code>&amp;uArr;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ucirc; </div>\n      <code>&amp;ucirc;</code><br />\n      <code>&amp;#251;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ucirc; </div>\n      <code>&amp;Ucirc;</code><br />\n      <code>&amp;#219;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&ugrave; </div>\n      <code>&amp;ugrave;</code><br />\n      <code>&amp;#249;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Ugrave; </div>\n      <code>&amp;Ugrave;</code><br />\n      <code>&amp;#217;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&uml; </div>\n      <code>&amp;uml;</code><br />\n      <code>&amp;#168;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&upsih; </div>\n      <code>&amp;upsih;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&upsilon; </div>\n      <code>&amp;upsilon;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Upsilon; </div>\n      <code>&amp;Upsilon;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&uuml; </div>\n      <code>&amp;uuml;</code><br />\n      <code>&amp;#252;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Uuml; </div>\n      <code>&amp;Uuml;</code><br />\n      <code>&amp;#220;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&weierp; </div>\n      <code>&amp;weierp;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&xi; </div>\n      <code>&amp;xi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Xi; </div>\n      <code>&amp;Xi;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&yacute; </div>\n      <code>&amp;yacute;</code><br />\n      <code>&amp;#253;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Yacute; </div>\n      <code>&amp;Yacute;</code><br />\n      <code>&amp;#221;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&yen; </div>\n      <code>&amp;yen;</code><br />\n      <code>&amp;#165;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&yuml; </div>\n      <code>&amp;yuml;</code><br />\n      <code>&amp;#255;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Yuml; </div>\n      <code>&amp;Yuml;</code><br />\n      <code>&amp;#376;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&zeta; </div>\n      <code>&amp;zeta;</code><br />\n    </div>\n    <div class='htmlbox'>\n      <div class='asciiletter'>&Zeta; </div>\n      <code>&amp;Zeta;</code><br />\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  text-align: center;\n}\n.htmlbox {\n  border-left: 1px solid #ddd; \n  border-top: 1px solid #ddd; \n  float: left; \n  font-size: .8em; \n  height: 35px; \n  margin: 2px;\n  padding: 2px;\n  width: 135px; \n}\n\n.asciiletter {\n  background: #ddd;\n  border-right: 2px solid #bbb; \n  border-bottom: 2px solid #bbb; \n  float: right; \n  font-size: 2em; \n  height: 30px;\n  width: 40px;\n}\n");
        jsEditor.setValue("");
      } else if ($.inArray($val.toLowerCase(), ["codemirror"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Codemirror: HTML5 Preview</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n    <script src='http://codemirror.net/lib/codemirror.js'></script>\n    <link rel='stylesheet'  href='http://codemirror.net/lib/codemirror.css'>\n    <link rel='stylesheet'  href='http://codemirror.net/addon/fold/foldgutter.css' />\n    <script src='http://codemirror.net/javascripts/code-completion.js'></script>\n    <script src='http://codemirror.net/javascripts/css-completion.js'></script>\n    <script src='http://codemirror.net/javascripts/html-completion.js'></script>\n    <script src='http://codemirror.net/mode/javascript/javascript.js'></script>\n    <script src='http://codemirror.net/mode/xml/xml.js'></script>\n    <script src='http://codemirror.net/mode/css/css.js'></script>\n    <script src='http://codemirror.net/mode/htmlmixed/htmlmixed.js'></script>\n    <script src='http://codemirror.net/addon/edit/closetag.js'></script>\n    <script src='http://codemirror.net/addon/edit/matchbrackets.js'></script>\n    <script src='http://codemirror.net/addon/selection/active-line.js'></script>\n    <script src='http://codemirror.net/keymap/extra.js'></script>\n    <script src='http://codemirror.net/addon/fold/foldcode.js'></script>\n    <script src='http://codemirror.net/addon/fold/foldgutter.js'></script>\n    <script src='http://codemirror.net/addon/fold/brace-fold.js'></script>\n    <script src='http://codemirror.net/addon/fold/xml-fold.js'></script>\n    <script src='http://codemirror.net/addon/fold/comment-fold.js'></script>\n  </head>\n  <body>\n    <div align='center'>\n      <button class='undo'>Undo</button>\n      <button class='redo'>Redo</button>\n      <button class='jquery'>Add JQuery</button>\n      <button class='bold'>Bold</button>\n    </div>\n    <textarea id='code' name='code'><!doctype html>\n<html>\n  <head>\n    <meta charset=utf-8>\n    <title>HTML5 canvas demo</title>\n    <style>p {font-family: monospace;}</style>\n  </head>\n  <body>\n    <p>Canvas pane goes here:</p>\n    <canvas id=pane width=300 height=200></canvas>\n\n    <script>\n      var canvas = document.getElementById('pane');\n      var context = canvas.getContext('2d');\n\n      context.fillStyle = 'rgb(250,0,0)';\n      context.fillRect(10, 10, 55, 50);\n\n      context.fillStyle = 'rgba(0, 0, 250, 0.5)';\n      context.fillRect(30, 30, 55, 50);\n    </script>\n  </body>\n</html></textarea>\n\n    <iframe id='preview'></iframe>\n  </body>\n</html>");
        cssEditor.setValue(".CodeMirror {\n  float: left;\n  width: 50%;\n  border: 1px solid black;\n}\n\niframe {\n  width: 49%;\n  float: left;\n  height: 300px;\n  border: 1px solid black;\n  border-left: 0;\n}");
        jsEditor.setValue("// Append JS library to HTML <head>\nfunction appendJSLib(txt) {\n  var textArea = editor.getValue();\n  var searchText = textArea.search('<head>');\n  if(searchText>0) {\n    txt = '<head>'+'\\n'+txt;\n    var updatedTextArea = textArea.replace('<head>',txt);\n    editor.setValue(updatedTextArea);\n  }\n  else {\n    reset();\n    alert('WARNING! The &lt;head&gt tag seems to be missing in your HTML. Although your code may still work, we highly recommened that you have a valid HTML syntax. Please refer to the new document of correct formatted');\n    txt = txt+textArea;\n    htmlEditor.setLine(0, txt);\n    return false;\n  }\n}\n\n// Add JQuery as JS Source\n$('.jquery').click(function() {\n  txt = '<'+'script type=\\'text/javascript\\' src=\\'http://code.jquery.com/jquery-latest.min.js\\'>'+'</'+'script'+'>';\n  appendJSLib(txt);\n});\n\n// Undo/Redo Initiation\n$('.undo').click(function() {\n  editor.undo();\n});\n$('.redo').click(function() {\n  editor.redo();\n});\n\n// Make selected text bold (If no text selected it adds the code and focus's cursor to center of tag)\n$('.bold').click(function() {\n  // For codemirror & center cursor\n  var selected_text = editor.getSelection();  // Need to grab the Active Selection\n  console.log(selected_text);  // Active Selection\n\n  editor.replaceSelection('', editor.getCursor());\n  editor.replaceRange('<strong></strong>', editor.getCursor());\n  editor.focus();\n  var str = '</strong>';\n  var mynum = str.length;\n  var start_cursor = editor.getCursor();  // Need to get the cursor position\n  console.log(start_cursor);  // Cursor position \n  var cursorLine = start_cursor.line;\n  var cursorCh = start_cursor.ch;\n\n  // Code to move cursor back [x] amount of spaces. [x] is the data-val value.\n  editor.setCursor({line: cursorLine , ch : cursorCh -mynum });\n  editor.replaceRange(selected_text, editor.getCursor());\n  editor.focus();\n});\n\nvar delay;\n\n// Initialize CodeMirror editor\nvar editor = CodeMirror.fromTextArea(document.getElementById('code'), {\n  mode: 'text/html',\n  tabMode: 'indent',\n  styleActiveLine: true,\n  lineNumbers: true,\n  lineWrapping: true,\n  autoCloseTags: true,\n  foldGutter: true,\n  dragDrop : true,\n  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']\n});\n\n// Live preview\neditor.on('change', function() {\n  clearTimeout(delay);\n  delay = setTimeout(updatePreview, 300);\n});\n\nfunction updatePreview() {\n  var previewFrame = document.getElementById('preview');\n  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;\n  preview.open();\n  preview.write(editor.getValue());\n  document.title = $('#preview').contents().find('title').html();\n  if ( document.title === 'undefined' ) {\n    document.title = 'App name';\n  }\n  preview.close();\n}\nsetTimeout(updatePreview, 300);\n\nfunction handleFileSelect(evt) {\n  evt.stopPropagation();\n  evt.preventDefault();\n\n  var files = evt.dataTransfer.files; // FileList object.\n  var reader = new FileReader();  \n  reader.onload = function(event) {\n    editor.setValue( event.target.result );\n  };\n  reader.readAsText(files[0],'UTF-8');\n}\n");
      } else if ($.inArray($val.toLowerCase(), ["collapsable treeview"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Basic Collapsible TreeView</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <div class='tree'>\n      <ul>\n        <li>\n          <span>Parent 1</span>\n          <ul>\n            <li>\n              <span>Parent child 1+1</span>\n              <ul>\n                <li>\n                  <span>Parent child 2+1</span>\n                  <ul>\n                    <li>\n                      <span>Parent child 3+1</span>\n                      <ul>\n                        <li>\n                          <span>Child 1</span>\n                        </li>\n                        <li>\n                          <span>Child 2</span>\n                        </li>\n                        <li>\n                          <span>Child 3</span>\n                        </li>\n                      </ul>\n                    </li>\n                    <li>\n                      <span>Parent child 3+1</span>\n                    </li>\n                    <li>\n                      <span>Parent child 3+1</span>\n                    </li>\n                  </ul>\n                </li>\n              </ul>\n            </li>\n            <li>\n              <span>Parent child 1+1</span>\n            </li>\n          </ul>\n        </li>\n        <li>\n          <span>Parent 1</span>\n          <ul>\n            <li>\n              <span>Parent child 1+1</span>\n              <ul>\n                <li>\n                  <span>Parent child 2+1</span>\n                </li>\n              </ul>\n              <ul>\n                <li>\n                  <span>Parent child 2+1</span>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue(".tree ul li ul {\n  display: none;\n}\n.tree ul li {\n  cursor: pointer;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  $('.tree ul li > span').each(function() {\n    $(this).on('click', function(e) {\n      $(e.target).next().filter('ul').toggle();\n    });\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["convert for values"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Convert Code for Setting Values</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <textarea class='editor' placeholder='Code with multiple lines here...'></textarea>\n    <textarea class='preview' placeholder='Generated result here...'></textarea>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  margin: 0;\n  background: #333;\n}\n\n.editor, .preview {\n  position: absolute;\n  width: 50%;\n  height: 100%;\n  padding: 0;\n  font-family: monospace;\n  min-height: 1.4em;\n  line-height: 1.4em;\n  font-size: 1em;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n}\n\n.editor {\n  left: 0;\n  color: #0b0;\n  background-color: #000;\n}\n\n::-webkit-input-placeholder { /* WebKit browsers */\n  color: #0f6;\n}\n:-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n  color: #0f6;\n}\n::-moz-placeholder { /* Mozilla Firefox 19+ */\n  color: #0f6;\n}\n:-ms-input-placeholder { /* Internet Explorer 10+ */\n  color: #0f6;\n}\n\n.convert {\n  width: 0;\n  height: 0;\n  visibility: hidden;\n  overflow: hidden;\n}\n\n.preview {\n  right: 0;\n  background-color: #fff;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  var editor = $('.editor'),\n      preview = $('.preview');\n  \n  // Remove new line and insert new line showing the text in value\n  editor.keyup(function() {\n    preview.val( $(this).val().replace(/\\n/g,'\\\\n') );\n  }).on('click', function() {\n    $(this).select();\n  });\n  \n  // Easily Select Converted Code\n  preview.on('click', function() {\n    $(this).select();\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["date and time"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Date/Clock Demo</title>\n    <meta charset='utf-8'>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <span id='date1'></span>\n    <span id='date2'></span>\n    <div id='clock'></div>\n  </body>\n</html>");
        cssEditor.setValue("#date1, #date2 {\n  font-family: arial;\n}\n\n#date2 {\n  position: absolute;\n  right: 0;\n}\n\n#clock {\n  font: bold 1.5em sans;\n  text-align: center;\n}");
        jsEditor.setValue("$(document).ready(function() {\n  // Define a function to display the current time\n  function displayTime() {\n    var now = new Date();\n    $('#clock').html( now.toLocaleTimeString() );\n    setTimeout(displayTime, 1000);\n  }\n  displayTime();\n\n  // Date\n  var currentTime = new Date();\n  var month = currentTime.getMonth() + 1;\n  var date = currentTime.getDate();\n  var year = currentTime.getFullYear();\n  $('#date1').html(month + '/' + date + '/' + year);\n  \n  var today = new Date();\n  if (year < 1000)\n    year += 1900;\n  var day = today.getDay();\n  var monthname = today.getMonth();\n  if (date < 10)\n    date = '0' + date;\n  var dayarray = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');\n  var montharray = new Array('January','February','March','April','May','June','July','August','September','October','November','December');\n  $('#date2').html(dayarray[day] + ', ' + montharray[monthname] + ' ' + date + ', ' + year);\n});");
      } else if ($.inArray($val.toLowerCase(), ["discount calculator"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Discount Calculator</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://demos.jquerymobile.com/1.4.5/css/themes/default/jquery.mobile-1.4.5.min.css\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n    <script type=\"text/javascript\" src=\"http://demos.jquerymobile.com/1.4.5/js/jquery.mobile-1.4.5.min.js\"></script>\n  </head>\n  <body>\n    <div data-role=\"page\" id=\"page1\">\n      <div data-role=\"content\">\n        <div data-role=\"collapsible-set\" data-theme=\"a\" data-content-theme=\"a\">\n          <div data-role=\"collapsible\"  data-theme=\"a\" data-collapsed=\"true\">\n            <h3>\n              Convert Percents to Decimals\n            </h3>\n\n            <h5>Just move the decimal point 2 places to the left and remove the \"%\" sign!</h5>\n\n            <h4>Converting From Percent to Decimal:</h4>\n\n            <table border=\"0\">\n              <tr>\n                <td rowspan=\"5\"><svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"136\" height=\"136\" id=\"svg2\">\n                  <defs id=\"defs4\"/>\n                  <metadata id=\"metadata7\">\n                    <rdf:RDF>\n                      <cc:Work rdf:about=\"\">\n                        <dc:format>image/svg+xml</dc:format>\n                        <dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/>\n                        <dc:title/>\n                      </cc:Work>\n                    </rdf:RDF>\n                  </metadata>\n                  <g transform=\"translate(0,-916.36218)\" id=\"layer1\">\n                    <g transform=\"matrix(1.0946816,0,0,1,0.19547888,0)\" id=\"g3452\">\n                      <rect width=\"122.263\" height=\"68.467896\" ry=\"0\" x=\"0\" y=\"916.36224\" id=\"rect3105\" style=\"fill:#80ff80;fill-opacity:1;stroke:none\"/>\n                      <path d=\"m 98.126061,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3042\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                      <g transform=\"matrix(0.91171394,0,0,1,0.04261817,0)\" id=\"g3379\">\n                        <path d=\"m 1.0101525,1050.1362 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3068\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,1036.9786 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3070\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,1023.821 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3072\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,1010.6634 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3074\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,997.50584 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3076\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,984.34825 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3078\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,971.19066 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3080\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,958.03307 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3082\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,944.87548 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3084\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,931.71789 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3086\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 1.0101525,918.5603 c 133.7376175,0 134.4624275,0 134.4624275,0 z\" id=\"path3088\" style=\"fill:none;stroke:#000000;stroke-width:1.05484855px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                      </g>\n                      <g id=\"g3392\">\n                        <path d=\"m 2.4950332,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path2996-6\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 14.448912,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3016\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 26.40279,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3028\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 38.356669,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3030\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 50.310547,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3032\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 62.264426,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3034\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 74.218304,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3036\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 86.172183,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3038\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 110.07994,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3044\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 122.03382,916.87726 c 0,134.25364 0,134.98124 0,134.98124 z\" id=\"path3046\" style=\"fill:#ff00ff;stroke:#000000;stroke-width:1.00737822px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                        <path d=\"m 98.126061,916.87691 c 0,134.17369 0,134.90079 0,134.90079 z\" id=\"path3040\" style=\"fill:none;stroke:#000000;stroke-width:1.00707817px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\"/>\n                      </g>\n                      <path d=\"m -0.17857144,916.36225 0,135.65335 123.82990144,0 0,-135.65335 -123.82990144,0 z m 2.13401714,2.36425 119.5618643,0 0,130.9592 -119.5618643,0 0,-130.9592 z\" id=\"rect3271\" style=\"fill:#000000;fill-opacity:1;stroke:none\"/>\n                    </g>\n                    <text x=\"121.28603\" y=\"1045.5424\" id=\"text3345\" xml:space=\"preserve\" style=\"font-size:6.12132931px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans\"><tspan x=\"121.28603\" y=\"1045.5424\" id=\"tspan3347\">100</tspan></text>\n                    <text x=\"121.51569\" y=\"980.86853\" id=\"text3345-9\" xml:space=\"preserve\" style=\"font-size:5.24105978px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans\"><tspan x=\"121.51569\" y=\"980.86853\" id=\"tspan3347-8\" style=\"font-size:8.73509979px\">50</tspan></text>\n                    <text x=\"6.3040314\" y=\"928.54871\" id=\"text3345-4\" xml:space=\"preserve\" style=\"font-size:10px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans\"><tspan x=\"6.3040314\" y=\"928.54871\" id=\"tspan3347-9\">1</tspan></text>\n                  </g>\n                  </svg></td>\n                <td>&nbsp;</td>\n                <td rowspan=\"5\"><p>Percent means \"per 100\", so <b>50%</b> means 50 per 100,\n                  or simply <span><sup>50</sup>/<sub>100</sub></span>. </p>\n                  <p>If you divide 50 by 100 you get <b>0.5</b> (a decimal number).</p>\n                  <p>So, to convert from percent to decimal: divide by 100, and remove the \"%\" sign.</p></td>\n              </tr>	\n            </table>\n\n            <h4>The Easy Way:</h4>\n            The easy way to divide by 100 is to move the decimal point 2 places to the left, so\n\n            <table border=\"0\">\n              <tr>\n                <td><h5>From Percent</h5></td>\n                <td align=\"right\"><h5>To Decimal</h5></td>\n              </tr>\n              <tr>\n                <td colspan=\"2\"><svg\n                                     xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n                                     xmlns:cc=\"http://creativecommons.org/ns#\"\n                                     xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n                                     xmlns:svg=\"http://www.w3.org/2000/svg\"\n                                     xmlns=\"http://www.w3.org/2000/svg\"\n                                     version=\"1.1\"\n                                     width=\"312\"\n                                     height=\"58\"\n                                     id=\"svg3550\">\n                  <defs\n                        id=\"defs3552\" />\n                  <metadata\n                            id=\"metadata3555\">\n                    <rdf:RDF>\n                      <cc:Work\n                               rdf:about=\"\">\n                        <dc:format>image/svg+xml</dc:format>\n                        <dc:type\n                                 rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\n                        <dc:title></dc:title>\n                      </cc:Work>\n                    </rdf:RDF>\n                  </metadata>\n                  <g\n                     transform=\"translate(0,-994.36218)\"\n                     id=\"layer1\">\n                    <g\n                       id=\"g4441\">\n                      <path\n                            d=\"m 178.16566,26.937809 a 9.2176418,9.2176418 0 1 1 -18.43529,0 9.2176418,9.2176418 0 1 1 18.43529,0 z\"\n                            transform=\"matrix(0.82191781,0,0,0.82191781,59.254788,998.52798)\"\n                            id=\"path3665\"\n                            style=\"fill:#00ff00;fill-opacity:1;stroke:none\" />\n                      <path\n                            d=\"m 178.16566,26.937809 a 9.2176418,9.2176418 0 1 1 -18.43529,0 9.2176418,9.2176418 0 1 1 18.43529,0 z\"\n                            transform=\"translate(0.25253814,993.60457)\"\n                            id=\"path3663\"\n                            style=\"fill:#00ff00;fill-opacity:1;stroke:none\" />\n                    </g>\n                    <g\n                       id=\"g4453\">\n                      <path\n                            d=\"m 142.68405,31.483496 c 0,0 7.07107,22.223356 26.39023,2.399112 0,0.126269 12.75318,20.581858 25.50635,-1.136422\"\n                            transform=\"translate(0,994.36218)\"\n                            id=\"path3669\"\n                            style=\"fill:none;stroke:#808000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\" />\n                      <text\n                            x=\"142.42284\"\n                            y=\"1048.833\"\n                            id=\"text3638\"\n                            xml:space=\"preserve\"\n                            style=\"font-size:11.79627037px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#808000;fill-opacity:1;stroke:none;font-family:Sans\"><tspan\n           x=\"142.42284\"\n           y=\"1048.833\"\n           id=\"tspan3640\">2 Places</tspan></text>\n                      <path\n                            d=\"m 142.6987,1025.7361 -0.94484,4.8959 4.63828,-1.9756 z\"\n                            id=\"path3671\"\n                            style=\"fill:#808000;fill-opacity:1;stroke:#808000;stroke-width:0.68024689px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1\" />\n                    </g>\n                    <g\n                       id=\"g4445\">\n                      <text\n                            x=\"5.4432311\"\n                            y=\"1021.1921\"\n                            id=\"text3622\"\n                            xml:space=\"preserve\"\n                            style=\"font-size:30.24305344px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans\"><tspan\n           x=\"5.4432311\"\n           y=\"1021.1921\"\n           id=\"tspan3624\">75%</tspan></text>\n                      <text\n                            x=\"239.72894\"\n                            y=\"1021.9064\"\n                            id=\"text3626\"\n                            xml:space=\"preserve\"\n                            style=\"font-size:30.24305344px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans\"><tspan\n           x=\"239.72894\"\n           y=\"1021.9064\"\n           id=\"tspan3628\">0.75</tspan></text>\n                      <text\n                            x=\"116.15751\"\n                            y=\"1022.9778\"\n                            id=\"text3634\"\n                            xml:space=\"preserve\"\n                            style=\"font-size:30.24305344px;font-style:normal;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#0000ff;fill-opacity:1;stroke:none;font-family:Sans\"><tspan\n           x=\"116.15751\"\n           y=\"1022.9778\"\n           id=\"tspan3636\">0.7.5.</tspan></text>\n                    </g>\n                  </g>\n                  </svg></td>\n                move the decimal point <b>2 places to the left</b>, and remove the \"%\" sign.\n              </tr>\n            </table>\n\n            <h4>Example: Convert 8.5% to decimal</h4>\n\n            <p>Move the decimal point two places to the left: 8.5 -&gt; 0.85 -&gt; 0.085</p>\n            <p>Answer <b>8.5% = 0.085</b></p>\n\n            You can quiz yourself <a href=\"http://www.mathsisfun.com/converting-percents-decimals.html\" target=\"_blank\">here</a>.\n          </div>\n        </div>\n        <div data-role=\"fieldcontain\">			\n          <strong>The Problem</strong>:\n          <ul>\n            <li>How much is 75% off of $400?</li>\n          </ul>\n\n          <strong>The Equation</strong>:\n          <ol>\n            <li>.75x400=300</li>\n            <li>300-400=100</li>\n          </ol>\n\n          <form name=\"calculator\">\n            <fieldset data-role=\"controlgroup\">\n              <label for=\"textinput2\">\n                Price:\n              </label>\n              <input name=\"price\" id=\"textinput2\" placeholder=\"\" value=\"\" type=\"text\" />\n            </fieldset>\n\n            <fieldset data-role=\"controlgroup\">\n              <label for=\"textinput3\">\n                Percent Off:\n              </label>\n              <input name=\"percentoff\" id=\"textinput3\" placeholder=\"\" value=\"\" type=\"text\" />\n            </fieldset>\n\n            <fieldset data-role=\"controlgroup\">\n              <label for=\"textinput4\">\n                Result:\n              </label>\n              <input name=\"total\" id=\"textinput4\" placeholder=\"\" value=\"\" type=\"text\" />\n            </fieldset>\n          </form>\n\n          <a id=\"btn\" data-role=\"button\">\n            Convert\n          </a>\n        </div>\n      </div>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("$(document).ready(function() {\n  $(\"#btn\").click(function() {\n    var price = Number(document.calculator.price.value);\n    var percentoff = Number(document.calculator.percentoff.value) / 100;\n    document.calculator.total.value = (1 - percentoff) * price;\n  });\n});");
      } else if ($.inArray($val.toLowerCase(), ["detect child location"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Detect Element's Child Location via Touch (Numeric)</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <div class='contenu' align='center'>\n      <input class='grab-contenu' type='text'>\n      <div class='spectacle-contenu'>\n        <div>uno</div>\n        <div>dos</div>\n        <div>tres</div>\n        <div>cuatro</div>\n        <div>cinco</div>\n        <div>seis</div>\n        <div>siete</div>\n        <div>ocho</div>\n        <div>nueve</div>\n        <div>diez</div>\n      </div>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  color: #fff;\n  font: 16px arial;\n  background-color: #222;\n}\n\n.spectacle-contenu div {\n  width: 80%;\n  background-color: #4a4;\n  margin-bottom: 2px;\n  padding: 1em 0;\n}\n\n.grab-contenu {\n  color: #fff;\n  background-color: #0aa;\n  margin: 1em;\n  padding: 1em 2em;\n  border: 0;\n  border-radius: 1em;\n}\n\n.grab-contenu:focus {\n  background-color: #0cc;\n}\n\n.spectacle-contenu {\n  font-size: 14px;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  $('.spectacle-contenu').children().on('mousedown touchstart', function() {\n    $('.grab-contenu').val($(this).index() + 1);\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["detect orientation"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Detect Portrait or Landscape Mode</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <h1 class='portrait'>Portrait</h1>\n    <h1 class='landscape'>Landscape</h1>\n    <footer class='foot'></footer>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  font: 26px arial;\n}\n.portrait, .landscape, .foot {\n  text-align: center;\n}\n.foot {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 26px;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  $(window).on('load resize', function() {\n    if ( $(window).width() > $(window).height() ) {\n      $('.landscape').show();\n      $('.portrait').hide();\n    } else if ( $(window).width() < $(window).height() ) {\n      $('.landscape').hide();\n      $('.portrait').show();\n    }\n    $('.foot').html( $(window).width() + 'px, ' + $(window).height() + 'px');\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["display operating system"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Display Operating System</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n  </head>\n  <body>\n    <!-- Display Operating System Here -->\n    <div class=\"os\"></div>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("document.addEventListener(\"DOMContentLoaded\", function() {\n  document.querySelector(\".os\").innerHTML = \"<strong>Operating System</strong>: \" + navigator.platform;\n});");
      } else if ($.inArray($val.toLowerCase(), ["editor w prev"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Simple Example HTML Editor with Preview</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <textarea id='editor' placeholder='Code goes here...'></textarea>\n    <iframe id='preview' frameborder='0' src='about:blank'></iframe>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  margin: 0;\n  background: #333;\n}\n\n#editor, #preview {\n  position: absolute;\n  width: 50%;\n  height: 100%;\n}\n\n#editor {\n  left: 0;\n  padding: 0;\n  font-family: monospace;\n  line-height: 1;\n  min-height: 1.4em;\n  line-height: 1.4em;\n  font-size: 1em;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n  color: #0b0;\n  background-color: #000;\n}\n\n::-webkit-input-placeholder { /* WebKit browsers */\n  color: #060;\n}\n:-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n  color: #060;\n}\n::-moz-placeholder { /* Mozilla Firefox 19+ */\n  color: #060;\n}\n:-ms-input-placeholder { /* Internet Explorer 10+ */\n  color: #060;\n}\n\n#preview {\n  right: 0;\n  overflow: auto;\n  background-color: #fff;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  var editor = $('#editor'),\n      preview = $('[ID$=preview]');\n  \n  // Using the <TAB>\n  $('#editor').keydown(function(e) {\n    if(e.keyCode == 9) {\n      var start = $(this).get(0).selectionStart;\n      $(this).val($(this).val().substring(0, start) + '  ' + $(this).val().substring($(this).get(0).selectionEnd));\n      $(this).get(0).selectionStart = $(this).get(0).selectionEnd = start + 1;\n      return false;\n    }\n  });\n  \n  // Live Debugging\n  editor.keyup(IntPrev);\n  \n  function IntPrev(e) {\n    preview.contents().find('body').html(editor.val());\n  }\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["fib sequence"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Fibonacci Sequence Generation</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <div class='genhere'></div>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("$(document).ready(function() {\n  console.log = function(message) {\n    $('.genhere').append(message + '<br>');\n  };\n  \n  console.error = console.debug = console.info = console.log;\n  \n  var fib = function(numMax) {\n    for(a=0, b=1, c=0; c<numMax; a=b, b=x, c++){\n      x=a+b;\n      console.log(a + ' + ' + b + ' = ' + x);\n    }\n  };\n  \n  fib(50);\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["fotorama gallery"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Fotorama Demo - from fotorama.io</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.css\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n    <script type=\"text/javascript\" src=\"http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.js\"></script>\n  </head>\n  <body>\n    <div class=\"fotorama\" data-allowfullscreen=\"true\" \n         data-width=\"100%\"\n         data-height=\"90%\"\n         data-nav=\"thumbs\"\n         data-fit=\"cover\"\n         data-keyboard=\"true\">\n      <a href=\"http://i.fotorama.io/ac2c2fe6-30fe-4695-876b-ce185ed408cf/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/ac2c2fe6-30fe-4695-876b-ce185ed408cf/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n      <a href=\"http://i.fotorama.io/5c22d9ee-a631-44bd-b848-363e5f2695cd/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/5c22d9ee-a631-44bd-b848-363e5f2695cd/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n      <a href=\"http://i.fotorama.io/a5c42bf0-0160-4b3e-867a-f9dfd7ad70d6/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/a5c42bf0-0160-4b3e-867a-f9dfd7ad70d6/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n      <a href=\"http://i.fotorama.io/aa11819e-f614-46bd-8858-752b6fcb0ca3/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/aa11819e-f614-46bd-8858-752b6fcb0ca3/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("");
      } else if ($.inArray($val.toLowerCase(), ["horizontal scrollbar"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>JS Horizontal Scrollbar</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://lab.cubiq.org/iscroll5/build/iscroll.js'></script>\n  </head>\n  <body>\n  <body onload='loaded()'>\n    <div class='contain' id='contain1'>\n      <div id='scroller'>\n        <div class='box'>\n          <h2>Page 1</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 2</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 3</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 4</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 5</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 6</h2>\n        </div>\n      </div>\n    </div>\n    <div class='contain' id='contain2'>\n      <div id='scroller'>\n        <div class='box'>\n          <h2>Page 1</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 2</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 3</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 4</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 5</h2>\n        </div>\n        <div class='box'>\n          <h2>Page 6</h2>\n        </div>\n      </div>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("html, body {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  overflow: hidden; /* this is important to prevent the whole page to bounce */\n}\n\n#contain1, #contain2 {\n  position: absolute;\n  left: 0;\n  right: 0;\n  font-family: arial;\n  color: #fff;\n}\n\n#contain1 {\n  top: 0;\n  bottom: 50%;\n  display: inline-block;\n  width: 100%;\n  height: 50%;\n  overflow-y: hidden;\n  overflow-x: scroll;\n  white-space: nowrap;\n}\n\n#contain2 {\n  top: 50%;\n  bottom: 0;\n}\n\n#scroller {\n  position: absolute;\n  z-index: 1;\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\n  width: 5000px;\n  height: 100%;\n  background-color: #a00;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-text-size-adjust: none;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  -o-text-size-adjust: none;\n  text-size-adjust: none;\n}\n\n.box {\n  display: inline-block;\n  width: 10%;\n  height: 100%;\n  padding: .5em;\n  background: #1d56b1;\n}\n\n.box:nth-child(1) {\n  background: url('http://itsprettyawkward.files.wordpress.com/2011/05/sunny-day.jpg') 100%;\n}\n");
        jsEditor.setValue("var myScroll2;\n\nfunction loaded () {\n  myScroll2 = new IScroll('#contain2', { scrollX: true, scrollY: false, mouseWheel: true });\n}\n\ndocument.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);\n\n(function() {\n  function scrollMenu(e) {\n    e = window.event || e;\n    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));\n    document.getElementById('contain1').scrollLeft -= (delta*40); // Multiplied by 40\n    e.preventDefault();\n  }\n  if (document.getElementById('contain1').addEventListener) {\n    // IE9, Chrome, Safari, Opera\n    document.getElementById('contain1').addEventListener('mousewheel', scrollMenu, false);\n    // Firefox\n    document.getElementById('contain1').addEventListener('DOMMouseScroll', scrollMenu, false);\n  } else {\n    // IE 6/7/8\n    document.getElementById('contain1').attachEvent('onmousewheel', scrollMenu);\n  }\n})();\n");
      } else if ($.inArray($val.toLowerCase(), ["image viewer"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>HTML5 Image Viewer</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n  </head>\n  <body>\n    <article>\n      <p id='status'>File API &amp; FileReader API not supported</p>\n      <p><input type=file></p>\n      <p>Width and Height (px): <input type='text' id='width'><br>\n        Choose width, &amp; it'll maintain it's aspect ratio by default. You may need to choose a different file &amp; revert back to make sure your changes have been added.</p>\n      <p>Select an image from your machine to read the contents of the file without using a server</p>\n      <div id='holder'></div>\n    </article>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  background-color: ivory;\n}\n\n#myimg {\n  border: 1px dashed red;\n}\n\n#width {\n  width: 100px;\n}\n");
        jsEditor.setValue("var upload = document.getElementsByTagName('input')[0],\n    holder = document.getElementById('holder'),\n    state = document.getElementById('status');\n\nif (typeof window.FileReader === 'undefined') {\n  state.className = 'fail';\n} else {\n  state.className = 'success';\n  state.innerHTML = 'File API & FileReader available';\n}\n\nupload.onchange = function (e) {\n  e.preventDefault();\n  \n  var file = upload.files[0],\n      reader = new FileReader();\n  \n  reader.onload = function (event) {\n    var w = parseInt(document.getElementById('holder').value);\n    var img = new Image();\n    img.src = event.target.result;\n    if (img.width > w) {\n      img.width = w;\n    }\n    holder.innerHTML = '';\n    holder.appendChild(img);\n  };\n  reader.readAsDataURL(file);\n  \n  return false;\n};\n");
      } else if ($.inArray($val.toLowerCase(), ["jquery splitter"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta name=\"keywords\" content=\"jQuery Splitter, Splitter Widget, Splitter, jqxSplitter\" />\n    <title id='Description'>\n      This demonstration shows a complex layout implementation that shows nesting multiple splitters.\n    </title>\n    <link rel=\"stylesheet\" href=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/styles/jqx.base.css\" type=\"text/css\" />\n    <script type=\"text/javascript\" src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/jquery-1.11.1.min.js\"></script>\n    <script type=\"text/javascript\" src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxcore.js\"></script>\n    <script type=\"text/javascript\" src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxsplitter.js\"></script>\n    <script type=\"text/javascript\" src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/demos.js\"></script>\n  </head>\n  <body class='default'>\n    <div id=\"mainSplitter\">\n      <div>\n        <div id=\"firstNested\">\n          <div>\n            <div id=\"secondNested\">\n              <div>\n                <span>Panel 1</span></div>\n              <div>\n                <span>Panel 2</span></div>\n            </div>\n          </div>\n          <div>\n            <span>Panel 3</span></div>\n        </div>\n      </div>\n      <div>\n        <div id=\"thirdNested\">\n          <div>\n            <span>Panel 4</span></div>\n          <div>\n            <span>Panel 5</span></div>\n        </div>\n      </div>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("$(document).ready(function () {\n  $('#mainSplitter').jqxSplitter({ width: 850, height: 850, orientation: 'horizontal', panels: [{ size: 300, collapsible: false }] });\n  $('#firstNested').jqxSplitter({ width: '100%', height: '100%',  orientation: 'vertical', panels: [{ size: 300, collapsible: false}] });\n  $('#secondNested').jqxSplitter({ width: '100%', height: '100%',  orientation: 'horizontal', panels: [{ size: 150}] });\n  $('#thirdNested').jqxSplitter({ width: '100%', height: '100%',  orientation: 'horizontal', panels: [{ size: 150, collapsible: false}] });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["keylogger"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Log Key | event.which</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <div align='center'>\n      <input id='clear' type='button' value='Clear'>\n      \n      <form name='sites'>\n        <input id='keylog' type='text' placeholder='Press any key for keylog...' />\n      </form>\n      \n      <div id='log'></div>\n      \n      <textarea id='logkeys'></textarea>\n      <textarea id='lognums'></textarea>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("#keylog, #log, #clear, #lognums, #logkeys {\n  font-family: sans-serif;\n  width: 90%;\n}\n\n#lognums, #logkeys {\n  font-size: 12px;\n}\n\n#keylog {\n  font-size: 1.25em;\n}\n\n#log {\n  font-size: 2.5em;\n}\n\n#clear {\n  cursor: pointer;\n  padding: .5em 0;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  $('#keylog').on('click', function() {\n    $(this).select();\n  });\n  \n  $('#clear').on('click',function(e){\n    $('#log').html('');\n    $('#keylog, #lognums, #logkeys').val('');\n  });\n  \n  $('#keylog').on('keydown',function(e){\n    $('#log').html(e.type + ': ' +  e.which);\n  });\n  \n  $('#keylog').on('keydown',function(e){\n    $('#lognums').val(function(_, oldVal) {\n      return oldVal + e.which;\n    });\n  });\n  \n  $('#keylog').on('keydown',function(e){\n    $('#logkeys').val(function(_, oldVal) {\n      return oldVal + String.fromCharCode(e.which);\n    });\n  });\n  \n  $('#keylog').on('mousedown',function(e){\n    $('#log').html(e.type + ': ' +  e.which);\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["multiplication table"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Multiplication Table</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n  </head>\n  <body>\n    <table>\n      <tr>\n        <th class='yellow'>X</th>\n        <th>0</th>\n        <th>1</th>\n        <th>2</th>\n        <th>3</th>\n        <th>4</th>\n        <th>5</th>\n        <th>6</th>\n        <th>7</th>\n        <th>8</th>\n        <th>9</th>\n        <th>10</th>\n        <th>11</th>\n        <th>12</th>\n      </tr>\n      <tr>\n        <th>0</th>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n      </tr>\n      <tr>\n        <th>1</th>\n        <td>0</td>\n        <td>1</td>\n        <td>2</td>\n        <td>3</td>\n        <td>4</td>\n        <td>5</td>\n        <td>6</td>\n        <td>7</td>\n        <td>8</td>\n        <td>9</td>\n        <td>10</td>\n        <td>11</td>\n        <td>12</td>\n      </tr>\n      <tr>\n        <th>2</th>\n        <td>0</td>\n        <td>2</td>\n        <td>4</td>\n        <td>6</td>\n        <td>8</td>\n        <td>10</td>\n        <td>12</td>\n        <td>14</td>\n        <td>16</td>\n        <td>18</td>\n        <td>20</td>\n        <td>22</td>\n        <td>24</td>\n      </tr>\n      <tr>\n        <th>3</th>\n        <td>0</td>\n        <td>3</td>\n        <td>6</td>\n        <td>9</td>\n        <td>12</td>\n        <td>15</td>\n        <td>18</td>\n        <td>21</td>\n        <td>24</td>\n        <td>27</td>\n        <td>30</td>\n        <td>33</td>\n        <td>36</td>\n      </tr>\n      <tr>\n        <th>4</th>\n        <td>0</td>\n        <td>4</td>\n        <td>8</td>\n        <td>12</td>\n        <td>16</td>\n        <td>20</td>\n        <td>24</td>\n        <td>28</td>\n        <td>32</td>\n        <td>36</td>\n        <td>40</td>\n        <td>44</td>\n        <td>48</td>\n      </tr>\n      <tr>\n        <th>5</th>\n        <td>0</td>\n        <td>5</td>\n        <td>10</td>\n        <td>15</td>\n        <td>20</td>\n        <td>25</td>\n        <td>30</td>\n        <td>25</td>\n        <td>40</td>\n        <td>35</td>\n        <td>50</td>\n        <td>45</td>\n        <td>60</td>\n      </tr>\n      <tr>\n        <th>6</th>\n        <td>0</td>\n        <td>6</td>\n        <td>12</td>\n        <td>18</td>\n        <td>24</td>\n        <td>30</td>\n        <td>36</td>\n        <td>42</td>\n        <td>48</td>\n        <td>54</td>\n        <td>60</td>\n        <td>66</td>\n        <td>72</td>\n      </tr>\n      <tr>\n        <th>7</th>\n        <td>0</td>\n        <td>7</td>\n        <td>14</td>\n        <td>21</td>\n        <td>28</td>\n        <td>35</td>\n        <td>42</td>\n        <td>49</td>\n        <td>56</td>\n        <td>63</td>\n        <td>70</td>\n        <td>77</td>\n        <td>84</td>\n      </tr>\n      <tr>\n        <th>8</th>\n        <td>0</td>\n        <td>8</td>\n        <td>18</td>\n        <td>24</td>\n        <td>32</td>\n        <td>40</td>\n        <td>48</td>\n        <td>56</td>\n        <td>64</td>\n        <td>72</td>\n        <td>80</td>\n        <td>88</td>\n        <td>96</td>\n      </tr>\n      <tr>\n        <th>9</th>\n        <td>0</td>\n        <td>9</td>\n        <td>18</td>\n        <td>27</td>\n        <td>36</td>\n        <td>45</td>\n        <td>54</td>\n        <td>63</td>\n        <td>72</td>\n        <td>81</td>\n        <td>90</td>\n        <td>99</td>\n        <td>108</td>\n      </tr>\n      <tr>\n        <th>10</th>\n        <td>0</td>\n        <td>10</td>\n        <td>20</td>\n        <td>30</td>\n        <td>40</td>\n        <td>50</td>\n        <td>60</td>\n        <td>70</td>\n        <td>80</td>\n        <td>90</td>\n        <td>100</td>\n        <td>110</td>\n        <td>120</td>\n      </tr>\n      <tr>\n        <th>11</th>\n        <td>0</td>\n        <td>11</td>\n        <td>22</td>\n        <td>33</td>\n        <td>44</td>\n        <td>55</td>\n        <td>66</td>\n        <td>77</td>\n        <td>88</td>\n        <td>99</td>\n        <td>110</td>\n        <td>121</td>\n        <td>132</td>\n      </tr>\n      <tr>\n        <th>12</th>\n        <td>0</td>\n        <td>12</td>\n        <td>24</td>\n        <td>36</td>\n        <td>48</td>\n        <td>60</td>\n        <td>72</td>\n        <td>84</td>\n        <td>96</td>\n        <td>108</td>\n        <td>120</td>\n        <td>132</td>\n        <td>144</td>\n      </tr>\n    </table>\n  </body>\n</html>");
        cssEditor.setValue("/* Styles Table/Text */\ntable {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-weight: bold;\n  color: gray;\n  background: black;\n}\n\n/* Table Header */\nth {\n  color: white;\n  background: black;\n}\n.yellow {\n  color: yellow;\n}\n\n/* Table Data */\ntd {\n  text-align: center;\n  background: white;\n}");
        jsEditor.setValue("");
      } else if ($.inArray($val.toLowerCase(), ["new document"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>site name</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n  </head>\n  <body>\n    <!-- comment -->\n    hello world!\n  </body>\n</html>");
        cssEditor.setValue("/* comment */\n");
        jsEditor.setValue("// comment\n");
      } else if ($.inArray($val.toLowerCase(), ["package zip files[jszip]"]) > -1) {
        htmlEditor.setValue("<!-- Learn more about how to use the library at - http://stuk.github.io/jszip/ -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>JSZip Download Demo</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n    <script type=\"text/javascript\" src=\"http://stuk.github.io/jszip/dist/jszip.min.js\"></script>\n    <script type=\"text/javascript\" src=\"http://stuk.github.io/jszip-utils/dist/jszip-utils.js\"></script>\n    <script type=\"text/javascript\" src=\"http://stuk.github.io/jszip/vendor/FileSaver.js\"></script>\n</head>\n  <body>\n    <div class=\"grid\">\n      <div class=\"grid__col--12\">\n        <a class=\"btn--default download\" href=\"javascript:void(0)\">Run</a>\n        <textarea class=\"form__input\" id=\"jszipdemo\" rows=\"7\" disabled=\"true\" placeholder=\"Demo code here...\">var zip = new JSZip();\nzip.file(\"Hello.txt\", \"Hello World\\n\");\nvar folder = zip.folder(\"images\");\nfolder.file(\"folder.txt\", \"I'm a file in a new folder\");\nvar content = zip.generate({type:\"blob\"});\n// see FileSaver.js\nsaveAs(content, \"example.zip\");</textarea>\n      </div>\n    </div>\n  </body>\n</html>\n");
        cssEditor.setValue("@import url(\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\");\n@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900\");\n\n.grid:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.srt, .form__label--hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.panel--centered, .panel--padded--centered, [class^=\"btn--\"] {\n  text-align: center; }\n\n[class^=\"progbar__\"]:after, .icn--nav-toggle:before {\n  display: block;\n  content: '';\n  position: absolute; }\n\n.centered, .grid {\n  float: none;\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\n*\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbody {\n  color: #797e83;\n  font-size: 16px;\n  font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.5; }\n\nh3 {\n  font-size: 1.125em; }\n\nh4 {\n  margin-top: 1.375em;\n  margin-bottom: 2.57143em;\n  color: #d6d7d9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 400;\n  font-size: 0.875em; }\n  @media (min-width: 769px) {\n    h4 {\n      margin-top: 2.625em; } }\n\na {\n  color: #656a6e;\n  text-decoration: none;\n  font-weight: 400; }\n\np {\n  margin: 0 0 1.66667em;\n  font-weight: 300;\n  font-size: 1.125em;\n  line-height: 1.5; }\n\nblockquote {\n  font-weight: 300;\n  font-style: italic;\n  font-size: 1.25em; }\n  @media (min-width: 769px) {\n    blockquote {\n      margin: 1.33333em 0;\n      padding: 0 0 0 5%;\n      border-left: 0.33333em solid #ebecec;\n      font-size: 1.5em; } }\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n\nimg {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  height: auto; }\n\ninput,\ntextarea {\n  display: block;\n  padding: 15px;\n  width: 100%;\n  outline: 0;\n  border: 0; }\n\ninput:focus,\ntextarea:focus {\n  transition: 0.3s; }\n\nbutton {\n  outline: 0; }\n\nfooter {\n  border-top: 1px solid #ebecec; }\n  footer p {\n    font-size: 1em;\n    margin-top: 1.375em; }\n\n.panel, .panel--centered {\n  padding-top: 1.875em; }\n  @media (min-width: 769px) {\n    .panel, .panel--centered {\n      padding-bottom: 1.25em; } }\n\n.panel--padded, .panel--padded--centered {\n  padding-top: 2.125em; }\n  @media (min-width: 769px) {\n    .panel--padded, .panel--padded--centered {\n      padding-top: 5em;\n      padding-bottom: 2.125em; } }\n\n.grid {\n  width: 90%; }\n  [class*=\"grid__col--\"] > .grid {\n    width: 100%; }\n  @media (min-width: 1100px) {\n    .grid {\n      max-width: 1050px; } }\n\n@media (min-width: 769px) {\n  .grid__col--1 {\n    width: 6.5%; }\n  .grid__col--2 {\n    width: 15%; }\n  .grid__col--3 {\n    width: 23.5%; }\n  .grid__col--4 {\n    width: 32%; }\n  .grid__col--5 {\n    width: 40.5%; }\n  .grid__col--6 {\n    width: 49%; }\n  .grid__col--7 {\n    width: 57.5%; }\n  .grid__col--8 {\n    width: 66%; }\n  .grid__col--9 {\n    width: 74.5%; }\n  .grid__col--10 {\n    width: 83%; }\n  .grid__col--11 {\n    width: 91.5%; }\n  .grid__col--12 {\n    width: 100%; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  [class^=\"grid__col--\"] {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em; } }\n@media (min-width: 769px) {\n  [class^=\"grid__col--\"] {\n    float: left;\n    min-height: 1px;\n    padding-left: 10px;\n    padding-right: 10px; }\n    [class^=\"grid__col--\"] + [class^=\"grid__col--\"] {\n      margin-left: 2%; }\n    [class^=\"grid__col--\"]:last-of-type {\n      float: right; } }\n\n.theme__poly .grid [class*=\"grid__col\"] {\n  font-weight: 100;\n  margin-bottom: 1em;\n  padding: 1.75%; }\n\n@media (min-width: 769px) {\n  .nav__item, .nav__item--current {\n    display: inline-block;\n    margin: 0 0.625em; } }\n\n.nav__item--current a, .nav__item a {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    .nav__item--current a, .nav__item a {\n      border-bottom-color: #ebecec;\n      padding-top: 0.77778em;\n      padding-bottom: 0.77778em; } }\n\n.nav__item--current a, .nav__item a:hover {\n  color: #0b0b0b;\n  border-color: #52bab3; }\n\nh1, .headline-primary, .headline-primary--grouped {\n  color: #525559;\n  font-weight: 300;\n  font-size: 2.625em;\n  line-height: 1.09524;\n  margin-top: 0; }\n\nh2, .headline-secondary, .headline-secondary--grouped {\n  color: #999da1;\n  letter-spacing: 1px;\n  font-weight: 100;\n  font-size: 1.5em;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\n.form__btn, [class^=\"btn--\"] {\n  padding: 15px 30px;\n  border: 0;\n  border-radius: 0.4em;\n  color: #fff;\n  text-transform: uppercase;\n  font-size: 0.875em;\n  font-weight: 400;\n  transition: opacity 0.3s;\n  display: block; }\n  .form__btn:hover, [class^=\"btn--\"]:hover {\n    opacity: .75; }\n  .form__btn:active, [class^=\"btn--\"]:active {\n    opacity: initial; }\n\n.menu__link, .menu__link--end {\n  display: block;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px rgba(11, 11, 11, 0.2);\n  font-size: 1.125em; }\n\n.icn--nav-toggle, .icn--close {\n  line-height: 0;\n  cursor: pointer; }\n\n.img--wrap {\n  border: 1px solid #d6d7d9;\n  padding: 0.75em; }\n.img--avatar {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%; }\n  @media (min-width: 769px) {\n    .img--avatar {\n      margin-top: 1.5em; } }\n@media (min-width: 769px) {\n  .img--hero {\n    margin-bottom: 2.625em; } }\n\n.headline-primary {\n  margin-bottom: 1.66667em; }\n  .headline-primary--grouped {\n    margin-bottom: 0; }\n.headline-secondary {\n  margin-bottom: 0.91667em; }\n  .headline-secondary--grouped {\n    margin-top: 0.41667em;\n    margin-bottom: 2.25em; }\n\n.form__label {\n  display: block;\n  margin-bottom: 0.625em; }\n.form__input {\n  font-size: 1.125em;\n  margin-bottom: 1.11111em;\n  border-bottom: 6px solid #d6d7d9;\n  border-radius: 0.4em;\n  background: #ebecec;\n  color: black;\n  font-weight: 300; }\n  .form__input:focus {\n    border-color: #52bab3; }\n.form__btn {\n  background: #52bab3; }\n\n.btn--default {\n  background-color: #52bab3; }\n.btn--success {\n  background-color: #5ece7f; }\n.btn--error {\n  background-color: #e67478; }\n.btn--warning {\n  background-color: #ff784f; }\n.btn--info {\n  background-color: #9279c3; }\n\n[class^=\"btn--\"] {\n  margin-bottom: 1.42857em; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    [class^=\"btn--\"] {\n      width: 100%; } }\n  @media (min-width: 769px) {\n    [class^=\"btn--\"] {\n      width: auto;\n      display: inline-block; }\n      [class^=\"btn--\"] + [class^=\"btn--\"] {\n        margin-left: 20px; } }\n\n.navbar {\n  position: relative; }\n  @media (min-width: 769px) {\n    .navbar {\n      margin-top: 3.375em;\n      margin-bottom: 0; } }\n\n.nav {\n  margin-top: 1.25em;\n  margin-bottom: 1.875em; }\n  .nav__item a {\n    color: #797e83; }\n\n.offcanvas {\n  position: relative;\n  padding: 0.625em;\n  letter-spacing: 1px;\n  background: #39add1;\n  background: linear-gradient(45deg, rgba(94, 206, 127, 0.8) 0%, #39add1 100%); }\n\n.menu {\n  margin-top: 1.25em; }\n  .menu__link {\n    border-bottom: solid 1px rgba(255, 255, 255, 0.3); }\n\n.progbar {\n  height: 4px;\n  border-radius: 2px;\n  background: #d6d7d9;\n  position: relative;\n  margin-bottom: 2.875em; }\n  .progbar__status--default {\n    background-color: #52bab3; }\n    .progbar__status--default:after {\n      background-color: #6fc6c0; }\n  .progbar__status--success {\n    background-color: #5ece7f; }\n    .progbar__status--success:after {\n      background-color: #7dd898; }\n  .progbar__status--error {\n    background-color: #e67478; }\n    .progbar__status--error:after {\n      background-color: #ec979a; }\n  .progbar__status--warning {\n    background-color: #ff784f; }\n    .progbar__status--warning:after {\n      background-color: #ff9778; }\n  .progbar__status--info {\n    background-color: #9279c3; }\n    .progbar__status--info:after {\n      background-color: #a995d0; }\n\n[class^=\"progbar__\"] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  border-radius: inherit;\n  position: relative; }\n  [class^=\"progbar__\"]:after {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    right: -10px;\n    top: -8px; }\n\n.site-logo {\n  background-image: url(\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/logo.svg\");\n  background-repeat: no-repeat;\n  width: 115px;\n  height: 45px;\n  display: inline-block; }\n\n.icn--nav-toggle {\n  width: 25px;\n  height: 17px;\n  border-top: solid 3px #797e83;\n  border-bottom: solid 3px #797e83;\n  position: relative; }\n  .icn--nav-toggle:before {\n    width: 25px;\n    height: 3px;\n    background: #999da1;\n    top: 4px; }\n.icn--close {\n  background-image: url(\"img/icn-close.svg\");\n  background-repeat: no-repeat;\n  width: 20px;\n  height: 20px;\n  display: block;\n  position: absolute;\n  right: 4%;\n  top: 4%; }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-displayed-mobile {\n    display: block; }\n    .is-hidden-mobile {\n      display: none; } }\n@media (min-width: 769px) {\n  .is-displayed-mobile {\n    display: none; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-collapsed-mobile {\n    visibility: collapse;\n    padding: 0;\n    height: 0;\n    margin: 0;\n    line-height: 0; } }\n\n.theme__poly .grid__col--12 {\n  background-color: #DEF4E5; }\n\n.theme__poly .grid__col--8 {\n  background-color: #DCE0F2; }\n\n.theme__poly .grid__col--7 {\n  background-color: #DCF0EF; }\n\n.theme__poly .grid__col--6 {\n  background-color: #FFE3DB; }\n\n.theme__poly .grid__col--4 {\n  background-color: #F8EDD0; }\n\n.theme__poly .grid__col--5 {\n  background-color: #EAEBEC; }\n\n.theme__poly .grid__col--2 {\n  background-color: #C5E2CE; }\n\n.theme__poly .grid__col--3 {\n  background-color: #D6EEF5; }\n\n/*# sourceMappingURL=application.css.map */\n\n/* Tabs */\n.tabs input[type=radio] {\n  display: none;\n}\n.tabs {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n}\n.tabs li {\n  float: left;\n}\n.tabs label {\n  display: inline-block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.tabs label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.tab-content {\n  z-index: 2;\n  display: none;\n  left: 0;\n  width: 100%;\n  padding: 1em 0.4em;\n  position: absolute;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=tab]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=tab]:checked ~ [id^=tab-content] {\n  display: block;\n}\n\n/* Accordion */\n.accordion input[type=radio] {\n  display: none;\n}\n.accordion {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n  margin-top: 1.25em;\n}\n.accordion label {\n  display: block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.accordion label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.acc-content {\n  z-index: 2;\n  display: none;\n  width: 100%;\n  padding: 1em 0.4em;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=acc]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=acc]:checked ~ [id^=acc-content] {\n  display: block;\n}\n.grid {\n  text-align: left;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  $(\".download\").on(\"click\", function() {\n    var zip = new JSZip();\n    zip.file(\"Hello.txt\", \"Hello World\\n\");\n    var folder = zip.folder(\"images\");\n    folder.file(\"folder.txt\", \"I'm a file in a new folder\");\n    var content = zip.generate({type:\"blob\"});\n    // see FileSaver.js\n    saveAs(content, \"example.zip\");\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["password generator"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Password Generator</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  </head>\n  <body>\n    <input type=\"text\" />\n    <button>\n      Generate Password\n    </button>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("$(document).ready(function() {\n  $(\"button\").click(function() {\n    var char = \"0123456789abcdefghijklmnopqrstuvwxyz\";\n    var fullchar = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\";\n    var genHash = \"\";\n    var i;\n    \n    for (i = 0; i < 8; i++) {\n      var rnum = Math.floor(Math.random() * char.length);\n      genHash += char.substring(rnum, rnum + 1);\n    }\n    \n    $(\"input\").val(genHash);\n  }).click();\n});");
      } else if ($.inArray($val.toLowerCase(), ["pdf embed"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Embed a PDF Example</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n  </head>\n  <body>\n    <embed width=\"100%\" height=\"100%\" name=\"plugin\" src=\"http://www.usconstitution.net/const.pdf\" type=\"application/pdf\">\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("");
      } else if ($.inArray($val.toLowerCase(), ["poly ui kit"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Poly UI Kit</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n  </head>\n  <body>\n    <div class=\"grid\">\n      <header class=\"grid__col--12 panel--padded--centered\" role=\"banner\"> \n        <a class=\"site-logo\" href=\"javascript:void(0)\">\n          <b class=\"srt\">Poly - UI Toolkit</b>\n        </a>\n        <nav class=\"navbar\" role=\"navigation\">\n          <span id=\"toggle\" class=\"icn--nav-toggle is-displayed-mobile\">\n            <b class=\"srt\">Toggle</b>\n          </span>   \n          <ul class=\"nav is-collapsed-mobile\" role=\"navigation\">\n            <li class=\"nav__item\"><a href=\"#type\">Typography</a></li>\n            <li class=\"nav__item\"><a href=\"#buttons\">Buttons</a></li>\n            <li class=\"nav__item\"><a href=\"#forms\">Form</a></li>\n            <li class=\"nav__item\"><a href=\"#images\">Images</a></li>\n            <li class=\"nav__item\"><a href=\"#grid\">Grid</a></li>\n            <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li>\n            <!-- Current Page Class Style -->\n            <!-- <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li> -->\n          </ul>\n        </nav>\n      </header>\n    </div>\n\n    <div class=\"grid is-hidden-mobile\">\n      <div class=\"grid__col--12\">\n        <img class=\"img--hero\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/hero.jpg\" alt=\"Poly - A simple UI Kit\">\n      </div>\n    </div>\n\n    <h4 id=\"type\" class=\"grid\">Typography</h4>\n\n    <div class=\"grid\">\n      <div class=\"centered grid__col--8\">\n        <h1 class=\"headline-primary--grouped\">Take a look at this amazing headline</h1>\n        <h2 class=\"headline-secondary--grouped\">Don't forget about the subtitle</h2>\n        <p>This is a typical paragraph for the UI Kit. <a href=\"#\">Here is what a link might look like</a>. The typical font family for this kit is Helvetica Neue.  This kit is intended for clean and refreshing web layouts. No jazz hands here, just the essentials to make dreams come true, with minimal clean web design. The kit comes fully equipped with everything from full responsive media styling to buttons to form fields. <em>I enjoy using italics as well from time to time</em>. Fell free to create the most amazing designs ever with this kit. I truly hope you enjoy not only the kit but this amazing paragraph as well. :)</p>\n        <blockquote>You know what really gets me going? A really nice set of block quotes.  That's right, block quotes that say, \"Hey, I'm an article you want to read and nurture.\"</blockquote>\n      </div>\n    </div>\n\n    <h4 id=\"buttons\" class=\"grid\">Buttons</h4>\n\n    <div class=\"grid\">\n      <div class=\"grid__col--12\">\n        <a class=\"btn--default\" href=\"#\">Button Default</a>\n        <a class=\"btn--success\" href=\"#\">Button Success</a>\n        <a class=\"btn--error\" href=\"#\">Button Error</a>\n        <button class=\"btn--warning\">Button Warning</button>\n        <button class=\"btn--info\">Button Info</button>\n      </div>\n    </div>\n\n    <h4 id=\"forms\" class=\"grid\">Form Elements</h4>\n\n    <div class=\"grid\">\n      <div class=\"grid__col--7\"> \n        <form class=\"form\">\n          <label class=\"form__label--hidden\" for=\"name\">Name:</label> \n          <input class=\"form__input\" type=\"text\" id=\"name\" placeholder=\"Name\">\n\n          <label class=\"form__label--hidden\" for=\"email\">Email:</label>\n          <input class=\"form__input\" type=\"email\" id=\"email\" placeholder=\"email@website.com\">\n\n          <label class=\"form__label--hidden\" for=\"msg\">Message:</label>\n          <textarea class=\"form__input\" id=\"msg\" placeholder=\"Message...\" rows=\"7\"></textarea>\n\n          <input class=\"btn--default\" type=\"submit\" value=\"Submit\">\n          <input class=\"btn--warning\" type=\"reset\" value=\"Reset\">\n        </form>\n      </div>\n      <div class=\"grid__col--4\">\n        <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n        <form>\n          <label class=\"form__label--hidden\" for=\"username\">Username:</label> \n          <input class=\"form__input\" type=\"text\" id=\"username\" placeholder=\"Username\">\n          <label class=\"form__label--hidden\" for=\"password\">Password:</label>\n          <input class=\"form__input\" type=\"password\" id=\"password\" placeholder=\"Password\">\n          <input class=\"form__btn\" type=\"submit\" value=\"Login\">\n        </form>\n      </div>\n    </div>\n\n    <h4 id=\"images\" class=\"grid\">Images</h4>\n\n    <div class=\"grid\">\n      <div class=\"grid__col--5\">\n        <img src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n      </div>\n      <div class=\"grid__col--5\">\n        <img class=\"img--wrap\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n      </div>\n      <div class=\"grid__col--2\">\n        <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n      </div>\n    </div>\n\n    <h4 id=\"grid\" class=\"grid\">Grid System</h4>\n\n    <div class=\"theme__poly\">\n      <div class=\"grid\">\n        <div class=\"grid__col--12\">.grid__col--12</div>\n      </div>\n      <div class=\"grid\">\n        <div class=\"grid__col--6\">.grid__col--6</div>\n        <div class=\"grid__col--6\">.grid__col--6</div>\n      </div>\n      <div class=\"grid\">\n        <div class=\"grid__col--4\">.grid__col--4</div>\n        <div class=\"grid__col--4\">.grid__col--4</div>\n        <div class=\"grid__col--4\">.grid__col--4</div>\n      </div>\n      <div class=\"grid\">\n        <div class=\"grid__col--3\">.grid__col--3</div>\n        <div class=\"grid__col--3\">.grid__col--3</div>\n        <div class=\"grid__col--3\">.grid__col--3</div>\n        <div class=\"grid__col--3\">.grid__col--3</div>\n      </div>\n      <div class=\"grid\">\n        <div class=\"grid__col--5\">.grid__col--5</div>\n        <div class=\"grid__col--7\">.grid__col--7</div>\n      </div>\n      <div class=\"grid\">\n        <div class=\"grid__col--8\">.grid__col--8</div>\n        <div class=\"grid__col--4\">.grid__col--4</div>\n      </div>\n      <div class=\"grid\">\n        <div class=\"centered grid__col--7\">.centered .grid__col--7</div>\n      </div>\n    </div>\n\n    <div class=\"grid\">\n      <div class=\"grid__col--7\">\n        <h4 id=\"nav\">Navigation</h4>\n        <ul class=\"nav\" role=\"navigation\">\n          <li class=\"nav__item\"><a href=\"#\">Nav Link</a></li>\n          <li class=\"nav__item\"><a href=\"#\">Nav Link 2</a></li>\n          <li class=\"nav__item--current\"><a href=\"#\">Nav Current</a></li>\n        </ul>\n        <p>This is what the navigation menu looks like when the screen is at 769px or higher. When the screen is less than 769px, you will have the option to display a toggle menu icon.</p>\n      </div>\n\n      <div class=\"grid__col--4\">\n        <h4>Offcanvas Menu</h4>\n        <div class=\"offcanvas\">\n          <span class=\"icn--close\">\n            <b class=\"srt\">close</b>\n          </span>\n          <ul class=\"menu\" role=\"navigation\">\n            <a class=\"menu__link\" href=\"#\">Link 1</a>\n            <a class=\"menu__link\" href=\"#\">Link 2</a>\n            <a class=\"menu__link\" href=\"#\">Link 3</a>\n            <a class=\"menu__link--end\" href=\"#\">Link 4</a>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n  <script type=\"text/javascript\">\n    // Toggle Menu for Phones\n    $(\"#toggle\").click(function() {\n      $(this).next(\".nav\").toggleClass(\"is-collapsed-mobile\");\n    });\n\n    // Handles Navigation Style Classes\n    $(\".nav__item\").on(\"click\", function() {\n      $(this).parent().find(\"li\").removeClass(\"nav__item--current\").addClass(\"nav__item\");\n      $(this).addClass(\"nav__item--current\").removeClass(\"nav__item\");\n    });\n  </script>\n  </body>\n</html>\n");
        cssEditor.setValue("@import url(\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\");\n@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900\");\n\n.grid:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.srt, .form__label--hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.panel--centered, .panel--padded--centered, [class^=\"btn--\"] {\n  text-align: center; }\n\n[class^=\"progbar__\"]:after, .icn--nav-toggle:before {\n  display: block;\n  content: '';\n  position: absolute; }\n\n.centered, .grid {\n  float: none;\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\n*\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbody {\n  color: #797e83;\n  font-size: 16px;\n  font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.5; }\n\nh3 {\n  font-size: 1.125em; }\n\nh4 {\n  margin-top: 1.375em;\n  margin-bottom: 2.57143em;\n  color: #d6d7d9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 400;\n  font-size: 0.875em; }\n  @media (min-width: 769px) {\n    h4 {\n      margin-top: 2.625em; } }\n\na {\n  color: #656a6e;\n  text-decoration: none;\n  font-weight: 400; }\n\np {\n  margin: 0 0 1.66667em;\n  font-weight: 300;\n  font-size: 1.125em;\n  line-height: 1.5; }\n\nblockquote {\n  font-weight: 300;\n  font-style: italic;\n  font-size: 1.25em; }\n  @media (min-width: 769px) {\n    blockquote {\n      margin: 1.33333em 0;\n      padding: 0 0 0 5%;\n      border-left: 0.33333em solid #ebecec;\n      font-size: 1.5em; } }\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n\nimg {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  height: auto; }\n\ninput,\ntextarea {\n  display: block;\n  padding: 15px;\n  width: 100%;\n  outline: 0;\n  border: 0; }\n\ninput:focus,\ntextarea:focus {\n  transition: 0.3s; }\n\nbutton {\n  outline: 0; }\n\nfooter {\n  border-top: 1px solid #ebecec; }\n  footer p {\n    font-size: 1em;\n    margin-top: 1.375em; }\n\n.panel, .panel--centered {\n  padding-top: 1.875em; }\n  @media (min-width: 769px) {\n    .panel, .panel--centered {\n      padding-bottom: 1.25em; } }\n\n.panel--padded, .panel--padded--centered {\n  padding-top: 2.125em; }\n  @media (min-width: 769px) {\n    .panel--padded, .panel--padded--centered {\n      padding-top: 5em;\n      padding-bottom: 2.125em; } }\n\n.grid {\n  width: 90%; }\n  [class*=\"grid__col--\"] > .grid {\n    width: 100%; }\n  @media (min-width: 1100px) {\n    .grid {\n      max-width: 1050px; } }\n\n@media (min-width: 769px) {\n  .grid__col--1 {\n    width: 6.5%; }\n  .grid__col--2 {\n    width: 15%; }\n  .grid__col--3 {\n    width: 23.5%; }\n  .grid__col--4 {\n    width: 32%; }\n  .grid__col--5 {\n    width: 40.5%; }\n  .grid__col--6 {\n    width: 49%; }\n  .grid__col--7 {\n    width: 57.5%; }\n  .grid__col--8 {\n    width: 66%; }\n  .grid__col--9 {\n    width: 74.5%; }\n  .grid__col--10 {\n    width: 83%; }\n  .grid__col--11 {\n    width: 91.5%; }\n  .grid__col--12 {\n    width: 100%; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  [class^=\"grid__col--\"] {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em; } }\n@media (min-width: 769px) {\n  [class^=\"grid__col--\"] {\n    float: left;\n    min-height: 1px;\n    padding-left: 10px;\n    padding-right: 10px; }\n    [class^=\"grid__col--\"] + [class^=\"grid__col--\"] {\n      margin-left: 2%; }\n    [class^=\"grid__col--\"]:last-of-type {\n      float: right; } }\n\n.theme__poly .grid [class*=\"grid__col\"] {\n  font-weight: 100;\n  margin-bottom: 1em;\n  padding: 1.75%; }\n\n@media (min-width: 769px) {\n  .nav__item, .nav__item--current {\n    display: inline-block;\n    margin: 0 0.625em; } }\n\n.nav__item--current a, .nav__item a {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    .nav__item--current a, .nav__item a {\n      border-bottom-color: #ebecec;\n      padding-top: 0.77778em;\n      padding-bottom: 0.77778em; } }\n\n.nav__item--current a, .nav__item a:hover {\n  color: #0b0b0b;\n  border-color: #52bab3; }\n\nh1, .headline-primary, .headline-primary--grouped {\n  color: #525559;\n  font-weight: 300;\n  font-size: 2.625em;\n  line-height: 1.09524;\n  margin-top: 0; }\n\nh2, .headline-secondary, .headline-secondary--grouped {\n  color: #999da1;\n  letter-spacing: 1px;\n  font-weight: 100;\n  font-size: 1.5em;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\n.form__btn, [class^=\"btn--\"] {\n  padding: 15px 30px;\n  border: 0;\n  border-radius: 0.4em;\n  color: #fff;\n  text-transform: uppercase;\n  font-size: 0.875em;\n  font-weight: 400;\n  transition: opacity 0.3s;\n  display: block; }\n  .form__btn:hover, [class^=\"btn--\"]:hover {\n    opacity: .75; }\n  .form__btn:active, [class^=\"btn--\"]:active {\n    opacity: initial; }\n\n.menu__link, .menu__link--end {\n  display: block;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px rgba(11, 11, 11, 0.2);\n  font-size: 1.125em; }\n\n.icn--nav-toggle, .icn--close {\n  line-height: 0;\n  cursor: pointer; }\n\n.img--wrap {\n  border: 1px solid #d6d7d9;\n  padding: 0.75em; }\n.img--avatar {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%; }\n  @media (min-width: 769px) {\n    .img--avatar {\n      margin-top: 1.5em; } }\n@media (min-width: 769px) {\n  .img--hero {\n    margin-bottom: 2.625em; } }\n\n.headline-primary {\n  margin-bottom: 1.66667em; }\n  .headline-primary--grouped {\n    margin-bottom: 0; }\n.headline-secondary {\n  margin-bottom: 0.91667em; }\n  .headline-secondary--grouped {\n    margin-top: 0.41667em;\n    margin-bottom: 2.25em; }\n\n.form__label {\n  display: block;\n  margin-bottom: 0.625em; }\n.form__input {\n  font-size: 1.125em;\n  margin-bottom: 1.11111em;\n  border-bottom: 6px solid #d6d7d9;\n  border-radius: 0.4em;\n  background: #ebecec;\n  color: black;\n  font-weight: 300; }\n  .form__input:focus {\n    border-color: #52bab3; }\n.form__btn {\n  background: #52bab3; }\n\n.btn--default {\n  background-color: #52bab3; }\n.btn--success {\n  background-color: #5ece7f; }\n.btn--error {\n  background-color: #e67478; }\n.btn--warning {\n  background-color: #ff784f; }\n.btn--info {\n  background-color: #9279c3; }\n\n[class^=\"btn--\"] {\n  margin-bottom: 1.42857em; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    [class^=\"btn--\"] {\n      width: 100%; } }\n  @media (min-width: 769px) {\n    [class^=\"btn--\"] {\n      width: auto;\n      display: inline-block; }\n      [class^=\"btn--\"] + [class^=\"btn--\"] {\n        margin-left: 20px; } }\n\n.navbar {\n  position: relative; }\n  @media (min-width: 769px) {\n    .navbar {\n      margin-top: 3.375em;\n      margin-bottom: 0; } }\n\n.nav {\n  margin-top: 1.25em;\n  margin-bottom: 1.875em; }\n  .nav__item a {\n    color: #797e83; }\n\n.offcanvas {\n  position: relative;\n  padding: 0.625em;\n  letter-spacing: 1px;\n  background: #39add1;\n  background: linear-gradient(45deg, rgba(94, 206, 127, 0.8) 0%, #39add1 100%); }\n\n.menu {\n  margin-top: 1.25em; }\n  .menu__link {\n    border-bottom: solid 1px rgba(255, 255, 255, 0.3); }\n\n.progbar {\n  height: 4px;\n  border-radius: 2px;\n  background: #d6d7d9;\n  position: relative;\n  margin-bottom: 2.875em; }\n  .progbar__status--default {\n    background-color: #52bab3; }\n    .progbar__status--default:after {\n      background-color: #6fc6c0; }\n  .progbar__status--success {\n    background-color: #5ece7f; }\n    .progbar__status--success:after {\n      background-color: #7dd898; }\n  .progbar__status--error {\n    background-color: #e67478; }\n    .progbar__status--error:after {\n      background-color: #ec979a; }\n  .progbar__status--warning {\n    background-color: #ff784f; }\n    .progbar__status--warning:after {\n      background-color: #ff9778; }\n  .progbar__status--info {\n    background-color: #9279c3; }\n    .progbar__status--info:after {\n      background-color: #a995d0; }\n\n[class^=\"progbar__\"] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  border-radius: inherit;\n  position: relative; }\n  [class^=\"progbar__\"]:after {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    right: -10px;\n    top: -8px; }\n\n.site-logo {\n  background-image: url(\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/logo.svg\");\n  background-repeat: no-repeat;\n  width: 115px;\n  height: 45px;\n  display: inline-block; }\n\n.icn--nav-toggle {\n  width: 25px;\n  height: 17px;\n  border-top: solid 3px #797e83;\n  border-bottom: solid 3px #797e83;\n  position: relative; }\n  .icn--nav-toggle:before {\n    width: 25px;\n    height: 3px;\n    background: #999da1;\n    top: 4px; }\n.icn--close {\n  background-image: url(\"img/icn-close.svg\");\n  background-repeat: no-repeat;\n  width: 20px;\n  height: 20px;\n  display: block;\n  position: absolute;\n  right: 4%;\n  top: 4%; }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-displayed-mobile {\n    display: block; }\n    .is-hidden-mobile {\n      display: none; } }\n@media (min-width: 769px) {\n  .is-displayed-mobile {\n    display: none; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-collapsed-mobile {\n    visibility: collapse;\n    padding: 0;\n    height: 0;\n    margin: 0;\n    line-height: 0; } }\n\n.theme__poly .grid__col--12 {\n  background-color: #DEF4E5; }\n\n.theme__poly .grid__col--8 {\n  background-color: #DCE0F2; }\n\n.theme__poly .grid__col--7 {\n  background-color: #DCF0EF; }\n\n.theme__poly .grid__col--6 {\n  background-color: #FFE3DB; }\n\n.theme__poly .grid__col--4 {\n  background-color: #F8EDD0; }\n\n.theme__poly .grid__col--5 {\n  background-color: #EAEBEC; }\n\n.theme__poly .grid__col--2 {\n  background-color: #C5E2CE; }\n\n.theme__poly .grid__col--3 {\n  background-color: #D6EEF5; }\n\n/*# sourceMappingURL=application.css.map */\n\n/* Tabs */\n.tabs input[type=radio] {\n  display: none;\n}\n.tabs {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n}\n.tabs li {\n  float: left;\n}\n.tabs label {\n  display: inline-block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.tabs label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.tab-content {\n  z-index: 2;\n  display: none;\n  left: 0;\n  width: 100%;\n  padding: 1em 0.4em;\n  position: absolute;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=tab]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=tab]:checked ~ [id^=tab-content] {\n  display: block;\n}\n\n/* Accordion */\n.accordion input[type=radio] {\n  display: none;\n}\n.accordion {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n  margin-top: 1.25em;\n}\n.accordion label {\n  display: block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.accordion label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.acc-content {\n  z-index: 2;\n  display: none;\n  width: 100%;\n  padding: 1em 0.4em;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=acc]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=acc]:checked ~ [id^=acc-content] {\n  display: block;\n}\n.grid {\n  text-align: left;\n}\n");
        jsEditor.setValue("");
      } else if ($.inArray($val.toLowerCase(), ["remember query state[slider]"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Remember Query State Using Slider</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  </head>\n  <body>\n    <div class=\"topquerybar\">\n      <input class=\"mediaquery-slider\" type=\"range\" min=\"0\" step=\"1\" />\n    </div>\n    <div class=\"pxloc\"></div>\n\n    <div class=\"codespot\">\n      <textarea class=\"codearea\">1) Add your code\n2) Click the \"+\" to add a query\n3) When queries are added adjust slider and code will go back to what you had when you added it.\n4) Click the query location button below to preview the query.\n5) Click the \"X\" button below to remove the query.\n6) If query is already added you will be alerted if you want to cancel or replace it.</textarea>\n    </div>\n\n    <a class=\"add-query\" href=\"javascript:void(0)\">+</a>\n    <div class=\"btmquerybar\">\n      <div class=\"added-queries\"></div>\n    </div>\n  </body>\n</html>\n");
        cssEditor.setValue("body {\n  margin: 0;\n  padding: 0;\n  background: #444;\n}\n\na {\n  color: #ccc;\n  text-decoration: none;\n}\n\n/* Top Querybar */\n.topquerybar {\n  position:absolute;\n  top: 0;\n  left: 0;\n  right: 30px;\n}\n\n.mediaquery-slider {\n  width: 100%;\n  height: 25px;\n  background: transparent;\n  margin: 0;\n  padding: 0;\n}\n\n.add-query {\n  position: absolute;\n  top: -4px;\n  right: 6px;\n  margin: 0;\n  padding: 0;\n  font: 2em Arial;\n}\n\n/* PX Location for Querybar */\n.pxloc {\n  display: none;\n  position: absolute;\n  top: 30px;\n  left: 0;\n  padding: 5px 15px;\n  font: 14px arial;\n  border-radius: 100em;\n  color: #fff;\n  background: #278ab4;\n  text-align: center;\n  line-height: 25px;\n  z-index: 1;\n}\n\n/* Middle Code Area */\n.codespot {\n  position: absolute;\n  top: 25px;\n  bottom: 40px;\n  left: 0;\n  right: 0;\n  background: #333;\n}\n\n.codearea {\n  width: 100%;\n  height: 100%;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n  padding: 0;\n}\n\n/* Bottom Querybar */\n.btmquerybar {\n  position:absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: #333;\n  padding: 0;\n  white-space: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n\n.list-of-media-queries-container {\n  background: #444;\n  margin: 0 2.5px;\n}\n\n.btmquerybar button {\n  cursor: pointer;\n  display: inline-block;\n  color: #999;\n  background: transparent;\n  border: 0;\n  padding: 2.5px;\n  margin: 0 0 2.5px 0;\n  font: 14px Arial;\n}\n\n.btmquerybar button:hover {\n  color: #ccc;\n}\n\n.btmquerybar button:active {\n  color: #555;\n  background: #222;\n}\n\n.btmquerybar a {\n  padding: 2.5px;\n  margin: 0 2.5px 0 0;\n  font: 23px arial black;\n}\n\n.btmquerybar a:hover {\n  color: #fff;\n}\n\n.btmquerybar a:active {\n  color: #111;\n}\n\n.list-of-media-queries-container textarea {\n  display: none;\n}");
        jsEditor.setValue("$(document).ready(function() {\n  // Adjust max value for slider on load and resize.\n  $(window).on('load resize', function() {\n    $(\".mediaquery-slider\").attr('max', $('.codearea').width()).val($('.codearea').width());\n\n    $(document).on('mousemove touchmove change', function(e) {\n      $('.pxloc').text( $('.mediaquery-slider').val() + \"px\" ).css({\n        left: e.pageX - $('.pxloc').width() / 1.25 + \"px\"\n      });\n    });\n  });\n  $('.mediaquery-slider').on('mousedown touchstart', function() {\n    $('.pxloc').show();\n    $('.mediaquery-slider').on('mouseup touchend', function() {\n      $('.pxloc').hide();\n    });\n  });\n\n  // Adds Queries\n  $(\".add-query\").on('click', function() {\n    $(\".added-queries\").append(\"<span class='list-of-media-queries-container'><a class='del-query' href='javascript:void(0)'>x</a><button>\" + $('.mediaquery-slider').val() + \"px</button><textarea class='\" + $('.mediaquery-slider').val() + \"'>\" + $('.codearea').val() + \"</textarea></span>\");\n    var $button = $(\".added-queries > .list-of-media-queries-container button:contains(\" + $('.mediaquery-slider').val() + \")\");\n\n    if($button.length > 1) {\n      var x = window.confirm(\"Query already exists. Want to replace it?\");\n      if (x) {\n        $button.first().parent().remove();\n      } else {\n        $button.last().parent().remove();\n        return false;\n      }\n    }\n\n    $('.mediaquery-slider').on('change', function() {\n      $(\".list-of-media-queries-container > button:contains(\" + $('.mediaquery-slider').val() + \"px)\").trigger('click');\n    });\n\n    // Remove Query\n    $(\".list-of-media-queries-container\").find(\"a\").on('click', function() {\n      $(this).parent().remove();\n    });\n    // Show query on button click\n    $(\".added-queries\").find(\"button\").click(function() {\n      $('.codearea').val($(this).next().val());\n      $('.mediaquery-slider').val($(this).text().replace(/px/g,'')).trigger('change');\n    });\n  });\n});");
      } else if ($.inArray($val.toLowerCase(), ["simple slideshow"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Simplest jQuery Slideshow</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n  <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  </head>\n  <body>\n    <div class=\"fadelinks\">\n      <a href=\"javascript:void(0)\">\n        <img src=\"http://farm3.static.flickr.com/2610/4148988872_990b6da667.jpg\">\n      </a>\n      <a href=\"javascript:void(0)\">\n        <img src=\"http://farm3.static.flickr.com/2597/4121218611_040cd7b3f2.jpg\">\n      </a>\n      <a href=\"javascript:void(0)\">\n        <img src=\"http://farm3.static.flickr.com/2531/4121218751_ac8bf49d5d.jpg\">\n      </a>\n    </div>\n  </body>\n</html>\n");
        cssEditor.setValue("body {\n  font-family: arial, helvetica, sans-serif;\n  font-size: 12px;\n}\n\n.fadelinks {\n  position: relative;\n  height: 332px;\n  width: 500px;\n}\n\n.fadelinks > * {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n}");
        jsEditor.setValue("$(document).ready(function(){\n  $('.fadelinks > :gt(0)').hide();\n  setInterval(function() {\n    $('.fadelinks > :first-child').fadeOut().next().fadeIn().end().appendTo('.fadelinks');\n  }, 3000);\n});");
      } else if ($.inArray($val.toLowerCase(), ["speech to action"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Operational Speech Recognition</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  </head>\n  <body>\n    <div align=\"center\">\n      <form name=\"sites\">\n        <input id=\"speechapi\" name=\"speechapi\" type=\"text\" placeholder=\"Say your command!\" x-webkit-speech=\"x-webkit-speech\" list=\"speech-options\"/>\n        <datalist id=\"speech-options\">\n          <option value=\"search\"></option>\n          <option value=\"new tab\"></option>\n          <option value=\"close tab\"></option>\n          <option value=\"forward\"></option>\n          <option value=\"back\"></option>\n          <option value=\"reload\"></option>\n          <option value=\"reload\"></option>\n          <option value=\"reload\"></option>\n          <option value=\"reload\"></option>\n        </datalist>\n      </form>\n    </div>\n\n    <div class=\"browser\">\n      <iframe id=\"browsensearch\" src=\"http://duckduckgo.com/\" allowtransparency=\"true\">\n        Your browser does not support IFRAME's\n      </iframe>\n    </div>\n\n    <a class=\"opennewpage hide\" href=\"javascript:void(0)\" target=\"_blank\">Open New</a>\n    <a class=\"newtab hide\" href=\"about:blank\" target=\"_blank\">New Tab</a>\n\n  </body>\n</html>\n");
        cssEditor.setValue("#speechapi {\n  width: 90%;\n  font-family: sans-serif;\n  font-size: 1.25em;\n  z-index: 9;\n}\n\n#browsensearch {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n\n.browser {\n  position: absolute;\n  top: 50px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 0;\n}\n\n.hide {\n  visibility: hidden;\n}");
        jsEditor.setValue("$(document).ready(function() {\n  $(\"#speechapi\").click(function() {\n    $(this).select();\n  });\n\n  $(\"#speechapi\").keyup(function(e) {\n    var val = $(this).val();\n\n    if(val === \"open new\") {\n      $(\".opennewpage\")[0].click();\n    } else if(val === \"new tab\") {\n      $(\".newtab\")[0].click();\n    } else if(val === \"close tab\") {\n      window.close();\n    } else if(val == \"reload\") {\n      location.reload(true);\n    }\n\n    var sitesgohere = document.getElementById(\"browsensearch\");\n    sitesgohere.src = \"http://\" + val;\n  });\n\n  // This is called when Chrome successfully transcribes the spoken word\n  $(\"#speechapi\").bind('webkitspeechchange', function(e) {\n    var val = $(this).val();\n\n    var sitesgohere = document.getElementById(\"browsensearch\");\n    sitesgohere.src = \"http://\" + val;\n\n    // What'd the user say?\n    if(val == \"reload\") {\n      location.reload(true);\n    } else if(val == \"search\") {\n      sitesgohere.src = \"https://duckduckgo.com/?q=\" + val;\n    } else if(val == \"open new\") {\n      $(\".opennewpage\")[0].click();\n    } else if(val == \"new tab\") {\n      $(\".newtab\")[0].click();\n    } else if(val == \"close tab\") {\n      window.close();\n    } else if(val == \"forward\") {\n      history.forward();\n    } else if(val == \"back\") {\n      history.back();\n    }\n  });\n});\n\nif (document.createElement(\"input\").webkitSpeech === undefined) {\n  alert(\"Speech input is not supported in your browser.\");\n}");
      } else if ($.inArray($val.toLowerCase(), ["svg-edit"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>svg-edit 2.7</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n  </head>\n  <body>\n    <iframe width=\"100%\" height=\"100%\"  frameborder=\"0\" src=\"http://svg-edit.googlecode.com/svn/branches/2.7/editor/svg-editor.html\"></iframe>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("");
      } else if ($.inArray($val.toLowerCase(), ["svg's"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>HTML5: SVGS Demo</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n  </head>\n  <body>\n    <svg width='128' height='128'>\n      <circle cx='64' cy='64' r='0' >\n        <animate dur='3s' attributeName='r' values='40; 64; 40'\n                 repeatCount='indefinite' />\n      </circle>\n    </svg>\n\n    <svg width='128' height='128'>\n      <defs>\n        <radialGradient id='RadialGradien2' cx='50%' cy='100%' r='100%' fx='50%' fy='80%'>\n          <stop offset='10%' style='stop-color:cyan; stop-opacity:1' />\n          <stop offset='50%'style='stop-color:#00f; stop-opacity:1.9' />\n          <stop offset='90%' style='stop-color:000; stop-opacity:1' />\n        </radialGradient>\n      </defs>\n      <circle cx='64' cy='64' r='0' fill='url(#RadialGradien2)'>\n        <animate dur='3s' attributeName='r' values='40; 64; 40'\n                 repeatCount='indefinite' />\n      </circle>\n    </svg>\n\n    <p></p>\n\n    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='190'>\n      <polygon points='100,10 40,180 190,60 10,60 160,180'\n               style='fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;'>\n        </svg>\n\n      <p></p>\n\n      <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='30' height='30' style='margin:0px 0px 0px 10px; fill:#00bc00;'>\n        <polygon points='30,30  15,0  0,30'>\n          </svg>\n\n        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='30' height='30' style='margin:0px 0px 0px 10px; fill:#00bc00;'>\n          <polygon points='15,30  30,0  0,0'>\n            </svg>\n\n          <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='30' height='30' style='margin:0px 0px 0px 10px; fill:#00bc00;'>\n            <polygon points='30,30  30,0  0,15'>\n              </svg>\n\n            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='30' height='30' style='margin:0px 0px 0px 10px; fill:#00bc00;'>\n              <polygon points='0,0  0,30  30,15'>\n                </svg>\n\n              <p></p>\n\n              <svg width='128' height='128' xmlns='http://www.w3.org/2000/svg'>\n                <rect fill='#000' stroke='#000000' stroke-width='0' x='0' y='0' width='128' height='128' id='svg_3' />\n                <circle fill='#222' stroke='#000000' stroke-width='0' cx='64' cy='64' r='60' id='svg_1'/>\n                <circle fill='#444' stroke='#000000' stroke-width='0' cx='64' cy='64' r='40' id='svg_1'/>\n                <circle fill='#666' stroke='#000000' stroke-width='0' cx='64' cy='64' r='20' id='svg_1'/>\n                <circle fill='#888' stroke='#000000' stroke-width='0' cx='64' cy='64' r='10' id='svg_1'/>\n                <circle fill='#999' stroke='#000000' stroke-width='0' cx='64' cy='64' r='5' id='svg_1'/>\n                <circle fill='#fff' stroke='#000000' stroke-width='0' cx='64' cy='64' r='2.5' id='svg_1'/>\n              </svg>\n\n              <svg width='128' height='128' xmlns='http://www.w3.org/2000/svg'>\n                <defs>\n                  <filter id='f1' x='0' y='0'>\n                    <feGaussianBlur in='SourceGraphic' stdDeviation='2' />\n                  </filter>\n                </defs>\n                <rect fill='#000' stroke='#000000' stroke-width='0' x='0' y='0' width='128' height='128' id='svg_3' filter='url(#f1)' />\n                <circle fill='#222' stroke='#000000' stroke-width='0' cx='64' cy='64' r='60' id='svg_1' filter='url(#f1)' />\n                <circle fill='#444' stroke='#000000' stroke-width='0' cx='64' cy='64' r='40' id='svg_1' filter='url(#f1)' />\n                <circle fill='#666' stroke='#000000' stroke-width='0' cx='64' cy='64' r='20' id='svg_1' filter='url(#f1)' />\n                <circle fill='#888' stroke='#000000' stroke-width='0' cx='64' cy='64' r='10' id='svg_1' filter='url(#f1)' />\n                <circle fill='#999' stroke='#000000' stroke-width='0' cx='64' cy='64' r='5' id='svg_1' filter='url(#f1)' />\n                <circle fill='#fff' stroke='#000000' stroke-width='0' cx='64' cy='64' r='2.5' id='svg_1' filter='url(#f1)' />\n              </svg>\n\n              <p></p>\n\n              <svg width='81' height='127' xmlns='http://www.w3.org/2000/svg'>\n                <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->\n                <g>\n                  <rect fill='#7f3f00' stroke='#000000' stroke-width='0' x='32.26172' y='50.26172' width='17' height='77' id='svg_3'/>\n                  <circle fill='#007f3f' stroke='#000000' stroke-width='0' cx='40.26172' cy='40.26172' r='40.26172' id='svg_1'/>\n                </g>\n              </svg>\n\n              <p></p>\n\n              <svg width='256' height='256'>\n                <path d='M 30,240 Q 170,40 260,230' stroke='#f00' fill='#f00' />\n                <path d='M 30,240 C 70,90 210,150 260,230' stroke='#000' fill='#000' />\n              </svg>\n              </body>\n            </html>");
        cssEditor.setValue("");
        jsEditor.setValue("");
      } else if ($.inArray($val.toLowerCase(), ["web browser"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Keyup Web Browser</title>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='initial-scale=1.0'>\n    <meta http-equiv='X-UA-Compatible' content='IE=9' />\n    <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n    <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n  </head>\n  <body>\n    <div class='header p-hfill'>\n      <a id='backward' href='javascript:void(0)'>&#x25c0;</a>\n      <a id='forward' href='javascript:void(0)'>&#x25b6;</a>\n      \n      <div class='contain-url'>\n        <input id='url' class='no-mpb' type='text' placeholder='http:// is added by default.'>\n      </div>\n    </div>\n    \n    <div class='urlspace p-hfill no-mpb'>\n      <iframe id='browsensearch' class='no-mpb' src='http://duckduckgo.com/' allowtransparency='true'>\n        Your browser does not support IFRAME's\n      </iframe>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue(".p-hfill {\n  position: absolute;\n  left: 0;\n  right: 0;\n}\n\n.urlspace {\n  top: 40px;\n  bottom: 0;\n}\n\n.no-mpb {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n.urlspace iframe {\n  width: 100%;\n  height: 99.4%;\n}\n\n.header {\n  display: inline-block;\n  top: 0;\n  height: 40px;\n  background: #6b6;\n}\n\n.header a {\n  margin: 0 0 -13px 5px;\n  text-decoration: none;\n  font-size: 26px;\n  -webkit-transition: all 100ms ease-in-out;\n  -moz-transition: all 100ms ease-in-out;\n  -ms-transition: all 100ms ease-in-out;\n  -o-transition: all 100ms ease-in-out;\n  transition: all 100ms ease-in-out;\n}\n\n.header input[type=text] {\n  width: 100%;\n  height: 24px;\n  background: #fff;\n}\n\n.contain-url {\n  position: absolute;\n  top: 7px;\n  left: 65px;\n  right: 10px;\n}\n");
        jsEditor.setValue("$(document).ready(function() {\n  $('#backward').on('click', function() {\n    history.back()\n  });\n  \n  $('#forward').on('click', function() {\n    history.forward()\n  });\n  \n  $('#url').on('click', function() {\n    $(this).select();\n  }).keyup(function() {\n    $('#browsensearch').attr('src', 'http://' + $(this).val());\n  });\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["web designer"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>Simple Drawable Web Designer Sample</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css\" />\n  <script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>\n  <script type=\"text/javascript\" src=\"http://threedubmedia.com/inc/js/jquery.event.drag-2.2.js\"></script>\n  <script type=\"text/javascript\" src=\"http://threedubmedia.com/inc/js/jquery.event.drag.live-2.2.js\"></script>\n  </head>\n  <body>\n    <!-- Canvas/Design Area -->\n    <div id=\"design-area\">\n      <div id=\"canvas\"><div class=\"un\" style=\"position: absolute; color: rgb(255, 255, 255); font-size: 16px; background-image: url('http://dianabanana510.files.wordpress.com/2010/06/space-art-wallpapers-26.jpg'); background-attachment: fixed; padding: 6em 1em; font-family: arial; text-align: center; background-position: 50% 50%; width: 100%;\"> <h1>LOREM IPSUM</h1> Je ne sais pas quoi mettre ici, donc je suppose que je vais mettre cela ici. </div> <div class=\"deux\" style=\"position: absolute; background-color: rgb(33, 33, 33); color: rgb(255, 255, 255); font-size: 16px; text-align: center; font-family: arial; padding: 1em 1em 2em; top: 290px; left: 0px;\"> <h1>PELLENTESQUE</h1> Je ne sais pas quoi mettre ici, donc je suppose que je vais mettre cela ici quelques temps. Je ne sais pas quoi mettre ici, donc je suppose que je vais mettre cela ici quelques temps. Je ne sais pas quoi mettre ici, donc je suppose que je vais mettre cela ici quelques temps. Je ne sais pas quoi mettre ici, donc je suppose que je vais mettre cela ici quelques temps. </div></div>\n    </div>\n\n    <!-- Toolbox -->\n    <div id=\"tools\">\n      <a id=\"select-tool\" href=\"javascript:void(0)\"><span class=\"fa fa-location-arrow\" style=\"transform: rotate(0deg) translate(0px) skew(0deg) scale(1) rotateX(0deg) rotateY(180deg) translateX(0px) translateY(0px); -webkit-transform: rotate(0deg) translate(0px) skew(0deg) scale(1) rotateX(0deg) rotateY(180deg) translateX(0px) translateY(0px); -moz-transform: rotate(0deg) translate(0px) skew(0deg) scale(1) rotateX(0deg) rotateY(180deg) translateX(0px) translateY(0px); -ms-transform: rotate(0deg) translate(0px) skew(0deg) scale(1) rotateX(0deg) rotateY(180deg) translateX(0px) translateY(0px); -o-transform: rotate(0deg) translate(0px) skew(0deg) scale(1) rotateX(0deg) rotateY(180deg) translateX(0px) translateY(0px);\"></span></a>\n      <a id=\"draw-tool\" href=\"javascript:void(0)\"><span class=\"fa fa-plus\"></span></a>\n    </div>\n\n    <!-- Properties Panel -->\n    <div id=\"draw-wrapper\">\n      <div id=\"start-props\">\n        <header>\n          &nbsp; starter\n        </header>\n        <div class=\"drop-section\" align=\"center\">\n          Basic starter template for web design applications.\n\n          <p>\n            Designed & Built by.<br><br>\n          </p>\n          <p>\n            <a id=\"author\" href=\"http://michaelsdelivery.tk/\" target=\"_blank\">Michael Schwartz</a>\n          </p>\n        </div>\n      </div>\n      <div id=\"style-props\">\n        <header>\n          &nbsp; styles\n        </header>\n        <div class=\"drop-section\" align=\"center\">\n          <input class=\"grab-classname\" placeholder=\"class name\" type=\"text\">\n          <div class=\"styleinputs\">\n            <span class=\"main-inputs\">\n              <input class=\"grab-color\" placeholder=\"color: ?;\" type=\"text\">\n              <input class=\"grab-background\" placeholder=\"background: ?;\" type=\"text\"><br />\n              <input class=\"grab-font-size\" placeholder=\"font-size: ?;\" type=\"text\">\n              <input class=\"grab-font-family\" placeholder=\"font-family: ?;\" type=\"text\">\n            </span>\n\n            <p>\n              <font size=\"1\">\n                Press [Del] to remove a selected element.\n                <br />\n                [DblClick] to edit text (enters traditional WYSIWYG editor)\n              </font>\n            </p>\n          </div>\n        </div>\n      </div>\n      <div id=\"edit-props\">\n        <div align=\"center\">\n          <p>\n            <a id=\"exit-edit\" href=\"javascript:void(0)\">\n              <span class=\"fa fa-times\"></span>\n            </a>\n            <a id=\"undo\" title=\"Undo\" href=\"javascript:void(0)\" onclick=\"document.execCommand('undo', false, null);\">\n              <span class=\"fa fa-undo\"></span>\n            </a>\n            <a id=\"redo\" title=\"Redo\" href=\"javascript:void(0)\" onclick=\"document.execCommand('redo', false, null);\">\n              <span class=\"fa fa-repeat\"></span>\n            </a>\n          </p>\n        </div>\n\n        <header>\n          heading\n        </header>\n        <div class=\"drop-section\" align=\"center\">\n          <div id=\"edit-heading\" class=\"horizontal-bar\">\n            <a class=\"grab-p\" href=\"javascript:void(0)\">p</a>\n            <a class=\"grab-h1\" href=\"javascript:void(0)\">h1</a>\n            <a class=\"grab-h2\" href=\"javascript:void(0)\">h2</a>\n            <a class=\"grab-h3\" href=\"javascript:void(0)\">h3</a>\n            <a class=\"grab-h4\" href=\"javascript:void(0)\">h4</a>\n            <a class=\"grab-h5\" href=\"javascript:void(0)\">h5</a>\n            <a class=\"grab-h6\" href=\"javascript:void(0)\">h6</a>\n            <a class=\"grab-pre\" href=\"javascript:void(0)\">pre</a>\n            <a class=\"grab-blockquote\" href=\"javascript:void(0)\">blockquote</a>\n          </div>\n        </div>\n\n        <header>\n          typography\n        </header>\n        <div class=\"drop-section\" align=\"center\">\n          <div id=\"edit-font\" class=\"horizontal-bar\">\n            <a style=\"font-family: andale mono;\" class=\"grab-andale-mono\" href=\"javascript:void(0)\">andale mono</a>\n            <a style=\"font-family: arial;\" class=\"grab-arial\" href=\"javascript:void(0)\">arial</a>\n            <a style=\"font-family: arial black;\" class=\"grab-arial-black\" href=\"javascript:void(0)\">arial black</a>\n            <a style=\"font-family: courier;\" class=\"grab-courier\" href=\"javascript:void(0)\">courier</a>\n            <a style=\"font-family: comic sans ms;\" class=\"grab-comic-sans-ms\" href=\"javascript:void(0)\">comic sans ms</a>\n            <a style=\"font-family: garamond;\" class=\"grab-garamond\" href=\"javascript:void(0)\">garamond</a>\n            <a style=\"font-family: helvetica;\" class=\"grab-helvetica\" href=\"javascript:void(0)\">helvetica</a>\n            <a style=\"font-family: impact;\" class=\"grab-impact\" href=\"javascript:void(0)\">impact</a>\n            <a style=\"font-family: palatino;\" class=\"grab-palatino\" href=\"javascript:void(0)\">palatino</a>\n            <a style=\"font-family: papyrus;\" class=\"grab-papyrus\" href=\"javascript:void(0)\">papyrus</a>\n            <a style=\"font-family: serif;\" class=\"grab-serif\" href=\"javascript:void(0)\">serif</a>\n            <a style=\"font-family: sans;\" class=\"grab-sans\" href=\"javascript:void(0)\">sans</a>\n            <a style=\"font-family: tahoma;\" class=\"grab-tahoma\" href=\"javascript:void(0)\">tahoma</a>\n            <a style=\"font-family: times new roman;\" class=\"grab-times-new-roman\" href=\"javascript:void(0)\">times new roman\n            </a>\n            <a style=\"font-family: verdana;\" class=\"grab-verdana\" href=\"javascript:void(0)\">verdana</a>\n          </div>\n\n          <p id=\"edit-align\">\n            <a href=\"javascript:void(0)\" title=\"justifyLeft\"><span class=\"fa fa-align-left\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"justifyCenter\"><span class=\"fa fa-align-center\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"justifyRight\"><span class=\"fa fa-align-right\"></span></a>\n            <input id=\"set-edit-align\" type=\"text\" style=\"display: none;\" />\n          </p>\n          <p>\n            <a title=\"Bold\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;bold&quot;, false, null);\"><span class=\"fa fa-bold\"></span></a>\n            <a title=\"Italic\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;italic&quot;, false, null);\"><span class=\"fa fa-italic\"></span></a>\n            <a title=\"Underline\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;underline&quot;, false, null);\"><span class=\"fa fa-underline\"></span></a>\n            <a title=\"Strikethrough\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;strikeThrough&quot;, false, null);\"><span class=\"fa fa-strikethrough\"></span></a>\n            <a title=\"SubScript\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;subscript&quot;, false, null);\"><span class=\"fa fa-subscript\"></span></a>\n            <a title=\"SuperScript\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;superscript&quot;, false, null);\"><span class=\"fa fa-superscript\"></span></a>\n          </p>\n\n          <table>\n            <tr>\n              <td>\n                <input id=\"edit-font-size\" value=\"3\" min=\"1\" max=\"10\" step=\"1\" onchange=\"fsize.value=value\" type=\"range\">\n              </td>\n              <td>\n                <output id=\"fsize\">3</output>\n              </td>\n            </tr>\n          </table>\n        </div>\n\n        <header>\n          heading\n        </header>\n        <div class=\"drop-section\" align=\"center\">\n          <div id=\"edit-extras\" class=\"horizontal-bar\">\n            <a title=\"Indent\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;indent&quot;, false, null);\"><span class=\"fa fa-indent\"></span></a>\n            <a title=\"Outdent\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;outdent&quot;, false, null);\"><span class=\"fa fa-outdent\"></span></a>\n            <a title=\"Unordered List\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;insertUnorderedList&quot;, false, null);\"><span class=\"fa fa-list-ul\"></span></a>\n            <a title=\"Ordered List\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;insertOrderedList&quot;, false, null);\"><span class=\"fa fa-list-ol\"></span></a>\n            <a title=\"Link\" href=\"javascript:void(0)\" onclick=\"var linkURL = prompt(&quot;Enter the URL for this link:&quot;, &quot;http://&quot;); document.execCommand(&quot;CreateLink&quot;, false, linkURL);\"><span class=\"fa fa-link\"></span></a>\n            <a title=\"Unlink\" href=\"javascript:void(0)\" onclick=\"document.execCommand(&quot;Unlink&quot;, false, null);\"><span class=\"fa fa-unlink\"></span></a>\n            <a title=\"Image\" href=\"javascript:void(0)\" onclick=\"var imgSrc = prompt('Enter image location', ''); if(imgSrc != null) {document.execCommand('insertimage', false, imgSrc);}\"><span class=\"fa fa-picture-o\"></span></a>\n          </div>\n        </div>\n      </div>\n      <div id=\"draw-props\">\n        <header>\n          &nbsp; elements\n        </header>\n        <div class=\"drop-section\">\n          <form class=\"draw-elements\" name='draw-elements'>\n            <input type=\"radio\" value=\"div\" id=\"div\" name=\"elms\" checked=\"true\">\n            <label for=\"div\"> Box</label><br />\n            <input type=\"radio\" value=\"h1\" id=\"h1\" name=\"elms\">\n            <label for=\"h1\"> Text</label><br />\n          </form>\n        </div>\n\n        <header title=\" options\">\n          &nbsp; options<br>\n        </header>\n        <div class=\"drop-section draw-opt-props\" align=\"center\">\n          <div id=\"div-opts\">\n            <input id=\"center-align-div\" type=\"checkbox\" checked=\"true\" />\n            <label for=\"center-align-div\"> Align inner elements to center?</label>\n          </div>\n          <div id=\"h1-opts\">\n            <input id=\"center-align-h1\" type=\"checkbox\" checked=\"true\" />\n            <label for=\"center-align-h1\"> Align inner text to center?</label>\n          </div>\n        </div>\n      </div>\n      <div id=\"layers\">\n        <header>\n          &nbsp; layers\n        </header>\n        <div class=\"drop-section\">\n          <ol>\n            <li>\n              <span>Parent1</span>\n              <ol>\n                <li>\n                  <span>Parent child 1+1</span>\n                  <ol>\n                    <li>\n                      <span>Parent child 2+1</span>\n                      <ol>\n                        <li>\n                          <span>Parent child 3+1</span>\n                          <ol>\n                            <li>\n                              <span>Child 1</span>\n                            </li>\n                            <li>\n                              <span>Child 2</span>\n                            </li>\n                            <li>\n                              <span>Child 3</span>\n                            </li>\n                          </ol>\n                        </li>\n                        <li>\n                          <span>Parent child 3+1</span>\n                        </li>\n                        <li>\n                          <span>Parent child 3+1</span>\n                        </li>\n                      </ol>\n                    </li>\n                  </ol>\n                </li>\n                <li>\n                  <span>Parent child 1+1</span>\n                </li>\n                <li>\n                  <span>Parent child 1+1</span>\n                  <ol>\n                    <li>\n                      <span>Parent child 2+1</span>\n                    </li>\n                  </ol>\n                  <ol>\n                    <li>\n                      <span>Parent child 2+1</span>\n                    </li>\n                  </ol>\n                </li>\n              </ol>\n            </li>\n          </ol>\n        </div>\n      </div>\n      <textarea id=\"code\" style=\"display:none;\"></textarea>\n    </div>\n  </body>\n</html>");
        cssEditor.setValue("*:active, *:focus {\n  outline: 0;\n}\n\nhtml, body {\n  height: 100%;\n}\n\nbody {\n  margin: 0;\n  font: 14px arial;\n  color: #000;\n  background: #333;\n}\n\n/* Right Panel */\n#draw-wrapper {\n  cursor: default;\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 300px;\n  height: 100%;\n  color: #ccc;\n  background: #333;\n  overflow: auto;\n}\n\n/* Toolbox */\n#tools {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 50px;\n  background: #333;\n}\n\n#tools a {\n  display: inline-block;\n  text-decoration: none;\n  color: #ccc;\n  margin: 0 .5em .25em .5em;\n  padding: .5em .5em .25em .5em;\n  font: 18px arial;\n}\n\n#tools a:hover {\n  color: #6df;\n}\n\n#tools .activetool {\n  color: #3bf;\n}\n\n/* Property Containers */\n#author {\n  text-decoration: none;\n  padding: 1em 2em;\n  background: #69f;\n  color: #edf;\n  border-radius: 1em;\n}\n\n#author:hover {\n  color: #fff;\n  background: #6af;\n}\n\n#author:active {\n  background: #66f;\n}\n\n#draw-wrapper header {\n  cursor: pointer;\n  padding: 0 5px;\n  border-top: 1px solid #151515;\n  border-bottom: 1px solid #151515;\n  background: #252525;\n  color: #999;\n  font: 14px times;\n  text-transform: uppercase;\n}\n\n#draw-wrapper .activedrop {\n  color: #666;\n}\n\n.drop-section {\n  padding: 5px;\n  font: 14px arial;\n}\n\n.styleinputs input[type=text], .styleinputs input[type=number] {\n  width: 45%;\n  background: #444;\n  border-radius: 0;\n  border-style: solid;\n  border-width: 1px;\n  border-color: #1a1a1a #272729 #272729 #272729;\n  font: 15px arial;\n  -webkit-font-smoothing: antialiased;\n  color: #ced;\n}\n\n#draw-props input[type=text] {\n  width: 90%;\n  background: #444;\n  border-radius: 0;\n  border-style: solid;\n  border-width: 1px;\n  border-color: #1a1a1a #272729 #272729 #272729;\n  font: 15px arial;\n  -webkit-font-smoothing: antialiased;\n  color: #ced;\n}\n\n.styleinputs ::-webkit-input-placeholder, \n#anchor-opts ::-webkit-input-placeholder { /* WebKit browsers */\n    color: #888;\n}\n.styleinputs :-moz-placeholder, \n#anchor-opts :-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n    color: #888;\n}\n.styleinputs ::-moz-placeholder, \n#anchor-opts ::-moz-placeholder { /* Mozilla Firefox 19+ */\n    color: #888;\n}\n.styleinputs :-ms-input-placeholder, \n#anchor-opts :-ms-input-placeholder { /* Internet Explorer 10+ */\n    color: #888;\n}\n\n.grab-classname {\n  width: 70%;\n  color: #fff;\n  font: 16px arial;\n  background-color: #09a;\n  border: 0; margin: 1em;\n  padding: 1em 2em;\n  margin: .25em 0 1em 0;\n  border-radius: 1em;\n}\n\n/* Edit Properties */\n#edit-props a {\n  padding: 5px 10px;\n  margin: 0px 2px;\n  border-style: none;\n  border-width: 0px;\n  font-family: sans;\n  color: #ccc;\n  background: #444;\n  text-decoration: none;\n  font-size: 12px;\n  font-weight: normal;\n}\n\n#edit-props a:hover {\n  color: #fff;\n}\n\n#edit-props #undo, #edit-props #redo, #edit-props #exit-edit {\n  background: transparent;\n  font-size: 26px;\n}\n\n#edit-props .horizontal-bar {\n  display: inline-block;\n  padding: 1em 0;\n  margin: 0;\n  width: 95%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  white-space: nowrap;\n}\n\n/* Drawing Area */\n#layers ol li ol {\n  display: none;\n}\n#layers ol li {\n  cursor: pointer;\n}\n\n/* Drawing Area */\n#design-area {\n  position: absolute;\n  top: 0;\n  left: 50px;\n  right: 300px;\n  bottom: 0;\n  overflow: hidden;\n}\n\n#canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: #fff;\n  overflow: auto;\n}\n\n/* Resize Constructs */\n.drag {\n  position: absolute;\n  border: 1px solid #89B;\n  background: #BCE;\n  width: 58px;\n  height: 58px;\n  top: 120px;\n  cursor: move;\n}\n\n.handle {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  border: 1px solid #89B;\n  background: #9AC; \n}\n.rotatable {\n  cursor: move;\n  left: 50%;\n  top: -30px;\n  margin-left: -4px;\n  background: rgba(0, 0, 0, 0.5); \n  border-radius: 25em;\n}\n\n.NW, .NN, .NE { top: -4px; }\n.NE, .EE, .SE { right: -4px; }\n.SW, .SS, .SE { bottom: -4px; }\n.NW, .WW, .SW { left: -4px; }\n.SE, .NW { cursor: nw-resize; }\n.SW, .NE { cursor: ne-resize; }\n.NN, .SS { cursor: n-resize; left: 50%; margin-left: -4px; }\n.EE, .WW { cursor: e-resize; top: 50%; margin-top: -4px; }\n.selected { background-color: #ECB; border-color: #B98; }\n.selected .handle { background-color: #CA9; border-color: #B98; }\n");
        jsEditor.setValue("$(document).ready(function() {\n  // Setup our variables\n  var elmstyle = false,\n      drawable = false,\n      drawing  = false,\n      mS = {},\n      dBox,\n      editableElm;\n\n  // Global Function Callbacks\n  function CheckDrawOptions() {\n    if ($(\"#div\").is(\":checked\")) {\n      $(\".draw-opt-props div\").hide();\n      $(\"#div-opts\").show();\n    } else if ($(\"#h1\").is(\":checked\")) {\n      $(\".draw-opt-props div\").hide();\n      $(\"#h1-opts\").show();\n    }\n  }\n  var BoxOptions =  function() {\n    if ($(\"#div\").is(\":checked\")) {\n      if ($(\"#center-align-div\").is(\":checked\")) {\n        dBox = $(\"<\" + $('.draw-elements input[type=radio]:checked').val() + \" class='box' align='center' />\");\n      } \n      else {\n        dBox = $(\"<\" + $('.draw-elements input[type=radio]:checked').val() + \" class='box' />\");\n      }\n    }\n    if ($(\"#h1\").is(\":checked\")) {\n      if ($(\"#center-align-h1\").is(\":checked\")) {\n        dBox = $(\"<\" + $('.draw-elements input[type=radio]:checked').val() + \" class='box' align='center' />\")\n        .html(\"Hello world\");\n      } \n      else {\n        dBox = $(\"<\" + $('.draw-elements input[type=radio]:checked').val() + \" class='box' />\")\n        .html(\"Hello world\");\n      }\n    }\n  };\n  var HandleSelectedElement = function() {\n    if ($(\"#select-tool.activetool\").is(\":visible\")) {\n      // Selects Element\n      $('#canvas').children().on('mousedown touchstart', function(e) {\n        if(elmstyle) {\n          // Remove previously added handles\n          $('.handle').remove();\n\n          // Grab selected elements class\n          $(\".grab-classname\").val($(this).attr('class'));\n\n          // Remove all ids from previously selected elements\n          $(\"#canvas *\").removeAttr('id').removeAttr('contenteditable');\n\n          // Make element styleable\n          $(this).attr('id', 'stylethis').append('<div class=\"handle rotatable\"></div><div class=\"handle NE\"></div><div class=\"handle NN\"></div><div class=\"handle NW\"></div><div class=\"handle WW\"></div><div class=\"handle EE\"></div><div class=\"handle SW\"></div><div class=\"handle SS\"></div><div class=\"handle SE\"></div>');\n\n          // Remove style values and focus\n          $(\".main-inputs input\").val(\"\").blur();\n        }\n      })\n      .drag(\"start\",function( ev, dd ){\n        dd.attrc = $( ev.target ).prop(\"className\");\n        dd.attrd = $( ev.target ).prop(\"id\");\n        dd.width = $( this ).width();\n        dd.height = $( this ).height();\n      }).drag(function( ev, dd ){\n        var props = {};\n        if ( dd.attrc.indexOf(\"E\") > -1 ){\n          props.width = Math.max( 32, dd.width + dd.deltaX );\n        }\n        if ( dd.attrc.indexOf(\"S\") > -1 ){\n          props.height = Math.max( 32, dd.height + dd.deltaY );\n        }\n        if ( dd.attrc.indexOf(\"W\") > -1 ){\n          props.width = Math.max( 32, dd.width - dd.deltaX );\n          props.left = dd.originalX + dd.width - props.width;\n        }\n        if ( dd.attrc.indexOf(\"N\") > -1 ){\n          props.height = Math.max( 32, dd.height - dd.deltaY );\n          props.top = dd.originalY + dd.height - props.height;\n        }\n        if ( dd.attrd.indexOf(\"stylethis\") > -1 ){\n          props.top = dd.offsetY;\n          props.left = dd.offsetX;\n        }\n        $('#stylethis').css( props );\n      }, {relative:true})\n      .on('dblclick', function() {\n        EditableStylez();\n        return false;\n      });\n\n      // Rotate 360 Degrees \n      $(\".rotatable\").on(\"mousedown touchstart\", function() {\n        rotateable = 1;\n        if (rotateable) {\n          $(\"#stylethis\").each(function() {\n            var container = $(this),\n                body = $(document),\n                angler = container.find(\".rotatable\").parent();\n\n            angler.on(\"mousedown touchstart\", mouseDown);\n            body.on(\"mouseup touchend\", mouseUp);\n\n            function setAngle(value) {\n              angler.css(\"transform\", \"rotate(\" + value + \"deg)\").change();\n            }\n\n            function mouseDown(event) {\n              body.on(\"mousemove.rotatable\", handleMove);\n              body.on(\"touchmove.rotatable\", handleMove);\n              handleMove(event);\n              event.preventDefault();\n            }\n\n            function mouseUp(event) {\n              body.off(\"mousemove.rotatable\", handleMove);\n              body.off(\"touchmove.rotatable\", handleMove);\n              rotateable = false;\n            }\n\n            function handleMove(event) {\n              if (rotateable) {\n                var mouseX = event.pageX;\n                var mouseY = event.pageY;\n\n                setAngle(0);\n                var ofs = angler.offset();\n                ofs.left += angler.height()/2;\n                ofs.top += angler.width()/2;\n\n                var x = mouseX - ofs.left;\n                var y = mouseY - ofs.top;\n\n                var angle = Math.atan2(x, y) * 180 / Math.PI;\n                angle = 180 - angle;\n                // strip decimal, go between 0-360\n                angle = ((angle + 360) | 0) % 360;\n                setAngle(angle);\n              }\n            }\n          }); \n        }\n      });\n    }\n  };\n  var EditableStylez = function() {\n    $(\"#canvas *\").prop('contenteditable', true);\n    window.getSelection().removeAllRanges();\n    $(\"#style-props\").hide();\n    $(\"#edit-props\").show();\n    // Deactivates interactive design and right click menu when tool is active\n    $(\"div.handle\").remove();\n    RefreshCanvas();\n    $('[contenteditable]').on('focus',function(){\n      editableElm = this;\n    });\n    $(\"#canvas\").find(\"#stylethis\").trigger('focus');\n    $(\"#canvas *\").removeAttr(\"id\");\n  };\n  var RefreshCanvas = function() {\n    $(\"#code\").val($(\"#canvas\").html());\n    $(\"#canvas\").html($(\"#code\").val());\n  };\n\n  // Toggle Property Dropdown\n  $(\"#draw-wrapper header\").on('click', function() {\n    $(this).toggleClass(\"activedrop\").next().toggle();\n  });\n\n  // Handles Select Tool\n  $(\"#select-tool\").on('click', function() {\n    $(\"#draw-tool\").removeClass(\"activetool\");\n    $(this).toggleClass(\"activetool\");\n    RefreshCanvas();\n\n    if ($(\"#select-tool.activetool\").is(\":visible\")) {\n      $(\"#draw-props, #start-props\").hide();\n      $(\"#style-props\").show();\n      drawable = false;\n      elmstyle = 1;\n\n      if(elmstyle) {\n        HandleSelectedElement();\n        $(\".grab-classname\").on(\"keyup\", function() {\n          $(\"#stylethis\").attr('class', $(this).val());\n        });\n        $(\".grab-color\").on(\"keyup\", function() {\n          $(\".\"+ $(\".grab-classname\").val()).css({\n            \"color\": $(this).val()\n          });\n        });\n        $(\".grab-background\").on(\"keyup\", function() {\n          $(\".\"+ $(\".grab-classname\").val()).css({\n            \"background\": $(this).val()\n          });\n        });\n        $(\".grab-font-size\").on(\"keyup\", function() {\n          $(\".\"+ $(\".grab-classname\").val()).css({\n            \"font-size\": $(this).val()\n          });\n        });\n        $(\".grab-font-family\").on(\"keyup\", function() {\n          $(\".\"+ $(\".grab-classname\").val()).css({\n            \"font-family\": $(this).val()\n          });\n        });\n        $(\"#exit-edit\").on('click', function() {\n          $(\"#canvas *\").removeAttr('id').removeAttr('contenteditable');\n          $(\"#edit-props\").hide();\n          $(\"#style-props\").show();\n          RefreshCanvas();\n          HandleSelectedElement();\n        });\n      }\n    }\n    else {\n      elmstyle = false;\n      // Remove all ids from previously selected elements\n      $(\"#canvas *\").removeAttr('id').removeAttr('contenteditable');\n      $(\".handle\").remove();\n\n      // Remove style values\n      $(\".main-inputs input\").val(\"\");\n\n      $(\"#style-props, #edit-props\").hide();\n      if (($(\"#style-props\").is(\":hidden\")) && ($(\"#draw-props\").is(\":hidden\"))) {\n        $(\"#start-props\").show();\n      }\n    }\n  });\n\n  // Handles Draw Tool\n  $(\"#draw-tool\").on('click', function() {\n    $(\"#select-tool\").removeClass(\"activetool\");\n    $(this).toggleClass(\"activetool\");\n    RefreshCanvas();\n    if ($(\"#draw-tool.activetool\").is(\":visible\")) {\n      elmstyle = false;\n      drawable = 1;\n      $(\"#draw-props\").show();\n      $(\"#style-props, #edit-props, #start-props\").hide();\n\n      // Remove all ids from previously selected elements\n      $(\"#canvas *\").removeAttr('id').removeAttr('contenteditable');\n      $(\".handle\").remove();\n\n      // Handles Draw Options\n      $(\".draw-elements input[type=radio]\").on('change', function() {\n        CheckDrawOptions();\n      });\n      $(\".draw-opt-props > div input\").on('change', function() {\n        BoxOptions();\n      });\n    }\n    else {\n      drawable = false;\n      $(\"#draw-props\").hide();\n      if (($(\"#style-props\").is(\":hidden\")) && ($(\"#draw-props\").is(\":hidden\"))) {\n        $(\"#start-props\").show();\n      }\n    }\n  });\n\n  // Handles Editable Heading\n  $('#edit-heading a').on('click', function() {\n    document.execCommand('formatBlock', false, $(this).text());\n  });\n\n  // Handles Editable Typography\n  $('#edit-font a').on('click', function() {\n    document.execCommand('FontName', false, $(this).text());\n  });\n  $('#edit-align a').on('click', function() {\n    $(\"#set-edit-align\").val($(this).prop('title'));\n    if ($('#set-edit-align').val() === \"justifyLeft\") {\n      document.execCommand(\"justifyLeft\",false,null);\n    } else if ($('#set-edit-align').val() === \"justifyCenter\") {\n      document.execCommand(\"justifyCenter\",false,null);\n    } else if ($('#set-edit-align').val() === \"justifyRight\") {\n      document.execCommand(\"justifyRight\",false,null);\n    }\n  });\n  $(\"#edit-font-size\").on('change', function() {\n    document.execCommand('FontSize', false, $(this).val());\n  });\n\n  // Handles Drawable Elements\n  $(\"#canvas\").on('mousedown touchstart', function(e) {\n    if(drawable) {\n      drawing = true;\n      mS.x = e.pageX - 50;\n      mS.y = e.pageY;\n      BoxOptions();\n      $(this).append(dBox);\n\n      // Do not select text when drawing\n      return false;\n    }\n  });\n  $(document).on('mousemove touchmove', function(e) {\n    if(drawing && drawable){\n      var mPos = {x:e.pageX - 50, y:e.pageY};\n      var css = {};\n      css.position   = 'absolute';\n      css.left       = (mPos.x > mS.x) ? mS.x : mPos.x;\n      css.top        = (mPos.y > mS.y) ? mS.y : mPos.y;\n      css.width      = Math.abs(mPos.x - mS.x);\n      css.height     = Math.abs(mPos.y - mS.y);\n      css.border = '1px dotted rgb(0, 34, 102)';\n      dBox.css(css);\n\n      // Do not select text when drawing\n      return false;\n    }\n  }).on('mouseup touchend', function(e) {\n    drawing  = false;\n  });\n\n  // Handles Shortcuts\n  $(document).keydown(function(e) {\n    // Delete selected element\n    if ($(\"#stylethis\").is(\":visible\")) {\n      if (e.which === 46) {\n        if ($(\".main-inputs input\").is(\":focus\")) {\n          // Do nothing if an input is focused\n        } else {\n          $(\"#stylethis\").remove();\n        }\n      }\n    }\n\n    // Escape Style, Edit, and Draw Tools\n    if ($(\"#style-props\").is(\":visible\")) {\n      if (e.which === 27) {\n        $(\"#select-tool\").trigger(\"click\");\n      }\n    }\n    if ($(\"#edit-props\").is(\":visible\")) {\n      if (e.which === 27) {\n        $(\"#exit-edit\").trigger(\"click\");\n      }\n    }\n    if ($(\"#draw-props\").is(\":visible\")) {\n      if (e.which === 27) {\n        $(\"#draw-tool\").trigger(\"click\");\n      }\n    }\n  });\n\n  // New Document\n  $(\"#new-doc\").on('click', function() {\n    var x = window.confirm(\"Did you save your changes?\");\n    if (x) {\n      $(\"#canvas\").html(\"\");\n      $(\"#code\").val(\"\");\n      if ($(\"#select-tool.activetool\").is(\":visible\")) {\n        $(\"#select-tool\").trigger(\"click\");\n      }\n      if ($(\"#edit-tool.activetool\").is(\":visible\")) {\n        $(\"#edit-tool\").trigger(\"click\");\n      }\n    } else {\n      // The user decided not to create a new doc. Therefore do nothing\n    }\n  });\n\n  // Handles Layers\n  $(function() {\n    // Make Collapsable\n    $(\"#layers ol li > span\").each(function() {\n      $(this).on('click', function(e) {\n        $(e.target).next().filter(\"ol\").toggle();\n      });\n    });\n  });\n\n  CheckDrawOptions();\n\n  // Remove style values\n  $(\".main-inputs input\").val(\"\");\n\n  // Hide style properties onload\n  $(\"#style-props, #edit-props, #draw-props\").hide();\n});\n");
      } else if ($.inArray($val.toLowerCase(), ["webgl cube"]) > -1) {
        htmlEditor.setValue("<!-- Tutorial Located at: http://www.html5canvastutorials.com/three/html5-canvas-three-js-normal-material/ -->\n\n<!DOCTYPE HTML>\n<html>\n  <head>\n    <title>WebGL Cube: Demo</title>\n  </head>\n  <body>\n    <div id='container'></div>\n    <script src='http://www.html5canvastutorials.com/libraries/three.min.js'></script>\n  </body>\n</html>");
        cssEditor.setValue("body {\n  margin: 0;\n  padding: 0;\n}\n");
        jsEditor.setValue("// revolutions per second\nvar angularSpeed = 0.2; \nvar lastTime = 0;\n\n// this function is executed on each animation frame\nfunction animate(){\n  // update\n  var time = (new Date()).getTime();\n  var timeDiff = time - lastTime;\n  var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;\n  cube.rotation.y += angleChange;\n  lastTime = time;\n  \n  // render\n  renderer.render(scene, camera);\n  \n  // request new frame\n  requestAnimationFrame(function(){\n    animate();\n  });\n}\n\n// renderer\nvar renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\n// camera\nvar camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);\ncamera.position.z = 500;\n\n// scene\nvar scene = new THREE.Scene();\n\n// cube\nvar cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshNormalMaterial());\ncube.overdraw = true;\ncube.rotation.x = Math.PI * 0.1;\nscene.add(cube);\n\n// start animation\nanimate();\n");
      } else if ($.inArray($val.toLowerCase(), ["webgl first person interaction"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>WebGL: First Person Pointer Lock</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <script type=\"text/javascript\" src=\"http://www.html5canvastutorials.com/libraries/three.min.js\"></script>\n  </head>\n  <body>\n    <h1>WASD keys to move</h1>\n  </body>\n</html>");
        cssEditor.setValue("");
        jsEditor.setValue("//http://www.html5rocks.com/en/tutorials/pointerlock/intro/#toc-references\n\nvar\nscene_width = window.innerWidth,\n    scene_height = window.innerHeight,\n    player = {\n      body : new THREE.Object3D()\n    },\n    key = {\n      left   : false,\n      up     : false,\n      right  : false,\n      down   : false,\n      space   : false\n    },\n    drawCube = function(x,y,z,w,h,d){\n\n      var cube = new THREE.Mesh(new THREE.CubeGeometry(w, h, d), new THREE.MeshNormalMaterial());\n\n      cube.overdraw = true;\n\n      cube.position.set(x,y,z);\n\n      scene.add(cube);\n\n    },\n    animate = function(){\n\n      if(key.left)\n        player.body.translateX(-0.15);\n\n      if(key.up)\n        player.body.translateZ(-0.15);\n\n      if(key.right)\n        player.body.translateX(0.15);\n\n      if(key.down)\n        player.body.translateZ(0.15);\n\n      // render\n      renderer.render(scene, camera);\n\n      // request new frame\n      requestAnimationFrame(function(){\n        animate();\n      });\n    };\n\n// renderer\nvar renderer = new THREE.WebGLRenderer();\nrenderer.setSize(scene_width, scene_height);\ndocument.body.appendChild(renderer.domElement);\n\n/* Pointer lock */\nvar canvas = document.getElementsByTagName(\"canvas\")[0],\n    mouse_sensitivity = 200,\n    changeCallback = function(e){\n      if (document.pointerLockElement === canvas ||\n          document.mozPointerLockElement === canvas ||\n          document.webkitPointerLockElement === canvas) {\n        // Pointer was just locked\n        // Enable the mousemove listener\n        document.addEventListener(\"mousemove\", moveCallback, false);\n      } else {\n        // Pointer was just unlocked\n        // Disable the mousemove listener\n        document.removeEventListener(\"mousemove\", moveCallback, false);\n      }\n    },\n    moveCallback = function(e){\n\n      var movementX = e.movementX ||\n          e.mozMovementX ||\n          e.webkitMovementX ||\n          0,\n\n          movementY = e.movementY ||\n          e.mozMovementY ||\n          e.webkitMovementY ||\n          0;\n\n      player.body.rotation.y -= movementX/mouse_sensitivity;\n      camera.rotation.x -= movementY/mouse_sensitivity;\n    };\n\ncanvas.requestPointerLock = canvas.requestPointerLock ||\n  canvas.mozRequestPointerLock ||\n  canvas.webkitRequestPointerLock;\n\n\ncanvas.onclick=function(){\n\n  // Ask the browser to lock the pointer)\n  canvas.requestPointerLock();\n};\n\n// Hook pointer lock state change events\ndocument.addEventListener('pointerlockchange', changeCallback, false);\ndocument.addEventListener('mozpointerlockchange', changeCallback, false);\ndocument.addEventListener('webkitpointerlockchange', changeCallback, false);\n\n// Ask the browser to release the pointer\ndocument.exitPointerLock = document.exitPointerLock ||\n  document.mozExitPointerLock ||\n  document.webkitExitPointerLock;\n\ndocument.exitPointerLock();\n\n// camera\nvar camera = new THREE.PerspectiveCamera(45, scene_width / scene_height, 1, 1000);\n// camera.position.z = 80;\n\n// scene\nvar scene = new THREE.Scene();\n\n// plane aka ground\nvar plane = new THREE.Mesh(new THREE.PlaneGeometry(50,50), new THREE.MeshNormalMaterial());\n\nplane.rotation.x = 4.7;\nplane.position.y = -1;\n\nscene.add(plane);\n\n// cube\ndrawCube(0,0,0,1,1,1);\ndrawCube(5,0,0,1,1,1);\ndrawCube(5,0,5,1,1,1);\ndrawCube(-5,0,5,1,1,1);\ndrawCube(-5,5,5,1,1,1);\ndrawCube(0,3,5,1,1,1);\ndrawCube(-4,3,-5,1,1,1);\ndrawCube(2.5,3,-5,1,1,1);\ndrawCube(5,2,-20,1,1,1);\n\n\nplayer.body.position.z = 5;\n\nplayer.body.add(camera);\nscene.add(player.body);\n\n// start animation\nanimate();\n\ndocument.body.onkeydown=function(e){\n\n  switch(e.keyCode){\n    case 65 :\n      key.left = true;\n      break;\n\n    case 87 :\n      key.up = true;\n      break;\n\n    case 68 :\n      key.right = true;\n      break;\n\n    case 83 :\n      key.down = true;\n      break;\n\n    case 32 :\n      key.space = true;\n      break;\n  }\n};\ndocument.body.onkeyup=function(e){\n\n  switch(e.keyCode){\n    case 65 :\n      key.left = false;\n      break;\n\n    case 87 :\n      key.up = false;\n      break;\n\n    case 68 :\n      key.right = false;\n      break;\n\n    case 83 :\n      key.down = false;\n      break;\n\n    case 32 :\n      key.space = false;\n      break;\n  }\n};");
      } else if ($.inArray($val.toLowerCase(), ["whiteboard"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML5 Canvas Drawing Board</title>\n  <meta charset='utf-8' />\n  <meta name='viewport' content='initial-scale=1.0'>\n  <meta http-equiv='X-UA-Compatible' content='IE=9' />\n  <link type='text/css' rel='stylesheet' href='http://necolas.github.io/normalize.css/3.0.1/normalize.css'/>\n  <script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n</head>\n<body>\n  <canvas id='myCanvas'>\n    Sorry, your browser does not support HTML5 canvas technology.\n  </canvas>\n</body>\n</html>");
        cssEditor.setValue("body, html {\n  height: 100%;\n  margin: 0;\n}\n\n#myCanvas {\n  cursor: crosshair;\n  position: fixed;\n}\n");
        jsEditor.setValue("var myCanvas = document.getElementById('myCanvas');\nvar ctx = myCanvas.getContext('2d');\n\n// Fill Window Width and Height\nmyCanvas.width = window.innerWidth;\nmyCanvas.height = window.innerHeight;\n\n// Set Background Color\nctx.fillStyle='#fff';\nctx.fillRect(0,0,myCanvas.width,myCanvas.height);\n\n// Mouse Event Handlers\nif(myCanvas){\n  var isDown = false;\n  var canvasX, canvasY;\n  ctx.lineWidth = 5;\n  \n  $(myCanvas)\n  .mousedown(function(e){\n    isDown = true;\n    ctx.beginPath();\n    canvasX = e.pageX - myCanvas.offsetLeft;\n    canvasY = e.pageY - myCanvas.offsetTop;\n    ctx.moveTo(canvasX, canvasY);\n  })\n  .mousemove(function(e){\n    if(isDown !== false) {\n      canvasX = e.pageX - myCanvas.offsetLeft;\n      canvasY = e.pageY - myCanvas.offsetTop;\n      ctx.lineTo(canvasX, canvasY);\n      ctx.strokeStyle = '#000';\n      ctx.stroke();\n    }\n  })\n  .mouseup(function(e){\n    isDown = false;\n    ctx.closePath();\n  });\n}\n\n// Touch Events Handlers\ndraw = {\nstarted: false,\n start: function(evt) {\n   \n   ctx.beginPath();\n   ctx.moveTo(\n   evt.touches[0].pageX,\n    evt.touches[0].pageY\n   );\n   \n   this.started = true;\n   \n },\n move: function(evt) {\n   \n   if (this.started) {\n     ctx.lineTo(\n     evt.touches[0].pageX,\n      evt.touches[0].pageY\n     );\n     \n     ctx.strokeStyle = '#000';\n     ctx.lineWidth = 5;\n     ctx.stroke();\n   }\n   \n },\n end: function(evt) {\n   this.started = false;\n }\n};\n\n// Touch Events\nmyCanvas.addEventListener('touchstart', draw.start, false);\nmyCanvas.addEventListener('touchend', draw.end, false);\nmyCanvas.addEventListener('touchmove', draw.move, false);\n\n// Disable Page Move\ndocument.body.addEventListener('touchmove',function(evt){\n  evt.preventDefault();\n},false);\n");
      } else if ($.inArray($val.toLowerCase(), ["wysiwyg editor"]) > -1) {
        htmlEditor.setValue("<!DOCTYPE html>\n<html>\n  <head>\n    <title>WYSIWYG [What You See Is What You Get] Editor Using an IFrame</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://necolas.github.io/normalize.css/3.0.1/normalize.css\" />\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"http://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css\" />\n  </head>\n  <body>\n    <form name=\"myform\" id=\"myform\" method=\"post\">\n      <!-- Navigation -->\n      <div class=\"nav\" align=\"center\">\n        <a title=\"Code\" href='javascript:submit_form();'><i class='fa fa-code'></i></a>\n        <a title=\"Undo\" href='javascript:iUndo()'><i class='fa fa-undo'></i></a>\n        <a title=\"Redo\" href='javascript:iRedo()'><i class='fa fa-repeat'></i></a>\n        <a title=\"Cut\" href='javascript:iCut()'><i class='fa fa-cut'></i></a>\n        <a title=\"Copy\" href='javascript:iCopy()'><i class='fa fa-copy'></i></a>\n        <a title=\"Paste\" href='javascript:iPaste()'><i class='fa fa-paste'></i></a>\n        <a title=\"Select All\" href='javascript:iSelectAll()'><i class='fa fa-circle-o'></i></a>\n        <a title=\"Delete\" href='javascript:iDelete()'><i class='fa fa-trash-o'></i></a>\n        <a title=\"Remove format\" href='javascript:iRemoveFormat()'><i class='fa fa-eraser'></i></a>\n        <a title=\"Bold\" href='javascript:iBold()'><i class='fa fa-bold'></i></a>\n        <a title=\"Italic\" href='javascript:iItalic()'><i class='fa fa-italic'></i></a>\n        <a title=\"Underline\" href='javascript:iUnderline()'><i class='fa fa-underline'></i></a>\n        <a title=\"Strikethrough\" href='javascript:iStrike()'><i class='fa fa-strikethrough'></i></a>\n        <a title=\"Font Family\" href='javascript:iFontFamily()'><i class='fa fa-font'></i></a>\n        <a title=\"Text Size\" href='javascript:iFontSize()'><i class='fa fa-text-height'></i></a>\n        <a title=\"Text Color\" href='javascript:iForeColor()'><i class='fa fa-font' style=\"color:red;\"></i></a>\n        <a title=\"Text BGColor\" href='javascript:iBackColor()'><i class='fa fa-font' style=\"background:black; color:red;\"></i></a>\n        <a title=\"Align Left\" href='javascript:iAlignLeft()'><i class='fa fa-align-left'></i></a>\n        <a title=\"Align Center\" href='javascript:iAlignCenter()'><i class='fa fa-align-center'></i></a>\n        <a title=\"Align Right\" href='javascript:iAlignRight()'><i class='fa fa-align-right'></i></a>\n        <a title=\"Indent\" href='javascript:iIndent()'><i class='fa fa-indent'></i></a>\n        <a title=\"Outdent\" href='javascript:iOutdent()'><i class='fa fa-outdent'></i></a>\n        <a title=\"Paragraph\" href='javascript:iParagraph()'><strong>P</strong></a>\n        <a title=\"HorizontalRule\" href='javascript:iHorizontalRule()'><i class='fa fa-minus-square-o'></i></a>\n        <a title=\"Unordered List\" href='javascript:iUnorderedList()'><i class='fa fa-list-ul'></i></a>\n        <a title=\"Ordered List\" href='javascript:iOrderedList()'><i class='fa fa-list-ol'></i></a>\n        <a title=\"SuperScript\" href='javascript:iSuperScript()'><i class='fa fa-superscript'></i></a>\n        <a title=\"SubScript\" href='javascript:iSubScript()'><i class='fa fa-subscript'></i></a>\n        <a title=\"Link\" href='javascript:iLink()'><i class='fa fa-link'></i></a>\n        <a title=\"UnLink\" href='javascript:iUnLink()'><i class='fa fa-unlink'></i></a>\n        <a title=\"Image\" href='javascript:iImage()'><i class='fa fa-picture-o'></i></a>\n      </div>\n\n      <!-- Editor -->\n      <iframe name=\"richTextField\" id=\"richTextField\"></iframe>\n\n      <!-- Generated Code -->\n      <textarea name=\"myTextArea\" id=\"myTextArea\" placeholder=\"Generate code here\"></textarea>\n    </form>\n  </body>\n</html>");
        cssEditor.setValue("a {\n  font-size: 20px;\n  text-decoration: none;\n  padding: 0 10px 0 10px;\n}\n\n.nav {\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 5px 0;\n  height: 35px;\n  overflow-y: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\niframe[name=richTextField], textarea[name=myTextArea] {\n  position: absolute;\n  top: 50px;\n  height: 90%;\n  border: #000 1px solid;\n  width: 50%;\n}\n  \n  \niframe[name=richTextField] {\n  left: 0;\n}\n\ntextarea[name=myTextArea] {\n  right: 0;\n  padding: 0;\n  resize: none;\n}");
        jsEditor.setValue("window.onload = function() {\n  richTextField.document.designMode = 'On';\n};\n\nfunction iUndo() {\n  richTextField.document.execCommand('undo',false,null);\n}\n\nfunction iRedo() {\n  richTextField.document.execCommand('redo',false,null);\n}\n\nfunction iCut() {\n  richTextField.document.execCommand('cut',false,null);\n}\n\nfunction iCopy() {\n  richTextField.document.execCommand('copy',false,null);\n}\n\nfunction iPaste() {\n  richTextField.document.execCommand('paste',false,null);\n}\n\nfunction iSelectAll() {\n  richTextField.document.execCommand('selectAll',false,null);\n}\n\nfunction iDelete() {\n  richTextField.document.execCommand('delete',false,null);\n}\n\nfunction iRemoveFormat() {\n  richTextField.document.execCommand('removeFormat',false,null);\n}\n\nfunction iBold() {\n  richTextField.document.execCommand('bold',false,null);\n}\n\nfunction iItalic() {\n  richTextField.document.execCommand('italic',false,null);\n}\n\nfunction iUnderline() {\n  richTextField.document.execCommand('underline',false,null);\n}\n\nfunction iStrike() {\n  richTextField.document.execCommand('strikethrough',false,null);\n}\n\nfunction iFontFamily() {\n  var font = prompt('Enter a font', '');\n  richTextField.document.execCommand('FontName',false,font);\n}\n\nfunction iFontSize() {\n  var size = prompt('Enter a size 1 - 7', '');\n  richTextField.document.execCommand('FontSize',false,size);\n}\n\nfunction iForeColor() {\n  var color = prompt('Define a basic color or apply a hexadecimal color code for advanced colors:', '');\n  richTextField.document.execCommand('ForeColor',false,color);\n}\n\nfunction iBackColor() {\n  var color = prompt('Define a basic color or apply a hexadecimal color code for advanced colors:', '');\n  richTextField.document.execCommand('BackColor',false,color);\n}\n\nfunction iAlignLeft() {\n  richTextField.document.execCommand(\"justifyLeft\", false, null);\n}\n\nfunction iAlignCenter() {\n  richTextField.document.execCommand(\"justifyCenter\", false, null);\n}\n\nfunction iAlignRight() {\n  richTextField.document.execCommand(\"justifyRight\", false, null);\n}\n\nfunction iIndent() {\n  richTextField.document.execCommand(\"indent\", false, null);\n}\n\nfunction iOutdent() {\n  richTextField.document.execCommand(\"outdent\", false, null);\n}\n\nfunction iParagraph() {\n  richTextField.document.execCommand(\"insertParagraph\", false, null);\n}\n\nfunction iHorizontalRule() {\n  richTextField.document.execCommand('inserthorizontalrule',false,null);\n}\n\nfunction iUnorderedList() {\n  richTextField.document.execCommand(\"InsertOrderedList\", false,\"newOL\");\n}\n\nfunction iOrderedList() {\n  richTextField.document.execCommand(\"InsertUnorderedList\", false,\"newUL\");\n}\n\nfunction iSuperScript() {\n  richTextField.document.execCommand(\"superscript\", false,null);\n}\n\nfunction iSubScript() {\n  richTextField.document.execCommand(\"subscript\", false,null);\n}\n\nfunction iLink() {\n  var linkURL = prompt(\"Enter the URL for this link:\", \"http://\");\n  richTextField.document.execCommand(\"CreateLink\", false, linkURL);\n}\n\nfunction iUnLink() {\n  richTextField.document.execCommand(\"Unlink\", false, null);\n}\n\nfunction iImage() {\n  var imgSrc = prompt('Enter image location', '');\n  if(imgSrc !== null){\n    richTextField.document.execCommand('insertimage', false, imgSrc);\n  }\n}\n\nfunction submit_form() {\n  var theForm = document.getElementById(\"myform\");\n  theForm.elements[\"myTextArea\"].value = window.frames['richTextField'].document.body.innerHTML;\n  theForm.onclick();\n}");
      }
      
      if ( $val === "" ) {
        // Already applied above
      } else {
        alertify.success("Enjoy the free demo :)");
      }
      
      resetInputs();
      $(".open-demos").trigger("click");
    });

    $(".adddemos-tablets a").on("click", function() {
      $("#search-demos").val( $(this).parent().prop("id") );
      $("#add-demo").trigger("click");
    });
    
    $("#search-select-libraries").on("change", function() {
      $("#search-libraries").val( $(this).val() );
    });
  });
  
  // Handles Character Generation
  $(function() {
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
  });
  
  $(window).on("beforeunload", function() {
    return "Are you sure you wish to leave? All your changes will be lost.";
  });
});
