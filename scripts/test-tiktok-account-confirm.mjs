import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const requestId = '123e4567-e89b-42d3-a456-426614174008';
const pendingKey = 'waslivo_tiktok_account_pending';
const confirmedKey = 'waslivo_tiktok_account_confirmed';
const payload = {requestId, service:'us_tiktok_ads_account_0_tax', quantity:'1', calculatedPrice:'400', phone:'+212612345678'};
const storage = new Map([[pendingKey, JSON.stringify(payload)]]);
const sessionStorage = {
  getItem:key => storage.get(key) ?? null,
  setItem:(key,value) => storage.set(key,value),
  removeItem:key => storage.delete(key),
};
const node = extra => ({textContent:'',hidden:false,className:'',classList:{remove(){},toggle(){}},remove(){},append(){},setAttribute(){},addEventListener(){},...extra});
const status = new Map([
  ['status-heading',node()],['status-description',node()],['status-mark',node()],
  ['retry-button',node()],['thanks-actions',node()],['thanks-summary',node()],
  ['primary-nav',node({classList:{remove(){},toggle(){}}})],
  ['site-header',node({querySelector:() => node({getAttribute:() => 'false'})})],
]);
let receive;
const document = {
  getElementById:id => id === 'thanks-copy' ? {textContent:JSON.stringify({success:'Success',successText:'Saved',error:'Error',errorText:'Retry',pending:'Pending',pendingText:'Saving',accounts:'accounts'})} : status.get(id),
  querySelectorAll:() => [],
  body:{append(){}},
  createElement:type => type === 'form'
    ? node({submit(){
        receive({origin:'https://evil.example',source:{},data:{type:'waslivo-lead-result',success:false,requestId}});
        // Google HTML Service can relay from an inner sandbox iframe.
        receive({origin:'https://n-example-0lu-script.googleusercontent.com',source:{},data:{type:'waslivo-lead-result',success:true,requestId}});
      }})
    : node({contentWindow:{}}),
};
const window = {dataLayer:[],addEventListener(){}};
runInNewContext(readFileSync(new URL('../public/tiktok-ads-account/confirm.js',import.meta.url),'utf8'),{
  document,window,sessionStorage,addEventListener:(event,handler) => {if(event === 'message') receive=handler},
  removeEventListener(){},scrollY:0,setTimeout,clearTimeout,
});
await Promise.resolve();
await Promise.resolve();
assert.equal(status.get('status-heading').textContent,'Success');
assert.equal(status.get('thanks-summary').hidden,false);
assert.equal(sessionStorage.getItem(pendingKey),null);
assert.equal(sessionStorage.getItem(confirmedKey),'1');
console.log('TikTok account confirmation accepts the valid nested Google response and ignores another origin.');
