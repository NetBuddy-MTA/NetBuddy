import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useEffect, useState } from "react";
import axios from "axios";

const EmbedForm = () => {
  const [url, setUrl] = useState<string>("");
  const [page, setPage] = useState<string>("");
  useEffect(() => {
    axios.get(url, {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(resp => {
        console.log(resp);
        setPage(resp.data);
      })
      .catch(err => console.log(err));
  }, [url]);
  
  return (
    <Grid container>
      <Grid item>
        <TextField
          margin="normal"
          fullWidth
          id="url"
          label="Url"
          name="url"
          autoComplete="Url"
          autoFocus={true}
          onChange={e => {
            e.preventDefault();
            setUrl(e.target.value);
          }}
        />
      </Grid>
      <Grid item>
        {page}
      </Grid>
    </Grid>
  );
}
export default EmbedForm;