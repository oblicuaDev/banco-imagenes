<?php 
    include '../../includes/config.php';
    $array = array();
    //Client Message
    extract($_POST);
    $to = $email;
    $urlImage = "https://www.bogotadc.travel/banco-imagenes/descarga-".$imageID."?size=".$size;
    $params = "{\"BILINK\":\"$urlImage\"}";
    $emailSended = $b->setFirstImage($to, $params, $urlImage);
    $array['emailSended'] = $emailSended;
    $array['message'] = 1;
    echo json_encode($array);
?>