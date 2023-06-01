<? 
setcookie( "firstdownload", '1', strtotime( '+365 days' ) );
$bodyClass='first';
include 'includes/header.php';
$image = $b->getImages(false, false, $_GET["id"]);
// $imagesRel= $b->getImages(explode(", ", $image->field_bi_producto_relacionado), explode(", ", $image->field_bi_zona_rel));

?>
<?include 'includes/footer.php' ?>

<script>
        var a = document.createElement('a');
        let url = "<?=$image->field_bi_imagen?>";
        <? if($_GET["size"] != '100'){?>
            url = "<?=$b->fixbiurl($_GET["size"], $image->field_bi_imagen,$image->field_bi_autor)?>";
        <? } ?>
        a.href = url;
        a.download = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
</script>

