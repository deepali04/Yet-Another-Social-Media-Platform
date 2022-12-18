/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const express = require("express");
const router = express.Router();

const followersData = require('../data/followers');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
const followingsData = require("../data/followings");

  // router
  // .route('/')
  // .get(async (req, res) => {
  //   try {
    
  //     let userId = req.session.user._id.toString();
  //     userId = userId.trim();
  //     if(validatiion.validString(userId,"ID"));
  //     if(validatiion.validObjectId(userId,"ID"));
  //     const followers = await followersData.getFollowers(userId);
      
  //     res.json(followers);
  //   } 
  //   catch (e) {
  //     if(typeof(e)==='object'){
  //         res.status(404).send(e);       
  //     }
  //     else{
  //       res.status(400).send(e);
  //     }
  //   } 
  // });
  router
  .route('/followersandfollowing')
  .get(async (req, res) => {
    try {
    
      let userId = req.session.user._id.toString();
      userId = userId.trim();
      if(validatiion.validString(userId,"ID"));
      if(validatiion.validObjectId(userId,"ID"));
      const followers = await followersData.getFollowersAndFollowing(userId);
      // console.log(followers);
      res.json(followers);
    } 
    catch (e) {
      // console.log(e);
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else{
        res.status(400).send(e);
      }
    } 
  });

router.route("/").get(async (req, res) => {
  try {
    if (validatiion.validObjectId("639518baec8160da0010d848", "ID"));
    // req.params.userId = req.params.userId.trim();
    const followers = await followersData.getFollowers(
      "639518baec8160da0010d848"
    );
    res.json(followers);
  } catch (e) {
    if (typeof e === "object") {
      res.status(404).send(e);
    } else {
      res.status(400).send(e);
    }
  }
});

router.route("/follow").post(async (req, res) => {
  const ids = req.body;
  
  try {
    validatiion.validObjectId("639518baec8160da0010d848", "ID");
    validatiion.validObjectId("63963928ac02e3a9db204155", "ID");

    const follow = await followersData.follow("639518baec8160da0010d848", ids.id);
    res.send(follow);
  } catch (e) {
    console.log(e)
    res.status(404).send(e);
  }
});

router.route("/unfollow").delete(async (req, res) => {
  try {
    const toBeDeleted = req.body;
    const deleted = await followingsData.unfollow(
      toBeDeleted.senderId,
      toBeDeleted.receiverId
    );

    res.send(deleted);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;