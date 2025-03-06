/*Controlador de la sección de podcast */

angular.module('PodcastCtrl', []).controller('PodcastController', function ($scope) {	
	$scope.sites = [
		{title: 'Spotify', url: 'https://open.spotify.com/show/1m5NFPzgKRYLCn6toKqy5F?si=68d1f43e4b664c0a', icon: 'spotify', background: '#1ed760', color: '#000'},
		{title: 'Amazon Music', url: 'https://music.amazon.com/podcasts/49668157-be39-46dc-9840-cdc5dceca597/la-isla-audiovisual', icon: 'amazonmusic', background: '#25d1da', color: '#000'},
		{title: 'Podcast Index', url: 'https://podcastindex.org/podcast/6754183', icon: 'podcastindex', background: '#ff0000', color: '#fff'},
	];
});
