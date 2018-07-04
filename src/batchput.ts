import mapper from "./mapper";
import { BlogPost } from "./class";

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
