$(document).ready(function() {
	$('.del').click(function(e) {
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-'+id);
		$.ajax({
			url: '/admin/movie/list?id=' + id,
			type: 'DELETE',
		})
		.done(function(results) {
			if (results.success === 1) {
				if(tr.length > 0) {
					tr.remove();
				}
			} 
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	})

	$('#douban').blur(function() {
		var value = $(this).val()
		$.ajax({
			url: 'https://api.douban.com/v2/movie/subject/'+value,
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {
				$('#inputTitle').val(data.title)
				$('#inputGuider').val(data.directors[0].name)
				$('#inputCountry').val(data.countries[0])
				$('#inputPoster').val(data.images.large)
				$('#inputYear').val(data.year)
				$('#inputSummary').val(data.summary)
			}
		})
		
		

	})

})