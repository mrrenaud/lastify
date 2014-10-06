var phonecatApp =
    angular.
        module('lastifyApp', ['cfp.loadingBar']).
        controller('SongListCtrl', function ($scope, cfpLoadingBar) {
            $scope.songs = [];

            $scope.step = 1;

            $scope.songsPageIndex = 0;
            $scope.songsRangeOptions = [10, 20, 50, 100];
            $scope.songsRange = $scope.songsRangeOptions[1];

            $scope.songsCount = function () {
                return $scope.songs.lenght;
            };

            $scope.pushSong = function (artist, title) {
                $scope.songs.push(new Song(artist, title));
            };

            $scope.showStep = function (step) {
                return step == $scope.step;
            };

            $scope.setLoading = function (isLoading) {
                if (isLoading) {
                    cfpLoadingBar.start();
                } else {
                    cfpLoadingBar.complete();
                }
            };
        });
