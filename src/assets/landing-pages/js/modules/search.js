($ => {
	const InfiniteScroll = function() {
		this.initialize = function() {
			this.setupEvents();
		};

		this.setupEvents = function() {
			$(window).on("scroll", this.handleScroll.bind(this));
		};

		this.handleScroll = function() {
			const scrollTop = $(document).scrollTop();
			const windowHeight = $(window).height();
			const footerHeight = $("section.footer").height();
			const height = $(document).height() - (windowHeight + footerHeight);
			const scrollPercentage = scrollTop / height;

			// if the scroll is more than 90% from the top, load more content.
			if (scrollPercentage > 0.9) {
				this.handleInfiniteScroll();
			}
		};

		this.handleInfiniteScroll = () => {};

		this.initialize();
	};

	const _query = {
		page: 1
	};
	let _pagination = {};
	let _fetching = false;

	const makeComp = ({
		link,
		name,
		avatar,
		city,
		level,
		color,
		fields,
		level2,
		views,
		reserved
	}) => `<div class="col col-xs-12 col-md-6 col-lg-3">
            <a href="${link}" class="mymedica-comp">
              <div class="picture ${
					!avatar ? `color-${getRandomInt(1, 3)}` : "123"
				}" style="background-image: url('${avatar}')">
				${(!avatar && `<span>${name.charAt(0)}</span>`) || ""}
              </div>
              <div class="info">
                <div class="title">${name}</div>
                <div class="second">
                  <div class="city">${city}</div>
                  <div class="badge ${color}">${level}</div>
                </div>
                <div class="subtitle">${fields}</div>
				<span class="bold">${level2}</span>
                <div class="detail">
                  <ul>
                    <li><img src="./dist/images/svg/family-room.svg">
                      <div class="number">${persian(numberWithCommas(views))}</div>
                      <div class="after">مشاهده شده</div>
                    </li>
                    <li><img src="./dist/images/svg/reserved.svg">
                      <div class="number">${persian(numberWithCommas(reserved))}</div>
                      <div class="after">رزرو شده</div>
                    </li>
                  </ul>
                </div>
              </div>
            </a>
          </div>`;

	const getQueryParameters = str =>
		(str || document.location.search).replace(/(^\?)/, "").split("&");

	const setQueryParameters = (uri = `?${objToString(_query)}`) => {
		if (uri && uri !== "?") {
			window.history.pushState("", "", uri);
		}

		// console.log(_query.city);
		// if (_query.city) {
		// 	$("#district")
		// 		.prop("disabled", false)
		// 		.niceSelect("update");
		// }

		// if (_query.level_one_speciality) {
		// 	$("#level_two_speciality")
		// 		.prop("disabled", false)
		// 		.niceSelect("update");
		// }
	};

	const cityToDistrictMapper = new Map([
		[window.myMedica.City.Tehran, 22],
		[window.myMedica.City.Esfahan, 14],
		[window.myMedica.City.Mashhad, 17],
		[window.myMedica.City.Tabriz, 10],
		[window.myMedica.City.Shiraz, 11],
		[window.myMedica.City.Karaj, 10]
	]);

	$(document).ready(() => {
		if ($("#doctors").length > 0) {
			// Initialize scroll
			const IS = new InfiniteScroll();
			IS.handleInfiniteScroll = function() {
				if (!_fetching && _pagination.has_next) {
					// console.log(_fetching, _pagination);
					_query.page = _pagination.current_page_number + 1;
					getData("InfiniteScroll");
				}
			};

			const params = getQueryParameters() || "";

			// Render queries
			if (params) {
				params.map(
					function(n) {
						if (n) {
							n = n.split("=");
							_query[n[0]] = n[1];
							_query.page = 1;
							$(`input[name=${n[0]}], select[name=${n[0]}]`).val(
								decodeURIComponent(n[1])
							);
							$(`select[name=${n[0]}]`).niceSelect("update");

							return n, (this[n[0]] = n[1]), this;
						} else {
							return;
						}
					}.bind({})
				)[0];
			}

			getData();

			// $(".js-input-type").on("blur", function() {
			// 	const val = $(this).val();
			// 	const name = $(this).attr("name");

			// 	_query[name] = val;
			// 	getData();
			// });

			$("#js-fullname").on("click", function() {
				const val = $("#full_name").val();

				_query["full_name"] = val;
				getData();
				return false;
			});

			$(".js-select-change").on("change", function() {
				const val = $(this).val();
				const name = $(this).attr("name");

				// Support city and district
				if (name === "city") {
					const $optgroup = $("#district").find("optgroup");
					const steps = cityToDistrictMapper.get(parseInt(val));
					$optgroup.empty();
					for (let i = 1; i <= steps; i++) {
						$optgroup.append(new Option(`${i}`, i, false, false));
						$("#district")
							.prop("disabled", false)
							.niceSelect("update");
					}
				}

				if (name === "level_one_speciality") {
					const $optgroup = $("#level_two_speciality").find("optgroup");
					const specialities = window.myMedica.level2Speciality[val];
					$optgroup.empty();
					Object.keys(specialities).map(spec => {
						$optgroup.append(new Option(`${specialities[spec]}`, spec, false, false));
						$("#level_two_speciality")
							.prop("disabled", false)
							.niceSelect("update");
					});
				}

				_query[name] = val;

				getData();
			});

			function getData(IS) {
				$(".spinner").fadeIn();

				if (!IS) {
					$("#doctors").empty();
				}

				setQueryParameters();

				_fetching = true;
				const doctors = $.ajax({
					async: true,
					crossDomain: true,
					url: `http://34.74.186.159:8000/api/doctors/?${objToString(_query)}`,
					method: "GET",
					headers: {
						Authorization: "Token 93cb8c66c1684fe1752be7ee3cfd69e09872084f"
					}
				});

				doctors.then(res => {
					$(".spinner").hide();
					_fetching = false;

					const { data, pagination } = res;
					_pagination = pagination;

					if (data && data.length > 0) {
						$(".sidebar-box").hcSticky({
							stickTo: ".search-page",
							top: 80,
							responsive: {
								1024: {
									disable: true
								}
							}
						});

						data.map(doc => {
							$("#doctors").append(
								makeComp({
									link: `doctor.html?${doc.id}`,
									avatar: doc.image_url,
									percent: "۵۰٪",
									level:
										doc.level_one_speciality &&
										window.myMedica.level1Speciality[doc.level_one_speciality],
									color: window.myMedica.badges[doc.level_one_speciality],
									name: `${doc.first_name} ${doc.last_name}`,
									fields: doc.more_detail && doc.more_detail.education.join("، "),
									level2: doc.level_two_specialities
										.map(x => window.myMedica.level2Speciality[x])
										.filter(Boolean)
										.join("، "),
									city:
										doc.main_location &&
										window.myMedica.cities[doc.main_location.city],
									views: (doc.more_detail && doc.more_detail.profile_views) || 0,
									reserved: 1000
								})
							);
							// .ready(function() {
							// 	console.log($(".subtitle"));
							// });
						});

						$("#search_result").text(
							`  (${window.persian(
								$("#doctors").children().length
							)} از ${window.persian(pagination.total_count)})`
						);

						$(".subtitle").each(function() {
							const length = 60;
							const details = $(this);
							const original_html = details.html();
							const original_text = details.text();
							const truncated_text = $.trim(original_text)
								.substring(0, length)
								.split(" ")
								.slice(0, -1)
								.join(" ");
							const show_more = $('<a href="#more">...</a>');
							show_more.on("click", function() {
								details.html(original_html);
								return false;
							});
							details.html(truncated_text);
							details.append(show_more);
						});
					} else {
						$("#search_result").text(`  یافت نشد`);
						$("#search_not_found").show();
					}
				});
			}
		}

		$("#js-show-filters, .search-filter_close").on("click", () => $(".search-filter").toggle());
		// $("#searchBarFixed").stick_in_parent();
	});
})(jQuery);
