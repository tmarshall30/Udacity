// Preload images. Taken from http://stackoverflow.com/a/476681
function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:
preload([
    'images/linc1Full.png',
    'images/linc2Full.png',
    'images/linc3Full.png',
    'images/relay4Full.png',
    'images/linc11170.png',
    'images/linc21170.png',
    'images/linc31170.png',
    'images/relay41170.png'
]);

var imgArray = ['images/linc1', 'images/linc2', 'images/linc3', 'images/relay4'];

// Shows selected image in the center of the view
$(function () {
    $('.thumbnail-image').on('click', function (e) {
        $('.cloned-image').remove();
        var cloneImage = $(this).attr('src').slice(0, -7);

        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] === cloneImage) {
                $('<img src="' + cloneImage + '1170.png" class="cloned-image" >').appendTo('.display-img');

            }

        }

        closeDisplayImage();
        displayImageHeight();
        fullScreenOverlay();
        e.stopPropagation();
        fullScreenImg();

    });

});

// Removes central image when the background is clicked
function closeDisplayImage() {
    $('html').click(function () {
        $('.cloned-image').fadeOut('slow', function () {
            $(this).remove();
            $('.full-screen').remove();

        });

    });

}

// Adds height responsiveness to central image
function displayImageHeight() {
    $('.cloned-image').css('height', $('.container').height() - 350);
    $(window).resize(function () {
        $('.cloned-image').css('height', $('.container').height() - 350);

    });

}

// Displays Full Screen dialogue over central image
function fullScreenOverlay() {
    var $displayImg = $('.display-img');

    $displayImg.on('mouseenter', '.cloned-image, .full-screen', function () {
        var $fullScreen = $('.full-screen');
        if ($fullScreen.length) {
            $fullScreen.fadeIn('slow');
            
        } else {
            $('<h2 class="full-screen">Full Screen</h2>').prependTo('.display-img').hide().fadeIn('slow');

        }

    });

    $displayImg.on('mouseleave', '.cloned-image, .full-screen', function () {
        $('.full-screen').fadeOut('slow');

    });
}

//Transforms the central image into a full screen background and displays controls
function fullScreenImg() {
    $(document).off('click', '.cloned-image, .full-screen').on('click', '.cloned-image, .full-screen', function () {
        var clonedImage = $('.cloned-image').attr('src').slice(0, -8);

        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] === clonedImage) {
                var fullScreenImage = clonedImage + "Full.png";

                $('<div class="full-screen-image"></div>').prependTo('body').hide().fadeIn('slow');
                $('.full-screen-image').css('background', 'url(' + fullScreenImage + ') no-repeat fixed center center / contain');

            }
        }

        $('.full-screen-image').one('mouseenter', function () {
            fullScreenControls();

        });

        $('.full-screen').remove();
        $('.cloned-image').remove();

    });

}

// Left and right controls when image is full screen. Allows cycling through the images.
function fullScreenControls() {
    var controlElements = $('<h2 class="exit-full-screen">Exit Full Screen</h2> <div class="left-control glyphicon glyphicon-chevron-left"></div> <div class="right-control glyphicon glyphicon-chevron-right"></div>');

    controlElements.prependTo('.full-screen-image').hide().fadeIn(1000);

    $('.exit-full-screen').on('click', function () {
        $('.full-screen-image').fadeOut('slow', function () {
            var currentImage = $('.full-screen-image').css('background-image');
            var currentImageURL = currentImage.replace(/"/g, '').replace('url(http:', '').replace('url(https:', '').replace('url(file:', '').replace(/\/(.*)\//, '').replace(')', '').slice(0, -8);
            var currentImageName = "images/" + currentImageURL;
            
            for (var i = 0; i < imgArray.length; i++) {
                if (imgArray[i] === currentImageName) {
                    $('<img src="' + imgArray[i] + '1170.png" class="cloned-image">').appendTo('.display-img');
                    displayImageHeight();
                    fullScreenOverlay();

                }

            }

            $(this).remove();

        });

    });

    $('.left-control').on('click', function () {
        var $fullScreenImage = $('.full-screen-image');
        var currentImage = $fullScreenImage.css('background-image');
        var currentImageURL = currentImage.replace(/"/g, '').replace('url(http:', '').replace('url(https:', '').replace('url(file:', '').replace(/\/(.*)\//, '').replace(')', '').slice(0, -8);
        var currentImageName = "images/" + currentImageURL;

        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] === currentImageName) {
                var imgLeft = imgArray[i - 1];

                if (imgLeft === undefined) {
                    var imgLeft = imgArray[3] + "Full.png";

                    $fullScreenImage.css('background', 'url(' + imgLeft + ') no-repeat fixed center center / contain').hide().fadeIn('slow');

                } else {
                    var imgLeftNext = imgLeft + "Full.png";
                    $fullScreenImage.css('background', 'url(' + imgLeftNext + ') no-repeat fixed center center / contain').hide().fadeIn('slow');
                    
                }

            }

        }

    });

    $('.right-control').on('click', function () {
        var $fullScreenImage = $('.full-screen-image');
        var currentImage = $fullScreenImage.css('background-image');
        var currentImageURL = currentImage.replace(/"/g, '').replace('url(http:', '').replace('url(https:', '').replace('url(file:', '').replace(/\/(.*)\//, '').replace(')', '').slice(0, -8);
        var currentImageName = "images/" + currentImageURL;

        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] === currentImageName) {
                var imgRight = imgArray[i + 1];

                if (imgRight === undefined) {
                    var imgRight = imgArray[0] + "Full.png";

                    $fullScreenImage.css('background', 'url(' + imgRight + ') no-repeat fixed center center / contain').hide().fadeIn('slow');
                    

                } else {
                    var imgRightNext = imgRight + "Full.png";
                    $fullScreenImage.css('background', 'url(' + imgRightNext + ') no-repeat fixed center center / contain').hide().fadeIn('slow');
                    
                }

            }

        }

    });

}