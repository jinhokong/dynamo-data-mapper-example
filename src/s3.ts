import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as uuidv4 from "uuid/v4";
import * as https from "https";
const url = require("url");

dotenv.config();
AWS.config.update({
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET_KEY
});

const s3 = new AWS.S3({
  region: "ap-northeast-2",
  signatureVersion: "v4"
});
const presigned = s3.getSignedUrl("putObject", {
  Bucket: "image.cosmee.io",
  Key: uuidv4()
});

console.log(presigned);
const options = url.parse(presigned);
options.method = "PUT";

const stream = https.request(options);
stream.on("response", res => {
  console.log(res.statusCode);
  res.pipe(process.stdout);
});

stream.end(fs.readFileSync(`${__dirname}/test.png`));
