import { DataMapper, embed } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import {
  attribute,
  hashKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";

const mapper = new DataMapper({
  client: new DynamoDB({
    region: process.env.REGION,
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRET_KEY
  }),
  tableNamePrefix: "test_"
});

class Comment {
  @attribute() author?: string;

  @attribute() postedAt?: Date;

  @attribute() text?: string;
}

@table("posts")
class BlogPost {
  @hashKey() id: string;

  @attribute() author?: string;

  @attribute() postedAt?: Date;

  @attribute() text?: string;

  @attribute({ memberType: embed(Comment) })
  replies?: Array<Comment>;
}
mapper.createTable(BlogPost, {
  readCapacityUnits: 1,
  writeCapacityUnits: 1,
  streamViewType: "NONE"
});
