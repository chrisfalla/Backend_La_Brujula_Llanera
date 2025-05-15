export default class GetReviewsByPlaceUseCase {
  constructor(reviewRepository, userRepository) {
    this.reviewRepository = reviewRepository;
    this.userRepository = userRepository;
  }

  async getReviews(placeId) {
    const reviews = await this.reviewRepository.getReviewsByPlaceId(placeId);
  
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        reviews: [],
      };
    }
  
    const reviewsWithUser = await Promise.all(
      reviews.map(async (review) => {
        const user = await this.userRepository.getUserById(review.idUserFk);
        return {
          idReview: review.idReview,
          comment: review.comment,
          ratingValue: review.ratingValue,
          updatedAt: review.updatedAt,
          user: {
            idUser: user.idUser,
            names: user.names,
            avatar: user.avatar,
          },
        };
      })
    );
  
    const totalRating = reviews.reduce((acc, review) => acc + review.ratingValue, 0);
    const averageRating = totalRating / reviews.length;
  
    return {
      generalInfo: {
        generalRating: averageRating, 
        amountReviews: reviews.length, 
      }, 
      reviews: reviewsWithUser,
    };
  }  
}
