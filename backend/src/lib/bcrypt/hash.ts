import { hash as cypher } from "bcrypt";

export default async function hash(text: string) {
  const output = await cypher(text, 8);
  return output;
}
