import { ChartBarIcon, ShieldCheckIcon, CogIcon, LifebuoyIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Automated Reports',
    description:
      'Generate detailed, automated reports that provide insights into your business operations. Save time and make informed decisions quickly.',
    icon: ChartBarIcon, // Example icon; replace with the actual icon you prefer
  },
  {
    name: 'Secure Data Storage',
    description:
      'Your data is safe with our top-tier security measures, including encryption and regular backups. Protect your business-critical information.',
    icon: ShieldCheckIcon, // Example icon; replace with the actual icon you prefer
  },
  {
    name: 'Customizable Workflows',
    description:
      'Tailor workflows to fit your specific needs. Our flexible tooling allows you to automate processes and increase efficiency.',
    icon: CogIcon, // Example icon; replace with the actual icon you prefer
  },
  {
    name: '24/7 Support',
    description:
      'Get help whenever you need it with our dedicated support team available around the clock. Your success is our priority.',
    icon: LifebuoyIcon, // Example icon; replace with the actual icon you prefer
  },
];

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32" id="Why">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Communicate better</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to professionalise your business
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Language is a powerful tool for communication. TaalSnel helps you improve your Dutch writing by providing suggestions for language improvement.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
