import { itemCatalog } from './item.js';

export class Player {
  constructor({
    name = "玩家",
    level = 1,
    exp = 0,
    expToLevelUp = 100,
    gold = 0,
    stats = { hp: 100, maxHp: 100, attack: 10, defense: 5 },
    inventory = [],
    equipment = { weapon: null, armor: null },
    team = []
  } = {}) {
    this.name = name;
    this.level = level;
    this.exp = exp;
    this.expToLevelUp = expToLevelUp;
    this.gold = gold;
    this.stats = stats;
    this.inventory = inventory; // [{ id: "heal", quantity: 3 }]
    this.equipment = equipment; // { weapon: "stick", armor: null }
    this.team = team;
  }

  isAlive() {
    return this.stats.hp > 0;
  }

  takeDamage(amount) {
    const damage = Math.max(0, amount - this.stats.defense);
    this.stats.hp = Math.max(0, this.stats.hp - damage);
    return damage;
  }

  attack(target) {
    return target.takeDamage(this.stats.attack);
  }

  // 添加物品
  addItemById(itemId, count = 1) {
    const found = this.inventory.find(entry => entry.id === itemId);
    if (found) {
      found.quantity += count;
    } else {
      this.inventory.push({ id: itemId, quantity: count });
    }
  }

  // 移除物品
  removeItemById(itemId, count = 1) {
    const found = this.inventory.find(entry => entry.id === itemId);
    if (!found) return;

    found.quantity -= count;
    if (found.quantity <= 0) {
      this.inventory = this.inventory.filter(entry => entry.id !== itemId);
    }
  }

  // 使用物品（背包索引 + itemCatalog）
  useItem(index) {
    const entry = this.inventory[index];
    if (!entry) return;

    const item = itemCatalog[entry.id];
    if (!item) return;

    if (item.type === "consumable" && item.effect?.type === "heal") {
      const amount = item.effect.amount;
      this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + amount);
      console.log(`你使用了 ${item.name}，恢复了 ${amount} 点生命值`);
    }

    // 使用后减少数量
    entry.quantity--;
    if (entry.quantity <= 0) {
      this.inventory.splice(index, 1);
    }
  }

  // 装备物品（仅支持 weapon/armor）
  equip(itemId) {
    const item = itemCatalog[itemId];
    if (!item) return;

    if (item.type === "weapon" || item.type === "armor") {
      this.equipment[item.type] = itemId;
      console.log(`已装备：${item.name}`);
    }
  }

  // 升级系统
  gainExp(amount) {
    this.exp += amount;
    while (this.exp >= this.expToLevelUp) {
      this.exp -= this.expToLevelUp;
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    this.expToLevelUp = Math.floor(this.expToLevelUp * 1.5);
    this.stats.maxHp += 10;
    this.stats.hp = this.stats.maxHp;
    this.stats.attack += 2;
    this.stats.defense += 1;
    console.log(`🎉 恭喜升到 ${this.level} 级！`);
  }

  // 队伍管理
  addToTeam(member) {
    if (this.team.length >= 4) {
      console.warn("队伍已满！");
      return;
    }
    this.team.push(member);
  }

  removeFromTeam(index) {
    if (index >= 0 && index < this.team.length) {
      this.team.splice(index, 1);
    }
  }
}

export const player = new Player();
