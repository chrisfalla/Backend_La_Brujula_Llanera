export default class AddCommentUseCase {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async addComment(userId, placeId, comment, ratingValue) {
    const existingReview = await this.reviewRepository.getReviewByUserId(userId, placeId);
    if (existingReview) {
      this.reviewRepository.updateCommentByPlace(userId, placeId, comment, ratingValue);
      return "Comment updated successfully";
    }
    const newReview = await this.reviewRepository.addCommentByPlace(userId, placeId, comment, ratingValue);
    if (!newReview) {
      throw new Error("Failed to add comment");
    }
    return "Comment added successfully";
    
  }
}