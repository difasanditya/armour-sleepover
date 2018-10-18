var bli = {
    lat: -6.5856908,
    lng: 106.8826447
};
var map, name, classname, email, luckynumber;

$(document).ready(function () {
    $("#main").onepage_scroll({
        afterMove: function(index) {
            if(index == 5 && $('#register>#slider').slick('slickCurrentSlide') == 0) $("#name").focus();
            if(index == 5 && $('#register>#slider').slick('slickCurrentSlide') == 2) $("#num-1").focus();
        },
        beforeMove: function (index) {
            $("input").blur();
            $('button').blur();
            if (index == 1) {
                $("#navbar").removeClass("not-home");
            } else {
                $("#navbar").addClass("not-home");
                $("#navbar>ul>li").removeClass("active");
                $("#navbar>ul>li:nth-child(" + index + ")").addClass("active");
            }
        },
        sectionContainer: "section",
        updateURL: true,
        keyboard: false,
        loop: false,
        pagination: false
    });
    // Slider Registration
    $("#register>#slider").slick({
        accessibility: false,
        arrows: false,
        draggable: false,
        infinite: false,
        swipe: false,
        touchMove: false,
        waitForAnimate: false
    });
    $("#register>#slider").on("beforeChange", function(){
        $('button').blur();
    });
    $("#register>#slider").on("afterChange", function(event, slick, currentSlide){
        if(currentSlide == 2) $('#num-1').focus();
    });
    // Slide Down Home
    $("#move-down").click(function () {
        $("#main").moveDown();
    });
    // Form Button
    $(".next").click(function () {
        $("#register>#slider").slick("slickNext");
    });
    $("#form").submit(function (e) {
        e.preventDefault();
        name = $("#name").val();
        if(name == "") {
            $("#error-register").html("nama masih kosong!");
            return;
        }
        classname = $("#select").val();
        if(classname == "") {
            $("#error-register").html("kelas masih kosong!");
            return;
        }
        email = $("#email").val();
        if(email == "") {
            $("#error-register").html("email masih kosong!");
            return;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            $("#error-register").html("email tidak valid!");
            return;
        }
        $("#error-register").html("");
        var data = {
            "email": email
        };
        data = $(this).serialize() + "&" + $.param(data); 
        $.ajax({
            url: 'db/check-exist.php',
            type: 'POST',
            dataType: "json",
            data: data,
            success: function(data){
                if(parseInt(data) == 0){
                    $("#register>#slider").slick("slickGoTo", 1, false);
                }
                else{
                    $("#error-register").html("email sudah terdaftar!");
                }
            }
        });
    });
    $('#num-1').on('input', function() { 
        if($(this).val().length != 0) $('#num-2').focus();
    });
    $('#num-2').on('input', function() { 
        if($(this).val().length != 0) $('#num-3').focus();
    });
    $('#num-3').on('input', function() { 
        if($(this).val().length != 0) $('#submit').focus();
    });
    $("#random").click(function () {
        var rand = Math.floor(Math.random() * 999) + 1;
        var strRand = rand.toString();
        $("#num-1").val(rand < 100 ? "0" : strRand.charAt(0));
        $("#num-2").val(rand < 10 ? "0" : (rand < 100 ? strRand.charAt(0) : strRand.charAt(1)));
        $("#num-3").val(rand < 10 ? strRand : (rand < 100 ? strRand.charAt(1) : strRand.charAt(2)));
    });
    $("#submit").click(function () {
        $("#submit").blur();
        var num1 = $("#num-1").val();
        var num2 = $("#num-2").val();
        var num3 = $("#num-3").val();
        if(num1 == "" || num2 == "" || num3 == ""){
            $("#error-lucky").html("tidak boleh kosong!");
            return;
        }
        luckynumber = parseInt(num1 + num2 + num3);
        if(!Number.isInteger(luckynumber)){
            $("#error-lucky").html("harus angka 1-999!");
            return;
        }
        if(luckynumber < 1){
            $("#error-lucky").html("minimal angka 1!");
            return;
        }
        if(luckynumber > 999){
            $("#error-lucky").html("maksimal angka 999!");
            return;
        }
        $("#error-lucky").html("");
        $("#register>#slider").slick("slickGoTo", 3, false);
        var data = {
            "name": name,
            "class": classname,
            "email": email,
            "luckynumber": luckynumber
        };
        data = $(this).serialize() + "&" + $.param(data); 
        $.ajax({
            url: 'db/submit.php',
            type: 'POST',
            dataType: "json",
            data: data,
            success: function(data){
                if(parseInt(data) == -1){
                    $("#error-lucky").html("terjadi kesalahan!");
                }
                else{
                    $("#thanks").html("terima kasih, " + name + "!");
                    $("#register>#slider").slick("slickGoTo", 4, false);
                }
            }
        });
    });
    // Nav Button
    $("#venue-button").click(function () {
        $("#venue-button").blur();
        $("#main").moveTo(2);
        $("#menu-check").prop("checked", false);
    });
    $("#dresscode-button").click(function () {
        $("#dresscode-button").blur();
        $("#main").moveTo(3);
        $("#menu-check").prop("checked", false);
    });
    $("#rundown-button").click(function () {
        $("#rundown-button").blur();
        $("#main").moveTo(4);
        $("#menu-check").prop("checked", false);
    });
    $("#registration-button").click(function () {
        $("#registration-button").blur();
        $("#main").moveTo(5);
        $("#menu-check").prop("checked", false);
    });
    $("#contact-button").click(function () {
        $("#contact-button").blur();
        $("#main").moveTo(6);
        $("#menu-check").prop("checked", false);
    });
    $("#caption").click(function(){
        map.setCenter(bli);
    })
});
// Map
function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 17,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            center: bli,
            styles: [{
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#3e606f"
                        },
                        {
                            "weight": 2
                        },
                        {
                            "gamma": 0.84
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                            "weight": 0.6
                        },
                        {
                            "color": "#1a3541"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#222f3e"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#406d80"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2c5a71"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#29768a"
                        },
                        {
                            "lightness": -37
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#406d80"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#193341"
                    }]
                }
            ]
        });
    var marker = new google.maps.Marker({
        position: bli,
        map: map,
        title: "BCA Learning Institute",
        // icon: "assets/img/wolf-only-icon.png"
    });
}