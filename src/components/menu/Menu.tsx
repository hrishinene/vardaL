import React from "react";
import {Menu, MenuItem, MenuButton} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import {MenuIcon} from "@heroicons/react/outline";
// import "./styles.css";


type Props = {
    dark: boolean
}
export const AppMenu = ({dark}: Props) => {
    // const [isDark, setDark] = React.useState(true);
    return (
        <div className="mr-2">
            <Menu
                arrow
                menuButton={<MenuButton>
                    <MenuIcon className="h-6 w-6 mr-4 cursor-pointer dark:stroke-white"/>
                </MenuButton>}
                theming={dark ? "dark" : undefined}
            >
                <MenuItem href="http://www.shabdak.com" className="text-xl underline decoration-indigo-500 decoration-2">नवे शब्दक</MenuItem>
                <MenuItem href="http://hindi.shabdak.com" className="text-xl underline decoration-indigo-500 decoration-2">शब्दक - हिन्दी</MenuItem>
                <MenuItem href="https://shabdak.github.io"
                          rel="noopener noreferrer"
                          className="text-xl underline decoration-indigo-500 decoration-2">
                    शब्दक ब्लॉग्
                </MenuItem>
            </Menu>
        </div>
    )
}
