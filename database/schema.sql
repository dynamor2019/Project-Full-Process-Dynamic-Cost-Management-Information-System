PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS project (
  project_id TEXT PRIMARY KEY,
  project_code TEXT NOT NULL UNIQUE,
  project_name TEXT NOT NULL,
  project_stage TEXT,
  location TEXT,
  total_investment NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS organization (
  organization_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  contact_name TEXT,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS student_group (
  group_id TEXT PRIMARY KEY,
  group_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  member_count INTEGER NOT NULL DEFAULT 4,
  topic_code TEXT,
  status TEXT NOT NULL DEFAULT 'planned'
);

CREATE TABLE IF NOT EXISTS task_topic (
  topic_code TEXT PRIMARY KEY,
  stage_name TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  primary_table_name TEXT NOT NULL,
  form_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open'
);

CREATE TABLE IF NOT EXISTS dictionary_item (
  dictionary_id TEXT PRIMARY KEY,
  dictionary_type TEXT NOT NULL,
  item_code TEXT NOT NULL,
  item_name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS attachment (
  attachment_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source_table TEXT NOT NULL,
  source_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS audit_log (
  log_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source_table TEXT NOT NULL,
  source_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  action_note TEXT,
  operator_name TEXT NOT NULL,
  action_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS contract (
  contract_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  contract_no TEXT NOT NULL UNIQUE,
  contract_name TEXT NOT NULL,
  contract_type TEXT NOT NULL,
  contract_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  signed_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS contract_clause (
  clause_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  contract_id TEXT NOT NULL,
  clause_type TEXT NOT NULL,
  clause_title TEXT NOT NULL,
  clause_content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id)
);

CREATE TABLE IF NOT EXISTS tender_control_price (
  control_price_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  version_no TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  basis_note TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS bid_comparison (
  comparison_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  bidder_name TEXT NOT NULL,
  bid_amount NUMERIC NOT NULL,
  deviation_rate NUMERIC,
  ranking_no INTEGER,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS boq_header (
  boq_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  boq_version TEXT NOT NULL,
  source_name TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS boq_item (
  boq_item_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  boq_id TEXT NOT NULL,
  item_code TEXT NOT NULL,
  item_name TEXT NOT NULL,
  unit TEXT,
  quantity NUMERIC,
  unit_price NUMERIC,
  total_price NUMERIC,
  status TEXT NOT NULL DEFAULT 'normal',
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (boq_id) REFERENCES boq_header(boq_id)
);

CREATE TABLE IF NOT EXISTS boq_rate_analysis (
  analysis_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  boq_item_id TEXT NOT NULL,
  labor_cost NUMERIC,
  material_cost NUMERIC,
  machinery_cost NUMERIC,
  management_fee NUMERIC,
  profit NUMERIC,
  tax_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (boq_item_id) REFERENCES boq_item(boq_item_id)
);

CREATE TABLE IF NOT EXISTS target_cost (
  target_cost_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  version_no TEXT NOT NULL,
  total_cost NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS target_cost_item (
  target_cost_item_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  target_cost_id TEXT NOT NULL,
  cost_category TEXT NOT NULL,
  cost_name TEXT NOT NULL,
  cost_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'normal',
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (target_cost_id) REFERENCES target_cost(target_cost_id)
);

CREATE TABLE IF NOT EXISTS progress_report (
  progress_report_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  report_month TEXT NOT NULL,
  planned_output_value NUMERIC,
  actual_output_value NUMERIC,
  progress_rate NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS progress_comparison (
  comparison_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  progress_report_id TEXT NOT NULL,
  planned_rate NUMERIC,
  actual_rate NUMERIC,
  planned_output_value NUMERIC,
  actual_output_value NUMERIC,
  deviation_note TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (progress_report_id) REFERENCES progress_report(progress_report_id)
);

CREATE TABLE IF NOT EXISTS measurement (
  measurement_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  contract_id TEXT,
  report_month TEXT NOT NULL,
  declared_amount NUMERIC NOT NULL,
  approved_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id)
);

CREATE TABLE IF NOT EXISTS measurement_review (
  review_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  measurement_id TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  review_note TEXT,
  adjusted_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_at TEXT,
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (measurement_id) REFERENCES measurement(measurement_id)
);

CREATE TABLE IF NOT EXISTS payment_request (
  payment_request_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  contract_id TEXT,
  measurement_id TEXT,
  request_no TEXT NOT NULL UNIQUE,
  request_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id),
  FOREIGN KEY (measurement_id) REFERENCES measurement(measurement_id)
);

CREATE TABLE IF NOT EXISTS payment_record (
  payment_record_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  payment_request_id TEXT NOT NULL,
  approved_amount NUMERIC,
  paid_amount NUMERIC,
  payment_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (payment_request_id) REFERENCES payment_request(payment_request_id)
);

CREATE TABLE IF NOT EXISTS change_order (
  change_order_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  contract_id TEXT,
  change_no TEXT NOT NULL UNIQUE,
  change_title TEXT NOT NULL,
  estimated_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id)
);

CREATE TABLE IF NOT EXISTS site_visa (
  site_visa_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  visa_no TEXT NOT NULL UNIQUE,
  visa_title TEXT NOT NULL,
  estimated_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS change_cost_estimate (
  estimate_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  change_order_id TEXT,
  site_visa_id TEXT,
  estimate_amount NUMERIC NOT NULL,
  estimate_note TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (change_order_id) REFERENCES change_order(change_order_id),
  FOREIGN KEY (site_visa_id) REFERENCES site_visa(site_visa_id)
);

CREATE TABLE IF NOT EXISTS material_price (
  material_price_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  material_name TEXT NOT NULL,
  specification TEXT,
  unit TEXT,
  price NUMERIC NOT NULL,
  price_date TEXT NOT NULL,
  source_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS subcontract (
  subcontract_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  subcontract_no TEXT NOT NULL UNIQUE,
  subcontract_name TEXT NOT NULL,
  subcontract_amount NUMERIC,
  settlement_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS settlement (
  settlement_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  contract_id TEXT,
  settlement_no TEXT NOT NULL UNIQUE,
  submitted_amount NUMERIC,
  approved_amount NUMERIC,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (contract_id) REFERENCES contract(contract_id)
);

CREATE TABLE IF NOT EXISTS risk_alert (
  risk_alert_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  risk_type TEXT NOT NULL,
  risk_title TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  related_table TEXT,
  related_id TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS form_index (
  index_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  task_code TEXT NOT NULL,
  task_name TEXT NOT NULL,
  biz_type TEXT NOT NULL,
  source_table TEXT NOT NULL,
  source_id TEXT NOT NULL,
  biz_no TEXT,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  related_contract_id TEXT,
  related_boq_id TEXT,
  related_cost_id TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES project(project_id),
  FOREIGN KEY (task_code) REFERENCES task_topic(topic_code)
);
