var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    User = require('../model/user');

// Index page
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/tabs', function(req, res, next) {
  var username = 'ashok.kumar6@wipro.com';
  User.getTabs(username, function(data){
    var result = {
      dashboards: data.dashboards[0].tabs,
      theme: data.preferences[0].theme,
      name: username
    };
    res.send(result);
  });
});

router.get('/dashboards', function(req, res, next) {
   var username = 'ashok.kumar6@wipro.com';//req.user;
   User.getDashboard(username, function(data){
      res.send(data);
   });
});

router.get('/changeTheme/:userTheme', function(req, res, next) {
   var userTheme = req.params.userTheme;
   User.setUserTheme(req.user.emailId, userTheme);
});

module.exports = router;
