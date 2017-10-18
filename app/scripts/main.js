'use strict';

var PairsGame = (function () {

    var numberOfTries = 0,
        cards = [ //dont do this next time
            'angular',
            'angular',
            'd3',
            'd3',
            'jenkins',
            'jenkins',
            'postcss',
            'postcss',
            'react',
            'react',
            'redux',
            'redux',
            'sass',
            'sass',
            'supercharge',
            'supercharge',
            'ts',
            'ts',
            'webpack',
            'webpack'
        ],
        containerSelector = '.card-container',
        cardSelector = '.cards',
        selectedClass = 'selected',
        triesSelector = '.tries-count';

    function initTable(numberOfCards) {
        var cardsContainer = '',
            numberOfTriesContainer = '<span class="tries">Number of tries: <span class="tries-count">0</span></span>';
        for (var i = 0; i < numberOfCards; i++) {
            cardsContainer += '<div class="cards"></div>';
        }
        $(containerSelector).prepend(numberOfTriesContainer, cardsContainer);
        shuffleCards(cards, numberOfCards);
    }

    function shuffleCards(cards, numberOfCards) {
        var random = 0,
            temp = 0,
            resizedCards = cards.slice(0, numberOfCards);
        for (var i = 0; i < resizedCards.length; i++) {
            random = Math.round(Math.random() * 1);
            temp = resizedCards[i];
            resizedCards[i] = resizedCards[random];
            resizedCards[random] = temp;
        }
        assignCards(resizedCards);
    }

    function assignCards(resizedCards) {
        $(cardSelector).each(function (index) {
            $(this).attr('çard-type', resizedCards[index])
                .addClass(resizedCards[index]);
        });
        bindUI();
    }

    function bindUI() {
        $(cardSelector).on('click', selectCards);
    }

    function selectCards(e) {
        $(e.target).addClass('selected');
        checkMatchingCards();
    }

    function checkMatchingCards() {
        var $selectedCards = $('.' + selectedClass);
        if ($selectedCards.length === 2) {
            if ($selectedCards.first().attr('çard-type') === $selectedCards.last().attr('çard-type')) {
                $selectedCards.addClass('matched');
                removeSelectedClass($selectedCards);
            } else {
                setTimeout(function () {
                    removeSelectedClass($selectedCards);
                }, 2000);
            }
            updateTries();
        }
    }

    function removeSelectedClass($selectedCards) {
        $selectedCards.each(function (i, item) {
            $(item).removeClass(selectedClass);
        });
    }

    function updateTries() {
        numberOfTries++;
        $(triesSelector).html(numberOfTries);

        checkWin();
    }

    function checkWin() {
        var cardsLength = $(cardSelector).length,
            matchedLength = $(cardSelector + '.matched').length;
        if (cardsLength === matchedLength) {
            PairsGame.destroy();
            $(containerSelector).append('<span class="win">You win the Game</span>');
        }
    }

    return {
        init: function (numberOfCards) {
            initTable(numberOfCards);
        },

        destroy: function () {
            $(cardSelector).off('click');
            $(cardSelector).remove();
        }
    }
})();

//create listener for restart and settings for number of cards and add as it variable
$('.number-of-cards').on('click', function (e) {
    var numberOfCards = parseInt($(e.target).text()),
        maxSize = 10;
    if (numberOfCards <= maxSize) {
        PairsGame.destroy();
        PairsGame.init(numberOfCards);
    }
});
PairsGame.init(6);
