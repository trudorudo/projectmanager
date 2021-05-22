import React from 'react';
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import './projectManagerNav.css';

const ProjectComponent = (props) => {
    const icon = props.theme === "light" ? <HiMoon size={30} /> : <CgSun size={30} />;
    return (
        <div className='projectManagerNav'>
            <ul>
                <li><a href="/">Projects</a></li>
                <li><a href="/tasks">Tasks</a></li>
                <li
                    className='darkModeBtn'
                    onClick={() => props.themeToggler()}>{icon}
                </li>
            </ul>
        </div>
    )
}


export default ProjectComponent