import { ChangeEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, IconButton, Input } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type SearchBoxProps = {
  onSearch: (text: string) => void,
}

export function Search({ onSearch }: SearchBoxProps) {
  const { t } = useTranslation();
  const [ search, setSearch ] = useState("");
  const [ show, setShow ] = useState(false);

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
        autoFocus
      />
    </FormControl> }
    <IconButton onClick={handleShow}>
      <SearchIcon />
    </IconButton>
  </>
}