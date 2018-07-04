import mapper from "./mapper";
import { BlogPost } from "./class";

const toSave = Object.assign(new BlogPost(), {
  id: "foo",
  author: "author",
  replies: [{ text: "text" }]
});
mapper.put(toSave).then(objectSaved => {
  console.log(objectSaved);
});
