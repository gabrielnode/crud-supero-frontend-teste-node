import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export function NavBar() {

    return (
        <>
            <AppBar>
                <Toolbar>

                    <Typography variant="h6">
                        Busca de livros
          </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}