<?php
  $filename = $_GET["filename"];
  @ $fp = fopen("exports/".$filename, "wb");
  if (!$fp) {
    echo "Sorry: kodeWeave Touch could not generate your weave :(";
    exit;
  } else {
    $outputstring = $_GET["outputstring"];
    fwrite($fp, $outputstring);
    echo "Your weave is now available at <a href='exports/" .$filename, "'>" .$filename, "</a>";
  }
?>
