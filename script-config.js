/*
Documentation links:
- https://violentmonkey.github.io/api/metadata-block/
- https://www.tampermonkey.net/documentation.php
- https://wiki.greasespot.net/Metadata_Block
*/
const headers = {
  "@name": "New script",
  "@namespace": "scripts",
  "@match": "https://*google.com/*",
  "@version": "1.0",
  "@author": "-",
  "@description": "Description",
  "@grant": ["GM.addStyle"],
};

module.exports = { headers };
