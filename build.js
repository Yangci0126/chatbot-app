const fs = require('fs');
const babel = require('@babel/core');

const css = `:root{--bg:#f8fafc;--bg2:#fff;--sv:#1e293b;--sh:#334155;--sa:#3b82f6;--tx:#1e293b;--t2:#64748b;--st:#e2e8f0;--sm:#94a3b8;--bd:#e2e8f0;--ac:#6366f1;--dg:#ef4444;--r:12px;--rs:8px;--sb:env(safe-area-inset-bottom,0px)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:var(--tx);line-height:1.6;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.auth-pg{display:flex;align-items:center;justify-content:center;min-height:100%;min-height:100dvh;padding:20px}
.auth-card{background:var(--bg2);border-radius:var(--r);padding:32px 24px;width:100%;max-width:380px;box-shadow:0 10px 30px rgba(0,0,0,.1);border:1px solid var(--bd)}
.auth-tt{text-align:center;font-size:20px;font-weight:700;margin-bottom:4px}
.auth-sub{text-align:center;font-size:13px;color:var(--t2);margin-bottom:24px}
.fd{margin-bottom:14px}.fd label{display:block;font-size:13px;font-weight:600;margin-bottom:4px}
.fd input,.fd select,.fd textarea{width:100%;padding:10px 14px;border:2px solid var(--bd);border-radius:var(--rs);font-size:16px;font-family:inherit;outline:none;background:var(--bg2);box-sizing:border-box}
.fd input:focus,.fd select:focus,.fd textarea:focus{border-color:var(--ac)}
.fd textarea{resize:vertical;min-height:80px}.fh{font-size:12px;color:var(--t2);margin-top:4px}.fh a{color:var(--ac)}
.sbtn{width:100%;padding:12px;border:none;border-radius:var(--rs);font-size:15px;font-weight:600;cursor:pointer;color:#fff;background:var(--ac);font-family:inherit}
.sbtn:active{filter:brightness(1.1)}.sbtn:disabled{opacity:.5}
.sw{text-align:center;margin-top:16px;font-size:13px;color:var(--t2)}.sw a{color:var(--ac);cursor:pointer;font-weight:500}
.er{background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:var(--rs);padding:10px 14px;font-size:13px;margin-bottom:12px;text-align:center;word-break:break-word}
.logob{background:none;border:1px solid var(--sm);color:var(--sm);cursor:pointer;font-size:12px;padding:4px 8px;border-radius:6px;font-family:inherit;display:inline-flex;align-items:center;gap:3px}
.logob:hover{background:var(--dg);border-color:var(--dg);color:#fff}
.lou{font-size:11px;color:var(--sm);padding:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.app{display:flex;height:100%;height:100dvh;position:relative}
.sv{width:280px;min-width:280px;background:var(--sv);color:var(--st);display:flex;flex-direction:column;z-index:100;transition:transform .25s ease;overflow-y:auto}
.svh{padding:16px 14px 10px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between}
.svl{font-size:16px;font-weight:700;color:#fff;cursor:pointer}.svl:hover{opacity:.8}
.svc{display:none;background:none;border:none;color:var(--sm);font-size:20px;cursor:pointer;padding:4px 8px}
.sideo{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99}
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.hmb{display:none;background:none;border:none;font-size:22px;cursor:pointer;padding:6px;border-radius:8px;color:var(--tx);min-width:40px;min-height:40px;align-items:center;justify-content:center}
.em{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--t2);padding:20px}
.emi{font-size:56px}.em h2{font-size:20px;color:var(--tx)}.em p{font-size:14px;max-width:300px;text-align:center}
.ch{display:flex;flex-direction:column;height:100%}
.chh{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg2);border-bottom:3px solid var(--ac);min-height:56px}
.chi{display:flex;align-items:center;gap:10px;flex:1;min-width:0}
.cha{font-size:26px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:var(--bg);border-radius:var(--rs);flex-shrink:0;overflow:hidden}
.cha img{width:100%;height:100%;object-fit:cover}.chn{font-size:15px;font-weight:600}
.btn{display:inline-flex;align-items:center;gap:4px;padding:8px 14px;border-radius:var(--rs);font-size:14px;cursor:pointer;font-family:inherit;font-weight:500;border:1px solid transparent;transition:all .15s;white-space:nowrap;min-height:40px;min-width:40px;justify-content:center}
.bp{background:var(--ac);color:#fff;border-color:var(--ac)}.bd2{background:var(--dg);color:#fff;border-color:var(--dg)}
.bg{background:transparent;color:var(--t2);border-color:transparent}.bg:hover{background:var(--bg);color:var(--tx)}
.bs{padding:6px 10px;font-size:13px;min-height:36px}.btn:disabled{opacity:.5;pointer-events:none}
.ms{flex:1;overflow-y:auto;padding:14px;-webkit-overflow-scrolling:touch;display:flex;flex-direction:column;gap:12px}
.mse{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--t2);gap:6px}
.mse h3{color:var(--tx);font-size:17px}
.mr{display:flex;align-items:flex-start;gap:8px;max-width:85%;animation:mi .25s ease}
@keyframes mi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.mr.u{margin-left:auto;flex-direction:row-reverse}
.mav{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;overflow:hidden}
.mav img{width:100%;height:100%;object-fit:cover}
.mav.ua{background:linear-gradient(135deg,#6366f1,#ec4899)}.mav.ua img{width:100%;height:100%;object-fit:cover}
.mb{max-width:100%;padding:10px 14px;border-radius:14px;font-size:15px;line-height:1.6;word-break:break-word;white-space:pre-wrap}
.ab{background:var(--bg2);border:1px solid var(--bd);border-bottom-left-radius:4px}.ub{background:var(--ac);color:#fff;border-bottom-right-radius:4px}
.inp{border-top:2px solid var(--bd);padding:10px 14px;display:flex;gap:8px;align-items:flex-end;background:var(--bg2);padding-bottom:calc(10px + var(--sb))}
.inp textarea{flex:1;padding:10px 12px;border:2px solid var(--bd);border-radius:16px;font-family:inherit;font-size:15px;resize:none;outline:none;max-height:120px;min-height:42px;overflow-y:auto}
.inp textarea:focus{border-color:var(--ac)}
.inp button{padding:10px 16px;background:var(--ac);color:#fff;border:none;border-radius:16px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}.inp button:disabled{opacity:.5}
.typ{display:flex;align-items:center;gap:8px;color:var(--t2);font-size:13px;animation:mi .25s ease}
.td{display:flex;gap:3px;align-items:center}.td span{width:6px;height:6px;border-radius:50%;background:var(--sm);animation:bd 1.4s infinite ease-in-out}
.td span:nth-child(2){animation-delay:.2s}.td span:nth-child(3){animation-delay:.4s}
@keyframes bd{0%,80%,100%{opacity:.3}40%{opacity:1}}
.sa{padding:8px 10px;display:flex;flex-direction:column;gap:8px}
.sbtn2{width:100%;padding:10px 12px;border:none;border-radius:var(--rs);font-size:14px;cursor:pointer;color:var(--sm);background:var(--sh);font-family:inherit;font-weight:500;text-align:left;transition:all .15s}
.sbtn2:hover{color:#fff;background:#475569}
.sbtn2.purple{background:var(--ac);color:#fff}.sbtn2.purple:hover{filter:brightness(1.15)}
.bl{flex:1;overflow-y:auto;padding:4px 10px}
.bli{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:var(--rs);cursor:pointer;color:var(--st);transition:all .12s;font-size:14px}
.bli:hover{background:var(--sh)}.bli.active{background:var(--ac);color:#fff}
.bli img,.bli .bia{width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:16px}
.bin{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bie{background:none;border:none;color:inherit;opacity:.5;cursor:pointer;padding:2px 4px;font-size:12px;flex-shrink:0;display:none}.bli:hover .bie{display:block}.bie:hover{opacity:1}
.ble{padding:16px 10px;text-align:center;color:var(--sm);font-size:13px}
.sf{display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;border-top:1px solid rgba(255,255,255,.08);position:relative}
.sf:hover{background:var(--sh)}
.lobtn{position:relative;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:1px solid var(--sm);border-radius:8px;background:transparent;color:var(--sm);cursor:pointer;font-size:16px;flex-shrink:0}
.lobtn:hover{background:var(--dg);border-color:var(--dg);color:#fff}
.lobtn:hover::after{content:'退出登录';position:absolute;bottom:calc(100%+6px);right:-4px;background:var(--sv);color:var(--dg);font-size:11px;padding:4px 8px;border-radius:4px;white-space:nowrap;border:1px solid rgba(255,255,255,.1);z-index:200}
.pg{flex:1;overflow-y:auto;padding:20px;-webkit-overflow-scrolling:touch}
.pgt{font-size:20px;font-weight:700;margin-bottom:20px}
.seg{display:flex;gap:2px;margin-bottom:16px;flex-wrap:wrap}.seg button{padding:8px 16px;border:1px solid var(--bd);background:var(--bg2);cursor:pointer;font-size:13px;font-weight:500;color:var(--t2);border-radius:var(--rs) var(--rs) 0 0;font-family:inherit}
.seg button.ac{border-color:var(--ac);border-bottom-color:var(--bg2);color:var(--ac);background:var(--bg2);position:relative;z-index:1;margin-bottom:-1px}
.setw{background:var(--bg2);border:1px solid var(--bd);border-radius:0 var(--rs) var(--rs) var(--rs);padding:16px}
.colors{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.colors span{width:22px;height:22px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all .15s;display:flex;align-items:center;justify-content:center;font-size:14px}
.colors span.sel{transform:scale(1.2);box-shadow:0 0 0 2px var(--bg2),0 0 0 4px var(--ac)}
.pgc{max-width:540px;margin:0 auto;width:100%}
.pg-center{flex:1;overflow-y:auto;padding:20px;display:flex;justify-content:center;-webkit-overflow-scrolling:touch}
@media(max-width:768px){.sv{position:fixed;left:0;top:0;bottom:0;transform:translateX(-100%);z-index:101;overflow-y:auto;-webkit-overflow-scrolling:touch}.sv.open{transform:translateX(0)}.sideo.show{display:block}.svc{display:block}.hmb{display:flex;flex-shrink:0}.mn{width:100%;min-height:0;display:flex;flex-direction:column}.pg-center{flex-shrink:0;overflow-y:scroll;-webkit-overflow-scrolling:touch;max-height:100dvh;align-items:flex-start}.pgc{min-height:0;flex-shrink:0;padding:0 4px}.fd input,.fd select,.fd textarea{font-size:16px!important}.btn{min-height:44px;min-width:44px}.app{height:100%;min-height:100vh;min-height:100dvh}.ch{flex:1;min-height:0}.ms{flex:1 1 0;min-height:0}.inp{flex-shrink:0;padding:8px 10px;padding-bottom:calc(8px + env(safe-area-inset-bottom,0px));gap:6px}.inp textarea{max-height:100px;font-size:16px;min-height:40px}.inp button{padding:8px 14px;font-size:14px;min-width:60px}.chh{padding:8px 10px;gap:6px;flex-shrink:0;flex-wrap:nowrap}.chh .btn{padding:6px 8px;font-size:12px;min-height:32px}.chi{gap:8px;flex:1;min-width:0}.cha{width:40px;height:40px;font-size:28px}.chn{font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ch-home{display:none}.msg-act{opacity:1!important}.mav{width:40px;height:40px;font-size:20px}.bli .bia{width:35px;height:35px;font-size:20px}.msg-spacer{width:40px!important}}
.dark{--bg:#0f172a;--bg2:#1e293b;--sv:#0b1120;--sh:#1e293b;--tx:#e2e8f0;--t2:#94a3b8;--st:#cbd5e1;--sm:#64748b;--bd:#334155}
.dark .auth-card,.dark .setw{box-shadow:0 10px 30px rgba(0,0,0,.3)}.dark .fd input,.dark .fd select,.dark .fd textarea{background:var(--sv);color:var(--tx);border-color:var(--bd)}
.dark .ab{background:var(--sv)}.dark .inp textarea{background:var(--sv);color:var(--tx)}
.dark .inp{background:var(--sv)}.dark .chh{background:var(--sv)}
.avatar-clear{padding:4px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--bg2);color:var(--t2);cursor:pointer;font-size:13px;font-family:inherit}.avatar-clear:hover{background:var(--dg);border-color:var(--dg);color:#fff}
.home-quick{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:16px}.home-quick button{padding:12px 24px;min-width:160px;border:2px solid var(--bd);border-radius:var(--rs);background:var(--bg2);color:var(--tx);cursor:pointer;font-size:15px;font-family:inherit;transition:all .15s}.home-quick button:hover{border-color:var(--ac);color:var(--ac)}.msg-act{background:none;border:none;cursor:pointer;font-size:12px;padding:2px 0;color:var(--t2);font-family:inherit;opacity:0;transition:opacity .15s}.mb:hover+.msg-act,.msg-act:hover,.mr:hover .msg-act{opacity:1}.ub+.msg-act{text-align:right;width:100%}`;

const appJSX = `const {useState,useEffect,useRef,useCallback} = React;
const SURL='https://tayaketmnrlzfrsfsqce.supabase.co';
const SKEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRheWFrZXRtbnJsemZyc2ZzcWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4ODczMTMsImV4cCI6MjEwMDQ2MzMxM30.tFVRpbS4-FmJ4jaJ8AWXMVCjxBJlBZJNj0ukXraklXU';
const sup = window.supabase.createClient(SURL,SKEY);

const AVATARS = ['🤖','👩‍🚀','🦊','🐱','🐶','🐼','🦄','🐉','🧙‍♂️','🧛','🧝','👻','😺','🦸','🧑‍🎤'];
const COLORS = ['#6366f1','#8b5cf6','#ec4899','#f43f5e','#f97316','#eab308','#22c55e','#14b8a6','#06b6d4','#3b82f6'];
const isMobile = () => window.innerWidth <= 768;
const userName = d => d || '用户';
const errMsg = (e, fb) => { if(!e) return fb||'未知错误'; if(typeof e==='string'&&e.length>0&&e!=='{}') return e; if(e.message&&e.message.length>1&&e.message!=='{}') return e.message; return fb||'请求失败' };

function buildSystemPrompt(bot, worldview, settings, summary) {
  let p = '你是"' + bot.name + '"\\n';
  if(bot.basic_info) p += '【基本信息】' + bot.basic_info + '\\n';
  if(bot.appearance) p += '【外貌设定】' + bot.appearance + '\\n';
  if(bot.personality) p += '【性格设定】' + bot.personality + '\\n';
  if(bot.backstory) p += '【背景故事】' + bot.backstory + '\\n';
  if(bot.speaking_style) p += '【讲话风格】你必须严格遵循以下说话方式：' + bot.speaking_style + '。这些规则覆盖其他所有对话规则，不可偏离。\\n';
  if(worldview) {
    p += '【世界观】时代:' + (worldview.era||'未设定') + ';科技:' + (worldview.technology||'未设定') + ';大事件:' + (worldview.world_events||'无') + '\\n';
    p += '【时代约束】不能出现不符合该时代的物品、概念或事件\\n';
  }
  const nm = userName(settings.display_name);
  const g = settings.gender === 'male' ? '男性' : settings.gender === 'female' ? '女性' : '';
  p += '【对话对象】' + (g ? '名叫' + nm + '的' + g + '用户' : '名叫' + nm + '的用户') + '\\n';
  p += '【核心指令】1.你必须始终以"' + bot.name + '"的身份说话和行动。2.（）内的所有动作和心理描写，必须在开头带上第三人称主语（"' + bot.name + '"或"他/她"），例如写"（' + bot.name + '轻轻点头，嘴角微扬）"，绝不允许省略主语写成"（轻轻点头，嘴角微扬）"。\\n';
  p += '【NPC出场规则】当剧情中需要其他人出场（朋友、家人、同事、路人等），你必须让这些配角**直接出场说话**，而不是让你用旁白转述。具体要求：\\n';
  p += '   - 用【NPC名】作为发言前缀，例如：\\n     ' + bot.name + '：「他应该快到了。」\\n     【张磊】（推门进来，手里提着两杯奶茶）「不好意思迟到了！」\\n';
  p += '   - NPC的性格要**自动根据已有信息推导**：如果设定中提到' + bot.name + '有男朋友，你就要从' + bot.name + '的性格反推男朋友的互补性格（胆小→外向、温柔→痞气、严肃→幽默、冷漠→热情）；如果提到了同事、家人、朋友，同样从关系类型推断行为和说话方式。\\n';
  p += '   - NPC要有独立的语气、措辞习惯和小动作，不能只是工具人——要有自己的态度和情绪。\\n';
  p += '   - NPC出场后至少要有1-2句直接对话，严禁全程用旁白概括。\\n';
  p += '   - NPC的言行必须符合世界观设定（时代、科技水平、社会环境）。\\n';
  p += '   - 可以同时出场多个NPC，用不同前缀区分。\\n';
  p += '   - ⚠️ NPC出场前必须先检查空间逻辑：剧情中已明确的空间（如"只有两人的密室""在飞机上""深山里独处"）不能突然无理由地冒出NPC。NPC的出场必须有合理的空间基础（敲门、打电话、路过、原本就在附近等）。如果剧情不允许任何人出现，就正常推进，不要强行塞NPC。\\n';
  p += '【口语自然度铁律】你的说话方式必须像一个真人，而不是AI助手。严格遵循以下规则：\\n';
  p += '   1. 禁止AI味开头：绝不能说"好的""明白了""当然""让我来...""根据我的理解"等机器人常用语。直接说话，不需要回应指令。\\n';
  p += '   2. 句子要破碎：真人说话不是完整的书面语。善用省略号、语气词（呃、嗯、啊、哈、唉、啧）、停顿和中断。\\n';
  p += '   3. 词汇差异化：根据角色身份使用不同的词汇量。小孩子不能用成语；街溜子不能说"综上所述"；学者不能每句都是"卧槽"。\\n';
  p += '   4. 情绪要外露：生气时提高音量，句子变短；紧张时结巴、重复；开心时话多、语速快；难过时语气飘忽、句子拖长。情绪要能从文字里读出来。\\n';
  p += '   5. 主动而非被动：不要等用户问才说。真人会主动提问、吐槽、转移话题、分享无关琐事。突然想起什么就说出来。\\n';
  p += '   6. 减少括号描写：每轮最多2个括号动作，超过2个就太多表演了。能用对话传达的信息不要用括号。\\n';
  p += '   7. 允许犯错：真人会说错话、纠正自己、跑题、忘记事情。偶尔的矛盾和不完美才是真实感。\\n';
  p += '【逻辑一致性】你的所有行为和言语必须严格符合你的人设。你是什么身份、国籍、经济状况，就只能做符合这些条件的事。比如一个普通中国家庭的角色，绝不能在德国柏林有家、不能说流利的十国语言、不能突然掏出高科技装备。每一句话都要能回溯到你的背景设定。\\n';
  p += '【记忆一致性】你必须记住并尊重对话中已经发生过的一切：说过的话、发生过的事、确认过的信息、时间线、人物关系等。不能前后矛盾。如果前面说过喜欢某样东西，后面就不能说讨厌（除非你在故意撒谎，且你有撒谎的理由）。如果对话中已经确认今天是周一，就绝不能突然说是周五。\\n';
  if(summary) p += '【对话历史摘要】以下是之前对话的关键信息，你必须记住并保持一致性：\\n' + summary + '\\n';
  p += '【规则】\\n1.（）内为动作或心理，（）外为对话\\n2.用第三人称描述自己\\n3.用户可用金手指强行改变剧情走向\\n4.你说的每一句话、做的每一个动作，都必须严格符合你的性格设定、背景故事和所在世界的世界观\\n';
  if(worldview) p += '5.【世界观铁律】不论对话如何发展，绝对不能出现任何不符合世界观设定的事物、科技、概念或表达方式\\n';
  return p;
}

// Image generation helper
async function generateImage(prompt, userSettings) {
  const apiKey = userSettings.image_api_key || localStorage.getItem('image_api_key');
  let baseUrl = (userSettings.image_api_base_url || localStorage.getItem('image_api_base_url') || 'https://api.hypereal.cloud/v1');
  while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
  if(!baseUrl.includes('/v1') && !baseUrl.includes('/v2') && !baseUrl.includes('/v3')) baseUrl += '/v1';
  const model = userSettings.image_model || localStorage.getItem('image_model') || 'nano-banana-pro';
  const size = userSettings.image_size || localStorage.getItem('image_size') || '1024x1024';
  const quality = userSettings.image_quality || localStorage.getItem('image_quality') || 'standard';
  const style = userSettings.image_style || localStorage.getItem('image_style') || '';
  if(!apiKey) throw {message:'请先在设置中配置生图API Key'};
  const fullPrompt = prompt + (style ? '，' + style + '风格' : '') + (quality==='hd'?'，高清2K画质':quality==='4k'?'，超清4K画质':'');
  const res = await fetch(baseUrl + '/images/generations', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
    body:JSON.stringify({model,prompt:fullPrompt,n:1,size,response_format:'b64_json'})
  });
  if(!res.ok){const ed=await res.json().catch(()=>({}));throw{message:ed.error?.message||'生图失败:'+res.status};}
  const d = await res.json();
  return d.data[0].b64_json ? 'data:image/png;base64,' + d.data[0].b64_json : d.data[0].url;
}

function compressImage(file, maxW, maxH) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          if(w > maxW || h > maxH) { const ratio = Math.min(maxW/w, maxH/h); w = Math.round(w*ratio); h = Math.round(h*ratio); }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } catch(e) { reject(e); }
      };
      img.onerror = () => reject(new Error('图片加载失败'));
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Auth Page
function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if(!email.trim() || !password) { setError('请填写邮箱和密码'); return; }
    setLoading(true); setError('');
    try {
      if(mode === 'login') {
        const r = await sup.auth.signInWithPassword({email,password});
        if(r.error) { setError(errMsg(r.error)); setLoading(false); return; }
      } else {
        const r = await sup.auth.signUp({email,password});
        if(r.error) { setError(errMsg(r.error)); setLoading(false); return; }
        setError(r.data.session ? '✅ 注册成功！' : '✅ 请查看邮箱验证链接');
        if(!r.data.session) setMode('login');
      }
    } catch(e) { setError(errMsg(e)); }
    setLoading(false);
  };

  return <div className="auth-pg"><div className="auth-card">
    <div className="auth-tt">AI角色扮演</div>
    <div className="auth-sub">创造属于你的故事</div>
    {error && <div className="er">{error}</div>}
    <form onSubmit={handleSubmit}>
      <div className="fd"><label>邮箱</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" autoFocus/></div>
      <div className="fd"><label>密码</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==='login'?'输入密码':'设置密码(至少6位)'}/></div>
      <button type="submit" className="sbtn" disabled={loading}>{loading?'处理中...':mode==='login'?'登录':'注册'}</button>
    </form>
    <div className="sw">{mode==='login'?'没有账号？':'已有账号？'} <a onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}}>{mode==='login'?'注册':'登录'}</a></div>
  </div></div>;
}

// Empty state
function EmptyState({onMenuClick, onCreate, onWorldviewList}) {
  return <div className="em">
    <div className="emi">👋</div>
    <h2>欢迎回来！</h2>
    <p>创造属于你的故事。</p>
    <div className="home-quick">
      <button onClick={onCreate}>✨ 创建角色</button>
      <button onClick={onWorldviewList}>📚 浏览世界观</button>
    </div>
  </div>;
}

// Message bubble
function MessageBubble({msg, idx, isLast, botAvatar, botColor, userAvatar, onEdit, onRegenerate, editingId, editText, setEditText, onSaveEdit, onCancelEdit}) {
  const isUser = msg.role === 'user';
  const isEditing = editingId === msg.id;
  if(isEditing) {
    return <div className={"mr u"}>
      <div className="mav ua">{userAvatar?<img src={userAvatar} alt=""/>:'👤'}</div>
      <div style={{flex:1,maxWidth:'85%'}}>
        <textarea value={editText} onChange={e=>setEditText(e.target.value)} style={{width:'100%',padding:'10px 14px',borderRadius:14,border:'2px solid var(--ac)',fontSize:15,fontFamily:'inherit',resize:'vertical',minHeight:60,outline:'none',background:'var(--bg2)',color:'var(--tx)'}} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();onSaveEdit(msg.id)}}}/>
        <div style={{display:'flex',gap:6,marginTop:6,justifyContent:'flex-end'}}>
          <button className="btn bs bg" onClick={onCancelEdit}>取消</button>
          <button className="btn bp bs" onClick={()=>onSaveEdit(msg.id)}>保存并重新生成</button>
        </div>
      </div>
    </div>;
  }
  return <div className={"mr" + (isUser ? " u" : "")}>
    {!isUser
      ? <div className="mav" style={{background:botColor+'20'}}>{typeof botAvatar==='string'&&botAvatar.startsWith('data:')?<img src={botAvatar} alt=""/>:botAvatar}</div>
      : <div className="mav ua">{userAvatar?<img src={userAvatar} alt=""/>:'👤'}</div>}
    <div>
      <div className={"mb " + (isUser?"ub":"ab")} style={isUser?null:{borderLeft:'3px solid '+botColor}}>{msg.content}</div>
      {isUser && <button className="msg-act" onClick={()=>onEdit(msg)}>┆ 编辑</button>}
      {!isUser && isLast && <button className="msg-act" onClick={onRegenerate}>↻ 重新生成</button>}
    </div>
    {!isUser && <div className="msg-spacer" style={{width:32,flexShrink:0}}/>}
  </div>;
}

// Typing indicator
function TypingIndicator({name, avatar, color}) {
  return <div className="typ">
    <div className="mav" style={{background:color+'20'}}>{typeof avatar==='string'&&avatar.startsWith('data:')?<img src={avatar} alt=""/>:avatar}</div>
    <div className="td"><span/><span/><span/></div>
    <span>{name} 正在输入...</span>
  </div>;
}

// Chat Window
function ChatWindow({bot, userSettings, onBack, onViewDetail}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [typing, setTyping] = useState(false);
  const [worldview, setWorldview] = useState(null);
  const [summary, setSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const summarizingRef = useRef(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const msgsRef = useRef(null);
  const abortRef = useRef(null);

  const loadMessages = async () => {
    try {
      const r = await sup.from('messages').select('*').eq('bot_id',bot.id).order('created_at',{ascending:true});
      setMessages(r.data || []);
      setSummary(localStorage.getItem('chat-summary-' + bot.id) || '');
    } catch(e) { setMessages([]); }
  };

  const loadWorldview = async () => {
    if(!bot.worldview_id) return;
    try {
      const r = await sup.from('worldviews').select('*').eq('id',bot.worldview_id).single();
      if(r.data) setWorldview(r.data);
    } catch(e) {}
  };

  useEffect(()=>{ loadMessages(); loadWorldview(); }, [bot.id]);

  // When messages > 60, trim to last 40 + generate summary of older ones
  useEffect(() => {
    if(messages.length < 60 || messages.length % 30 !== 0 || summarizingRef.current) return;
    const genSummary = async () => {
      summarizingRef.current = true;
      setSummarizing(true);
      try {
        const apiKey = userSettings.api_key || localStorage.getItem('api_key');
        let baseUrl = (userSettings.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
        while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
        const model = userSettings.default_model || bot.model || localStorage.getItem('default_model') || 'deepseek-chat';
        if(!apiKey) return;
        const olderMsgs = messages.slice(0, messages.length-40);
        const history = olderMsgs.map(m=>(m.role==='user'?'用户':'角色')+':'+m.content).join('\\n');
        const oldSummary = summary || '';
        const res = await fetch(baseUrl + '/chat/completions', {
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
          body:JSON.stringify({model,messages:[{role:'system',content:'你是一个对话摘要助手。请用简洁的中文总结以下对话中的关键信息：人物关系、重要事件、偏好、时间线、约定、说话风格特征（用词习惯、口头禅、句式特点等）。'+(oldSummary?('之前的摘要：'+oldSummary+'\\n新内容：\\n'+history):history)+'\\n请输出紧凑摘要（200字内）。'},{role:'user',content:'请总结'}],max_tokens:400,temperature:0.3})
        });
        if(res.ok){
          const d = await res.json();
          setSummary(d.choices[0].message.content);
          localStorage.setItem('chat-summary-'+bot.id, d.choices[0].message.content);
        }
      } catch(e) {}
      summarizingRef.current = false;
      setSummarizing(false);
    };
    genSummary();
  }, [messages.length, bot.id]);

  // Helper: build chat history for API — last 40 messages, summary covers the rest
  const getChatHistory = (allMsgs) => {
    if(allMsgs.length <= 40) return allMsgs.map(m=>({role:m.role,content:m.content}));
    return allMsgs.slice(-40).map(m=>({role:m.role,content:m.content}));
  };

  useEffect(()=>{ msgsRef.current?.scrollTo(0,msgsRef.current.scrollHeight); }, [messages.length]);

  const clearChat = async () => {
    if(confirm('确认清空聊天记录？')) {
      await sup.from('messages').delete().eq('bot_id',bot.id);
      setMessages([]);
      setSummary('');
      localStorage.removeItem('chat-summary-' + bot.id);
      saveScene(null);
    }
  };

  const startEdit = (msg) => { setEditingId(msg.id); setEditText(msg.content); };

  const cancelEdit = () => { setEditingId(null); setEditText(''); };

  const saveEdit = async (msgId) => {
    if(!editText.trim() || loading) return;
    const text = editText.trim();
    setEditingId(null); setEditText('');
    setTyping(true);
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const msgIdx = messages.findIndex(m=>m.id===msgId);
      if(msgIdx<0) { setTyping(false); return; }
      // Delete this message and all subsequent ones
      const toDelete = messages.slice(msgIdx);
      for(const m of toDelete) { await sup.from('messages').delete().eq('id',m.id); }
      // Save updated user message
      const updatedMsg = {bot_id:bot.id, role:'user', content:text, user_id:uid};
      const r = await sup.from('messages').insert(updatedMsg).select('id').single();
      const newMsgs = messages.slice(0, msgIdx).concat(r.data?{...updatedMsg,id:r.data.id}:updatedMsg);
      setMessages(newMsgs);
      // Now generate new AI reply
      const apiKey = userSettings.api_key || localStorage.getItem('api_key');
      let baseUrl = (userSettings.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings.default_model || bot.model || localStorage.getItem('default_model') || 'deepseek-chat';
      if(!apiKey) { setError('请配置API Key'); setTyping(false); return; }
      setError('');
      const systemPrompt = buildSystemPrompt(bot, worldview, userSettings, summary);
      const chatHistory = getChatHistory(newMsgs);
      const res = await fetch(baseUrl + '/chat/completions', {
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'system',content:systemPrompt},...chatHistory],max_tokens:2048,temperature:0.8})
      });
      if(!res.ok){ const ed=await res.json().catch(()=>({})); throw {message: ed.error?.message||'API错误: '+res.status}; }
      const d = await res.json();
      const reply = d.choices[0].message.content;
      const botMsg = {bot_id:bot.id,role:'assistant',content:reply,user_id:uid};
      const br = await sup.from('messages').insert(botMsg).select('id').single();
      setMessages(prev=>[...prev, br.data?{...botMsg,id:br.data.id}:botMsg]);
    } catch(e) { setError(errMsg(e)); }
    setTyping(false);
  };

  const regenerateReply = async () => {
    if(loading || messages.length===0) return;
    const lastMsg = messages[messages.length-1];
    if(lastMsg.role!=='assistant') return;
    setTyping(true);
    try {
      // Delete last bot message
      await sup.from('messages').delete().eq('id',lastMsg.id);
      const truncated = messages.slice(0,-1);
      setMessages(truncated);
      // Generate new reply
      const apiKey = userSettings.api_key || localStorage.getItem('api_key');
      let baseUrl = (userSettings.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings.default_model || bot.model || localStorage.getItem('default_model') || 'deepseek-chat';
      if(!apiKey) { setError('请配置API Key'); setTyping(false); return; }
      setError('');
      const systemPrompt = buildSystemPrompt(bot, worldview, userSettings, summary);
      const chatHistory = getChatHistory(truncated);
      const res = await fetch(baseUrl + '/chat/completions', {
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'system',content:systemPrompt},...chatHistory],max_tokens:2048,temperature:0.8})
      });
      if(!res.ok){ const ed=await res.json().catch(()=>({})); throw {message: ed.error?.message||'API错误: '+res.status}; }
      const d = await res.json();
      const reply = d.choices[0].message.content;
      const uid = (await sup.auth.getUser()).data.user.id;
      const botMsg = {bot_id:bot.id,role:'assistant',content:reply,user_id:uid};
      const br = await sup.from('messages').insert(botMsg).select('id').single();
      setMessages(prev=>[...prev, br.data?{...botMsg,id:br.data.id}:botMsg]);
    } catch(e) { setError(errMsg(e)); }
    setTyping(false);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if(!text || loading || editingId) return;
    setInput('');
    const uid = (await sup.auth.getUser()).data.user.id;
    const userMsg = {bot_id:bot.id,role:'user',content:text,user_id:uid};
    setTyping(true);
    if(abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const apiKey = userSettings.api_key || localStorage.getItem('api_key');
      let baseUrl = (userSettings.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings.default_model || bot.model || localStorage.getItem('default_model') || 'deepseek-chat';

      if(!apiKey) { setError('请在设置中配置API Key'); setTyping(false); return; }
      setError('');

      const r0 = await sup.from('messages').insert(userMsg).select('id').single();
      const userMsgId = r0.data?.id;
      setMessages(prev=>[...prev, {...userMsg, id:userMsgId}]);

      const chatHistory = getChatHistory(messages.concat(userMsg));
      const systemPrompt = buildSystemPrompt(bot, worldview, userSettings, summary);

      const res = await fetch(baseUrl + '/chat/completions', {
        method:'POST',signal:controller.signal,
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'system',content:systemPrompt},...chatHistory],max_tokens:2048,temperature:0.8})
      });

      if(!res.ok) {
        const errData = await res.json().catch(()=>({}));
        throw {message: errData.error?.message || 'API请求失败: ' + res.status};
      }

      const data = await res.json();
      const reply = data.choices[0].message.content;
      const botMsg = {bot_id:bot.id,role:'assistant',content:reply,user_id:uid};
      const br = await sup.from('messages').insert(botMsg).select('id').single();
      setMessages(prev=>[...prev, br.data?{...botMsg,id:br.data.id}:botMsg]);
    } catch(e) {
      if(e.name === 'AbortError') { /* 用户取消了请求 */ }
      else { setError(errMsg(e)); if(userMsgId) { setMessages(prev=>prev.filter(m=>m.id!==userMsgId)); sup.from('messages').delete().eq('id',userMsgId).then(()=>{}); } }
    }
    setTyping(false);
    abortRef.current = null;
  };

  const [sceneUrl, setSceneUrl] = useState(localStorage.getItem('chat-scene-'+bot.id) || null);
  const [genning, setGening] = useState(false);

  const saveScene = url => { setSceneUrl(url); if(url) localStorage.setItem('chat-scene-'+bot.id, url); else localStorage.removeItem('chat-scene-'+bot.id); };

  const genScene = async () => {
    if(genning || messages.length < 2) return;
    setGening(true);
    try {
      let ctx = '角色设定：';
      if(bot.name) ctx += '角色名：'+bot.name+'。';
      if(bot.appearance) ctx += '外貌：'+bot.appearance+'。';
      if(bot.basic_info) ctx += '基本信息：'+bot.basic_info+'。';
      if(bot.personality) ctx += '性格：'+bot.personality+'。';
      if(worldview&&worldview.era) ctx += '时代背景：'+worldview.era+'。';
      const scenePrompt = '请根据角色设定和对话内容，写一段适合图像生成的场景描述（80字内，必须包含角色的外貌特征、当前所在环境和姿势动作、光线氛围）。\\n' +
        ctx + '\\n最近对话：\\n' +
        messages.slice(-4).map(m=>(m.role==='user'?'用户':bot.name)+':'+m.content).join('\\n');
      const apiKey = userSettings.api_key || localStorage.getItem('api_key');
      let baseUrl = (userSettings.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings.default_model || bot.model || localStorage.getItem('default_model') || 'deepseek-chat';
      if(!apiKey) { setError('请配置API Key'); setGening(false); return; }
      const pr = await fetch(baseUrl + '/chat/completions', {
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'user',content:scenePrompt}],max_tokens:200,temperature:0.7})
      });
      if(!pr.ok) throw {message:'场景描述生成失败'};
      const pd = await pr.json();
      const desc = pd.choices[0].message.content;
      const imgUrl = await generateImage(desc, userSettings);
      saveScene(imgUrl);
    } catch(e) { setError(errMsg(e)); }
    setGening(false);
  };

  const avatar = bot.avatar_url || bot.avatar || '🤖';
  const color = bot.theme_color || '#6366f1';
  const ua = userSettings.avatar_url;
  const chatBg = bot.background_url || localStorage.getItem('chat-bg-'+bot.id) || '';

  return <div className="ch" style={chatBg?{backgroundImage:'url('+chatBg+')',backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundAttachment:'fixed',backgroundColor:'#000'}:null}>
    <div className="chh">
      <div className="chi">
        <div className="cha">{typeof avatar==='string'&&avatar.startsWith('data:')?<img src={avatar} alt=""/>:avatar}</div>
        <div className="chn">{bot.name}</div>
      </div>
      {isMobile() && <button className="btn bs bg ch-back" onClick={onBack}>←</button>}
      <button className="btn bs bg ch-detail" onClick={onViewDetail}>📋</button>
      <button className="btn bs bg ch-clear" onClick={clearChat}>🗑</button>
      <button className="btn bs bg" onClick={genScene} disabled={genning||messages.length<2} title="生成场景插图">{genning?'⏳':'🎨'}</button>
      <button className="btn bs bg ch-home" onClick={()=>window.location.reload()}>🏠</button>
    </div>
    <div className="ms" ref={msgsRef}>
      {messages.length === 0 && !error && <div className="mse"><h3>开始对话</h3><p>发送第一条消息吧～</p></div>}
      {error && <div className="er" style={{margin:'0 4px'}}>{error}<button className="logob" style={{marginLeft:8}} onClick={()=>setError('')}>关闭</button></div>}
      {messages.map((m,i) => <MessageBubble key={i} msg={m} idx={i} isLast={i===messages.length-1} botAvatar={avatar} botColor={color} userAvatar={ua} onEdit={startEdit} onRegenerate={regenerateReply} editingId={editingId} editText={editText} setEditText={setEditText} onSaveEdit={saveEdit} onCancelEdit={cancelEdit}/>)}
      {typing && <TypingIndicator name={bot.name} avatar={avatar} color={color}/>}
      {sceneUrl && <div style={{padding:'0 4px',position:'relative'}}>
        <img src={sceneUrl} alt="场景插图" style={{width:'100%',maxWidth:400,borderRadius:12,margin:'8px 0',display:'block'}} onClick={()=>window.open(sceneUrl)}/>
        <div style={{display:'flex',gap:4,marginTop:-4}}>
          <button className="msg-act" onClick={()=>{const u=sceneUrl.startsWith('data:')?URL.createObjectURL(new Blob([Uint8Array.from(atob(sceneUrl.split(',')[1]),c=>c.charCodeAt(0))],{type:'image/png'})):sceneUrl;const a=document.createElement('a');a.href=u;a.download='scene.png';document.body.appendChild(a);a.click();document.body.removeChild(a);if(u!==sceneUrl)URL.revokeObjectURL(u)}} style={{opacity:1,fontSize:11}}>💾 保存</button>
          <button className="msg-act" onClick={genScene} style={{opacity:1,fontSize:11}}>🔄 重新生成</button>
          <button className="msg-act" onClick={()=>saveScene(null)} style={{opacity:1,fontSize:11}}>✕ 关闭</button>
        </div>
      </div>}
    </div>
    <div className="inp">
      <textarea value={input} onChange={e=>{setInput(e.target.value)}} onInput={e=>{e.target.style.height='42px';e.target.style.height=Math.min(e.target.scrollHeight,120)+'px'}} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}}} placeholder="输入消息...（Enter发送，Shift+Enter换行）" rows={1}/>
      <button onClick={sendMessage} disabled={loading||!input.trim()||editingId}>发送</button>
    </div>
  </div>;
}

// Image Crop Modal
function CropModal({file, aspectW, aspectH, onCrop, onClose}) {
  const [imgSrc, setImgSrc] = useState('');
  const [pos, setPos] = useState({x:0,y:0});
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({x:0,y:0, px:0,py:0});
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(()=>{
    const reader = new FileReader();
    reader.onload = e => setImgSrc(e.target.result);
    reader.readAsDataURL(file);
    return ()=>{reader.onload=null};
  }, [file]);

  const doCrop = () => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if(!wrap||!img) return;
    const cw = wrap.offsetWidth;
    const outW = aspectW===1?600:1080, outH = aspectW===1?600:1920;
    const canvas = document.createElement('canvas');
    canvas.width = outW; canvas.height = outH;
    const ctx = canvas.getContext('2d');
    // Map display coordinates to natural image coordinates
    const displayW = cw * scale;
    const ratio = img.naturalWidth / displayW;
    // Crop display width (mask width for non-square)
    const maskW = cw * aspectW / aspectH;
    const offsetX = aspectW===1 ? 0 : (cw - maskW) / 2;
    const sx = (pos.x + offsetX) * ratio;
    const sy = pos.y * ratio;
    const sw = maskW * ratio;
    const sh = cw * ratio;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
    onCrop(canvas.toDataURL('image/jpeg',0.92));
  };

  const onDown = e => {
    e.preventDefault();
    setDragging(true);
    setDragStart({x:e.clientX||e.touches[0].clientX, y:e.clientY||e.touches[0].clientY, px:pos.x, py:pos.y});
  };
  const onMove = e => {
    if(!dragging) return;
    const cx = e.clientX||e.touches[0].clientX, cy = e.clientY||e.touches[0].clientY;
    setPos({x:dragStart.px-(cx-dragStart.x), y:dragStart.py-(cy-dragStart.y)});
  };
  const onUp = () => setDragging(false);

  if(!imgSrc) return null;
  const size = Math.min(window.innerWidth-40,400);
  return <div style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,.85)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    <div style={{position:'relative',width:size,height:size,overflow:'hidden',borderRadius:8,background:'#333'}} ref={wrapRef}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}>
      {imgSrc && <img ref={imgRef} src={imgSrc} style={{position:'absolute',left:-pos.x,top:-pos.y,width:'100%',transform:'scale('+scale+')',transformOrigin:'0 0',pointerEvents:'none',userSelect:'none'}} draggable={false}/>}
      {aspectW!==1 && <div style={{position:'absolute',left:'50%',right:'auto',top:0,bottom:0,width:Math.round(size*aspectW/aspectH),transform:'translateX(-50%)',boxShadow:'0 0 0 9999px rgba(0,0,0,.5)',borderRadius:8}}/>}
      {aspectW===1 && <div style={{position:'absolute',inset:0,boxShadow:'0 0 0 9999px rgba(0,0,0,.5)',borderRadius:8}}/>}
    </div>
    <div style={{display:'flex',alignItems:'center',gap:10,marginTop:12,color:'#fff'}}>
      <span style={{fontSize:13}}>缩放</span>
      <input type="range" min={0.5} max={3} step={0.1} value={scale} onChange={e=>setScale(+e.target.value)} style={{width:120}}/>
      <span style={{fontSize:12}}>{Math.round(scale*100)}%</span>
    </div>
    <div style={{display:'flex',gap:10,marginTop:12}}>
      <button onClick={onClose} style={{padding:'8px 18px',borderRadius:8,border:'1px solid rgba(255,255,255,.3)',background:'transparent',color:'#fff',cursor:'pointer',fontSize:14}}>取消</button>
      <button onClick={doCrop} style={{padding:'8px 18px',borderRadius:8,border:'none',background:'var(--ac)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:600}}>确认裁剪</button>
    </div>
  </div>;
}

// Bot Editor
function BotEditor({worldviews, initial, onSave, onCancel, onDelete}) {
  const [name, setName] = useState(initial?.name || '');
  const [avatar, setAvatar] = useState(initial?.avatar || AVATARS[0]);
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatar_url || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [bgUrl, setBgUrl] = useState(initial?.background_url || '');
  const [cropFile, setCropFile] = useState(null);
  const [cropType, setCropType] = useState('');
  const [personality, setPersonality] = useState(initial?.personality || '');
  const [backstory, setBackstory] = useState(initial?.backstory || '');
  const [themeColor, setThemeColor] = useState(initial?.theme_color || COLORS[0]);
  const [model, setModel] = useState(initial?.model || '');
  const [worldviewId, setWorldviewId] = useState(initial?.worldview_id || '');
  const [basicInfo, setBasicInfo] = useState(initial?.basic_info || '');
  const [appearance, setAppearance] = useState(initial?.appearance || '');
  const [speakingStyle, setSpeakingStyle] = useState(initial?.speaking_style || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [portraitUrl, setPortraitUrl] = useState('');
  const [genningPortrait, setGeningPortrait] = useState(false);

  const genPortrait = async () => {
    if(genningPortrait) return;
    setGeningPortrait(true);
    try {
      const parts = [];
      if(name) parts.push('角色：'+name);
      if(basicInfo) parts.push('基本信息：'+basicInfo);
      if(appearance) parts.push('外貌：'+appearance);
      if(personality) parts.push('性格：'+personality);
      if(backstory) parts.push('背景：'+backstory);
      const prompt = '请生成一张角色立绘插图。' + parts.join('；') + '。高质量插画风格，精致的细节和光影，适合作为角色头像。';
      const imgUrl = await generateImage(prompt, {image_api_key:localStorage.getItem('image_api_key'),image_api_base_url:localStorage.getItem('image_api_base_url'),image_model:localStorage.getItem('image_model'),image_size:localStorage.getItem('image_size')||'1024x1024'});
      setPortraitUrl(imgUrl);
    } catch(e) { setError(errMsg(e)); }
    setGeningPortrait(false);
  };

  const handleAvatarFile = async e => {
    const file = e.target.files[0];
    if(!file) return;
    setAvatarFile(file);
    setCropFile(file); setCropType('avatar');
  };

  const handleBgFile = async e => {
    const file = e.target.files[0];
    if(!file) return;
    setCropFile(file); setCropType('bg');
  };

  const handleSave = async e => {
    e.preventDefault();
    if(!name.trim()) { setError('请输入角色名'); return; }
    setSaving(true); setError('');
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const data = {
        user_id: uid, name: name.trim(), avatar, avatar_url: avatarUrl,
        personality, backstory, theme_color: themeColor,
        basic_info: basicInfo, appearance,
        model: model || 'deepseek-chat',
        worldview_id: worldviewId || null,
        background_url: bgUrl,
        speaking_style: speakingStyle
      };
      if(initial?.id) {
        await sup.from('bots').update(data).eq('id',initial.id);
      } else {
        await sup.from('bots').insert(data);
      }
      onSave();
    } catch(e) { setError(errMsg(e)); }
    setSaving(false);
  };

  return <div className="pg-center"><div className="pgc">
    <div className="pgt">{initial?.id?'编辑角色':'创建角色'}</div>
    <form onSubmit={handleSave}>
      {error && <div className="er">{error}</div>}

      <div className="fd"><label>角色名</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="给角色起个名字" autoFocus/></div>

      <div className="fd"><label>头像</label>
        <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
          <div className="cha" style={{fontSize:32}}>{avatarUrl?<img src={avatarUrl} alt=""/>:avatar}</div>
          <input type="file" accept="image/*" onChange={handleAvatarFile} style={{fontSize:14}}/>
          {avatarUrl && <button type="button" className="avatar-clear" onClick={()=>{setAvatarUrl('');setAvatarFile(null)}}>✕ 移除</button>}
        </div>
        {!avatarUrl && <div className="colors">{AVATARS.map(a=><span key={a} className={a===avatar?'sel':''} onClick={()=>setAvatar(a)}>{a}</span>)}</div>}
      </div>

      <div className="fd"><label>聊天背景</label>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          {bgUrl ? <img src={bgUrl} alt="背景" style={{width:80,height:48,borderRadius:6,objectFit:'cover',border:'1px solid var(--bd)'}}/> : <div style={{width:80,height:48,borderRadius:6,background:'var(--bg2)',border:'1px solid var(--bd)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'var(--t2)'}}>无背景</div>}
          <input type="file" accept="image/*" onChange={handleBgFile} style={{fontSize:16,maxWidth:180}}/>
          {bgUrl && <button type="button" className="avatar-clear" onClick={()=>setBgUrl('')}>✕ 移除</button>}
        </div>
        <p style={{fontSize:11,color:'var(--t2)',marginTop:4}}>聊天页面的背景图（可选）</p>
      </div>

      <div className="fd"><label>主题色</label>
        <div className="colors">{COLORS.map(c=><span key={c} className={c===themeColor?'sel':''} onClick={()=>setThemeColor(c)} style={{background:c}}/>)}</div>
      </div>

      <div className="fd"><label>🎨 立绘生成</label>
        <p style={{fontSize:12,color:'var(--t2)',marginBottom:8}}>根据全部设定（名称、基本信息、外貌、性格、背景）生成角色立绘</p>
        {!portraitUrl && <button type="button" className="btn bp bs" onClick={genPortrait} disabled={genningPortrait}>{genningPortrait?'生成中...':'生成立绘'}</button>}
        {portraitUrl && <div style={{marginTop:8}}>
          <img src={portraitUrl} alt="立绘" style={{width:'100%',maxWidth:280,borderRadius:8,display:'block',marginBottom:6}}/>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            <button type="button" className="btn bs bg" onClick={()=>{setAvatarUrl(portraitUrl);setAvatar('')}}>设为头像</button>
            <button type="button" className="btn bs bg" onClick={()=>{localStorage.setItem('chat-bg-'+initial?.id,portraitUrl);setError('');setPortraitUrl(s=>s+' ')}}>设为聊天背景</button>
            <button type="button" className="btn bs bg" onClick={genPortrait} disabled={genningPortrait}>🔄 重新生成</button>
            <button type="button" className="btn bs bg" onClick={()=>{const u=portraitUrl.startsWith('data:')?URL.createObjectURL(new Blob([Uint8Array.from(atob(portraitUrl.split(',')[1]),c=>c.charCodeAt(0))],{type:'image/png'})):portraitUrl;const a=document.createElement('a');a.href=u;a.download='portrait.png';document.body.appendChild(a);a.click();document.body.removeChild(a);if(u!==portraitUrl)URL.revokeObjectURL(u)}}>💾 保存</button>
          </div>
        </div>}
      </div>

      <div className="fd" style={{marginTop:12}}><label style={{fontSize:15,color:'var(--ac)'}}>📋 基本信息</label></div>
      <div className="fd"><textarea value={basicInfo} onChange={e=>setBasicInfo(e.target.value)} placeholder="描述角色的基本特征，如年龄、性别、职业、身份等" rows={3}/></div>

      <div className="fd" style={{marginTop:12}}><label style={{fontSize:15,color:'var(--ac)'}}>🎨 外貌设定</label></div>
      <div className="fd"><textarea value={appearance} onChange={e=>setAppearance(e.target.value)} placeholder="描述角色的外貌特征，如身高、发型、着装风格等" rows={3}/></div>

      <div className="fd" style={{marginTop:12}}><label style={{fontSize:15,color:'var(--ac)'}}>🧠 性格设定</label></div>
      <div className="fd"><textarea value={personality} onChange={e=>setPersonality(e.target.value)} placeholder="描述角色的性格、说话风格等" rows={3}/></div>

      <div className="fd" style={{marginTop:12}}><label style={{fontSize:15,color:'var(--ac)'}}>💬 讲话风格</label></div>
      <div className="fd"><textarea value={speakingStyle} onChange={e=>setSpeakingStyle(e.target.value)} placeholder={'描述角色的说话方式，例如：爱用网络梗、带方言词；话很少每句不超过10字；紧张时结巴爱说「那个...」；喜欢用比喻说话像写诗'} rows={3}/></div>

      <div className="fd" style={{marginTop:12}}><label style={{fontSize:15,color:'var(--ac)'}}>🌍 选择世界观</label></div>
      <div className="fd">
        <select value={worldviewId} onChange={e=>setWorldviewId(e.target.value)}>
          <option value="">当前时间真实世界（默认）</option>
          {worldviews.map(wv=><option key={wv.id} value={wv.id}>{wv.name}</option>)}
        </select>
      </div>

      <div className="fd" style={{marginTop:12}}><label style={{fontSize:15,color:'var(--ac)'}}>📖 背景故事</label></div>
      <div className="fd"><textarea value={backstory} onChange={e=>setBackstory(e.target.value)} placeholder="角色的身份、经历、故事线" rows={4}/></div>

      <div className="fd"><label>AI 模型</label><input value={model} onChange={e=>setModel(e.target.value)} placeholder="deepseek-chat"/></div>

      <div style={{display:'flex',gap:8}}>
        <button type="submit" className="btn bp" disabled={saving}>{saving?'保存中...':'保存'}</button>
        <button type="button" className="btn bg" onClick={onCancel}>取消</button>
        {initial?.id && <button type="button" className="btn bd2" style={{marginLeft:'auto'}} onClick={()=>{if(confirm('确认删除角色：'+initial.name+'？此操作不可撤销。'))onDelete(initial.id)}}>✕ 删除角色</button>}
      </div>
    </form>
    {cropFile && <CropModal file={cropFile} aspectW={cropType==='avatar'?1:9} aspectH={cropType==='avatar'?1:16} onCrop={dataUrl=>{if(cropType==='avatar'){setAvatarUrl(dataUrl);setAvatar('')}else{setBgUrl(dataUrl)};setCropFile(null);setCropType('')}} onClose={()=>{if(cropType==='avatar')setAvatarFile(null);setCropFile(null);setCropType('')}}/>}
  </div></div>;
}

// Worldview Editor
function WorldviewEditor({initial, onSave, onCancel}) {
  const [name, setName] = useState(initial?.name || '');
  const [details, setDetails] = useState(initial ? ([initial.era||'（未设定时代）', initial.technology||'（未设定科技）', initial.world_events||''].join('\\n')) : '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async e => {
    e.preventDefault();
    if(!name.trim()) { setError('请输入世界观名称'); return; }
    setSaving(true); setError('');
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const lines = details.split('\\n');
      const clean = s => (s.startsWith('（未设定') || s.trim()==='') ? '' : s;
      const data = { user_id: uid, name: name.trim(), era: clean(lines[0]||''), technology: clean(lines[1]||''), world_events: lines.slice(2).map(clean).filter(Boolean).join('\\n')||'' };
      if(initial?.id) {
        await sup.from('worldviews').update(data).eq('id',initial.id);
      } else {
        await sup.from('worldviews').insert(data);
      }
      onSave();
    } catch(e) { setError(errMsg(e)); }
    setSaving(false);
  };

  return <div className="pg-center"><div className="pgc">
    <div className="pgt">{initial?.id?'编辑世界观':'🌍 创建世界观'}</div>
    <form onSubmit={handleSave}>
      {error && <div className="er">{error}</div>}
      <div className="fd"><label>世界观名称</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="如：唐朝贞观年间" autoFocus/></div>
      <div className="fd"><label>世界观详情</label><textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="描述这个世界的时代背景、科技水平、重大事件等" rows={6}/></div>
      <div style={{display:'flex',gap:8}}>
        <button type="submit" className="btn bp" disabled={saving}>{saving?'保存中...':'保存'}</button>
        <button type="button" className="btn bg" onClick={onCancel}>取消</button>
      </div>
    </form>
  </div></div>;
}

// Worldview List
function WorldviewList({items, onEdit, onDelete, onBack}) {
  return <div className="pg-center"><div className="pgc">
    <div className="pgt">📚 世界观列表</div>
    {isMobile() && <button className="btn bg" style={{marginBottom:12}} onClick={onBack}>← 返回</button>}
    {items.length === 0 && <p style={{color:'var(--t2)'}}>还没有世界观，去「🌍 创建世界观」做一个吧～</p>}
    {items.map(wv => <div key={wv.id} style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:'var(--rs)',padding:14,marginBottom:10}}>
      <div style={{fontWeight:600,marginBottom:4}}>{wv.name}</div>
      <div style={{fontSize:13,color:'var(--t2)'}}>时代：{wv.era||'未设定'} | 科技：{wv.technology||'未设定'}</div>
      {wv.world_events && <div style={{fontSize:13,color:'var(--t2)',marginTop:2}}>大事件：{wv.world_events}</div>}
      <div style={{marginTop:8,display:'flex',gap:6}}>
        <button className="btn bp bs" onClick={()=>onEdit(wv)}>✎ 编辑</button>
        <button className="btn bd2 bs" onClick={()=>{if(confirm('删除世界观：'+wv.name+'？')) onDelete(wv.id)}}>✕ 删除</button>
      </div>
    </div>)}
  </div></div>;
}

// Settings View
function SettingsView({userSettings, onSettingsUpdate, onBack, onLogout}) {
  const [tab, setTab] = useState('api');
  const [apiKey, setApiKey] = useState(userSettings.api_key || localStorage.getItem('api_key') || '');
  const [apiBase, setApiBase] = useState(userSettings.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
  const [defaultModel, setDefaultModel] = useState(userSettings.default_model || localStorage.getItem('default_model') || 'deepseek-chat');
  const [displayName, setDisplayName] = useState(userSettings.display_name || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(userSettings.avatar_url || '');
  const [gender, setGender] = useState(userSettings.gender || '');
  const [imageApiKey, setImageApiKey] = useState(userSettings.image_api_key || localStorage.getItem('image_api_key') || '');
  const [imageApiBase, setImageApiBase] = useState(userSettings.image_api_base_url || localStorage.getItem('image_api_base_url') || 'https://api.hypereal.cloud/v1');
  const [imageModel, setImageModel] = useState(userSettings.image_model || localStorage.getItem('image_model') || 'nano-banana-pro');
  const [imageSize, setImageSize] = useState(userSettings.image_size || localStorage.getItem('image_size') || '1024x1024');
  const [imageQuality, setImageQuality] = useState(userSettings.image_quality || localStorage.getItem('image_quality') || 'standard');
  const [imageStyle, setImageStyle] = useState(userSettings.image_style || localStorage.getItem('image_style') || '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleAvatarFile = async e => {
    const file = e.target.files[0];
    if(!file) return;
    try {
      setAvatarFile(file);
      const dataUrl = await compressImage(file, 400, 400);
      setAvatarUrl(dataUrl);
    } catch(e) { setMsg('图片处理失败'); }
  };

  const saveSettings = async () => {
    setSaving(true); setMsg('');
    try {
      localStorage.setItem('api_key', apiKey);
      localStorage.setItem('api_base_url', apiBase);
      localStorage.setItem('default_model', defaultModel);
      localStorage.setItem('image_api_key', imageApiKey);
      localStorage.setItem('image_api_base_url', imageApiBase);
      localStorage.setItem('image_model', imageModel);
      localStorage.setItem('image_size', imageSize);
      localStorage.setItem('image_quality', imageQuality);
      localStorage.setItem('image_style', imageStyle);

      const uid = (await sup.auth.getUser()).data.user.id;
      await sup.from('user_settings').upsert({user_id:uid, api_key:apiKey, api_base_url:apiBase, default_model:defaultModel, display_name:displayName, avatar_url:avatarUrl, gender, image_api_key:imageApiKey, image_api_base_url:imageApiBase, image_model:imageModel, image_size:imageSize, image_quality:imageQuality, image_style:imageStyle},{onConflict:'user_id'});
      onSettingsUpdate({api_key:apiKey, api_base_url:apiBase, default_model:defaultModel, display_name:displayName, avatar_url:avatarUrl, gender, image_api_key:imageApiKey, image_api_base_url:imageApiBase, image_model:imageModel, image_size:imageSize, image_quality:imageQuality, image_style:imageStyle});
      setMsg('保存成功！');
      setTimeout(()=>setMsg(''), 2000);
    } catch(e) { setMsg(errMsg(e)); }
    setSaving(false);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = async e => {
      const file = e.target.files[0];
      if(!file) return;
      try {
        setMsg('导入中...');
        const text = await file.text();
        const data = JSON.parse(text);
        const uid = (await sup.auth.getUser()).data.user.id;
        const botMap = {};
        let cntB=0,cntW=0,cntM=0;
        if(data.bots) for(const b of data.bots) { const oldId = b.id; delete b.id; b.user_id = uid; const r = await sup.from('bots').insert(b).select('id').single(); if(r.data) botMap[oldId] = r.data.id; cntB++; setMsg('导入角色 '+cntB+'/'+data.bots.length+'...'); }
        if(data.worldviews) for(const w of data.worldviews) { delete w.id; w.user_id = uid; await sup.from('worldviews').insert(w); cntW++; }
        if(data.messages){ const msgs=data.messages; for(const m of msgs) { delete m.id; m.user_id = uid; if(botMap[m.bot_id]) m.bot_id = botMap[m.bot_id]; await sup.from('messages').insert(m); cntM++; } }
        setMsg('导入成功！角色 '+cntB+' 个，世界观 '+cntW+' 个，消息 '+cntM+' 条。');
        onSettingsUpdate(userSettings);
      } catch(e) { setMsg('导入失败：' + errMsg(e)); }
    };
    input.click();
  };

  const exportData = async () => {
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const [bots, worldviews, messages] = await Promise.all([
        sup.from('bots').select('*').eq('user_id',uid),
        sup.from('worldviews').select('*').eq('user_id',uid),
        sup.from('messages').select('*').eq('user_id',uid)
      ]);
      const json = JSON.stringify({bots:bots.data,worldviews:worldviews.data,messages:messages.data},null,2);
      const blob = new Blob([json],{type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'chatbot-backup-' + new Date().toISOString().slice(0,10) + '.json';
      a.click(); URL.revokeObjectURL(url);
      setMsg('导出成功！');
    } catch(e) { setMsg(errMsg(e)); }
  };

  return <div className="pg-center"><div className="pgc">
    <div className="pgt">⚙️ 设置</div>
    {isMobile() && <button className="btn bg" style={{marginBottom:12}} onClick={onBack}>← 返回</button>}
    {msg && <div style={{background:msg.includes('成功')?'#f0fdf4':'#fef2f2',color:msg.includes('成功')?'#16a34a':'#dc2626',border:'1px solid '+(msg.includes('成功')?'#bbf7d0':'#fecaca'),borderRadius:8,padding:10,fontSize:13,marginBottom:12,textAlign:'center'}}>{msg}</div>}

    <div className="seg">
      <button className={tab==='api'?'ac':''} onClick={()=>setTab('api')}>🔑 API</button>
      <button className={tab==='account'?'ac':''} onClick={()=>setTab('account')}>👤 账号</button>
      <button className={tab==='data'?'ac':''} onClick={()=>setTab('data')}>🔄 数据</button>
    </div>

    <div className="setw">
      {tab === 'api' && <div>
        <div className="fd"><label>API Key</label><input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-..."/></div>
        <div className="fd"><label>Base URL</label><input value={apiBase} onChange={e=>setApiBase(e.target.value)} placeholder="https://api.deepseek.com/v1"/></div>
        <div className="fd"><label>默认模型</label><input value={defaultModel} onChange={e=>setDefaultModel(e.target.value)} placeholder="deepseek-chat"/></div>
        <div className="fd" style={{marginTop:12,borderTop:'1px solid var(--bd)',paddingTop:12}}><label style={{fontWeight:600,color:'var(--ac)'}}>🎨 生图 API</label></div>
        <div className="fd"><label>生图 API Key</label><input type="password" value={imageApiKey} onChange={e=>setImageApiKey(e.target.value)} placeholder="ck_..."/></div>
        <div className="fd"><label>生图 Base URL</label><input value={imageApiBase} onChange={e=>setImageApiBase(e.target.value)} placeholder="https://api.hypereal.cloud/v1"/></div>
        <div className="fd"><label>生图模型</label><input value={imageModel} onChange={e=>setImageModel(e.target.value)} placeholder="nano-banana-pro"/></div>
        <div className="fd"><label>图片尺寸</label><select value={imageSize} onChange={e=>setImageSize(e.target.value)}><option value="1024x1024">1:1 正方形</option><option value="1024x1536">2:3 竖屏</option><option value="1536x1024">3:2 横屏</option><option value="1024x1792">9:16 全屏</option></select></div>
        <div className="fd"><label>图片清晰度</label><select value={imageQuality} onChange={e=>setImageQuality(e.target.value)}><option value="standard">标准</option><option value="hd">高清 (2K)</option><option value="4k">超清 (4K)</option></select></div>
        <div className="fd"><label>图片风格</label><input value={imageStyle} onChange={e=>setImageStyle(e.target.value)} placeholder="如：写实摄影、二次元、水墨画...（留空则自动）"/></div>
      </div>}
      {tab === 'account' && <div>
        <div className="fd"><label>用户名称</label><input value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="你的名字"/></div>
        <div className="fd"><label>头像</label><div style={{display:'flex',gap:10,alignItems:'center'}}><div className="mav" style={{width:40,height:40}}>{avatarUrl?<img src={avatarUrl} alt=""/>:'👤'}</div><input type="file" accept="image/*" onChange={handleAvatarFile} style={{fontSize:14}}/></div></div>
        <div className="fd"><label>性别</label><select value={gender} onChange={e=>setGender(e.target.value)}><option value="">其他</option><option value="male">男</option><option value="female">女</option></select></div>
        <div className="fd"><button className="btn bd2" style={{width:'100%'}} onClick={onLogout}>⇱ 退出登录</button></div>
      </div>}
      {tab === 'data' && <div>
        <p style={{marginBottom:12,color:'var(--t2)'}}>导出所有角色、世界观和对话记录为 JSON 文件，也可以从 JSON 文件导入恢复数据。</p>
        <div style={{display:'flex',gap:8}}>
          <button className="btn bp" onClick={exportData}>📦 导出备份</button>
          <button className="btn bp" onClick={importData}>📥 导入备份</button>
        </div>
      </div>}
      <div style={{marginTop:16}}>
        <button className="btn bp" style={{width:'100%'}} onClick={saveSettings} disabled={saving}>{saving?'保存中...':'💾 保存设置'}</button>
      </div>
    </div>
  </div></div>;
}

// Story Editor
function StoryEditor({bots, worldviews, initial, onSave, onCancel}) {
  const [name, setName] = useState(initial?.name || '');
  const [background, setBackground] = useState(initial?.background || '');
  const [worldviewId, setWorldviewId] = useState(initial?.worldview_id || '');
  const [selectedBots, setSelectedBots] = useState(initial?.bot_ids || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const availableBots = bots.filter(b => !worldviewId || b.worldview_id == worldviewId);

  const toggleBot = id => {
    if(selectedBots.includes(id)) setSelectedBots(selectedBots.filter(bid=>bid!==id));
    else setSelectedBots([...selectedBots, id]);
  };

  const handleSave = async e => {
    e.preventDefault();
    if(!name.trim()) { setError('请输入剧本名称'); return; }
    if(selectedBots.length===0) { setError('请至少选择1个角色'); return; }
    setSaving(true); setError('');
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const sd = {user_id:uid, name:name.trim(), background, worldview_id:worldviewId||null};
      let storyId;
      if(initial?.id) {
        await sup.from('stories').update(sd).eq('id',initial.id);
        await sup.from('story_characters').delete().eq('story_id',initial.id);
        storyId = initial.id;
      } else {
        const r = await sup.from('stories').insert(sd).select('id').single();
        storyId = r.data.id;
      }
      for(const bid of selectedBots) {
        await sup.from('story_characters').insert({story_id:storyId, bot_id:bid});
      }
      onSave();
    } catch(e) { setError(errMsg(e)); }
    setSaving(false);
  };

  return <div className="pg-center"><div className="pgc">
    <div className="pgt">{initial?.id?'编辑剧本':'📜 创建剧本'}</div>
    <form onSubmit={handleSave}>
      {error && <div className="er">{error}</div>}
      <div className="fd"><label>剧本名称</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="给剧本起个名字" autoFocus/></div>
      <div className="fd"><label>故事背景</label><textarea value={background} onChange={e=>setBackground(e.target.value)} placeholder="描述这个剧本的故事背景、时代、主线剧情等" rows={4}/></div>
      <div className="fd"><label>选择世界观（限制可选角色）</label>
        <select value={worldviewId} onChange={e=>{setWorldviewId(e.target.value);setSelectedBots([])}}>
          <option value="">不限世界观</option>
          {worldviews.map(wv=><option key={wv.id} value={wv.id}>{wv.name}</option>)}
        </select>
      </div>
      <div className="fd"><label>选择参演角色 {availableBots.length>0?('（共'+availableBots.length+'个可选）'):''}</label>
        <div style={{maxHeight:180,overflowY:'auto',border:'1px solid var(--bd)',borderRadius:8,padding:8}}>
          {availableBots.length===0 && <div style={{color:'var(--t2)',fontSize:13}}>{worldviewId?'该世界观下没有角色，请先创建':'请选择世界观后，再选择角色'}</div>}
          {availableBots.map(b => <label key={b.id} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 8px',cursor:'pointer',borderRadius:6,background:selectedBots.includes(b.id)?'var(--ac)20':'',fontSize:14,marginBottom:2}}>
            <input type="checkbox" checked={selectedBots.includes(b.id)} onChange={()=>toggleBot(b.id)} style={{width:16,height:16}}/>
            <span style={{fontSize:18}}>{b.avatar_url?<img src={b.avatar_url} style={{width:24,height:24,borderRadius:'50%',objectFit:'cover',verticalAlign:'middle'}} alt=""/>:b.avatar}</span>
            <span>{b.name}</span>
            {b.worldview_id && <span style={{fontSize:11,color:'var(--t2)'}}>（{worldviews.find(w=>w.id==b.worldview_id)?.name||''}）</span>}
          </label>)}
        </div>
      </div>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <button type="submit" className="btn bp" disabled={saving}>{saving?'保存中...':'保存'}</button>
        <button type="button" className="btn bg" onClick={onCancel}>取消</button>
      </div>
    </form>
  </div></div>;
}

// Story List
function StoryList({items, bots, onChat, onEdit, onDelete, onBack}) {
  return <div className="pg-center"><div className="pgc">
    <div className="pgt">📜 剧本列表</div>
    {isMobile() && <button className="btn bg" style={{marginBottom:12}} onClick={onBack}>← 返回</button>}
    {items.length===0 && <p style={{color:'var(--t2)'}}>还没有剧本，去「📜 创建剧本」做一个吧～</p>}
    {items.map(st => <div key={st.id} style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:'var(--rs)',padding:14,marginBottom:10}}>
      <div style={{fontWeight:600,marginBottom:2}}>{st.name}</div>
      {st.background && <div style={{fontSize:13,color:'var(--t2)',marginBottom:4}}>{st.background.slice(0,80)}{st.background.length>80?'...':''}</div>}
      <div style={{fontSize:12,color:'var(--sm)',marginBottom:8}}>参演角色：{st.characters||0} 人</div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
        <button className="btn bp bs" onClick={()=>onChat(st)}>💬 对话</button>
        <button className="btn bg bs" onClick={()=>onEdit(st)}>✎ 编辑</button>
        <button className="btn bd2 bs" onClick={()=>{if(confirm('删除剧本：'+st.name+'？'))onDelete(st.id)}}>✕ 删除</button>
      </div>
    </div>)}
  </div></div>;
}

// Story Chat
function StoryChat({story, bots, userSettings, onBack}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [typing, setTyping] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [sceneUrl, setSceneUrl] = useState(localStorage.getItem('story-scene-'+story.id) || null);
  const [genning, setGening] = useState(false);
  const msgsRef = useRef(null);
  const sumRef = useRef('');

  const loadMessages = async () => {
    try {
      const r = await sup.from('story_messages').select('*').eq('story_id',story.id).order('created_at',{ascending:true});
      setMessages(r.data || []);
    } catch(e) { setMessages([]); }
  };

  useEffect(()=>{ loadMessages(); }, [story.id]);
  useEffect(()=>{ msgsRef.current?.scrollTo(0,msgsRef.current.scrollHeight); }, [messages.length]);

  const clearChat = async () => {
    if(confirm('确认清空聊天记录？')) {
      await sup.from('story_messages').delete().eq('story_id',story.id);
      setMessages([]);
      saveScene(null);
    }
  };

  const buildStoryPrompt = () => {
    const chars = bots.filter(b => story.bot_ids?.includes(b.id));
    const nl = '\\n';
    let p = '你是一个剧本的叙述者，需要轮流扮演以下角色。每次只以一个角色的身份发言。' + nl + nl;
    p += '【剧本名称】' + story.name + nl;
    if(story.background) p += '【故事背景】' + story.background + nl;
    p += nl;
    chars.forEach(c => {
      p += '━━━ ' + c.name + ' ━━━' + nl;
      if(c.basic_info) p += '基本信息：' + c.basic_info + nl;
      if(c.appearance) p += '外貌：' + c.appearance + nl;
      if(c.personality) p += '性格：' + c.personality + nl;
      if(c.backstory) p += '背景：' + c.backstory + nl;
      if(c.speaking_style) p += '讲话风格：' + c.speaking_style + nl;
      p += nl;
    });
    if(sumRef.current) p += '【历史摘要】之前的对话关键信息：' + sumRef.current + nl + nl;
    p += '【规则】' + nl + '1.每次回复选一个最合适的角色发言，格式：【角色名】内容' + nl + '2.（）内为动作或心理，必须以角色名为主语，如"（' + (chars[0]?.name||'她') + '轻轻点头）"' + nl + '3.推动剧情发展，可以自主切换说话的角色' + nl + '4.严格遵守每个角色的性格设定' + nl;
    p += '5.【NPC生成】当剧情需要配角出场时（路人、家人、同事等未登记角色），你必须让他们直接出场说话，用【NPC名】作为前缀。NPC的性格从剧情上下文和已有角色关系中自动推导。每个NPC至少要有1-2句直接对话，带有独立的语气和小动作，严禁只靠旁白转述。NPC的言行必须符合剧本的世界观和时代背景。⚠️NPC出场前必须先检查空间逻辑：已明确的空间（如密室、飞机上、深山里独处）不能无理由地冒出NPC，出场必须有合理的空间基础（敲门、打电话、路过、本就应在场等）。如剧情不允许任何人出现，就正常推进不强行塞NPC。' + nl;
    p += '6.【口语自然度】每个角色的说话方式必须像真人：禁止AI味开头（好的、明白了等）；句子可以破碎带语气词（呃、嗯、啊）；情绪要从文字里透出来（生气时句子变短、紧张时结巴）；主动提问吐槽转移话题，不要被动等用户问；每轮最多2个括号动作描述。';
    return p;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if(!text || loading) return;
    setInput('');
    const uid = (await sup.auth.getUser()).data.user.id;
    const userMsg = {story_id:story.id,role:'user',content:text,user_id:uid};
    setTyping(true);
    try {
      const apiKey = userSettings?.api_key || localStorage.getItem('api_key') || '';
      let baseUrl = (userSettings?.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings?.default_model || localStorage.getItem('default_model') || 'deepseek-chat';
      if(!apiKey) { setError('请配置API Key'); setTyping(false); return; }
      setError('');
      const r0 = await sup.from('story_messages').insert(userMsg).select('id').single();
      const userMsgId = r0.data?.id;
      setMessages(prev=>[...prev, {...userMsg, id:userMsgId}]);
      const allMsgs = messages.concat(userMsg);
      const chatHistory = allMsgs.length > 40 ? allMsgs.slice(-40).map(m=>({role:m.role,content:m.content})) : allMsgs.map(m=>({role:m.role,content:m.content}));
      const systemPrompt = buildStoryPrompt();
      const res = await fetch(baseUrl + '/chat/completions', {
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'system',content:systemPrompt},...chatHistory],max_tokens:2048,temperature:0.85})
      });
      if(!res.ok){ const ed=await res.json().catch(()=>({})); throw {message:ed.error?.message||'API错误'}; }
      const d = await res.json();
      const reply = d.choices[0].message.content;
      const botMsg = {story_id:story.id,role:'assistant',content:reply,user_id:uid};
      const br = await sup.from('story_messages').insert(botMsg).select('id').single();
      const savedBotMsg = br.data ? {...botMsg, id:br.data.id} : botMsg;
      setMessages(prev=>{const arr=[...prev,savedBotMsg];return arr;});
      // Generate summary every 60 messages
      const allMsgs2 = [...messages, savedBotMsg];
      if(allMsgs2.length >= 60 && allMsgs2.length % 30 === 0) {
        try {
          const older = allMsgs2.slice(0, allMsgs2.length-40);
          const hist = older.map(m=>(m.role==='user'?'用户':'角色')+':'+m.content).slice(0,20).join('\\n');
          const sr = await fetch(baseUrl + '/chat/completions', {
            method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
            body:JSON.stringify({model,messages:[{role:'system',content:'对话摘要助手，200字内。'+(sumRef.current?('已有：'+sumRef.current):'')},{role:'user',content:'总结：'+hist}],max_tokens:300,temperature:0.3})
          });
          if(sr.ok){const sd=await sr.json();sumRef.current=sd.choices[0].message.content;}
        } catch(e) {}
      }
    } catch(e) { setError(errMsg(e)); if(userMsgId){setMessages(prev=>prev.filter(m=>m.id!==userMsgId));sup.from('story_messages').delete().eq('id',userMsgId).then(()=>{});} }
    setTyping(false);
  };

  const startEdit = (msg) => { setEditingId(msg.id); setEditText(msg.content); };
  const cancelEdit = () => { setEditingId(null); setEditText(''); };

  const saveEdit = async (msgId) => {
    if(!editText.trim() || loading) return;
    const text = editText.trim();
    setEditingId(null); setEditText('');
    setTyping(true);
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const msgIdx = messages.findIndex(m=>m.id===msgId);
      if(msgIdx<0) { setTyping(false); return; }
      const toDelete = messages.slice(msgIdx);
      for(const m of toDelete) { await sup.from('story_messages').delete().eq('id',m.id); }
      const updatedMsg = {story_id:story.id, role:'user', content:text, user_id:uid};
      const r = await sup.from('story_messages').insert(updatedMsg).select('id').single();
      const newMsgs = messages.slice(0, msgIdx).concat(r.data?{...updatedMsg,id:r.data.id}:updatedMsg);
      setMessages(newMsgs);
      const apiKey = userSettings?.api_key || localStorage.getItem('api_key') || '';
      let baseUrl = (userSettings?.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings?.default_model || localStorage.getItem('default_model') || 'deepseek-chat';
      if(!apiKey) { setError('请配置API Key'); setTyping(false); return; }
      setError('');
      const systemPrompt = buildStoryPrompt();
      const chatHistory = newMsgs.length > 40 ? newMsgs.slice(-40).map(m=>({role:m.role,content:m.content})) : newMsgs.map(m=>({role:m.role,content:m.content}));
      const res = await fetch(baseUrl + '/chat/completions', {
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'system',content:systemPrompt},...chatHistory],max_tokens:2048,temperature:0.85})
      });
      if(!res.ok){ const ed=await res.json().catch(()=>({})); throw {message: ed.error?.message||'API错误: '+res.status}; }
      const d = await res.json();
      const reply = d.choices[0].message.content;
      const botMsg = {story_id:story.id,role:'assistant',content:reply,user_id:uid};
      const br = await sup.from('story_messages').insert(botMsg).select('id').single();
      setMessages(prev=>[...prev, br.data?{...botMsg,id:br.data.id}:botMsg]);
    } catch(e) { setError(errMsg(e)); }
    setTyping(false);
  };

  const regenerateReply = async () => {
    if(loading || messages.length===0) return;
    const lastMsg = messages[messages.length-1];
    if(lastMsg.role!=='assistant') return;
    setTyping(true);
    try {
      await sup.from('story_messages').delete().eq('id',lastMsg.id);
      const truncated = messages.slice(0,-1);
      setMessages(truncated);
      const apiKey = userSettings?.api_key || localStorage.getItem('api_key') || '';
      let baseUrl = (userSettings?.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings?.default_model || localStorage.getItem('default_model') || 'deepseek-chat';
      if(!apiKey) { setError('请配置API Key'); setTyping(false); return; }
      setError('');
      const systemPrompt = buildStoryPrompt();
      const chatHistory = truncated.length > 40 ? truncated.slice(-40).map(m=>({role:m.role,content:m.content})) : truncated.map(m=>({role:m.role,content:m.content}));
      const res = await fetch(baseUrl + '/chat/completions', {
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'system',content:systemPrompt},...chatHistory],max_tokens:2048,temperature:0.85})
      });
      if(!res.ok){ const ed=await res.json().catch(()=>({})); throw {message: ed.error?.message||'API错误: '+res.status}; }
      const d = await res.json();
      const reply = d.choices[0].message.content;
      const uid = (await sup.auth.getUser()).data.user.id;
      const botMsg = {story_id:story.id,role:'assistant',content:reply,user_id:uid};
      const br = await sup.from('story_messages').insert(botMsg).select('id').single();
      setMessages(prev=>[...prev, br.data?{...botMsg,id:br.data.id}:botMsg]);
    } catch(e) { setError(errMsg(e)); }
    setTyping(false);
  };

  const saveScene = url => { setSceneUrl(url); if(url) localStorage.setItem('story-scene-'+story.id, url); else localStorage.removeItem('story-scene-'+story.id); };

  const genScene = async () => {
    if(genning || messages.length < 2) return;
    setGening(true);
    try {
      const ctx = '剧本：' + story.name + (story.background ? '。故事背景：'+story.background : '') + '。登场角色：' + chars.map(c=>c.name+(c.appearance?'（'+c.appearance+'）':'')).join('、');
      const scenePrompt = '请根据剧本设定和对话内容，写一段适合图像生成的场景描述（80字内，必须包含当前出场角色的外貌特征、所在环境和姿势动作、光线氛围）。\\n' +
        ctx + '\\n最近剧情：\\n' +
        messages.slice(-4).map(m=>(m.role==='user'?'用户':'角色')+':'+m.content).join('\\n');
      const apiKey = userSettings?.api_key || localStorage.getItem('api_key') || '';
      let baseUrl = (userSettings?.api_base_url || localStorage.getItem('api_base_url') || 'https://api.deepseek.com/v1');
      while(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0,-1);
      const model = userSettings?.default_model || localStorage.getItem('default_model') || 'deepseek-chat';
      if(!apiKey) { setError('请配置API Key'); setGening(false); return; }
      const pr = await fetch(baseUrl + '/chat/completions', {
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
        body:JSON.stringify({model,messages:[{role:'user',content:scenePrompt}],max_tokens:200,temperature:0.7})
      });
      if(!pr.ok) throw {message:'场景描述生成失败'};
      const pd = await pr.json();
      const desc = pd.choices[0].message.content;
      const imgUrl = await generateImage(desc, userSettings);
      saveScene(imgUrl);
    } catch(e) { setError(errMsg(e)); }
    setGening(false);
  };

  const chars = bots.filter(b => story.bot_ids?.includes(b.id));
  const color = chars[0]?.theme_color || '#6366f1';
  const ua = userSettings?.avatar_url;

  return <div className="ch">
    <div className="chh">
      <div className="chi">
        <div className="cha" style={{fontSize:22,width:'auto',padding:'0 6px',display:'flex',alignItems:'center',gap:2,overflow:'hidden'}}>{chars.slice(0,4).map(c => c.avatar_url ? <img key={c.id} src={c.avatar_url} style={{width:24,height:24,borderRadius:'50%',objectFit:'cover'}}/> : <span key={c.id}>{c.avatar || '🤖'}</span>)}</div>
        <div>
          <div className="chn">{story.name}</div>
          <div style={{fontSize:11,color:'var(--t2)'}}>{chars.map(c=>c.name).join('、')}</div>
        </div>
      </div>
      {isMobile() && <button className="btn bs bg ch-back" onClick={onBack}>←</button>}
      <button className="btn bs bg ch-clear" onClick={clearChat}>🗑</button>
      <button className="btn bs bg" onClick={genScene} disabled={genning||messages.length<2} title="生成场景插图">{genning?'⏳':'🎨'}</button>
      <button className="btn bs bg ch-home" onClick={()=>window.location.reload()}>🏠</button>
    </div>
    <div className="ms" ref={msgsRef}>
      {messages.length===0&&!error&&<div className="mse"><h3>🎭 {story.name}</h3><p>发送第一条消息开始剧情...</p></div>}
      {error&&<div className="er" style={{margin:'0 4px'}}>{error}<button className="logob" style={{marginLeft:8}} onClick={()=>setError('')}>关闭</button></div>}
      {messages.map((m,i)=>{
        const isUser = m.role==='user';
        const isLast = i===messages.length-1;
        const isEditing = editingId===m.id;
        if(isEditing) {
          return <div key={i} className="mr u">
            <div className="mav ua">{ua?<img src={ua} alt=""/>:'👤'}</div>
            <div style={{flex:1,maxWidth:'85%'}}>
              <textarea value={editText} onChange={e=>setEditText(e.target.value)} style={{width:'100%',padding:'10px 14px',borderRadius:14,border:'2px solid var(--ac)',fontSize:15,fontFamily:'inherit',resize:'vertical',minHeight:60,outline:'none',background:'var(--bg2)',color:'var(--tx)'}} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();saveEdit(m.id)}}}/>
              <div style={{display:'flex',gap:6,marginTop:6,justifyContent:'flex-end'}}>
                <button className="btn bs bg" onClick={cancelEdit}>取消</button>
                <button className="btn bp bs" onClick={()=>saveEdit(m.id)}>保存并重新生成</button>
              </div>
            </div>
          </div>;
        }
        const bn = !isUser&&m.content.match(/^【(.+?)】/) ? m.content.match(/^【(.+?)】/)[1] : '';
        const b = chars.find(c=>c.name===bn);
        const av = b ? (b.avatar_url||b.avatar) : '🎭';
        const bc = b?.theme_color || color;
        const displayContent = !isUser ? m.content.replace(/^【.+?】\s*/,'') : m.content;
        return <div key={i} className={"mr"+(isUser?" u":"")}>
          {!isUser ? <div className="mav" style={{background:bc+'20',fontSize:14}}>{typeof av==='string'&&av.startsWith('data:')?<img src={av} alt=""/>:av}</div>
            : <div className="mav ua">{ua?<img src={ua} alt=""/>:'👤'}</div>}
          <div>
            <div className={"mb "+(isUser?"ub":"ab")} style={isUser?null:{borderLeft:'3px solid '+bc}}>
              {!isUser && bn && <div style={{fontSize:11,color:bc,fontWeight:600,marginBottom:2}}>{bn}</div>}
              {displayContent}
            </div>
            {isUser && <button className="msg-act" onClick={()=>startEdit(m)}>┆ 编辑</button>}
            {!isUser && isLast && <button className="msg-act" onClick={regenerateReply}>↻ 重新生成</button>}
          </div>
          {!isUser && <div className="msg-spacer" style={{width:32,flexShrink:0}}/>}
        </div>;
      })}
      {typing && <TypingIndicator name="剧组" avatar="🎭" color={color}/>}
      {sceneUrl && <div style={{padding:'0 4px',position:'relative'}}>
        <img src={sceneUrl} alt="场景插图" style={{width:'100%',maxWidth:400,borderRadius:12,margin:'8px 0',display:'block'}} onClick={()=>window.open(sceneUrl)}/>
        <div style={{display:'flex',gap:4,marginTop:-4}}>
          <button className="msg-act" onClick={()=>{const u=sceneUrl.startsWith('data:')?URL.createObjectURL(new Blob([Uint8Array.from(atob(sceneUrl.split(',')[1]),c=>c.charCodeAt(0))],{type:'image/png'})):sceneUrl;const a=document.createElement('a');a.href=u;a.download='scene.png';document.body.appendChild(a);a.click();document.body.removeChild(a);if(u!==sceneUrl)URL.revokeObjectURL(u)}} style={{opacity:1,fontSize:11}}>💾 保存</button>
          <button className="msg-act" onClick={genScene} style={{opacity:1,fontSize:11}}>🔄 重新生成</button>
          <button className="msg-act" onClick={()=>saveScene(null)} style={{opacity:1,fontSize:11}}>✕ 关闭</button>
        </div>
      </div>}
    </div>
    <div className="inp">
      <textarea value={input} onChange={e=>{setInput(e.target.value)}} onInput={e=>{e.target.style.height='42px';e.target.style.height=Math.min(e.target.scrollHeight,120)+'px'}} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}}} placeholder="输入消息...（Enter发送）" rows={1}/>
      <button onClick={sendMessage} disabled={loading||!input.trim()||editingId}>发送</button>
    </div>
  </div>;
}

// Sidebar
function Sidebar({bots, activeId, onSelect, onCreate, onEdit, onSettings, onHome, open, onClose, onLogout, email, userProfile, onProfileClick, onWorldviewList, onCreateWorldview, onCreateStory, onStoryList, darkMode, onToggleDark}) {
  const [listOpen, setListOpen] = useState(false);
  const handleSelect = id => { onSelect(id); setListOpen(false); if(isMobile()) onClose(); };

  return <><aside className={"sv" + (open ? ' open' : '')}>
    <div className="svh">
      <div className="svl" onClick={()=>{onHome();if(isMobile())onClose()}} title="回首页">AI角色扮演</div>
      <button className="svc" onClick={onClose}>✕</button>
    </div>

    <div className="sa">
      <button className="sbtn2" onClick={()=>{onCreate();if(isMobile())onClose()}}>✨ 创建角色</button>
      <button className="sbtn2" onClick={()=>setListOpen(!listOpen)}>📋 角色列表{listOpen?' ▾':' ▸'}</button>
      {listOpen && <div style={{padding:'0 0 4px'}}>

      {bots.map(b => <div key={b.id} className={"bli" + (b.id===activeId?' active':'')} onClick={()=>handleSelect(b.id)} onPointerDown={()=>handleSelect(b.id)}>
        <span className="bia">{b.avatar_url ? <img src={b.avatar_url} alt=""/> : b.avatar}</span>
        <span className="bin">{b.name}</span>
      </div>)}
      {bots.length===0 && <div className="ble"><p>还没有角色</p><p>点 ✨ 创建角色 来做一个～</p></div>}
      </div>}
      <button className="sbtn2" onClick={()=>{onCreateWorldview();if(isMobile())onClose()}}>🌍 创建世界观</button>
      <button className="sbtn2" onClick={()=>{onWorldviewList();if(isMobile())onClose()}}>📚 世界观列表</button>
      <button className="sbtn2" onClick={()=>{onCreateStory();if(isMobile())onClose()}}>📜 创建剧本</button>
      <button className="sbtn2" onClick={()=>{onStoryList();if(isMobile())onClose()}}>📋 剧本列表</button>
      <button className="sbtn2" onClick={()=>{onSettings();if(isMobile())onClose()}}>⚙️ 设置</button>
    </div>

    <div style={{flex:1}}/>

    <div className="sa" style={{borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:8}}>
      <button className="sbtn2" onClick={onToggleDark}>{darkMode?'☀️ 切换亮色':'🌙 切换暗色'}</button>
    </div>

    <div className="sf" onClick={()=>{onProfileClick();if(isMobile())onClose()}}>
      {userProfile?.avatar_url && <img src={userProfile.avatar_url} alt="" style={{width:32,height:32,borderRadius:'50%',objectFit:'cover'}} onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex'}}/>}
      <div className="mav ua" style={{flexShrink:0,display:userProfile?.avatar_url?'none':'flex'}}>👤</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,color:'var(--st)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{userName(userProfile?.display_name)}</div>
        {email && <div className="lou">{email}</div>}
      </div>
      <button className="lobtn" onClick={e=>{e.stopPropagation();onLogout()}} title="退出登录">⇱</button>
    </div>
  </aside>
  <div className={"sideo" + (open?' show':'')} onClick={onClose}/></>;
}

// Main App
function MainApp({darkMode, onToggleDark}) {
  const [view, setView] = useState('home');
  const [activeBotId, setActiveBotId] = useState(null);
  const [bots, setBots] = useState([]);
  const [worldviews, setWorldviews] = useState([]);
  const [userSettings, setUserSettings] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingBot, setEditingBot] = useState(null);
  const [editingWorldview, setEditingWorldview] = useState(null);
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [editingStory, setEditingStory] = useState(null);

  const [userEmail, setUserEmail] = useState('');

  const loadBots = async () => {
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const r = await sup.from('bots').select('*').eq('user_id',uid).order('created_at');
      setBots(r.data || []);
    } catch(e) { setBots([]); }
  };

  const loadWorldviews = async () => {
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const r = await sup.from('worldviews').select('*').eq('user_id',uid).order('created_at');
      setWorldviews(r.data || []);
    } catch(e) { setWorldviews([]); }
  };

  const loadStories = async () => {
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const r = await sup.from('stories').select('*').eq('user_id',uid).order('created_at');
      if(r.data) {
        const s = [];
        for(const st of r.data) {
          const cr = await sup.from('story_characters').select('bot_id').eq('story_id',st.id);
          st.bot_ids = (cr.data||[]).map(c=>c.bot_id);
          st.characters = (cr.data||[]).length;
          s.push(st);
        }
        setStories(s);
      }
    } catch(e) { setStories([]); }
  };

  const loadSettings = async () => {
    try {
      const uid = (await sup.auth.getUser()).data.user.id;
      const r = await sup.from('user_settings').select('*').eq('user_id',uid).maybeSingle();
      if(r.data) setUserSettings(r.data);
      const u = await sup.auth.getUser();
      if(u.data.user?.email) setUserEmail(u.data.user.email);
    } catch(e) {}
  };

  const getUser = async () => {
    const r = await sup.auth.getUser();
    return r.data.user;
  };

  useEffect(()=>{ loadBots(); loadWorldviews(); loadStories(); loadSettings(); }, []);

  const handleLogout = () => sup.auth.signOut();

  const activeBot = bots.find(b => b.id === activeBotId);

  if(view === 'edit-bot' || view === 'create-bot') {
    return <div className="app">
        <BotEditor worldviews={worldviews} initial={editingBot} onSave={()=>{setEditingBot(null);setView('home');loadBots()}} onCancel={()=>{setEditingBot(null);setView(activeBot?'chat':'home')}} onDelete={async id=>{await sup.from('bots').delete().eq('id',id);setEditingBot(null);setView('home');loadBots()}}/>
    </div>;
  }

  if(view === 'edit-worldview' || view === 'create-worldview') {
    return <div className="app">
        <WorldviewEditor initial={editingWorldview} onSave={()=>{setEditingWorldview(null);setView('home');loadWorldviews()}} onCancel={()=>{setEditingWorldview(null);setView('home')}}/>
    </div>;
  }

  if(view === 'settings') {
    return <div className="app">
      <Sidebar bots={bots} activeId={activeBotId} onSelect={id=>{setActiveBotId(id);setView('chat')}} onCreate={()=>{setEditingBot(null);setView('create-bot')}}
        onEdit={b=>{setEditingBot(b);setView('edit-bot')}} onSettings={()=>setView('settings')}
        onHome={()=>{setActiveBotId(null);setView('home')}} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}
        onLogout={handleLogout} email={userEmail} userProfile={userSettings}
        onProfileClick={()=>setView('settings')}
        onWorldviewList={()=>setView('worldview-list')}
        onCreateWorldview={()=>{setEditingWorldview(null);setView('create-worldview')}} onCreateStory={()=>{setEditingStory(null);setView('create-story')}} onStoryList={()=>setView('story-list')} darkMode={darkMode} onToggleDark={onToggleDark}/>
      <div className="mn">
        {isMobile() && <button className="hmb" style={{display:'flex',padding:'8px 14px'}} onClick={()=>setSidebarOpen(true)}>☰</button>}
        <SettingsView userSettings={userSettings} onSettingsUpdate={s=>{setUserSettings(s);loadSettings()}} onBack={()=>setView('home')} onLogout={handleLogout}/>
      </div>
    </div>;
  }

  if(view === 'worldview-list') {
    return <div className="app">
      <Sidebar bots={bots} activeId={activeBotId} onSelect={id=>{setActiveBotId(id);setView('chat')}} onCreate={()=>{setEditingBot(null);setView('create-bot')}}
        onEdit={b=>{setEditingBot(b);setView('edit-bot')}} onSettings={()=>setView('settings')}
        onHome={()=>{setActiveBotId(null);setView('home')}} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}
        onLogout={handleLogout} email={userEmail} userProfile={userSettings}
        onProfileClick={()=>setView('settings')}
        onWorldviewList={()=>setView('worldview-list')}
        onCreateWorldview={()=>{setEditingWorldview(null);setView('create-worldview')}} onCreateStory={()=>{setEditingStory(null);setView('create-story')}} onStoryList={()=>setView('story-list')} darkMode={darkMode} onToggleDark={onToggleDark}/>
      <div className="mn">
        {isMobile() && <button className="hmb" style={{display:'flex',padding:'8px 14px'}} onClick={()=>setSidebarOpen(true)}>☰</button>}
        <WorldviewList items={worldviews} onEdit={wv=>{setEditingWorldview(wv);setView('edit-worldview')}} onDelete={async id=>{await sup.from('worldviews').delete().eq('id',id);loadWorldviews()}} onBack={()=>setView('home')}/>
      </div>
    </div>;
  }

  if(view === 'create-story' || view === 'edit-story') {
    return <div className="app">
        <StoryEditor bots={bots} worldviews={worldviews} initial={editingStory} onSave={()=>{setEditingStory(null);setView('story-list');loadStories()}} onCancel={()=>{setEditingStory(null);setView('story-list')}}/>
    </div>;
  }

  if(view === 'story-list') {
    return <div className="app">
      <Sidebar bots={bots} activeId={activeBotId} onSelect={id=>{setActiveBotId(id);setView('chat')}} onCreate={()=>{setEditingBot(null);setView('create-bot')}}
        onEdit={b=>{setEditingBot(b);setView('edit-bot')}} onSettings={()=>setView('settings')}
        onHome={()=>{setActiveBotId(null);setView('home')}} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}
        onLogout={handleLogout} email={userEmail} userProfile={userSettings}
        onProfileClick={()=>setView('settings')}
        onWorldviewList={()=>setView('worldview-list')}
        onCreateWorldview={()=>{setEditingWorldview(null);setView('create-worldview')}}
        onCreateStory={()=>{setEditingStory(null);setView('create-story')}}
        onStoryList={()=>setView('story-list')} darkMode={darkMode} onToggleDark={onToggleDark}/>
      <div className="mn">
        {isMobile() && <button className="hmb" style={{display:'flex',padding:'8px 14px'}} onClick={()=>setSidebarOpen(true)}>☰</button>}
        <StoryList items={stories} bots={bots} onChat={st=>{setActiveStory(st);setView('story-chat')}} onEdit={st=>{setEditingStory(st);setView('edit-story')}} onDelete={async id=>{await sup.from('stories').delete().eq('id',id);loadStories()}} onBack={()=>setView('home')}/>
      </div>
    </div>;
  }

  if(view === 'story-chat' && activeStory) {
    return <div className="app">
      <Sidebar bots={bots} activeId={activeBotId} onSelect={id=>{setActiveBotId(id);setView('chat')}} onCreate={()=>{setEditingBot(null);setView('create-bot')}}
        onEdit={b=>{setEditingBot(b);setView('edit-bot')}} onSettings={()=>setView('settings')}
        onHome={()=>{setActiveBotId(null);setView('home')}} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}
        onLogout={handleLogout} email={userEmail} userProfile={userSettings}
        onProfileClick={()=>setView('settings')}
        onWorldviewList={()=>setView('worldview-list')}
        onCreateWorldview={()=>{setEditingWorldview(null);setView('create-worldview')}}
        onCreateStory={()=>{setEditingStory(null);setView('create-story')}}
        onStoryList={()=>setView('story-list')} darkMode={darkMode} onToggleDark={onToggleDark}/>
      <div className="mn">
        <StoryChat story={activeStory} bots={bots} userSettings={userSettings} onBack={()=>{setActiveStory(null);setView('story-list')}}/>
      </div>
    </div>;
  }

  // Home or Chat view
  if(view === 'bot-detail' && activeBot) {
    const wv = worldviews.find(w=>w.id===activeBot.worldview_id);
    return <div className="app">
      <Sidebar bots={bots} activeId={activeBotId} onSelect={id=>{setActiveBotId(id);setView('chat')}} onCreate={()=>{setEditingBot(null);setView('create-bot')}}
        onEdit={b=>{setEditingBot(b);setView('edit-bot')}} onSettings={()=>setView('settings')}
        onHome={()=>{setActiveBotId(null);setView('home')}} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}
        onLogout={handleLogout} email={userEmail} userProfile={userSettings}
        onProfileClick={()=>setView('settings')}
        onWorldviewList={()=>setView('worldview-list')}
        onCreateWorldview={()=>{setEditingWorldview(null);setView('create-worldview')}} onCreateStory={()=>{setEditingStory(null);setView('create-story')}} onStoryList={()=>setView('story-list')} darkMode={darkMode} onToggleDark={onToggleDark}/>
      <div className="mn">
        {isMobile() && <button className="hmb" style={{display:'flex',padding:'8px 14px'}} onClick={()=>setSidebarOpen(true)}>☰</button>}
        <div className="pg-center"><div className="pgc">
          <div className="pgt">{activeBot.name} 的详细设定</div>
          <button className="btn bg" style={{marginBottom:12}} onClick={()=>setView('chat')}>← 返回聊天</button>
          <div style={{background:'var(--bg2)',border:'1px solid var(--bd)',borderRadius:'var(--rs)',padding:16}}>
            {[['角色名',activeBot.name],['头像',activeBot.avatar],['主题色',<span style={{display:'inline-block',width:16,height:16,borderRadius:'50%',background:activeBot.theme_color,verticalAlign:'middle'}}/>],['基本信息',activeBot.basic_info||'未设定'],['外貌设定',activeBot.appearance||'未设定'],['性格设定',activeBot.personality||'未设定'],['世界观',wv?wv.name:'当前时间真实世界'],['背景故事',activeBot.backstory||'未设定'],['AI模型',activeBot.model||'deepseek-chat']].map(([label,val],i)=><div key={i} style={{padding:'10px 0',borderBottom:i<8?'1px solid var(--bd)':'none'}}><div style={{fontSize:12,color:'var(--t2)',marginBottom:2}}>{label}</div><div style={{fontSize:14,whiteSpace:'pre-wrap'}}>{val||'未设定'}</div></div>)}
            <button className="btn bp" style={{marginTop:12}} onClick={()=>{setEditingBot(activeBot);setView('edit-bot')}}>✎ 编辑角色</button>
          </div>
        </div></div>
      </div>
    </div>;
  }

  // Home or Chat view
  return <div className="app">
    <Sidebar bots={bots} activeId={activeBotId} onSelect={id=>{setActiveBotId(id);setView('chat')}} onCreate={()=>{setEditingBot(null);setView('create-bot')}}
      onEdit={b=>{setEditingBot(b);setView('edit-bot')}} onSettings={()=>setView('settings')}
      onHome={()=>{setActiveBotId(null);setView('home')}} open={sidebarOpen} onClose={()=>setSidebarOpen(false)}
      onLogout={handleLogout} email={userEmail} userProfile={userSettings}
      onProfileClick={()=>setView('settings')}
      onWorldviewList={()=>setView('worldview-list')}
      onCreateWorldview={()=>{setEditingWorldview(null);setView('create-worldview')}} onCreateStory={()=>{setEditingStory(null);setView('create-story')}} onStoryList={()=>setView('story-list')} darkMode={darkMode} onToggleDark={onToggleDark}/>
    <div className="mn">
      {isMobile() && !activeBot && <button className="hmb" style={{display:'flex',padding:'8px 14px'}} onClick={()=>setSidebarOpen(true)}>☰</button>}
      {activeBot ? <ChatWindow bot={activeBot} userSettings={userSettings} onBack={()=>{setActiveBotId(null);setView('home')}} onViewDetail={()=>setView('bot-detail')}/> : <EmptyState onMenuClick={()=>setSidebarOpen(true)} onCreate={()=>{setEditingBot(null);setView('create-bot')}} onWorldviewList={()=>setView('worldview-list')}/>}
    </div>
  </div>;
}

// Root App
function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode')==='1');
  useEffect(() => {
    if(darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode?'1':'0');
  }, [darkMode]);
  useEffect(()=>{
    sup.auth.getSession().then(r => { setSession(r.data.session); setLoading(false); });
    const sub = sup.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.data.subscription.unsubscribe();
  }, []);
  if(loading) return <div className="auth-pg"><div style={{color:'var(--t2)'}}>加载中...</div></div>;
  if(!session) return <AuthPage/>;
  return <MainApp darkMode={darkMode} onToggleDark={()=>setDarkMode(!darkMode)}/>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);`;

const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"><title>AI角色扮演</title>
<style>${css}</style></head><body>
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script type="text/babel" data-presets="env,react">
${appJSX}
</script></body></html>`;

const outFile = 'C:/Users/32688/WorkBuddy/2026-07-23-17-16-11/chatbot-app/github-pages/index.html';
fs.writeFileSync(outFile, html, 'utf-8');
console.log('Built:', fs.statSync(outFile).size, 'bytes');

const m = html.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/);
try {
  babel.transformSync(m[1], { presets: ['@babel/preset-env', '@babel/preset-react'] });
  console.log('✅ Babel: JSX valid');
} catch(e) {
  console.log('❌ Babel:', e.message);
}
