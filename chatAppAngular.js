var myApp = angular.module("chatApp", []);

myApp.controller("chatController", function($scope) {
    var socket = io();
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

    $scope.loginClick = function() {
    	$("#loginModal").hide();
    }

    $scope.msgSubmit = function() {
        if ($scope.enteredMsg.trim() == '') {
            return false;
        }
        socket.emit('chat message', $scope.enteredMsg);
        $scope.enteredMsg = "";
        $scope.$apply();
    }


    $(window).on('keydown', function(e) {
        if (e.which == 13) {
            $scope.msgSubmit();
            return false;
        }
    });


    socket.on('chat message', function(msg) {
        $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + msg + '</p></li>').appendTo($('.messages ul'));
        $('.contact.active .preview').html('<span>You: </span>' + msg);
        $(".messages").animate({ scrollTop: 20000000 }, "fast");
    });

    socket.on('disconnect', function(user) {
        console.log('disconnect', user)
    });


    /*other jq*/

    $("#loginModal").show();
    /*setTimeout(function() {
    	$( "#dragModal" ).draggable();
    }, 100);*/
    

    $("#profile-img").click(function() {
        $("#status-options").toggleClass("active");
    });

    $(".expand-button").click(function() {
        $("#profile").toggleClass("expanded");
        $("#contacts").toggleClass("expanded");
    });

    $("#status-options ul li").click(function() {
        $("#profile-img").removeClass();
        $("#status-online").removeClass("active");
        $("#status-away").removeClass("active");
        $("#status-busy").removeClass("active");
        $("#status-offline").removeClass("active");
        $(this).addClass("active");

        if ($("#status-online").hasClass("active")) {
            $("#profile-img").addClass("online");
        } else if ($("#status-away").hasClass("active")) {
            $("#profile-img").addClass("away");
        } else if ($("#status-busy").hasClass("active")) {
            $("#profile-img").addClass("busy");
        } else if ($("#status-offline").hasClass("active")) {
            $("#profile-img").addClass("offline");
        } else {
            $("#profile-img").removeClass();
        };

        $("#status-options").removeClass("active");
    });
});