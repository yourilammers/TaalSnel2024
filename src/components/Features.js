import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Language corrections.',
    description:
      'The textbox shows all corrections our model finds and displays them after pressing the Proces Text button.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Correction tooltip.',
    description: 'By clicking on an incorrect word, a tooltip is shown which allows you to replace the word or generate an explanation.',
    icon: LockClosedIcon,
  },
  {
    name: 'Rule Explanation.',
    description: 'After clicking on explain rule in the tooltip this field generates an explanation of the correct spelling or grammar usage.',
    icon: ServerIcon,
  },
]

export default function Example() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32" id="Features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Communicate better</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Taalsnel features</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              This webpage shows a simple demo of the TaalSnel model. Despite it's simplicity,
              this demo has more powerful Dutch language correction than most other publicly available tools.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
