const Post=require('../models/post');
const Comment=require('../models/comments');

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    });
    return res.redirect('back');
}
module.exports.destroy=async function(req,res){
  const post=  await Post.findById(req.params.id).exec();
  if(post.user==req.user.id){
    await post.deleteOne();

  }
  await Comment.deleteMany({post:req.params.id});
  return res.redirect('back');

}