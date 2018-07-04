import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

const mapper = new DataMapper({
  client: new DynamoDB({
    region: process.env.REGION,
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRET_KEY
  }),
  tableNamePrefix: "test_"
});

export default mapper;
