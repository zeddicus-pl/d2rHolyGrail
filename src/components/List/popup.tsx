import { useState, useRef, MutableRefObject, ReactChild } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type PopupProps = {
  itemName: string,
  itemType: string,
  children: ReactChild,
}

const iframeStyle = `
<style>
  * {
    color: #ddd;
    font-family: sans-serif;
  }
</style>
`

const writeToIframe = (frameRef: MutableRefObject<HTMLIFrameElement | null>, html: string) => {
  if (frameRef.current) {
    frameRef.current.contentDocument?.open();
    frameRef.current.contentDocument?.write(html.replace('<html>', '<html>' + iframeStyle));
    frameRef.current.contentDocument?.close();
  }
}

export default function Popup({ itemType, itemName, children }: PopupProps) {
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const handleClickOpen = () => {
    window.Main.on('silospenResponse', (html: string) => {
      writeToIframe(frameRef, html);
    });
    window.Main.getSilospen(itemType, itemName);
    setOpen(true);
    setTimeout(() => {
      writeToIframe(frameRef, '<html><body>Loading...</body></html>');
    }, 100);
  };

  const handleClose = () => {
    writeToIframe(frameRef, '<html><body></body></html>');
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClickOpen}>
        {children}
      </div>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <div>Silospen.com drop calculator</div>
          <a
            href="#"
            onClick={() => { window.Main.openUrl('https://dropcalc.silospen.com/') }}
            style={{
              fontSize: '10pt',
            }}
          >
            https://dropcalc.silospen.com/
          </a>
          <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <iframe frameBorder="0" style={{ width: 500, height: 400 }} ref={frameRef} />
        </DialogContent>
      </BootstrapDialog>
    </>  
  );
}
