const logo_wrapper = $("#logo-wrapper"),
	  logo = $("#logo"),
	  logo_inner = $("#logo-inner"),
	  change_color = false,
	  stop = false;

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
	if (!change_color) return
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

$(window).resize(get_sizes);

logo.css({top: (viewport_height - logo_height)/2,left: (viewport_width - logo_width)/2})

// PATH STUFF

gsap.registerPlugin(ScrollTrigger)

const paths = $("#logo-inner path"),
	  paths_white = $("#logo-inner path.st0"),
	  paths_red = $("#logo-inner path.st1");

gsap.fromTo(logo, {scale: 3}, {scale: 1, duration: 4})

gsap.fromTo(paths, {strokeDashoffset: 300, strokeDasharray: 300}, { strokeDashoffset: 0, strokeDasharray: 700, duration: 5 });
gsap.fromTo(paths_white, {fill: "none"}, {fill: "#FFFFFF", duration: 1.5, delay: 3.5});
gsap.fromTo(paths_red, {fill: "none"}, {fill: "#CF1047", duration: 1.5, delay: 3.5});

gsap.to(paths, {strokeWidth: 0, duration: 0, delay: 5})

setTimeout(function(){
	if (!stop) {
		move.down();
		move.right();
	}
},5000)

$("#icon path").css({"stroke-dasharray":"0"})