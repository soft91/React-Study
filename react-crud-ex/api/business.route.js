const express = require('express');
const businessRoutes = express.Router();

let Business = require('./business.model');

// 추가
businessRoutes.route('/add').post( (req, res) => {
    let business = new Business(req.body);
    business.save()
        .then(business => {
            res.status(200).json({'business' : 'business in added successfully'});
        })
        .catch(err => {
            res.status(400).send('unable to save to database');
        });
});

// 데이터 받아오기
businessRoutes.route('/').get((req, res) => {
    Business.find((err, businesses) => {
        if(err){
            console.log(err);
        }else{
            res.json(businesses);
        }
    });
});

businessRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Business.findById(id, function(err, business){
        res.json(business);
    })
})

// 수정
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;

        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// 제거
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;