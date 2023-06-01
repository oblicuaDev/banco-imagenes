<?php 
     include '../../includes/config.php';
     $product = $b->get_products_byID($_GET['id']);
     echo json_encode($product);
?>