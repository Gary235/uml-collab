// type ConfirmedClassNames = string[]
// type ConditionalClassNames = Record<string, boolean>


// export default function(...confirmedClassNames: ConfirmedClassNames, conditionalClassNames: ConditionalClassNames = {}) {
//   const validClassNames = [...confirmedClassNames];
// }

type classNames = string[]
export default function(...classNames: classNames) {
  return classNames.filter(Boolean).join(' ')
}
