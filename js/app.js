$(function() {
    let view= $("#view")
    let result= $("#result")

    //To top
    $("#header").on("click", "h1", function() {
        document.location= "#header"
    })

    //Cookies
    if(localStorage.getItem("cookies") === null) {
        $("#cb").css("display", "flex").hide().fadeIn("flex")
    }

    $("#cb").on("click", "#cbgo", function() {
        $("#cb").css("display", "none")
        localStorage.setItem("cookies", "okay")
    })

    //Download procedure
    function saveAs(uri, filename) {
        let link = document.createElement('a')

        if (typeof link.download === 'string') {
            link.href = uri
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            window.open(uri)
        }
    }

    //Selected font
    let font= "'Poppins', sans-serif"
    let moretext= false
    let morephoto= false

    //Font 1
    view.on("click", "#f1", function() {
        $("#f1").css("text-decoration", "underline")
        $("#f2").css("text-decoration", "none")
        $("#f3").css("text-decoration", "none")
        font= "'Poppins', sans-serif"
    })

    //Font 2
    view.on("click", "#f2", function() {
        $("#f2").css("text-decoration", "underline")
        $("#f1").css("text-decoration", "none")
        $("#f3").css("text-decoration", "none")
        font= "'Playfair Display', serif"
    })

    //Font 3
    view.on("click", "#f3", function() {
        $("#f3").css("text-decoration", "underline")
        $("#f1").css("text-decoration", "none")
        $("#f2").css("text-decoration", "none")
        font= "'Pacifico', cursive"
    })

    //Font size
    view.on("input", "#fontsize", function() {
        $("#fslabel").html($("#fontsize").val() + "px")
    })

    //More text
    view.on("click", "#moretext", function() {
        view.append('<div class="menusec" id="text2ta"><h2 id="text2h2">Text 2</h2><textarea id="ta2" placeholder="Type here..." style="background: none; border: none; width: 100%; font-size: 24px; color: inherit; height: 90px;"></textarea><button id="lesstext">REMOVE</button></div>').delay(50).fadeIn()
        $("#moretext").delay(50).fadeOut()
        moretext= true
    })

    //Less text
    view.on("click", "#lesstext", function() {
        $("#text2h2").delay(50).fadeOut().remove()
        $("#text2ta").delay(50).fadeOut().remove()
        $("#moretext").delay(50).fadeIn()
        moretext= false
    })

    //Photo upload
    view.on("change", "#photoupload", function() {
        if(this.files && "#photoupload") {
            $("#photo").attr("src", URL.createObjectURL(this.files[0])).delay(50).fadeIn()
        }

        if($("#photo").attr("src") !== "") {
            $("#remimg").delay(50).fadeIn()
            $("#moreimg").delay(50).fadeIn()
        }
    })

    //More photo
    view.on("click", "#moreimg", function() {
        view.append('<div class="menusec" id="photo2up"><h2 id="photo2h2">Photo 2</h2><input id="photoupload2" type="file"><div style="margin: 20px;"><img id="photo2" src="" alt="Your image" style="height: 175px; width: auto; display: none;"></div><button id="remimg2" style="display: none; margin-right: 10px;">REMOVE PHOTO</button><button id="lessphoto">REMOVE</button></div>')
        $("#moreimg").delay(50).fadeOut()
        morephoto= true
    })

    //Photo upload 2
    view.on("change", "#photoupload2", function() {
        if(this.files && "#photoupload2") {
            $("#photo2").attr("src", URL.createObjectURL(this.files[0])).delay(50).fadeIn()
        }

        if($("#photo2").attr("src") !== "") {
            $("#remimg2").delay(50).fadeIn()
        }
    })

    //Less photo
    view.on("click", "#lessphoto", function() {
        $("#photo2h2").delay(50).fadeOut().remove()
        $("#photo2up").delay(50).fadeOut().remove()
        $("#morephoto").delay(50).fadeIn()
        morephoto= false
    })

    //Photo resize 1
    result.on("click", "#resp1", function() {
        if($("#result #resp1").css("height") === "175px") {
            $("#result #resp1").css("height", "250px")
        } else {
            $("#result #resp1").css("height", "175px")
        }
    })

    //Photo resize 2
    result.on("click", "#resp2", function() {
        if($("#result #resp2").css("height") === "175px") {
            $("#result #resp2").css("height", "250px")
        } else {
            $("#result #resp2").css("height", "175px")
        }
    })

    //Download
    $(document).on("click", "#download", function() {
        $("#download").effect("bounce", "slow")
        html2canvas(document.querySelector('#result'), {
            allowTaint: true,
            logging: true
        }).then(function(canvas) {
            saveAs(canvas.toDataURL(), 'mioCanvas.png')
        })
    })

    //Tab 1
    $("#navbar").on("click", "#tabIndicator1", function() {
        if($("#tabIndicator1").css("border-bottom") !== "3px #f39c12 solid") {
            $("#tabIndicator1").css("border-bottom", "3px #f39c12 solid")
            $("#tabIndicator2").css("border-bottom", "none")
            $("#resultpage").delay(50).fadeOut()
            view.delay(50).fadeIn()
            $("header").delay(50).fadeIn()
        }
    })

    //Tab 2
    $("#navbar").on("click", "#tabIndicator2", function() {
        if($("#tabIndicator2").css("border-bottom") !== "3px #f39c12 solid") {
            $("#tabIndicator2").css("border-bottom", "3px #f39c12 solid")
            $("#tabIndicator1").css("border-bottom", "none")
            view.delay(50).fadeOut()
            $("#resultpage").delay(50).css("display", "flex").hide().fadeIn("flex")

            result.css("background-color", $("#bg").val())
            result.css("color", $("#text").val())
            result.css("font-family", font)
            
            if($("#photo").attr("src") !== "") {
                result.html("<img id='resp1' alt='Image 1' src='" + $("#photo").attr("src") + "' style='z-index: 100; height: 150px; width: auto; cursor: move;'>")
                result.append("<br><span style='z-index: 101; font-size:" + $("#fontsize").val() + "px; font-weight: 400; cursor: move;'>" + $("#ta").val().split("\n").join("<br>") + "</span>")
                
                $("#result #resp1").draggable({
                    containment: "#result",
                    grid: [20, 20]
                }) 
            } else {
                result.html("<span style='z-index: 101; font-size:" + $("#fontsize").val() + "px; font-weight: 400; cursor: move;'>" + $("#ta").val().split("\n").join("<br>") + "</span>")
            }

            if(moretext) {
                result.append("<br><span id='span2' style='z-index: 101; font-size:" + $("#fontsize").val() + "px; font-weight: 400; cursor: move;'>" + $("#ta2").val().split("\n").join("<br>") + "</span>")
                $("#result #span2").draggable({
                    containment: "#result",
                    grid: [20, 20]
                })
            }

            if(morephoto) {
                result.append("<img id='resp2' alt='Image 2' src='" + $("#photo2").attr("src") + "' style='z-index: 100; height: 150px; width: auto; cursor: move;'>")
                $("#result #resp2").draggable({
                    containment: "#result",
                    grid: [20, 20]
                })
            }
            
            $("#result span").draggable({
                containment: "#result",
                grid: [20, 20]
            })
        }
    })

    //Show hidden footer
    $(document).on("click", "#footerbtn", function() {
        $( "#dialog" ).dialog({
			autoOpen: false,
			show: {
			  effect: "blind",
			  duration: 1000
			},
			hide: {
			  effect: "explode",
			  duration: 1000
			}
		})

		$( "#dialog" ).dialog( "open" );
    })

    //Remove photo
    view.on("click", "#remimg", function() {
        if($("#photo").attr("src") !== "") {
            $("#photo").attr("src", "").delay(50).fadeOut()
            $("#remimg").delay(50).fadeOut()
        } else {
            alert("No Photo!")
        }
    })

    //Remove photo 2
    view.on("click", "#remimg2", function() {
        if($("#photo2").attr("src") !== "") {
            $("#photo2").attr("src", "").delay(50).fadeOut()
            $("#remimg2").delay(50).fadeOut()
        } else {
            alert("No Photo!")
        }
    })

    //Service worker HTML2Canvas
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('html2canvas.min.js').then(function(registration) {
                //Registration was successful
            }, function(err) {
                //Registration failed :(
            });
        });
    }

    //Service worker jQuery
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('jquery.min.js').then(function(registration) {
                //Registration was successful
            }, function(err) {
                //Registration failed :(
            });
        });
    }

    // --- Cache ---
    let MAIN_CACHE = 'aesgen-cache-v1';
    let urlsToCache = [
        '/',
        '/index.html',
        '/style.css',
        '/js/app.js',
        '/js/jquery.min.js',
        '/js/jquery-ui.min.js',
        '/js/touch-punch.min.js',
        '/js/html2canvas.min.js',
        '/icons'
    ];

    self.addEventListener('install', function(event) {
        // Perform install steps
        event.waitUntil(
            caches.open(MAIN_CACHE)
                .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
        );
    });
    // --- End Cache ---
})