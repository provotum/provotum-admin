const axios = require("axios").default;

export const createVote = async (vaUrl) => {
  console.log("creating vote");
  try {
    let response = await axios.post(`http://${vaUrl}/votes`, {
      title: "dumb vote",
      questions: ["Question 1'", "Question 2"],
    });
    console.log("success", response);
    return response.data;
  } catch (e) {
    console.log("error");
    console.log(e);
  }
};

export const getVotes = async (vaUrl) => {
  console.log("fetching votes");
  try {
    let response = await axios.get(`http://${vaUrl}/votes`);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchResults = async (vaUrl, electionId) => {
  console.log(`fetching results vor vote ${electionId}`);
  try {
    let response = await axios.get(`http://${vaUrl}/votes/results`, {
      params: {
        voteId: electionId
      }
    });
    console.log(response.data);
    return response.data;

  } catch (e) {
    console.log(e);
  }
}

export const fetchPublicKeyShares = async (vaUrl, electionId) => {
  console.log(`fetching shares vor vote ${electionId}`);
  try {
    let response = await axios.get(`http://${vaUrl}/votes/publicKeyShares`, {
      params: {
        voteId: electionId
      }
    });
    console.log('arstartartartart --------')
    console.log(response.data);
    return response.data;

  } catch (e) {
    console.log(e);
  }
}

export const combineDistributedKeys = async (vaUrl, electionId) => {
  console.log("combinging dkg keys");
  try {
    let response = await axios.post(`http://${vaUrl}/dkg`, {
      electionId: electionId,
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const startTally = async (vaUrl, electionId) => {
  console.log("starting tally");
  try {
    let response = await axios.post(`http://${vaUrl}/votes/tally`, {
      voteId: electionId,
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const closeVote = async (vaUrl, electionId) => {
  console.log("closing vote");
  try {
    let response = await axios.post(`http://${vaUrl}/votes/close`, {
      voteId: electionId,
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
