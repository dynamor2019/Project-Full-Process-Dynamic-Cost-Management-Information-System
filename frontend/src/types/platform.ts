export interface TaskTopic {
  code: string;
  stageName: string;
  topicName: string;
  primaryTableName: string;
  formName: string;
}

export interface FormIndexRecord {
  indexId: string;
  projectId: string;
  taskCode: string;
  taskName: string;
  sourceTable: string;
  sourceId: string;
  status: string;
}
