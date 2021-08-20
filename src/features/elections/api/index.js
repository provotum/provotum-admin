const axios = require("axios").default;

export const createVote = async (payload) => {
  console.log("creating vote : ", payload);
  try {
    let response = await axios.post(`${payload.vaUrl}/votes`, {
      title: payload.title,
      questions: payload.questions,
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
    let response = await axios.get(`${vaUrl}/votes`);
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchResults = async (vaUrl, electionId) => {
  console.log(`fetching results vor vote ${electionId}`);
  try {
    let response = await axios.get(`${vaUrl}/votes/results`, {
      params: {
        voteId: electionId
      }
    });
    return response.data;

  } catch (e) {
    console.log(e);
  }
}

export const fetchPublicKeyShares = async (vaUrl, electionId) => {
  console.log(`fetching shares vor vote ${electionId}`);
  try {
    let response = await axios.get(`${vaUrl}/votes/publicKeyShares`, {
      params: {
        voteId: electionId
      }
    });
    return response.data;

  } catch (e) {
    console.log(e);
  }
}

export const combineDistributedKeys = async (vaUrl, electionId) => {
  console.log("combinging dkg keys");
  try {
    let response = await axios.post(`${vaUrl}/dkg`, {
      electionId: electionId,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const startTally = async (vaUrl, electionId) => {
  console.log("starting tally");
  try {
    let response = await axios.post(`${vaUrl}/votes/tally`, {
      voteId: electionId,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const closeVote = async (vaUrl, electionId) => {
  console.log("closing vote");
  try {
    let response = await axios.post(`${vaUrl}/votes/close`, {
      voteId: electionId,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
