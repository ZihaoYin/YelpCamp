const express = require('express')
const router = express.Router({mergeParams: true});

const catchAsync = require('../utilis/catchAsync')
const ExpressError = require('../utilis/ExpressError')

const reviews = require('../controllers/reviews')


const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleWare')

router.post('/',isLoggedIn,validateReview, catchAsync(reviews.newReview))

router.delete('/:reviewId', isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))



module.exports = router;