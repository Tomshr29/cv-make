import Post from "#models/post";
import type { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

export default class UpdatePostsController {
  static firstValidator = vine.compile(
    vine.object({
      jobTitle: vine.string(),
      firstName: vine.string(),
      lastName: vine.string(),
      email: vine.string(),
      phone: vine.string(),
      address: vine.string(),
    }),
  );

  static secondValidator = vine.compile(
    vine.object({
      summary: vine.string(),
    }),
  );

  index({ inertia, params }: HttpContext) {
    const postId = params.id;
    const post = Post.query().where("id", postId);
    return inertia.render("posts/show", { post });
  }

  public async update({ params, request, response }: HttpContext) {
    const postId = params.id;
    const post = await Post.findOrFail(postId);

    try {
      if (request.input("form_step") === "PersonalDetail") {
        const payload = await request.validateUsing(
          UpdatePostsController.firstValidator,
        );
        post.merge(payload);
      } else if (request.input("form_step") === "Summary") {
        const payload = await request.validateUsing(
          UpdatePostsController.secondValidator,
        );
        post.merge(payload);
      }

      await post.save();
      return response.redirect().back();
    } catch (error) {
      // Handle validation errors or other errors here
      console.error(error);
      return response.status(400).send("Validation failed");
    }
  }
}
