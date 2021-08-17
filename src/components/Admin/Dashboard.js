import { Col, Row } from "antd";
import Grid from "antd/lib/card/Grid";
import React from "react";
import { Wrapper } from "./Card/Card";
import CardItem from "./DashBoardItem/CardItem";
import SideNavBar from "./NavBar/SideNavBar";
import AutoGrid from "./PaperGrid";

export default function Dashboard() {
  return (
    <div>
      <SideNavBar />
    </div>
  );
}
