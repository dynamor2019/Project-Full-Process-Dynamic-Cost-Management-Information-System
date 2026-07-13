import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../frontend/app.js");
let c = readFileSync(file, "utf8");

// helper: replace all occurrences of a literal string
function rep(oldStr, newStr) {
  c = c.split(oldStr).join(newStr);
}

// ── 登录页 eyebrow
rep("Course Base / Login", "\u5de5\u7a0b\u9020\u4ef7\u7ba1\u7406\u4fe1\u606f\u7cfb\u7edf");

// ── 登录页 hero-copy
rep(
  "\u4f60\u5c06\u4ece\u8fd9\u91cc\u8fdb\u5165\u8bfe\u7a0b\u9879\u76ee\u3002\u5148\u719f\u6089\u9875\u9762\u3001\u4efb\u52a1\u548c\u9a8c\u6536\u6807\u51c6\uff0c\u518d\u7528 AI \u5de5\u5177\u5b8c\u6210\u81ea\u5df1\u5c0f\u7ec4\u8d1f\u8d23\u7684\u5de5\u7a0b\u7ba1\u7406\u6a21\u5757\u3002",
  "\u8986\u76d6\u524d\u671f\u7b56\u5212\u3001\u5408\u540c\u6e05\u5355\u3001\u76ee\u6807\u6210\u672c\u3001\u8ba1\u91cf\u652f\u4ed8\u3001\u53d8\u66f4\u7b7e\u8bc1\u5168\u751f\u547d\u5468\u671f\u7684\u9020\u4ef7\u7ba1\u7406\u5e73\u53f0\u3002"
);

// ── 登录页 hero-metrics
rep(
  "              <strong>01</strong>\n              <span>\u767b\u5f55\u5165\u53e3</span>",
  "              <strong>5</strong>\n              <span>\u751f\u547d\u5468\u671f\u9636\u6bb5</span>"
);
rep(
  "              <strong>06</strong>\n              <span>\u5bfc\u822a\u5360\u4f4d\u9875</span>",
  "              <strong>25</strong>\n              <span>\u529f\u80fd\u6a21\u5757</span>"
);
rep(
  "              <strong>100%</strong>\n              <span>\u9aa8\u67b6\u4f18\u5148</span>",
  "              <strong>V0.1</strong>\n              <span>\u5f53\u524d\u7248\u672c</span>"
);

// ── 登录页 panel-title
rep("\u8fdb\u5165\u8bfe\u7a0b\u57fa\u5ea7", "\u8fdb\u5165\u7cfb\u7edf");

// ── 登录页 panel-copy 内容（去掉换行保留标签）
rep(
  "\u8bf7\u8f93\u5165\u4f60\u7684\u6f14\u793a\u8eab\u4efd\uff0c\u8fdb\u5165\u540e\u5148\u770b\u201c\u6a21\u5757\u5bfc\u822a\u201d\u548c\u201c\u9a8c\u6536\u6807\u51c6\u201d\uff0c\u786e\u8ba4\u81ea\u5df1\u8981\u4ea4\u4ec0\u4e48\u3001\u505a\u5230\u4ec0\u4e48\u7a0b\u5ea6\u624d\u7b97\u901a\u8fc7\u3002",
  "\u8bf7\u8f93\u5165\u59d3\u540d\u5e76\u9009\u62e9\u8eab\u4efd\u540e\u767b\u5f55\u3002"
);

// ── 登录页 demo-fill 按钮
rep(">\u4f7f\u7528\u6f14\u793a\u5024</button>", ">\u6f14\u793a\u8d26\u53f7</button>");

// ── 登录页底部 hint 块
rep(
  "\n          <div class=\"hint\">\n            \u5f53\u524d\u7248\u672c\u5148\u5e2e\u52a9\u4f60\u7406\u89e3\u7cfb\u7edf\u7ed3\u6784\u3002\u6b63\u5f0f\u5f00\u53d1\u65f6\uff0c\u4f60\u9700\u8981\u5728\u81ea\u5df1\u5c0f\u7ec4\u7684\u4efb\u52a1\u8303\u56f4\u5185\u8865\u5145\u8868\u5355\u3001\u63a5\u53e3\u3001\u6570\u636e\u548c\u8ba1\u7b97\u89c4\u5219\u3002\n          </div>",
  ""
);

// ── 侧边栏副标题
rep("\u8bfe\u7a0b\u57fa\u5ea7 / \u9875\u9762\u9aa8\u67b6", "\u5de5\u7a0b\u9020\u4ef7\u7ba1\u7406\u5e73\u53f0");

// ── topbar chips
rep(
  "<span class=\"chip\">\u9aa8\u67b6\u9875\u9762</span>\n            <span class=\"chip\">\u540e\u7eed\u53ef\u6269\u5c55</span>",
  "<span class=\"chip\">V0.1</span>"
);

// ── 用户身份栏多余文字
rep("} / \u4ec5\u6f14\u793a\u8eab\u4efd</p>", "}</p>");

// ── 各页面 small 内部标注
const smalls = [
  "<small>V0.1 base</small>",
  "<small>Base first</small>",
  "<small>\u5e73\u53f0\u5b9a\u4f4d</small>",
  "<small>module-ready</small>",
  "<small>25 tasks / 5 stages</small>",
  "<small>acceptance gate</small>",
  "<small>required package</small>",
  "<small>minimum gate</small>",
  "<small>scope control</small>",
  "<small>title showcase</small>",
  "<small>\u5206\u7ec4\u5206\u914d\u89c4\u5219</small>",
  "<small>group checklist</small>",
  "<small>\u6f14\u793a\u8eab\u4efd</small>",
  "<small>\u6587\u6863\u5bfc\u822a</small>",
  "<small>process board</small>",
  "<small>board flow</small>",
];
for (const s of smalls) rep(s, "");

// ── 各页面冗余说教性段落（用部分唯一字符串匹配）
const cruft_markers = [
  "\u8bf7\u628a\u672c\u7cfb\u7edf\u7406\u89e3\u4e3a\u4e00\u4e2a\u5168\u8fc7\u7a0b\u5de5\u7a0b\u9020\u4ef7\u6574\u5408\u5e73\u53f0",
  "\u70b9\u51fb\u5de6\u4fa7\u201c\u6a21\u5757\u5bfc\u822a\u201d\u4e0b\u9762\u7684\u751f\u547d\u5468\u671f\u5b50\u83dc\u5355",
  "\u8be5\u770b\u677f\u662f\u5168\u8fc7\u7a0b\u63a7\u5236\u7684\u7edf\u4e00\u5165\u53e3",
  "\u8fd9\u4e2a\u9875\u9762\u5c55\u793a\u7edf\u4e00\u5e73\u53f0\u7684\u6807\u9898\u3001\u6a21\u5757\u5165\u53e3\u548c\u6f14\u793a\u4fe1\u606f",
  "\u6309\u6bcf\u7ec4 4 \u4eba\u8ba4\u9886 1 \u4e2a\u4efb\u52a1\u8bbe\u8ba1",
  "\u4ec5\u9aa8\u67b6\u6f14\u793a\uff0c\u65e0\u5b9e\u9645\u6743\u9650\u63a7\u5236",
  "\u5f00\u59cb\u5f00\u53d1\u524d\uff0c\u8bf7\u5148\u9605\u8bfb\u5e73\u53f0\u89c4\u5219\u300125 \u4e2a\u4efb\u52a1\u6e05\u5355",
  "\u6240\u6709\u5c0f\u7ec4\u5728\u540c\u4e00\u5e73\u53f0\u4e0a\u5f00\u53d1\uff0c\u4e0d\u5141\u8bb8\u6539\u516c\u5171\u7ed3\u6784",
  "\u4f60\u7684\u4efb\u52a1\u4e0d\u662f\u628a\u9875\u9762\u505a\u51fa\u6765\u5c31\u7ed3\u675f",
];
for (const marker of cruft_markers) {
  // 找到包含这段文字的 <p>...</p> 并删除整段
  c = c.replace(new RegExp(`        <p>[^<]*${marker}[^<]*<\\/p>`, "g"), "");
  c = c.replace(new RegExp(`<p>[^<]*${marker}[^<]*<\\/p>`, "g"), "");
}

// ── 个人设置页冗余说明
rep(
  "\u5f53\u524d\u767b\u5f55\u8eab\u4efd\uff1a${escape_html(user.role)}\u3002\u540e\u7eed\u53ef\u4ee5\u63a5\u5165\u771f\u5b9e\u8d26\u6237\u3001\u89d2\u8272\u6743\u9650\u548c\u4e2a\u4eba\u8d44\u6599\u3002",
  ""
);

// ── showcase 约束说明替换
rep("\u5b66\u751f\u53ea\u8865\u5185\u5bb9", "\u5168\u8fc7\u7a0b\u7d22\u5f15\u68c0\u7d22");
rep("\u7edf\u4e00 TypeScript \u7ed3\u6784", "\u7edf\u4e00\u4e1a\u52a1\u63a5\u53e3");

writeFileSync(file, c, "utf8");
console.log("patch done");
