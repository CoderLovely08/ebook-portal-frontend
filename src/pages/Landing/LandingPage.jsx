import { Button } from "@/components/ui/button";
import { routes } from "@/utils/app.constants";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Button asChild>
      <Link to={routes.CORE.DASHBOARD}>Go To Dashboard</Link>
    </Button>
  );
};

export default LandingPage;
