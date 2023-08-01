import Logo from "../logo/logo"
import { useNavigate, Link } from "react-router-dom";

import { Button, IconButton } from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import BadgeIcon from '@mui/icons-material/Badge';

import "./sidebar.scss"
export default function Sidebar(){
    const navigate = useNavigate();
    return (
        <>  
            <div className="sidebarWrapper">
                <div className="center">
                    <Logo/>
                </div>
                <div className="spacing">
                    <Link to="/">
                        <IconButton aria-label="cafes" className="nav">
                            <LocalCafeIcon />
                            <p>Cafes</p>
                        </IconButton>
                    </Link>
                    <Link to="/employees">
                        <IconButton aria-label="employees" className="nav">
                            <BadgeIcon />
                            <p>Employees</p>
                        </IconButton>
                    </Link>

                </div>

            </div>
        </>
    )
}