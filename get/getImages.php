<?php 

    include '../../includes/config.php';
    $images = $b->get_allImages();
    echo json_encode($images);
?>