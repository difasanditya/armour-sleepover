var handlerSlot = [];
var luckynumbers = [];
var allNumbers = [];

$(document).ready(function () {
    $(".button-container").fadeOut(0);
    $(".request-button").fadeOut(0);
    // Slider
    $("#slider").slick({
        accessibility: false,
        arrows: false,
        draggable: false,
        infinite: false,
        swipe: false,
        waitForAnimate: false
    });
    // Before Slide
    $("#slider").on("beforeChange", function(){
        $("input").blur();
        $('button').blur();
    });
    // Form
    $("#form").submit(function (e) {
        e.preventDefault();
        var classname1 = $("#classname1").val();
        if (classname1 == "") {
            $("#error").html("kelas pertama masih kosong!");
            return;
        }
        var classname2 = $("#classname2").val();
        if (classname2 == "") {
            $("#error").html("kelas kedua masih kosong!");
            return;
        }
        $("#error").html("");
        var classname3 = $("#classname3").val();
        var data;
        if (classname3 == "") {
            data = {
                "classname1": classname1,
                "classname2": classname2
            };
        }
        else{
            data = {
                "classname1": classname1,
                "classname2": classname2,
                "classname3": classname3
            };
        }
        $("#slider").slick("slickGoTo", 1, false);
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            url: "db/generate-winner.php",
            type: "POST",
            dataType: "json",
            data: data,
            success: function (data) {
                $("#slider").slick("slickGoTo", 2, false);
                luckynumbers = data;
                // alert(luckynumbers.length);
                for (let i = 0; i < luckynumbers.length; i++) {
                    if(!allNumbers.includes(luckynumbers[i])) allNumbers.push(luckynumbers[i]);
                }
            }
        });
    });
    // Shuffle
    $("#shuffle").click(function(){
        $("#shuffle").fadeOut(500, function () {
            $(".button-container").fadeIn(500);
        });
        for (let i = 1; i <= 3; i++) {
            var handler = [];
            for (let j = 1; j <= 3; j++) {
                handler.push(setInterval(function(){
                    $("#slot-" + i + "-num-" + j).val(Math.floor(Math.random() * 10));
                }, 100));
            }
            handlerSlot.push(handler);
        }
    });
    // Show
    $("#show-slot-1, #show-slot-2, #show-slot-3").click(function(){
        var idx = parseInt($(this).attr('id').charAt($(this).attr('id').length - 1)) - 1;
        var luckynumber = luckynumbers[idx].toString();
        clearInterval(handlerSlot[idx][0]);
        setTimeout(function(){
            $("#slot-" + (idx + 1) + "-num-1").val(luckynumbers[idx] < 100 ? 0 : luckynumber.charAt(0)).addClass("freeze");
        }, 100);
        setTimeout(function(){
            clearInterval(handlerSlot[idx][1]);
            setTimeout(function(){
                $("#slot-" + (idx + 1) + "-num-2").val(luckynumbers[idx] < 10 ? 0 : (luckynumbers[idx] < 100 ? luckynumber.charAt(0) : luckynumber.charAt(1))).addClass("freeze");
            }, 100);
            setTimeout(function(){
                clearInterval(handlerSlot[idx][2]);
                setTimeout(function(){
                    $("#slot-" + (idx + 1) + "-num-3").val(luckynumbers[idx] < 10 ? luckynumbers[idx] : (luckynumbers[idx] < 100 ? luckynumber.charAt(1) : luckynumber.charAt(2))).addClass("freeze");
                    $("#show-slot-" + (idx + 1)).fadeOut(500, function () {
                        $("#request-new-" + (idx + 1)).fadeIn(500);
                    });
                }, 100);
            }, 2000);
        }, 2000);
    });
    $("#request-new-1, #request-new-2, #request-new-3").click(function(){
        var idx = parseInt($(this).attr('id').charAt($(this).attr('id').length - 1)) - 1;
        var data = {
            "limit": allNumbers.length,
            "classname1": $("#classname1").val(),
            "classname2": $("#classname2").val(),
            "classname3": $("#classname3").val()
        };
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            url: "db/generate-another-winner.php",
            type: "POST",
            dataType: "json",
            data: data,
            success: function (data) {
                luckynumbers[idx] = data;
                allNumbers.push(data);
                $(".slot-number-" + (idx + 1)).removeClass("freeze");
                var handler = [];
                for (let j = 1; j <= 3; j++) {
                    handler.push(setInterval(function(){
                        $("#slot-" + (idx + 1) + "-num-" + j).val(Math.floor(Math.random() * 10));
                    }, 100));
                }
                handlerSlot[idx] = handler;
                $("#request-new-" + (idx + 1)).fadeOut(500, function () {
                    $("#show-slot-" + (idx + 1)).fadeIn(500);
                });
            }
        });
    });
});