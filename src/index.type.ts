// 基础 APP 类型
export interface iApp {
  update: (ts?: number) => void; // 更新
  run: (ts?: number) => void; // 运行
}
