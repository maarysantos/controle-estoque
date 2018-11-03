$(document).ready(
    function () {
        $(".lstSubMenu1").hide();
         $(".lstSubMenu2").hide();
          $(".lstSubMenu3").hide();
           $(".lstSubMenu4").hide();
            $(".lstSubMenu5").hide();
        $("#itemConf1").click(function (e) { e.preventDefault();
        $(".lstSubMenu1").slideToggle(); });
        
         $("#itemConf2").click(function (e) { e.preventDefault();
        $(".lstSubMenu2").slideToggle(); });
        
         $("#itemConf3").click(function (e) { e.preventDefault();
        $(".lstSubMenu3").slideToggle(); });
        
         $("#itemConf4").click(function (e) { e.preventDefault();
        $(".lstSubMenu4").slideToggle(); });
        
         $("#itemConf5").click(function (e) { e.preventDefault();
        $(".lstSubMenu5").slideToggle(); });

        $('#btnSair').click(function(){
            window.location.href = '/sair';
        });

    });
    
    