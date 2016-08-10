// ==UserScript==
// @name         YT Rabbit Hole
// @namespace    http://tampermonkey.net/
// @version      3.14
// @description  Clicks on a random videos on the sidebar
// @author       Nick Geoghegan
// @licence      AGPL3
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //================ Functions ===================

    //function to search string in current page URL
    function isUrl($string){
        if(window.location.href.indexOf($string) >= 0){
            return true;
        }else if(window.location.href.indexOf($string) !== 0){
            return false;
        }
    }
    //function to go to a random video in the "related video" list
    function goNextVideo(){
        var relatedList = document.getElementById('watch-related'),
            relatedVideos = relatedList.getElementsByClassName('related-list-item-compact-video'),
            ran = Math.floor((Math.random() * relatedVideos.length) + 1),
            event = new Event('click');

        return relatedVideos[ran-1].getElementsByTagName('A')[0].dispatchEvent(event);
    }

    //function to set the function goNextVideo to an event
    function setEvent(){
        if(isUrl('watch?v=')){ //if current page is a video
            if(isUrl('&list=')){ //if current page is a list
                //Removes the event listener if exists
                document.getElementsByTagName('video')[0].removeEventListener('ended',goNextVideo);
            }else{ //if current page is not a list
                //Adds event listener to fire a function when the video ends
                document.getElementsByTagName('video')[0].addEventListener('ended',goNextVideo);
            }
        }
    }

    //============== Script ===================

    //detect changes in the url
    var prevUrl = window.location.href;
    setInterval(function(){
        if(prevUrl !== window.location.href){
            prevUrl = window.location.href;
            setEvent();
        }
    },500);

    //starts the script
    setEvent();
})();
