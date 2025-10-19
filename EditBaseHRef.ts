/**
 * - Edit Base HRefs for HTML Files
 *
 * Edits the href of all the HTML files' <base> elements.
 * Adds a <base> element if it doesn't exist.
 */

/**
 * Get an iterate for all html files.
 */
async function* getHtmlFiles(
  dir: string,
): AsyncGenerator<Deno.DirEntry & { path: string }> {
  for await (const entry of Deno.readDir(dir)) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory) {
      yield* getHtmlFiles(path);
    } else if (entry.isFile && entry.name.toLowerCase().endsWith(".html")) {
      yield { ...entry, path };
    }
  }
}

/**
 * Actually edits the base.href for the HTML file.
 */
async function processHtmlFile(path: string, newHRef: string) {
  let content = await Deno.readTextFile(path);

  const baseRegex = /<base [^>]*>/i;
  const headRegex = /<head [^>]*>/i;

  if (baseRegex.test(content)) {
    content = content.replace(baseRegex, `<base href="${newHRef}">`);
    console.log(`Updated <base> in: ${path}`);
  } else {
    const headMatch = content.match(headRegex);
    if (headMatch) {
      content = content.replace(
        headRegex,
        `<base href="${newHRef}">\n${headMatch[0]}`,
      );
      console.log(`Inserted <base> in: ${path}`);
    } else {
      console.error(`No <head> found in ${path}.`);
      Deno.exit(1);
    }
  }

  await Deno.writeTextFile(path, content);
}

/**
 * Gets the two arguments or prints an error message if they don't exist.
 */
function getArguments(): [string, string] {
  if (Deno.args.length !== 2) {
    console.error(
      "Two arguments expected.\ndeno run edit-base-href <folder> <new-href-path>",
    );
    Deno.exit(1);
  }
  return [Deno.args[0], Deno.args[1]];
}

/**
 * Main function
 */
async function main() {
  const [directory, newHRef] = getArguments();
  for await (const entry of getHtmlFiles(directory)) {
    await processHtmlFile(entry.path, newHRef);
  }
}

main();
