// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fileType } = req.body; // Expecting fileType like 'image/jpeg'

    const fileKey = `${nanoid()}.${fileType.split("/")[1]}`; // Unique filename
    const bucketName = process.env.AWS_BUCKET_NAME;

    // Generate presigned URL
    const presignedUrl = s3.getSignedUrl("putObject", {
      Bucket: bucketName,
      Key: fileKey,
      Expires: 60, // URL expires in 60 seconds
      ContentType: fileType,
    });

    // CloudFront URL for accessing the uploaded file
    const fileUrl = `${process.env.CLOUDFRONT_URL}/${fileKey}`;

    res.status(200).json({ presignedUrl, fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate presigned URL" });
  }
}
