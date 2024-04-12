# df-cli
Aggregation of CLI routines for various development processes

## For any/all runs within

- runs always start with `tsc && ./.tsc/run/my-file.js` where `my-file.js` contains your yargs scripts
- if new run file (my-file.ts) then first `./nufile.sh` to `chmod a+x ...` as reqd
- common code shared between runs goes in `src/util/common.ts`
- all objects typed via `src/types.ts`

## Creating Lorem Ipsum Content

- start by cloning from rocket-template
- watch this 4 minutes for an example https://youtu.be/mzCaSm5xsfE 
- `tsc && ./.tsc/run/rocket-lorem.js -d ../esuyp` to run defaults against sibling `esuyp`
- other options for sizes etc see usage
- for repeat runs same project, manually delete previous runs

### Current Status of Lorem Ipsum

- works plenty good enough to start theming sites
- some GenLoremSpec configs are currently ignored see below
- plenty of unfinished features such as:
   - implementation of multi-word titles
   - proper case where appropriate
   - more randomized handling of sections
   - insertion of unsplash photos
   - 

## Rocket Theme Swapper

Danger Will Robinson - this is a modestly dangerous program.

Your fall-back workaround which you will need to know and understand to avoid danger:

- Git is your safety mechanism. Be all committed and preferably even on a new branch before you do something.
- Know exactly what each command does before using it. There is no "Are You Sure?" button.

### What it does

Copies a `yada` theme to and then back from any rocket project into a `rckt-theme-yada` project.

### Assumptions that might not be obvious

- `df-cli` and rocket projects and rocket theme projects are all in the same folder as siblings
- rocket themes are all created with this program and thus named `rckt-theme-blah` where `blah` is the theme name
- The author of any rocket project will wish to swap out one or more different themes to try them out on this or other rocket projects.
- The risks of using and mis-using this program are worth the benefit of being able to move quickly and nimbly through various themes.
- YMMV and some of the commands below may produce incorrect messages and/or results. Confirm manually.

### Basic commands for creating content

- PRE_REQ: yada/docs must already be created
- `tsc && ./.tsc/run/rocket-lorem.js -f ../yada` creates new content in the `yada/docs` directory

### Basic commands for swapping themes - deprecated???

Given that you are working on a rocket project of `jeren` and swapping out a couple of themes `nyt` and `next`

The -n "New" command assumes that `jeren` has already been run with the default rocket theme once, to populate `docs/_merged_assets` etc.

- `tsc && ./.tsc/run/rocket-swap-theme.js -f ../jeren -t nyt -n` creates a new `nyt` theme from `jeren/docs/_merged_assets` etc.
- `tsc && ./.tsc/run/rocket-swap-theme.js -f ../jeren -t nyt -b` writes changes from the `nyt` theme you have been working on back to  `rckt-theme-nyt/docs`
- `tsc && ./.tsc/run/rocket-swap-theme.js -f ../jeren -t next` imports a previously written `rckt-theme-next` theme into `jeren/docs`

The -b back command will clear `_assets` `_data` & `_includes` from your `rocket/docs` folder.

As a safety mechanism, this program won't run a -n to create, or a swap (without -b or -n) without either running the -b first, or alternately, manually deleting the `_assets` etc directories.

## Other

- Name: https://www.wisdomlib.org/definition/udu

### Helpful references for coding in this project

- https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript
- https://github.com/knicklabs/lorem-ipsum.js#readme
- https://github.com/punkave/random-words#readme
- https://areknawo.com/node-js-file-system-api-beginner-friendly-guide/
- https://github.com/huynhsamha/js-convert-case/blob/master/README.md
- random photos to consume:
  - downloaded to ~/unsplashed
  - using this to download https://github.com/MehediH/Bulksplash
  - pretty easy/fast

