import { gameState } from './main.js';

export function startAutoBattle() {
  console.log("挂机开始");
  gameState.isAutoBattle = true;
  // 这里你可以加入实际战斗逻辑
}

export function stopAutoBattle() {
  console.log("挂机停止");
  gameState.isAutoBattle = false;
}
