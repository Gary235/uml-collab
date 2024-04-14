const colors: string[] = [
  'bg-pink-400',
  'bg-amber-500',
  'bg-teal-400',
  'bg-lime-500',
  'bg-violet-400',
  'bg-sky-500',
  'bg-emerald-900',
  'bg-purple-300',
  'bg-fuchsia-300',
  'bg-red-600'
]


export default function () {
  return colors[Math.floor(Math.random() * 10)]
}