export const LANGUAGES = {
  FLOWCHART: 'flowchart',
  SEQUENCE_DIAGRAM: 'sequenceDiagram',
  CLASS_DIAGRAM: 'classDiagram',
  STATE_DIAGRAM: 'stateDiagram-2',
  ER_DIAGRAM: 'erDiagram',
  JOURNEY: 'journey',
  GANTT: 'gantt',
  PIE: 'pie',
  QUADRANT_CHART: 'quadrantChart',
  REQUIREMENT_DIAGRAM: 'requirementDiagram',
  GIT_GRAPH: 'gitGraph',
  MIND_MAP: 'mindmap',
  TIMELINE: 'timeline',
  ZEN_UML: 'zenuml',
}

export const LANGUAGES_KEYWORDS = {
  [LANGUAGES.FLOWCHART]: {
    suggested: ['flowchart', 'markdown', 'newLines', 'subgraph', 'end', 'direction'],
    nonSuggested: ['LR', 'RL', 'TD', 'DT', 'TB', 'BT']
  },
  [LANGUAGES.SEQUENCE_DIAGRAM]: {
    suggested: [
      'sequenceDiagram', 'participant', 'actor', 'create', 'as', 'destroy', 'box', 'end', 'activate', 'deactivate',
      'Note', '(right\\sof)', '(left\\sof)', 'over', 'loop', 'alt', 'else', 'opt', 'par', 'and',
      'critical', 'option', 'break', 'autonumber', 'link', 'rect'
    ],
    nonSuggested: []
  },
  [LANGUAGES.CLASS_DIAGRAM]: {
    suggested: ['classDiagram','class', '(note\\sfor)', 'note', 'direction', 'link', '<<interface>>', '<<enumeration>>'],
    nonSuggested: ['RL']
  },
  [LANGUAGES.STATE_DIAGRAM]: {
    suggested: [
      '(stateDiagram\\-v2)', 'start', 'end', 'state', '<<choice>>', '<<fork>>', '<<join>>',
      'note', '(right\\sof)', '(left\\sof)', 'direction'
    ],
    nonSuggested: ['as']
  },
  [LANGUAGES.ER_DIAGRAM]: {suggested: [], nonSuggested: []},
  [LANGUAGES.JOURNEY]: {suggested: [], nonSuggested: []},
  [LANGUAGES.GANTT]: {suggested: [], nonSuggested: []},
  [LANGUAGES.PIE]: {suggested: [], nonSuggested: []},
  [LANGUAGES.QUADRANT_CHART]: {suggested: [], nonSuggested: []},
  [LANGUAGES.REQUIREMENT_DIAGRAM]: {suggested: [], nonSuggested: []},
  [LANGUAGES.GIT_GRAPH]: {suggested: [], nonSuggested: []},
  [LANGUAGES.MIND_MAP]: {suggested: [], nonSuggested: []},
  [LANGUAGES.TIMELINE]: {suggested: [], nonSuggested: []},
  [LANGUAGES.ZEN_UML]: {suggested: [], nonSuggested: []},
}

export const KEYWORDS_LABELS = {
  [LANGUAGES.CLASS_DIAGRAM]: {['(note\\sfor)']: 'note for'},
  [LANGUAGES.SEQUENCE_DIAGRAM]: {
    ['(rigth\\sof)']: 'right of', ['(left\\sof)']: 'left of'
  },
  [LANGUAGES.STATE_DIAGRAM]: {
    start: '[*]', end: '[*]', ['(rigth\\sof)']: 'right of', ['(left\\sof)']: 'left of',
    ['(stateDiagram\\-v2)']: 'stateDiagram-v2'
  }
}

type a = [RegExp, string];
export const LANGUAGES_TOKENIZERS: Record<string, Array<a>> = {
  [LANGUAGES.FLOWCHART]: [
    [/\(.*\)/, "flowchartnode"],
    [/\(\[.*\]\)/, "flowchartnode"],
    [/\[\[.*\]\]/, "flowchartnode"],
    [/\[\(.*\)\]/, "flowchartnode"],
    [/\(\(.*\)\)/, "flowchartnode"],
    [/<.*\]/, "flowchartnode"],
    [/\{\{.*\}\}/, "flowchartnode"],
    [/\[\/.*\/\]/, "flowchartnode"],
    [/\[\\.*\\\]/, "flowchartnode"],
    [/\[\/.*\\\]/, "flowchartnode"],
    [/\[\\.*\/\]/, "flowchartnode"],
    [/\(\(\(.*\)\)\)/, "flowchartnode"],
  ],
}

const LANGUAGES_DOCS_ENDPOINTS = {
  [LANGUAGES.FLOWCHART]: 'flowchart',
  [LANGUAGES.SEQUENCE_DIAGRAM]: 'sequenceDiagram',
  [LANGUAGES.CLASS_DIAGRAM]: 'classDiagram',
  [LANGUAGES.STATE_DIAGRAM]: 'stateDiagram',
  [LANGUAGES.ER_DIAGRAM]: 'entityRelationshipDiagram',
  [LANGUAGES.JOURNEY]: 'userJourney',
  [LANGUAGES.GANTT]: 'gantt',
  [LANGUAGES.PIE]: 'pie',
  [LANGUAGES.QUADRANT_CHART]: 'quadrantChart',
  [LANGUAGES.REQUIREMENT_DIAGRAM]: 'requirementDiagram',
  [LANGUAGES.GIT_GRAPH]: 'gitgraph',
  [LANGUAGES.MIND_MAP]: 'mindmap',
  [LANGUAGES.TIMELINE]: 'timeline',
  [LANGUAGES.ZEN_UML]: 'zenuml',
}

export const getLanguageDocURL = (language: string) =>
  `https://mermaid.js.org/syntax/${LANGUAGES_DOCS_ENDPOINTS[language]}.html`