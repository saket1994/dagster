

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PipelineSolidSelectorQuery
// ====================================================

export interface PipelineSolidSelectorQuery_pipeline_solids_definition_metadata {
  key: string;
  value: string;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_definition_configDefinition_type {
  name: string;
  description: string | null;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_definition_configDefinition {
  type: PipelineSolidSelectorQuery_pipeline_solids_definition_configDefinition_type;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_definition {
  metadata: PipelineSolidSelectorQuery_pipeline_solids_definition_metadata[];
  configDefinition: PipelineSolidSelectorQuery_pipeline_solids_definition_configDefinition | null;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_inputs_definition_type {
  name: string;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_inputs_definition {
  name: string;
  type: PipelineSolidSelectorQuery_pipeline_solids_inputs_definition_type;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_inputs_dependsOn_definition {
  name: string;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_inputs_dependsOn_solid {
  name: string;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_inputs_dependsOn {
  definition: PipelineSolidSelectorQuery_pipeline_solids_inputs_dependsOn_definition;
  solid: PipelineSolidSelectorQuery_pipeline_solids_inputs_dependsOn_solid;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_inputs {
  definition: PipelineSolidSelectorQuery_pipeline_solids_inputs_definition;
  dependsOn: PipelineSolidSelectorQuery_pipeline_solids_inputs_dependsOn | null;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_outputs_definition_type {
  name: string;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_outputs_definition_expectations {
  name: string;
  description: string | null;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_outputs_definition {
  name: string;
  type: PipelineSolidSelectorQuery_pipeline_solids_outputs_definition_type;
  expectations: PipelineSolidSelectorQuery_pipeline_solids_outputs_definition_expectations[];
}

export interface PipelineSolidSelectorQuery_pipeline_solids_outputs_dependedBy_solid {
  name: string;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_outputs_dependedBy {
  solid: PipelineSolidSelectorQuery_pipeline_solids_outputs_dependedBy_solid;
}

export interface PipelineSolidSelectorQuery_pipeline_solids_outputs {
  definition: PipelineSolidSelectorQuery_pipeline_solids_outputs_definition;
  dependedBy: PipelineSolidSelectorQuery_pipeline_solids_outputs_dependedBy[];
}

export interface PipelineSolidSelectorQuery_pipeline_solids {
  name: string;
  definition: PipelineSolidSelectorQuery_pipeline_solids_definition;
  inputs: PipelineSolidSelectorQuery_pipeline_solids_inputs[];
  outputs: PipelineSolidSelectorQuery_pipeline_solids_outputs[];
}

export interface PipelineSolidSelectorQuery_pipeline {
  name: string;
  solids: PipelineSolidSelectorQuery_pipeline_solids[];
}

export interface PipelineSolidSelectorQuery {
  pipeline: PipelineSolidSelectorQuery_pipeline;
}

export interface PipelineSolidSelectorQueryVariables {
  name: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EvaluationErrorReason {
  FIELD_NOT_DEFINED = "FIELD_NOT_DEFINED",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",
  RUNTIME_TYPE_MISMATCH = "RUNTIME_TYPE_MISMATCH",
  SELECTOR_FIELD_ERROR = "SELECTOR_FIELD_ERROR",
}

export enum LogLevel {
  CRITICAL = "CRITICAL",
  DEBUG = "DEBUG",
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING",
}

/**
 * An enumeration.
 */
export enum PipelineRunStatus {
  FAILURE = "FAILURE",
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  SUCCESS = "SUCCESS",
}

export enum StepTag {
  INPUT_EXPECTATION = "INPUT_EXPECTATION",
  INPUT_THUNK = "INPUT_THUNK",
  JOIN = "JOIN",
  MATERIALIZATION_THUNK = "MATERIALIZATION_THUNK",
  OUTPUT_EXPECTATION = "OUTPUT_EXPECTATION",
  SERIALIZE = "SERIALIZE",
  TRANSFORM = "TRANSFORM",
}

/**
 * This type represents the fields necessary to identify a
 *         pipeline or pipeline subset.
 */
export interface ExecutionSelector {
  name: string;
  solidSubset?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================