import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Collapse,
  IconButton,
  Avatar,
} from "@material-ui/core";
import {
  Lock,
  HourglassEmpty,
  HowToVote,
  GroupWork,
  Launch,
} from "@material-ui/icons";
import {
  combineDkgKeys,
  startTallyingProcess,
  endVotingProcess,
  getElectionPublicKeyShares
} from "./../features/elections/electionSlice";

import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { openVoteDetail, selectElection } from "../features/uiBuilder/uiSlice";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

export function ElectionCard(props) {



  let election = props.election;
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const vaUrl = process.env.REACT_APP_VA_URL;
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const triggerDkg = (electionId) => {
    console.log("triggering dkg");
    dispatch(combineDkgKeys({ vaUrl: vaUrl, electionId: electionId }));
  };

  const icon = (election) => {
    switch (election.phase) {
      case "Tallying":
        return <HourglassEmpty fontSize="large" color="primary" />;
      case "Voting":
        return <HowToVote color="primary" fontSize="large" />;
      case "DistributedKeyGeneration":
        return <GroupWork color="primary" fontSize="large" />;
      default:
        return <Lock color="primary" fontSize="large" />;
    }
  };



  const openElectionDetails = () => {
    dispatch(selectElection(election.electionId));
    dispatch(openVoteDetail());

  }



  return (
    <div className="election-list-entry" onClick={openElectionDetails}>
      <div className="election-info">
        <div className="election-phase-icon">
          {icon(election)}

        </div>
        <div className="election-entry-infos">
          <div className="election-title">
            {election.title}

          </div>
          <div className="election-phase">
            {election.phase}
          </div>
        </div>

      </div>

    </div>

  );
}
