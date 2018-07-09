import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as uuidv4 from "uuid/v4";
import * as https from "https";

dotenv.config();
AWS.config.update({
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET_KEY
});

const s3 = new AWS.S3({ region: "ap-northeast-2" });

var file = require("fs").createWriteStream("testtest.png");
var params = {
  Bucket: "image.cosmee.io",
  Key: "9edae930-0ac4-484b-b77f-771447522278"
};
s3.getObject(params)
  .createReadStream()
  .pipe(file);
