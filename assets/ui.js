import { player } from './player.js';


export function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.style.display = "none");

  const activeTab = document.getElementById("tab-" + tabId);
  if (activeTab) activeTab.style.display = "block";

  // 可选：在切换时重新渲染内容
  switch (tabId) {
    case "player":
      renderPlayerTab();
      break;
    case "inventory":
      renderInventoryTab();
      break;
    case "team":
      renderTeamTab();
      break;
    case "talent":
      renderTalentTab();
      break;
  }
}

console.log("👤 正在渲染人物信息...", player);

export function renderPlayerTab() {
  const tab = document.getElementById("tab-player");
  tab.innerHTML = `
    <h3>${player.name}</h3>
    <p>等级：${player.level}</p>
    <p>经验：${player.exp} / ${player.expToLevelUp}</p>
    <p>HP：${player.stats.hp} / ${player.stats.maxHp}</p>
    <p>攻击：${player.stats.attack}</p>
    <p>防御：${player.stats.defense}</p>
    <p>金币：${player.gold}</p>
  `;
}

export function renderInventoryTab() {
  const tab = document.getElementById("tab-inventory");
  tab.innerHTML = "<p>暂无道具内容</p>";
}

export function renderTeamTab() {
  const tab = document.getElementById("tab-team");
  tab.innerHTML = "<p>暂无队伍内容</p>";
}

export function renderTalentTab() {
  const tab = document.getElementById("tab-talent");
  tab.innerHTML = "<p>天赋系统尚未开放</p>";
}

