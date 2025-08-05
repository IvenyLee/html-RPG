import { gameState } from './main.js';
import { Monster, monsterCatalog } from './monster.js';
import { Player, player } from './player.js';
import { log } from './log.js';
import { itemCatalog } from './item.js';
import { renderInventoryTab } from './ui.js';

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

let enemy;
let battleInterval = null;

export function startAutoBattle() {
  if (gameState.isAutoBattle) return;

  log("⚔️ 挂机开始");
  gameState.isAutoBattle = true;

  enemy = createRandomEnemy();

  battleInterval = setInterval(() => {
    if (!player.isAlive()) {
      log(`💀 ${player.name} 被击败了！`);
      stopAutoBattle();
      return;
    }

    if (!enemy.isAlive()) {
      log(`✅ ${enemy.name} 被击败！`);
      const drop = enemy.getDrop();
      log(`🎉 获得经验 ${enemy.exp}，金币 ${drop.gold}`);
      player.gainExp(enemy.exp);
      player.gold += drop.gold;

        for (const itemId of drop.items) {
        const item = itemCatalog[itemId];
        if (item) {
            player.addItemById(itemId);
            log(`🎁 获得物品：${item.name}`);

            // ✅ 如果当前显示的是道具栏，就刷新它
            const inventoryTab = document.getElementById("tab-inventory");
            if (inventoryTab && inventoryTab.style.display !== "none") {
            renderInventoryTab();
            }

        } else {
            log(`❓ 未知物品：${itemId}`);
        }
        }



      enemy = createRandomEnemy(); // 🎯 下一只怪物
      return;
    }

    const playerDmg = player.attack(enemy);
    log(`🗡️ 你对 ${enemy.name} 造成了 ${playerDmg} 点伤害`);

    const enemyDmg = enemy.attack(player);
    log(`👊 ${enemy.name} 对你造成了 ${enemyDmg} 点伤害`);

  }, 1000);
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
