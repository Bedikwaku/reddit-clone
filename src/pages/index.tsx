import { Typography } from "@material-ui/core";
import { useUser } from "../context/AuthContext";

export default function Home() {
  const { user } = useUser();
  console.info("USER:", user);
  return <Typography variant="h1">Hello world!</Typography>;
}
