$(function() {
    var url = "https://dl.dropboxusercontent.com/s/jpsxwvll7m5mepy/ID_list.json"
    // var url = "file:///C:/Users/5600/Desktop/RoMerryXmas-master/ID_list.json"

    var list = $.getJSON(url, function(d) {
                list = list.responseJSON;
            });

    $("#contactForm").submit( function(event){
            // get values from FORM
            var name = $("input#name").val();
            var error = true;
            
            if (name) 
            { 
                ID = list.ID.split("/");
                NUM = list.Number.split("/");

                for(var i in ID){
                    if (name == ID[i]) {

                        $("#contact").hide();
                        $(".intro-text").hide();
                        $(".img-responsive").animate
                        (
                            {height:"300px"},
                            5000,
                            function(){
                                alert("Your Gift Number is  "+ NUM[i]);
                            }
                        );
                        error = false;
                        break;
                    }
                }
                if (error){
                    alert("No this man, please try again");
                }
            } else {
                alert("Please key in your RO ID");
            }
            event.preventDefault();
    });
});
