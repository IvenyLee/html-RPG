
export class Monster {
  constructor({
    id,
    name,
    hp,
    maxHp,
    atk,
    def,
    exp = 0,
    gold = 0,
    loot = [],
    skills = [],
    sprite = "",
  }) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.atk = atk;
    this.def = def;
    this.exp = exp;
    this.gold = gold;
    this.loot = loot;
    this.skills = skills;
    this.sprite = sprite;
    this.status = "idle";
  }

  isAlive() {
    return this.hp > 0;
  }

  takeDamage(amount) {
    const damage = Math.max(0, amount - this.def);
    this.hp = Math.max(0, this.hp - damage);
    return damage;
  }

  attack(target) {
    return target.takeDamage(this.atk);
  }

  toString() {
    return `${this.name} (HP: ${this.hp}/${this.maxHp}, ATK: ${this.atk}, DEF: ${this.def})`;
  }

  getDrop() {
    let gold = 0;
    if (Array.isArray(this.gold)) {
      const [min, max] = this.gold;
      gold = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      gold = this.gold ?? 0;
    }

    const items = [];
    for (const drop of this.loot) {
      if (Math.random() < drop.chance) {
        items.push(drop.itemId);
      }
    }

    return { gold, items };
  }
}

// ✅ 怪物图鉴
export const monsterCatalog = {
  1: {
    id: 1,
    name: "史莱姆",
    hp: 30,
    maxHp: 30,
    atk: 5,
    def: 1,
    exp: 10,
    gold: [1, 3],
    loot: [{ itemId: "slime_gel", chance: 0.6}],
    spawnChance: 0.3,
  },
  2: {
    id: 2,
    name: "哥布林",
    hp: 50,
    maxHp: 50,
    atk: 8,
    def: 3,
    exp: 20,
    gold: [2, 10],
    loot: [{ itemId: "goblin_ear", chance: 0.3 }, 
        { itemId: "cloth", chance: 0.2 },
        { itemId: "stick", chance: 0.1}],
    spawnChance: 0.2,
  },
  3: {
    id: 3,
    name: "稻草人",
    hp: 10,
    maxHp: 10,
    atk: 0,
    def: 1,
    exp: 1,
    gold: [0, 1],
    loot: [],
    spawnChance: 0.4,
  },
  4: {
    id: 4,
    name: "奶牛娘",
    hp: 15,
    maxHp: 20,
    atk: 2,
    def: 1,
    exp: 5,
    gold: [5, 50],
    loot: [{ itemId: "leather_armor", chance: 0.2},
            { itemId: "strange_underwear", chance: 0.5}
    ],
    spawnChance: 0.7,
  }
};

// ✅ 通过 ID 创建怪物
export function createMonsterById(id) {
  const config = monsterCatalog[id];
  if (!config) throw new Error(`❌ 没有找到 id 为 ${id} 的怪物`);
  return new Monster({ ...config });
}

// ✅ 随机生成怪物（支持权重）
export function createRandomMonster(area = null) {
  const pool = Object.values(monsterCatalog);

  // 计算总权重
  const totalChance = pool.reduce(
    (sum, config) => sum + (config.spawnChance ?? 1 / pool.length),
    0
  );

  // 生成 0 ~ 1 之间的随机数（而不是 totalChance）
  const rand = Math.random();
  let sum = 0;

  for (const config of pool) {
    const chance = (config.spawnChance ?? 1 / pool.length) / totalChance; // ✅ 归一化
    sum += chance;
    if (rand <= sum) {
      return new Monster({ ...config });
    }
  }

  // fallback（极小概率下 sum < rand）
  console.warn("⚠️ 归一化随机失败，使用 fallback");
  const fallback = pool[Math.floor(Math.random() * pool.length)];
  return new Monster({ ...fallback });
}


