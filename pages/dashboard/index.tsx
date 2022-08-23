import React from "react";
import Sidebar from "../../components/sidebar";
import Dashboard from "../../components/dashboard";

// import { Container } from './styles';

const dashboard: React.FC = () => {
  return (
    <>
    <Sidebar>
      <Dashboard />
    </Sidebar>
    </>
  );
};

export default dashboard;
