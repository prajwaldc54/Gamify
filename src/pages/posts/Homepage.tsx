import React, { useState, useEffect } from 'react';
import { Box, Stack, Grid, GridItem, Flex } from '@chakra-ui/react';
import { Feed } from './Feed';
import { HomepageContainer } from 'themes/commonTheme';
import CreatePost from 'components/PostComponents/CreatePost/CreatePost';

export const Homepage = () => {
  const GridStyle1 = {
    height: '100%',
    paddingTop: '20px',
    paddingRight: '20px',
    overflow: 'auto',
    fontFamily: 'Poppins',
  };

  return (
    <>
      <Stack display={{ lg: 'none' }}>
        <Box px={5} pt="20px">
          <CreatePost />
          <Feed />
        </Box>
      </Stack>
      <Stack display={{ base: 'none', lg: 'block' }}>
        <Grid style={GridStyle1} templateColumns="repeat(15, 1fr)">
          <GridItem px={5} colSpan={9}>
            <CreatePost />
            <Feed />
          </GridItem>
          <GridItem colSpan={6}>
            <Flex direction="column" gap="23px">
              <Flex h="507px" style={HomepageContainer}>
                View all related posts
              </Flex>

              <Flex h="96px" style={HomepageContainer}>
                Tags
              </Flex>

              <Flex h="532px" style={HomepageContainer}>
                LeaderBoard
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Stack>
    </>
  );
};
