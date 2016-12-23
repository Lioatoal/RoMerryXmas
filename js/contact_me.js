$(function() {
    var url = "https://dl.dropboxusercontent.com/s/jpsxwvll7m5mepy/ID_list.json"
    // var url = "file:///C:/Users/5600/Desktop/RoMerryXmas-master/ID_list.json"

    var ID_list = $.getJSON(url, function(d) {
                ID_list = ID_list.responseJSON;
            });

    $("#contactForm").submit( function(event){
            // get values from FORM
            var name = $("input#name").val();
            
            if (name == ID_list.ID) 
            { 
                $("#contact").hide();
                $(".intro-text").hide();
                // $(".col-lg-12").animate({height:"500px"});
                $(".img-responsive").animate
                (
                    {height:"300px"},
                    5000,
                    function(){
                        alert("Your number is"+ 15);
                    }
                );

            } else {
                alert("no this man");
            }
            event.preventDefault();
    });
});
