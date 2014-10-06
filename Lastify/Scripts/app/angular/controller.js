angular.module('lastifyFilters', []).
    filter('isAvailable', function () {
        return function (input) {
            return input.isAvailable === window.undefinded || input.isAvailable;
        };
    });


var phonecatApp =
    angular.
        module('lastifyApp', ['cfp.loadingBar', 'lastifyFilters']).
            controller('SongListCtrl', function ($scope, $http, cfpLoadingBar) {

                $scope.songs = [];

                $scope.availableSongs = [];

                $scope.step = 1;

                // Pagination
                $scope.songsPageIndex = 0;
                $scope.songsPageMaxIndex = function () {
                    return Math.ceil($scope.songs.length / $scope.songsRange);
                };
                $scope.songsRangeOptions = [10, 20, 50, 100];
                $scope.songsRange = $scope.songsRangeOptions[1];
                $scope.previousPage = function () {
                    if ($scope.songsPageIndex > 0)
                        $scope.songsPageIndex--;
                };
                $scope.nextPage = function () {
                    if ($scope.songsPageIndex < $scope.songsPageMaxIndex())
                        $scope.songsPageIndex++;
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

                $scope.paginatedSongs = function () {
                    var begin = $scope.songsRange * $scope.songsPageIndex;
                    return $scope.songs.slice(begin, begin + $scope.songsRange - 1);
                };

                $scope.searchIndex = 0;
                $scope.searchOnSpotify = function () {
                    $scope.setLoading(true);
                    for (var i = 0; i < 10; i++) {
                        if (!$scope.searchNextSong())
                            return;
                    }
                };

                $scope.searchNextSong = function () {
                    if ($scope.searchIndex >= $scope.songs.length) {
                        $scope.setLoading(false);
                        return false;
                    }

                    $http({
                        method: 'GET', url: 'https://api.spotify.com/v1/search?', params: {
                            'q': $scope.songs[$scope.searchIndex].artist +
                               ' ' + $scope.songs[$scope.searchIndex].title,
                            'type': 'track',
                            'index': $scope.searchIndex
                        }
                    }).
                success(function (data, status, headers, config) {
                    if (data.tracks && data.tracks.items.length) {
                        $scope.songs[config.params.index].spotifyUri = data.tracks.items[0].uri;
                        $scope.songs[config.params.index].spotifyPreview = data.tracks.items[0].preview_url;
                        $scope.songs[config.params.index].isAvailable = true;
                    }
                    $scope.searchNextSong();
                }).
                error(function (data, status, headers, config) {
                    if (data.tracks && data.tracks.items.length) {
                        $scope.songs[config.params.index].isAvailable = false;
                    }
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

                    $scope.searchIndex++;
                    return true;
                };
            });
