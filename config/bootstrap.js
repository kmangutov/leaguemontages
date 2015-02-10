/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var util = require('util');
var fixtures = require('../custom_modules/fixtures');
var fs = require('fs'),
    path = require('path');

//input e.g. fixtureBadgeType

module.exports.bootstrap = function(cb) {
  var postsSrc = path.join(process.cwd(), 'assets/cdn');
  var postDst = path.join(process.cwd(), '.tmp/public/cdn');
  sails.log(postsSrc);
  fs.symlink(postsSrc, postDst, function(err){
    if(err)
        sails.log(err);
  });

  fixtures.run();

  cb();
};
