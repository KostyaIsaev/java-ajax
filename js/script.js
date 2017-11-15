$(document).ready(function() {
    var j = 3;
    $(window).on('scroll', function() {
        var windowTop = $(window).scrollTop(),
            windowHeight = $(window).height(),
            item = $('.item'),
            itemLast = item.last(),
            moreFlag = false,
            itemLastTop = itemLast.offset().top,
            itemLastHeight = itemLast.height(),
            itemLastPos = itemLastTop + itemLastHeight;
        if (windowTop >= itemLastPos - windowHeight) {
            moreFlag = true;
            loader();
        }

        function loader() {
            $.ajax({
                url: 'foto.php',
                type: 'POST',
                data: ({
                    more: moreFlag
                }),
                dataType: 'text',
                beforeSend: function() {
                    $('#info').css('display', 'block');
                    $('body').css('background', 'rgba(0,0,0,.5)');
                },
                success: function(data) {
                    moreFlag = false;
                    data = JSON.parse(data);
                    var size = Object.keys(data).length;
                    if (j <= size) {
                        for (var i = 1; i <= 3; i++) {
                            j++;
                            $('.conteiner').append('<img class="item" src="./image/' + j + '.jpg" alt="">');
                        }
                    } else {
                        alert('Картинок больше нет!')
                    }
                    $('#info').css('display', 'none');
                    $('body').css('background', 'none');
                }
            });
        };
    });
});
