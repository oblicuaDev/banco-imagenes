<?php 
    session_start();
    include "bogota.php";
    $lang = $_GET['lang'] ? $_GET['lang'] : 'es';
    $b = new bogota($lang); //Idiomas disponibles: es, en, pt
?>