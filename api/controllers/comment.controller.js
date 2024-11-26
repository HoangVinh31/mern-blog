export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to comment on this post")
      );
      const newComment = new Comment({
        content,
        postId,
        userId,
      });
    }
  } catch (error) {
    next(error);
  }
};
