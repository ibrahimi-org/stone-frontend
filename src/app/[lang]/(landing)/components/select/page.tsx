"use client";
import MySelect from "@/components/molecules/select/MySelect";
import ThemeToggler from "@/components/molecules/ThemeToggler";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { CgCamera, CgClose, CgMoon, CgSun } from "react-icons/cg";
import MultipleSelector, {
  Option,
} from "@/components/molecules/select/MultiSelect";

export default function InputPage() {
  const countries = [
    { ios3: "sdf", code: "98", name: "Iran" },
    { ios3: "sdsdff", code: "97", name: "Pakistan" },
  ];
  const options: SelectItemType[] = [
    { label: <CgMoon />, value: "moon" },
    { label: <CgSun />, value: "sun" },
    { label: "Select", value: "select" },
    {
      label: <p>Your select p with long text is here and continue</p>,
      value: "your_select",
    },
  ];

  const OPTIONS: Option[] = [
    {
      label: "nextjs",
      value: "Nextjs",
      avatar:
        "data:image/webp;base64,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",
    },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue, disable: true", disable: true },
    { label: "Remix", value: "remix" },
    { label: "Svelte", value: "svelte", disable: false },
    { label: "Angular", value: "angular" },
    { label: "Ember", value: "ember" },
    {
      label: "React",
      value: "react",
      avatar:
        "data:image/webp;base64,UklGRuIHAABXRUJQVlA4INYHAAAwKQCdASq5AHcAPpUmpVKloSWlldCwEolnANQM8Yff3bvr89gWbPbuLmSMP9QVPH/7PmlTM/2AXyUEGU0InhkXe4ff8ZQSyoj+7xDyD0f245ZZhfe+a7TqWRKUkn7mTPswxF8UMM5cGUUriIoZhmWC/w2RFlldfFheJ8XDUBaDDdYowTt+47FhAtMjQW8lAx01PMehwXf4WEDj02EdPzEzal2uz6r+kbjfnQkreux39Xpjp2Mo+CbOtA9dUPNYKwamNfs8Bno4HH60S0KXHeADMDdPdMA8Tvnxz5sSlK9BA69kjHzx/gPPCIkPw4Yl+ISnFrE2qtbXljM4bQ2mdbh1vncVW2v3MTB3JPYQOwCHOwgMQda4cs30J/rXa2bat19uDCR+TEzfh8lzT0/0LseRx6lzAvOXoTNqf+Djo3TvnrfJr0a6TuZps8pEdU2iCx2aUAD+/PQABuTmOd+NoCBDatN5rDkPu35Vzi+We9rvrE20Kz4Uval+3PX+M5/ZMWvqh6emE27uJDRwtq5byX0x8AnjmP0CCf/AFU+9fMSvAHDKW/3UWF9DSZJD8nuXz+E+eImJ84Tl1n28eofOLWKAAAHNcqP3Xi/HmT2CZzygy/TRFzazILaHfbpqwYlcB/A2SQ1kxP/MAFjnEnBDM44WLOF7KL3XhXrw/Obxggto3UWUUANndBgnb4FRrmRkkCcwjBpmC+hhhfWrMGe5bs3A+t1IlrbdLKG3WpZOUMwlJJcw7ALQkTZtQTFiGSvQRZMTgan6fa27jUPhRo/hg25amioeKJdI0J/REc2hVPxufX5th3eQ8f7nXF3mbIj0j895HzXIS/9HQpmJ1FpBm3tfQApeuy2L+qGIEwXeuBUEA1Y3oc0ca2kXYxUOzULFeo6+QifEt6Vr3z9Thn7TY3EL1dlVHk4Lr5Agwv/Hh4/RTO8HfxsMNS9gvA6oyPurQNGoz2Dbe2N0kqhiIjmiudon6cc6Fd86KMChwqWdT2HzDvW3Y1ihfyw9yYJFKtkpzhTA4lODWzBOvdKS95mdVz9FWfdpk1qsoj9vN2jcxaaIc2fMmiI5KZMhHrfs0qhIAOyXKnnXgsLe9mCg6njfLtjdoEMQzCch7hUaL1DalNeKCGMLD5q9dZpuGhginwoaQ6hh9wAAW7d+oWdF+Cf0vAHPkrG3F8y6//79zWj3/fag/7oTSqWZWrsySUbayBwRolf1cQ4KVn9IBUSTzI1MLALusUa98wSWkSMZa1yunFoCrVAkXdL719VrB82qiei7e2vH39uZmOJ+W1Bt027QqyKGioVM1uajw8dCIVCunf/krIvdEZjDirfgQDW1dgNNNQY7YTp2pnAt9czpoabrazrqzzOb0qaU7TGuwQ9Hbq9b1wvhflQYzEJ4iW9mbvsVdnYrs8SDHTQ/E6w00B10LUN/N9IRnjPN27MOFXI6HWGOmKnuPNRhzGum4fcTxmeMypkKuhGqOaQEY60jXiyn6UXRdlUj03owKbYlr7So2sA9hxVC66O255wp9M8B1eMg4YKUuppYmuSVvFMhvAAUWz0f/ljAy8SrwWBaviPBfD1GKVL/zidhHUkhipS31eOqaiPcm4OsYEPLvz0I6+mkMy6H4x9ak4gLuQziVa0L5A/dV9MChtnuULFoaWRcT/ghiNHxI5OjHrg8lGE0y3oiEY3x9bUsdjUWEkIPh0sU5QedX8+bx9sb9I5kygkb7K+04PFb0ijnsoPpnvvLMkGGHujalXLdR7MTgRIDZxbgW88Iv44HIgRbn6X6jemGWHiLkB3CtgwVUBYo57HiTEX+76ajHC07EIPhdbbjE9N8ojEFRt5NOU0IB2cAXsLY1XVp5PgrGT++JlfIEJQTZxxIOLHFr6fiJZAJiraG3u0J5F4bIZpKrqgreaen1sbW+ZxtbQi/go8BKZ84LwiZB6wWSSdZ7RRCeUd5vXPdP3bLR3Qr/mYYWKwDQsR3ZwtgCCynuG9pr6oqZTjDRemcEQQ/cSvH+yBdx9PLKoOeSGe6tGkbru4cTZ7N9AXvvoCoVax+qadkb30e8AB5I1cbThSeMXRTwuS58Wz3UntlrV9gLOOv+0nqV+WDI6bv09Kro7gcjSBB5RpX1yATzhDOPkH9lWozmxpeRyZ1wR0vmv3WSssuGJKO2/V/yfN6zV66ABcURCzczS1L19d1aLT1txmHd3ocW+LGo7kNZHkgkN3UUbL/B93roI6c7s/8z30/+okDEyZTzgKs8YrEmadko4KaKIhKr8fHZqTmXzAyUShd8Droya6oAxmy1quGQ6qJ2TbRSm7U4lUh0cpIyG9v0v9XN8bCvi/fnLGTnfgCichjXVd4eyTxRTrbbdIm1cnWLYz7YNX2SQSKm+KW2oB7n6t/mKVjJ3PXGYCE6dBj6niXwCbhgskJavhZPy8vpoADR7RN0B/gDF9AGGLzogtXT2GnO+z5ovmmuxVqE0uomMhGfpqei+3/hco7seJmlFK1dwvmL3dIGcJ1kobFK5QFeHyRLXj0s6pTcN6MVKlHWR3nlJMhorY+EUUM7W2+XNgh4tiwgyewp8U6YK9un4+PR3BLIuEDiy0hgjsRS+DXR/zKMEJYNypuZ2O0rlBPmjdzqjsjzYbqT6Z24mmBWDgbTXPN5B+CISFnB9Op11cxasRSunKNvagp7+AAAA==",
    },
    { label: "Gatsby", value: "gatsby" },
    { label: "Astro", value: "astro", disable: false },
  ];

  return (
    <div className="flex flex-col space-y-5 p-8 mb-[30rem]">
      <div className="flex flex-col w-1/5 space-y-5">
        <ThemeToggler />
        <MySelect
          selectSize="sm"
          placeholder="sm"
          options={countries}
          renderItem={(item) => (
            <p className="cursor-default flex space-x-5 items-center">
              {item.avatar && (
                <img className="w-6 h-6 rounded-full" src={item.avatar} />
              )}{" "}
              <span>{item.name + " " + item.code}</span>
            </p>
          )}
          getItemValue={(item) => item.code}
        />

        <MySelect selectSize="md" options={options} Leading={<CgCamera />} />
        <MySelect selectSize="md" disabled options={options} />
        <MySelect selectSize="md" options={options} />
        <MySelect selectSize="md" options={options} />
        <MySelect selectSize="md" options={options} />
        <MySelect selectSize="md" options={options} />
      </div>

      <div className="w-2/5">
        <MultipleSelector
          getItemValue={(o) => o.value}
          defaultOptions={OPTIONS}
          wrapSelectedItem
          renderSelectedItems={(items, unselectItem) => (
            <ul className="flex flex-wrap items-center space-x-3">
              {items.map((item) => (
                <li
                  key={item.value}
                  className="flex items-center space-x-2 py-xs"
                >
                  {" "}
                  {item.label}
                  <span
                    className="cursor-pointer"
                    onClick={() => unselectItem && unselectItem(item)}
                  >
                    <CgClose />
                  </span>
                </li>
              ))}
            </ul>
          )}
          renderItem={(op) => (
            <span className="flex space-x-2 items-center">
              {op.avatar && (
                <img className="w-6 h-6 rounded-full" src={op.avatar} />
              )}
              <span>{op.label}</span>{" "}
            </span>
          )}
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
      </div>

      <div className="w-2/5">
        <MultipleSelector
          type="badge"
          getItemValue={(o) => o.value}
          defaultOptions={OPTIONS}
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
        <MultipleSelector
          type="badge"
          size="sm"
          getItemValue={(o) => o.value}
          defaultOptions={OPTIONS}
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
      </div>
    </div>
  );
}
