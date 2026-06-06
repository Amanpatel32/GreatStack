// import fs from 'fs'
// import imagekit from '../configs/imageKit.js';
// import imageKit from 'imagekit';
// import Blog from '../models/blog.js'
// import comment from '../models/Comment.js';


// export const addBlog = async  (req,res) =>{
//     try{
//         const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
//         const imageFile =req.file;

//         //check if all fields are present

//         if(!title || !description || !category || !imageFile){
//             return res.json({success:false,message:"missing required fields"})
//         }
           
//            const fileBuffer =fs.readFileSync(imageFile.path)
//            //upload image to imagekit
//            const response =await imagekit.upload({
//             file:fileBuffer,
//             fileName:imageFile.originalname,
//             folder:"/blogs"
//            })

//            //optimize through  imagekit url transformation

//            const optimizedImageUrl = imagekit.url({
//             path : response.filePath,
//             transformation:[
//                 {quality: 'auto'},//auto compression
//                 {format:'webp'},//convert to modern format
//                 {width:'1280'}//width resizing
//             ]
//            });

//            const image=optimizedImageUrl;

//            await Blog.create({title,subTitle,description,category,image,isPublished})

//            res.json({success: true ,message:"Blog added successfully"})




//     }
//     catch(error){

//          res.json({success: false ,message:error.message})

//     }
// }

// export const getAllBlogs = async (req,res)=>{
//     try{

//         const blogs =await Blog.find({isPublished:true})
//         res.json({success: true ,blogs})

//     }
//     catch(error){
//         res.json({success:false,message:error.message})

//     }
// }


// export const getBlogById =async (req,res) =>{
//     try{

//         const {blogId} =req.params;
//         const blog =await Blog.findById(blogId)
// if(!blog){
//     return res.json({success:false ,message:"Blog not Found"});
// }
// res.json({success:true,blog})

//     }
//     catch(error){
//         res.json({success:false, message:error.message})

//     }
// }


// export const deleteBlogId =async (req,res) =>{
//     try{

//         const {id} =req.body;
//         await Blog.findByIdAndDelete(id);

//         //delete all comment associated with the blog
//         await comment.deleteMany({blog:id});

// res.json({success:true,message:"Blog deleted successfully"})

//     }
//     catch(error){
//         res.json({success:false, message:error.message})

//     }
// }


// export const togglePublish = async (req,res) =>{
//     try{
   
//          const { id } =req.body;
//         const blog =await Blog.findById(id);
//         blog.isPublished =!breaklog.isPublished;
//         await blog.save();
//         res.json({success:true,message:"Blog status updated"})
//     }
//     catch(error){
//          res.json({success:false, message:error.message})

//     }
// }

// export const addComment = async (req,res)=>{
//     try{

//         const{blog,name,content}=req.body;
//         await Comment.create({blog,name,content})

//          res.json({success:true, message:"Comment added for review"})
//     }
//     catch(error){
//           res.json({success:false, message:error.message})

//     }
// }

// export const getBlogComments = async (req,res)=>{

//     try{
//         const {blogId}=req.body;
//         const comments =await comment.find({blog:blodId,isApproved:true}).sort
//         ({createdAt:-1});
//         res.json({success:true,comments})

//     }
//     catch(error){

//          res.json({success:false, message:error.message})

//     }
// }





import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/Comment.js'; // Capitalized model reference
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "missing required fields" });
        }
           
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({ title, subTitle, description, category, image, isPublished });
        res.json({ success: true, message: "Blog added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not Found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteBlogId = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        // Fixed lowercase typo
        await Comment.deleteMany({ blog: id });
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        
        // Fixed 'breaklog' typo
        blog.isPublished = !blog.isPublished;
        await blog.save();
        
        res.json({ success: true, message: "Blog status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: "Comment added for review" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        
        // Fixed 'blodId' typo and cleaned up syntax line breaks
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const generateContent = async (req,res) => {

    try {
         const {prompt}=req.body;
       const content=  await main(prompt + 'Generate a blog content for this Topic in simple text format ')

       res.json({success:true,content})

    } catch (error) {

        res.json({success:false,message:error.message})
        
    }
   

}