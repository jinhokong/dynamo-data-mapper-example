import * as aws from "aws-sdk";
import * as fs from "fs";
import * as uuidv4 from "uuid/v4";
import * as request from "request";
import * as fetch from "node-fetch";
import * as FormData from "form-data";
import * as dotenv from "dotenv";
dotenv.config();

const config = {
  aws: {
    keyId: process.env.KEY,
    keySecret: process.env.SECRET_KEY,
    bucket: "image.cosmee.test.io",
    expire: 100000
  }
};

let s3;

const init = () => {
  aws.config.update({
    signatureVersion: "v4",
    region: "ap-northeast-2",
    accessKeyId: config.aws.keyId,
    secretAccessKey: config.aws.keySecret
  });

  s3 = new aws.S3({ signatureVersion: "v4" });
};

const signFile = () => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: config.aws.bucket,
      Fields: {
        key: uuidv4()
      },
      Expires: config.aws.expire,
      Conditions: [
        ["content-length-range", 0, 20000000], // 10 Mb
        { acl: "public-read" }
      ]
    };
    s3.createPresignedPost(params, (err, data) => {
      resolve(data);
    });
  });
};

const sendFile = (filePath, payload) => {
  console.log(payload);
  const form = new FormData();
  form.append("acl", "public-read");
  for (const field in payload.fields) {
    form.append(field, payload.fields[field]);
  }
  form.append("file", fs.createReadStream(__dirname + `/${filePath}`));
  form.getLength((err, length) => {
    fetch(payload.url, {
      method: "POST",
      body: form,
      headers: {
        "Content-Length": length
      }
    })
      .then(response => {
        return response.text();
      })
      .catch(err => console.log(`Error: ${err}`));
  });
};

init();

const file = "test.png";
const filePath = `${file}`;
signFile()
  .then(payload => {
    sendFile(file, payload);
  })
  .catch(e => console.warn(e));
