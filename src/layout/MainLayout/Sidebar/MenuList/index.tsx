import React, {useState} from 'react';
import { Link, LinkProps } from 'react-router-dom';

import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HouseIcon from '@mui/icons-material/House';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
                pathName: '/add',
                label : 'Add new Service',
                icon: <PostAddIcon />,
            }
        ],
    },
    {
        pathName: '/product',
        label: 'Product',
        icon: <PostAddIcon />,
        child:[],
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
    const [ open, setOpen] = useState(false);
    return (
        <List color='inherit'>
            {menuConfig.map(({ label, pathName, icon, child }: IMenuProps) => {
                return (
                    <ListItem key={label} disablePadding>
                        <ListItemButton component={CustomLink} to={pathName}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                            {child.length}
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default MenuList;
