import { player } from './player.js';
import { itemCatalog } from './item.js';
import { gameState } from './main.js';

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

  if (player.inventory.length === 0) {
    tab.innerHTML = "<p>背包空空如也</p>";
    return;
  }

  let html = `<div class="inventory-grid">`;

  player.inventory.forEach((entry, index) => {
    const item = itemCatalog[entry.id];
    if (!item) return;

    const tooltip = `${item.description}`;
    const displayText = `${item.name} ×${entry.quantity}`;

    html += `
      <div class="item-slot" title="${tooltip}"
        onclick="${item.type === 'consumable'
          ? `useItem(${index})`
          : item.type === 'weapon' || item.type === 'armor'
            ? `equipItem('${entry.id}')`
            : ''
        }">
        <span class="item-name">${displayText}</span>
      </div>
    `;
  });

  html += `</div>`;
  tab.innerHTML = html;
}




export function renderTeamTab() {
  const tab = document.getElementById("tab-team");
  tab.innerHTML = "<p>暂无队伍内容</p>";
}

export function renderTalentTab() {
  const tab = document.getElementById("tab-talent");
  tab.innerHTML = "<p>天赋系统尚未开放</p>";
}

window.useItem = function(index) {
  player.useItem(index);
  renderInventoryTab(); // 使用后刷新 UI
  renderPlayerTab();
};

window.equipItem = function(itemId) {
  player.equip(itemId);
  renderInventoryTab(); // 装备后刷新 UI
  renderPlayerTab();
};


export function renderBattlePanel() {
  const panel = document.getElementById("battle-panel");
  if (!panel) return;

  const playerHpBar = hpBar(player.stats.hp, player.stats.maxHp);
  const monster = gameState.currentMonster;
  const monsterHpBar = monster ? hpBar(monster.hp, monster.maxHp) : "[--------------------]";

  panel.innerHTML = `
    <div class="battle-entity">${player.name}：${playerHpBar} ${player.stats.hp}/${player.stats.maxHp}</div>
    <div class="battle-entity">${monster?.name ?? "???"}：${monsterHpBar} ${monster?.hp ?? 0}/${monster?.maxHp ?? "???"}</div>
  `;
}

function hpBar(current, max, width = 20) {
  const ratio = Math.max(0, Math.min(1, current / max));
  const fill = Math.round(ratio * width);
  return `[${'█'.repeat(fill)}${'-'.repeat(width - fill)}]`;
}

