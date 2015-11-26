$(document).on('page:change', function() {

	function geoSuccess(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		$('.js-latitude').val(lat);
		$('.js-longitude').val(lon);


		$.ajax({
			url: '/get_address',
			type: 'GET',
			dataType: 'script',
			data: {
				latitude: lat,
				longitude: lon
			},
		});

	}

	function geoError(error){
		alert('Try again later')
	}

	function getLocation(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
		} else {
			alert('Geolocation is not supported by this browser');
		}
	}

	function getUserLocation() {
		$.ajax({
			url: '/get_address',
			type: 'GET',
			dataType: 'script',
		})
	}

	$('.js-getlocation').on('click', function(event) {
		event.preventDefault();
		getLocation();
	});

	if($('.registrations.new').length > 0 ){
		getLocation();
	}

	if($('.registrations.edit').length > 0 ){
		getUserLocation();
	}


// var handler = Gmaps.build('Google');
// // console.log(handler);
// handler.buildMap({provider: {}, internal: {id: 'map'} }, function(){
// 	handler.map.centerOn({
// 		lat: -33.45,
// 		lng: -70.666
// 	});

// 	handler.bounds.extendWith(markers);
// 	handler.fitMapToBounds();
// 	handler.getMap().setZoom(15);

// });
});

// esto es por html5 que incorpora nuevas apis js