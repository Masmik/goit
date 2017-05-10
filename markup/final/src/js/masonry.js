'use strict';

function loadMasonry() {

    var grid = document.querySelector('.grid');
    new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
    });

    var searchWords = ['cat', 'dog', 'pigs', 'sun', 'smile', 'egypt', 'sea', 'sky', 'tree', 'sand', 'space'];

    var searchWordIndex = Math.floor(Math.random() * (searchWords.length - 1));
    search(searchWords[searchWordIndex]);
    search_partner();

    function masonry_build(data) {
        var gridItems = document.getElementsByClassName('grid-item');
        for (var i = 0; i < gridItems.length; i++) {
            gridItems[i].style.backgroundImage = 'url(' + ((data.hits)[i].webformatURL) + ')';
            var itemText = gridItems[i].getElementsByClassName('item__text')[0];
            itemText.innerHTML = data.hits[i].tags.toUpperCase().split(',')[0];
        }
    }

    function search(request) {

        jQuery.support.cors = true;

        $.ajax({
            url: 'https://pixabay.com/api/?key=5270170-c6e51883c4d17561ecf30e5fa&q=' + request + '&image_type=photo&min_width=260&per_page=7',
            dataType: 'json',
            method: 'GET',
            success: function (data) {
                if (data.count == 0) {
                    console.log('pixabay не вернул ни одной картинки');
                    return;
                }
                else {
                    masonry_build(data);
                }
            },
            fail: function () {
                console.log('Fail request');
            },
            done: function () {
                console.log('Done request');
            }
        });


        // var xmlhttp = new XMLHttpRequest();
        //
        // xmlhttp.onreadystatechange = function () {
        //     if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        //         if (xmlhttp.status == 200) {
        //             var response = xmlhttp.responseText;
        //             var responseJson = JSON.parse(response);
        //             if (responseJson.length == 0) {
        //                 console.log('pixabay не вернул ни одной картинки');
        //                 return;
        //             }
        //             else {
        //                 masonry_build(responseJson);
        //             }
        //         }
        //         else if (xmlhttp.status == 400) {
        //             console.log('There was an error 400');
        //         }
        //         else
        //             console.log('something else other than 200 was returned');
        //         }
        //     }
        // };
        //
        // xmlhttp.open('GET', 'https://pixabay.com/api/?key=5270170-c6e51883c4d17561ecf30e5fa&q=' + request + '&image_type=photo&min_width=260&per_page=7', true);
        // xmlhttp.send();
    }

    function search_partner() {
        var searchPartnerButtonEl = document.getElementsByClassName('search-partners_button')[0];
        searchPartnerButtonEl.addEventListener('click', function (e) {
            e.preventDefault();
            var searchQuery = document.getElementById('search_query');
            search(searchQuery.value);
        });
    }

}
