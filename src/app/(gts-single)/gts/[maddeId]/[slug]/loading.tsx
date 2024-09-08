import { BaseLayout } from '@/layouts'

export default function Loading() {
  return (
    <BaseLayout>
      <span className="flex flex-col gap-4">
        <div className="w-full sm:rounded-md bg-white border-b-4 shadow-sm">
          <div className="border-b py-3 px-4">
            <span className="flex items-start justify-between">
              <span className="block bg-alternative-200 rounded-sm animate-pulse w-44 h-7 my-1" />

              <span className="flex items-center gap-2">
                <span className="block bg-alternative-200 rounded-sm animate-pulse w-6 h-6 m-2" />

                <span className="block w-px h-4 bg-alternative-200" />

                <span className="block bg-alternative-200 rounded-sm animate-pulse w-6 h-6 m-2" />
              </span>
            </span>
          </div>

          <ul className="w-full flex flex-col divide-y divide-alternative-100">
            <li className="px-4 py-3">
              <span className="block bg-alternative-200 rounded-sm animate-pulse w-12/12 h-3" />

              <span className="block bg-alternative-200 rounded-sm animate-pulse w-3/12 h-3 mt-2" />
            </li>

            <li className="px-4 py-3">
              <span className="block bg-alternative-200 rounded-sm animate-pulse w-8/12 h-3" />
            </li>
          </ul>
        </div>

        <div className="w-full sm:rounded-md bg-white border-b-4 shadow-sm">
          <div className="border-b py-3 px-4">
            <span className="block bg-alternative-200 rounded-sm animate-pulse w-52 h-4 my-1" />
          </div>

          <ul className="w-full flex flex-col divide-y divide-alternative-100">
            <li className="px-4 py-3">
              <span className="flex gap-3">
                <span className="block bg-alternative-200 rounded-sm animate-pulse w-3 h-3 m-0.5" />

                <span className="block bg-alternative-200 rounded-sm animate-pulse w-36 h-3 my-0.5" />
              </span>
            </li>

            <li className="px-4 py-3">
              <span className="flex gap-3">
                <span className="block bg-alternative-200 rounded-sm animate-pulse w-3 h-3 m-0.5" />

                <span className="block bg-alternative-200 rounded-sm animate-pulse w-36 h-3 my-0.5" />
              </span>
            </li>

            <li className="px-4 py-3">
              <span className="flex gap-3">
                <span className="block bg-alternative-200 rounded-sm animate-pulse w-3 h-3 m-0.5" />

                <span className="block bg-alternative-200 rounded-sm animate-pulse w-36 h-3 my-0.5" />
              </span>
            </li>
          </ul>
        </div>
      </span>
    </BaseLayout>
  )
}
