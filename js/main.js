document.addEventListener("DOMContentLoaded", () => {
  console.log("AOS-INIT");
  $("#preloader").fadeOut("slow");
  getAllCategoriesWithImages();
});
function animate(obj, initVal, lastVal, duration) {
  let startTime = null;

  //get the current timestamp and assign it to the currentTime variable
  let currentTime = Date.now();

  //pass the current timestamp to the step function
  const step = (currentTime) => {
    //if the start time is null, assign the current time to startTime
    if (!startTime) {
      startTime = currentTime;
    }

    //calculate the value to be used in calculating the number to be displayed
    const progress = Math.min((currentTime - startTime) / duration, 1);

    //calculate what to be displayed using the value gotten above
    obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

    //checking to make sure the counter does not exceed the last value (lastVal)
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };

  //start animating
  window.requestAnimationFrame(step);
}
// LAZY LOADING IMAGES
function lazyImages() {
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img.lazyload");
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Importamos dinámicamente la libreria `lazysizes`
    let script = document.createElement("script");
    script.async = true;
    script.src = "js/lazysizes.min.js";
    document.body.appendChild(script);
  }
}

let text1 = document.getElementById("0101");
let text2 = document.getElementById("0102");
let text3 = document.getElementById("0103");

const getFiltersBancoImagenes = () => {
  const urls = [
    "/" + actualLang + "/g/zonas/",
    "/" + actualLang + "/g/products/",
  ];
  const allRequests = urls.map(async (url) => {
    let response = await fetch(url);
    return response.json();
  });
  return Promise.all(allRequests);
};
if (document.querySelector("body.search")) {
  getFiltersBancoImagenes().then((arrayOfResponses) => {
    // Zonas
    const zones = arrayOfResponses[0];
    // Productos
    const products = arrayOfResponses[1];
    document.querySelector(".filters_zone").innerHTML = "";
    document.querySelector(".filters_products").innerHTML = "";
    zones.forEach((tag) => {
      var tagTemplate;
      if (window.innerWidth > 1023) {
        tagTemplate = `<li><input type="checkbox" name="${tag.nid}" id="${tag.nid}" hidden onchange="addFilter()"><label for="${tag.nid}">${tag.title}</label></li>`;
      } else {
        tagTemplate = `<li><input type="checkbox" name="${tag.nid}" id="${tag.nid}" hidden><label for="${tag.nid}">${tag.title}</label></li>`;
      }
      document.querySelector(".filters_zone").innerHTML += tagTemplate;
    });
    products.forEach((tag) => {
      var tagTemplate;
      if (window.innerWidth > 1023) {
        tagTemplate = `<li><input type="checkbox" name="${tag.nid}" id="${tag.nid}" hidden onchange="addFilter()"><label for="${tag.nid}">${tag.title}</label></li>`;
      } else {
        tagTemplate = `<li><input type="checkbox" name="${tag.nid}" id="${tag.nid}" hidden><label for="${tag.nid}">${tag.title}</label></li>`;
      }
      document.querySelector(".filters_products").innerHTML += tagTemplate;
    });
  });
}
function findAtractivosRel() {
  // Create URL to FETCH
  var url = "/" + actualLang + "/g/filterPortal/?filter=1";
  if (para) url += "&para=" + para.toString();
  if (subproduct) url += "&subproduct=" + subproduct.toString();
  if (zone) url += "&zone=" + zone.toString();
  if (closeto) url += "&closeto=" + closeto;
  if (page) url += "&page=" + page;
  if (q) url += "&q=" + q;

  // Fetch final URL
  fetch(url)
    .then((response) => response.json())
    .then((places) => {
      console.log(places);
    });
}
// ARRAY FILTERS
var filters_zone = [];
var filters_products = [];
var firstTime = 0;
function addFilter() {
  document
    .querySelectorAll(".filters ul.filters_products li input:checked")
    .forEach((element) => {
      filters_products.push(element.id);
    });
  document
    .querySelectorAll(".filters ul.filters_zone li input:checked")
    .forEach((element) => {
      filters_zone.push(element.id);
    });
  filterPortal(filters_products, filters_zone);
}

var containerGrid = document.querySelector(".grid-imagenes");
function filterPortal(product, zone, page = 0, q = 16) {
  $(".portal_list .right").toggleClass("loading");
  // Clean Container places
  containerGrid.innerHTML = "";
  // Create URL to FETCH
  var url = "get/filterPortal.php?filter=1";
  if (product) url += "&product=" + product.toString();
  if (zone) url += "&zone=" + zone.toString();
  if (page) url += "&page=" + page;
  if (q) url += "&q=" + q;

  // Fetch final URL
  fetch(url)
    .then((response) => response.json())
    .then((images) => {
      if (images.length > 0) {
        for (let index = 0; index < images.length; index++) {
          const image = images[index];
          let url_explode = image.field_bi_imagen.split("/upload/");
          url_explode = `${url_explode[0]}/upload/w_640/${url_explode[1]}`;
          var template = `<li data-image="${image.field_bi_imagen}">
          <a href="interna-${image.nid}"
            ><img
              src="${url_explode}"
              alt="${image.title}"
            />
            <div class="info">
              <div class="green-btn">Ver imagen</div>
              <small>1920 X 1080</small>
            </div></a
          >
        </li>`;
          containerGrid.innerHTML += template;
        }
      } else {
        let messages = {
          es: `<p class="noResults">No se encontraron resultados para tu búsqueda.</p>`,
          en: `<p class="noResults">No results for your search.</p>`,
          pt: `<p class="noResults">Nenhum resultado para a sua pesquisa.</p>`,
        };
        let restart = {
          es: `<p class="noResults">No se encontraron resultados para tu búsqueda.<a href="javascript:backFilters();">Reiniciar</a></p>`,
          en: `<p class="noResults">There are no results for your search.<a href="javascript:backFilters();">Restart</a></p>`,
          pt: `<p class="noResults">Não há resultados para a sua pesquisa.<a href="javascript:backFilters();">Reiniciar</a></p>`,
        };
        if (firstTime === 0) {
          containerGrid.innerHTML = messages[actualLang];
        } else {
          containerGrid.innerHTML = restart[actualLang];
          firstTime === 1;
        }
      }
    })
    .then(function () {
      printFiles();
      lazyImages();
      $(".portal_list .right").toggleClass("loading");
      if (document.querySelector(".portal .moreItems")) {
        var offsetTopBtn = document.querySelector(
          ".portal_list .right button.moreItems"
        ).offsetTop;
        $(".portal .moreItems").on("click", function (e) {
          e.preventDefault();
          $(".grid-atractivos-item:hidden").slice(0, 16).slideDown();
          if ($(".grid-atractivos-item:hidden").length == 0) {
            $(".portal .moreItems").fadeOut("slow");
          }
          document.querySelector("html, body").scrollTop = offsetTopBtn;
          offsetTopBtn = document.querySelector(
            ".portal_list .right button.moreItems"
          ).offsetTop;
        });
      }
      $(".wait").click(function () {
        $("#preloader").fadeIn();
      });
      if (!data_product) {
        document
          .querySelectorAll("ul.filters_especificos li")
          .forEach((input) => {
            input.style.display = "none";
          });
        listOfSubs.forEach((listEl) => {
          document.querySelector(
            "ul.filters_especificos li input[id='" + listEl + "']"
          ).parentElement.style.display = "block";
        });
      }
      if (listOfSubs.length == 0) {
        document.querySelector("ul.filters_especificos").style.display = "none";
        document.querySelector(
          "ul.filters_especificos"
        ).previousSibling.style.display = "none";
      }
      document.querySelectorAll("ul.filters_zonas li").forEach((input) => {
        input.style.display = "none";
      });
      if (listOfZones) {
        listOfZones.forEach((listEl) => {
          document.querySelector(
            "ul.filters_zonas li input[id='" + listEl + "']"
          ).parentElement.style.display = "block";
        });
      }
      if (listOfZones.length == 0) {
        document.querySelector("ul.filters_zonas").style.display = "none";
        document.querySelector(
          "ul.filters_zonas"
        ).previousSibling.style.display = "none";
      }
    });
}

$("#firstdown").validate({
  ignore: "",
  rules: {
    name: "required",
    lastname: "required",
    cc: "required",
    email: "required",
    politics: "required",
  },
  messages: {
    emailSub: "Campo obligatorio",
    politics: "Debe aceptar las políticas",
    name: "Campo obligatorio",
    lastname: "Campo obligatorio",
    cc: "Campo obligatorio",
    email: "Campo obligatorio",
  },
  submitHandler: function (form) {
    $("#firstdown button").attr("disabled", true);
    $("#firstdown button").text("Enviando");
    $("#firstdown").ajaxSubmit({
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data.message == 1) {
          Fancybox.close();
          $("#firstdown button").text("enviado");
          document.querySelector(
            "a#linkdown"
          ).href = `https://www.bogotadc.travel/banco-imagenes/descarga-${
            document.querySelector("#imageID").value
          }?size=${
            document.querySelector("#size")
              ? document.querySelector("#size").value
              : ""
          }`;
          Fancybox.show([{ src: "#dialog-content-2", type: "inline" }]);
          form.reset();
          setCookie("firstdownload", "1", 365);
        } else {
          $("#firstdown button").text("Reintentar");
        }
        $("#firstdown button").attr("disabled", false);
      },
    });
  },
});

async function getAllCategoriesWithImages() {
  if (document.querySelector(".grid-layout")) {
    document.querySelector(".grid-layout").classList.add("loading");
    const categoriesIds = await fetch("get/getImages.php")
      .then((response) => response.json())
      .then((images) => {
        var categories = images
          .map((image) => {
            if (typeof image.field_bi_producto_relacionado == "string") {
              return image.field_bi_producto_relacionado.split(", ");
            } else {
              return image.field_bi_producto_relacionado.map(mapper);
            }
          })
          .flat();
        let x = (names) => names.filter((v, i) => names.indexOf(v) === i);
        categories = x(categories).filter(Boolean);
        return categories;
      });
    let urls = [];
    categoriesIds.forEach((id) => {
      urls.push(`get/getCategories.php?id=${id}`);
    });
    const fetchCategoriesData = () => {
      const allRequests = urls.map(async (url) => {
        let catResponse = await fetch(url);
        return catResponse.json();
      });
      return Promise.all(allRequests);
    };
    fetchCategoriesData().then((arrayOfResponses) => {
      let allCategories = arrayOfResponses.flat();
      let template = `<div class="row-1">
      <a class="size1" href="resultados/?productid=${allCategories[0].nid}"
        ><strong class="uppercase">${allCategories[0].title}</strong
        ><img
          src="${allCategories[0].field_cover_image}"
          alt=""
      /></a>
      <a class="size2" href="resultados/?productid=${allCategories[1].nid}"
        ><strong class="uppercase">${allCategories[1].title}</strong
        ><img
          src="${allCategories[1].field_cover_image}"
          alt=""
      /></a>
      <a class="size1" href="resultados/?productid=${allCategories[2].nid}"
        ><strong class="uppercase">${allCategories[2].title}</strong
        ><img
          src="${allCategories[2].field_cover_image}"
          alt=""
      /></a>
    </div>
    <div class="row-2">
      <div class="col-1">
        <div class="col-1__row-1">
          <a class="size3" href="resultados/?productid=${allCategories[3].nid}"
            ><strong class="uppercase">${allCategories[3].title}</strong
            ><img
              src="${allCategories[3].field_cover_image}"
              alt=""
          /></a>
          <a class="size4" href="resultados/?productid=${allCategories[4].nid}"
            ><strong class="uppercase">${allCategories[4].title}</strong
            ><img
              src="${allCategories[4].field_cover_image}"
              alt=""
          /></a>
          <a class="size4" href="resultados/?productid=${allCategories[6].nid}"
            ><strong class="uppercase">${allCategories[6].title}</strong
            ><img
              src="${allCategories[6].field_cover_image}"
              alt=""
          /></a>
        </div>
        <div class="col-1__row-2">
          <a href="resultados/?productid=${allCategories[7].nid}"
            ><strong class="uppercase">${allCategories[7].title}</strong
            ><img
              src="${allCategories[7].field_cover_image}"
              alt=""
          /></a>
          <a href="resultados/?productid=${allCategories[8].nid}"
            ><strong class="uppercase">${allCategories[8].title}</strong
            ><img
              src="${allCategories[8].field_cover_image}"
              alt=""
          /></a>
        </div>
      </div>
      <div class="col-2">
        <a class="size5" href="resultados/?productid=${allCategories[9].nid}"
          ><strong class="uppercase">${allCategories[9].title}</strong
          ><img
            src="${allCategories[9].field_cover_image}"
            alt=""
        /></a>
        <a class="size5" href="resultados/?productid=${allCategories[11].nid}"
          ><strong class="uppercase">${allCategories[11].title}</strong
          ><img
            src="${allCategories[11].field_cover_image}"
            alt=""
        /></a>
      </div>
    </div>`;
      document.querySelector(".grid-layout").classList.remove("loading");
      document.querySelector(".grid-layout").innerHTML = template;
    });
  }
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(a);
    var reg = new RegExp(val.toLowerCase());
    return arr.filter(function (term) {
      if (term.toLowerCase().match(reg)) {
        b = document.createElement("DIV");

        b.innerHTML = "<strong>" + term + "</strong>";
        b.innerHTML += "<input type='hidden' value='" + term + "'>";

        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          if (document.querySelector("#searchHeaderForm")) {
            document.querySelector("#searchHeaderForm").submit();
          } else {
            document.querySelector("#searchForm").submit();
          }
          closeAllLists();
        });
        a.appendChild(b);
        return term;
      }
    });
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;

      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;

      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

fetch("search.json")
  .then((res) => res.json())
  .then((data) => {
    let x = (names) => names.filter((v, i) => names.indexOf(v) === i);
    words = x(data).filter(Boolean);
    autocomplete(document.getElementById("search"), words);
  });
