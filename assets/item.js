export const itemCatalog = {
  // === 消耗品 ===
  heal_small: {
    id: "heal_small",
    name: "小型治疗药水",
    description: "恢复20点HP。",
    type: "consumable",
    value: 10,
    effect: { type: "heal", amount: 20 }
  },
  heal_large: {
    id: "heal_large",
    name: "大型治疗药水",
    description: "恢复60点HP。",
    type: "consumable",
    value: 30,
    effect: { type: "heal", amount: 60 }
  },
  antidote: {
    id: "antidote",
    name: "解毒药",
    description: "解除中毒状态。",
    type: "consumable",
    value: 15,
    effect: { type: "cure", status: "poison" }
  },

  // === 武器 ===
  stick: {
    id: "stick",
    name: "木棒",
    description: "一根结实的木棒，适合新手。",
    type: "weapon",
    value: 5,
    atk: 2
  },
  iron_sword: {
    id: "iron_sword",
    name: "铁剑",
    description: "普通士兵使用的单手剑。",
    type: "weapon",
    value: 25,
    atk: 6
  },
  long_bow: {
    id: "long_bow",
    name: "长弓",
    description: "适合远程攻击，但较慢。",
    type: "weapon",
    value: 40,
    atk: 5,
    speed: -1
  },

  // === 防具 ===
  leather_armor: {
    id: "leather_armor",
    name: "皮甲",
    description: "基础防御护甲，适合新手。",
    type: "armor",
    value: 15,
    def: 3
  },
  iron_armor: {
    id: "iron_armor",
    name: "铁甲",
    description: "沉重但坚固的护甲。",
    type: "armor",
    value: 50,
    def: 8,
    speed: -1
  },

  // === 材料 ===
  cloth: {
    id: "cloth",
    name: "破布",
    description: "一块脏兮兮的布，或许能做点什么。",
    type: "material",
    value: 1
  },
  slime_gel: {
    id: "slime_gel",
    name: "史莱姆凝胶",
    description: "从史莱姆身上提取的滑腻物质。",
    type: "material",
    value: 2
  },
  goblin_ear: {
    id: "goblin_ear",
    name: "哥布林的耳朵",
    description: "冒险者常拿来换赏金的战利品。",
    type: "material",
    value: 4
  },

  // === 稀有/任务物品 ===
  crystal_fragment: {
    id: "crystal_fragment",
    name: "水晶碎片",
    description: "散发淡蓝光辉的神秘碎片。",
    type: "special",
    value: 100
  },
  lost_letter: {
    id: "lost_letter",
    name: "遗失的信件",
    description: "一封还未送达的信件，可能属于某人。",
    type: "quest",
    value: 0
  }
};
