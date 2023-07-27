import Logo from "../logo/logo"
import { Button, IconButton } from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import BadgeIcon from '@mui/icons-material/Badge';

import "./sidebar.scss"

export default function Sidebar(){
    return (
        <>
            <div className="sidebarWrapper">
                <div className="center">
                    <Logo/>
                </div>
                <div className="spacing">
                    <IconButton aria-label="cafes" href="/">
                        <LocalCafeIcon />
                        <p>Cafes</p>
                    </IconButton>
                    <IconButton aria-label="employees" href="/employees">
                        <BadgeIcon />
                        <p>Employees</p>
                    </IconButton>
                </div>

            </div>
        </>
    )
}