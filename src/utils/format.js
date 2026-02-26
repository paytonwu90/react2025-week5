// 將數字轉換為千位分隔符格式
export function formatCurrency(num) {
  const n = Number(num) || 0;
  return n.toLocaleString();
}
