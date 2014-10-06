/// <reference path="../typings/jquery/jquery.d.ts" />

class Song {
    title: string;
    artist: string;
    constructor(title: string, artist: string) {
        this.title = title;
        this.artist = artist;
    }
};

$(document).ready(() => {
    $('#input').change(() => {
        var files = $('#input')[0].files;

        if (files.length > 0) {
            var file = files[0];

            var r = new FileReader();
            r.onload = e => {
                var nameParts = file.name.split('.');
                var ext = nameParts[nameParts.length - 1];
                var contents = e.target.result;

                parseText(contents, ext);
            };

            r.readAsText(file);
        }
    });
});

function parseText(content: string, type: string) {
    var lines = content.split('\r\n');
    if (type === "tsv") {
        lines.splice(0, 1);
        var terms = [];
        var scope = angular.element($('#songList')).scope();

        scope.$apply(function () {
            scope.setLoading(true);
        });

        for (var index in lines) {
            terms = lines[index].split('\t');

            scope.$apply(function () {
                scope.pushSong(terms[0], terms[1]);
            });
        }

        scope.$apply(function () {
            scope.setLoading(false);
            scope.step = 2;
        });
    }
}
