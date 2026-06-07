/**
 * Gemini API service for generating pixel art from photos.
 * Uses Gemini 2.0 Flash Experimental with image generation capabilities.
 */

// Gunakan model Flash yang stabil dan gratis untuk pemrosesan teks/JSON
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
  
function getApiKey(): string {
  // First check env variable
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== "your_api_key_here") return envKey;

  // Fallback: check localStorage (user can paste key in UI)
  const storedKey = localStorage.getItem("gemini_api_key");
  if (storedKey) return storedKey;

  return "";
}

export function hasApiKey(): boolean {
  return getApiKey().length > 0;
}

export function setApiKey(key: string): void {
  localStorage.setItem("gemini_api_key", key);
}

export function getStoredApiKey(): string {
  return localStorage.getItem("gemini_api_key") || "";
}

/**
 * Convert a File to base64 string (without the data URI prefix).
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove "data:image/...;base64," prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convert a base64 image data URL to base64 string (without the data URI prefix).
 */
function dataUrlToBase64(dataUrl: string): string {
  return dataUrl.split(",")[1];
}

function getMimeType(file: File): string {
  return file.type || "image/png";
}

export interface GeneratePixelArtOptions {
  style: "pixel-art" | "cartoon" | "game" | "ghibli";
  /** Optional custom prompt addition */
  customPrompt?: string;
}

const STYLE_PROMPTS: Record<string, string> = {
  "pixel-art": `Convert this photo of a person into a cute pixel art character sprite. 
Make it look like a retro game character or avatar. 
Use clean pixel art style with visible pixel blocks. 
Keep the person's recognizable features (glasses, hair, clothing). 
The character should be in a friendly pose.
Remove the background completely and make it transparent/white.
The result should look like a professional pixel art game character.`,

  cartoon: `Convert this photo of a person into a cute cartoon pixel art character. 
Make it look like an animated cartoon character in pixel art style.
Use bold outlines and vivid, saturated colors.
Keep the person's recognizable features (glasses, hair, clothing).
The character should be in a friendly, expressive pose.
Remove the background completely and make it transparent/white.
The result should look like a cartoon character from a pixel art game.`,

  game: `Convert this photo of a person into a retro video game character sprite in pixel art style.
Make it look like a classic 16-bit or 32-bit game character.
Use a limited color palette typical of retro games.
Keep the person's recognizable features (glasses, hair, clothing).
The character should be in an action or idle game pose.
Remove the background completely and make it transparent/white.
The result should look like it belongs in a classic RPG or adventure game.`,

  ghibli: `Convert this photo of a person into a Studio Ghibli-inspired pixel art character.
Make it look like a character from a Ghibli movie rendered in pixel art style.
Use warm, pastel colors with soft tones typical of Ghibli animation.
Keep the person's recognizable features (glasses, hair, clothing).
The character should have a gentle, warm expression.
Remove the background completely and make it transparent/white.
The result should feel dreamy and whimsical like Ghibli art in pixel form.`,
};

/**
 * Generate pixel art from a photo using Gemini API.
 * Returns a base64 data URL of the generated image.
 */
export async function generatePixelArt(
  imageSource: File | string, // File or data URL
  options: GeneratePixelArtOptions,
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("No Gemini API key configured. Please add your API key.");
  }

  let base64Data: string;
  let mimeType: string;

  if (imageSource instanceof File) {
    base64Data = await fileToBase64(imageSource);
    mimeType = getMimeType(imageSource);
  } else {
    base64Data = dataUrlToBase64(imageSource);
    // Try to extract mime type from data URL
    const match = imageSource.match(/^data:([^;]+);/);
    mimeType = match ? match[1] : "image/png";
  }

  const prompt =
    STYLE_PROMPTS[options.style] || STYLE_PROMPTS["pixel-art"];
  const fullPrompt = options.customPrompt
    ? `${prompt}\n\nAdditional instructions: ${options.customPrompt}`
    : prompt;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: fullPrompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data,
            },
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.error?.message || `API error: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();

  // Extract image from response
  const candidates = data.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("No response from Gemini API");
  }

  const parts = candidates[0].content?.parts;
  if (!parts) {
    throw new Error("Unexpected response format from Gemini API");
  }

  // Find the image part in the response
  for (const part of parts) {
    if (part.inline_data) {
      const mime = part.inline_data.mime_type || "image/png";
      return `data:${mime};base64,${part.inline_data.data}`;
    }
  }

  throw new Error(
    "Gemini API did not return an image. It may have returned text only. Try again or use a different style.",
  );
}
