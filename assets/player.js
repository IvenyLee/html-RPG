export const player = {
  name: "玩家",
  level: 1,
  exp: 0,
  expToLevelUp: 100,
  gold: 0,

  stats: {
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
  },

  inventory: [], // 物品数组
  equipment: {
    weapon: null,
    armor: null,
  },

  team: [], // 最多4人（包含玩家和怪物）

  /**
   * 获得经验值
   */
  gainExp(amount) {
    this.exp += amount;
    while (this.exp >= this.expToLevelUp) {
      this.exp -= this.expToLevelUp;
      this.levelUp();
    }
  },

  /**
   * 升级逻辑
   */
  levelUp() {
    this.level += 1;
    this.expToLevelUp = Math.floor(this.expToLevelUp * 1.5);
    this.stats.maxHp += 10;
    this.stats.hp = this.stats.maxHp;
    this.stats.attack += 2;
    this.stats.defense += 1;
    console.log(`🎉 恭喜升到 ${this.level} 级！`);
  },

  /**
   * 添加物品到背包
   */
  addItem(item) {
    this.inventory.push(item);
  },

  /**
   * 加入队伍
   */
  addToTeam(member) {
    if (this.team.length >= 4) {
      console.warn("队伍已满！");
      return;
    }
    this.team.push(member);
  },

  /**
   * 移除队伍成员（通过索引）
   */
  removeFromTeam(index) {
    if (index >= 0 && index < this.team.length) {
      this.team.splice(index, 1);
    }
  },
};
