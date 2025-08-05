import { player } from "./player.js";
import { gameState } from "./main.js";
import { renderInventoryTab, renderPlayerTab, renderTeamTab} from "./ui.js";
import { Monster } from "./monster.js";

// ✅ 保存到浏览器 localStorage
export function saveGame() {
  try {
    const saveData = {
      player: {
        name: player.name,
        level: player.level,
        exp: player.exp,
        expToLevelUp: player.expToLevelUp,
        gold: player.gold,
        stats: player.stats,
        inventory: player.inventory,
        equipment: player.equipment,
        team: player.team
      },
      // 其他非类属性
      area: gameState.area,
      currentMonster: gameState.currentMonster,
      isAutoBattle: gameState.isAutoBattle
    };

    localStorage.setItem("rpg-save", JSON.stringify(saveData));
    console.log("✅ 游戏已保存到本地 localStorage！");
  } catch (e) {
    console.error("❌ 保存失败：", e);
  }
}


// ✅ 从 localStorage 加载
export function loadGame() {
  const saved = localStorage.getItem("rpg-save");
  if (!saved) return console.log("📦 没有找到本地存档。");

  try {
    const data = JSON.parse(saved);
    restoreGameFromData(data);
    console.log("✅ 存档读取成功！");
  } catch (e) {
    console.error("❌ 存档格式错误：", e);
  }
}



// ✅ 导出为 .json 文件（下载）
export function exportSave() {
  const blob = new Blob([JSON.stringify(gameState, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rpg-save.json";
  a.click();
  URL.revokeObjectURL(url);
  console.log("📤 存档文件已导出！");
}

// ✅ 从用户上传的 .json 文件导入
export function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      restoreGameFromData(data);
      console.log("📥 存档导入成功！");
    } catch (e) {
      console.error("❌ 存档导入失败：", e);
    }
  };
  reader.readAsText(file);
}




// ✅ 高级功能：用户手动选择保存文件位置
export async function saveToFile() {
  if (!window.showSaveFilePicker) {
    alert("你的浏览器不支持手动选择保存位置");
    return;
  }

  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: 'rpg-save.json',
      types: [
        {
          description: 'RPG 存档文件',
          accept: { 'application/json': ['.json'] }
        }
      ]
    });

    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(gameState, null, 2));
    await writable.close();

    console.log("✅ 存档已保存到用户指定位置！");
  } catch (err) {
    console.warn("❌ 用户取消或发生错误：", err);
  }
}

// ✅ 高级功能：用户选择存档文件并读取
export async function loadFromFile() {
  if (!window.showOpenFilePicker) {
    alert("你的浏览器不支持从文件读取");
    return;
  }

  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'RPG 存档文件',
        accept: { 'application/json': ['.json'] }
      }]
    });

    const file = await fileHandle.getFile();
    const text = await file.text();
    const data = JSON.parse(text);

    restoreGameFromData(data);
    console.log("✅ 存档已从文件读取！");
  } catch (err) {
    console.warn("❌ 读取失败或用户取消：", err);
  }
}

function restoreGameFromData(data) {
  Object.assign(player, data.player);
  gameState.area = data.area;
  gameState.currentMonster = data.currentMonster ? new Monster(data.currentMonster) : null;
  gameState.isAutoBattle = data.isAutoBattle;

  renderPlayerTab?.();
  renderInventoryTab?.();
  renderTeamTab?.();
}
