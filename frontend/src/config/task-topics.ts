import type { TaskTopic } from "../types/platform";

export const TASK_TOPICS: TaskTopic[] = [
  {
    code: "TP-01",
    stageName: "前期策划与基础资料",
    topicName: "项目基础信息管理",
    primaryTableName: "project",
    formName: "项目登记表",
  },
  {
    code: "TF-05",
    stageName: "变更签证与收尾分析",
    topicName: "竣工结算与综合驾驶舱",
    primaryTableName: "settlement",
    formName: "竣工结算表 / 驾驶舱索引表",
  },
];
