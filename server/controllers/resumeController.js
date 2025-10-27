import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";


// controller for resume related operations
// POST: /api/resumes/create


export const createResume = async (req, res) =>
{
    try
    {
        const userId = req.userId;
        const { title } = req.body;

        // create new resume
        const newResume = await Resume.create({
            userId,
            title,
        });

        return res.status(201).json({ message: "Resume created successfully", resume: newResume });

    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
};

// controller for deleting a resume
// DELETE: /api/resumes/delete

export const deleteResume = async (req, res) =>
{
    try
    {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId });

        return res.status(200).json({ message: "Resume deleted successfully" });

    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
};

// get user resume by ID
// GET: /api/resumes/get

export const getResumeById = async (req, res) =>
{
    try
    {
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ userId, _id: resumeId });
        if (!resume)
        {
            return res.status(404).json({ message: "Resume not found" });
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        return res.status(200).json({ resume });
    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
};

// get resume by ID public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) =>
{
    try
    {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ _id: resumeId, public: true });
        if (!resume)
        {
            return res.status(404).json({ message: "Resume not found or is not public" });
        }

        return res.status(200).json({ resume });
    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
};

// controller for updating resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) =>
{
    try
    {
        const userId = req.userId;

        const { resumeId, resumeData, removeBackground } = req.body;

        const image = req.file;
        let resumeDataCopy;

        if (typeof resumeData === 'string')
        {
            resumeDataCopy = JSON.parse(resumeData);
        } else
        {
            resumeDataCopy = structuredClone(resumeData);
        }

        if (image)
        {
            const imageBufferData = fs.createReadStream(image.path);
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300, h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
                }
            });

            resumeDataCopy.personal_info.image = response.url;
        }


        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true }
        );
        return res.status(200).json({ message: "Resume updated successfully", resume });

    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
};

// controller for duplicating a resume
// POST: /api/resumes/duplicate

export const duplicateResume = async (req, res) =>
{
    try
    {
        const userId = req.userId;
        const { resumeId } = req.body;  

        
        const originalResume = await Resume.findOne({ userId, _id: resumeId });
        if (!originalResume)
        {
            return res.status(404).json({ message: "Resume not found" });
        }

        
        const resumeData = originalResume.toObject();
        delete resumeData._id;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;
        delete resumeData.__v;

        let newTitle;
        let counter = 1;
        const originalTitle = originalResume.title;

        if (originalTitle.includes('(Copy'))
        {
            const match = originalTitle.match(/^(.+) \(Copy( \d+)?\)$/);
            newTitle = match ? `${match[1]} (Copy)` : `${originalTitle} (Copy)`;
        } else
        {
            newTitle = `${originalTitle} (Copy)`;
        }

        while (true)
        {
            const existingResume = await Resume.findOne({ userId, title: newTitle });
            if (!existingResume)
            {
                break; 
            }

            counter++;
            const baseName = originalTitle.includes('(Copy')
                ? originalTitle.match(/^(.+) \(Copy/)[1]
                : originalTitle;
            newTitle = `${baseName} (Copy ${counter})`;
        }

        resumeData.title = newTitle;

        const duplicatedResume = await Resume.create(resumeData);

        return res.status(201).json({
            message: "Resume duplicated successfully",
            resume: duplicatedResume
        });

    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
};


