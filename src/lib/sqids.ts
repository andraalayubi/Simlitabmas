import Sqids from "sqids";

const sqids = new Sqids({ minLength: 10 });

const encode = (id: number) => sqids.encode([id]);
const decode = (id: string) => sqids.decode(id)[0];

export { encode, decode };