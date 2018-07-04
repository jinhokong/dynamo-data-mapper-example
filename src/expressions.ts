import mapper from "./mapper";
import { BlogPost } from "./class";
import { between } from "@aws/dynamodb-expressions";

const expressions = async () => {
  const iterator = mapper.query({
    valueConstructor: BlogPost,
    keyCondition: {
      id: "bar1",
      createdAt: between(1000000, 9999999999)
    }
  });

  for await (const post of iterator) {
    console.log(post);
  }
};
expressions();
