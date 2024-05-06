import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useState} from "react";

const EmbedForm = () => {
  const [url, setUrl] = useState<string>("");
  const [src, setSrc] = useState<string>("");

  function sendRequest() {
    setSrc(url);
    // axios.get(url)
    //   .then(resp => {
    //     console.log(resp);
    //     setPage(resp.data);
    //   })
    //   .catch(err => console.log(err));
  }

  return (
    <Grid container display="flex" flexDirection="column" alignItems="stretch"
          sx={{minHeight: '100vh', minWidth: '100vh'}}>
      <Grid item width="100%">
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
      <Grid item width="100%" height="100%">
        <form onSubmit={e => {
          e.preventDefault();
          sendRequest();
        }}>
          <iframe src={src} height="100%" width="100%"/>
          <button type="submit">Update</button>
        </form>
      </Grid>
    </Grid>
  );
}
export default EmbedForm;