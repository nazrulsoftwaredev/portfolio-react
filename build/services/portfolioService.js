import { InquiryModel } from "../models/Inquiry.js";
import { PortfolioProjectModel } from "../models/PortfolioProject.js";
import { TestimonialModel } from "../models/Testimonial.js";
export const createInquiry = async (data) => {
    const inquiry = new InquiryModel(data);
    return await inquiry.save();
};
export const getInquiries = async (query, limit, skip) => {
    const [inquiries, total] = await Promise.all([
        InquiryModel.find(query).sort({ submittedAt: -1 }).skip(skip).limit(limit),
        InquiryModel.countDocuments(query),
    ]);
    return { inquiries, total };
};
export const getPublishedPortfolioProjects = async () => {
    return await PortfolioProjectModel.find({ status: "Published" }).sort({
        featured: -1,
        sortOrder: 1,
    });
};
export const getTestimonials = async () => {
    return await TestimonialModel.find().sort({ featured: -1, sortOrder: 1 });
};
