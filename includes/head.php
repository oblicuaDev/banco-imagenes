<?php
include '../includes/config.php';
$urlGlobal = 'https://bogotadc.travel';
?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <base href="/banco-imagenes/" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#00857f" />
    <meta name="twitter:card" value="summary" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="title" />
    <meta property="og:url" content=" url" />
    <meta property="og:image" content=" img/" />
    <meta property="og:description" content="description" />
    <meta name="description" content="description" />
    <link rel="canonical" href="url" />
    <link rel="icon" href="favicon.png" type="image/png">
    <title>BogotaDC</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css"
    />
    <link rel="stylesheet" href="css/splide.min.css" />
    <link rel="stylesheet" href="css/splide-core.min.css" />
    <link rel="stylesheet" href="css/styles.css?v=<?=time();?>" />
  </head>
  <script>
        var actualLang = "<?= $_GET['lang'] ? $_GET['lang'] : 'es' ?>";
    </script>
  <body class="<?=$bodyClass?>" onload="load()">