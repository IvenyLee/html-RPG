import { gameState } from './main.js';
import { Monster, monsterCatalog } from './monster.js';
import { Player, player } from './player.js';
import { log } from './log.js';
import { itemCatalog } from './item.js';
import { renderInventoryTab, renderPlayerTab } from './ui.js';
import { renderBattlePanel } from './ui.js';

let battleInterval = null ;

function createRandomEnemy() {
  const pool = Object.values(monsterCatalog);
  const rand = Math.random();
  let sum = 0;

  for (const config of pool) {
    const chance = config.spawnChance ?? 1 / pool.length;
    sum += chance;
    if (rand <= sum) {
      log(`🐛 出现敌人：${config.name}`);
      return new Monster({ ...config });
    }
  }

  const fallback = pool[Math.floor(Math.random() * pool.length)];
  log(`🐛 出现敌人：${fallback.name}`);
  return new Monster({ ...fallback });
}


export function startAutoBattle() {
  if (gameState.isAutoBattle) return;

  log("⚔️ 挂机开始");
  gameState.isAutoBattle = true;

  // ✅ 如果没有怪物就新建一个
  if (!gameState.currentMonster || !gameState.currentMonster.isAlive()) {
    gameState.currentMonster = createRandomEnemy();
  }

  battleInterval = setInterval(() => {
    const monster = gameState.currentMonster;

    if (!player.isAlive()) {
    log(`💀 ${player.name} 被击败了！`);
    stopAutoBattle();

    player.stats.hp = player.stats.maxHp;
    log(`💖 ${player.name} 重新振作，恢复满血！`);
    renderPlayerTab();
    renderBattlePanel();

    return;
    }


    if (!monster || !monster.isAlive()) {
      log(`✅ ${monster?.name || "敌人"} 被击败！`);
      const drop = monster.getDrop();
      log(`🎉 获得经验 ${monster.exp}，金币 ${drop.gold}`);
      player.gainExp(monster.exp);
      player.gold += drop.gold;
      renderPlayerTab();

      for (const itemId of drop.items) {
        const item = itemCatalog[itemId];
        if (item) {
          player.addItemById(itemId);
          log(`🎁 获得物品：${item.name}`);

          const inventoryTab = document.getElementById("tab-inventory");
          if (inventoryTab && inventoryTab.style.display !== "none") {
            renderInventoryTab();
          }
        } else {
          log(`❓ 未知物品：${itemId}`);
        }
      }

      // 🎯 生成下一个怪物
      gameState.currentMonster = createRandomEnemy();
      renderBattlePanel();
      return;
    }

    const playerDmg = player.attack(monster);
    log(`🗡️ 你对 ${monster.name} 造成了 ${playerDmg} 点伤害`);
    renderBattlePanel();
    renderPlayerTab();

    const enemyDmg = monster.attack(player);
    log(`👊 ${monster.name} 对你造成了 ${enemyDmg} 点伤害`);
  }, 1000);
    renderBattlePanel();
    renderPlayerTab();
}


export function stopAutoBattle() {
  if (!gameState.isAutoBattle) return;

  log("🛑 挂机停止");
  gameState.isAutoBattle = false;

  if (battleInterval) {
    clearInterval(battleInterval);
    battleInterval = null;
  }
}
