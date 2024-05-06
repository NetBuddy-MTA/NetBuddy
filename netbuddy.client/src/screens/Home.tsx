import Grid from "@mui/material/Grid";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

const Links: { label: string, link: string }[] = [
  {
    label: "Test1",
    link: "/test1"
  },
  {
    label: "Test2",
    link: "/test2"
  },
  {
    label: "Test3",
    link: "/test3"
  },
];

const Home = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyItems="center"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
      sx={{
        minHeight: '50vh',
      }}>
      {Links.map(({label, link}, index) => (
        <Grid item key={index}>
          <Link component={RouterLink} to={link}>
            <Button variant="contained" size="large">
              {label}
            </Button>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;