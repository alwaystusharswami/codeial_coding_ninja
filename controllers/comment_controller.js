const Post=require('../models/post');
const Comment=require('../models/comments');

module.exports.create=async function(req,res){
   const post= await Post.findById(req.body.post);
   if(post){
   const comment=await Comment.create({
        content:req.body.content,
        post:req.body.post,
        user:req.user.id
    });
    post.comment.push(comment);
    post.save();
   }
   return res.redirect('/');
}