# df-cli
Aggregation of CLI routines for various development processes

# For any/all runs within:

- runs always start with `tsc && ./.tsc/run/my-file.js`
- if new run file (my-file.ts) then first `./nufile.sh` to `chmod a+x ...` as reqd
- common code shared between runs goes in `src/util/common.ts`
- all objects typed via `src/types.ts`

# Creating Lorem Ipsum Content:

- `tsc && ./.tsc/run/rocket-lorem.js -d ../esuyp` to run defaults against sibling `esuyp`
- other options for sizes etc see usage
- for repeat runs same project, manually delete previous runs

### Current Status of Lorem Ipsum:

- works plenty good enough to start theming sites
- plenty of unfinished features such as:
   - implementation of multi-word titles
   - proper case where appropriate
   - more randomized handling of sections
   - insertion of unsplash photos
   - 


### Helpful references for coding in this project:

- https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript
- https://github.com/knicklabs/lorem-ipsum.js#readme
- https://github.com/punkave/random-words#readme
- https://areknawo.com/node-js-file-system-api-beginner-friendly-guide/
- https://github.com/huynhsamha/js-convert-case/blob/master/README.md
- random photos to consume:
   - downloaded to ~/unsplashed
   - using this to download https://github.com/MehediH/Bulksplash
   - pretty easy/fast