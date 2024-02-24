const logo_wrapper = $("#logo-wrapper"),
	  logo = $("#logo"),
	  logo_inner = $("#logo-inner");

var viewport_width, viewport_height, logo_width, logo_height, vertical,
	speed = 350; // In pixels per second

const get_sizes = () => {
	viewport_width = logo_wrapper.outerWidth();
	viewport_height = logo_wrapper.outerHeight();
	vertical = viewport_height > viewport_width;
	logo_width = logo.outerWidth();
	logo_height = logo.outerHeight();
};

const bump_edge = function () {
	var deg = Math.floor(Math.random() * 360);
	logo_inner.css({"filter":`hue-rotate(${deg}deg)`});
}

const move = {
	right: function () {
		logo.animate({left: (viewport_width - logo_width)}, {duration: ((viewport_width/speed) * 1000), queue: false, easing: "linear", complete: function () {
			bump_edge();
			move.left();
		}});
	},
	left: function () {
		logo.animate({left: 0}, {duration: ((viewport_width/speed) * 1000), queue: false, easing: "linear", complete: function () {
			bump_edge();
			move.right();
		}});
	},
	down: function () {
		logo.animate({top: (viewport_height - logo_height)}, {duration: ((viewport_height/speed) * 1000), queue: false, easing: "linear", complete: function () {
			bump_edge();
			move.up();
		}});
	},
	up: function () {
		logo.animate({top: 0}, {duration: ((viewport_height/speed) * 1000), queue: false, easing: "linear", complete: function () {
			bump_edge();
			move.down();
		}});
	}
};

get_sizes();

move.down();
move.right();

$(window).resize(get_sizes);