import React, { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from 'components/Header';
import SideBar from 'components/SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import { loggedInUser } from 'api/auth';
import { useDispatch } from 'react-redux';
import { loginby } from 'stores/reducers/userSlice';
import useCheckUser from 'hooks/useCheckUser';
import { getTeamsByUserId } from 'api/team';
import { DashboardGridContainer } from 'themes/commonTheme';

const Dashboard = () => {
  useCheckUser();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<any>({});
  const [teamInfo, setTeamInfo] = useState<any>([]);

  useEffect(() => {
    loggedInUser().then((res) => {
      let result = res.data.data;
      setUserInfo(result);
      dispatch(
        loginby({
          name: result?.name,
          id: result?.id,
          email: result?.email,
        })
      );
      getTeamsByUserId({ userId: result?.id }).then((res: any) => {
        setTeamInfo(res.data.data.items);
      });
    });
  }, [dispatch]);

  return (
    <Grid
      templateAreas={{
        base: `"sidebar header" "main main"`,
        md: `"sidebar header" "sidebar main"`,
      }}
      style={DashboardGridContainer}>
      <GridItem area={'sidebar'} zIndex={2}>
        <SideBar userInfo={userInfo} teamInfo={teamInfo} />
      </GridItem>
      <GridItem area={'header'}>
        <Header />
      </GridItem>
      <GridItem
        area={'main'}
        zIndex={1}
        borderTop={{ base: '1px', md: 0 }}
        borderColor={{ base: 'secondary.500', md: 'none' }}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};
export default Dashboard;
