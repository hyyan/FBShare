jQuery(function () {

    /**
     * Object Constructor
     */
    var FBShare = function () {
        this.init();
    };
    /**
     * Object Prototype
     */
    FBShare.prototype = {
        /**
         * Constrcutor 
         */
        constructor: FBShare,
        /**
         * Init App
         */
        init: function () {
            var self = this;
            $('form').submit(false);
            $('#num1').val(this.getNumber());
            $('#num2').val(this.getNumber());
            $('#answer-button').on("click", function (e) {
                self.handle();
            });
        },
        /**
         * Get number between 1 and 10
         * 
         * @returns {Number}
         */
        getNumber: function () {
            return Math.floor((Math.random() * 10) + 1);
        },
        /**
         * Handle
         * 
         * @returns {undefined}
         */
        handle: function () {

            var num1 = ($('#num1').val());
            var num2 = ($('#num2').val());
            var answer = ($('#answer').val());
            var isCorrect = ((Number(num1) + Number(num2)) === Number(answer));

            var self = this;
            var title = $('#result-title');
            var content = $('#result-content');
            var button = $('#result-button');
            
            if (isCorrect) {
                title.text('You Rocks');
                content.text('You Have Answered The Question Correctly 100%');
                button.text('Share the result Now');
                button.off('click').on('click', function () {
                    var message = 'You are intelligence , you have solved the \n\
                                   hardest equation in the whole world:' +
                            '         ' +
                            num1 + ' + ' + num2 + ' = ' + answer
                    self.share(message);
                });
            } else {
                title.text('You Suck :(');
                content.text('Give it another try now');
                button.text('Try again');
                button.off('click').on('click', function () {
                    self.reload();
                });
            }

            $('#result').removeClass('hidden').show();
        },
        /**
         * Reload the app
         */
        reload: function () {
            location.reload();
        },
        /**
         * Share on facebook
         * 
         * @param {String} message
         */
        share: function (message) {
            var self = this;
            FB.ui({
                display: 'popup',
                method: 'share',
                title: 'Integrating Testing Platform With Facebook Share functionality',
                description: message,
                picture: self.getPictureUrl(message),
                href: 'http://basis-europe.eu/en/'

            }, function (response) {
                console.log(response);
            });
        },
        /**
         * Get Picture URL
         * 
         * @return {string} image url
         */
        getPictureUrl: function (message) {
            return 'https://i.ytimg.com/vi/tqIw9bKS_7s/maxresdefault.jpg';
        }

    }

    /** init **/
    new FBShare();
});
