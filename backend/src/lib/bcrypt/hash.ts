import { compare, hash as cypher } from "bcrypt";

export async function hash(text: string) {
  const output = await cypher(text, 8);
  return output;
}

export async function compareTextToHash(text: string, hash: string) {
  const result = await compare(text, hash);

  return result;
}
