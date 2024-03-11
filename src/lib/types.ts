/**
Documentation links:
- https://violentmonkey.github.io/api/metadata-block/
- https://www.tampermonkey.net/documentation.php
- https://wiki.greasespot.net/Metadata_Block
*/
export type ScriptInfo = {
  "@name": string;
  "@namespace": string;
  "@match": string;
  "@version": string;
  "@author": string;
  "@description": string;
  "@grant"?: string[];
  [k: string]: unknown;
};

export function ScriptMetadata(_metadata: ScriptInfo) {
  return function (_target: unknown) {};
}
