import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const confirmDeleteDialog = ({ open, handleClose, deletehandler }) => {
    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>Are you sure you want to delete this group? </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button color='error' onClick={deletehandler}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default confirmDeleteDialog