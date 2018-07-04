import { embed } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";

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

export { BlogPost, Comment };
