$(function(){
    $(".video_instruct").click(function(event){
        $(this).toggleClass("video_instruct-drop_up");
        $(this).find(".you_video").toggleClass("you_video-show");
    });
});