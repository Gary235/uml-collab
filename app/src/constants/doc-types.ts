import { LANGUAGES } from "./languages";

export const DOC_TYPES: Record<string, string> = {
  [LANGUAGES.FLOWCHART]: 'Flowchart', // puede ser TD
  [LANGUAGES.SEQUENCE_DIAGRAM]: 'Sequence Diagram',
  [LANGUAGES.CLASS_DIAGRAM]: 'Class Diagram',
  [LANGUAGES.STATE_DIAGRAM]: 'State Diagram',
  [LANGUAGES.ER_DIAGRAM]: 'Entity Relationship Diagram',
  [LANGUAGES.JOURNEY]: 'User Journey',
  [LANGUAGES.GANTT]: 'Gantt',
  [LANGUAGES.PIE]: 'Pie Chart', // puede tenet show data y title
  [LANGUAGES.QUADRANT_CHART]: 'Quadrant Chart',
  [LANGUAGES.REQUIREMENT_DIAGRAM]: 'Requirement Diagram',
  [LANGUAGES.GIT_GRAPH]: 'Git Graph',
  [LANGUAGES.MIND_MAP]: 'Mindmaps',
  [LANGUAGES.TIMELINE]: 'Timeline',
  [LANGUAGES.ZEN_UML]: 'ZenUML'
}
