// import jwt from "jsonwebtoken";
// import Blog from "../models/blog.js";
// import Comment from "../models/Comment.js";

// export const adminLogin = async (req,res)=>{

//     try{
//         const{email,password}=req.body;

//         if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
//             return res.json({success:false,message:"Invalid Crendentials"})
//         }

//         const token =jwt.sign({email},process.env.JWT_SECRET)
//         res.json({success:true,token})

//     }
//     catch(error){
//         res.json({success: false,message: error.message})

//     }

// }

// export const getAllBlogAdmin = async (req,res) => {
//     try{
//         const blogs =await Blog.find({}).sort({createdAt :-1});
//          res.json({success: true,blogs})


//     }
//     catch(error){
//         res.json({success: false,message: error.message})

//     }
// }

// export const getAllComments = async (req,res) => {
//     try{
//         const comments =await Comment.find({}).populate('blog').sort({createdAt :-1});
//          res.json({success: true,comments})


//     }
//     catch(error){
//         res.json({success: false,message: error.message})

//     }
// }

// export const getDashboard = async(req,res)=>{
//     try{
//         const recentBlogs = (await Blog.find({})).toSorted({createdAt: -1}).limit(5);
//         const blogs= await Blog.countDocuments();
//         const comments= await Comment.countDocuments()
//         const draft = await Blog.countDocuments({isPublished: false})

//         const dashboardData = {
//             blogs,comments,draft,recentBlogs
//         }
//          res.json({success: true,dashboardData})

//     }
//     catch(error){
//          res.json({success: false,message: error.message})

//     }
// }

// export const deleteCommentById =  async(req,res) => {
//     try {
//         const {id}=req.body;
//         await comment.findIdAndDelete(id);
//         res.json({success:true ,message:"comment deleted succesfully"})


//     }
//      catch(error){
//          res.json({success: false,message: error.message})

//     }
// }

// export const approveCommentById =  async (req,res) => {
//     try {
//         const {id}=req.body;
//         await comment.findIdAndUpdate(id,{isApproved:true});
//         res.json({success:true ,message:"comment approved succesfully"})


//     }
//      catch(error){
//          res.json({success: false,message: error.message})

//     }
// }

import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllBlogAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getDashboard = async (req, res) => {
    try {
        // Corrected Mongoose chaining to fetch the 5 most recent blogs efficiently
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const draft = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            blogs, comments, draft, recentBlogs
        };
        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        // Case-sensitivity and method name fixed
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "comment deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        // Case-sensitivity and method name fixed
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "comment approved successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};