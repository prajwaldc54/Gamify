import ChangePassword from 'pages/Auth/ChangePassword';
import CreateTeam from 'pages/Auth/CreateTeam';
import Dashboard from 'pages/Auth/Dashboard';
import ForgetPassword from 'pages/Auth/ForgetPassword';
import InviteTeam from 'pages/TeamMember/ListofTeamMembers';
import Signin from 'pages/Auth/Signin';
import Signup from 'pages/Auth/Signup';
import JoinTeamSignup from 'pages/Onboarding/JoinTeamSignup';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OtherProtectedRoutes from './OtherProtectedRoutes';
import ResetPassword from 'pages/Auth/ResetPassword';
import { VerifyEmail } from 'pages/Auth/VerifyEmail';
import PostDetail from 'pages/posts/PostDetail';
import AuthRoutes from './AuthRoutes';

import TeamDashboard from 'pages/Teams/TeamDashboard';
import { Homepage } from 'pages/posts/Homepage';
import ListOfTeams from 'pages/Teams/ListOfTeams';

import NotFoundPage from 'ErrorHandling/404';

import ViewAllRelatedPost from 'pages/posts/ViewAllRelatedPost';

import { Feed } from 'pages/posts/Feed';

import TeamStatistics from 'components/TeamDashboard/TeamStatistics';

const RouteList = () => {
  return (
    <>
      <Routes>
        <Route path="/team/join" element={<JoinTeamSignup />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verify-user/:id" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/team-members/:id" element={<InviteTeam />} />
          <Route path="/" element={<Homepage />} />

          <Route path="/" element={<Feed />} />

          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/team/:id" element={<TeamDashboard />} />
          <Route path="/teams" element={<ListOfTeams />} />
          <Route
            path="/post/:id/related-posts"
            element={<ViewAllRelatedPost />}
          />
        </Route>
        <Route element={<OtherProtectedRoutes />}>
          <Route path="/create-team" element={<CreateTeam />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default RouteList;
