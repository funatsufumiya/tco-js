default: minify
minify:
	yuicompressor --type js tco.js -o tco.min.js