$(function() {

    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
    apiKey: "AIzaSyDX_odS3VoMa7BScfBoUBgPnK2e11xefXU",
    authDomain: "test-4dc42.firebaseapp.com",
    databaseURL: "https://test-4dc42.firebaseio.com",
    storageBucket: "test-4dc42.appspot.com",
    messagingSenderId: "117864251524"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var initStatus, maxNum, registerNum = 0;
    var giftList = {};

    database.ref('initStatus').on('value', function(snapshot){
        initStatus = snapshot.val();
        if(initStatus){
            database.ref('giftContor/maxNum').on('value', function(snapshot){
                maxNum = snapshot.val();
                if (registerNum == maxNum){
                    getFull(2);
                }
            });

            database.ref('giftList/').on('value', function(snapshot){
                giftList = snapshot.val();
                registerNum = Object.values(giftList).length;
                if (registerNum == maxNum){
                    getFull(2);
                } else {
                    getFull(0);
                }
            });
        } else {
            errorMsg(0);
            getFull(1);
            return;
        }
    });

    $("#init_default").click(function(){
        Init();
    })

    $("#contactForm").submit( function(event){

        //database.ref('giftList/'.)

        // get values from FORM
        var name = $("input#name").val();

        for (var i in giftList){
            if (name == giftList[i].Name) {
                errorMsg(2);
                event.preventDefault();
                return;
            }
        }

        if (post('giftList', name, 0, false)){
            alert("Thanks for register");
        } else {
            errorMsg(3);
        }
        
        // database.ref('ID/'+ name).once('value').then(function(snapshot){
        //     if (!snapshot.val()){
        //         errorMsg();
        //         return;
        //     }
            
        //     getRandom(Num);

        //     $("#contact").hide();
        //     $(".intro-text").hide();
        //     $(".img-responsive").animate
        //     (
        //         {height:"300px"},
        //         5000,
        //         function(){
        //             alert("Your Gift Number is  "+ snapshot.val().Num);
        //         }
        //     );                
        // });
        
        event.preventDefault();
    });

    $("#dice_play").click(function(){
        alert("pending");
    });

    //TODO: Init 
    function Init(){
        var full = {"maxNum":4};
        post('giftList', 'Royalor', 0, false);
        add('giftContor',full);
        set('initStatus', true);
    }

    //TODO: Add & Set & Post api
    function set(url, obj){
        database.ref(url).set(obj);
    }
    function add(topic, obj) {
        database.ref(topic+'/').update(obj);
    }             

    function post(topic, name, num, status){
        var postDate = {
            Name: name,
            RESULT: num,
            STATUS: status
        };
        var newPostKey = database.ref().child(topic).push().key;
        var update = {};
        update[newPostKey] = postDate;
        return database.ref(topic+'/').update(update);
    }

    function errorMsg(msg){
        switch(msg){
            case 0:
                alert("System Not Open");
                break;
            case 1:
                alert("No this man, please try again");
                break;
            case 2:
                alert("You have been registered");
                break;
            case 3:
                alert("System error");
                break;
        }
       
    }

    function getRandom(Num){
        Num = Math.floor(Math.random()*maxNum);
    }

    //TODO Full Register, 0 = not full, 1 = not initialize, 2 = ready to run
    function getFull(flag){
        switch(flag){
            case 0:
                $("#contact").show();
                $("#portfolio").show();
                break;
            case 1:
                $("#contact").hide();
                $("#portfolio").hide();  
            case 2:
                $("#contact").hide();
        }
    }
});
