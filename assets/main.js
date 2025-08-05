import { player } from './player.js';
import { startAutoBattle, stopAutoBattle } from './battle.js'; 
import {
  saveGame,
  loadGame,
  exportSave,
  importSave,
  saveToFile,
  loadFromFile
} from './loadsave.js';
import { showTab } from './ui.js';
import { log } from './log.js';  // 日志封装

// 全局游戏状态
// ✅ 正确写法：声明并导出一次即可
export const gameState = {
  player: player,
  team: player.team,
  inventory: player.inventory,
  area: null,
  currentMonster: null,
  isAutoBattle: false,
};



// 自动战斗按钮
document.getElementById("start-btn").addEventListener("click", () => {
  startAutoBattle();
  log("⚔️ 开始自动战斗！");
});
document.getElementById("stop-btn").addEventListener("click", () => {
  stopAutoBattle();
  log("🛑 停止自动战斗！");
});

// 存档功能
document.getElementById("save-btn").addEventListener("click", () => {
  saveGame();
  log("💾 已保存游戏进度");
});
document.getElementById("load-btn").addEventListener("click", () => {
  loadGame();
  log("📂 已读取游戏进度");
});
document.getElementById("export-btn").addEventListener("click", exportSave);
document.getElementById("import-file").addEventListener("change", (e) => {
  importSave(e.target.files[0]);
  log("📁 已导入存档");
});
document.getElementById("save-as-btn").addEventListener("click", saveToFile);
document.getElementById("load-from-btn").addEventListener("click", loadFromFile);

// 页面初始化
window.addEventListener("DOMContentLoaded", () => {
  // 默认打开人物页面
  showTab("player");
  log("🎮 游戏已加载，欢迎回来！");

  // 绑定 tab 切换按钮
  document.getElementById("btn-tab-player").addEventListener("click", () => showTab("player"));
  document.getElementById("btn-tab-inventory").addEventListener("click", () => showTab("inventory"));
  document.getElementById("btn-tab-team").addEventListener("click", () => showTab("team"));
  document.getElementById("btn-tab-talent").addEventListener("click", () => showTab("talent"));
});

// 让 tab 切换能全局调用
window.showTab = showTab;
