import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"


const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <>
    <div 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className=" w-full -m-1  cursor-pointer -ml-2 flex items-center justify-left">
    <Button
      variant="ghost"
      size="icon"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    
      <p className="">
        {theme === "dark" ? "Light" : "Dark"} Mode
      </p>
    </div>

    </>
  )
}

export default ThemeToggle;
