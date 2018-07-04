import mapper from "./mapper";
import { BlogPost } from "./class";

const toSave = [
  Object.assign(new BlogPost(), { id: "bar1" }),
  Object.assign(new BlogPost(), { id: "bar2" }),
  Object.assign(new BlogPost(), { id: "bar3" }),
  Object.assign(new BlogPost(), { id: "bar4" }),
  Object.assign(new BlogPost(), { id: "bar5" }),
  Object.assign(new BlogPost(), { id: "bar6" }),
  Object.assign(new BlogPost(), { id: "bar7" }),
  Object.assign(new BlogPost(), { id: "bar8" }),
  Object.assign(new BlogPost(), { id: "bar9" }),
  Object.assign(new BlogPost(), { id: "bar0" })
];
const batch = async toSave => {
  for await (const persisted of mapper.batchPut(toSave)) {
    console.log(persisted);
  }
};
batch(toSave);
