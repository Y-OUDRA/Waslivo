import fs from 'node:fs';
import assert from 'node:assert/strict';
const manifest=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));
assert.equal(manifest.static.directory,'dist');
const html=fs.readFileSync('dist/index.html','utf8');
const refs=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]);
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
for(const ref of refs){
  if(ref.startsWith('http')||ref.startsWith('data:')||ref==='#')continue;
  if(ref.startsWith('#'))assert.ok(ids.has(ref.slice(1)),`Missing section ${ref}`);
  else assert.ok(fs.existsSync('dist/'+ref),`Missing asset ${ref}`);
}
console.log('Verified manifest, local asset references, and section links.');
