import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  base64Data: string,
  folder: string = "uploads"
): Promise<string> {
  // Remove base64 header if present
  const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(cleanBase64, "base64");

  // Generate unique filename
  const filename = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.jpg`;

  // Upload to S3
  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: filename,
    Body: buffer,
    ContentType: "image/jpeg",
  });

  await s3Client.send(uploadCommand);

  // Return CloudFront URL instead of S3 URL
  return `https://${process.env.CLOUDFRONT_DOMAIN}/${filename}`;
}
