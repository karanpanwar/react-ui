import React, {useState} from 'react';
import { Link, LinkProps } from 'react-router-dom';

import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HouseIcon from '@mui/icons-material/House';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

interface Ichild {
    pathName: string;
    label : string;
    icon : JSX.Element
}
interface IMenuProps {
    pathName: string;
    label: string;
    icon: JSX.Element;
    child: Ichild[];
}

const menuConfig: IMenuProps[] = [
    {
        pathName: '/',
        label: 'Dashboard',
        icon: <HouseIcon />,
        child: [],
    },
    {
        pathName: '/service',
        label: 'Service',
        icon: <PostAddIcon />,
        child : [
            {
                pathName: 'service/add',
                label : 'Add New Service',
                icon: <PostAddIcon />,
            }
        ],
    },
    {
        pathName: '/customer',
        label: 'Customer',
        icon: <PeopleIcon />,
        child:[
            {
                pathName: 'customer/add',
                label : 'Add New Customer',
                icon : <PersonAddAltIcon />,
            }
        ],
    },
    {
        pathName: '/setting',
        label: 'Setting',
        icon: <SettingsIcon />,
        child: [],
    },
    {
        pathName: '/report',
        label: 'Report',
        icon: <AssessmentOutlinedIcon />,
        child: [],
    },
];

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    function _Link(linkProps, ref) {
        return <Link ref={ref} {...linkProps} />;
    }
);

const MenuList = () => {
    const [ open, setOpen] = useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = ( index: number) => {
        setSelectedIndex(index);
        setOpen(!open);
    };

    return (
        <List color='inherit'>
            {menuConfig.map(({ label, pathName, icon, child }: IMenuProps, index) => {
                return (
                    <ListItem key={label} disablePadding>
                        <ListItemButton
                                component={CustomLink}
                                to={pathName} 
                                selected={selectedIndex === index}
                                onClick={()=> {
                                    handleListItemClick( index)
                                }}>        
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                            {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                        </ListItemButton>

                        {/* {child.length > 0 ? 
                                 
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                {child.map(({ label, pathName, icon }, childIndex)=> {
                                        return (
                                    <ListItemButton key={label} sx={{ pl: 4 }} 
                                        component={CustomLink}
                                        to={pathName}>
                                        <ListItemIcon>
                                                {icon} 
                                        </ListItemIcon>
                                        <ListItemText primary={label} />
                                    </ListItemButton>)
                                }
                                )}
                                </List>
                            </Collapse> 
                            : ''
                        } */}
                    </ListItem>
                );
            })}
        </List>
    );
};

export default MenuList;
