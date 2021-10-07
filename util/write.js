export const write = (s) => {
  const contentBytes = new TextEncoder().encode(s);
  Deno.writeAllSync(Deno.stdout, contentBytes);
}
