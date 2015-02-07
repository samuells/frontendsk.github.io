;(function(){


    "use strict";



	//
	//  This gulp files for blog generates my blog
	//  Copyrights by Samuel Ondrek; 2015
	//



	//
	//  Requires
	//
	var marked = require("gulp-marked");
    var gulp = require("gulp");
	var frontMatter = require("gulp-front-matter");
	var rename = require("gulp-rename");
	var path = require("path");
	var swig = require("swig");
	var through = require("through2");
	var http = require("http");
	var serveStatic = require("serve-static");
	var connect = require("connect");
	var rimraf = require("rimraf");
	var runSequence = require("run-sequence");



	//
	//  Constants that are used for generating of files;
	//
	var BLOG_BUILD_DEST = "./b/";
	var POSTS_BUILD_DEST = "./p/";
	var INDEX_BUILD_DEST = ".";
	var TARGET_BLOG = "./#/";



	//
	//
	//
	gulp.task("clean-posts", function(cb){

		rimraf(POSTS_BUILD_DEST, cb);

	});



	//
	//
	//
	gulp.task("clean-blogs", function(cb){

		rimraf(BLOG_BUILD_DEST, cb);

	});




	gulp.task("default", function(cb){

		runSequence(
			[ "clean-posts", "clean-blogs" ],
			[ "pages", "posts", "index" ],
		cb);

	});




	//
	//
	//
	gulp.task("watch", function(cb){

		runSequence(
			[ "default" ],
			[ "watcher" ],
		cb);

	});



	//
	//
	//
	gulp.task("watcher", function(){

		gulp.watch([TARGET_BLOG+"/**/*"], ["default"]);
		gulp.watch([TARGET_BLOG+"/*"], ["default"]);

		connect().use(serveStatic(__dirname)).listen(3003);

	});




	//
	//
	//
	gulp.task("pages", function(){

		return parseTemplate(
			TARGET_BLOG+"/pages/*.md",
			TARGET_BLOG+"/templates/page.html",
			POSTS_BUILD_DEST,
			true
		);

	});




	//
	//
	//
	gulp.task("index", function(){

		return parseTemplate(
			TARGET_BLOG+"/index.md",
			TARGET_BLOG+"/templates/index.html",
			INDEX_BUILD_DEST,
			false
		);

	});



	//
	//
	//
	gulp.task("posts", function(){

		return parseTemplate(
			TARGET_BLOG+"/posts/*.md",
			TARGET_BLOG+"/templates/post.html",
			BLOG_BUILD_DEST,
			true
		);

	});



	//
	//
	//
	var parseTemplate = function(targetUrl, templateUrl, buildFolder, slashOnTheEnd){

		return gulp.src(targetUrl)
			.pipe(frontMatter({property: "page", remove: true}))
			.pipe(marked())
			.pipe(applyTemplate(templateUrl))
			.pipe(rename(function(path){
				path.extname = ".html";
				if (slashOnTheEnd) { path.dirname = path.basename; }
				path.basename = "index";
			}))
			.pipe(gulp.dest(buildFolder));

	};



	//
	//
	//
	var applyTemplate = function(templateFile){

		var tpl = swig.compileFile(path.join(__dirname, templateFile));
		var site = require(TARGET_BLOG + "/site.json");
		site.time = new Date();

		return through.obj(function(file, enc, cb){

			var data = {
				page: file.page,
				site: site,
				content: file.contents.toString()
			};

			file.contents = new Buffer(tpl(data), "utf8");
			this.push(file);

			cb();

		});

	};




	//
	//  Copyrighted by your mom in January 2015 at about 2AM;
	//


})();