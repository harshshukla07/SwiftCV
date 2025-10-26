import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

//controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) =>
{
    try
    {
        const { userContent } = req.body;

        if (!userContent)
        {
            return res.status(400).json({ message: "Content is required" });
        }

        if (!process.env.OPENAI_MODEL)
        {
            return res.status(500).json({ message: "AI service configuration missing" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer specializing in creating compelling professional summaries. Transform the provided content into a powerful executive summary following these guidelines:\n\n1. CRAFT 2-3 sentences (40-60 words total)\n2. LEAD with your most impressive credential or achievement\n3. HIGHLIGHT 2-3 core competencies relevant to target roles\n4. INCLUDE industry-specific keywords for ATS optimization\n5. QUANTIFY experience (years, team size, revenue impact) when possible\n6. AVOID generic phrases like 'hardworking' or 'team player'\n7. USE third-person perspective (no 'I' statements)\n8. END with your unique value proposition\n\nStructure: [Professional Title] with [X years] experience in [Industry/Function] + [Key Achievement] + [Core Skills] + [Value Add]\n\nExample: 'Senior Marketing Manager with 8+ years driving digital growth strategies, increasing lead generation by 150% across Fortune 500 clients. Expert in SEO, PPC, and marketing automation with proven ability to scale revenue from $2M to $15M.'\n\nReturn ONLY the enhanced summary without explanations or additional text."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content;

        return res.status(200).json({ enhancedContent });
    } catch (error)
    {
        return res.status(400).json({ message: error.message });

    }
};

//controller for enhancing resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) =>
{
    try
    {
        const { userContent } = req.body;

        if (!userContent)
        {
            return res.status(400).json({ message: "Content is required" });
        }

        if (!process.env.OPENAI_MODEL)
        {
            return res.status(500).json({ message: "AI service configuration missing" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer specializing in ATS-optimized content. Transform the provided job description into compelling resume bullet points following these strict guidelines:\n\n1. START each bullet with a strong action verb (Led, Developed, Implemented, Achieved, etc.)\n2. QUANTIFY results with specific metrics, percentages, or numbers whenever possible\n3. FOCUS on accomplishments and impact, not just duties\n4. USE industry-specific keywords relevant to the role\n5. KEEP each bullet point 15-25 words maximum\n6. AVOID first-person pronouns (I, me, my)\n7. EMPHASIZE transferable skills and technical competencies\n8. STRUCTURE as: Action Verb + What You Did + How/Why + Quantified Result\n\nExample format: 'Streamlined inventory management processes, reducing operational costs by 25% and improving accuracy to 99.8%'\n\nReturn ONLY the enhanced bullet points in clean, professional format without explanations, emojis, or additional text."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content;

        return res.status(200).json({ enhancedContent });
    } catch (error)
    {
        return res.status(400).json({ message: error.message });

    }

};

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) =>
{

    try
    {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        // Enhanced input validation
        if (!resumeText || !title || !userId)
        {
            const missingFields = [];
            if (!resumeText) missingFields.push('resumeText');
            if (!title) missingFields.push('title');
            if (!userId) missingFields.push('userId');

            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        if (title.trim().length === 0)
        {
            return res.status(400).json({ message: "Title cannot be empty" });
        }

        if (resumeText.trim().length === 0)
        {
            return res.status(400).json({ message: "Resume text cannot be empty" });
        }

        // Check for OpenAI model configuration
        if (!process.env.OPENAI_MODEL)
        {
            return res.status(500).json({ message: "AI service configuration missing" });
        }

        const systemPrompt = `You are an expert resume data extraction specialist. Extract and structure ALL information from the provided resume text into the following JSON format. Be thorough and accurate - extract every piece of relevant information available.

REQUIRED JSON STRUCTURE:
{
  "title": "Extract or generate appropriate resume title",
  "professional_summary": "Extract professional summary/objective (full text)",
  "skills": ["skill1", "skill2", "skill3", ...], 
  "personal_info": {
    "full_name": "Full name of the person",
    "profession": "Job title/profession",
    "email": "Email address",
    "phone": "Phone number", 
    "location": "City, State or full address",
    "linkedin": "LinkedIn URL or profile",
    "website": "Personal website/portfolio URL"
  },
  "experience": [
    {
      "company": "Company name",
      "position": "Job title/position",
      "start_date": "MM/YYYY or Month Year format",
      "end_date": "MM/YYYY or 'Present' if current",
      "description": "Full job description/responsibilities",
      "is_current": true/false
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "type": "Project type/category", 
      "description": "Project description and technologies used"
    }
  ],
  "education": [
    {
      "institution": "School/University name",
      "degree": "Degree type (Bachelor's, Master's, etc.)",
      "field": "Field of study/major",
      "graduation_date": "MM/YYYY or Month Year",
      "gpa": "GPA if mentioned"
    }
  ]
}

EXTRACTION GUIDELINES:
1. EXTRACT every piece of information available - don't leave fields empty if data exists
2. STANDARDIZE date formats to MM/YYYY
3. SEPARATE skills into individual array items (no comma-separated strings)
4. PRESERVE original wording for descriptions and summaries
5. INFER missing information logically when obvious (e.g., if someone says "Software Engineer at Google" extract company: "Google", position: "Software Engineer")
6. HANDLE multiple entries for experience, education, projects appropriately
7. SET is_current to true only if explicitly stated as current/present position
8. EXTRACT URLs in full format when available
9. CLEAN UP formatting but preserve content meaning
10. RETURN only valid JSON - no explanations, comments, or additional text

If any field has no corresponding information in the resume, use empty string "" for strings, empty array [] for arrays, or false for booleans.`

        const userPrompt = `Please extract and structure all available information from the following resume text. Pay special attention to:

1. Personal contact information (name, email, phone, location, LinkedIn, websites)
2. Professional summary or objective statements
3. All work experience with companies, positions, dates, and detailed descriptions
4. Educational background including institutions, degrees, fields of study, and graduation dates
5. Technical and soft skills mentioned throughout the document
6. Projects, certifications, or notable achievements
7. Any dates should be converted to MM/YYYY format
8. Current positions should be marked appropriately

Resume Text:
${resumeText}

Return the extracted data in the specified JSON format with all available information populated. 

IMPORTANT: Your response must be ONLY valid JSON, no additional text or explanations before or after the JSON.`

        let response;
        try
        {
            response = await ai.chat.completions.create({
                model: process.env.OPENAI_MODEL,
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: userPrompt
                    },
                ]
            });
        } catch (aiError)
        {
            console.error('Gemini API Error:', aiError.message);

            // Check if it's a quota/billing error
            if (aiError.message.includes('quota') || aiError.message.includes('billing'))
            {
                return res.status(402).json({
                    message: "AI service quota exceeded. Please check your Gemini API billing settings."
                });
            }

            // Check if it's an authentication error
            if (aiError.message.includes('401') || aiError.message.includes('authentication'))
            {
                return res.status(401).json({
                    message: "AI service authentication failed. Please check your API key."
                });
            }

            // Generic AI service error
            return res.status(503).json({
                message: "AI service temporarily unavailable. Please try again later.",
                error: aiError.message
            });
        }

        // Parse JSON response with error handling
        let extractedData;
        try
        {
            let responseContent = response.choices[0].message.content.trim();

            // Remove markdown code block formatting if present
            if (responseContent.startsWith('```json'))
            {
                responseContent = responseContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            } else if (responseContent.startsWith('```'))
            {
                responseContent = responseContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
            }

            extractedData = JSON.parse(responseContent);
        } catch (parseError)
        {
            console.error("JSON parsing error:", parseError.message);
            return res.status(500).json({
                message: "Failed to parse AI response - response may not be valid JSON",
                error: parseError.message,
                rawResponse: response.choices[0].message.content.substring(0, 500)
            });
        }

        // Validate that we have the expected structure
        if (!extractedData || typeof extractedData !== 'object')
        {
            return res.status(500).json({
                message: "Invalid data structure returned from AI",
                extractedData
            });
        }

        // Create new resume with extracted data and proper fallbacks
        const newResume = await Resume.create({
            userId,
            title: extractedData.title || title, // Use extracted title or fallback to provided title
            professional_summary: extractedData.professional_summary || "",
            skills: Array.isArray(extractedData.skills) ? extractedData.skills : [],
            personal_info: {
                image: "",
                full_name: extractedData.personal_info?.full_name || "",
                profession: extractedData.personal_info?.profession || "",
                email: extractedData.personal_info?.email || "",
                phone: extractedData.personal_info?.phone || "",
                location: extractedData.personal_info?.location || "",
                linkedin: extractedData.personal_info?.linkedin || "",
                website: extractedData.personal_info?.website || "",
            },
            experience: Array.isArray(extractedData.experience) ? extractedData.experience : [],
            projects: Array.isArray(extractedData.projects) ? extractedData.projects : [],
            education: Array.isArray(extractedData.education) ? extractedData.education : []
        });

        return res.status(201).json({
            message: "Resume uploaded and processed successfully",
            resume: newResume
        });
    } catch (error)
    {
        console.error('Upload resume error:', error.message);
        return res.status(400).json({ message: error.message });

    }

};