$(function() {
    $("#contactForm").submit( function(event){
            // get values from FORM
            var name = $("input#name").val();

            if (name == "roy") 
            { 
                alert("hello word"); 
                $("#contact").hide();
            } else {
                alert("no this man");
            }
            event.preventDefault();
    });
});
