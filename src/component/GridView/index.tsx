import React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

interface IrowData{
    name: string;
    MobileNo: number;
    Product: string;
    Company: string;
    Problem: string;
} 
// {
//     return { name, MobileNo, Product, Company, Problem };
// }

const rows: IrowData[] = [
    {
        name: 'Surendra',
        MobileNo:  9694292587,
        Product: 'laptop',
        Company: 'dell',
        Problem: 'hardware',
    }, 
    {
        name: 'Surendra',
        MobileNo:  9694292587,
        Product: 'laptop',
        Company: 'dell',
        Problem: 'hardware',
    }
    
];

const GridView = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>MobileNo</TableCell>
                        <TableCell align='right'>Product</TableCell>
                        <TableCell align='right'>Company</TableCell>
                        <TableCell align='right'>Problem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, key) => (
                        <TableRow
                            key={key}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}>
                            <TableCell component='th' scope='row'>{row.name}</TableCell>
                            <TableCell align='right'>{row.MobileNo}</TableCell>
                            <TableCell align='right'>{row.Product}</TableCell>
                            <TableCell align='right'>{row.Company}</TableCell>
                            <TableCell align='right'>{row.Problem}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GridView;
