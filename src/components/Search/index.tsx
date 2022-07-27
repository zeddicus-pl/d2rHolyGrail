import { ChangeEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, IconButton, Input } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import * as Mousetrap from 'mousetrap';

type SearchBoxProps = {
  onSearch: (text: string) => void,
}

export function Search({ onSearch }: SearchBoxProps) {
  const { t } = useTranslation();
  const [ search, setSearch ] = useState("");
  const [ show, setShow ] = useState(false);

  useEffect(()=> {
    // Binding shortcuts when mounting
    Mousetrap.bind('ctrl+f', () => {
      console.log('Received ctrl+f');
      if (!show) {
        handleShow();
      }
    });
    Mousetrap.bind('esc', () => {
      console.log('Received esc');
      if (show) {
        handleShow();
      }
    }, 'keydown');
    return () => {
      // Unbinding shortcuts when unmounting
      Mousetrap.unbind(['ctrl+f', 'esc']);
    }
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    setSearch(value);
    onSearch(value);
  }

  const handleShow = () => {
    setShow(!show);
    setSearch('');
    onSearch('');
  }

  return <>
    { show && <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
      <Input
        type="text"
        value={search}
        onChange={handleChange}
        margin="none"
        placeholder={t("Search")}
        inputProps={{ className: 'mousetrap' }}
        autoFocus
      />
    </FormControl> }
    <IconButton onClick={handleShow}>
      <SearchIcon />
    </IconButton>
  </>
}