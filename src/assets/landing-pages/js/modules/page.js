(function($) {
	if ($(".booking-page").length > 0) {
		$("#js_sticky_column").hcSticky({
			stickTo: ".booking-page",
			top: 80,
			bottom: 160,
			responsive: {
				1024: {
					disable: true
				}
			}
		});

		$("#related__slider").slick({
			autoplay: false,
			dots: true,
			arrows: false,
			speed: 700,
			cssEase: "ease-in-out",
			draggable: true,
			rtl: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 728,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 540,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});

		$(".doctor-times_slider").slick({
			autoplay: false,
			arrows: true,
			speed: 700,
			cssEase: "ease-in-out",
			draggable: false,
			rtl: true,
			infinite: false
			// slidesToShow: 1,
			// slidesToScroll: 1
		});

		$("#clinic_id").on("change", function(params) {
			const clinicId = $(this).val();
			const doctors = $.ajax({
				async: true,
				crossDomain: true,
				url: `http://34.74.186.159:8000/api/doctors/timetable/?group_by=clinic&id=100000026`,
				method: "GET",
				headers: {
					Authorization: "Token 93cb8c66c1684fe1752be7ee3cfd69e09872084f"
				}
			});

			doctors.then(res => {
				if (clinicId && res.data[clinicId]) {
					console.log(clinicId, res.data);
				}
			});
		});

		$(".js_click_time").on("click", function(e) {
			e.preventDefault();
			Swal.fire({
				title: "درخواست رزرو وقت دکتر",
				text: `زمان انتخابی شما ${$(this).text()}.`,
				type: "info",
				showCancelButton: true,
				confirmButtonColor: "#62a158",
				cancelButtonColor: "#aaa",
				confirmButtonText: "رزرو کن",
				cancelButtonText: "خیر"
			}).then(result => {
				if (result.value) {
					// Confirmed
					$("#reserve_modal").modal();
					// Swal.fire("Deleted!", "Your file has been deleted.", "success");
				}
			});
		});
	}

	// $(".input__classes").focus(function() {
	// 	$("#date1").addClass("open");
	// });
	// $(".input__classes").blur(function() {
	// 	$("#date1").removeClass("open");
	// });

	//
	// $(".readmore").readMore({
	// 	itemClass: "readmore-item",
	// 	readMoreText: "نمایش همه ...",
	// 	readLessText: "بستن",
	// 	readMoreClass: "btn btn-bluegray",
	// 	readLessClass: "btn btn-bluegray"
	// });
})(jQuery);
