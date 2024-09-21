import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableRow,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./MainContent.scss";
import SnippetEditor from "./CodeEditor";
import { EventObject } from "../types";

const MainContent: React.FC = () => {
  const [isTagInstalled, setIsTagInstalled] = React.useState(false); // Example state for tag installation
  const [isTagTested, setIsTagTested] = React.useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [events, setEvents] = useState<EventObject[]>([]); // Initialize with an empty array

  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = (panel: string) => {
    if (!isLoading) {
      setExpanded(expanded === panel ? false : panel);
    }
  };

  useEffect(() => {
    fetch("/api/analytics")
      .then((response) => response.json())
      .then((data) => {
        // Handle the data
        console.log(data);
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="main-content">
      <Typography variant="h4" className="main-heading">
        Getting Started
      </Typography>

      {/* First Accordion: Install Surface Tag */}
      <Accordion expanded={expanded === "panel1"}>
        <AccordionSummary
          // expandIcon=none
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="accordion-summary-content"
          onClick={(event) => event.preventDefault()}
        >
          {/* Status Icon */}
          <div className="status-icon">
            {isTagInstalled ? (
              <CheckCircleIcon className="success" />
            ) : (
              <CancelIcon className="error" />
            )}
          </div>

          {/* Title and subtitle */}
          <div className="accordion-title">
            <Typography variant="subtitle1">
              <strong>Install Surface Tag</strong>
            </Typography>
            <Typography variant="body2" className="analytics-info">
              Enable tracking and analytics
            </Typography>
          </div>

          {/* Install Tag Button */}

            <Button
              id="install-tag-button"
              variant="contained"
              className="install-tag-button"
              onClick={() => handleButtonClick("panel1")}
              disabled={isLoading}
              style={{
                backgroundColor: expanded !== "panel1" ?  "#F1F1F2":"#2F64EE",
                color: expanded !== "panel1" ? '#5F6065':"" 
              }}  
            >
              Install tag
            </Button>
        </AccordionSummary>
        <AccordionDetails>
          <div className="snippet-box">
            <pre className="snippet-content">
              <SnippetEditor />
            </pre>
            <Button
              id="test-connection-button"
              variant="contained"
              color="primary"
              className="test-connection"
            >
              Test Connection
            </Button>
          </div>
        </AccordionDetails>
        <Alert severity="success">This is a success Alert.</Alert>
        <Alert severity="error">This is a error Alert.</Alert>
        <Alert severity="info">This is a info Alert.</Alert>
        <Button
          id="try-again-button"
          variant="contained"
          color="primary"
          className="try-again-button"
        >
          Try Again
        </Button>
      </Accordion>

      {/* Second Accordion: Test Surface Tag Events */}
      <Accordion expanded={expanded === "panel2"}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="accordion-summary-content"
        >
          {/* Status Icon */}
          <div className="status-icon">
            {isTagTested ? (
              <CheckCircleIcon className="success" />
            ) : (
              <CancelIcon className="error" />
            )}
          </div>

          {/* Title and subtitle */}
          <div className="accordion-title">
            <Typography variant="subtitle1">
              <strong>Test Surface Tag Events</strong>
            </Typography>
            <Typography variant="body2" className="analytics-info">
              Test if surface tag is properly emitting events
            </Typography>
          </div>

          {/* Test Tag Button */}

          <Button
            id="test-tag-button"
            variant="contained"
            className="install-tag-button"
            onClick={() => handleButtonClick("panel2")}
            style={{
              backgroundColor: expanded !== "panel2" ?  "#F1F1F2":"#2F64EE",
              color: expanded !== "panel2" ? '#5F6065':"" 
            }}            
            disabled={isLoading}
          >
            Test Tag
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Event testing details will go here.</Typography>
        </AccordionDetails>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={1}>Event</TableCell>
                <TableCell colSpan={1}>Visitor</TableCell>
                <TableCell colSpan={9}>Metadata</TableCell>
                <TableCell colSpan={1}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {events?.map((event : EventObject) => (
                  <TableRow key={event.id}>
                    <TableCell colSpan={1}>{event.eventType}</TableCell>
                    <TableCell colSpan={1}>{event.visitorId}</TableCell>
                    <TableCell colSpan={9}>
                      {JSON.stringify(event.metadata)}
                    </TableCell>
                    <TableCell colSpan={1}>{event.createdAt}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Accordion>
    </div>
  );
};

export default MainContent;
