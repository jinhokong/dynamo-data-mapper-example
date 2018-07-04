import { DataMapper, embed } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import {
  attribute,
  hashKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";

const mapper = new DataMapper({
  client: new DynamoDB({
    region: "ap-northeast-2"
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
const toSave = [
  Object.assign(new BlogPost(), { id: "foo1" }),
  Object.assign(new BlogPost(), { id: "bar" })
];
const batch = async toSave => {
  for await (const persisted of mapper.batchPut(toSave)) {
    console.log(persisted);
  }
};
batch(toSave);
