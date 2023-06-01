<?php 
    include '../../includes/config.php';
    $images = $b->getImages(
        $_GET['product'] ? explode(',',$_GET['product']) : false,
        $_GET['zone'] ? explode(',',$_GET['zone']) : false
    );
    echo json_encode($images);
?>