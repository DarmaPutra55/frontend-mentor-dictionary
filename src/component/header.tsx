import { BiBookAlt } from "react-icons/bi";
import { FiMoon } from "react-icons/fi";

type HeaderProps = {
  setFontStyle: (fontStyle: string) => void;
  setDarkMode: (darkMode: boolean) => void;
  darkModeToggle: boolean;
  currentFontStyle: string;
};

export default function Header({
  setFontStyle,
  setDarkMode,
  darkModeToggle,
  currentFontStyle,
}: HeaderProps) {
  function handleFontStyleChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setFontStyle(e.target.value);
    localStorage.setItem("fontStyle", JSON.stringify(e.target.value));
  }

  function handleDarkModeChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setDarkMode(e.target.checked);
    localStorage.setItem("darkMode", JSON.stringify(e.target.checked));
  }

  return (
    <header className="flex flex-row justify-between">
      <BiBookAlt size={26} />
      <div className="flex flex-row items-center space-x-2">
        <select
          id="font-selector-id"
          onChange={handleFontStyleChange}
          className="bg-transparent"
        >
          <option
            value={"font-serif"}
            selected={currentFontStyle === "font-serif" ? true : false}
          >
            Serif
          </option>
          <option
            value={"font-sans"}
            selected={currentFontStyle === "font-sans" ? true : false}
          >
            Sans Serif
          </option>
          <option
            value={"font-mono"}
            selected={currentFontStyle === "font-mono" ? true : false}
          >
            Monospace
          </option>
        </select>
        <span className="border-r-[1px] border-l-[1px] border-r-gray-200 dark:border-r-white h-full" />
        <label
          htmlFor="night-mode-toggle-id"
          className={`flex items-center relative w-10 h-5 rounded-full ${
            darkModeToggle ? "bg-purple-500" : "bg-gray-400"
          }`}
        >
          <input
            type="checkbox"
            id="night-mode-toggle-id"
            className="sr-only"
            onChange={handleDarkModeChange}
          />
          <div
            className={`absolute h-4 w-4 bg-white rounded-full transition-pos-x ease-in-out duration-200 ${
              darkModeToggle ? "left-5" : "left-1"
            }`}
          />
        </label>
        <FiMoon size={26} className="dark:text-purple-500" />
      </div>
    </header>
  );
}
