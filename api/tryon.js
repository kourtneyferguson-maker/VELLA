const { fal } = require("@fal-ai/client");

fal.config({
  credentials: process.env.FAL_KEY
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  try {
    if (!process.env.FAL_KEY) {
      return res.status(500).json({
        error: "FAL_KEY is missing in Vercel Environment Variables."
      });
    }

    const { humanImage, garmentImage } = req.body || {};

    if (!humanImage || !garmentImage) {
      return res.status(400).json({
        error: "Missing saved try-on template or clothing image."
      });
    }

    const result = await fal.subscribe(
      "fal-ai/kling/v1-5/kolors-virtual-try-on",
      {
        input: {
          human_image_url: humanImage,
          garment_image_url: garmentImage
        },
        logs: true
      }
    );

    const imageUrl =
      result?.data?.image?.url ||
      result?.data?.images?.[0]?.url ||
      result?.image?.url;

    if (!imageUrl) {
      return res.status(500).json({
        error: "No AI image was returned."
      });
    }

    return res.status(200).json({ image: imageUrl });
  } catch (error) {
    return res.status(500).json({
      error: "AI try-on failed.",
      details: error.message
    });
  }
};
