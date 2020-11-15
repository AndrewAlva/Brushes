module.exports = {
	files: {
		javascripts: {
			joinTo: 'js/app.js',
			order: {
				before: ['app/js/p5.min.js', 'app/js/initialize.js']
			}
		},
		stylesheets: {joinTo: 'css/app.css'}
	},

	npm: {
		enabled: false
	},

	modules: {
		wrapper: false,
		definition: false
	}
}