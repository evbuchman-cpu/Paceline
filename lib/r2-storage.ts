import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { logger } from "@/lib/logger";

// Configure S3 client for Cloudflare R2
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Upload a file buffer to Cloudflare R2
 * @param buffer - The file buffer to upload
 * @param fileName - The file path/name in R2 (e.g., "guides/abc123.pdf")
 * @param contentType - The MIME type of the file (defaults to application/pdf)
 * @returns The public URL of the uploaded file
 */
export async function uploadToR2(
  buffer: Buffer,
  fileName: string,
  contentType: string = "application/pdf"
): Promise<string> {
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicDomain = process.env.R2_PUBLIC_DOMAIN;

  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME environment variable is required");
  }

  if (!publicDomain) {
    throw new Error("R2_PUBLIC_DOMAIN environment variable is required");
  }

  if (!process.env.CLOUDFLARE_ACCOUNT_ID) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID environment variable is required");
  }

  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    throw new Error("R2 credentials (R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) are required");
  }

  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: contentType,
        // Set cache control for performance
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    // Return the public URL
    const publicUrl = `https://${publicDomain}/${fileName}`;
    return publicUrl;
  } catch (error) {
    logger.error("Error uploading to R2", error, {
      fileName,
      contentType,
      bufferSize: buffer.length,
    });

    if (error instanceof Error) {
      throw new Error(`Failed to upload to R2: ${error.message}`);
    }

    throw new Error("Failed to upload to R2: Unknown error");
  }
}

/**
 * Delete a file from Cloudflare R2
 * @param fileName - The file path/name in R2 to delete
 */
export async function deleteFromR2(fileName: string): Promise<void> {
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME environment variable is required");
  }

  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      })
    );
  } catch (error) {
    logger.error("Error deleting from R2", error, { fileName });

    if (error instanceof Error) {
      throw new Error(`Failed to delete from R2: ${error.message}`);
    }

    throw new Error("Failed to delete from R2: Unknown error");
  }
}

/**
 * Generate a unique file name for a guide PDF
 * @param questionnaireId - The questionnaire ID
 * @returns A unique file path for the PDF
 */
export function generateGuidePdfFileName(questionnaireId: string): string {
  const timestamp = Date.now();
  return `guides/${questionnaireId}-${timestamp}.pdf`;
}
