;(function(){



    "use strict";



	//
	//  This is a Gulpfile for Frontend.sk website generating of markdown files;
	//  All Rights Reversed ;) by Samuel Ondrek in 2015
	//



	//
	//  Requires; Note: Try to avoid the Gulp tasks in future
	//
	var marked = require("gulp-marked");
    var gulp = require("gulp");
	var frontMatter = require("gulp-front-matter");
	var rename = require("gulp-rename");
	var swig = require("swig");
	var through = require("through2");
	var http = require("http");
	var serveStatic = require("serve-static");
	var connect = require("connect");
	var runSequence = require("gulp-run-sequence");
	var rimraf = require("gulp-rimraf");



	//
	//  Constants that are used for generating of files;
	//
	var BLOG_BUILD_DEST = "./b/";
	var POSTS_BUILD_DEST = "./p/";
	var DRAFTS_BUILD_DEST = "./d/";
	var INDEX_BUILD_DEST = ".";
	var TARGET_BLOG = "./#/";





	//
	//
	//
	gulp.task("default", function(cb){

		runSequence(
			[ "clean" ],
			[ "pages", "posts", "drafts", "index" ],
			cb);

	});



	//
	//
	//
	gulp.task("clean", function(cb){

		var toBeRemoved = [
			POSTS_BUILD_DEST,
			DRAFTS_BUILD_DEST,
			BLOG_BUILD_DEST,
			"./index.html"
		];

		return gulp.src(toBeRemoved, {read:false}).pipe(rimraf());

	});




	//
	//  Watch for a change in the target blog (the source of raw files);
	//
	gulp.task("watch", function(){

		gulp.watch([TARGET_BLOG+"/**/*"], ["default"]);
		gulp.watch([TARGET_BLOG+"/*"], ["default"]);

	});




	//
	//
	//
	gulp.task("pages", function(cb){

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
	gulp.task("drafts", function(){

		return parseTemplate(
			TARGET_BLOG+"/drafts/*.md",
			TARGET_BLOG+"/templates/post.html",
			DRAFTS_BUILD_DEST,
			true
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


		var templateWithoutFirstDot = templateFile.substr(1);
		var tpl = swig.compileFile(__dirname + templateWithoutFirstDot);
		var site = require(TARGET_BLOG + "/site.json");
		site.time = +new Date();

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