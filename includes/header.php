<? include 'head.php'; ?>
<? if(isset($header2)){ ?>
    <header>
        <a href="/banco-imagenes/">
            <img src="img/logo_w0.svg" alt="logo" />
        </a>
        <form action="/<?=$lang?>/banco-imagenes/resultados/" id="searchHeaderForm">
        <div class="autocomplete">
            <span>
                <input type="search"   aria-label="search"
              name="search"
              id="search"
              placeholder="<?=$infoGnrl->field_bi_placesearch?>"/>
            </span>
</div>
        <button type="submit">
            <img src="img/lupa0.svg" alt="lupa" />
        </button>
        </form>
    </header>
<? }else{?>
    <header>
    <a href="/banco-imagenes/">
        <img src="img/logo.svg" alt="logo" />
</a>
    </header>
<? }?>