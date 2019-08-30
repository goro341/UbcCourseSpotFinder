($ => {
	/**
	 * Persianize
	 * @param Str
	 * @return {String} Persian Chars
	 */
	window.persian = str => {
		if (!str) return;
		let value = str.toString();
		const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
		const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
		for (let i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
			value = value.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
		}
		return value;
	};

	window.numberWithCommas = x => {
		if (!x) return;
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	window.getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

	// Tabs:
	$(".js-tabs a:first").addClass("current");

	$(".js-tabs a").click(function(e) {
		e.preventDefault();
		var _href = $(this).attr("href");
		$(".js-tabs a").removeClass("current");
		$(this).addClass("current");
		$(".tabs-content > div").hide();
		$(_href).fadeIn();
	});

	const $burger = $(".burger-container");
	const $header = $(".is-header");

	$burger.on("click", function() {
		$header.toggleClass("menu-opened");
	});

	/* Outer click to document */
	$(document).on("click", function(event) {
		if (
			$(event.target).closest(".header--menu").length < 1 &&
			$(event.target).closest(".burger-container").length === 0
		) {
			$header.removeClass("menu-opened");
		}

		// event.preventDefault();
		event.stopPropagation();
	});

	let City;
	(function(City) {
		City[(City["Tehran"] = 1)] = "Tehran";
		City[(City["Esfahan"] = 2)] = "Esfahan";
		City[(City["Mashhad"] = 3)] = "Mashhad";
		City[(City["Tabriz"] = 4)] = "Tabriz";
		City[(City["Shiraz"] = 5)] = "Shiraz";
		City[(City["Karaj"] = 6)] = "Karaj";
	})(City || (City = {}));

	window.myMedica = {
		City,
		cities: {
			1: "تهران",
			2: "اصفهان",
			3: "مشهد",
			4: "تبریز",
			5: "شیراز",
			6: "کرج"
		},
		level1Speciality: {
			1: "پزشک",
			2: "دندان پزشک",
			3: "روان پزشک"
		},
		badges: {
			1: "red",
			2: "blue",
			3: "pink"
		},
		level2Speciality: {
			1: {
				1001: "عمومی",
				1002: "متخصص بیماری های زنان",
				1003: "متخصص بیماری های اعصاب",
				1004: "متخصص هوش بری",
				1005: "چشم پزشک"
			},
			2: {
				2001: "عمومی",
				2002: "زیبایی",
				2003: "ارتودنسی",
				2004: "اینویزیلاین"
			},
			3: {
				3001: "کودکان",
				3002: "اعتیاد",
				3003: "بیش فعالی",
				3004: "افسردگی",
				3005: "اختلالات اضطرابی"
			}
		}
	};

	window.objToString = obj => {
		const text = [];
		for (const p in obj) {
			if (obj[p] && obj.hasOwnProperty(p)) {
				text.push(`${p}=${obj[p]}`);
			}
		}
		text.push();
		return text.join("&");
	};

	$("select").niceSelect();
	$(".main-header").hcSticky();

	$(".scrollToTop").click(function() {
		$("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 100 }, 800);
		return false;
	});
})(jQuery);
