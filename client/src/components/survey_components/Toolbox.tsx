import React from "react";
import { Box, Button, Grid } from "@chakra-ui/react";
import { useNode } from "@craftjs/node";

export const ShortText: React.FC = () => {
  return (
    <Box px={2} py={2}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Box pb={2}>
          <p>Drag to add</p>
        </Box>
        <Grid container direction="column" item>
          <Button variant="contained">Button</Button>
        </Grid>
        <Grid container direction="column" item>
          <Button variant="contained">Text</Button>
        </Grid>
        <Grid container direction="column" item>
          <Button variant="contained">Container</Button>
        </Grid>
        <Grid container direction="column" item>
          <Button variant="contained">Card</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
