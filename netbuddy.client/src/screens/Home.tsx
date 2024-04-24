import Grid from "@mui/material/Grid";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";

const Links: {label: string, link: string}[] = [
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
    <Grid container spacing={2} justifyItems="center" alignItems="center">
      {Links.map(({label, link}, index) => (
        <Grid item key={index}>
          <Link component={RouterLink} to={link}>
            {label}  
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;